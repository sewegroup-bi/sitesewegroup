-- ============================================================================
-- Blog SEWE, curtidas e comentarios
--
-- Onde rodar: painel do Supabase do projeto CRM-SEWE (bjohdxudealxhsumrxsg)
--             menu SQL Editor > New query > colar tudo > Run.
-- Pode rodar mais de uma vez sem quebrar nada (e idempotente).
--
-- Modelo de seguranca: as duas tabelas ficam com RLS ligado e SEM policy
-- nenhuma. Ou seja, a chave anon do site nao le nem escreve direto nelas.
-- Tudo passa pelas funcoes abaixo (security definer), que controlam
-- exatamente o que entra e o que sai. O e-mail de quem comenta nunca sai
-- em leitura publica.
-- ============================================================================

create extension if not exists pgcrypto;

-- ─────────────────────────── CURTIDAS ───────────────────────────
create table if not exists public.blog_likes (
  slug        text        not null,
  visitor_id  uuid        not null,   -- id aleatorio guardado no navegador
  created_at  timestamptz not null default now(),
  primary key (slug, visitor_id)
);

alter table public.blog_likes enable row level security;

-- Total de curtidas de um post.
create or replace function public.blog_like_count(p_slug text)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::int from public.blog_likes where slug = p_slug;
$$;

-- Curte se ainda nao curtiu, descurte se ja curtiu. Devolve o total novo.
create or replace function public.blog_toggle_like(p_slug text, p_visitor uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_liked boolean;
begin
  if p_slug is null or p_visitor is null or length(p_slug) > 120 then
    raise exception 'parametros invalidos';
  end if;

  delete from public.blog_likes where slug = p_slug and visitor_id = p_visitor;
  if found then
    v_liked := false;
  else
    insert into public.blog_likes (slug, visitor_id) values (p_slug, p_visitor);
    v_liked := true;
  end if;

  return json_build_object(
    'liked', v_liked,
    'count', (select count(*)::int from public.blog_likes where slug = p_slug)
  );
end;
$$;

-- ────────────────────────── COMENTARIOS ─────────────────────────
create table if not exists public.blog_comments (
  id          uuid        primary key default gen_random_uuid(),
  slug        text        not null,
  first_name  text        not null,
  last_name   text        not null default '',
  email       text        not null,   -- privado: nunca sai em leitura publica
  body        text        not null,
  consent     boolean     not null default false,
  consent_at  timestamptz,
  ip_hash     text,                   -- sha256 do IP + sal, para limitar spam
  user_agent  text,
  visible     boolean     not null default true,  -- desmarque para tirar do ar
  created_at  timestamptz not null default now()
);

create index if not exists blog_comments_slug_idx on public.blog_comments (slug, created_at desc);
create index if not exists blog_comments_ip_idx   on public.blog_comments (ip_hash, created_at desc);

alter table public.blog_comments enable row level security;

-- Leitura publica dos comentarios de um post.
-- Devolve so nome, texto e data. E-mail, IP e user agent ficam de fora.
create or replace function public.blog_comments_public(p_slug text)
returns table (id uuid, author text, body text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select c.id,
         btrim(c.first_name || ' ' || coalesce(c.last_name, '')) as author,
         c.body,
         c.created_at
    from public.blog_comments c
   where c.slug = p_slug
     and c.visible
   order by c.created_at desc
   limit 200;
$$;

grant execute on function public.blog_like_count(text)            to anon, authenticated;
grant execute on function public.blog_toggle_like(text, uuid)     to anon, authenticated;
grant execute on function public.blog_comments_public(text)       to anon, authenticated;

-- ============================================================================
-- COMO MODERAR (Table Editor > blog_comments)
--
--   Tirar um comentario do ar, mantendo o registro e o contato do autor:
--     update public.blog_comments set visible = false where id = '<id>';
--
--   Apagar de vez (pedido de exclusao pela LGPD, por exemplo):
--     delete from public.blog_comments where id = '<id>';
--
--   Ver o que chegou hoje, com e-mail:
--     select created_at, slug, first_name, last_name, email, body
--       from public.blog_comments
--      where created_at > now() - interval '1 day'
--      order by created_at desc;
-- ============================================================================

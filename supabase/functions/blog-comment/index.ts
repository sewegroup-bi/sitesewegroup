// ============================================================================
// Edge Function: blog-comment
//
// Recebe um comentario do blog, valida, freia spam e grava em blog_comments.
// O comentario e publicado na hora (o Alex remove depois, se precisar), por
// isso a validacao aqui e a unica barreira: honeypot, limite por IP, limite
// de links e checagem de tamanho.
//
// Deploy:  supabase functions deploy blog-comment --project-ref bjohdxudealxhsumrxsg
// Segredo opcional (sal do hash de IP):
//          supabase secrets set COMMENT_IP_SALT="<qualquer string longa>"
// ============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ORIGINS = [
  'https://www.sewegroup.com.br',
  'https://sewegroup.com.br',
  'http://localhost:5173',
];

const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && ORIGINS.includes(origin) ? origin : ORIGINS[0],
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
});

// Limites
const MAX_POR_IP_10MIN = 3;      // comentarios do mesmo IP em 10 minutos
const MAX_LINKS = 1;             // links dentro do texto
const BODY_MIN = 5;
const BODY_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,119}$/;

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

const clean = (v: unknown, max: number) =>
  String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

Deno.serve(async (req) => {
  const headers = { ...cors(req.headers.get('origin')), 'Content-Type': 'application/json' };

  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') return new Response('{"error":"metodo"}', { status: 405, headers });

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return new Response('{"error":"json invalido"}', { status: 400, headers });
  }

  // Honeypot: campo invisivel preenchido por bot. Responde ok e descarta.
  if (clean(payload.website, 200)) {
    return new Response('{"ok":true}', { headers });
  }

  const slug = clean(payload.slug, 120).toLowerCase();
  const firstName = clean(payload.first_name, 40);
  const lastName = clean(payload.last_name, 40);
  const email = clean(payload.email, 160).toLowerCase();
  const body = String(payload.body ?? '').trim().slice(0, BODY_MAX + 1);
  const consent = payload.consent === true;

  const erro = (msg: string, status = 400) =>
    new Response(JSON.stringify({ error: msg }), { status, headers });

  if (!SLUG_RE.test(slug)) return erro('Post invalido.');
  if (firstName.length < 2) return erro('Informe seu nome.');
  if (!EMAIL_RE.test(email)) return erro('Informe um e-mail valido.');
  if (body.length < BODY_MIN) return erro('Escreva um comentario um pouco maior.');
  if (body.length > BODY_MAX) return erro(`O comentario passa de ${BODY_MAX} caracteres.`);
  if (!consent) return erro('E preciso aceitar a politica de privacidade.');

  const links = (body.match(/https?:\/\/|www\./gi) || []).length;
  if (links > MAX_LINKS) return erro('Comentarios com varios links nao sao aceitos.');

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'sem-ip';
  const salt = Deno.env.get('COMMENT_IP_SALT') || 'sewe-blog';
  const ipHash = await sha256(ip + salt);
  const userAgent = clean(req.headers.get('user-agent'), 300);

  const db = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  // Freio 1: quantos comentarios esse IP mandou nos ultimos 10 minutos.
  const desde = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db
    .from('blog_comments')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', desde);

  if ((count ?? 0) >= MAX_POR_IP_10MIN) {
    return erro('Voce ja comentou varias vezes agora ha pouco. Tente de novo em alguns minutos.', 429);
  }

  // Freio 2: mesmo texto, mesmo IP, mesmo post nas ultimas 24h.
  const ontem = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: repetido } = await db
    .from('blog_comments')
    .select('id')
    .eq('ip_hash', ipHash)
    .eq('slug', slug)
    .eq('body', body)
    .gte('created_at', ontem)
    .limit(1);

  if (repetido && repetido.length) {
    return erro('Esse comentario ja foi enviado.', 409);
  }

  const { data, error } = await db
    .from('blog_comments')
    .insert({
      slug,
      first_name: firstName,
      last_name: lastName,
      email,
      body,
      consent: true,
      consent_at: new Date().toISOString(),
      ip_hash: ipHash,
      user_agent: userAgent,
    })
    .select('id, created_at')
    .single();

  if (error) {
    console.error('insert falhou', error);
    return erro('Nao consegui salvar seu comentario agora. Tente de novo em instantes.', 500);
  }

  return new Response(JSON.stringify({
    ok: true,
    comment: {
      id: data.id,
      author: [firstName, lastName].filter(Boolean).join(' '),
      body,
      created_at: data.created_at,
    },
  }), { headers });
});

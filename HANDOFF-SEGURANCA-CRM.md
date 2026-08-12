# Handoff de segurança — CRM-SEWE · tabela `proposal_links`

**Para:** desenvolvedor(a) do CRM-SEWE
**Origem:** auditoria de segurança do projeto Supabase `CRM-SEWE` (ref `bjohdxudealxhsumrxsg`)
**Severidade:** alta — exposição de dados comerciais de clientes
**Status:** correção iniciada no banco (passo 1 feito). Falta a virada do frontend e o fechamento final.

---

## TL;DR

A tabela `public.proposal_links` está legível por **qualquer pessoa na internet**, sem login, por causa de uma policy de RLS permissiva (`SELECT` com `USING (true)` para o papel `anon`). Como a chave `anon` do Supabase é pública por design (e está no repositório público do site institucional), dá para baixar **as 108 propostas inteiras + seus códigos de acesso** com uma única requisição HTTP.

A correção é trocar a leitura pública da tabela por uma função `SECURITY DEFINER` que devolve **só a proposta cujo código a pessoa já tem**, e então remover o acesso direto do `anon` à tabela.

**A parte do banco que não quebra nada já foi aplicada.** O que falta depende de uma mudança no frontend do CRM (a página pública de proposta) — por isso este handoff.

---

## O problema, com prova

`proposal_links` tem estas colunas:

| coluna | tipo | papel |
|---|---|---|
| `codigo` | `text` | o segredo que abre uma proposta pública |
| `dados` | `jsonb` | o conteúdo completo da proposta |
| `created_by` | `uuid` | usuário do CRM que gerou |
| `created_at` | `timestamptz` | data |

Policy atual (problema):

```
tablename       policyname                    roles                  cmd     qual
proposal_links  proposal_links_select_public  {anon, authenticated}  SELECT  true
```

`qual = true` significa "sem nenhuma checagem". Como a policy vale para `anon`, qualquer um com a chave pública lê a tabela **inteira** — não só a linha do próprio código.

**Reprodução** (a chave `anon` é a mesma que está em `components/engage.jsx` do repositório do site institucional):

```bash
curl 'https://bjohdxudealxhsumrxsg.supabase.co/rest/v1/proposal_links?select=codigo,dados' \
  -H "apikey: <ANON_KEY_PUBLICA>" \
  -H "Authorization: Bearer <ANON_KEY_PUBLICA>"
```

Hoje isso devolve as 108 propostas com todos os códigos. Depois da correção, deve devolver `[]` ou erro de permissão.

Referência do padrão de falha: OWASP API Security #1 (BOLA/IDOR).

---

## O que já foi aplicado no banco (não precisa refazer)

**1. Função `proposal_by_code` — criada e concedida ao `anon`.** É o substituto seguro da leitura direta: recebe um código e devolve só aquela proposta.

```sql
create or replace function public.proposal_by_code(p_codigo text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select dados from public.proposal_links where codigo = p_codigo limit 1;
$$;

grant execute on function public.proposal_by_code(text) to anon, authenticated;
```

**2. (Sem relação com o frontend) A tabela `config_origens` foi fechada** para `anon` — era outra policy `SELECT true`. Já resolvido, não exige nada de você.

---

## O que você precisa fazer

### Passo A — Verificar a função (1 min, no SQL Editor)

```sql
select codigo from public.proposal_links limit 1;
-- copie o código retornado e rode:
select public.proposal_by_code('COLE_O_CODIGO_AQUI');
```

Se voltar o JSON de `dados`, a função está pronta para o frontend.

> **Atenção:** a função hoje devolve **apenas a coluna `dados`**. Se a página pública de proposta usa outras colunas da tabela (por ex. `created_at` para mostrar a data, ou algo de `created_by`), me avise / ajuste a função para devolver esses campos também. Se todo o conteúdo renderizado já vem de dentro do `dados`, não precisa mexer.

### Passo B — Trocar a leitura no frontend do CRM

Procure no código do CRM por `proposal_links`. A página pública de proposta deve ter algo assim:

**Antes (inseguro — lê a tabela direto):**
```js
const { data } = await supabase
  .from('proposal_links')
  .select('dados')
  .eq('codigo', codigo)
  .single();
const proposta = data?.dados;
```

**Depois (seguro — RPC por código):**
```js
const { data: proposta, error } = await supabase
  .rpc('proposal_by_code', { p_codigo: codigo });
// `proposta` já é o jsonb `dados`
if (error || !proposta) {
  // proposta não encontrada / código inválido → tela de "link inválido"
}
```

Se em vez do client `supabase-js` o CRM usa `fetch` puro:

```
Antes:  GET  /rest/v1/proposal_links?codigo=eq.XXX&select=dados
Depois: POST /rest/v1/rpc/proposal_by_code
        body: {"p_codigo":"XXX"}
```

### Passo C — Conferir os outros usos de `proposal_links`

O `grep proposal_links` provavelmente acha mais de um lugar. Separe:

- **Leitura na página pública** (visitante sem login) → tem que virar `proposal_by_code` (passo B). É o único caminho que o `anon` percorre.
- **Leituras/escritas dentro do CRM logado** (listar links gerados, criar link, etc.) → **não precisam mudar.** O passo D mantém uma policy de `SELECT` para `authenticated`, então o CRM continua funcionando igual. Só confirme que essas telas rodam autenticadas.

### Passo D — Deploy do frontend, e SÓ ENTÃO fechar o banco

Depois que a página pública já estiver chamando a RPC **em produção**, rode no SQL Editor:

```sql
drop policy proposal_links_select_public on public.proposal_links;

create policy proposal_links_select_auth
  on public.proposal_links for select to authenticated
  using (true);
```

Isso remove o `anon` da leitura direta e preserva o acesso do CRM logado.

> Se as telas internas do CRM mostram só os links do próprio usuário, você pode trocar `using (true)` por `using (created_by = auth.uid())` para deixar mais restrito. Mantenha `true` se qualquer pessoa da equipe vê todos os links (assim não muda o comportamento atual).

### Passo E — Verificar que fechou

1. Rode de novo o `curl` da seção "O problema" → agora deve vir `[]` ou erro. Se ainda listar propostas, o passo D não pegou.
2. Abra um link público de proposta real no navegador → tem que continuar funcionando normalmente (agora via RPC).

---

## Ordem importa (resumo do sequenciamento)

```
[feito]  1. criar função proposal_by_code
   →     2. trocar a leitura pública para a RPC (frontend)
   →     3. deploy do frontend em produção
   →     4. rodar o DROP + nova policy (passo D)
   →     5. verificar (passo E)
```

**Não rode o passo D antes do deploy do frontend.** Se fizer isso, todos os links de proposta que os clientes têm na mão param de abrir na hora, até o frontend novo subir.

Enquanto o passo D não subir, a exposição continua aberta — então trate a virada como prioridade.

---

## Dois pontos de atenção (recomendo revisar)

1. **O `codigo` precisa ser imprevisível.** A RPC impede o dump em massa, mas se `codigo` for curto ou sequencial, dá para adivinhar código por código. Confirme que é um token aleatório longo (UUID ou 20+ caracteres aleatórios). Se for curto/sequencial, gere códigos novos mais fortes e/ou adicione rate limit.

2. **Rate limit (opcional).** Se quiser blindar contra tentativa de adivinhação de código, dá para pôr a RPC atrás de uma Edge Function com limite por IP, no mesmo molde da função `blog-comment` que já existe no projeto do site.

---

## Rollback

Se algo der errado depois do passo D e você precisar voltar ao estado anterior **rapidamente** (aceitando reabrir a exposição temporariamente):

```sql
drop policy if exists proposal_links_select_auth on public.proposal_links;
create policy proposal_links_select_public
  on public.proposal_links for select to anon, authenticated
  using (true);
```

Isso restaura o comportamento antigo. Use só como emergência, e refaça o passo D assim que o frontend estiver ok.

---

## Contexto da auditoria (para referência)

Isto saiu de uma varredura dos 5 vetores comuns em app gerado por IA. O resto do projeto passou bem: RLS está **ligado em todas as 39 tabelas** (o cenário catastrófico do CVE-2025-48757 não existe aqui), não há `service_role` vazada no Git, e as demais policies checam o usuário corretamente. `proposal_links` era a única com `SELECT true` para `anon` apontando para dado sensível — por isso é a única correção crítica.

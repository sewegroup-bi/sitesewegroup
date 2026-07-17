# Guia do Blog SEWE — Padrão editorial + Runbook de publicação

Este arquivo orienta qualquer sessão do Claude a publicar artigos no blog.
Fluxo: o Alex entrega o texto pronto (e as imagens em `design-drop/` ou `public/assets/blog/`);
o Claude monta o HTML, integra ao site, testa o build e prepara o commit. O Alex dá o push.

---

## 1. Padrão editorial (o que todo artigo precisa ter)

**Estrutura:**
- H1 único (50-60 caracteres, palavra-chave no início, promessa prática)
- Linha de crédito sob o título: `Por [Nome] · Publicado em [data]` (+ `Atualizado em [data]` quando revisar)
- Introdução-gancho de até 150 palavras, com a palavra-chave no 1º parágrafo
- H2s frequentes; passos práticos em H3; parágrafos de 3-4 linhas; negrito nos termos-chave; listas
- Seção conectando o problema à solução Sewe (sem tom de anúncio)
- Conclusão curta + CTA padrão: "Peça uma demonstração" → /#agendar e "Fale com um especialista" → WhatsApp
- **Caixa do autor** no rodapé: foto, nome, cargo, 2 linhas de experiência, link do LinkedIn
- **Referências**: links externos para fontes de autoridade citadas no texto (estudos, IBGE, associações)
- 1-2 links internos (outros posts ou /distribuidor, /industria, /solucoes)

**SEO on-page (checklist antes de publicar):**
- [ ] Palavra-chave no H1, em ≥1 H2, na introdução e no slug da URL
- [ ] Slug curto: `/nome-do-artigo` (sem stopwords desnecessárias)
- [ ] `<title>` próprio (até ~60c) e meta description (até 155c) que induz clique
- [ ] Canonical, og:url, og:title, og:description e og:image próprios do post
- [ ] OG image 1200×630 específica do post (Alex fornece; fallback: logo padrão)
- [ ] `alt` descritivo em todas as imagens
- [ ] JSON-LD `BlogPosting` no head: headline, description, image, author (Person + sameAs LinkedIn), publisher (SEWE Group + logo), datePublished, dateModified
- [ ] **Conteúdo do artigo em HTML estático dentro do arquivo do post** (ver §2.3) — não depender só do render via JS
- [ ] Nova URL adicionada em `public/sitemap.xml` (arquivo estático — não se atualiza sozinho!)

**Tom de voz (mesmo padrão do site):** falar com "você"; benefício antes do recurso; concreto vence abstrato;
sem jargão interno; dor nomeada sem catastrofismo; nenhuma métrica inventada — números só com fonte.

---

## 2. Runbook técnico (como publicar NESTE site)

Arquitetura: site estático multi-página com Vite. Cada página `.html` da raiz é uma entrada do build.
Posts usam a entry compartilhada `src/entries/post.js` (brand, layout, blogdata, pages).

### 2.1 Registrar o post na listagem
Adicionar entrada no array `SEWE_POSTS` em `components/blogdata.jsx` (copiar o formato de um post existente):
slug, categoria (`'blog'` ou `'premio'`), título, resumo, data, autor, imagem de capa.
Isso alimenta os cards em /blog (e /premio se for da categoria prêmio).

### 2.2 Criar o arquivo da página
Duplicar `curva-abc-capital-de-giro.html` como `<slug>.html` na raiz e ajustar:
- `<title>`, meta description, canonical `https://www.sewegroup.com.br/<slug>`, og:* e JSON-LD BlogPosting
- `data-slug="<slug>"` no div raiz (é assim que o BlogPostPage sabe qual post renderizar)

### 2.3 Conteúdo estático (regra de ouro deste blog)
Além do render via `blogdata.jsx`, o corpo completo do artigo deve existir como HTML semântico
dentro do `<slug>.html` (dentro do div raiz, que o React substitui ao hidratar). Assim o Google
indexa o texto integral mesmo sem executar JS. Manter os dois sincronizados.

**Não edite esse HTML estático à mão.** Rode `npm run sync:posts` (script `scripts/gen-static-posts.mjs`):
ele lê `blogdata.jsx` (fonte da verdade) e regenera o JSON-LD `BlogPosting` e o corpo estático de
todos os posts. Tipos de bloco suportados: `lead`, `h`, `p`, `list`, `metrics`, `callout`, `stat`, `quote`.
Autor vem de `SEWE_AUTHORS` (chave = `post.author`); referências aceitam `{ source, label, url, note }`;
CTA por-post via `post.cta { primary, secondary }`. Sempre rode o sync após mexer em `blogdata.jsx`.

### 2.4 Imagens
- Pasta: `public/assets/blog/<slug>/` (ex.: `public/assets/blog/ruptura-estoque/capa.png`)
- Referenciar como `/assets/blog/<slug>/arquivo.png`
- O Alex cria as imagens e entrega em `design-drop/` (fora do git) → mover para `public/assets/blog/<slug>/`
- Comprimir se >300KB (usar sharp/imagemagick no sandbox se preciso)

### 2.5 Sitemap
Adicionar `<url><loc>https://www.sewegroup.com.br/<slug></loc><priority>0.6</priority></url>`
em `public/sitemap.xml`.

### 2.6 Publicar
1. `npm run build` — precisa passar sem erro (o novo html entra sozinho como entrada do Vite)
2. `git add -A && git commit` (autor: Alex De Souza <alex.souza@seweconsultoria.com.br>)
3. Pedir ao Alex o push: `cd "C:\SiteSewe\Site Sewe Group"; git push origin main`
4. Pós-deploy: conferir a página no ar e lembrar o Alex de solicitar indexação da URL no Search Console

### Cuidados conhecidos deste projeto
- Gravações grandes via ferramenta de arquivo podem truncar → escrever arquivos grandes via shell (heredoc/python)
- Títulos usam a fonte Chakra Petch, que NÃO tem o glifo travessão (—) → nunca usar — em H1/H2/H3
- Links internos sempre com URL limpa (`/blog`, `/distribuidor`), nunca `.html`
- Não mexer em `noindex`/robots (o site já está liberado) nem nos registros DNS/meta de outras páginas

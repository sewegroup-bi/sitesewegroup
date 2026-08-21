# SEWE Group — Site Institucional

Home institucional da **SEWE Group** — consultoria e plataforma de Business Intelligence
especializada em distribuidores e atacadistas, parceira oficial Qlik.

🔗 Substitui [www.sewegroup.com.br](https://www.sewegroup.com.br)

---

## Visão geral

Site multi-página construído em **HTML + CSS + React**, empacotado com **Vite**.
Rode `npm install` e `npm run dev` para desenvolver; o Vercel roda `npm run build` a cada push (ver LANCAMENTO.md).

Destaques:

- **Hero** com dashboard "Qlik-skin SEWE" (navy `#2d436c` + turquesa `#75e3e4`).
- **Operação ao vivo** — visualização interativa do distribuidor operando
  (Fornecedores → Estoque → Expedição → Força de Vendas → Clientes), com fluxo de
  dados animado, KPIs em tempo real e cada suíte se acoplando à sua parte da operação.
- **4 suítes** (Suprimentos, Comercial, Financeiro, Gestão Estratégica) com dashboards
  Qlik-style por aba.
- **Níveis de maturidade** SMART / SCALE / STRATEGIC.
- **Diferenciais**, **cases** (Multiseg, PETSUL, WMG), **FAQ** e **CTA** de diagnóstico.

---

## Estrutura de arquivos

```
.
├── index.html               # Home (ponto de entrada)
├── quem-somos.html          # Página: história, missão, visão, valores
├── premio.html              # Página: Prêmio SEWE (pilares + vencedores)
├── blog.html                # Índice do blog
├── prospeccao.html          # Oferta: Prospecção de Mercado (indústria)
├── comercio-digital.html    # Oferta: Comércio Digital B2B (indústria)
├── faq.html                 # Página de FAQ
├── vencedor-premio-2024.html        # Post (vencedor do Prêmio) — modelo p/ duplicar
├── curva-abc-capital-de-giro.html   # Post (artigo de blog) — modelo p/ duplicar
├── styles.css               # Design system: tokens, tipografia, componentes base
├── components/
│   ├── brand.jsx            # Logo SEWE + biblioteca de ícones
│   ├── layout.jsx           # Header + Footer + PageHero COMPARTILHADOS (fonte única)
│   ├── qlik.jsx             # Componentes de dashboard estilo Qlik Sense
│   ├── hero.jsx             # Hero da home
│   ├── logos.jsx            # Faixa de clientes + barra de métricas
│   ├── ecosystem.jsx        # "Operação ao vivo" (visualização do distribuidor)
│   ├── bus.jsx              # Ecossistema conectado + Integration + Sales
│   ├── suites.jsx           # Seção das 4 suítes com tabs e dashboards
│   ├── rest.jsx             # Maturidade, diferenciais, cases, FAQ, CTA
│   ├── i18n.jsx            # Idiomas PT/EN/ES: textos, tr(), seletor de bandeirinha
│   ├── ofertas.jsx         # Páginas /prospeccao e /comercio-digital
│   ├── instagram.jsx       # Vitrine do Instagram (embed oficial) no fim do blog
│   ├── blogdata.jsx         # CONTEÚDO de blog e prêmio (array SEWE_POSTS)
│   ├── pages.jsx            # Páginas: Quem Somos, Prêmio, Blog, Post, FAQ
│   └── app.jsx              # Composição raiz da home + painel de Tweaks
└── README.md
```

---

## Páginas internas (Header/Footer compartilhados)

Header, Footer e o cabeçalho de página vivem em **`components/layout.jsx`** —
**fonte única**. Mude o menu ou o contato lá e vale para todas as páginas.

### Como adicionar um post de blog OU um vencedor do Prêmio (sem admin)

1. Abra **`components/blogdata.jsx`** e adicione uma entrada no array `SEWE_POSTS`
   (copie uma existente). Use `category: 'premio'` para vencedores — eles aparecem
   automaticamente na página do Prêmio; `category: 'blog'` para artigos comuns.
2. **Duplique** um arquivo de post (ex.: `vencedor-premio-2024.html`), renomeie para
   `<slug>.html` e troque o `data-slug` para o slug da nova entrada.
3. `git add . && git commit && git push`. Pronto — aparece no Blog e no Prêmio.

---

## Idiomas (PT-BR · EN · ES)

Português é o padrão; quem chega com o navegador em inglês ou espanhol já cai no
idioma dele, e a escolha fica salva no `localStorage`. `?lang=en` / `?lang=es` na
URL também força o idioma. O seletor é só a bandeirinha, no header.

Dois arquivos, com papéis diferentes:

| Arquivo | O que guarda | Como se usa |
|---|---|---|
| `components/i18n.jsx` | navegação e rótulos curtos compartilhados, por chave | `tr('nav.blog')` |
| `components/i18n-content.js` | copy das páginas, com a **frase em português como chave** | `tx('Menos ruptura.')` |

`tx()` cai no próprio português quando falta tradução — nunca quebra a página. O
dicionário de conteúdo (~1.260 frases, 65 KB gzip) é um chunk separado, baixado
**só quando o visitante escolhe EN/ES**: quem lê em português não paga nada por ele.

**Traduzido:** header, footer, home, Indústria, Distribuidor & Atacado,
Plataforma de Dados & IA, Prospecção de Mercado, Comércio Digital B2B, Quem Somos,
FAQ, Prêmio (moldura), Blog (moldura) e a vitrine do Instagram.
**Segue em português:** os 8 artigos do blog e dos vencedores do Prêmio (título,
resumo e corpo) e a Política de Privacidade (documento legal em português). Nessas
páginas aparece uma faixa discreta avisando — é o `<SiteHeader/>` **sem** a prop
`translated`.

Para traduzir texto novo:

1. Envolva a frase com `tx('...')` no componente.
2. Acrescente a entrada em `components/i18n-content.js` com `en` e `es`.
3. Se a página inteira ficar traduzida, passe `translated` no `<SiteHeader/>` dela.

⚠️ **Cuidado com dados de módulo.** `tx()` em `const` de topo de arquivo roda uma
única vez, antes de o dicionário chegar, e não reage à troca de idioma. Se precisar
de um array/objeto traduzido fora de componente, transforme em função
(`const dpAreas = () => [...]`, como em `herodist.jsx` e `ecosystem.jsx`) e chame no
render. Em `blogdata.jsx` o texto fica cru e a tradução acontece no render
(`tx(post.readTime)`).

## Convenções de copy (auditoria ago/2026)

Três regras que valem para qualquer texto novo no site:

1. **Dois rótulos de CTA, sem variação.** `tr('cta.primary')` = "Agendar diagnóstico
   de 30 min", `tr('cta.secondary')` = "Ver como funciona". Nada de inventar um
   terceiro rótulo — repetição constrói reconhecimento, variação constrói dúvida.
2. **Prova antes do argumento.** `<ProofBar/>` (em `layout.jsx`) vai logo abaixo do
   hero em toda página de venda. Os números vêm da mesma fonte da `BragBar`.
3. **Painel de demonstração leva selo.** Todo painel com número fictício mostra
   "dados ilustrativos" (`.demo-foot`, `.ecf-foot` ou o rodapé do `QlikFrame`).
   Número real leva nome do cliente e ano.

## Instagram no fim do blog

**`components/instagram.jsx`** renderiza os posts pelo **embed oficial do
Instagram** (sem token, sem API). Para atualizar: no Instagram, abra o post →
`...` → *Copiar link* e cole em `SEWE_IG_POSTS` (o mais recente em cima).
O script do Instagram só é baixado quando o visitante rola até a seção.

---

## Identidade visual

| Token            | Cor        | Uso                                          |
|------------------|------------|----------------------------------------------|
| `--navy`         | `#2d436c`  | Headlines, botão primário, logo, footer      |
| `--turquoise`    | `#75e3e4`  | Acentos pontuais, métricas, estados ativos   |
| `--slate`        | `#586580`  | Textos secundários, ícones                   |
| `--bg-soft`      | `#f7f8fb`  | Fundos de seção alternados                   |

- **Display / títulos:** Chakra Petch
- **Corpo:** Inter
- **Números / monoespaçado:** JetBrains Mono

Fontes carregadas via Google Fonts (CDN).

---

## Rodando localmente

Por usar `<script type="text/babel">`, o navegador bloqueia o carregamento dos
arquivos `.jsx` via `file://`. Use um servidor estático local:

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000/Sewe%20Group%20Site.html`.

---

## Publicando

### GitHub Pages
1. Suba estes arquivos para um repositório.
2. Em **Settings → Pages**, selecione a branch (`main`) e a pasta raiz (`/`).
3. Renomeie a página de entrada para `index.html` se quiser que abra na raiz do domínio
   (ver nota abaixo).

### Vercel / Netlify
Conecte o repositório e faça o deploy — sem configuração de build (projeto estático).
Aponte o domínio `sewegroup.com.br` nas configurações de domínio do provedor.

> **Nota:** o ponto de entrada é `index.html` (serve direto na raiz do domínio).
> Os caminhos de `styles.css`, `components/` e `assets/` são relativos — mantenha
> todos os arquivos no mesmo nível.

---

## Notas técnicas

- **Sem etapa de build.** React, ReactDOM e Babel são carregados por CDN com
  *integrity hashes* fixados. Para produção de alto tráfego, considere pré-compilar
  o JSX e remover o transformer do Babel do navegador.
- **Responsivo** e com suporte a `prefers-reduced-motion`.
- **Painel de Tweaks** (variação do hero e animação da operação) é uma ferramenta de
  pré-visualização e não afeta o site publicado.

---

© 2026 SEWE Group. Todos os direitos reservados.

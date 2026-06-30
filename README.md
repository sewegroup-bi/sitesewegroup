# SEWE Group — Site Institucional

Home institucional da **SEWE Group** — consultoria e plataforma de Business Intelligence
especializada em distribuidores e atacadistas, parceira oficial Qlik.

🔗 Substitui [www.sewegroup.com.br](https://www.sewegroup.com.br)

---

## Visão geral

Site de página única (long-form) construído em **HTML + CSS + React (via Babel no navegador)**.
Não exige build, bundler ou Node — abre direto no navegador ou em qualquer hospedagem estática.

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
├── faq.html                 # Página de FAQ
├── minerconect.html         # Produto à parte: MinerConect
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
│   ├── blogdata.jsx         # CONTEÚDO de blog e prêmio (array SEWE_POSTS)
│   ├── pages.jsx            # Páginas: Quem Somos, Prêmio, Blog, Post, FAQ
│   ├── miner.jsx            # Página MinerConect
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

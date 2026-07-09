# Checklist de lançamento — www.sewegroup.com.br

Itens obrigatórios no dia em que o site substituir o atual.

## 1. Liberar indexação (CRÍTICO — sem isso o Google ignora o site)

- [ ] Remover a linha `<meta name="robots" content="noindex, nofollow"/>` de **todas as 15 páginas .html** (buscar por `noindex` no projeto; cada arquivo tem o comentário `DEV: remover a linha abaixo no lançamento`).
- [ ] Em `public/robots.txt`: apagar o bloco de desenvolvimento (`Disallow: /`) e descomentar o bloco de lançamento (`Allow: /` + `Sitemap:`).

## 2. Domínio

- [ ] Apontar `www.sewegroup.com.br` para o projeto no Vercel (Settings → Domains) e configurar o DNS.
- [ ] Redirecionar `sewegroup.com.br` (sem www) para `www.` no Vercel.
- [ ] Conferir que canonical, `og:url` e `og:image` respondem no domínio final (já apontam para `www.sewegroup.com.br`).

## 3. Pós-lançamento (primeira semana)

- [ ] Cadastrar o site no Google Search Console e enviar `sitemap.xml`.
- [ ] Testar o compartilhamento de link no WhatsApp/LinkedIn (preview com logo).
- [ ] Rodar o [teste de resultados avançados](https://search.google.com/test/rich-results) na home (JSON-LD Organization).
- [ ] Testar as páginas principais no celular (home, /distribuidor, /industria, /solucoes).
- [ ] Conferir agendamento do Google Agenda e os links de WhatsApp em produção.

## Como publicar mudanças (novo fluxo com build)

O site agora usa Vite. O Vercel roda `npm run build` automaticamente a cada push — nada muda no fluxo de publicar (commit + push). Para testar localmente:

```
npm install        # só na primeira vez
npm run dev        # servidor local em http://localhost:5173
npm run build      # gera a versão final em dist/
npm run preview    # testa a versão final
```

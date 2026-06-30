// ─────────────────────────────────────────────────────────────
// SEWE — Blog & Prêmio content
// HOW TO ADD A POST (no admin needed):
//   1. Add an entry to the SEWE_POSTS array below.
//   2. Duplicate an existing post HTML file (e.g. vencedor-premio-2025-diamaju.html),
//      rename it to "<slug>.html", and change data-slug to your new slug.
//   3. Commit + push. Done — it shows up on /blog and (if category:'premio') on /premio.
//
// category: 'premio'  → also listed on the Prêmio page (winners)
//           'blog'    → general article
//
// blocks types: { type:'p', text } paragraph · { type:'h', text } subtitle
//   { type:'quote', text, who } · { type:'stat', value, label }
//   { type:'list', items:[...] } · { type:'lead', text } big intro line
//   { type:'metrics', items:[{value,label}] } highlighted result grid
// logo: optional path to the winner's logo (shown on the cover instead of a metric)
// ─────────────────────────────────────────────────────────────

window.SEWE_POSTS = [
  {
    slug: 'vencedor-premio-2025-diamaju',
    category: 'premio',
    year: '2025',
    title: 'Diamaju — Vencedora do Prêmio SEWE 2025',
    date: '2025-12-10',
    readTime: '4 min de leitura',
    author: 'Equipe SEWE',
    excerpt: 'Crescimento acelerado com foco, organização e dados na palma da mão: a divisão PET da Diamaju cresceu +30,2% em faturamento após adotar o BI SEWE.',
    cover: { tag: 'PRÊMIO SEWE · 2025', logo: 'assets/logo-diamaju.png', logoBg: '#eef0f2' },
    blocks: [
      { type: 'lead', text: 'Crescimento acelerado com foco, organização e dados na palma da mão.' },
      { type: 'p', text: 'A Diamaju é uma empresa de grande porte, com atuação em múltiplas verticais. A divisão PET passou a ganhar protagonismo a partir de uma mudança estratégica de gestão e da adoção do BI SEWE no início de 2025.' },
      { type: 'p', text: 'Com os dados centralizados e acessíveis para toda a equipe comercial — representantes, promotores, televendas e supervisores — a empresa passou a operar com mais clareza, alinhamento e foco em oportunidades reais.' },
      { type: 'h', text: 'Principais avanços com o BI' },
      { type: 'metrics', items: [
        { value: '+30,2%', label: 'de crescimento em faturamento na divisão PET' },
        { value: '+22,7%', label: 'na positivação de clientes (+100 novos clientes ativos)' },
        { value: '+26,6%', label: 'no mix de produtos vendidos' },
        { value: '+15%', label: 'no ticket médio por cliente' },
        { value: '114', label: 'usuários ativos no BI, incluindo campo e gestão' },
      ]},
      { type: 'p', text: 'O reconhecimento da Diamaju mostra o que acontece quando a cultura de decisão por dados chega a toda a operação comercial — do representante à diretoria.' },
    ],
  },
  {
    slug: 'vencedor-premio-2025-eletransol',
    category: 'premio',
    year: '2025',
    title: 'Eletransol — Vencedora do Prêmio SEWE 2025',
    date: '2025-12-10',
    readTime: '4 min de leitura',
    author: 'Equipe SEWE',
    excerpt: 'Mais organização, menos dependência e decisões mais seguras: a Eletransol reduziu churn em 23,9% e a dependência dos Top 10 clientes com o BI SEWE.',
    cover: { tag: 'PRÊMIO SEWE · 2025', logo: 'assets/logo-eletransol.png', logoBg: '#eef0f2' },
    blocks: [
      { type: 'lead', text: 'Mais organização, menos dependência e decisões mais seguras.' },
      { type: 'p', text: 'A Eletransol se destacou pelo avanço consistente na organização dos processos e no uso estratégico dos dados para gestão comercial, financeira e de suprimentos.' },
      { type: 'p', text: 'Antes do BI, grande parte das análises era feita por planilhas manuais, o que tornava a gestão mais lenta e sujeita a erros operacionais. Com a implementação do BI SEWE, a empresa passou a ter uma visão clara do negócio e maior controle sobre indicadores críticos.' },
      { type: 'h', text: 'Principais avanços com o BI' },
      { type: 'metrics', items: [
        { value: '15,2% → 10%', label: 'redução da dependência dos Top 10 clientes' },
        { value: '+6%', label: 'de crescimento no ticket médio' },
        { value: '−23,9%', label: 'no churn de clientes' },
        { value: '+50,4%', label: 'no valor de orçamentos recebidos (2025 vs. 2024)' },
        { value: '67h', label: 'de desenvolvimento dedicado, com alto nível de personalização' },
      ]},
      { type: 'list', items: [
        'Expansão da base ativa, com mais clientes atendidos por mês.',
        'Gestão comercial, financeira e de suprimentos guiada por indicadores.',
      ]},
      { type: 'p', text: 'A trajetória da Eletransol prova que sair da planilha manual para o dado vivo não é só ganho de tempo — é decisão mais segura e menos risco concentrado.' },
    ],
  },
  {
    slug: 'vencedor-premio-2024-petsul',
    category: 'premio',
    year: '2024',
    title: 'PetSul — Vencedora do 1º Prêmio SEWE',
    date: '2025-02-11',
    readTime: '3 min de leitura',
    author: 'Equipe SEWE',
    excerpt: 'A primeira distribuidora reconhecida pelo Prêmio SEWE: a PetSul fortaleceu a venda de campo, organizou indicadores e acelerou o crescimento com análises estratégicas.',
    cover: { tag: 'PRÊMIO SEWE · 2024 · 1ª ENTREGA', logo: 'assets/logo-petsul.png', logoBg: '#ffffff' },
    blocks: [
      { type: 'lead', text: 'A primeira empresa a receber o Prêmio SEWE de Gestão Inteligente e Prosperidade.' },
      { type: 'p', text: 'A PetSul foi uma das duas empresas reconhecidas na primeira edição do prêmio por sua gestão inteligente de dados — trabalhando lado a lado com a equipe SEWE para transformar informação em resultado.' },
      { type: 'h', text: 'O que destacou a PetSul' },
      { type: 'list', items: [
        'Fortalecimento da estratégia de vendas de campo.',
        'Mais controle e indicadores organizados para a gestão.',
        'Crescimento acelerado por meio de análises estratégicas.',
        'Um modelo de distribuição focado nos detalhes, com visão clara de eficiência.',
      ]},
      { type: 'quote', text: 'A SEWE foi a grande ferramenta que concretizou nossas ideias, transformando nossa visão estratégica em realidade e ampliando nossa capacidade de análise e identificação de oportunidades.', who: 'Karin Cecilia · CEO da PetSul' },
      { type: 'p', text: 'Hoje a PetSul é referência em distribuição no mercado Pet no Brasil — e segue em frente, sempre em busca do aprimoramento contínuo.' },
    ],
  },
  {
    slug: 'vencedor-premio-2024-multiseg',
    category: 'premio',
    year: '2024',
    title: 'Multiseg — Vencedora do Prêmio SEWE',
    date: '2025-02-24',
    readTime: '3 min de leitura',
    author: 'Equipe SEWE',
    excerpt: 'A segunda entrega do Prêmio SEWE: a Multiseg se destacou pela evolução operacional, redução de estoque em 20% e autonomia das filiais apoiada em dados.',
    cover: { tag: 'PRÊMIO SEWE · 2024 · 2ª ENTREGA', logo: 'assets/logo-multiseg.png', logoBg: '#ffffff' },
    blocks: [
      { type: 'lead', text: 'Evolução operacional e autonomia das filiais, com decisão apoiada em dados.' },
      { type: 'p', text: 'A Multiseg se destacou pelo uso estratégico da análise de dados, impulsionando seu crescimento e aprimorando sua gestão ao lado da equipe SEWE. Foi a segunda empresa a receber o Prêmio SEWE de Gestão Inteligente e Prosperidade.' },
      { type: 'h', text: 'Principais avanços com o BI' },
      { type: 'metrics', items: [
        { value: '−20%', label: 'de estoque, com mais eficiência operacional' },
        { value: '+autonomia', label: 'das filiais para decidir com base em dados' },
        { value: '+crescimento', label: 'sustentado pela análise estratégica' },
      ]},
      { type: 'p', text: 'Decisões bem fundamentadas fazem a diferença no sucesso de um negócio. O reconhecimento da Multiseg celebra mais um ano de conquistas guiadas por dados.' },
    ],
  },
  {
    slug: 'curva-abc-capital-de-giro',
    category: 'blog',
    title: 'Curva ABC: o mapa para destravar capital de giro parado',
    date: '2026-05-28',
    readTime: '5 min de leitura',
    author: 'Equipe SEWE',
    excerpt: 'Estoque parado é o vazamento de caixa mais silencioso da distribuição. Veja como a Curva ABC, lida da forma certa, libera dinheiro sem cortar venda.',
    cover: { tag: 'GESTÃO · ESTOQUE', metric: 'A·B·C', metricLabel: 'participação no faturamento' },
    blocks: [
      { type: 'lead', text: 'Na distribuição, o caixa não some de uma vez. Ele vaza devagar — em prateleiras cheias do produto errado.' },
      { type: 'p', text: 'A Curva ABC classifica os SKUs pela participação no faturamento: poucos itens (Curva A) respondem pela maior parte do resultado, enquanto uma cauda longa (Curva C) ocupa estoque e capital sem girar.' },
      { type: 'h', text: 'O erro mais comum' },
      { type: 'p', text: 'Comprar a Curva C com o mesmo apetite da Curva A. O resultado é capital de giro preso em itens de baixo giro, enquanto faltam os campeões de venda — gerando ruptura justamente onde dói no faturamento.' },
      { type: 'list', items: [
        'Priorize a disponibilidade dos itens de Curva A — ruptura aqui é venda perdida na hora.',
        'Reavalie a recompra da Curva C — negocie prazo, reduza cobertura ou descontinue.',
        'Cruze a curva com margem: nem todo item de alto giro dá lucro.',
      ]},
      { type: 'stat', value: '68%', label: 'do faturamento costuma vir da Curva A' },
      { type: 'p', text: 'Quando a Curva ABC é monitorada de forma automática e diária — e não em uma planilha que envelhece — a decisão de compra deixa de ser palpite. É exatamente o que a suíte de Suprimentos da SEWE entrega.' },
      { type: 'quote', text: 'Liberamos caixa para comprar o que gira. A SEWE mostrou onde o capital estava travado.', who: 'Diretor de Compras · distribuidor SEWE' },
    ],
  },
];

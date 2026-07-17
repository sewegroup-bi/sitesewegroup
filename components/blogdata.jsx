// ─────────────────────────────────────────────────────────────
// SEWE, Blog & Prêmio content
// HOW TO ADD A POST (no admin needed):
//   1. Add an entry to the SEWE_POSTS array below.
//   2. Duplicate an existing post HTML file (e.g. vencedor-premio-2025-diamaju.html),
//      rename it to "<slug>.html", and change data-slug to your new slug.
//   3. Commit + push. Done, it shows up on /blog and (if category:'premio') on /premio.
//
// category: 'premio'  → also listed on the Prêmio page (winners)
//           'blog'    → general article
//
// blocks types: { type:'p', text } paragraph · { type:'h', text } subtitle
//   { type:'quote', text, who } · { type:'stat', value, label }
//   { type:'list', items:[...] } · { type:'lead', text } big intro line
//   { type:'metrics', items:[{value,label}] } highlighted result grid
// logo: optional path to the winner's logo (shown on the cover instead of a metric)
// references: optional [{ label, url }] — fontes de autoridade citadas no texto
// ─────────────────────────────────────────────────────────────

// Perfis de autor (caixa do autor + JSON-LD author/sameAs). Chave = post.author.
window.SEWE_AUTHORS = {
  'Alex de Souza': {
    role: 'Diretor Comercial · Sócio-fundador da SEWE Group',
    bio: 'Sócio-fundador da SEWE Group, acompanha de perto distribuidores de todo o Brasil na jornada de transformar dados em decisão comercial, do estoque à diretoria.',
    linkedin: 'https://www.linkedin.com/in/alexsouzasewegroup/',
  },
};

window.SEWE_POSTS = [
  {
    slug: 'vencedor-premio-2025-diamaju',
    category: 'premio',
    year: '2025',
    title: 'Diamaju, Vencedora do Prêmio SEWE 2025',
    date: '2025-12-10',
    readTime: '4 min de leitura',
    author: 'Alex de Souza',
    excerpt: 'Crescimento acelerado com foco, organização e dados na palma da mão: a divisão PET da Diamaju cresceu +30,2% em faturamento após adotar o BI SEWE.',
    cover: { tag: 'PRÊMIO SEWE · 2025', logo: 'assets/logo-diamaju.png', logoBg: '#eef0f2' },
    blocks: [
      { type: 'lead', text: 'Crescimento acelerado com foco, organização e dados na palma da mão.' },
      { type: 'p', text: 'A Diamaju é uma empresa de grande porte, com atuação em múltiplas verticais. A divisão PET passou a ganhar protagonismo a partir de uma mudança estratégica de gestão e da adoção do BI SEWE no início de 2025.' },
      { type: 'p', text: 'Com os dados centralizados e acessíveis para toda a equipe comercial, representantes, promotores, televendas e supervisores, a empresa passou a operar com mais clareza, alinhamento e foco em oportunidades reais.' },
      { type: 'h', text: 'Principais avanços com o BI' },
      { type: 'metrics', items: [
        { value: '+30,2%', label: 'de crescimento em faturamento na divisão PET' },
        { value: '+22,7%', label: 'na positivação de clientes (+100 novos clientes ativos)' },
        { value: '+26,6%', label: 'no mix de produtos vendidos' },
        { value: '+15%', label: 'no ticket médio por cliente' },
        { value: '114', label: 'usuários ativos no BI, incluindo campo e gestão' },
      ]},
      { type: 'p', text: 'O reconhecimento da Diamaju mostra o que acontece quando a cultura de decisão por dados chega a toda a operação comercial, do representante à diretoria.' },
    ],
  },
  {
    slug: 'vencedor-premio-2025-eletransol',
    category: 'premio',
    year: '2025',
    title: 'Eletransol, Vencedora do Prêmio SEWE 2025',
    date: '2025-12-10',
    readTime: '4 min de leitura',
    author: 'Alex de Souza',
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
      { type: 'p', text: 'A trajetória da Eletransol prova que sair da planilha manual para o dado vivo não é só ganho de tempo, é decisão mais segura e menos risco concentrado.' },
    ],
  },
  {
    slug: 'vencedor-premio-2024-petsul',
    category: 'premio',
    year: '2024',
    title: 'PetSul, Vencedora do 1º Prêmio SEWE',
    date: '2025-02-11',
    readTime: '3 min de leitura',
    author: 'Alex de Souza',
    excerpt: 'A primeira distribuidora reconhecida pelo Prêmio SEWE: a PetSul fortaleceu a venda de campo, organizou indicadores e acelerou o crescimento com análises estratégicas.',
    cover: { tag: 'PRÊMIO SEWE · 2024', logo: 'assets/logo-petsul.png', logoBg: '#ffffff' },
    blocks: [
      { type: 'lead', text: 'A primeira empresa a receber o Prêmio SEWE de Gestão Inteligente e Prosperidade.' },
      { type: 'p', text: 'A PetSul foi uma das duas empresas reconhecidas na primeira edição do prêmio por sua gestão inteligente de dados, trabalhando lado a lado com a equipe SEWE para transformar informação em resultado.' },
      { type: 'h', text: 'O que destacou a PetSul' },
      { type: 'list', items: [
        'Fortalecimento da estratégia de vendas de campo.',
        'Mais controle e indicadores organizados para a gestão.',
        'Crescimento acelerado por meio de análises estratégicas.',
        'Um modelo de distribuição focado nos detalhes, com visão clara de eficiência.',
      ]},
      { type: 'quote', text: 'A SEWE foi a grande ferramenta que concretizou nossas ideias, transformando nossa visão estratégica em realidade e ampliando nossa capacidade de análise e identificação de oportunidades.', who: 'Karin Cecilia · CEO da PetSul' },
      { type: 'p', text: 'Hoje a PetSul é referência em distribuição no mercado Pet no Brasil, e segue em frente, sempre em busca do aprimoramento contínuo.' },
    ],
  },
  {
    slug: 'vencedor-premio-2024-multiseg',
    category: 'premio',
    year: '2024',
    title: 'Multiseg, Vencedora do Prêmio SEWE',
    date: '2025-02-24',
    readTime: '3 min de leitura',
    author: 'Alex de Souza',
    excerpt: 'A segunda entrega do Prêmio SEWE: a Multiseg se destacou pela evolução operacional, redução de estoque em 20% e autonomia das filiais apoiada em dados.',
    cover: { tag: 'PRÊMIO SEWE · 2024', logo: 'assets/logo-multiseg-black.png', logoBg: '#eef0f2' },
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
    title: 'Curva ABC e IA preditiva: destrave capital de giro no estoque',
    date: '2026-05-28',
    readTime: '8 min de leitura',
    author: 'Alex de Souza',
    excerpt: 'Política de estoque linear trava o caixa. Veja como a Curva ABC com IA preditiva, calculada por SKU, destrava capital de giro imobilizado na distribuição.',
    cover: { tag: 'GESTÃO ESTRATÉGICA · SUPPLY CHAIN & FINANÇAS', metric: 'A·B·C', metricLabel: 'participação no faturamento' },
    cta: { primary: 'Agendar Diagnóstico de Capital de Giro e Supply', secondary: 'Falar com um Especialista Operacional' },
    blocks: [
      { type: 'lead', text: 'Em médias e grandes operações de distribuição, o colapso do fluxo de caixa raramente acontece por um evento súbito. Ele ocorre de forma silenciosa, gota a gota, através do capital imobilizado em prateleiras repletas de produtos com baixa velocidade de escoamento. Quando a liderança falha em enxergar o estoque como dinheiro sob risco, a eficiência operacional da companhia é severamente comprometida.' },
      { type: 'p', text: 'A tradicional Curva ABC surge como o primeiro framework para estancar essa sangria, classificando os SKUs de acordo com sua representatividade no faturamento. Teoricamente, uma minoria de itens (Curva A) sustenta o negócio, enquanto a cauda longa (Curva C) deveria demandar o mínimo de exposição financeira. Contudo, na dinâmica de mercado atual, gerenciar essa matriz através de planilhas estáticas ou relatórios retroativos do ERP é o equivalente a dirigir olhando apenas pelo retrovisor: você descobre que o caixa travou quando o capital de giro já virou poeira no galpão.' },
      { type: 'h', text: 'O erro mais comum (e financeiramente letal) da gestão generalista' },
      { type: 'p', text: 'O erro mais crítico cometido por Diretores de Compras e CFOs é a aplicação de uma política linear de cobertura, como a clássica decisão de fixar "45 dias de estoque" para toda a operação. Essa padronização ignora a volatilidade de demanda de cada SKU e gera um duplo desastre financeiro: superestocagem crônica da Curva C (gerando custos altíssimos de holding cost, obsolescência e aging) e, simultaneamente, a ruptura catastrófica da Curva A. Faltar o produto campeão de vendas destrói a margem líquida e entrega o cliente diretamente para a concorrência.' },
      { type: 'list', items: [
        'Cálculo de dias úteis dinâmicos por SKU: abandonar médias globais é mandatório. Cada item da Curva A precisa ter seus dias ideais calculados com base na velocidade real de escoamento e no lead time do fornecedor, eliminando o custo oculto das vendas perdidas.',
        'Governança agressiva sobre o aging da Curva C: itens de baixo giro devem ser submetidos a previsões de demanda restritivas. O foco é a liberação de liquidez: reduzir coberturas ao limite de segurança, renegociar prazos de pagamento com a indústria e liquidar estoques obsoletos para estancar a perda de custo de oportunidade.',
        'Cruzamento de giro vs. margem contábil: a verdadeira inteligência de negócios não avalia o SKU apenas pelo volume faturado. É preciso cruzar a Curva ABC com a margem de contribuição real e o centro de custos logístico. Muitas vezes, um item da Curva A drena a rentabilidade devido ao seu custo de armazenagem, enquanto um Curva B ou C sustenta o lucro líquido.',
      ]},
      { type: 'callout', text: 'Grande parte do capital de giro de um distribuidor pode ficar paralisada em SKUs sobrealocados quando a Curva ABC não é recalculada diariamente.' },
      { type: 'p', text: 'Para transformar o estoque em um motor de lucratividade, a Sewe Group desenvolveu uma suíte de Suprimentos & Logística Inteligente alimentada por IA preditiva. A tecnologia ingere longos históricos de vendas e dados macroeconômicos para estimar com precisão o volume de compras dos próximos meses por SKU. Ao integrar-se nativamente ao seu ERP, a plataforma calcula os dias úteis ideais para cada produto de forma individualizada, automatizando a decisão do comprador e garantindo que cada centavo do capital de giro seja alocado onde há garantia de retorno.' },
      { type: 'quote', text: 'Antes da Sewe Group, nossa gestão de compras operava sob a premissa de coberturas fixas, o que sobrecarregava nosso fluxo de caixa com produtos parados e nos expunha a rupturas severas nos itens de alto giro. A Inteligência Artificial da Sewe redesenhou nossa política de suprimentos por SKU. O resultado foi imediato: reduzimos drasticamente o aging do estoque, eliminamos o custo de vendas perdidas e destravamos milhões em capital de giro que hoje financiam nossa expansão.', who: 'Alessandro · CEO da Multiseg Distribuidora' },
    ],
    references: [
      { source: 'Gartner', label: 'Predictive Analytics in Supply Chain: Moving Beyond Static Inventory Models', url: 'https://www.gartner.com/en/supply-chain', note: 'Insights globais sobre a substituição de modelos estáticos por algoritmos preditivos na cadeia de suprimentos.' },
      { source: 'McKinsey & Company', label: 'Unlocking Working Capital: The Power of Granular Inventory Optimization', url: 'https://www.mckinsey.com/capabilities/operations/our-insights', note: 'Estudos de caso e metodologias sobre como a otimização de inventário libera liquidez imediata.' },
      { source: 'ASCM (Association for Supply Chain Management)', label: 'Supply Chain Body of Knowledge (SCBOK), Advanced Inventory Classification Techniques', url: 'https://www.ascm.org', note: 'Frameworks globais de governança e classificação avançada de ativos circulantes.' },
    ],
  },
];

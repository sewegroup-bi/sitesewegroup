// Maturity (SMART/SCALE/STRATEGIC) + Differentiators + Cases + FAQ + CTA + Footer

function MaturitySection() {
  const levels = [
    { key: 'SMART',     tag: 'Core',            badge: tx('Comece aqui'),
      title: tx('Pare de gerir por planilha.'),
      body: tx('Dashboards prontos com foco em controle operacional de vendas, finanças e estoque. Sai do Excel em 30 dias.'),
      includes: [tx('Dashboards de vendas, estoque e financeiro'), tx('Curva ABC automatizada'), tx('Positivação e ruptura'), tx('Suporte consultivo')] },
    { key: 'SCALE',     tag: tx('Expansão'),        badge: tx('Mais vendido'),
      title: tx('Cresça com previsibilidade.'),
      body: tx('Adiciona algoritmos de prospecção, projeções financeiras e análises avançadas. Quando o SMART já não basta.'),
      includes: [tx('Tudo do SMART'), tx('Projeção financeira · IA'), tx('Algoritmos de prospecção'), tx('Alertas de churn · Curva A'), tx('Consultoria mensal dedicada')] },
    { key: 'STRATEGIC', tag: tx('Alta Performance'),badge: 'Premium',
      title: tx('Decisão diária 100% por dado.'),
      body: tx('Gestão 360°. DRE automatizado, sugestão de compras via IA e previsibilidade orçamentária. Para o C-Level que decide todo dia.'),
      includes: [tx('Tudo do SCALE'), tx('DRE automatizado'), tx('Sugestão de compras · IA'), tx('Visão 360° C-Level'), tx('Simulação de cenários'), tx('Comitê executivo trimestral')] },
  ];
  return (
    <section id="maturidade" className="section" style={{ background: 'var(--band)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <div className="eyebrow">{tx('Níveis de maturidade')}</div>
          <h2 style={{ marginTop: 14 }}>SMART · SCALE · STRATEGIC.</h2>
          <p style={{ color: 'var(--text-2)', marginTop: 14, fontSize: 17 }}>{tx('Cada suíte tem os três níveis, e você escolhe um por suíte: Comercial no Strategic, Suprimentos no Smart, e assim por diante. Sobe área por área, sem trocar de plataforma.')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="mat-grid">
          {levels.map((l, i) => {
            const featured = i === 1;
            return (
              <div key={l.key} style={{
                background: featured ? 'var(--navy-900)' : '#fff',
                color: featured ? '#fff' : 'var(--text)',
                border: featured ? '1px solid var(--navy-800)' : '1px solid var(--line)',
                borderRadius: 16,
                padding: 24,
                position: 'relative',
                boxShadow: featured ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                transform: featured ? 'translateY(-8px)' : 'none',
              }}>
                {featured && (
                  <div style={{ position: 'absolute', top: -12, left: 24, background: 'var(--turquoise)', color: 'var(--navy-900)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 999 }}>{tx('MAIS VENDIDO')}</div>
                )}
                <div style={{ fontSize: 11, letterSpacing: '0.16em', color: featured ? 'var(--turquoise)' : 'var(--turquoise-ink)', fontWeight: 700, marginBottom: 10 }}>{tx('NÍVEL')} {l.tag.toUpperCase()}
                </div>
                <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 36, color: featured ? '#fff' : 'var(--navy-900)', letterSpacing: '-0.01em', marginBottom: 6 }}>
                  {l.key}
                </div>
                <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 20, color: featured ? '#fff' : 'var(--navy-900)', marginBottom: 12 }}>
                  {l.title}
                </div>
                <p style={{ color: featured ? 'rgba(255,255,255,0.72)' : 'var(--text-2)', marginBottom: 18, fontSize: 14 }}>{l.body}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {l.includes.map((it, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: featured ? 'rgba(255,255,255,0.86)' : 'var(--text)' }}>
                      <span style={{ marginTop: 2, width: 16, height: 16, borderRadius: 5, background: featured ? 'rgba(117,227,228,0.2)' : 'rgba(117,227,228,0.2)', color: featured ? 'var(--turquoise)' : 'var(--turquoise-ink)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <Icon name="check" size={10} stroke={3}/>
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#diagnostico" className={featured ? 'btn btn-accent' : 'btn btn-outline'} style={{ marginTop: 22, width: '100%', justifyContent: 'center' }}>{tr('cta.primary')}</a>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .mat-grid { grid-template-columns: 1fr !important; }
          .mat-grid > div { transform: none !important; }
        }
      `}</style>
    </section>
  );
}

function DifferentiatorsSection() {
  const items = [
    { icon: 'clock', title: tx('Go-live em 30 dias'), body: tx('Do contrato à primeira decisão em produção. Processo guiado por consultoria, sem projeto longo de BI do zero.') },
    { icon: 'link', title: tx('Integração nativa com ERPs'), body: tx('Conectores homologados para os principais ERPs do setor. Camada criptografada, sem precisar de time de TI interno.') },
    { icon: 'brain', title: tx('IA invisível'), body: tx('Roda em background, limpa outliers, cruza dados e entrega decisão pronta. Sem prompts, sem engenharia, sem cientista de dados.') },
    { icon: 'shield', title: tx('Segurança e LGPD'), body: tx('Dados cifrados em trânsito e repouso, homologação Qlik oficial, auditoria e política de retenção desenhadas por projeto.') },
    { icon: 'pkg', title: tx('DNA de Atacado e Distribuição'), body: tx('Consultores que falam ruptura, Curva A, positivação, rebate e capital de giro. Não traduzimos o setor, nós somos do setor.') },
    { icon: 'trophy', title: tx('Parceria oficial Qlik'), body: tx('Parceiro oficial da Qlik, plataforma de analytics líder global, Leader no Gartner® Magic Quadrant™ de Analytics & BI por 16 anos consecutivos (2026).') },
  ];
  return (
    <section id="diferenciais" className="section grain" style={{ background: '#0e1729', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(800px 400px at 80% 10%, rgba(117,227,228,0.1), transparent 60%)' }}/>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 56px' }}>
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>{tx('Por que SEWE')}</div>
          <h2 style={{ marginTop: 14, color: '#fff' }}>{tx('Seis razões que nenhum BI genérico oferece.')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.66)', marginTop: 14, fontSize: 17 }}>{tx('Nós entregamos solução vertical pronta, com DNA de atacado e distribuição e tempo de valor em semanas.')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }} className="diff-grid">
          {items.map((it, i) => (
            <div key={i} style={{ background: '#0e1729', padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(117,227,228,0.1)', color: 'var(--turquoise)', display: 'grid', placeItems: 'center' }}>
                <Icon name={it.icon} size={22} stroke={1.8}/>
              </div>
              <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 20, color: '#fff' }}>{it.title}</div>
              <p style={{ color: 'rgba(255,255,255,0.66)', fontSize: 14, lineHeight: 1.6 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .diff-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .diff-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function CasesSection() {
  const cases = [
    { co: 'MOCELIN', metric: '+15–20%', unit: tx('de crescimento em vendas'), quote: tx('Eu associo esse crescimento ao SEWE BI: sem gestão de dados você não tem clareza de onde atacar. O BI hoje é minha principal ferramenta de gestão.'), person: 'Neyla', place: 'Mocelin' },
    { co: 'ELETRANSOL', metric: '−23,9%', unit: tx('no churn de clientes'), quote: tx('Limitada ao ERP, a empresa ficaria parada no tempo. O BI é a nossa tela do cenário, e já projeta desempenho e atingimento de metas para o futuro.'), person: 'Elioneis', place: 'Eletransol', href: '/vencedor-premio-2025-eletransol' },
    { co: 'WMG', metric: tx('1 tela'), unit: tx('para decidir o que antes exigia várias fontes'), quote: tx('As compras ficaram mais assertivas. Antes buscávamos várias informações para decidir; hoje abrimos uma tela e tomamos a decisão.'), person: 'Thiago', place: 'WMG' },
  ];
  return (
    <section id="cases" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div style={{ maxWidth: 620 }}>
            <div className="eyebrow">{tx('Resultados que saem do papel')}</div>
            <h2 style={{ marginTop: 14 }}>{tx('Casos reais. Métricas reais.')}</h2>
          </div>
          <a href="/premio" className="btn btn-outline btn-sm">{tx('Ver todos os cases')} <Icon name="arrow" size={12} className="chev"/></a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="cases-grid">
          {cases.map((c, i) => (
            <article key={i} className="card card-hover" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.14em', fontWeight: 700 }}>CASE · {c.co}</div>
              <div className="display" style={{ fontSize: 46, fontWeight: 700, color: 'var(--navy-900)', letterSpacing: '-0.02em', lineHeight: 1 }}>{c.metric}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: -6 }}>{c.unit}</div>
              <div style={{ height: 1, background: 'var(--line)', margin: '8px 0' }}/>
              <p style={{ fontSize: 15, color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.55 }}>"{c.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <div style={{ width: 32, height: 32, borderRadius: 99, background: 'linear-gradient(135deg, var(--navy-700), var(--turquoise-2))' }}/>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--navy-900)' }}>{c.person}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{c.place}</div>
                </div>
              </div>
              {c.href && (
                <a href={c.href} style={{ marginTop: 4, fontSize: 13, color: 'var(--turquoise-ink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{tx('Ler case completo')} <Icon name="arrow" size={12}/>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:960px){.cases-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = React.useState(0);
  const qs = [
    { q: tx('Quanto tempo leva para o go-live?'), a: tx('O processo completo ocorre em até 30 dias a partir da liberação dos acessos ao seu ERP. É um processo guiado pela nossa consultoria, com entregas semanais. Você enxerga valor já no primeiro mês.') },
    { q: tx('Preciso de um time de BI ou TI dedicado?'), a: tx('Não. A SEWE é responsável pela conexão ao ERP, modelagem dos dados e configuração dos painéis. Sua equipe usa o produto; nós cuidamos da engenharia por trás.') },
    { q: tx('Posso customizar as soluções da SEWE para minha operação específica?'), a: tx('Sim! Uma das nossas forças é justamente personalizar módulos, dashboards e processos para refletir a realidade da sua empresa. Não entregamos pacotes genéricos, entregamos soluções ajustadas.') },
    { q: tx('O que diferencia a SEWE de outras empresas de BI e consultoria de dados?'), a: tx('Nosso diferencial está em combinar: um portfólio completo (BI + consultoria + integração + vendas), atendimento nacional, inteligência personalizada e foco em resultados concretos e sustentáveis.') },
    { q: tx('O Sewe Sales substitui o meu ERP?'), a: tx('Não. Ele roda por cima do ERP que você já usa: lê o dado na origem e devolve pedido e status para dentro dele. Crédito, faturamento, separação e entrega continuam no seu sistema.') },
    { q: tx('Meu cliente consegue comprar sozinho?'), a: tx('Sim. No Portal de Vendas B2B2C ele consulta produto, preço, estoque e a condição comercial dele e fecha o pedido 24 horas por dia, sem depender do vendedor. Quem prefere atendimento continua sendo atendido pela força de vendas, no mesmo sistema.') },
    { q: tx('A minha política comercial continua valendo?'), a: tx('Sim, e é aplicada na origem: catálogo e preço por cliente, markup por filial, teto de desconto por perfil e aprovação automática do que sai da regra. O pedido não é confirmado fora da política.') },
    { q: tx('O WhatsApp é o oficial?'), a: tx('Sim. A SEWE é certificada pela Meta para integrar a API do WhatsApp Business: número verificado, conversas dentro da política da plataforma e cada conversa registrada no histórico do cliente.') },
    { q: tx('E a LGPD?'), a: tx('Conformidade end-to-end: criptografia em trânsito e repouso, controle granular de acesso, política de retenção e trilha de auditoria. Documentação de DPIA disponível em até 48h úteis após assinatura de NDA.') },
    { q: tx('Meus dados saem da minha empresa?'), a: tx('A conexão é direta entre seu ERP e o ambiente Qlik hospedado em região brasileira. Você mantém o controle dos acessos e pode revogar a qualquer momento.') },
    { q: tx('Quanto custa?'), a: tx('O investimento depende da suíte, do nível (Smart, Scale ou Strategic), dos add-ons e da quantidade de usuários. Agende um diagnóstico gratuito de 30 minutos. Mostramos o ROI estimado com base nos seus dados antes de falar em preço.') },
  ];
  return (
    <section id="faq" className="section" style={{ background: 'var(--band)' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="eyebrow">{tx('Perguntas frequentes')}</div>
          <h2 style={{ marginTop: 14 }}>{tx('O que diretores perguntam antes de assinar.')}</h2>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16 }}>
          {qs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: i < qs.length - 1 ? '1px solid var(--line-2)' : 'none' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ width: '100%', padding: '20px 24px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
                >
                  <span style={{ flex: 1, fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 17, color: 'var(--navy-900)' }}>{f.q}</span>
                  <span style={{ color: 'var(--text-2)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s ease' }}>
                    <Icon name="arrowDown" size={18}/>
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 22px', color: 'var(--text-2)', fontSize: 15, lineHeight: 1.65, maxWidth: 760 }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Bloco de objeção ─────────────────────────────────────────
// As três perguntas que travam contrato, no fim das páginas de venda — em vez de
// ficarem só na FAQ, que só é lida por quem já procurou.
function ObjectionBlock() {
  useLocale();
  const qs = [
    { q: tx('Quanto custa?'),
      a: tx('Depende da suíte, do nível e da quantidade de usuários. No diagnóstico gratuito mostramos o ROI estimado com os seus dados antes de falar em preço.') },
    { q: tx('Preciso de um time de BI ou TI dedicado?'),
      a: tx('Não. A SEWE cuida da conexão ao ERP, da modelagem e dos painéis. Sua equipe usa o produto; a engenharia é nossa.') },
    { q: tx('Meus dados saem da minha empresa?'),
      a: tx('A conexão é direta entre o seu ERP e o ambiente Qlik hospedado em região brasileira. Você controla os acessos e revoga quando quiser.') },
  ];
  return (
    <section className="section-sm" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="ob-head">
          <div className="eyebrow">{tx('Antes de você perguntar')}</div>
          <a href="/faq" className="ob-link">{tx('Ver todas as perguntas')} <Icon name="arrow" size={13} stroke={2.2}/></a>
        </div>
        <div className="ob-grid">
          {qs.map((f, i) => (
            <div key={i} className="ob-card">
              <div className="ob-q">{f.q}</div>
              <p className="ob-a">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ob-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; flex-wrap: wrap; }
        .ob-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--turquoise-ink); text-decoration: none; }
        .ob-link:hover { text-decoration: underline; }
        .ob-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; }
        .ob-card { background: #fff; padding: 22px 24px; }
        .ob-q { font-family: var(--ff-display); font-weight: 600; font-size: 16px; color: var(--navy-900); margin-bottom: 8px; }
        .ob-a { font-size: 14px; color: var(--text-2); line-height: 1.6; margin: 0; }
        @media (max-width: 900px) { .ob-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

// ── Destinos de lead ─────────────────────────────────────────
// Sewe CRM via Supabase Edge Function (chave anon — pública por design, só funciona com RLS).
const SEWE_CRM_ENDPOINT = 'https://bjohdxudealxhsumrxsg.supabase.co/functions/v1/submit-lead';
const SEWE_CRM_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2hkeHVkZWFseGhzdW1yeHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMzQxNjYsImV4cCI6MjA5NDkxMDE2Nn0.0LvntzXgZZNJmvYP_3nrVHQibEKZhjpAa5AwzMj6wEw';
const SEWE_WHATSAPP = 'https://wa.me/5548984704389';

function submitLead(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  if (data.website) return; // honeypot preenchido → bot, descarta em silêncio

  const openWhats = () => {
    const msg = `Olá! Quero agendar um diagnóstico.\n\nNome: ${data.nome}\nE-mail: ${data.email}\nEmpresa: ${data.empresa}\nWhatsApp: ${data.whatsapp}`;
    window.open(`${SEWE_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!SEWE_CRM_ENDPOINT) { openWhats(); return; }

  fetch(SEWE_CRM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SEWE_CRM_ANON,
      'Authorization': `Bearer ${SEWE_CRM_ANON}`,
    },
    body: JSON.stringify({
      nome: data.nome,
      email: data.email,
      telefone: data.whatsapp,
      empresa: data.empresa,
      mensagem: `Lead do site, formulário "Agendar diagnóstico" (página ${window.location.pathname})`,
      website: '',
    }),
  }).then(r => {
    if (!r.ok) throw new Error();
    form.reset();
    alert(tx('Recebemos seus dados! Nossa equipe entra em contato em breve.'));
  }).catch(() => openWhats()); // CRM fora do ar → lead não se perde
}

function CTASection() {
  return (
    <section id="diagnostico" className="section grain" style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 55%, var(--turquoise-ink) 120%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 80% 100%, rgba(117,227,228,0.2), transparent 70%)' }}/>
      <div className="container cta-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>{tx('Diagnóstico consultivo · Gratuito')}</div>
          <h2 style={{ color: '#fff', marginTop: 14, fontSize: 'clamp(32px, 4vw, 52px)' }}>{tx('Uma reunião de 30 minutos. Com os seus dados. Sem compromisso.')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 18, fontSize: 17, maxWidth: 560 }}>{tx('Um diretor SEWE olha sua operação, identifica os 3 vazamentos mais caros em Curva A, ruptura ou margem, e mostra o que mudaria no primeiro mês.')}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[tx('Análise rápida com seu ERP (NDA prévio)'), tx('Estimativa de ROI em dinheiro real'), tx('Roteiro de go-live em 30 dias'), tx('Resposta em até 4h úteis')].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'rgba(255,255,255,0.9)' }}>
                <span style={{ width: 22, height: 22, borderRadius: 99, background: 'var(--turquoise)', color: 'var(--navy-900)', display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={12} stroke={3}/>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submitLead}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16, padding: 24, backdropFilter: 'blur(12px)' }}>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>{tx('Peça um diagnóstico')}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>{tx('Deixe seus dados e a nossa equipe entra em contato.')}</div>
          {[
            { n: tx('Nome'), id: 'nome', t: 'text', p: tx('Maria Silva') },
            { n: tx('E-mail corporativo'), id: 'email', t: 'email', p: tx('maria@distribuidora.com.br') },
            { n: tx('Empresa'), id: 'empresa', t: 'text', p: tx('Distribuidora Sul') },
            { n: 'WhatsApp', id: 'whatsapp', t: 'tel', p: '(48) 90000-0000' },
          ].map(f => (
            <label key={f.n} style={{ display: 'block', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.66)', marginBottom: 6, fontWeight: 500 }}>{f.n}</div>
              <input type={f.t} name={f.id} required placeholder={f.p} style={{
                width: '100%', padding: '12px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', fontFamily: 'inherit', fontSize: 14,
                outline: 'none',
              }} onFocus={(e) => e.target.style.borderColor = 'var(--turquoise)'}
                 onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.18)'}/>
            </label>
          ))}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}/>
          <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>{tx('Quero ser contatado')} <Icon name="arrow" size={16} className="chev"/>
          </button>
          <a href={`${SEWE_WHATSAPP}?text=${encodeURIComponent('Olá! Quero agendar um diagnóstico com a SEWE.')}`}
            target="_blank" rel="noopener" className="btn btn-outline-inverse"
            style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>{tx('Prefiro falar no WhatsApp')}</a>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 10, textAlign: 'center' }}>{tx('Seus dados seguem a LGPD. Sem spam, sem vendedor insistente.')}</div>
        </form>
      </div>
      <style>{`@media(max-width:960px){.cta-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

function Footer_DEPRECATED() {
  // Moved to layout.jsx (SiteFooter). Kept out of the render tree.
  return null;
}

// ── Agendamento de demonstração (Google Calendar) ────────────
const SEWE_AGENDA_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2yIYuW6dqFpPDvnfnUMcYwXjTQxw7v6PyBYRMXHJ0j6NH3WxHeXDwASsHWi2_udeUbjPMbu0Kw';

function AgendaSection({ bg = '#fff' }) {
  useLocale();
  // Perf: só monta o iframe do Google Agenda quando a seção se aproxima da viewport
  const agendaRef = React.useRef(null);
  const [agendaLoad, setAgendaLoad] = React.useState(false);
  React.useEffect(() => {
    const el = agendaRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setAgendaLoad(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setAgendaLoad(true); io.disconnect(); }
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="section" style={{ background: bg, paddingTop: 'clamp(28px, 3.5vw, 48px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px' }}>
          <div className="eyebrow">{tr('agenda.eyebrow')}</div>
          <h2 style={{ marginTop: 14 }}>{tr('agenda.title')}</h2>
          <p style={{ color: 'var(--text-2)', marginTop: 14, fontSize: 17 }}>
            {tr('agenda.lead')}
          </p>
        </div>
        <div id="agendar" ref={agendaRef} style={{ maxWidth: 920, margin: '0 auto', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', scrollMarginTop: 90 }}>
          {agendaLoad ? (
            <iframe
              src={`${SEWE_AGENDA_URL}?gv=true`}
              title={tr('agenda.iframe')}
              style={{ border: 0, width: '100%', height: 1000, display: 'block' }}
              loading="lazy"
            />
          ) : (
            <div style={{ width: '100%', height: 1000, display: 'grid', placeItems: 'center', background: 'var(--bg-soft, #f6f8fb)' }}>
              <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}>
                {tr('agenda.loading')}
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'var(--text-3)' }}>
          {tr('agenda.nofit')} <a href={SEWE_AGENDA_URL} target="_blank" rel="noopener" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>{tr('agenda.full')}</a> {tr('agenda.or')}
          {' '}<a href={`${SEWE_WHATSAPP}?text=${encodeURIComponent(tr('agenda.wamsg'))}`} target="_blank" rel="noopener" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>{tr('agenda.wa')}</a>.
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ObjectionBlock, MaturitySection, DifferentiatorsSection, CasesSection, FAQSection, CTASection, AgendaSection });

// Maturity (SMART/SCALE/STRATEGIC) + Differentiators + Cases + FAQ + CTA + Footer

function MaturitySection() {
  const levels = [
    { key: 'SMART',     tag: 'Core',            badge: 'Comece aqui',
      title: 'Pare de gerir por planilha.',
      body: 'Dashboards prontos com foco em controle operacional de vendas, finanças e estoque. Sai do Excel em 30 dias.',
      includes: ['Dashboards de vendas, estoque e financeiro', 'Curva ABC automatizada', 'Positivação e ruptura', 'Suporte consultivo'] },
    { key: 'SCALE',     tag: 'Expansão',        badge: 'Mais vendido',
      title: 'Cresça com previsibilidade.',
      body: 'Adiciona algoritmos de prospecção, projeções financeiras e análises avançadas. Quando o SMART já não basta.',
      includes: ['Tudo do SMART', 'Projeção financeira · IA', 'Algoritmos de prospecção', 'Alertas de churn · Curva A', 'Consultoria mensal dedicada'] },
    { key: 'STRATEGIC', tag: 'Alta Performance',badge: 'Premium',
      title: 'Decisão diária 100% por dado.',
      body: 'Gestão 360°. DRE automatizado, sugestão de compras via IA e previsibilidade orçamentária. Para o C-Level que decide todo dia.',
      includes: ['Tudo do SCALE', 'DRE automatizado', 'Sugestão de compras · IA', 'Visão 360° C-Level', 'Simulação de cenários', 'Comitê executivo trimestral'] },
  ];
  return (
    <section id="maturidade" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <div className="eyebrow">Níveis de maturidade</div>
          <h2 style={{ marginTop: 14 }}>SMART · SCALE · STRATEGIC.</h2>
          <p style={{ color: 'var(--text-2)', marginTop: 14, fontSize: 17 }}>
            Entre pelo nível certo para o seu momento. Evolua sem trocar de plataforma: o mesmo Qlik, as mesmas suítes, cada vez mais fundo.
          </p>
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
                  <div style={{ position: 'absolute', top: -12, left: 24, background: 'var(--turquoise)', color: 'var(--navy-900)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 999 }}>
                    MAIS VENDIDO
                  </div>
                )}
                <div style={{ fontSize: 11, letterSpacing: '0.16em', color: featured ? 'var(--turquoise)' : 'var(--turquoise-ink)', fontWeight: 700, marginBottom: 10 }}>
                  NÍVEL {l.tag.toUpperCase()}
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
                <a href="#diagnostico" className={featured ? 'btn btn-accent' : 'btn btn-outline'} style={{ marginTop: 22, width: '100%', justifyContent: 'center' }}>
                  Falar com especialista
                </a>
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
    { icon: 'clock', title: 'Go-live em 30 dias', body: 'Do contrato à primeira decisão em produção. Processo guiado por consultoria, sem projeto longo de BI do zero.' },
    { icon: 'link', title: 'Integração nativa com ERPs', body: 'Conectores homologados para os principais ERPs do setor. Camada criptografada, sem precisar de time de TI interno.' },
    { icon: 'brain', title: 'IA invisível', body: 'Roda em background, limpa outliers, cruza dados e entrega decisão pronta. Sem prompts, sem engenharia, sem cientista de dados.' },
    { icon: 'shield', title: 'Segurança e LGPD', body: 'Dados cifrados em trânsito e repouso, homologação Qlik oficial, auditoria e política de retenção desenhadas por projeto.' },
    { icon: 'pkg', title: 'DNA de Atacado e Distribuição', body: 'Consultores que falam ruptura, Curva A, positivação, rebate e capital de giro. Não traduzimos o setor, nós somos do setor.' },
    { icon: 'trophy', title: 'Parceria oficial Qlik', body: 'Platform Partner da Qlik, plataforma de analytics líder global, Leader no Gartner Magic Quadrant por 13 anos consecutivos.' },
  ];
  return (
    <section id="diferenciais" className="section grain" style={{ background: '#0e1729', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(800px 400px at 80% 10%, rgba(117,227,228,0.1), transparent 60%)' }}/>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 56px' }}>
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>Por que SEWE</div>
          <h2 style={{ marginTop: 14, color: '#fff' }}>Seis razões que nenhum BI genérico oferece.</h2>
          <p style={{ color: 'rgba(255,255,255,0.66)', marginTop: 14, fontSize: 17 }}>
            Nós entregamos solução vertical pronta, com DNA de atacado e distribuição e tempo de valor em semanas.
          </p>
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
    { co: 'MOCELIN', metric: '+15–20%', unit: 'de crescimento em vendas', quote: 'Eu associo esse crescimento ao SEWE BI: sem gestão de dados você não tem clareza de onde atacar. O BI hoje é minha principal ferramenta de gestão.', person: 'Neyla', place: 'Mocelin' },
    { co: 'ELETRANSOL', metric: '−23,9%', unit: 'no churn de clientes', quote: 'Limitada ao ERP, a empresa ficaria parada no tempo. O BI é a nossa tela do cenário, e já projeta desempenho e atingimento de metas para o futuro.', person: 'Elioneis', place: 'Eletransol', href: '/vencedor-premio-2025-eletransol' },
    { co: 'WMG', metric: '1 tela', unit: 'para decidir o que antes exigia várias fontes', quote: 'As compras ficaram mais assertivas. Antes buscávamos várias informações para decidir; hoje abrimos uma tela e tomamos a decisão.', person: 'Thiago', place: 'WMG' },
  ];
  return (
    <section id="cases" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div style={{ maxWidth: 620 }}>
            <div className="eyebrow">Resultados que saem do papel</div>
            <h2 style={{ marginTop: 14 }}>Casos reais. Métricas reais.</h2>
          </div>
          <a href="/premio" className="btn btn-outline btn-sm">Ver todos os cases <Icon name="arrow" size={12} className="chev"/></a>
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
                <a href={c.href} style={{ marginTop: 4, fontSize: 13, color: 'var(--turquoise-ink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Ler case completo <Icon name="arrow" size={12}/>
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
    { q: 'Quanto tempo leva para o go-live?', a: 'O processo completo ocorre em até 30 dias a partir da liberação dos acessos ao seu ERP. É um processo guiado pela nossa consultoria, com entregas semanais. Você enxerga valor já no primeiro mês.' },
    { q: 'Preciso de um time de BI ou TI dedicado?', a: 'Não. A SEWE é responsável pela conexão ao ERP, modelagem dos dados e configuração dos painéis. Sua equipe usa o produto; nós cuidamos da engenharia por trás.' },
    { q: 'Posso customizar as soluções da SEWE para minha operação específica?', a: 'Sim! Uma das nossas forças é justamente personalizar módulos, dashboards e processos para refletir a realidade da sua empresa. Não entregamos pacotes genéricos, entregamos soluções ajustadas.' },
    { q: 'O que diferencia a SEWE de outras empresas de BI e consultoria de dados?', a: 'Nosso diferencial está em combinar: um portfólio completo (BI + consultoria + integração + vendas), atendimento nacional, inteligência personalizada e foco em resultados concretos e sustentáveis.' },
    { q: 'Como funciona a parceria com a Qlik?', a: 'Somos Platform Partner oficial da Qlik no Brasil. Você recebe licenças homologadas, suporte local em português e acesso a todas as capacidades nativas da plataforma, com a camada SEWE de dashboards e IA em cima.' },
    { q: 'E a LGPD?', a: 'Conformidade end-to-end: criptografia em trânsito e repouso, controle granular de acesso, política de retenção e trilha de auditoria. Documentação de DPIA disponível em até 48h úteis após assinatura de NDA.' },
    { q: 'Meus dados saem da minha empresa?', a: 'A conexão é direta entre seu ERP e o ambiente Qlik hospedado em região brasileira. Você mantém o controle dos acessos e pode revogar a qualquer momento.' },
    { q: 'Quanto custa?', a: 'O investimento depende do nível (SMART, SCALE ou STRATEGIC), do número de usuários e de filiais. Agende um diagnóstico gratuito de 30 minutos. Mostramos o ROI estimado com base nos seus dados antes de falar em preço.' },
  ];
  return (
    <section id="faq" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="eyebrow">Perguntas frequentes</div>
          <h2 style={{ marginTop: 14 }}>O que diretores perguntam antes de assinar.</h2>
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
    alert('Recebemos seus dados! Nossa equipe entra em contato em breve.');
  }).catch(() => openWhats()); // CRM fora do ar → lead não se perde
}

function CTASection() {
  return (
    <section id="diagnostico" className="section grain" style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 55%, var(--turquoise-ink) 120%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 80% 100%, rgba(117,227,228,0.2), transparent 70%)' }}/>
      <div className="container cta-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>Diagnóstico consultivo · Gratuito</div>
          <h2 style={{ color: '#fff', marginTop: 14, fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Uma reunião de 30 minutos. Com os seus dados. Sem compromisso.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 18, fontSize: 17, maxWidth: 560 }}>
            Um diretor SEWE olha sua operação, identifica os 3 vazamentos mais caros em Curva A, ruptura ou margem, e mostra o que mudaria no primeiro mês.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Análise rápida com seu ERP (NDA prévio)', 'Estimativa de ROI em dinheiro real', 'Roteiro de go-live em 30 dias', 'Resposta em até 4h úteis'].map((t, i) => (
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
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>Peça um diagnóstico</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>Deixe seus dados e a nossa equipe entra em contato.</div>
          {[
            { n: 'Nome', id: 'nome', t: 'text', p: 'Maria Silva' },
            { n: 'E-mail corporativo', id: 'email', t: 'email', p: 'maria@distribuidora.com.br' },
            { n: 'Empresa', id: 'empresa', t: 'text', p: 'Distribuidora Sul' },
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
          <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
            Quero ser contatado <Icon name="arrow" size={16} className="chev"/>
          </button>
          <a href={`${SEWE_WHATSAPP}?text=${encodeURIComponent('Olá! Quero agendar um diagnóstico com a SEWE.')}`}
            target="_blank" rel="noopener" className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center', marginTop: 10, color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
            Prefiro falar no WhatsApp
          </a>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 10, textAlign: 'center' }}>
            Seus dados seguem a LGPD. Sem spam, sem vendedor insistente.
          </div>
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
          <div className="eyebrow">Sessão estratégica</div>
          <h2 style={{ marginTop: 14 }}>Agende uma sessão estratégica de diagnóstico.</h2>
          <p style={{ color: 'var(--text-2)', marginTop: 14, fontSize: 17 }}>
            Escolha o melhor horário na agenda abaixo. Conversa online, pelo Google Meet,
            com um especialista SEWE sobre o potencial da sua operação.
          </p>
        </div>
        <div id="agendar" ref={agendaRef} style={{ maxWidth: 920, margin: '0 auto', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', scrollMarginTop: 90 }}>
          {agendaLoad ? (
            <iframe
              src={`${SEWE_AGENDA_URL}?gv=true`}
              title="Agendar demonstração · SEWE Group"
              style={{ border: 0, width: '100%', height: 1000, display: 'block' }}
              loading="lazy"
            />
          ) : (
            <div style={{ width: '100%', height: 1000, display: 'grid', placeItems: 'center', background: 'var(--bg-soft, #f6f8fb)' }}>
              <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}>
                Carregando agenda…
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'var(--text-3)' }}>
          Não achou horário? <a href={SEWE_AGENDA_URL} target="_blank" rel="noopener" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>Abra a agenda completa</a> ou
          {' '}<a href={`${SEWE_WHATSAPP}?text=${encodeURIComponent('Olá! Quero agendar uma sessão estratégica com a SEWE.')}`} target="_blank" rel="noopener" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>chame no WhatsApp</a>.
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MaturitySection, DifferentiatorsSection, CasesSection, FAQSection, CTASection, AgendaSection });

// Audience pages: Indústria + Soluções Sob Medida. Each mounts into its own root.
// Reuses shared sections (PageHero, IntegrationSection, DifferentiatorsSection,
// CTASection, SiteHeader/Footer) plus a few tailored blocks. Phase-1 scope:
// coherent, navigable pages; deeper build lands in phase 2.

const BU_C = {
  integration: { color: '#00a335', soft: 'rgba(0,163,53,0.08)', ink: '#0a7a2c' },
  bi:          { color: '#2d436c', soft: 'rgba(45,67,108,0.08)', ink: '#2d436c' },
  sales:       { color: '#fd7014', soft: 'rgba(253,112,20,0.09)', ink: '#c9550a' },
};

// Reveal-on-scroll: adds `.in` to `.reveal` elements as they enter the viewport.
// (The home + distribuidor apps do this too; audience pages need their own.)
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    // Safety net: never leave content permanently hidden if the observer misfires.
    const fallback = setTimeout(() => els.forEach(el => el.classList.add('in')), 800);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
}

/* ── INDÚSTRIA ───────────────────────────────────────────── */

/* Visão do ecossistema em 4 abas, no mesmo padrão das Suítes do distribuidor:
   pill-tabs em cima, cópia + CTA à esquerda, dashboard estilo Qlik à direita.
   Cada aba recorta a cadeia consumidor -> revenda -> distribuidor -> indústria
   pela lente daquela frente, com dado ilustrativo do que a indústria passa a ver. */
function IndustriaEcosystem() {
  const [active, setActive] = React.useState(0);

  const views = [
    {
      key: 'todo',
      label: 'Ecossistema Sewe',
      icon: 'link',
      tagline: 'Prever e agir, não só enxergar.',
      title: 'Preveja a ruptura antes que ela vire venda perdida.',
      body: 'Não é só visibilidade, é controle: a indústria equilibra sell-in e sell-out sem o efeito chicote, antecipa a ruptura e sabe exatamente onde crescer, sem depender de ligação do distribuidor.',
      kpis: [{ v: 'R$ 128,4M', l: 'volume de vendas da rede' }, { v: '3,4%', l: 'ruptura média identificada' }, { v: '340', l: 'gaps de portfólio mapeados' }],
      bullets: [
        'Ruptura Zero: veja qual PDV ficou sem o seu produto antes do consumidor trocar de marca',
        'Sell-in e sell-out equilibrados, sem superestocar nem desabastecer o distribuidor',
        'Gaps de portfólio por revenda, com sugestão automática de cross-sell',
        'Trade marketing no mesmo dia, direto na região onde o produto está encalhando',
      ],
      dashboard: 'todo',
    },
    {
      key: 'integration',
      label: 'Integration',
      icon: 'link',
      pillColor: BU_C.integration.color,
      tagline: 'Governança comercial entre indústria e distribuidor.',
      title: 'As regras da indústria, executadas à risca em toda a rede.',
      body: 'O Integration não liga só sistemas: garante que preço, produto e política comercial valham para todo distribuidor. Qualquer divergência é bloqueada na hora, antes de virar prejuízo de margem.',
      kpis: [{ v: 'R$ 42,6M', l: 'faturamento sincronizado / mês' }, { v: '126', l: 'divergências de preço bloqueadas / mês' }, { v: '98%', l: 'sem retrabalho manual' }],
      bullets: [
        'Governança de preço absoluta: todo distribuidor opera com a tabela e a política comercial vigente, sem espaço para desconto indevido',
        'Visibilidade de estoque para produção: saiba o nível de estoque de toda a rede para planejar a linha de produção sem desperdício',
        'Planejamento de demanda (S&OP) com dado real: a fábrica sabe o que produzir na próxima semana, sem achismo',
        'Faturamento consolidado em segundos, sem esperar semanas para fechar o balanço da marca na rede',
      ],
      dashboard: 'integration',
    },
    {
      key: 'sales',
      label: 'Sales',
      icon: 'store',
      pillColor: BU_C.sales.color,
      tagline: 'A operação comercial da rede em um único fluxo.',
      title: 'Vendedor, distribuidor e indústria enxergando o mesmo pedido, em tempo real.',
      body: 'Você define catálogo, preço e política comercial; sua rede vende dentro deles. O orçamento nasce digitado, a aprovação acontece no sistema e você acompanha tudo, do balcão à diretoria.',
      kpis: [{ v: '2.340', l: 'orçamentos digitais / mês' }, { v: '1,8h', l: 'tempo médio de aprovação' }, { v: '78%', l: 'taxa de aprovação' }],
      bullets: [
        'Fim do orçamento em PDF pelo WhatsApp: a proposta nasce no sistema, com o preço e o estoque que a sua marca definiu',
        'Aprovação sem burocracia: o desconto fora da alçada chega ao aprovador certo e é decidido em minutos, com histórico completo',
        'Campanha de incentivo que funciona: você cria e ela aparece na hora na tela do vendedor, no balcão',
        'Um número só para todo mundo: o que você usa para planejar a produção é o mesmo que o distribuidor usa para acompanhar a equipe',
      ],
      dashboard: 'sales',
    },
    {
      key: 'bi',
      label: 'BI',
      icon: 'brain',
      pillColor: BU_C.bi.color,
      tagline: 'O conselheiro estratégico da rede.',
      title: 'A inteligência que conecta as pontas: da fábrica à gôndola.',
      body: 'O SEWE BI cruza comercial, supply chain, financeiro e trade marketing num só modelo de dado. Não é olhar para trás: é prever o que vem e apontar onde agir antes da concorrência.',
      kpis: [{ v: '1,04x', l: 'índice saúde do canal · sell-in/sell-out' }, { v: '91%', l: 'assertividade da previsão de demanda' }, { v: '3,2x', l: 'ROI médio de trade marketing' }],
      bullets: [
        'Relacione o sell-in com o sell-out real e evite o efeito chicote nos estoques',
        'Previsibilidade de demanda apoiada por IA, baseada no giro real da ponta',
        'Meça o ROI das campanhas de trade e a rentabilidade real por distribuidor',
        'Detecte anomalias de mercado, como ruptura ou queda brusca, em tempo real',
      ],
      dashboard: 'bi',
    },
  ];

  const S = views[active];

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">O ecossistema conectado</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Consumidor, revenda, distribuidor, indústria. <span style={{ color: 'var(--navy)' }}>Todos conectados, direto</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Escolha uma frente e veja o recorte da cadeia que ela entrega para a indústria.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 24, padding: 6,
          background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 14,
          overflowX: 'auto',
        }}>
          {views.map((v, i) => (
            <button key={v.key} onClick={() => setActive(i)}
              style={{
                flex: 1,
                minWidth: 150,
                padding: '14px 18px',
                background: active === i ? '#fff' : 'transparent',
                border: active === i ? '1px solid var(--line)' : '1px solid transparent',
                borderRadius: 10,
                boxShadow: active === i ? 'var(--shadow-sm)' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all .2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                {v.key === 'todo' ? (
                  <span style={{ width: 24, height: 24, borderRadius: 6, background: '#fff', border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}>
                    <SMark size={12} color="var(--navy-900)"/>
                  </span>
                ) : (
                  <span className="ie-tab-icon" style={{ '--pc': v.pillColor }}>
                    <Icon name={v.icon} size={13} stroke={2}/>
                  </span>
                )}
                <span style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 15, color: 'var(--navy-900)', letterSpacing: '0.01em' }}>{v.label}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 34 }}>{v.tagline}</div>
            </button>
          ))}
        </div>

        {/* Content: left text, right dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }} className="suite-grid">
          <div>
            <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1.15, marginBottom: 16 }}>{S.title}</h3>
            <p style={{ color: 'var(--text-2)', fontSize: 16, marginBottom: 24 }}>{S.body}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
              {S.kpis.map((k, i) => (
                <div key={i} style={{ padding: '14px 12px', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 10 }}>
                  <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 20, color: 'var(--navy-900)', lineHeight: 1 }}>{k.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6, letterSpacing: '0.03em' }}>{k.l}</div>
                </div>
              ))}
            </div>

            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {S.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ marginTop: 2, width: 18, height: 18, borderRadius: 6, background: 'rgba(117,227,228,0.2)', color: 'var(--turquoise-ink)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon name="check" size={12} stroke={2.5}/>
                  </span>
                  <span style={{ fontSize: 15, color: 'var(--text)' }}>{b}</span>
                </li>
              ))}
            </ul>

            <a href="#diagnostico" className="btn btn-primary" style={{ marginTop: 24 }}>
              Ver demonstração de {S.label}
              <Icon name="arrow" size={14} className="chev"/>
            </a>
          </div>

          <div>
            <IndustriaDashboard kind={S.dashboard}/>
          </div>
        </div>
      </div>
      <style>{`
        .ie-tab-icon {
          width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0;
          background: var(--pc); color: #fff; display: grid; place-items: center;
          animation: ieTabPulse 2.6s ease-in-out infinite;
        }
        @keyframes ieTabPulse {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--pc) 45%, transparent); opacity: 1; }
          50% { box-shadow: 0 0 0 5px color-mix(in srgb, var(--pc) 0%, transparent); opacity: 0.82; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ie-tab-icon { animation: none; }
        }
        @media (max-width: 960px) {
          .suite-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* SEWE Integration tab — governance portal, not the generic Qlik/BI skin: green
   chrome, the "Divergências" queue as the hero (governance, not just sync plumbing),
   plus the S&OP framing: distributor stock feeds the factory's production plan. */
function IntegrationPortal() {
  const c = BU_C.integration.color;
  const divergencias = [
    { dist: 'Distribuidor Alfa', tipo: 'Tabela de preço desatualizada (-8%)', quando: '2 min atrás', acao: 'Bloqueado' },
    { dist: 'Distribuidor Beta', tipo: 'Produto descontinuado · SKU 4521', quando: '14 min atrás', acao: 'Redirecionado' },
    { dist: 'Distribuidor Gama', tipo: 'Desconto fora de política (12%)', quando: '38 min atrás', acao: 'Em aprovação' },
    { dist: 'Distribuidor Delta', tipo: 'Tabela de preço desatualizada (-5%)', quando: '1h atrás', acao: 'Bloqueado' },
  ];
  const acaoColor = { 'Bloqueado': c, 'Redirecionado': '#0e7a7c', 'Em aprovação': '#c27a00' };
  return (
    <div className="ip-panel">
      <div className="ip-head">
        <div className="ip-head-l">
          <span className="ip-head-mark">S</span>
          SEWE INTEGRATION · GOVERNANÇA COMERCIAL
        </div>
        <span className="ip-live"><span className="ip-live-dot"/>AO VIVO</span>
      </div>
      <div className="ip-tabs">
        {['Visão geral', 'Pedidos', 'Estoque', 'Divergências'].map((t, i) => (
          <div key={t} className={'ip-tab' + (i === 3 ? ' is-on' : '')}>{t}</div>
        ))}
      </div>
      <div className="ip-body">
        <div className="ip-kpis">
          <div className="ip-kpi"><div className="ip-kpi-v tnum">R$ 42,6M</div><div className="ip-kpi-l">faturamento sincronizado / mês</div></div>
          <div className="ip-kpi"><div className="ip-kpi-v tnum">126</div><div className="ip-kpi-l">divergências bloqueadas / mês</div></div>
          <div className="ip-kpi"><div className="ip-kpi-v tnum">3.482</div><div className="ip-kpi-l">SKUs visíveis para o S&OP</div></div>
          <div className="ip-kpi"><div className="ip-kpi-v tnum">&lt; 2 min</div><div className="ip-kpi-l">tempo de sincronização</div></div>
        </div>
        <div className="ip-banner">
          <b style={{ fontFamily: 'Chakra Petch' }}>Cada divergência bloqueada</b> evita a quebra de margem antes que o pedido saia do distribuidor, sem depender de auditoria manual.
        </div>
        <div className="ip-table-head">Divergências detectadas agora</div>
        <div className="ip-table">
          {divergencias.map((d, i) => (
            <div key={i} className="ip-row">
              <span className="ip-row-dist">{d.dist}</span>
              <span className="ip-row-tipo">{d.tipo}</span>
              <span className="ip-row-quando">{d.quando}</span>
              <span className="ip-row-acao" style={{ color: acaoColor[d.acao], background: `color-mix(in srgb, ${acaoColor[d.acao]} 14%, transparent)` }}>{d.acao}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ip-panel { background: #fff; border: 1px solid var(--line); border-radius: 14px; box-shadow: var(--shadow-lg); overflow: hidden; }
        .ip-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: linear-gradient(100deg, #0a7a2c, ${c}); color: #fff; }
        .ip-head-l { display: flex; align-items: center; gap: 10px; font-family: 'Chakra Petch'; font-weight: 600; font-size: 12px; letter-spacing: 0.1em; }
        .ip-head-mark { width: 22px; height: 22px; border-radius: 6px; background: rgba(255,255,255,0.22); display: grid; place-items: center; font-weight: 700; font-size: 13px; }
        .ip-live { display: inline-flex; align-items: center; gap: 6px; font-family: var(--ff-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; }
        .ip-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.3); }
        .ip-tabs { display: flex; gap: 2px; background: #fff; border-bottom: 1px solid var(--line); padding: 0 10px; overflow-x: auto; }
        .ip-tab { padding: 10px 14px; font-size: 12px; font-weight: 500; color: var(--text-2); border-bottom: 2px solid transparent; white-space: nowrap; }
        .ip-tab.is-on { color: var(--navy-900); font-weight: 600; border-bottom-color: ${c}; }
        .ip-body { padding: 16px; background: var(--bg-soft); }
        .ip-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px; }
        .ip-kpi { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 12px 13px; }
        .ip-kpi-v { font-family: 'Chakra Petch'; font-weight: 700; font-size: 19px; color: ${c}; line-height: 1; }
        .ip-kpi-l { font-size: 10px; color: var(--text-2); margin-top: 6px; }
        .ip-banner { padding: 10px 14px; margin-bottom: 14px; background: color-mix(in srgb, ${c} 10%, white); border: 1px solid color-mix(in srgb, ${c} 30%, white); border-radius: 10px; font-size: 12.5px; color: var(--text); }
        .ip-table-head { font-family: var(--ff-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; }
        .ip-table { background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
        .ip-row { display: grid; grid-template-columns: 1.1fr 1.8fr 90px 120px; align-items: center; gap: 10px; padding: 11px 14px; font-size: 12.5px; color: var(--text); border-bottom: 1px solid var(--line-2); }
        .ip-row:last-child { border-bottom: none; }
        .ip-row-dist { font-weight: 600; color: var(--navy-900); }
        .ip-row-tipo { color: var(--text-2); }
        .ip-row-quando { color: var(--text-3); font-family: var(--ff-mono); font-size: 11px; }
        .ip-row-acao { font-family: var(--ff-mono); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; padding: 3px 9px; border-radius: 999px; text-align: center; }
        @media (max-width: 640px) {
          .ip-kpis { grid-template-columns: 1fr 1fr; }
          .ip-row { grid-template-columns: 1fr 1fr; grid-template-areas: 'dist acao' 'tipo tipo' 'quando quando'; }
        }
      `}</style>
    </div>
  );
}

/* SEWE Sales tab — portal look, not the Qlik/BI skin: orange chrome, approval
   queue and a floating phone mockup showing the vendor's app, to make the
   "one number, three people" story visible at a glance. */
function SalesPortal() {
  const c = BU_C.sales.color;
  const approvals = [
    { rep: 'Jonas M.', dist: 'Distribuidor Sul', desconto: '8%', status: 'aprovado', t: '12 min' },
    { rep: 'Carla R.', dist: 'Distribuidor Vale', desconto: '12%', status: 'pendente', t: '—' },
    { rep: 'Diego A.', dist: 'Distribuidor Norte', desconto: '5%', status: 'aprovado', t: '6 min' },
  ];
  return (
    <div className="sp-wrap">
      <div className="sp-panel">
        <div className="sp-head">
          <div className="sp-head-l">
            <span className="sp-head-mark">S</span>
            SEWE SALES · PORTAL DO VENDEDOR
          </div>
          <span className="sp-live"><span className="sp-live-dot"/>AO VIVO</span>
        </div>
        <div className="sp-tabs">
          {['Catálogo', 'Orçamentos', 'Aprovações', 'Campanhas'].map((t, i) => (
            <div key={t} className={'sp-tab' + (i === 2 ? ' is-on' : '')}>{t}</div>
          ))}
        </div>
        <div className="sp-body">
          <div className="sp-kpis">
            <div className="sp-kpi"><div className="sp-kpi-v tnum">2.340</div><div className="sp-kpi-l">orçamentos digitais / mês</div></div>
            <div className="sp-kpi"><div className="sp-kpi-v tnum">1,8h</div><div className="sp-kpi-l">tempo médio de aprovação</div></div>
            <div className="sp-kpi"><div className="sp-kpi-v tnum">78%</div><div className="sp-kpi-l">taxa de aprovação</div></div>
          </div>
          <div className="sp-table-head">Aprovações de desconto · agora</div>
          <div className="sp-table">
            {approvals.map((a, i) => (
              <div key={i} className="sp-row">
                <span className="sp-row-rep">{a.rep}</span>
                <span className="sp-row-dist">{a.dist}</span>
                <span className="sp-row-desc tnum">{a.desconto}</span>
                <span className={'sp-row-status st-' + a.status}>{a.status === 'aprovado' ? 'Aprovado · ' + a.t : 'Pendente'}</span>
              </div>
            ))}
          </div>
          <div className="sp-note">
            O mesmo número que a indústria usa para planejar produção é o que o distribuidor usa para cobrar a equipe, e o vendedor consulta para fechar o mês.
          </div>
        </div>
      </div>

      <div className="sp-phone">
        <div className="sp-phone-notch"/>
        <div className="sp-phone-head">Orçamento · Revenda Sul</div>
        <div className="sp-phone-list">
          <div className="sp-phone-item"><span>Conector M8</span><span className="tnum">120 un</span></div>
          <div className="sp-phone-item"><span>Sensor indutivo</span><span className="tnum">36 un</span></div>
          <div className="sp-phone-item"><span>Cabo blindado</span><span className="tnum">80 m</span></div>
        </div>
        <div className="sp-phone-total"><span>Total</span><span className="tnum">R$ 14.280</span></div>
        <div className="sp-phone-btn">Enviar pedido</div>
        <div className="sp-phone-toast">Aprovado em 12 min</div>
      </div>

      <style>{`
        .sp-wrap { display: flex; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
        .sp-panel {
          flex: 1; min-width: 280px;
          background: #fff; border: 1px solid var(--line); border-radius: 14px;
          box-shadow: var(--shadow-lg); overflow: hidden;
        }
        .sp-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; background: linear-gradient(100deg, #c9550a, ${c});
          color: #fff;
        }
        .sp-head-l { display: flex; align-items: center; gap: 10px; font-family: 'Chakra Petch'; font-weight: 600; font-size: 12px; letter-spacing: 0.1em; }
        .sp-head-mark { width: 22px; height: 22px; border-radius: 6px; background: rgba(255,255,255,0.22); display: grid; place-items: center; font-weight: 700; font-size: 13px; }
        .sp-live { display: inline-flex; align-items: center; gap: 6px; font-family: var(--ff-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; }
        .sp-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.3); }
        .sp-tabs { display: flex; gap: 2px; background: #fff; border-bottom: 1px solid var(--line); padding: 0 10px; overflow-x: auto; }
        .sp-tab { padding: 10px 14px; font-size: 12px; font-weight: 500; color: var(--text-2); border-bottom: 2px solid transparent; white-space: nowrap; }
        .sp-tab.is-on { color: var(--navy-900); font-weight: 600; border-bottom-color: ${c}; }
        .sp-body { padding: 16px; background: var(--bg-soft); }
        .sp-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
        .sp-kpi { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; }
        .sp-kpi-v { font-family: 'Chakra Petch'; font-weight: 700; font-size: 22px; color: ${c}; line-height: 1; }
        .sp-kpi-l { font-size: 10.5px; color: var(--text-2); margin-top: 6px; }
        .sp-table-head { font-family: var(--ff-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; }
        .sp-table { background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
        .sp-row { display: grid; grid-template-columns: 1fr 1.4fr 60px 120px; align-items: center; gap: 10px; padding: 10px 14px; font-size: 12.5px; color: var(--text); border-bottom: 1px solid var(--line-2); }
        .sp-row:last-child { border-bottom: none; }
        .sp-row-rep { font-weight: 600; color: var(--navy-900); }
        .sp-row-dist { color: var(--text-2); }
        .sp-row-desc { text-align: right; }
        .sp-row-status { font-family: var(--ff-mono); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; padding: 3px 9px; border-radius: 999px; text-align: center; }
        .sp-row-status.st-aprovado { color: var(--turquoise-ink); background: rgba(117,227,228,0.18); }
        .sp-row-status.st-pendente { color: #c27a00; background: rgba(240,180,41,0.16); }
        .sp-note { margin-top: 14px; font-size: 12.5px; color: var(--text-2); line-height: 1.55; padding-top: 12px; border-top: 1px dashed var(--line); }

        .sp-phone {
          flex-shrink: 0; z-index: 3;
          width: 168px; background: linear-gradient(160deg,#2a1204,#150a03);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 22px;
          padding: 16px 13px 14px; box-shadow: 0 24px 46px rgba(45,20,5,0.35);
          transform: rotate(-3deg) translateY(-10px);
        }
        .sp-phone-notch { width: 34px; height: 5px; border-radius: 99px; background: rgba(255,255,255,0.18); margin: 0 auto 12px; }
        .sp-phone-head { font-family: 'Chakra Petch'; font-weight: 700; font-size: 11.5px; color: ${c}; }
        .sp-phone-list { display: grid; gap: 6px; margin: 10px 0; }
        .sp-phone-item { display: flex; justify-content: space-between; font-size: 9.5px; color: rgba(255,255,255,0.78); padding-bottom: 5px; border-bottom: 1px dashed rgba(255,255,255,0.12); }
        .sp-phone-total { display: flex; justify-content: space-between; font-family: 'Chakra Petch'; font-weight: 700; font-size: 11px; color: #fff; margin-top: 8px; }
        .sp-phone-btn { margin-top: 10px; text-align: center; padding: 8px; border-radius: 8px; background: ${c}; color: #fff; font-family: 'Chakra Petch'; font-weight: 600; font-size: 10.5px; }
        .sp-phone-toast { margin-top: 10px; text-align: center; font-family: var(--ff-mono); font-size: 8.5px; font-weight: 600; letter-spacing: 0.04em; color: var(--turquoise); background: rgba(117,227,228,0.12); border: 1px solid rgba(117,227,228,0.3); border-radius: 999px; padding: 4px 8px; }

        @media (max-width: 640px) {
          .sp-wrap { flex-direction: column; align-items: stretch; }
          .sp-phone { align-self: center; transform: none; }
          .sp-row { grid-template-columns: 1fr 1fr; grid-template-areas: 'rep status' 'dist desc'; }
        }
      `}</style>
    </div>
  );
}

/* SEWE Ecossistema inteiro — the top-of-pyramid view: black chrome (not the BI
   navy skin) so it reads as its own vantage point above Integration/Sales/BI,
   reusing the same neutral KPI/table/chart building blocks underneath. */
function EcosystemFrame({ title, subtitle, tabs, activeTab = 0, children }) {
  return (
    <div className="ecf">
      <div className="ecf-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="ecf-mark">S</div>
          <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em' }}>SEWE · ECOSSISTEMA</div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>HOJE · 14:22</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="ecf-live-dot"/>LIVE
          </span>
        </div>
      </div>
      <div className="ecf-sub">
        <div style={{ fontFamily: 'Chakra Petch', fontSize: 13, fontWeight: 600, color: 'var(--navy-900)', letterSpacing: '0.02em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{subtitle}</div>}
      </div>
      {tabs && (
        <div className="ecf-tabs">
          {tabs.map((t, i) => (
            <div key={i} className={'ecf-tab' + (i === activeTab ? ' active' : '')}>{t}</div>
          ))}
        </div>
      )}
      <div style={{ padding: 16, background: 'var(--bg-soft)' }}>{children}</div>
      <style>{`
        .ecf { background: var(--bg-soft); border: 1px solid var(--line); border-radius: 14px; box-shadow: var(--shadow-lg); overflow: hidden; }
        .ecf-head { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: linear-gradient(120deg, #0b0c10, #1a1c22); color: #fff; }
        .ecf-mark { width: 22px; height: 22px; background: #fff; border-radius: 4px; display: grid; place-items: center; color: var(--navy-900); font-family: 'Chakra Petch'; font-weight: 700; font-size: 13px; }
        .ecf-live-dot { width: 6px; height: 6px; border-radius: 99px; background: var(--turquoise); box-shadow: 0 0 0 3px rgba(117,227,228,0.25); }
        .ecf-sub { padding: 10px 14px; background: #fff; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 12px; }
        .ecf-tabs { display: flex; gap: 2px; background: #fff; border-bottom: 1px solid var(--line); padding: 0 10px; overflow-x: auto; }
        .ecf-tab { padding: 10px 14px; font-size: 12px; font-weight: 500; color: var(--text-2); border-bottom: 2px solid transparent; white-space: nowrap; }
        .ecf-tab.active { color: var(--navy-900); font-weight: 600; border-bottom-color: #0b0c10; }
      `}</style>
    </div>
  );
}

function IndustriaDashboard({ kind }) {
  if (kind === 'todo') {
    return (
      <EcosystemFrame title="ECOSSISTEMA · SELL-IN × SELL-OUT" subtitle="MTD · Nacional" tabs={['Visão geral', 'Ruptura', 'Gaps', 'Sell-out']} activeTab={2}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
          <QlikKPI compact label="Volume de Vendas" value="R$ 128,4M" delta="+18%" trend="up" color={Q.navy} spark={<Sparkline data={[98,104,109,113,118,122,128]}/>}/>
          <QlikKPI compact label="Ruptura Média" value="3,4%" delta="-0,6pp" trend="up" color={Q.neg}/>
          <QlikKPI compact label="Gaps Mapeados" value="340" delta="+52" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Potencial Cross-sell" value="R$ 6,8M" delta="+9%" trend="up" color={Q.pos}/>
        </div>
        <div style={{ padding: '10px 14px', marginBottom: 10, background: '#fff4dc', border: `1px solid #f0d9a8`, borderRadius: 10, fontSize: 12.5, color: Q.ink }}>
          <b style={{ fontFamily: 'Chakra Petch' }}>Cada 1pp de ruptura reduzida</b> recupera cerca de R$ 1,3M em vendas por mês, antes que o consumidor troque de marca no PDV.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
          <QlikTable
            title="Top gaps de portfólio por revenda · cross-sell sugerido"
            columns={[
              { key: 'revenda', label: 'Revenda' },
              { key: 'gap', label: 'Produto ausente' },
              { key: 'contexto', label: 'Contexto' },
              { key: 'acao', label: 'Ação', align: 'center', render: (v) => (
                <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(117,227,228,0.18)', color: Q.turqDk, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>{v.toUpperCase()}</span>
              )},
            ]}
            rows={[
              { revenda: 'Revenda Sul · SC', gap: 'Condicionador Linha X', contexto: 'Compra o Shampoo há 8 meses', acao: 'Cross-sell' },
              { revenda: 'Revenda Vale', gap: 'Sabonete Kids', contexto: 'Compra a linha adulto', acao: 'Cross-sell' },
              { revenda: 'Revenda Norte', gap: 'Refil 500ml', contexto: 'Compra só o frasco 1L', acao: 'Cross-sell' },
              { revenda: 'Revenda Litoral', gap: 'Kit Presente', contexto: 'Alto giro em datas sazonais', acao: 'Trade mkt' },
            ]}
            compact
          />
          <QlikArea title="Ruptura média · evolução 12m" subtitle="Queda sustentada com alerta antecipado" data={[5.8,5.5,5.2,4.9,4.6,4.3,4.1,3.9,3.7,3.6,3.5,3.4]} labels={['M1','','','M4','','','M7','','','M10','','']} height={230}/>
        </div>
      </EcosystemFrame>
    );
  }

  if (kind === 'integration') {
    return <IntegrationPortal/>;
  }

  if (kind === 'sales') {
    return <SalesPortal/>;
  }

  // bi
  return (
    <QlikFrame title="BI · CONSELHEIRO ESTRATÉGICO DA REDE" subtitle="Consolidado · MTD" tabs={['Sell-in × Sell-out', 'Simulação IA', 'Trade ROI', 'Mapa de Gaps']} activeTab={1}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
        <QlikKPI compact label="Saúde do Canal" value="1,04x" delta="+0,06" trend="down" color={Q.warn}/>
        <QlikKPI compact label="Assertividade IA" value="91%" delta="+3pp" trend="up" color={Q.pos}/>
        <QlikKPI compact label="ROI Trade Marketing" value="3,2x" delta="+0,4x" trend="up" color={Q.navy}/>
        <QlikKPI compact label="Valor Latente · Cross-sell" value="R$ 6,8M" delta="+9%" trend="up" color={Q.navy}/>
      </div>
      <div style={{ padding: '10px 14px', marginBottom: 10, background: '#fff4dc', border: `1px solid #f0d9a8`, borderRadius: 10, fontSize: 12.5, color: Q.ink }}>
        <b style={{ fontFamily: 'Chakra Petch' }}>Sell-in alto com sell-out baixo é efeito chicote:</b> a IA já identificou 4 distribuidores nesse padrão este mês, antes do estoque travar o pedido seguinte.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
        <QlikHBars
          title="Índice sell-in × sell-out por distribuidor"
          rows={[
            { label: 'Distribuidor Alfa', v: 98, display: '0,98x', color: Q.pos },
            { label: 'Distribuidor Beta', v: 102, display: '1,02x', color: Q.pos },
            { label: 'Distribuidor Gama', v: 118, display: '1,18x', color: Q.warn },
            { label: 'Distribuidor Delta', v: 134, display: '1,34x', color: Q.neg },
            { label: 'Distribuidor Épsilon', v: 141, display: '1,41x', color: Q.neg },
          ]}
          max={150}
        />
        <QlikArea title="Previsão de demanda (IA) × giro real" subtitle="Próx. 30 dias · assertividade 91%" data={[82,78,84,88,92,95,98,104,108,112,118,125]} labels={['D+1','','','','D+15','','','','','','D+30','']} height={230}/>
      </div>
    </QlikFrame>
  );
}


function IndustriaMap() {
  const fronts = [
    { c: BU_C.integration, icon: 'link',  step: '01', name: 'Enxergue a rede inteira', flow: 'SEWE Integration',
      d: 'O sellout, o estoque e a curva de cada distribuidor que vende os seus produtos, produto a produto, em um só painel.' },
    { c: BU_C.sales, icon: 'store', step: '02', name: 'Venda mais no canal', flow: 'SEWE Sales',
      d: 'Portal de pedidos, promoções, CRM e carteira de clientes: a rede inteira vendendo no padrão da indústria.' },
    { c: BU_C.bi, icon: 'brain', step: '03', name: 'Decida com IA', flow: 'SEWE BI + IA',
      d: 'Onde falta produto, onde sobra estoque e onde há espaço para crescer, com a próxima ação pronta, sem garimpar gráfico.' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 44px' }}>
          <div className="eyebrow">O que você passa a ter</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Três entregas. <span style={{ color: 'var(--navy)' }}>Contrate juntas ou separadas</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Cada frente funciona sozinha e entrega valor por conta própria. Juntas, fecham o ciclo da fábrica ao PDV.
          </p>
        </div>
        <div className="im-grid">
          {fronts.map((f, i) => (
            <div key={i} className="im-card reveal" style={{ '--c': f.c.color, '--cs': f.c.soft }}>
              <div className="im-top">
                <span className="im-icon" style={{ background: f.c.color }}><Icon name={f.icon} size={22} stroke={1.85}/></span>
                <span className="im-step">{f.step}</span>
              </div>
              <div className="im-flow" style={{ color: f.c.color }}>{f.flow}</div>
              <div className="im-name">{f.name}</div>
              <p className="im-desc">{f.d}</p>
              {i < fronts.length - 1 && <span className="im-arrow" aria-hidden><Icon name="arrow" size={18} stroke={2.2}/></span>}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .im-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; position: relative; }
        .im-card { position: relative; background: #fff; border: 1px solid var(--line); border-top: 3px solid var(--c); border-radius: var(--r-lg); padding: 26px; box-shadow: var(--shadow-sm); }
        .im-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .im-icon { width: 46px; height: 46px; border-radius: 12px; color: #fff; display: grid; place-items: center; box-shadow: 0 8px 20px var(--cs); }
        .im-step { font-family: var(--ff-mono); font-size: 13px; font-weight: 600; color: var(--text-3); letter-spacing: .08em; }
        .im-flow { font-family: var(--ff-mono); font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }
        .im-name { font-family: var(--ff-display); font-weight: 700; font-size: 20px; color: var(--navy-900); margin-bottom: 8px; }
        .im-desc { font-size: 14px; color: var(--text-2); line-height: 1.6; }
        .im-arrow { position: absolute; right: -28px; top: 50px; z-index: 3; width: 34px; height: 34px; border-radius: 50%; background: #fff; border: 1px solid var(--line); display: grid; place-items: center; color: var(--slate); box-shadow: var(--shadow-sm); }
        @media (max-width: 860px) { .im-grid { grid-template-columns: 1fr; gap: 28px; } .im-arrow { right: 50%; top: auto; bottom: -24px; transform: translateX(50%) rotate(90deg); } }
      `}</style>
    </section>
  );
}

/* Industry's live view of its distributor network */
function IndustriaNetworkPanel() {
  const [expanded, setExpanded] = React.useState(0);
  const kpis = [
    { v: 'R$ 128,4M', l: 'sellout da rede · MTD', t: 'up' },
    { v: '87,2%', l: 'cobertura de PDV', t: 'up' },
    { v: '3,4%', l: 'ruptura no canal', t: 'down' },
    { v: '512', l: 'distribuidores ativos', t: 'up' },
  ];
  const rows = [
    { n: 'Distribuidor Alfa',    uf: 'SC', sellout: 'R$ 24,1M', cov: 94, rup: 1.8, w: 100,
      products: [{ n: 'Ração Premier 15kg', v: 'R$ 6,2M' }, { n: 'Suplemento Linha A', v: 'R$ 4,8M' }, { n: 'Acessório Pet Pro', v: 'R$ 3,1M' }] },
    { n: 'Distribuidor Beta',    uf: 'RS', sellout: 'R$ 19,7M', cov: 91, rup: 2.2, w: 82,
      products: [{ n: 'Ração Premier 15kg', v: 'R$ 5,1M' }, { n: 'Shampoo Pet 5L', v: 'R$ 3,4M' }, { n: 'Coleira Antipulgas', v: 'R$ 2,6M' }] },
    { n: 'Distribuidor Gama',    uf: 'PR', sellout: 'R$ 16,3M', cov: 88, rup: 3.1, w: 68,
      products: [{ n: 'Ração Felina Adult', v: 'R$ 3,9M' }, { n: 'Vacina Pol. V8', v: 'R$ 2,8M' }, { n: 'Cama Grande', v: 'R$ 1,9M' }] },
    { n: 'Distribuidor Delta',   uf: 'SC', sellout: 'R$ 12,9M', cov: 85, rup: 3.6, w: 54,
      products: [{ n: 'Ração Premier 15kg', v: 'R$ 3,2M' }, { n: 'Brinquedo Mordedor', v: 'R$ 1,8M' }, { n: 'Areia Sanitária 4kg', v: 'R$ 1,4M' }] },
    { n: 'Distribuidor Épsilon', uf: 'SP', sellout: 'R$ 9,4M',  cov: 79, rup: 4.9, w: 39,
      products: [{ n: 'Ração Premier 15kg', v: 'R$ 2,1M' }, { n: 'Shampoo Pet 5L', v: 'R$ 1,4M' }, { n: 'Coleira Antipulgas', v: 'R$ 0,9M' }] },
    { n: 'Distribuidor Ômega',   uf: 'MG', sellout: 'R$ 7,1M',  cov: 74, rup: 5.4, w: 29,
      products: [{ n: 'Ração Premier 15kg', v: 'R$ 1,6M' }, { n: 'Vacina Pol. V8', v: 'R$ 1,1M' }, { n: 'Cama Grande', v: 'R$ 0,7M' }] },
  ];
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-soft) 0%, #f4f6fb 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">A rede em um só painel</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            O sellout de cada distribuidor, <span style={{ color: 'var(--navy)' }}>com abertura até o nível de produto</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Um recorte do que a indústria enxerga: quem vende, onde há cobertura e onde a ruptura está custando venda.
          </p>
        </div>

        <div className="inp">
          <div className="inp-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SMark size={22} color="#75e3e4"/>
              <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>REDE DE DISTRIBUIÇÃO · CONSOLIDADO</span>
            </div>
            <span className="inp-live"><span className="inp-dot"/>ABR/2026</span>
          </div>
          <div className="inp-kpis">
            {kpis.map((k, i) => (
              <div key={i} className="inp-kpi">
                <div className="inp-kpi-v tnum">{k.v}<span style={{ color: k.t === 'up' ? '#5ce0c4' : '#ff9aa2', fontSize: 10, marginLeft: 5 }}>{k.t === 'up' ? '▲' : '▼'}</span></div>
                <div className="inp-kpi-l">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="inp-table">
            <div className="inp-tr inp-th">
              <span>Distribuidor</span><span>Sellout MTD</span><span className="inp-hide">Cobertura</span><span>Ruptura</span>
            </div>
            {rows.map((r, i) => (
              <React.Fragment key={i}>
              <div className={'inp-tr' + (expanded === i ? ' is-open' : '')} onClick={() => setExpanded(expanded === i ? null : i)} style={{ cursor: 'pointer' }}>
                <span className="inp-name"><b>{r.n}</b><em>{r.uf}</em><Icon name="chevron" size={13} stroke={2.2} className="inp-drill"/></span>
                <span className="inp-sellout">
                  <span className="inp-bar"><span className="inp-bar-fill" style={{ width: r.w + '%' }}/></span>
                  <span className="tnum">{r.sellout}</span>
                </span>
                <span className="inp-hide tnum" style={{ color: r.cov >= 85 ? 'var(--turquoise-ink)' : 'var(--text-2)' }}>{r.cov}%</span>
                <span className="tnum" style={{ color: r.rup > 4 ? 'var(--danger)' : 'var(--text-2)', fontWeight: 600 }}>{r.rup}%</span>
              </div>
              {expanded === i && (
                <div className="inp-drilldown">
                  <div className="inp-drill-head">Produto a produto · {r.n}</div>
                  {r.products.map((p, j) => (
                    <div key={j} className="inp-drill-row"><span>{p.n}</span><span className="tnum">{p.v}</span></div>
                  ))}
                </div>
              )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .inp { background: linear-gradient(150deg, #15243d, #0d1a2e); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-lg); border: 1px solid rgba(255,255,255,0.08); }
        .inp-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 22px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .inp-live { display: inline-flex; align-items: center; gap: 7px; font-family: var(--ff-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #75e3e4; padding: 4px 11px; border-radius: 999px; background: rgba(117,227,228,0.1); border: 1px solid rgba(117,227,228,0.24); }
        .inp-dot { width: 6px; height: 6px; border-radius: 50%; background: #75e3e4; }
        .inp-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.06); }
        .inp-kpi { background: #101d33; padding: 18px 22px; }
        .inp-kpi-v { font-family: var(--ff-display); font-weight: 700; font-size: 22px; color: #fff; line-height: 1; }
        .inp-kpi-l { font-size: 11.5px; color: rgba(255,255,255,0.6); margin-top: 7px; }
        .inp-table { padding: 8px 12px 14px; }
        .inp-tr { display: grid; grid-template-columns: 1.6fr 1.8fr 0.8fr 0.8fr; align-items: center; gap: 12px; padding: 12px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; color: rgba(255,255,255,0.9); }
        .inp-tr:last-child { border-bottom: none; }
        .inp-th { font-family: var(--ff-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); font-weight: 600; }
        .inp-name b { font-weight: 600; color: #fff; }
        .inp-name em { font-style: normal; font-family: var(--ff-mono); font-size: 10.5px; color: rgba(255,255,255,0.45); margin-left: 8px; }
        .inp-drill { color: rgba(255,255,255,0.35); margin-left: auto; flex-shrink: 0; transition: transform .2s ease; }
        .inp-tr.is-open .inp-drill { transform: rotate(90deg); color: var(--turquoise); }
        .inp-tr:hover { background: rgba(255,255,255,0.03); }
        .inp-drilldown { padding: 6px 12px 12px 34px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .inp-drill-head { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
        .inp-drill-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: rgba(255,255,255,0.8); border-bottom: 1px dashed rgba(255,255,255,0.06); }
        .inp-drill-row:last-child { border-bottom: none; }
        .inp-name { display: flex; align-items: center; }
        .inp-sellout { display: flex; align-items: center; gap: 12px; }
        .inp-bar { flex: 1; height: 7px; border-radius: 99px; background: rgba(255,255,255,0.09); overflow: hidden; min-width: 60px; }
        .inp-bar-fill { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, #3fc9cb, #75e3e4); }
        @media (max-width: 720px) {
          .inp-kpis { grid-template-columns: 1fr 1fr; }
          .inp-hide { display: none; }
          .inp-tr { grid-template-columns: 1.4fr 1.8fr 0.7fr; }
        }
      `}</style>
    </section>
  );
}

/* Reusable ecosystem-front section (BI, Sales, ...) tailored for industry */
function EcoFront({ id, bg, c, soft, ink, eyebrow, title, hl, lead, feats, aside }) {
  return (
    <section id={id} className="section ef" style={{ background: bg, position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="ef-head reveal">
          <div className="ef-eyebrow" style={{ color: ink, background: soft }}>
            <SMark size={16} color={c}/> {eyebrow}
          </div>
          <h2 style={{ marginTop: 16, fontSize: 'clamp(26px,3.2vw,38px)' }}>
            {title} <span style={{ color: c }}>{hl}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14, maxWidth: 600 }}>{lead}</p>
        </div>
        <div className="ef-grid">
          <div className="ef-feats">
            {feats.map((f, i) => (
              <div key={i} className="ef-feat reveal">
                <span className="ef-feat-icon" style={{ background: soft, color: ink }}><Icon name={f.icon} size={20} stroke={1.8}/></span>
                <div>
                  {f.persona && <div className="ef-feat-persona" style={{ color: ink, background: soft }}>{f.persona}</div>}
                  <div className="ef-feat-t">{f.t}</div>
                  <div className="ef-feat-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <aside className="ef-aside reveal" style={{ background: aside.bg }}>
            <div className="ef-aside-tag" style={{ color: aside.tagColor, background: aside.tagBg }}>{aside.tag}</div>
            <div className="ef-aside-metric">{aside.metric}</div>
            <div className="ef-aside-metric-l">{aside.metricLabel}</div>
            <p className="ef-aside-desc">{aside.desc}</p>
            <ul className="ef-aside-list">
              {aside.list.map((x, i) => <li key={i}><Icon name="check" size={16} stroke={2.4} style={{ color: c }}/> {x}</li>)}
            </ul>
          </aside>
        </div>
      </div>
      <style>{`
        .ef-head { margin-bottom: 36px; }
        .ef-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 10px; border-radius: 999px; font-family: var(--ff-display); font-weight: 700; font-size: 12.5px; letter-spacing: .06em; }
        .ef-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: start; }
        .ef-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ef-feat { display: flex; gap: 14px; padding: 20px; background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); box-shadow: var(--shadow-xs); }
        .ef-feat-icon { width: 42px; height: 42px; border-radius: 11px; display: grid; place-items: center; flex-shrink: 0; }
        .ef-feat-t { font-family: var(--ff-display); font-weight: 700; font-size: 16px; color: var(--navy-900); }
        .ef-feat-persona { display: inline-block; font-family: var(--ff-mono); font-size: 9.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 2px 8px; border-radius: 999px; margin-bottom: 7px; }
        .ef-feat-d { font-size: 13.5px; color: var(--text-2); line-height: 1.55; margin-top: 5px; }
        .ef-aside { border-radius: var(--r-xl); padding: 28px; position: relative; overflow: hidden; }
        .ef-aside-tag { display: inline-block; padding: 5px 12px; border-radius: 999px; font-family: var(--ff-mono); font-size: 11px; font-weight: 700; letter-spacing: .1em; }
        .ef-aside-metric { font-family: var(--ff-display); font-weight: 700; font-size: clamp(34px, 4vw, 46px); color: #fff; line-height: 1; margin-top: 18px; }
        .ef-aside-metric-l { font-size: 13px; color: rgba(255,255,255,0.66); margin-top: 8px; }
        .ef-aside-desc { color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.55; margin-top: 18px; }
        .ef-aside-list { list-style: none; padding: 0; margin: 20px 0 0; display: grid; gap: 10px; }
        .ef-aside-list li { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.85); font-size: 14.5px; }
        @media (max-width: 860px) { .ef-grid { grid-template-columns: 1fr; } .ef-feats { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function IndustriaBI() {
  return (
    <EcoFront
      id="bi"
      bg="#fff"
      c={BU_C.bi.color} soft={BU_C.bi.soft} ink={BU_C.bi.ink}
      eyebrow="SEWE BI + IA"
      title="A IA lê a rede inteira e devolve"
      hl="a próxima ação"
      lead="Cruza sellout, estoque e cobertura de todos os distribuidores nos bastidores e mostra onde agir, por região, por canal e por produto, sem você garimpar gráfico."
      feats={[
        { icon: 'alert',    t: 'Ruptura no canal por SKU', d: 'Saiba quais produtos estão faltando em quais PDVs antes de perder a venda.' },
        { icon: 'target',   t: 'Cobertura e positivação', d: 'Onde a marca está presente, onde está fraca e onde há espaço para crescer.' },
        { icon: 'boxes',    t: 'Mix ideal por região', d: 'O sortimento certo para cada perfil de PDV, com base no que realmente gira.' },
        { icon: 'trending', t: 'Previsão de demanda', d: 'Projeção de giro por produto e região para planejar produção e abastecimento.' },
      ]}
      aside={{
        bg: 'linear-gradient(160deg,#15243d,#0d1a2e)',
        tag: 'RESULTADO NA REDE', tagColor: '#7fe9ea', tagBg: 'rgba(117,227,228,0.14)',
        metric: '+90%', metricLabel: 'assertividade na reposição da rede',
        desc: 'Menos ruptura no canal e menos estoque parado, com decisão guiada por dado, não por achismo.',
        list: ['Decisões totalmente preditivas: antecipe a necessidade de estoque antes que os pedidos parem', 'Prevenção ativa de perdas: a IA detecta anomalias e avisa onde agir imediatamente', 'Ação mastigada para o time: menos relatório abstrato, mais direcionamento prático de venda'],
      }}
    />
  );
}

/* Modularidade — contrate tudo ou só uma parte */
function IndustriaModular() {
  const combos = [
    { c: BU_C.integration, t: 'Enxergar a rede', d: 'O painel de sellout, estoque e cobertura de cada distribuidor. Visibilidade imediata, sem mexer na operação.', tag: 'PORTA DE ENTRADA' },
    { c: BU_C.sales, t: 'Enxergar + vender', d: 'A visibilidade da rede com o portal comercial por cima: orçamento, aprovação e CRM rodando no padrão da indústria.', tag: 'MAIS ESCOLHIDO' },
    { c: BU_C.bi, t: 'Ecossistema completo', d: 'O cérebro por cima de tudo: a IA cruza visibilidade e venda para prever demanda, evitar ruptura e fechar o ciclo.', tag: 'CICLO FECHADO' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 44px' }}>
          <div className="eyebrow">Modular de verdade</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Comece por onde <span style={{ color: 'var(--navy)' }}>dói mais</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Cada entrega funciona sozinha. Contrate só a parte que resolve o seu problema de hoje
            e amplie quando fizer sentido, sem trocar de plataforma no caminho.
          </p>
        </div>
        <div className="mod-grid">
          {combos.map((m, i) => (
            <div key={i} className="mod-card reveal" style={{ borderTopColor: m.c.color }}>
              <div className="mod-tag" style={{ color: m.c.ink, background: m.c.soft }}>{m.tag}</div>
              <div className="mod-t">{m.t}</div>
              <p className="mod-d">{m.d}</p>
              <a href="#diagnostico" className="mod-cta" style={{ color: m.c.ink }}>
                Falar sobre este recorte <Icon name="arrow" size={14} stroke={2.2}/>
              </a>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .mod-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .mod-card { display: flex; flex-direction: column; background: var(--bg-soft); border: 1px solid var(--line); border-top: 3px solid; border-radius: var(--r-lg); padding: 26px; }
        .mod-tag { align-self: flex-start; padding: 5px 12px; border-radius: 999px; font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .1em; margin-bottom: 16px; }
        .mod-t { font-family: var(--ff-display); font-weight: 700; font-size: 20px; color: var(--navy-900); margin-bottom: 8px; }
        .mod-d { font-size: 14.5px; color: var(--text-2); line-height: 1.6; flex: 1; }
        .mod-cta { display: inline-flex; align-items: center; gap: 7px; margin-top: 18px; font-family: var(--ff-display); font-weight: 600; font-size: 14.5px; }
        @media (max-width: 860px) { .mod-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function IndustriaPage() {
  useReveal();
  return (
    <>
      <SiteHeader/>
      <PageHero
        eyebrow="Para a Indústria"
        title="Enxergue toda a sua rede, da fábrica ao ponto de venda."
        lead="Quanto cada distribuidor vendeu do seu produto ontem? Onde está faltando? Quais clientes pararam de comprar? A SEWE devolve essas respostas todos os dias. E você contrata só o que precisar."
      >
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">Falar sobre a rede <Icon name="arrow" size={16} className="chev"/></a>
          <a href="https://wa.me/5548984704389" className="btn btn-outline btn-lg">WhatsApp</a>
        </div>
      </PageHero>
      <IndustriaEcosystem/>
      <IndustriaMap/>
      <IntegrationSection/>
      <IndustriaNetworkPanel/>
      <SalesSection audience="industria"/>
      <IndustriaBI/>
      <IndustriaModular/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── SOLUÇÕES SOB MEDIDA ─────────────────────────────────── */
function SolucoesOfferings() {
  const items = [
    { icon: 'chart', t: 'Plataforma analytics líder', d: 'Qlik Cloud, AWS ou Azure: ambiente em nuvem flexível, alta performance de processamento, segurança corporativa e licenças de parceiro oficial.' },
    { icon: 'cpu',   t: 'Dashboards prescritivos', d: 'Painéis construídos do zero para o seu modelo de negócio. Indicadores inteligentes associados a ações imediatas, sem poluição visual.' },
    { icon: 'link',  t: 'Pipelines de dados automatizados', d: 'Extração, transformação e governança centralizadas. Conectamos qualquer fonte ou ERP e entregamos o dado limpo, sem carregar o seu banco de origem.' },
    { icon: 'shield', t: 'Governança e segurança absoluta', d: 'Nada de dado sensível solto em máquina de funcionário: desenvolvimento e acesso 100% via browser, em conformidade com a LGPD.' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 44px' }}>
          <div className="eyebrow">O que entregamos</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            A engenharia que a sua <span style={{ color: 'var(--navy)' }}>tomada de decisão</span> exige.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Ingestão, transformação e visualização na mesma plataforma, para empresas de qualquer setor.
          </p>
        </div>
        <div className="so-grid">
          {items.map((it, i) => (
            <div key={i} className="so-card reveal">
              <span className="so-icon"><Icon name={it.icon} size={22} stroke={1.8}/></span>
              <div className="so-t">{it.t}</div>
              <p className="so-d">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .so-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .so-card { background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 26px; }
        .so-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(45,67,108,0.08); color: var(--navy-700); display: grid; place-items: center; margin-bottom: 16px; }
        .so-t { font-family: var(--ff-display); font-weight: 700; font-size: 19px; color: var(--navy-900); margin-bottom: 8px; }
        .so-d { font-size: 14.5px; color: var(--text-2); line-height: 1.6; }
        @media (max-width: 780px) { .so-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* TCO: uma plataforma única vs colcha de retalhos */
function SolucoesPlatform() {
  const patch = [
    { t: 'Licenças por usuário', rot: -1.5 },
    { t: 'Serviço de ETL à parte', rot: 1 },
    { t: 'Data warehouse dedicado', rot: -0.8 },
    { t: 'Nós de capacidade extra', rot: 1.4 },
    { t: 'Gateway e servidor local', rot: -1.2 },
  ];
  const uni = [
    { icon: 'link', t: 'Integração e ETL' },
    { icon: 'boxes', t: 'Armazenamento .qvd comprimido' },
    { icon: 'chart', t: 'Analytics + IA' },
    { icon: 'alert', t: 'Alertas, mobile e e-mail' },
  ];
  const proofs = [
    { v: 'TCO menor', d: 'Um contrato, uma plataforma. Sem colcha de retalhos de serviços de nuvem cobrados à parte.' },
    { v: 'Bilhões de linhas', d: 'Painéis rápidos mesmo cruzando bilhões de registros, sem assinar nós de servidor caros.' },
    { v: '100% web', d: 'Desenvolvimento e uso direto no navegador. Zero software pesado instalado em desktop.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 44px' }}>
          <div className="eyebrow">TCO · Custo total de propriedade</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Uma plataforma única contra a <span style={{ color: 'var(--navy)' }}>colcha de retalhos</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Ferramentas genéricas parecem baratas por usuário, até a conta dos serviços extras chegar.
          </p>
        </div>
        <div className="tco-duel">
          <div className="tco-side reveal">
            <div className="tco-side-h">BI genérico</div>
            <div className="tco-patch">
              {patch.map((p, i) => (
                <div key={i} className="tco-patch-box" style={{ transform: `rotate(${p.rot}deg)` }}>
                  {p.t} <span className="tco-fee">+ $</span>
                </div>
              ))}
            </div>
            <div className="tco-side-f">até 5 serviços cobrados à parte para aguentar volume real</div>
          </div>
          <div className="tco-vs" aria-hidden>vs</div>
          <div className="tco-side tco-side-qlik reveal">
            <div className="tco-side-h" style={{ color: 'var(--turquoise-2)' }}>Qlik + SEWE</div>
            <div className="tco-uni">
              {uni.map((u, i) => (
                <div key={i} className="tco-uni-layer">
                  <Icon name={u.icon} size={15} stroke={1.8}/> {u.t}
                </div>
              ))}
            </div>
            <div className="tco-side-f" style={{ color: 'rgba(255,255,255,0.65)' }}>tudo nativo, em uma única ponta</div>
          </div>
        </div>
        <div className="tco-proofs">
          {proofs.map((p, i) => (
            <div key={i} className="tco-proof reveal">
              <div className="tco-proof-v">{p.v}</div>
              <p className="tco-proof-d">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .tco-duel { display: grid; grid-template-columns: 1fr 56px 1fr; gap: 8px; align-items: stretch; max-width: 900px; margin: 0 auto; }
        .tco-side { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 24px; box-shadow: var(--shadow-xs); display: flex; flex-direction: column; }
        .tco-side-qlik { background: var(--navy-900); border-color: var(--navy-900); }
        .tco-side-h { font-family: var(--ff-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-3); margin-bottom: 16px; text-align: center; }
        .tco-patch { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .tco-patch-box { border: 1px dashed var(--text-3); border-radius: 8px; padding: 9px 12px; font-size: 13px; color: var(--text-2); background: var(--bg-soft); display: flex; justify-content: space-between; align-items: center; }
        .tco-fee { font-family: var(--ff-mono); font-size: 11px; font-weight: 700; color: var(--danger, #c0392b); }
        .tco-uni { display: flex; flex-direction: column; gap: 8px; flex: 1; border: 1.5px solid var(--turquoise-2); border-radius: 12px; padding: 10px; }
        .tco-uni-layer { display: flex; align-items: center; gap: 9px; padding: 9px 12px; border-radius: 8px; background: rgba(117,227,228,0.1); color: #fff; font-size: 13px; }
        .tco-uni-layer svg { color: var(--turquoise-2); flex-shrink: 0; }
        .tco-vs { display: grid; place-items: center; font-family: var(--ff-mono); font-size: 12px; font-weight: 700; color: var(--text-3); }
        .tco-side-f { margin-top: 14px; font-size: 12px; color: var(--text-3); text-align: center; }
        .tco-proofs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 900px; margin: 28px auto 0; }
        .tco-proof { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 20px 22px; box-shadow: var(--shadow-xs); }
        .tco-proof-v { font-family: var(--ff-display); font-weight: 700; font-size: 20px; color: var(--navy-900); }
        .tco-proof-d { font-size: 13.5px; color: var(--text-2); line-height: 1.55; margin-top: 6px; }
        @media (max-width: 820px) { .tco-duel { grid-template-columns: 1fr; } .tco-vs { padding: 4px 0; } .tco-proofs { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* Demo interativa do motor associativo: verde, branco e cinza */
function AssocDemo() {
  const clients = ['Cliente Alfa', 'Cliente Beta', 'Cliente Gama'];
  const products = ['Linha Premium', 'Linha Standard', 'Serviços', 'Acessórios', 'Manutenção', 'Consumíveis'];
  const bought = {
    'Cliente Alfa': ['Linha Premium', 'Serviços', 'Consumíveis'],
    'Cliente Beta': ['Linha Standard', 'Acessórios'],
    'Cliente Gama': ['Linha Premium', 'Linha Standard', 'Manutenção', 'Consumíveis'],
  };
  const segments = ['Pet Shop', 'Agropecuária', 'Varejo Alimentar', 'Farma', 'Construção'];
  const inSegs = {
    'Cliente Alfa': ['Pet Shop', 'Agropecuária'],
    'Cliente Beta': ['Varejo Alimentar', 'Construção'],
    'Cliente Gama': ['Pet Shop', 'Farma', 'Varejo Alimentar'],
  };
  const [sel, setSel] = React.useState('Cliente Beta');
  return (
    <div className="ad-panel reveal">
      <div className="ad-head">
        <div>
          <div className="ad-t">Clique em um cliente e veja o motor associativo reagir.</div>
          <div className="ad-d">O cinza é o segredo: ele mostra o que <b>não</b> aconteceu — as linhas que esse cliente nunca comprou. É aí que mora a próxima venda.</div>
        </div>
        <div className="ad-legend">
          <span><i className="ad-dot ad-g"></i> selecionado</span>
          <span><i className="ad-dot ad-w"></i> associado</span>
          <span><i className="ad-dot ad-x"></i> excluído</span>
        </div>
      </div>
      <div className="ad-row">
        <span className="ad-lbl">Clientes</span>
        <div className="ad-chips">
          {clients.map(c => (
            <button key={c} type="button" className={`ad-chip ${sel === c ? 'ad-sel' : ''}`} onClick={() => setSel(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="ad-row">
        <span className="ad-lbl">Segmentos</span>
        <div className="ad-chips">
          {segments.map(s => {
            const on = inSegs[sel].includes(s);
            return (
              <span key={s} className={`ad-chip ad-ro ${on ? 'ad-assoc' : 'ad-excl'}`}>
                {s}{!on && <em>oportunidade</em>}
              </span>
            );
          })}
        </div>
      </div>
      <div className="ad-row">
        <span className="ad-lbl">Linhas de produto</span>
        <div className="ad-chips">
          {products.map(p => {
            const on = bought[sel].includes(p);
            return (
              <span key={p} className={`ad-chip ad-ro ${on ? 'ad-assoc' : 'ad-excl'}`}>
                {p}{!on && <em>oportunidade</em>}
              </span>
            );
          })}
        </div>
      </div>
      <style>{`
        .ad-panel { background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 24px 26px; margin-bottom: 36px; }
        .ad-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap; margin-bottom: 18px; }
        .ad-t { font-family: var(--ff-display); font-weight: 700; font-size: 17px; color: var(--navy-900); }
        .ad-d { font-size: 13.5px; color: var(--text-2); margin-top: 5px; max-width: 560px; line-height: 1.55; }
        .ad-legend { display: flex; gap: 14px; font-size: 11.5px; color: var(--text-3); white-space: nowrap; padding-top: 4px; }
        .ad-legend span { display: inline-flex; align-items: center; gap: 5px; }
        .ad-dot { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
        .ad-g { background: #21a35c; }
        .ad-w { background: #fff; border: 1px solid var(--line); }
        .ad-x { background: #b9c0cc; }
        .ad-row { display: flex; align-items: baseline; gap: 14px; margin-top: 12px; flex-wrap: wrap; }
        .ad-lbl { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); min-width: 118px; }
        .ad-chips { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; }
        .ad-chip { border: 1px solid var(--line); border-radius: 8px; padding: 8px 14px; font-size: 13px; font-family: var(--ff-body, Inter); background: #fff; color: var(--navy-900); cursor: pointer; transition: all .15s ease; white-space: nowrap; flex-shrink: 0; }
        .ad-chip:hover { border-color: #21a35c; }
        .ad-sel { background: #21a35c; border-color: #21a35c; color: #fff; font-weight: 600; }
        .ad-ro { cursor: default; display: inline-flex; align-items: center; gap: 7px; }
        .ad-assoc { background: #fff; }
        .ad-excl { background: #e4e7ec; border-color: #d3d8e0; color: #8b93a2; }
        .ad-excl em { font-style: normal; font-family: var(--ff-mono); font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--turquoise-ink); background: rgba(117,227,228,0.25); border-radius: 99px; padding: 2px 7px; }
      `}</style>
    </div>
  );
}

/* Qlik por dentro — profundidade técnica */
function SolucoesTech() {
  const items = [
    { icon: 'brain', t: 'Motor associativo in-memory', d: 'Sem modelo rígido de entidade-relacionamento: o Qlik indexa todas as relações e você explora em qualquer direção. Inclusive o que NÃO aconteceu: o motor destaca os dados excluídos que as ferramentas SQL escondem.' },
    { icon: 'link', t: 'Pipelines e cargas incrementais', d: 'Cargas incrementais agendadas e arquivos .qvd comprimidos: histórico preservado, recarga sem pesar a origem e sem obrigar você a montar um data warehouse só para rodar o BI.' },
    { icon: 'shield', t: 'Segurança em nível de linha', d: 'Section Access nativo: cada usuário enxerga só a filial, a carteira ou o recorte que pode ver. SSO, criptografia e trilha de auditoria.' },
    { icon: 'alert', t: 'Alertas orientados a dado', d: 'Alertas disparados pela condição do indicador, não por horário, direto no celular. Relatórios assinados chegam por e-mail no ritmo que você definir.' },
    { icon: 'cpu', t: 'Embedded analytics e APIs', d: 'Dashboards embutidos em portais e sistemas próprios, com APIs REST para automação e integração ao restante do seu ecossistema.' },
    { icon: 'trending', t: 'IA nativa + camada SEWE', d: 'Inteligência preditiva ativa: anomalias detectadas automaticamente e avisadas no e-mail ou no celular, sem prompts e sem contratar cientista de dados. Previsão de demanda e churn no mesmo modelo.' },
  ];
  const flow = [
    { t: 'ERP e fontes', d: 'Qualquer origem de dados' },
    { t: 'Engenharia SEWE', d: 'ETL, modelagem, governança' },
    { t: 'Qlik Cloud', d: 'Analytics em região brasileira' },
    { t: 'Decisão', d: 'Web, mobile, e-mail e alertas' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 44px' }}>
          <div className="eyebrow">Por dentro da tecnologia</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Robustez de plataforma, <span style={{ color: 'var(--navy)' }}>sem caixa-preta</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Por baixo dos dashboards existe uma arquitetura de dados séria. É ela que sustenta decisão confiável em escala.
          </p>
        </div>
        <div className="st-flow">
          {flow.map((f, i) => (
            <React.Fragment key={i}>
              <div className="st-step reveal">
                <div className="st-step-t">{f.t}</div>
                <div className="st-step-d">{f.d}</div>
              </div>
              {i < flow.length - 1 && <span className="st-arrow" aria-hidden><Icon name="arrow" size={16} stroke={2.2}/></span>}
            </React.Fragment>
          ))}
        </div>
        <AssocDemo/>
        <div className="st-grid">
          {items.map((it, i) => (
            <div key={i} className="st-card reveal">
              <span className="st-icon"><Icon name={it.icon} size={20} stroke={1.8}/></span>
              <div className="st-t">{it.t}</div>
              <p className="st-d">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .st-flow { display: flex; align-items: stretch; justify-content: center; gap: 10px; margin-bottom: 36px; flex-wrap: wrap; }
        .st-step { background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-md); padding: 14px 20px; text-align: center; min-width: 170px; }
        .st-step-t { font-family: var(--ff-display); font-weight: 700; font-size: 15px; color: var(--navy-900); }
        .st-step-d { font-size: 12px; color: var(--text-3); margin-top: 4px; }
        .st-arrow { align-self: center; color: var(--turquoise-ink); }
        .st-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .st-card { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 24px; box-shadow: var(--shadow-xs); }
        .st-icon { width: 42px; height: 42px; border-radius: 11px; background: rgba(45,67,108,0.08); color: var(--navy-700); display: grid; place-items: center; margin-bottom: 14px; }
        .st-t { font-family: var(--ff-display); font-weight: 700; font-size: 17px; color: var(--navy-900); margin-bottom: 8px; }
        .st-d { font-size: 14px; color: var(--text-2); line-height: 1.6; }
        @media (max-width: 960px) { .st-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .st-grid { grid-template-columns: 1fr; } .st-arrow { transform: rotate(90deg); width: 100%; display: grid; place-items: center; } }
      `}</style>
    </section>
  );
}

/* How we work — 4-step process */
function SolucoesProcess() {
  const steps = [
    { n: '01', t: 'Diagnóstico', d: 'Entendemos o desafio, as fontes de dados e o resultado esperado. Sem compromisso.' },
    { n: '02', t: 'Arquitetura sem limites', d: 'Nossa engenharia desenvolve regras de negócio customizadas, painéis complexos e integrações exclusivas. Se a sua empresa precisa, nós modelamos.' },
    { n: '03', t: 'Go-live', d: 'Dashboards e IA no ar, com a sua equipe treinada e usando no dia a dia.' },
    { n: '04', t: 'Squad dedicado ao crescimento', d: 'Seu negócio muda, seus gráficos também. O time SEWE continua criando novas visões, relatórios e ferramentas conforme a operação evolui.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 44px' }}>
          <div className="eyebrow">Como trabalhamos</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>Do desafio ao resultado, em quatro passos.</h2>
        </div>
        <div className="sp-grid">
          {steps.map((s, i) => (
            <div key={i} className="sp-card reveal">
              <div className="sp-n">{s.n}</div>
              <div className="sp-t">{s.t}</div>
              <p className="sp-d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .sp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .sp-card { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 24px; box-shadow: var(--shadow-xs); }
        .sp-n { font-family: var(--ff-mono); font-weight: 600; font-size: 13px; color: var(--turquoise-ink); letter-spacing: 0.1em; }
        .sp-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: var(--navy-900); margin: 12px 0 8px; }
        .sp-d { font-size: 14px; color: var(--text-2); line-height: 1.6; }
        @media (max-width: 860px) { .sp-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .sp-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function SolucoesPage() {
  useReveal();
  return (
    <>
      <SiteHeader/>
      <PageHero
        eyebrow="Soluções Sob Medida"
        title="Dados e IA muito além do BI de prateleira."
        lead="Para empresas de qualquer setor: a plataforma Qlik de ponta a ponta, integração, analytics e IA, com a engenharia de dados da SEWE por trás. Dado governado, painel rápido e decisão direto no navegador."
      >
        <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 999, background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xs)', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>
            <img src="/assets/qlik-logo.png" alt="Qlik" style={{ height: 15, width: 'auto', display: 'block' }}/>
            Parceiro oficial Qlik
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xs)', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>
            <span style={{ color: 'var(--turquoise-ink)', display: 'inline-flex' }}><Icon name="trophy" size={14} stroke={1.8}/></span>
            Líder do Quadrante Mágico da Gartner em Analytics por 14 anos consecutivos
          </span>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">Falar sobre o meu projeto <Icon name="arrow" size={16} className="chev"/></a>
          <a href="https://wa.me/5548984704389" className="btn btn-outline btn-lg">WhatsApp</a>
        </div>
      </PageHero>
      <SolucoesOfferings/>
      <SolucoesPlatform/>
      <SolucoesTech/>
      <SolucoesProcess/>
      <DifferentiatorsSection/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── mount ───────────────────────────────────────────────── */
(function mountAudience() {
  const map = { 'industria-root': IndustriaPage, 'solucoes-root': SolucoesPage };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) ReactDOM.createRoot(el).render(React.createElement(map[id]));
  });
})();

Object.assign(window, { IndustriaPage, SolucoesPage });

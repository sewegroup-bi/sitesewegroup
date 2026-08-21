// Audience pages: Indústria + Plataforma de Dados & IA. Each mounts into its own root.
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
      label: tx('Ecossistema Sewe'),
      icon: 'link',
      tagline: tx('Prever e agir, não só enxergar.'),
      title: tx('Preveja a ruptura antes que ela vire venda perdida.'),
      body: tx('Não é só visibilidade, é controle: a indústria equilibra sell-in e sell-out sem o efeito chicote, antecipa a ruptura e sabe exatamente onde crescer, sem depender de ligação do distribuidor.'),
      kpis: [{ v: 'R$ 128,4M', l: tx('volume de vendas da rede') }, { v: '3,4%', l: tx('ruptura média identificada') }, { v: '340', l: tx('gaps de portfólio mapeados') }],
      bullets: [
        tx('Ruptura Zero: veja qual PDV ficou sem o seu produto antes do consumidor trocar de marca'),
        tx('Sell-in e sell-out equilibrados, sem superestocar nem desabastecer o distribuidor'),
        tx('Gaps de portfólio por revenda, com sugestão automática de cross-sell'),
        tx('Trade marketing no mesmo dia, direto na região onde o produto está encalhando'),
      ],
      dashboard: 'todo',
    },
    {
      key: 'integration',
      label: 'Integration',
      icon: 'link',
      pillColor: BU_C.integration.color,
      tagline: tx('Governança comercial entre indústria e distribuidor.'),
      title: tx('As regras da indústria, executadas à risca em toda a rede.'),
      body: tx('O Integration não liga só sistemas: garante que preço, produto e política comercial valham para todo distribuidor. Qualquer divergência é bloqueada na hora, antes de virar prejuízo de margem.'),
      kpis: [{ v: 'R$ 42,6M', l: tx('faturamento sincronizado / mês') }, { v: '126', l: tx('divergências de preço bloqueadas / mês') }, { v: '98%', l: tx('sem retrabalho manual') }],
      bullets: [
        tx('Governança de preço absoluta: todo distribuidor opera com a tabela e a política comercial vigente, sem espaço para desconto indevido'),
        tx('Visibilidade de estoque para produção: saiba o nível de estoque de toda a rede para planejar a linha de produção sem desperdício'),
        tx('Planejamento de demanda (S&OP) com dado real: a fábrica sabe o que produzir na próxima semana, sem achismo'),
        tx('Faturamento consolidado em segundos, sem esperar semanas para fechar o balanço da marca na rede'),
      ],
      dashboard: 'integration',
    },
    {
      key: 'sales',
      label: 'Sales',
      icon: 'store',
      pillColor: BU_C.sales.color,
      tagline: tx('A operação comercial da rede em um único fluxo.'),
      title: tx('Vendedor, distribuidor e indústria enxergando o mesmo pedido, em tempo real.'),
      body: 'Você define catálogo, preço e política comercial; sua rede vende dentro deles. O orçamento nasce digitado, a aprovação acontece no sistema e você acompanha tudo, do balcão à diretoria.',
      kpis: [{ v: '2.340', l: tx('orçamentos digitais / mês') }, { v: '1,8h', l: tx('tempo médio de aprovação') }, { v: '78%', l: tx('taxa de aprovação') }],
      bullets: [
        tx('Fim do orçamento em PDF pelo WhatsApp: a proposta nasce no sistema, com o preço e o estoque que a sua marca definiu'),
        tx('Aprovação sem burocracia: o desconto fora da alçada chega ao aprovador certo e é decidido em minutos, com histórico completo'),
        tx('Campanha de incentivo que funciona: você cria e ela aparece na hora na tela do vendedor, no balcão'),
        tx('Um número só para todo mundo: o que você usa para planejar a produção é o mesmo que o distribuidor usa para acompanhar a equipe'),
      ],
      dashboard: 'sales',
    },
    {
      key: 'bi',
      label: 'BI',
      icon: 'brain',
      pillColor: BU_C.bi.color,
      tagline: tx('O conselheiro estratégico da rede.'),
      title: tx('A inteligência que conecta as pontas: da fábrica à gôndola.'),
      body: tx('O SEWE BI cruza comercial, supply chain, financeiro e trade marketing num só modelo de dado. Não é olhar para trás: é prever o que vem e apontar onde agir antes da concorrência.'),
      kpis: [{ v: '1,04x', l: tx('índice saúde do canal · sell-in/sell-out') }, { v: '91%', l: tx('assertividade da previsão de demanda') }, { v: '3,2x', l: tx('ROI médio de trade marketing') }],
      bullets: [
        tx('Relacione o sell-in com o sell-out real e evite o efeito chicote nos estoques'),
        tx('Previsibilidade de demanda apoiada por IA, baseada no giro real da ponta'),
        tx('Meça o ROI das campanhas de trade e a rentabilidade real por distribuidor'),
        tx('Detecte anomalias de mercado, como ruptura ou queda brusca, em tempo real'),
      ],
      dashboard: 'bi',
    },
  ];

  const S = views[active];

  return (
    <section id="ecossistema" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('O ecossistema conectado')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Consumidor, revenda, distribuidor, indústria.')} <span style={{ color: 'var(--navy)' }}>{tx('Todos conectados, direto')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Escolha uma frente e veja o recorte da cadeia que ela entrega para a indústria.')}</p>
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

            <a href="#diagnostico" className="btn btn-primary" style={{ marginTop: 24 }}>{tx('Ver demonstração de')} {S.label}
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
    { dist: tx('Distribuidor Alfa'), tipo: tx('Tabela de preço desatualizada (-8%)'), quando: tx('2 min atrás'), acao: tx('Bloqueado'), cor: c },
    { dist: tx('Distribuidor Beta'), tipo: tx('Produto descontinuado · SKU 4521'), quando: tx('14 min atrás'), acao: tx('Redirecionado'), cor: '#0e7a7c' },
    { dist: tx('Distribuidor Gama'), tipo: tx('Desconto fora de política (12%)'), quando: tx('38 min atrás'), acao: tx('Em aprovação'), cor: '#c27a00' },
    { dist: tx('Distribuidor Delta'), tipo: tx('Tabela de preço desatualizada (-5%)'), quando: tx('1h atrás'), acao: tx('Bloqueado'), cor: c },
  ];
  // cor por acao: guardada na propria linha, para o rotulo poder ser traduzido
  return (
    <div className="ip-panel">
      <div className="ip-head">
        <div className="ip-head-l">
          <span className="ip-head-mark">S</span>{tx('SEWE INTEGRATION · GOVERNANÇA COMERCIAL')}</div>
        <span className="ip-live"><span className="ip-live-dot"/>{tx('AO VIVO')}</span>
      </div>
      <div className="ip-tabs">
        {[tx('Visão geral'), tx('Pedidos'), tx('Estoque'), tx('Divergências')].map((t, i) => (
          <div key={t} className={'ip-tab' + (i === 3 ? ' is-on' : '')}>{t}</div>
        ))}
      </div>
      <div className="ip-body">
        <div className="ip-kpis">
          <div className="ip-kpi"><div className="ip-kpi-v tnum">R$ 42,6M</div><div className="ip-kpi-l">{tx('faturamento sincronizado / mês')}</div></div>
          <div className="ip-kpi"><div className="ip-kpi-v tnum">126</div><div className="ip-kpi-l">{tx('divergências bloqueadas / mês')}</div></div>
          <div className="ip-kpi"><div className="ip-kpi-v tnum">3.482</div><div className="ip-kpi-l">{tx('SKUs visíveis para o S&OP')}</div></div>
          <div className="ip-kpi"><div className="ip-kpi-v tnum">&lt; 2 min</div><div className="ip-kpi-l">{tx('tempo de sincronização')}</div></div>
        </div>
        <div className="ip-banner">
          <b style={{ fontFamily: 'Chakra Petch' }}>{tx('Cada divergência bloqueada')}</b> {tx('evita a quebra de margem antes que o pedido saia do distribuidor, sem depender de auditoria manual.')}</div>
        <div className="ip-table-head">{tx('Divergências detectadas agora')}</div>
        <div className="ip-table">
          {divergencias.map((d, i) => (
            <div key={i} className="ip-row">
              <span className="ip-row-dist">{d.dist}</span>
              <span className="ip-row-tipo">{d.tipo}</span>
              <span className="ip-row-quando">{d.quando}</span>
              <span className="ip-row-acao" style={{ color: d.cor, background: `color-mix(in srgb, ${d.cor} 14%, transparent)` }}>{d.acao}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="demo-foot">{tx('dados ilustrativos')}</div>
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
    { rep: 'Jonas M.', dist: tx('Distribuidor Sul'), desconto: '8%', status: 'aprovado', t: '12 min' },
    { rep: 'Carla R.', dist: tx('Distribuidor Vale'), desconto: '12%', status: 'pendente', t: '—' },
    { rep: 'Diego A.', dist: tx('Distribuidor Norte'), desconto: '5%', status: 'aprovado', t: '6 min' },
  ];
  return (
    <div className="sp-wrap">
      <div className="sp-panel">
        <div className="sp-head">
          <div className="sp-head-l">
            <span className="sp-head-mark">S</span>{tx('SEWE SALES · PORTAL DO VENDEDOR')}</div>
          <span className="sp-live"><span className="sp-live-dot"/>{tx('AO VIVO')}</span>
        </div>
        <div className="sp-tabs">
          {[tx('Catálogo'), tx('Orçamentos'), tx('Aprovações'), tx('Campanhas')].map((t, i) => (
            <div key={t} className={'sp-tab' + (i === 2 ? ' is-on' : '')}>{t}</div>
          ))}
        </div>
        <div className="sp-body">
          <div className="sp-kpis">
            <div className="sp-kpi"><div className="sp-kpi-v tnum">2.340</div><div className="sp-kpi-l">{tx('orçamentos digitais / mês')}</div></div>
            <div className="sp-kpi"><div className="sp-kpi-v tnum">1,8h</div><div className="sp-kpi-l">{tx('tempo médio de aprovação')}</div></div>
            <div className="sp-kpi"><div className="sp-kpi-v tnum">78%</div><div className="sp-kpi-l">{tx('taxa de aprovação')}</div></div>
          </div>
          <div className="sp-table-head">{tx('Aprovações de desconto · agora')}</div>
          <div className="sp-table">
            {approvals.map((a, i) => (
              <div key={i} className="sp-row">
                <span className="sp-row-rep">{a.rep}</span>
                <span className="sp-row-dist">{a.dist}</span>
                <span className="sp-row-desc tnum">{a.desconto}</span>
                <span className={'sp-row-status st-' + a.status}>{a.status === 'aprovado' ? tx('Aprovado · ') + a.t : tx('Pendente')}</span>
              </div>
            ))}
          </div>
          <div className="sp-note">{tx('O mesmo número que a indústria usa para planejar produção é o que o distribuidor usa para cobrar a equipe, e o vendedor consulta para fechar o mês.')}</div>
        </div>
      </div>

      <div className="sp-phone">
        <div className="sp-phone-notch"/>
        <div className="sp-phone-head">{tx('Orçamento · Revenda Sul')}</div>
        <div className="sp-phone-list">
          <div className="sp-phone-item"><span>{tx('Conector M8')}</span><span className="tnum">120 un</span></div>
          <div className="sp-phone-item"><span>{tx('Sensor indutivo')}</span><span className="tnum">36 un</span></div>
          <div className="sp-phone-item"><span>{tx('Cabo blindado')}</span><span className="tnum">80 m</span></div>
        </div>
        <div className="sp-phone-total"><span>{tx('Total')}</span><span className="tnum">R$ 14.280</span></div>
        <div className="sp-phone-btn">{tx('Enviar pedido')}</div>
        <div className="sp-phone-toast">{tx('Aprovado em 12 min')}</div>
      </div>

      <div className="demo-foot">{tx('dados ilustrativos')}</div>
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
          <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em' }}>{tx('SEWE · ECOSSISTEMA')}</div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>{tx('HOJE · 14:22')}</span>
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
      <div className="ecf-foot">{tx('dados ilustrativos')}</div>
      <style>{`
        .ecf-foot {
          padding: 7px 14px; background: #fff; border-top: 1px solid var(--line);
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .1em;
          text-transform: uppercase; color: var(--text-3); text-align: right;
        }
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
      <EcosystemFrame title={tx('ECOSSISTEMA · SELL-IN × SELL-OUT')} subtitle={tx('MTD · Nacional')} tabs={[tx('Visão geral'), tx('Ruptura'), tx('Gaps'), tx('Sell-out')]} activeTab={2}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
          <QlikKPI compact label={tx('Volume de Vendas')} value="R$ 128,4M" delta="+18%" trend="up" color={Q.navy} spark={<Sparkline data={[98,104,109,113,118,122,128]}/>}/>
          <QlikKPI compact label={tx('Ruptura Média')} value="3,4%" delta="-0,6pp" trend="up" color={Q.neg}/>
          <QlikKPI compact label={tx('Gaps Mapeados')} value="340" delta="+52" trend="up" color={Q.navy}/>
          <QlikKPI compact label={tx('Potencial Cross-sell')} value="R$ 6,8M" delta="+9%" trend="up" color={Q.pos}/>
        </div>
        <div style={{ padding: '10px 14px', marginBottom: 10, background: '#fff4dc', border: `1px solid #f0d9a8`, borderRadius: 10, fontSize: 12.5, color: Q.ink }}>
          <b style={{ fontFamily: 'Chakra Petch' }}>{tx('Numa rede de R$ 130M por ano')}</b> {tx('cada 1pp de ruptura reduzida devolve cerca de R$ 1,3M em vendas — dinheiro que hoje vira troca de marca no PDV.')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
          <QlikTable
            title={tx('Top gaps de portfólio por revenda · cross-sell sugerido')}
            columns={[
              { key: 'revenda', label: tx('Revenda') },
              { key: 'gap', label: tx('Produto ausente') },
              { key: 'contexto', label: tx('Contexto') },
              { key: 'acao', label: tx('Ação'), align: 'center', render: (v) => (
                <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(117,227,228,0.18)', color: Q.turqDk, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>{v.toUpperCase()}</span>
              )},
            ]}
            rows={[
              { revenda: tx('Revenda Sul · SC'), gap: tx('Condicionador Linha X'), contexto: tx('Compra o Shampoo há 8 meses'), acao: tx('Cross-sell') },
              { revenda: tx('Revenda Vale'), gap: tx('Sabonete Kids'), contexto: tx('Compra a linha adulto'), acao: tx('Cross-sell') },
              { revenda: tx('Revenda Norte'), gap: tx('Refil 500ml'), contexto: tx('Compra só o frasco 1L'), acao: tx('Cross-sell') },
              { revenda: tx('Revenda Litoral'), gap: tx('Kit Presente'), contexto: tx('Alto giro em datas sazonais'), acao: tx('Trade mkt') },
            ]}
            compact
          />
          <QlikArea title={tx('Ruptura média · evolução 12m')} subtitle={tx('Queda sustentada com alerta antecipado')} data={[5.8,5.5,5.2,4.9,4.6,4.3,4.1,3.9,3.7,3.6,3.5,3.4]} labels={['M1','','','M4','','','M7','','','M10','','']} height={230}/>
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
    <QlikFrame title={tx('BI · CONSELHEIRO ESTRATÉGICO DA REDE')} subtitle={tx('Consolidado · MTD')} tabs={[tx('Sell-in × Sell-out'), tx('Simulação IA'), tx('Trade ROI'), tx('Mapa de Gaps')]} activeTab={1}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
        <QlikKPI compact label={tx('Saúde do Canal')} value="1,04x" delta="+0,06" trend="down" color={Q.warn}/>
        <QlikKPI compact label={tx('Assertividade IA')} value="91%" delta="+3pp" trend="up" color={Q.pos}/>
        <QlikKPI compact label={tx('ROI Trade Marketing')} value="3,2x" delta="+0,4x" trend="up" color={Q.navy}/>
        <QlikKPI compact label={tx('Valor Latente · Cross-sell')} value="R$ 6,8M" delta="+9%" trend="up" color={Q.navy}/>
      </div>
      <div style={{ padding: '10px 14px', marginBottom: 10, background: '#fff4dc', border: `1px solid #f0d9a8`, borderRadius: 10, fontSize: 12.5, color: Q.ink }}>
        <b style={{ fontFamily: 'Chakra Petch' }}>{tx('Sell-in alto com sell-out baixo é efeito chicote:')}</b> {tx('a IA já identificou 4 distribuidores nesse padrão este mês, antes do estoque travar o pedido seguinte.')}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
        <QlikHBars
          title={tx('Índice sell-in × sell-out por distribuidor')}
          rows={[
            { label: tx('Distribuidor Alfa'), v: 98, display: '0,98x', color: Q.pos },
            { label: tx('Distribuidor Beta'), v: 102, display: '1,02x', color: Q.pos },
            { label: tx('Distribuidor Gama'), v: 118, display: '1,18x', color: Q.warn },
            { label: tx('Distribuidor Delta'), v: 134, display: '1,34x', color: Q.neg },
            { label: tx('Distribuidor Épsilon'), v: 141, display: '1,41x', color: Q.neg },
          ]}
          max={150}
        />
        <QlikArea title={tx('Previsão de demanda (IA) × giro real')} subtitle={tx('Próx. 30 dias · assertividade 91%')} data={[82,78,84,88,92,95,98,104,108,112,118,125]} labels={['D+1','','','','D+15','','','','','','D+30','']} height={230}/>
      </div>
    </QlikFrame>
  );
}


/* Industry's live view of its distributor network */
function IndustriaNetworkPanel() {
  const [expanded, setExpanded] = React.useState(0);
  const kpis = [
    { v: 'R$ 128,4M', l: tx('sellout da rede · MTD'), t: 'up' },
    { v: '87,2%', l: tx('cobertura de PDV'), t: 'up' },
    { v: '3,4%', l: tx('ruptura no canal'), t: 'down' },
    { v: '512', l: tx('distribuidores ativos'), t: 'up' },
  ];
  const rows = [
    { n: tx('Distribuidor Alfa'),    uf: 'SC', sellout: 'R$ 24,1M', cov: 94, rup: 1.8, w: 100,
      products: [{ n: tx('Ração Premier 15kg'), v: 'R$ 6,2M' }, { n: tx('Suplemento Linha A'), v: 'R$ 4,8M' }, { n: tx('Acessório Pet Pro'), v: 'R$ 3,1M' }] },
    { n: tx('Distribuidor Beta'),    uf: 'RS', sellout: 'R$ 19,7M', cov: 91, rup: 2.2, w: 82,
      products: [{ n: tx('Ração Premier 15kg'), v: 'R$ 5,1M' }, { n: tx('Shampoo Pet 5L'), v: 'R$ 3,4M' }, { n: tx('Coleira Antipulgas'), v: 'R$ 2,6M' }] },
    { n: tx('Distribuidor Gama'),    uf: 'PR', sellout: 'R$ 16,3M', cov: 88, rup: 3.1, w: 68,
      products: [{ n: tx('Ração Felina Adult'), v: 'R$ 3,9M' }, { n: tx('Vacina Pol. V8'), v: 'R$ 2,8M' }, { n: tx('Cama Grande'), v: 'R$ 1,9M' }] },
    { n: tx('Distribuidor Delta'),   uf: 'SC', sellout: 'R$ 12,9M', cov: 85, rup: 3.6, w: 54,
      products: [{ n: tx('Ração Premier 15kg'), v: 'R$ 3,2M' }, { n: tx('Brinquedo Mordedor'), v: 'R$ 1,8M' }, { n: tx('Areia Sanitária 4kg'), v: 'R$ 1,4M' }] },
    { n: tx('Distribuidor Épsilon'), uf: 'SP', sellout: 'R$ 9,4M',  cov: 79, rup: 4.9, w: 39,
      products: [{ n: tx('Ração Premier 15kg'), v: 'R$ 2,1M' }, { n: tx('Shampoo Pet 5L'), v: 'R$ 1,4M' }, { n: tx('Coleira Antipulgas'), v: 'R$ 0,9M' }] },
    { n: tx('Distribuidor Ômega'),   uf: 'MG', sellout: 'R$ 7,1M',  cov: 74, rup: 5.4, w: 29,
      products: [{ n: tx('Ração Premier 15kg'), v: 'R$ 1,6M' }, { n: tx('Vacina Pol. V8'), v: 'R$ 1,1M' }, { n: tx('Cama Grande'), v: 'R$ 0,7M' }] },
  ];
  return (
    <section className="section" style={{ background: 'var(--band)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('A rede em um só painel')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('O sellout de cada distribuidor,')} <span style={{ color: 'var(--navy)' }}>{tx('com abertura até o nível de produto')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Um recorte do que a indústria enxerga: quem vende, onde há cobertura e onde a ruptura está custando venda.')}</p>
        </div>

        <div className="inp">
          <div className="inp-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SMark size={22} color="#75e3e4"/>
              <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.02em' }}>{tx('REDE DE DISTRIBUIÇÃO · CONSOLIDADO')}</span>
            </div>
            <span className="inp-live"><span className="inp-dot"/>{tx('ABR/2026')}</span>
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
              <span>{tx('Distribuidor')}</span><span>{tx('Sellout MTD')}</span><span className="inp-hide">{tx('Cobertura')}</span><span>{tx('Ruptura')}</span>
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
                  <div className="inp-drill-head">{tx('Produto a produto ·')} {r.n}</div>
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
      <div className="demo-foot">{tx('dados ilustrativos')}</div>
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
      title={tx('A IA lê a rede inteira e devolve')}
      hl={tx('a próxima ação')}
      lead={tx('Cruza sellout, estoque e cobertura de todos os distribuidores nos bastidores e mostra onde agir, por região, por canal e por produto, sem você garimpar gráfico.')}
      feats={[
        { icon: 'alert',    t: tx('Ruptura no canal por SKU'), d: tx('Saiba quais produtos estão faltando em quais PDVs antes de perder a venda.') },
        { icon: 'target',   t: tx('Cobertura e positivação'), d: tx('Onde a marca está presente, onde está fraca e onde há espaço para crescer.') },
        { icon: 'boxes',    t: tx('Mix ideal por região'), d: tx('O sortimento certo para cada perfil de PDV, com base no que realmente gira.') },
        { icon: 'trending', t: tx('Previsão de demanda'), d: tx('Projeção de giro por produto e região para planejar produção e abastecimento.') },
      ]}
      aside={{
        bg: 'linear-gradient(160deg,#15243d,#0d1a2e)',
        tag: tx('RESULTADO NA REDE'), tagColor: '#7fe9ea', tagBg: 'rgba(117,227,228,0.14)',
        metric: '+90%', metricLabel: tx('assertividade na reposição da rede'),
        desc: tx('Menos ruptura no canal e menos estoque parado, com decisão guiada por dado, não por achismo.'),
        list: [tx('Decisões totalmente preditivas: antecipe a necessidade de estoque antes que os pedidos parem'), tx('Prevenção ativa de perdas: a IA detecta anomalias e avisa onde agir imediatamente'), tx('Ação mastigada para o time: menos relatório abstrato, mais direcionamento prático de venda')],
      }}
    />
  );
}

/* Modularidade — contrate tudo ou só uma parte */
function IndustriaModular() {
  const combos = [
    { c: BU_C.integration, t: tx('Enxergar a rede'), d: tx('O painel de sellout, estoque e cobertura de cada distribuidor. Visibilidade imediata, sem mexer na operação.'), tag: tx('PORTA DE ENTRADA') },
    { c: BU_C.sales, t: tx('Enxergar + vender'), d: tx('A visibilidade da rede com o portal comercial por cima: orçamento, aprovação e CRM rodando no padrão da indústria.'), tag: tx('MAIS ESCOLHIDO') },
    { c: BU_C.bi, t: tx('Ecossistema completo'), d: tx('O cérebro por cima de tudo: a IA cruza visibilidade e venda para prever demanda, evitar ruptura e fechar o ciclo.'), tag: tx('CICLO FECHADO') },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 44px' }}>
          <div className="eyebrow">{tx('Modular de verdade')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Comece por onde')} <span style={{ color: 'var(--navy)' }}>{tx('dói mais')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Cada entrega funciona sozinha. Contrate só a parte que resolve o seu problema de hoje e amplie quando fizer sentido, sem trocar de plataforma no caminho.')}</p>
        </div>
        <div className="mod-grid">
          {combos.map((m, i) => (
            <div key={i} className="mod-card reveal" style={{ borderTopColor: m.c.color }}>
              <div className="mod-tag" style={{ color: m.c.ink, background: m.c.soft }}>{m.tag}</div>
              <div className="mod-t">{m.t}</div>
              <p className="mod-d">{m.d}</p>
              <a href="#diagnostico" className="mod-cta" style={{ color: m.c.ink }}>{tr('cta.primary')} <Icon name="arrow" size={14} stroke={2.2}/>
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

/* Diagnóstico: por que o sell-out que a indústria recebe hoje não fecha.
   Fundo escuro porque é a seção do problema — o resto da página é claro. */
function IndustriaDiagnostico() {
  const limites = [
    {
      n: '01', t: tx('Apenas notas emitidas'),
      d: tx('A leitura pega só o XML das notas que o distribuidor emitiu. A devolução que o cliente emite de volta não entra na conta.'),
      c: [tx('Verba e bonificação pagas em duplicidade: o produto é vendido, a devolução não abate e a nova venda é contabilizada de novo.')],
    },
    {
      n: '02', t: tx('Estoque por planilha'),
      d: tx('Um retrato parcial: não enxerga transferência entre lojas, item aguardando entrada nem estoque pós-venda. E não separa estoque fiscal de gerencial.'),
      c: [tx('Visão incorreta do nível de estoque em campo.'), tx('Sugestão de compra incorreta.'), tx('Impacto direto nas estratégias comerciais.')],
    },
    {
      n: '03', t: tx('Cadastro de produtos'),
      d: tx('Cadastros divergentes entre indústria e distribuidor, e produtos de outras marcas processados como se fossem sell-out da sua linha.'),
      c: [tx('Verba paga sobre produto de outro fabricante.'), tx('Produto seu que não entra na apuração por cadastro incorreto.')],
    },
    {
      n: '04', t: tx('Frequência e falhas de atualização'),
      d: tx('Indisponibilidade da SEFAZ gera reprocessamento histórico. Nova filial ou alteração sistêmica no distribuidor deixa o estoque defasado.'),
      c: [tx('A credibilidade da apuração cai.'), tx('A reunião comercial debate o dado, não o negócio.'), tx('Análise e estratégia ficam limitadas pela insegurança.')],
    },
  ];
  return (
    <section className="section id-sec">
      <div className="container">
        <div className="id-head reveal">
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>{tx('Diagnóstico · causa-raiz')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)', color: '#fff' }}>{tx('Hoje você enxerga o distribuidor')} <span style={{ color: 'var(--turquoise-2)' }}>{tx('por fora')}</span>.
          </h2>
          <p className="id-lead">{tx('O sell-out chega por relatório, o estoque por planilha e o cadastro não bate. O número existe, mas chega tarde, incompleto e sem ninguém que responda por ele. Não é falta de esforço do parceiro: é limitação do método.')}</p>
        </div>

        <div className="id-grid">
          {limites.map((l, i) => (
            <div key={i} className="id-card reveal">
              <div className="id-n">{tx('Limitação')} {l.n}</div>
              <div className="id-t">{l.t}</div>
              <p className="id-d">{l.d}</p>
            </div>
          ))}
        </div>

        <div className="id-cons-h">{tx('Consequência')}</div>
        <div className="id-cons">
          {limites.map((l, i) => (
            <ul key={i} className="id-cons-col reveal">
              {l.c.map((x, j) => <li key={j}>{x}</li>)}
            </ul>
          ))}
        </div>

        <div className="id-bridge reveal">
          <SMark size={20} color="var(--turquoise-2)"/>
          <div>
            <b>{tx('Por isso o problema não se resolve cobrando mais qualidade do fornecedor atual.')}</b>
            <span>{tx('A SEWE lê a operação de dentro: direto no ERP do distribuidor, nota a nota, item a item.')}</span>
          </div>
        </div>
      </div>
      <style>{`
        .id-sec { background: linear-gradient(160deg, #12100f 0%, #16130f 55%, #0f1512 100%); position: relative; overflow: hidden; }
        .id-sec::after { content: ''; position: absolute; bottom: -180px; left: -120px; width: 460px; height: 460px; border-radius: 50%; background: radial-gradient(circle, rgba(117,227,228,0.12), transparent 70%); pointer-events: none; }
        .id-head { max-width: 800px; margin: 0 auto 42px; text-align: center; position: relative; z-index: 1; }
        .id-lead { color: rgba(255,255,255,0.7); font-size: 17px; margin-top: 14px; line-height: 1.65; }
        .id-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; position: relative; z-index: 1; }
        .id-card { background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--r-lg); padding: 22px 20px; }
        .id-n { font-family: var(--ff-mono); font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--turquoise-2); }
        .id-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: #fff; line-height: 1.25; margin-top: 9px; }
        .id-d { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-top: 12px; }
        .id-cons-h { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: #e0715f; margin: 30px 0 14px; position: relative; z-index: 1; }
        .id-cons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; position: relative; z-index: 1; }
        .id-cons-col { list-style: none; margin: 0; padding: 0 0 0 14px; border-left: 2px solid rgba(224,113,95,0.45); display: grid; gap: 10px; align-content: start; }
        .id-cons-col li { font-size: 13px; color: rgba(255,255,255,0.72); line-height: 1.55; }
        .id-bridge { display: flex; gap: 14px; align-items: flex-start; margin-top: 40px; padding: 20px 22px; background: rgba(117,227,228,0.07); border: 1px solid rgba(117,227,228,0.2); border-radius: var(--r-lg); position: relative; z-index: 1; }
        .id-bridge b { display: block; font-family: var(--ff-display); font-weight: 700; font-size: 16px; color: #fff; line-height: 1.35; }
        .id-bridge span { display: block; font-size: 14px; color: rgba(255,255,255,0.68); line-height: 1.55; margin-top: 6px; }
        @media (max-width: 1000px) { .id-grid, .id-cons { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 620px) { .id-grid, .id-cons { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* Como o dado sai do ERP do distribuidor e chega íntegro na indústria.
   Responde o "como?" que toda indústria pergunta depois do diagnóstico. */
function IndustriaConexao() {
  const passos = [
    { n: '01', t: tx('Extração no ERP'), d: tx('Dados capturados direto na origem, sem intermediário e sem depender de exportação manual do parceiro.') },
    { n: '02', t: tx('Processamento'), d: tx('Regras de negócio, padronização, limpeza e enriquecimento: cadastro conciliado entre a sua linha e a do distribuidor.') },
    { n: '03', t: tx('Base tratada'), d: tx('Sell-out e estoque consistentes, item a item, com devolução abatida e estoque fiscal separado do gerencial.') },
    { n: '04', t: tx('Entrega'), d: tx('API e painel para a indústria, e painel para o distribuidor, lendo exatamente a mesma base.') },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('Conexão · integração ponto a ponto')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('O ganho só existe quando o dado é')} <span style={{ color: 'var(--navy)' }}>{tx('íntegro do início ao fim')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Nenhuma etapa depende de alguém lembrar de exportar uma planilha. A conexão é nossa, do ERP até o painel.')}</p>
        </div>

        <div className="cx-flow">
          {passos.map((p, i) => (
            <React.Fragment key={i}>
              <div className="cx-step reveal">
                <div className="cx-n">{p.n}</div>
                <div className="cx-t">{p.t}</div>
                <p className="cx-d">{p.d}</p>
              </div>
              {i < passos.length - 1 && <span className="cx-arrow" aria-hidden><Icon name="arrow" size={16} stroke={2.2}/></span>}
            </React.Fragment>
          ))}
        </div>

        <div className="cx-audit reveal">
          <div className="cx-audit-tag">{tx('Auditoria')}</div>
          <p>{tx('Cada venda é auditável pela captura do XML:')} <b>{tx('nota a nota, item a item')}</b>{tx('. Se a apuração for questionada, existe o documento fiscal por trás dela.')}</p>
        </div>
      </div>
      <style>{`
        .cx-flow { display: flex; align-items: stretch; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .cx-step { flex: 1; min-width: 200px; background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 22px; }
        .cx-n { font-family: var(--ff-mono); font-size: 11px; font-weight: 600; letter-spacing: .14em; color: var(--turquoise-ink); }
        .cx-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: var(--navy-900); margin: 10px 0 8px; }
        .cx-d { font-size: 13.5px; color: var(--text-2); line-height: 1.6; }
        .cx-arrow { align-self: center; color: var(--turquoise-ink); flex-shrink: 0; }
        .cx-audit { display: flex; gap: 20px; align-items: center; max-width: 900px; margin: 26px auto 0; padding: 20px 24px; background: #fff; border: 1px solid var(--line); border-left: 3px solid var(--turquoise-2); border-radius: var(--r-md); box-shadow: var(--shadow-xs); }
        .cx-audit-tag { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--turquoise-ink); flex-shrink: 0; }
        .cx-audit p { font-size: 15px; color: var(--text); line-height: 1.6; margin: 0; }
        @media (max-width: 860px) {
          .cx-flow { flex-direction: column; }
          .cx-arrow { transform: rotate(90deg); align-self: center; }
          .cx-audit { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>
    </section>
  );
}

/* Mercado potencial: base pública de CNPJs ativos cruzada com a carteira,
   para mostrar onde a marca simplesmente não está. */
/* A camada de comércio digital: por que a indústria perde o controle da
   experiência exatamente no momento da compra da revenda. */
/* O eixo: as três perguntas que sustentam qualquer decisão de canal,
   e os oito ganhos que aparecem quando elas passam a ter resposta. */
/* Método: por que projeto de canal falha. Cada dupla de eixos tem um
   modo de falha conhecido — o ponto ótimo é a interseção dos três. */
/* As duas ofertas que saíram desta página e ganharam página própria. Ficam como
   porta de saída, não como mais 300 linhas de argumento no meio do caminho. */
function IndustriaOutrasOfertas() {
  const cards = [
    { href: '/prospeccao', eyebrow: tx('Prospecção de Mercado'),
      t: tx('O mercado que a sua rede ainda não atende'),
      d: tx('A base pública de empresas ativas cruzada com a carteira da rede: onde a sua marca não chegou, com nome, CNPJ e endereço.') },
    { href: '/comercio-digital', eyebrow: tx('Comércio Digital B2B2C'),
      t: tx('A revenda comprando no seu padrão'),
      d: tx('Portfólio, preço e campanha definidos pela indústria; crédito, faturamento e entrega seguem no distribuidor.') },
  ];
  return (
    <section className="section-sm" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 20 }}>{tx('Também para a indústria')}</div>
        <div className="oo-grid">
          {cards.map(c => (
            <a key={c.href} href={c.href} className="oo-card card-hover">
              <div className="oo-eyebrow">{c.eyebrow}</div>
              <div className="oo-t">{c.t}</div>
              <p className="oo-d">{c.d}</p>
              <span className="oo-cta">{tr('cta.secondary')} <Icon name="arrow" size={15} stroke={2}/></span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .oo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .oo-card {
          display: flex; flex-direction: column; background: #fff; text-decoration: none;
          border: 1px solid var(--line); border-left: 3px solid var(--turquoise-2);
          border-radius: var(--r-lg); padding: 26px 28px; box-shadow: var(--shadow-sm);
        }
        .oo-eyebrow { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--turquoise-ink); }
        .oo-t { font-family: var(--ff-display); font-weight: 700; font-size: 21px; color: var(--navy-900); margin-top: 10px; line-height: 1.25; }
        .oo-d { font-size: 14.5px; color: var(--text-2); line-height: 1.6; margin: 8px 0 0; flex: 1; }
        .oo-cta { display: inline-flex; align-items: center; gap: 7px; margin-top: 20px; font-family: var(--ff-display); font-weight: 600; font-size: 15px; color: var(--navy-900); }
        .oo-card:hover .oo-cta { color: var(--turquoise-ink); }
        @media (max-width: 860px) { .oo-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function IndustriaPage() {
  useLocale();   // re-renderiza a pagina inteira quando o idioma muda
  useReveal();
  return (
    <>
      <SiteHeader translated/>
      <PageHero
        eyebrow={tx('Para a Indústria')}
        title={tx('Pare de descobrir a ruptura no fechamento do mês.')}
        lead={tx('Quanto cada distribuidor vendeu ontem? Onde está faltando? Quem parou de comprar? A SEWE responde isso todos os dias, direto do ERP da sua rede.')}
      >
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">{tr('cta.primary')} <Icon name="arrow" size={16} className="chev"/></a>
          <a href="#ecossistema" className="btn btn-outline btn-lg">{tr('cta.secondary')}</a>
        </div>
      </PageHero>
      <ProofBar/>
      <IndustriaDiagnostico/>
      <IndustriaEcosystem/>
      <IndustriaConexao/>
      <IntegrationSection/>
      <IndustriaNetworkPanel/>
      <SalesSection audience="industria"/>
      <IndustriaBI/>
      <IndustriaModular/>
      <IndustriaOutrasOfertas/>
      <ObjectionBlock/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── PLATAFORMA DE DADOS & IA ────────────────────────────── */

/* O problema real: 95% das iniciativas de IA travam antes de virar valor, e o
   gargalo não é modelo — é dado. Fonte: pesquisa Qlik sobre barreiras de adoção. */
function SolucoesBarreiras() {
  const barreiras = [
    { pct: '56%', t: tx('Qualidade, disponibilidade e acesso ao dado'), d: tx('O dado existe, mas está espalhado, sujo ou trancado em um sistema que ninguém consulta.') },
    { pct: '49%', t: tx('Integração com os sistemas existentes'), d: tx('ERP, CRM, planilha e legado que nunca conversaram entre si — e ninguém quer trocar tudo para começar.') },
    { pct: '47%', t: tx('Lacunas de governança, segurança e compliance'), d: tx('Sem trilha de acesso e sem controle por linha, o dado sensível vira risco antes de virar decisão.') },
  ];
  const armadilhas = [
    { icon: 'dollar', t: tx('Custo de processamento nas alturas'), d: tx('Cada pergunta do usuário vira uma query cobrada no data warehouse.') },
    { icon: 'lock',   t: tx('Opacidade financeira e lock-in'), d: tx('Você descobre o custo real depois da fatura, preso a um sistema inflexível.') },
    { icon: 'link',   t: tx('Complexidade de integração'), d: tx('Mais uma ferramenta para conectar, monitorar e manter de pé.') },
    { icon: 'boxes',  t: tx('Solução apenas parcial'), d: tx('Resolve um pedaço do problema e deixa o resto para você resolver.') },
  ];
  return (
    <section className="section sb-sec">
      <div className="container">
        <div className="sb-head reveal">
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>{tx('O problema real')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)', color: '#fff' }}>{tx('A tecnologia não é a')} <span style={{ color: 'var(--turquoise-2)' }}>{tx('maior barreira')}</span>.
          </h2>
          <p className="sb-lead">{tx('Iniciativa de dados não trava no modelo nem na ferramenta. Trava na base: dado que ninguém confia, sistema que não conversa, governança que não existe.')}</p>
        </div>

        <div className="sb-grid">
          {barreiras.map((b, i) => (
            <div key={i} className="sb-card reveal">
              <div className="sb-pct">{b.pct}</div>
              <div className="sb-bar"><span style={{ width: b.pct }}/></div>
              <div className="sb-t">{b.t}</div>
              <p className="sb-d">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="sb-src">{tx('Principais barreiras de adoção apontadas por empresas · pesquisa Qlik')}</div>

        <div className="sb-trap-head reveal">
          <span className="sb-trap-badge"><Icon name="alert" size={15} stroke={2}/></span>
          <div>
            <div className="sb-trap-t">{tx('E a “solução” costuma trazer o problema seguinte')}</div>
            <div className="sb-trap-d">{tx('O que mais vemos em empresa que já tentou resolver com ferramenta de prateleira.')}</div>
          </div>
        </div>
        <div className="sb-traps">
          {armadilhas.map((a, i) => (
            <div key={i} className="sb-trap reveal">
              <span className="sb-trap-i"><Icon name={a.icon} size={17} stroke={1.9}/></span>
              <div>
                <div className="sb-trap-ct">{a.t}</div>
                <div className="sb-trap-cd">{a.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .sb-sec { background: linear-gradient(155deg, #15243d 0%, #0d1a2e 60%, #0b1626 100%); position: relative; overflow: hidden; }
        .sb-sec::after { content: ''; position: absolute; top: -160px; right: -120px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(117,227,228,0.16), transparent 68%); pointer-events: none; }
        .sb-head { max-width: 760px; margin: 0 auto 40px; text-align: center; position: relative; z-index: 1; }
        .sb-lead { color: rgba(255,255,255,0.72); font-size: 17px; margin-top: 14px; line-height: 1.6; }
        .sb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; position: relative; z-index: 1; }
        .sb-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--r-lg); padding: 26px 24px; backdrop-filter: blur(4px); }
        .sb-pct { font-family: var(--ff-display); font-weight: 700; font-size: clamp(38px, 4.6vw, 52px); line-height: 1; color: var(--turquoise); }
        .sb-bar { height: 5px; border-radius: 99px; background: rgba(255,255,255,0.1); margin: 14px 0 16px; overflow: hidden; }
        .sb-bar span { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--turquoise-2), var(--turquoise)); }
        .sb-t { font-family: var(--ff-display); font-weight: 700; font-size: 17px; color: #fff; line-height: 1.3; }
        .sb-d { font-size: 13.5px; color: rgba(255,255,255,0.62); line-height: 1.6; margin-top: 9px; }
        .sb-src { font-family: var(--ff-mono); font-size: 10.5px; letter-spacing: .06em; color: rgba(255,255,255,0.38); text-align: center; margin-top: 16px; }
        .sb-trap-head { display: flex; align-items: center; gap: 14px; margin: 46px 0 18px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 1; }
        .sb-trap-badge { width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0; display: grid; place-items: center; background: rgba(240,180,41,0.16); color: #f0b429; }
        .sb-trap-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: #fff; }
        .sb-trap-d { font-size: 13.5px; color: rgba(255,255,255,0.55); margin-top: 3px; }
        .sb-traps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; position: relative; z-index: 1; }
        .sb-trap { display: flex; gap: 12px; padding: 18px; background: rgba(255,255,255,0.04); border: 1px dashed rgba(255,255,255,0.14); border-radius: var(--r-md); }
        .sb-trap-i { width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0; display: grid; place-items: center; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); }
        .sb-trap-ct { font-family: var(--ff-display); font-weight: 600; font-size: 14px; color: #fff; line-height: 1.35; }
        .sb-trap-cd { font-size: 12.5px; color: rgba(255,255,255,0.55); line-height: 1.5; margin-top: 5px; }
        @media (max-width: 900px) { .sb-grid { grid-template-columns: 1fr; } .sb-traps { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .sb-traps { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* As três camadas da plataforma. É o núcleo do argumento: confiança no dado,
   contexto no cálculo, adaptabilidade na ponta. Tabs para não virar parede de texto. */
function SolucoesCamadas() {
  const [active, setActive] = React.useState(1);
  const camadas = [
    {
      key: 'trust', badge: tx('CONFIANÇA'), c: '#2d436c', soft: 'rgba(45,67,108,0.09)',
      icon: 'shield', label: tx('Dado confiável'), tagline: 'Trusted Data Products',
      title: tx('Dado no tempo certo, correto e governado.'),
      body: tx('Antes de qualquer painel ou agente, o dado precisa ser confiável. Essa camada cuida da entrada: captura, movimenta, trata e certifica a origem, com a engenharia SEWE definindo as regras do seu negócio.'),
      bullets: [
        tx('Change Data Capture e replicação em tempo real, sem travar o sistema de origem'),
        tx('Datasets curados, prontos para uso, governados e ricos em contexto'),
        tx('Qlik Trust Score: validade e completude medidas e monitoradas continuamente'),
        tx('Catálogo e linhagem: cada número tem origem rastreável até a fonte'),
      ],
      metric: '93,4%', metricLabel: tx('Trust Score do dataset · validade e completude aferidas'),
    },
    {
      key: 'engine', badge: 'CONTEXTO', c: '#0e7a7c', soft: 'rgba(117,227,228,0.2)',
      icon: 'cpu', label: tx('Motor analítico'), tagline: 'Analytics Engine',
      title: tx('Inteligência guiada por IA, rica em contexto.'),
      body: tx('É o coração da Qlik e o que nenhuma ferramenta SQL entrega: um motor associativo in-memory que guarda todas as relações do seu dado e responde qualquer pergunta na hora, inclusive a pergunta que você ainda não fez.'),
      bullets: [
        tx('Revela padrões, associações e pontos cegos que as outras ferramentas escondem'),
        tx('Mostra o que É e o que NÃO É: o dado excluído é tão revelador quanto o selecionado'),
        tx('Cálculo de alta velocidade, preciso e eficiente em custo, mesmo em volume massivo'),
        tx('Reconhecido como diferencial da Qlik por Gartner e IDC'),
      ],
      metric: '< 2,2s', metricLabel: tx('para devolver qualquer mudança de contexto ou filtro'),
    },
    {
      key: 'agentic', badge: 'ADAPTABILIDADE', c: '#00a335', soft: 'rgba(0,163,53,0.09)',
      icon: 'brain', label: tx('Experiência agêntica'), tagline: 'Agentic Experience',
      title: tx('Seus dados, agentes e plataformas falando a mesma língua.'),
      body: tx('A tecnologia muda mais rápido do que o ciclo de um projeto. Essa camada existe para você acompanhar sem trocar de plataforma: o dado governado fica disponível para o assistente, o agente e o sistema que vierem depois.'),
      bullets: [
        tx('Qualquer dado, em qualquer lugar: nuvem híbrida e ambientes multiplataforma'),
        tx('Conexão com os seus agentes por padrões de interoperabilidade como MCP'),
        tx('Agentes que consultam o dado, geram o insight e executam a ação'),
        tx('IA preditiva e detecção de anomalias avisando antes de o problema aparecer'),
      ],
      metric: 'MCP', metricLabel: tx('servidor nativo para conectar agentes ao seu dado governado'),
    },
  ];
  const S = camadas[active];
  return (
    <section className="section" style={{ background: 'var(--band)', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 36px' }}>
          <div className="eyebrow">{tx('Como a plataforma resolve')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Três camadas que')} <span style={{ color: 'var(--navy)' }}>{tx('trabalham juntas')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Confiança no dado que entra, contexto no cálculo, adaptabilidade na ponta. Tirar uma delas é onde a maioria dos projetos de dados para.')}</p>
        </div>

        <div className="sc-tabs">
          {camadas.map((c, i) => (
            <button key={c.key} type="button" onClick={() => setActive(i)}
              className={'sc-tab' + (active === i ? ' is-on' : '')} style={{ '--c': c.c, '--cs': c.soft }}>
              <span className="sc-tab-i"><Icon name={c.icon} size={17} stroke={1.9}/></span>
              <span>
                <span className="sc-tab-badge">{c.badge}</span>
                <span className="sc-tab-l">{c.label}</span>
                <span className="sc-tab-tag">{c.tagline}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="sc-body" style={{ '--c': S.c, '--cs': S.soft }}>
          <div>
            <h3 className="sc-title">{S.title}</h3>
            <p className="sc-lead">{S.body}</p>
            <ul className="sc-list">
              {S.bullets.map((b, i) => (
                <li key={i}>
                  <span className="sc-check"><Icon name="check" size={12} stroke={2.6}/></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <aside className="sc-aside">
            <div className="sc-aside-badge">{S.badge}</div>
            <div className="sc-aside-metric">{S.metric}</div>
            <div className="sc-aside-l">{S.metricLabel}</div>
            <div className="sc-aside-foot">
              <SMark size={16} color="var(--turquoise-2)"/>{tx('A camada é da Qlik. A modelagem que faz ela responder ao seu negócio é da SEWE.')}</div>
          </aside>
        </div>
      </div>
      <style>{`
        .sc-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
        .sc-tab { display: flex; align-items: center; gap: 13px; text-align: left; padding: 16px 18px; cursor: pointer; background: #fff; border: 1px solid var(--line); border-radius: var(--r-md); transition: all .18s ease; }
        .sc-tab:hover { border-color: var(--c); }
        .sc-tab.is-on { border-color: var(--c); box-shadow: 0 0 0 1px var(--c), var(--shadow-sm); }
        .sc-tab-i { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; display: grid; place-items: center; background: var(--cs); color: var(--c); }
        .sc-tab.is-on .sc-tab-i { background: var(--c); color: #fff; }
        .sc-tab-badge { display: block; font-family: var(--ff-mono); font-size: 9.5px; font-weight: 700; letter-spacing: .12em; color: var(--c); }
        .sc-tab-l { display: block; font-family: var(--ff-display); font-weight: 700; font-size: 16px; color: var(--navy-900); margin-top: 3px; }
        .sc-tab-tag { display: block; font-size: 11.5px; color: var(--text-3); margin-top: 2px; }
        .sc-body { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; align-items: stretch; background: #fff; border: 1px solid var(--line); border-top: 3px solid var(--c); border-radius: var(--r-lg); padding: 30px; box-shadow: var(--shadow-sm); }
        .sc-title { font-size: clamp(21px, 2.3vw, 28px); line-height: 1.2; color: var(--navy-900); }
        .sc-lead { font-size: 15.5px; color: var(--text-2); line-height: 1.65; margin-top: 12px; }
        .sc-list { list-style: none; padding: 0; margin: 22px 0 0; display: grid; gap: 11px; }
        .sc-list li { display: flex; gap: 11px; align-items: flex-start; font-size: 14.5px; color: var(--text); line-height: 1.5; }
        .sc-check { margin-top: 2px; width: 19px; height: 19px; border-radius: 6px; flex-shrink: 0; display: grid; place-items: center; background: var(--cs); color: var(--c); }
        .sc-aside { background: linear-gradient(160deg, #15243d, #0d1a2e); border-radius: var(--r-lg); padding: 26px; display: flex; flex-direction: column; }
        .sc-aside-badge { align-self: flex-start; font-family: var(--ff-mono); font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--turquoise); background: rgba(117,227,228,0.12); border: 1px solid rgba(117,227,228,0.24); border-radius: 999px; padding: 4px 11px; }
        .sc-aside-metric { font-family: var(--ff-display); font-weight: 700; font-size: clamp(34px, 4vw, 46px); color: #fff; line-height: 1; margin-top: 22px; }
        .sc-aside-l { font-size: 13px; color: rgba(255,255,255,0.62); line-height: 1.55; margin-top: 10px; flex: 1; }
        .sc-aside-foot { display: flex; gap: 10px; align-items: flex-start; font-size: 12.5px; color: rgba(255,255,255,0.72); line-height: 1.5; margin-top: 22px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
        @media (max-width: 900px) { .sc-tabs { grid-template-columns: 1fr; } .sc-body { grid-template-columns: 1fr; padding: 24px; } }
      `}</style>
    </section>
  );
}

/* O portfólio completo, em matriz. Responde à pergunta "o que exatamente
   vem junto?" sem obrigar o visitante a abrir o site da Qlik. */
function SolucoesPortfolio() {
  const linhas = [
    {
      camada: tx('Experiência agêntica'), eixo: 'IA', c: '#00a335', soft: 'rgba(0,163,53,0.09)', icon: 'brain',
      itens: [
        { t: tx('Assistente de IA agêntica'), d: tx('Pergunte em linguagem natural e receba a resposta com o dado por trás.') },
        { t: tx('Agentes de IA'), d: tx('Agentes que consultam, cruzam e executam ação no seu fluxo.') },
        { t: tx('IA preditiva'), d: tx('Previsão de demanda, churn e giro no mesmo modelo de dado.') },
        { t: tx('Detecção de anomalias'), d: tx('O desvio te procura, você não precisa caçar gráfico.') },
        { t: tx('Automação de fluxos'), d: tx('Do alerta à ação no ERP, sem passo manual no meio.') },
      ],
    },
    {
      camada: tx('Motor analítico'), eixo: 'Analytics', c: '#0e7a7c', soft: 'rgba(117,227,228,0.2)', icon: 'chart',
      itens: [
        { t: tx('Analytics agêntico'), d: tx('A análise conduzida por IA, com você no controle da pergunta.') },
        { t: tx('Visualizações e dashboards'), d: tx('Painéis prescritivos construídos do zero para o seu negócio.') },
        { t: tx('Relatórios gerenciados'), d: tx('Relatório assinado, no formato e no horário que você definir.') },
        { t: tx('Analytics embarcado'), d: tx('Painel dentro do seu portal ou sistema próprio, via API.') },
        { t: tx('Alertas e colaboração'), d: tx('Alerta por condição do indicador, direto no celular ou e-mail.') },
      ],
    },
    {
      camada: tx('Dado confiável'), eixo: 'Dados', c: '#2d436c', soft: 'rgba(45,67,108,0.09)', icon: 'boxes',
      itens: [
        { t: tx('Change Data Capture'), d: tx('Só o que mudou, sem varrer a base inteira a cada carga.') },
        { t: tx('Movimentação em tempo real'), d: tx('Dado da origem ao destino em streaming contínuo.') },
        { t: tx('Transformação de dados'), d: tx('ETL e regras de negócio modeladas pela engenharia SEWE.') },
        { t: tx('Qualidade de dados'), d: tx('Validade e completude medidas antes de virar decisão.') },
        { t: tx('Catálogo e linhagem'), d: tx('De onde veio cada número, quem usa e o que quebra se mudar.') },
      ],
    },
  ];
  const stack = ['AWS', 'Azure', 'Google Cloud', 'Databricks', 'Snowflake', 'SAP', 'Apache Iceberg', 'OpenAI', 'Anthropic'];
  return (
    <section className="section" style={{ background: '#fff', paddingBottom: 'clamp(20px, 2.6vw, 36px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('O portfólio completo')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Quinze entregas,')} <span style={{ color: 'var(--navy)' }}>{tx('uma só plataforma')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Do dado bruto no ERP ao agente que executa a ação. Você contrata o recorte que precisa hoje e cresce dentro da mesma plataforma, sem migração no meio do caminho.')}</p>
        </div>

        <div className="pf">
          {linhas.map((l, i) => (
            <div key={i} className="pf-row reveal" style={{ '--c': l.c, '--cs': l.soft }}>
              <div className="pf-rail">
                <span className="pf-rail-i"><Icon name={l.icon} size={19} stroke={1.9}/></span>
                <div className="pf-rail-eixo">{l.eixo}</div>
                <div className="pf-rail-camada">{l.camada}</div>
              </div>
              <div className="pf-items">
                {l.itens.map((it, j) => (
                  <div key={j} className="pf-item">
                    <div className="pf-item-t">{it.t}</div>
                    <div className="pf-item-d">{it.d}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="pf-gov">
            <Icon name="shield" size={15} stroke={2}/>{tx('Governança, segurança e conformidade atravessando as três camadas · LGPD, SSO e segurança em nível de linha')}</div>
        </div>

        <div className="pf-stack">
          <div className="pf-stack-l">{tx('Roda sobre o que você já tem')}</div>
          <div className="pf-stack-chips">
            {stack.map(s => <span key={s} className="pf-chip">{s}</span>)}
          </div>
          <div className="pf-stack-n">{tx('Nuvem híbrida e on-premise também disponíveis. Não trocamos o seu ecossistema — conectamos.')}</div>
        </div>
      </div>
      <style>{`
        .pf { border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
        .pf-row { display: grid; grid-template-columns: 190px 1fr; border-bottom: 1px solid var(--line); }
        .pf-rail { padding: 22px 20px; background: var(--cs); border-right: 1px solid var(--line); }
        .pf-rail-i { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; background: var(--c); color: #fff; margin-bottom: 12px; }
        .pf-rail-eixo { font-family: var(--ff-display); font-weight: 700; font-size: 19px; color: var(--navy-900); }
        .pf-rail-camada { font-family: var(--ff-mono); font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--c); margin-top: 5px; }
        .pf-items { display: grid; grid-template-columns: repeat(5, 1fr); }
        .pf-item { padding: 20px 18px; border-right: 1px solid var(--line-2); transition: background .18s ease; }
        .pf-item:last-child { border-right: none; }
        .pf-item:hover { background: var(--cs); }
        .pf-item-t { font-family: var(--ff-display); font-weight: 700; font-size: 14px; color: var(--navy-900); line-height: 1.3; }
        .pf-item-d { font-size: 12.5px; color: var(--text-2); line-height: 1.5; margin-top: 7px; }
        .pf-gov { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 20px; background: var(--bg-soft); font-size: 12.5px; color: var(--text-2); text-align: center; }
        .pf-gov svg { color: var(--turquoise-ink); flex-shrink: 0; }
        .pf-stack { margin-top: 28px; text-align: center; }
        .pf-stack-l { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--text-3); }
        .pf-stack-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 14px; }
        .pf-chip { padding: 7px 15px; border: 1px solid var(--line); border-radius: 999px; background: var(--bg-soft); font-size: 13px; color: var(--text-2); font-weight: 500; }
        .pf-stack-n { font-size: 13px; color: var(--text-3); margin-top: 14px; }
        @media (max-width: 1040px) { .pf-items { grid-template-columns: repeat(3, 1fr); } .pf-item { border-bottom: 1px solid var(--line-2); } }
        @media (max-width: 780px) { .pf-row { grid-template-columns: 1fr; } .pf-rail { border-right: none; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 12px; padding: 14px 18px; } .pf-rail-i { margin-bottom: 0; } .pf-rail-camada { margin-top: 0; } .pf-items { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .pf-items { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* A objeção mais comum de quem já tem data warehouse: "não dá para só cachear
   a query?". Aqui é onde o motor associativo vira argumento de custo. */
function SolucoesCusto() {
  const linhas = [
    { q: tx('Devolve um resultado limitado'), qd: tx('A query cacheada guarda a resposta de uma única pergunta já definida.'),
      e: tx('Guarda o conjunto de dados inteiro'), ed: tx('O motor carrega e comprime toda a base com indexação binária.') },
    { q: tx('Só aceita filtro simples'), qd: tx('Cálculo novo, pergunta inesperada ou dado alterado exige rodar a query de novo.'),
      e: tx('Descoberta ilimitada'), ed: tx('Qualquer pergunta, por mais complexa, é resolvida em memória na hora.') },
    { q: tx('Perde contexto e relações'), qd: tx('O que não se encaixa no filtro simplesmente some da tela.'),
      e: tx('Consciente de contexto'), ed: tx('Por inferência lógica, o dado associado e o não associado continuam visíveis.') },
  ];
  return (
    <section className="section" style={{ background: 'var(--band)', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('Custo de operação')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Cada clique do seu time')} <span style={{ color: 'var(--navy)' }}>{tx('não precisa virar fatura')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Em analytics baseado em SQL, toda interação do usuário dispara uma query cobrada no data warehouse. Com motor associativo, a interação acontece em memória e não custa nada.')}</p>
        </div>

        <div className="cu-duel">
          <div className="cu-side reveal">
            <div className="cu-side-h">{tx('Analytics baseado em SQL')}</div>
            <div className="cu-price">$$$</div>
            <div className="cu-flow">
              {[tx('Usuário clica'), tx('Query dispara'), tx('Warehouse processa'), tx('Fatura sobe')].map((s, i) => (
                <div key={i} className="cu-flow-s">{s}</div>
              ))}
            </div>
            <ul className="cu-ul">
              <li>{tx('Uma query para cada pergunta')}</li>
              <li>{tx('Custo imprevisível no fim do mês')}</li>
              <li>{tx('Tempo de resposta que oscila com a concorrência de usuários')}</li>
            </ul>
          </div>
          <div className="cu-vs" aria-hidden><Icon name="arrow" size={18} stroke={2.2}/></div>
          <div className="cu-side cu-side-on reveal">
            <div className="cu-side-h" style={{ color: 'var(--turquoise-2)' }}>{tx('Analytics guiado por motor')}</div>
            <div className="cu-price cu-price-on">livre</div>
            <div className="cu-flow">
              {[tx('Usuário clica'), tx('Motor responde em memória'), tx('Warehouse em repouso'), tx('Custo estável')].map((s, i) => (
                <div key={i} className="cu-flow-s cu-flow-on">{s}</div>
              ))}
            </div>
            <ul className="cu-ul cu-ul-on">
              <li>{tx('Carga agendada, não uma query por clique')}</li>
              <li>{tx('Cache binário comprimido da base inteira')}</li>
              <li>{tx('Resposta previsível mesmo com o time todo dentro')}</li>
            </ul>
          </div>
        </div>

        <div className="cu-q reveal">
          <div className="cu-q-h">
            <span className="cu-q-mark">?</span>
            <div>
              <div className="cu-q-t">{tx('“Mas eu não posso só cachear a query?”')}</div>
              <div className="cu-q-d">{tx('Pode — se você quiser fazer sempre a mesma pergunta.')}</div>
            </div>
          </div>
          <div className="cu-tbl">
            <div className="cu-tr cu-th"><span>{tx('Query SQL cacheada')}</span><span/><span>{tx('Motor associativo Qlik')}</span></div>
            {linhas.map((l, i) => (
              <div key={i} className="cu-tr">
                <span className="cu-cell cu-cell-x" data-lbl={tx('Query SQL cacheada')}>
                  <span className="cu-tag cu-tag-x">✕</span>
                  <span><b>{l.q}</b><em>{l.qd}</em></span>
                </span>
                <span className="cu-mid" aria-hidden/>
                <span className="cu-cell" data-lbl={tx('Motor associativo Qlik')}>
                  <span className="cu-tag cu-tag-o"><Icon name="check" size={11} stroke={3}/></span>
                  <span><b>{l.e}</b><em>{l.ed}</em></span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .cu-duel { display: grid; grid-template-columns: 1fr 56px 1fr; gap: 8px; align-items: stretch; max-width: 900px; margin: 0 auto; }
        .cu-side { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 24px; box-shadow: var(--shadow-xs); display: flex; flex-direction: column; }
        .cu-side-on { background: var(--navy-900); border-color: var(--navy-900); }
        .cu-side-h { font-family: var(--ff-mono); font-size: 11px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--text-3); text-align: center; }
        .cu-price { font-family: var(--ff-display); font-weight: 700; font-size: 40px; line-height: 1; text-align: center; color: var(--danger); margin: 14px 0 18px; }
        .cu-price-on { color: var(--turquoise); font-size: 32px; margin-top: 20px; }
        .cu-flow { display: flex; flex-direction: column; gap: 6px; }
        .cu-flow-s { position: relative; padding: 9px 12px; border-radius: 8px; background: var(--bg-soft); border: 1px solid var(--line); font-size: 12.5px; color: var(--text-2); text-align: center; }
        .cu-flow-s + .cu-flow-s::before { content: '↓'; position: absolute; top: -13px; left: 50%; transform: translateX(-50%); font-size: 10px; color: var(--text-3); }
        .cu-flow-on { background: rgba(117,227,228,0.1); border-color: rgba(117,227,228,0.22); color: rgba(255,255,255,0.86); }
        .cu-flow-on + .cu-flow-on::before { color: rgba(255,255,255,0.4); }
        .cu-ul { list-style: none; padding: 16px 0 0; margin: 16px 0 0; border-top: 1px dashed var(--line); display: grid; gap: 8px; font-size: 13px; color: var(--text-2); }
        .cu-ul li::before { content: '·'; margin-right: 7px; color: var(--text-3); }
        .cu-ul-on { border-top-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.75); }
        .cu-vs { display: grid; place-items: center; color: var(--text-3); }
        .cu-q { max-width: 900px; margin: 30px auto 0; background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 26px; box-shadow: var(--shadow-xs); }
        .cu-q-h { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .cu-q-mark { width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0; display: grid; place-items: center; background: rgba(117,227,228,0.18); color: var(--turquoise-ink); font-family: var(--ff-display); font-weight: 700; font-size: 20px; }
        .cu-q-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: var(--navy-900); }
        .cu-q-d { font-size: 13.5px; color: var(--text-2); margin-top: 3px; }
        .cu-tbl { border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; }
        .cu-tr { display: grid; grid-template-columns: 1fr 34px 1fr; align-items: stretch; border-bottom: 1px solid var(--line-2); }
        .cu-tr:last-child { border-bottom: none; }
        .cu-th { background: var(--bg-soft); font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--text-3); }
        .cu-th span { padding: 10px 16px; }
        .cu-cell { display: flex; gap: 11px; align-items: flex-start; padding: 15px 16px; }
        .cu-cell b { display: block; font-family: var(--ff-display); font-weight: 700; font-size: 14px; color: var(--navy-900); }
        .cu-cell em { display: block; font-style: normal; font-size: 12.5px; color: var(--text-2); line-height: 1.5; margin-top: 4px; }
        .cu-cell-x { background: var(--bg-soft); }
        .cu-cell-x b { color: var(--text-2); }
        .cu-tag { width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0; display: grid; place-items: center; margin-top: 2px; font-size: 11px; font-weight: 700; }
        .cu-tag-x { background: rgba(197,48,48,0.1); color: var(--danger); }
        .cu-tag-o { background: rgba(117,227,228,0.2); color: var(--turquoise-ink); }
        .cu-mid { background: var(--bg-soft); border-left: 1px solid var(--line-2); border-right: 1px solid var(--line-2); }
        @media (max-width: 820px) {
          .cu-duel { grid-template-columns: 1fr; }
          .cu-vs { padding: 6px 0; transform: rotate(90deg); }
          .cu-tr { grid-template-columns: 1fr; }
          .cu-mid, .cu-th { display: none; }
          /* sem cabeçalho na coluna única, cada célula carrega o próprio rótulo */
          .cu-cell { position: relative; padding-top: 34px; border-top: 1px solid var(--line-2); }
          .cu-cell::before { content: attr(data-lbl); position: absolute; top: 11px; left: 16px; font-family: var(--ff-mono); font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--text-3); }
          .cu-tr:first-of-type .cu-cell-x { border-top: none; }
        }
      `}</style>
    </section>
  );
}

/* Prova externa: benchmark independente BARC 2025. Números publicados pela Qlik,
   com a fonte visível — é comparativo direto com concorrente. */
function SolucoesBenchmark() {
  const scores = [
    { l: 'Produtividade', d: tx('quão rápido a sessão de análise se completa, considerando interações e tempo de resposta'), qlik: 100, rival: 31 },
    { l: 'Escalabilidade', d: tx('quão rápido as sessões se completam à medida que usuários e volume de dados crescem'), qlik: 100, rival: 48 },
  ];
  const kpis = [
    { v: '3x', l: tx('mais rápido no tempo de resposta') },
    { v: '30%', l: tx('menos interações do usuário para chegar à mesma resposta') },
    { v: '2x', l: tx('mais sessões concluídas em escala') },
    { v: '0%', l: tx('de degradação mensurável de performance sob carga') },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('Prova independente')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Não é só a nossa palavra:')} <span style={{ color: 'var(--navy)' }}>{tx('tem benchmark')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Em 2025 o instituto BARC conduziu um estudo independente comparando Qlik e Power BI em condições reais de uso, medindo produtividade e escalabilidade.')}</p>
        </div>

        <div className="bm-scores">
          {scores.map((s, i) => (
            <div key={i} className="bm-score reveal">
              <div className="bm-score-l">{s.l}</div>
              <div className="bm-score-d">{s.d}</div>
              <div className="bm-bars">
                <div className="bm-bar-row">
                  <span className="bm-bar-n">Qlik</span>
                  <span className="bm-bar"><span className="bm-fill bm-fill-on" style={{ width: s.qlik + '%' }}/></span>
                  <span className="bm-bar-v tnum">{s.qlik}*</span>
                </div>
                <div className="bm-bar-row">
                  <span className="bm-bar-n bm-bar-n-off">Power BI</span>
                  <span className="bm-bar"><span className="bm-fill" style={{ width: s.rival + '%' }}/></span>
                  <span className="bm-bar-v bm-bar-v-off tnum">{s.rival}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bm-kpis">
          {kpis.map((k, i) => (
            <div key={i} className="bm-kpi reveal">
              <div className="bm-kpi-v">{k.v}</div>
              <div className="bm-kpi-l">{k.l}</div>
            </div>
          ))}
        </div>

        <div className="bm-note reveal">
          <p>{tx('O estudo apontou performance consistente e previsível do Qlik em todos os níveis de concorrência testados, enquanto o Power BI apresentou tempos de resposta notavelmente inconsistentes sob carga alta de usuários.')}</p>
          <p style={{ marginTop: 10 }}>{tx('Com IA agêntica em cena, performance deixou de ser detalhe: um único agente pode gerar centenas de consultas e levar a arquitetura ao limite. É por isso que a camada de motor importa tanto quanto a camada de painel.')}</p>
          <div className="bm-src">{tx('* 100 é o valor de referência estabelecido para o teste, não uma nota máxima.')}<br/>{tx('Fonte: BARC Performance Benchmark 2025 (estudo independente), divulgado pela Qlik.')}</div>
        </div>
      </div>
      <style>{`
        .bm-scores { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .bm-score { background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 26px; }
        .bm-score-l { font-family: var(--ff-display); font-weight: 700; font-size: 20px; color: var(--navy-900); }
        .bm-score-d { font-size: 13px; color: var(--text-2); line-height: 1.5; margin-top: 6px; }
        .bm-bars { display: grid; gap: 12px; margin-top: 20px; }
        .bm-bar-row { display: grid; grid-template-columns: 76px 1fr 46px; align-items: center; gap: 12px; }
        .bm-bar-n { font-family: var(--ff-display); font-weight: 700; font-size: 13.5px; color: var(--navy-900); }
        .bm-bar-n-off { color: var(--text-3); font-weight: 500; }
        .bm-bar { height: 12px; border-radius: 99px; background: #e4e7ec; overflow: hidden; }
        .bm-fill { display: block; height: 100%; border-radius: 99px; background: #b9c0cc; }
        .bm-fill-on { background: linear-gradient(90deg, var(--turquoise-2), var(--turquoise)); }
        .bm-bar-v { font-family: var(--ff-display); font-weight: 700; font-size: 17px; color: var(--turquoise-ink); text-align: right; }
        .bm-bar-v-off { color: var(--text-3); }
        .bm-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 18px; }
        .bm-kpi { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 22px; box-shadow: var(--shadow-xs); }
        .bm-kpi-v { font-family: var(--ff-display); font-weight: 700; font-size: 34px; line-height: 1; color: var(--navy-900); }
        .bm-kpi-l { font-size: 13px; color: var(--text-2); line-height: 1.5; margin-top: 10px; }
        .bm-note { max-width: 860px; margin: 30px auto 0; font-size: 14.5px; color: var(--text-2); line-height: 1.65; }
        .bm-src { font-family: var(--ff-mono); font-size: 10.5px; line-height: 1.7; color: var(--text-3); margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); }
        @media (max-width: 900px) { .bm-scores { grid-template-columns: 1fr; } .bm-kpis { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .bm-kpis { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* TCO: uma plataforma única vs colcha de retalhos */
function SolucoesPlatform() {
  const patch = [
    { t: tx('Licenças por usuário'), rot: -1.5 },
    { t: tx('Serviço de ETL à parte'), rot: 1 },
    { t: tx('Data warehouse dedicado'), rot: -0.8 },
    { t: tx('Nós de capacidade extra'), rot: 1.4 },
    { t: tx('Gateway e servidor local'), rot: -1.2 },
  ];
  const uni = [
    { icon: 'link', t: tx('Integração e ETL') },
    { icon: 'boxes', t: tx('Armazenamento .qvd comprimido') },
    { icon: 'chart', t: tx('Analytics + IA') },
    { icon: 'alert', t: tx('Alertas, mobile e e-mail') },
  ];
  // Segunda metade do argumento de custo: entra colada em "Custo de operacao",
  // sem cabecalho proprio — as duas secoes faziam a mesma pergunta duas vezes.
  return (
    <section className="section" style={{ background: 'var(--band)', paddingTop: 'clamp(8px, 1.2vw, 18px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 26px' }}>
          <div className="eyebrow">{tx('TCO · Custo total de propriedade')}</div>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 10 }}>{tx('E ferramenta genérica parece barata por usuário, até a conta dos serviços extras chegar.')}</p>
        </div>
        <div className="tco-duel">
          <div className="tco-side reveal">
            <div className="tco-side-h">{tx('BI genérico')}</div>
            <div className="tco-patch">
              {patch.map((p, i) => (
                <div key={i} className="tco-patch-box" style={{ transform: `rotate(${p.rot}deg)` }}>
                  {p.t} <span className="tco-fee">+ $</span>
                </div>
              ))}
            </div>
            <div className="tco-side-f">{tx('até 5 serviços cobrados à parte para aguentar volume real')}</div>
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
            <div className="tco-side-f" style={{ color: 'rgba(255,255,255,0.65)' }}>{tx('tudo nativo, em uma única ponta')}</div>
          </div>
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
  // Os dados ficam CRUS (em português): são a chave de associação. A tradução
  // acontece só na hora de exibir, com tx(). Traduzir a chave quebra o lookup.
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
          <div className="ad-t">{tx('Clique em um cliente e veja o motor associativo reagir.')}</div>
          <div className="ad-d">{tx('O cinza é o segredo: ele mostra o que')} <b>{tx('não')}</b> {tx('aconteceu — as linhas que esse cliente nunca comprou. É aí que mora a próxima venda.')}</div>
        </div>
        <div className="ad-legend">
          <span><i className="ad-dot ad-g"></i> {tx('selecionado')}</span>
          <span><i className="ad-dot ad-w"></i> {tx('associado')}</span>
          <span><i className="ad-dot ad-x"></i> {tx('excluído')}</span>
        </div>
      </div>
      <div className="ad-row">
        <span className="ad-lbl">{tx('Clientes')}</span>
        <div className="ad-chips">
          {clients.map(c => (
            <button key={c} type="button" className={`ad-chip ${sel === c ? 'ad-sel' : ''}`} onClick={() => setSel(c)}>{tx(c)}</button>
          ))}
        </div>
      </div>
      <div className="ad-row">
        <span className="ad-lbl">{tx('Segmentos')}</span>
        <div className="ad-chips">
          {segments.map(s => {
            const on = inSegs[sel].includes(s);
            return (
              <span key={s} className={`ad-chip ad-ro ${on ? 'ad-assoc' : 'ad-excl'}`}>
                {tx(s)}{!on && <em>{tx('oportunidade')}</em>}
              </span>
            );
          })}
        </div>
      </div>
      <div className="ad-row">
        <span className="ad-lbl">{tx('Linhas de produto')}</span>
        <div className="ad-chips">
          {products.map(p => {
            const on = bought[sel].includes(p);
            return (
              <span key={p} className={`ad-chip ad-ro ${on ? 'ad-assoc' : 'ad-excl'}`}>
                {tx(p)}{!on && <em>{tx('oportunidade')}</em>}
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
    { icon: 'brain', t: tx('Motor associativo in-memory'), d: tx('Sem modelo rígido de entidade-relacionamento: o Qlik indexa todas as relações e você explora em qualquer direção. Inclusive o que NÃO aconteceu: o motor destaca os dados excluídos que as ferramentas SQL escondem.') },
    { icon: 'shield', t: tx('Segurança em nível de linha'), d: tx('Section Access nativo: cada usuário enxerga só a filial, a carteira ou o recorte que pode ver. SSO, criptografia e trilha de auditoria.') },
    { icon: 'cpu', t: tx('Embedded analytics e APIs'), d: tx('Dashboards embutidos em portais e sistemas próprios, com APIs REST para automação e integração ao restante do seu ecossistema.') },
    { icon: 'trending', t: tx('IA nativa + camada SEWE'), d: tx('Inteligência preditiva ativa: anomalias detectadas automaticamente e avisadas no e-mail ou no celular, sem prompts e sem contratar cientista de dados. Previsão de demanda e churn no mesmo modelo.') },
  ];
  const flow = [
    { t: tx('ERP e fontes'), d: tx('Qualquer origem de dados') },
    { t: tx('Engenharia SEWE'), d: tx('ETL, modelagem, governança') },
    { t: 'Qlik Cloud', d: tx('Analytics em região brasileira') },
    { t: tx('Decisão'), d: tx('Web, mobile, e-mail e alertas') },
  ];
  return (
    <section className="section" style={{ background: '#fff', paddingTop: 'clamp(24px, 3vw, 40px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 44px' }}>
          <div className="eyebrow">{tx('Por dentro da tecnologia')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Robustez de plataforma,')} <span style={{ color: 'var(--navy)' }}>{tx('sem caixa-preta')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Por baixo dos dashboards existe uma arquitetura de dados séria. É ela que sustenta decisão confiável em escala.')}</p>
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
    { n: '01', t: tx('Diagnóstico'), d: tx('Entendemos o desafio, as fontes de dados e o resultado esperado. Sem compromisso.') },
    { n: '02', t: tx('Arquitetura sem limites'), d: tx('Nossa engenharia desenvolve regras de negócio customizadas, painéis complexos e integrações exclusivas. Se a sua empresa precisa, nós modelamos.') },
    { n: '03', t: tx('Go-live'), d: tx('Dashboards e IA no ar, com a sua equipe treinada e usando no dia a dia.') },
    { n: '04', t: tx('Squad dedicado ao crescimento'), d: tx('Seu negócio muda, seus gráficos também. O time SEWE continua criando novas visões, relatórios e ferramentas conforme a operação evolui.') },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 44px' }}>
          <div className="eyebrow">{tx('Como trabalhamos')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Do desafio ao resultado, em quatro passos.')}</h2>
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

/* A camada SEWE: separa o que é plataforma (Qlik, igual para todo mundo) do que
   é engenharia da SEWE (o que muda o resultado). Sem esta seção a página vende
   Qlik e o leitor conclui que pode comprar direto. */
function SolucoesCamadaSewe() {
  const provas = [
    { icon: 'brain', t: tx('Regra de negócio modelada, não configurada'),
      d: tx('Margem líquida por SKU descontando rebate, frete, verba, imposto e devolução. Isso não vem pronto em ferramenta nenhuma: é modelagem, escrita junto com a sua controladoria.') },
    { icon: 'link', t: tx('O ERP que ninguém quis conectar'),
      d: tx('Lemos direto na origem, nota a nota, inclusive em ERP legado e banco fechado. A sua TI não precisa abrir caminho para o projeto começar.') },
    { icon: 'target', t: tx('O indicador que só existe porque alguém entendeu a operação'),
      d: tx('Positivação por rota, ruptura de Curva A por filial, cobertura ociosa por praça. Nenhum deles vem de fábrica em um BI genérico.') },
  ];
  return (
    <section className="section" style={{ background: 'var(--band)', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ maxWidth: 780, marginBottom: 40 }}>
          <div className="eyebrow">{tx('A camada SEWE')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(26px,3.4vw,40px)' }}>
            {tx('A Qlik é a melhor plataforma do mercado.')} <span style={{ color: 'var(--navy)' }}>{tx('E fica melhor ainda modelada por quem conhece a sua operação.')}</span>
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            {tx('A base é excelente: líder do Gartner há 16 anos, com um motor associativo que nenhuma ferramenta SQL alcança. O que vira resultado é a engenharia por cima dela.')}
          </p>
        </div>
        <div className="cs-grid">
          {provas.map((p, i) => (
            <div key={i} className="cs-card reveal">
              <span className="cs-icon"><Icon name={p.icon} size={22} stroke={1.7}/></span>
              <div className="cs-t">{p.t}</div>
              <p className="cs-d">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="cs-foot reveal">
          <Icon name="check" size={14} stroke={3}/>
          <span>{tx('Squad dedicado: o modelo evolui junto com a operação, sem abrir projeto novo.')}</span>
        </div>
      </div>
      <style>{`
        .cs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .cs-card {
          background: #fff; border: 1px solid var(--line); border-top: 3px solid var(--navy-900);
          border-radius: var(--r-lg); padding: 26px; box-shadow: var(--shadow-sm);
          display: flex; flex-direction: column;
        }
        .cs-icon {
          width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center;
          background: rgba(117,227,228,0.16); color: var(--turquoise-ink); margin-bottom: 16px;
        }
        .cs-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: var(--navy-900); margin-bottom: 8px; line-height: 1.25; }
        .cs-d { font-size: 14.5px; color: var(--text-2); line-height: 1.6; margin: 0; }
        .cs-foot {
          display: inline-flex; align-items: center; gap: 10px; margin-top: 22px;
          padding: 12px 18px; border-radius: 999px; background: #fff;
          border: 1px solid var(--line); box-shadow: var(--shadow-xs);
          font-size: 14px; color: var(--navy-900); font-weight: 500;
        }
        .cs-foot svg { color: var(--turquoise-ink); flex-shrink: 0; }
        @media (max-width: 900px) { .cs-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function SolucoesPage() {
  useLocale();   // re-renderiza a pagina inteira quando o idioma muda
  useReveal();
  return (
    <>
      <SiteHeader translated/>
      <PageHero
        eyebrow={tx('Plataforma de Dados & IA')}
        title={tx('Dados e IA muito além do BI de prateleira.')}
        lead={tx('Para quem já tem time de dados e não tem tempo de montar plataforma: o Qlik do dado bruto ao agente que executa a ação, com a engenharia da SEWE por trás.')}
      >
        <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 999, background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xs)', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>
            <img src="/assets/qlik-logo.png" alt="Qlik" style={{ height: 15, width: 'auto', display: 'block' }}/>{tx('Parceiro oficial Qlik')}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xs)', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>
            <span style={{ color: 'var(--turquoise-ink)', display: 'inline-flex' }}><Icon name="trophy" size={14} stroke={1.8}/></span>{tx('Leader no Gartner® Magic Quadrant™ de Analytics & BI por 16 anos consecutivos (2026)')}</span>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">{tr('cta.primary')} <Icon name="arrow" size={16} className="chev"/></a>
          <a href="https://wa.me/5548984704389" className="btn btn-outline btn-lg">WhatsApp</a>
        </div>
      </PageHero>
      <ProofBar/>
      <SolucoesBarreiras/>
      <SolucoesCamadas/>
      <SolucoesCamadaSewe/>
      <SolucoesPortfolio/>
      <SolucoesTech/>
      <SolucoesCusto/>
      <SolucoesPlatform/>
      <SolucoesBenchmark/>
      <SolucoesProcess/>
      <ObjectionBlock/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── mount ───────────────────────────────────────────────── */
SEWE_I18N_READY.then(function mountAudience() {
  const map = { 'industria-root': IndustriaPage, 'solucoes-root': SolucoesPage };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) ReactDOM.createRoot(el).render(React.createElement(map[id]));
  });
});

Object.assign(window, { IndustriaPage, SolucoesPage });

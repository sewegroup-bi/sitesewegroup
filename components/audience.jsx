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

/* A cadeia do setor, conectada: pedido, produto e pagamento circulando, tudo virando dado na SEWE */
function IndustriaCadeia() {
  const NODES = [
    { cx: 125, t: 'Consumidor final', sub: 'Compra e gera o dado', icon: 'user' },
    { cx: 375, t: 'PDV · Revenda', sub: 'Loja · Integrador · Revendedor', icon: 'store' },
    { cx: 625, t: 'Distribuidor', sub: 'Vendas · Estoque · Financeiro', icon: 'wh' },
    { cx: 875, t: 'Indústria', sub: 'Marca · Comercial · Diretoria', icon: 'fac' },
  ];
  const NodeIcon = ({ type, cx, cy }) => {
    const s = { fill: 'none', stroke: '#8fd9de', strokeWidth: 1.8, strokeLinejoin: 'round', strokeLinecap: 'round' };
    if (type === 'user') return (<g {...s}><circle cx={cx} cy={cy - 4} r={5}/><path d={`M${cx - 8},${cy + 11} a8,7 0 0 1 16,0`}/></g>);
    if (type === 'store') return (<g {...s}><path d={`M${cx - 11},${cy - 3} L${cx - 9},${cy - 9} H${cx + 9} L${cx + 11},${cy - 3} Z`}/><path d={`M${cx - 9},${cy - 3} V${cy + 11} H${cx + 9} V${cy - 3}`}/><path d={`M${cx - 2},${cy + 11} V${cy + 4} H${cx + 5} V${cy + 11}`}/></g>);
    if (type === 'wh') return (<g {...s}><path d={`M${cx - 11},${cy + 11} V${cy - 4} L${cx},${cy - 11} L${cx + 11},${cy - 4} V${cy + 11}`}/><path d={`M${cx - 4},${cy + 11} V${cy + 2} H${cx + 4} V${cy + 11}`}/></g>);
    return (<g {...s}><path d={`M${cx - 11},${cy + 11} V${cy - 2} L${cx - 4},${cy + 3} V${cy - 2} L${cx + 3},${cy + 3} V${cy - 2} L${cx + 10},${cy + 3} V${cy + 11} Z`}/><path d={`M${cx - 9},${cy - 5} V${cy - 11} H${cx - 6} V${cy - 6}`}/></g>);
  };
  const LANES = [
    { y: 172, color: '#aab7d0', label: 'PRODUTO', dir: 'left',  dur: '9s' },
    { y: 206, color: '#75e3e4', label: 'PEDIDO', dir: 'right', dur: '7s' },
    { y: 240, color: '#f0b429', label: 'PAGAMENTO', dir: 'right', dur: '11s' },
  ];
  const CONV = [
    'M125,258 C125,320 300,348 486,362',
    'M375,258 C375,318 428,344 492,358',
    'M625,258 C625,318 572,344 508,358',
    'M875,258 C875,320 700,348 514,362',
  ];
  return (
    <section className="section" style={{ background: 'var(--bg-soft)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">A cadeia conectada</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Pedido, produto e pagamento. <span style={{ color: 'var(--navy)' }}>Tudo circulando, tudo virando dado</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            O pedido sobe do consumo até a fábrica. O produto desce da fábrica até a ponta.
            O pagamento percorre o caminho de volta. A SEWE capta os três fluxos e devolve
            um só painel, atualizado em tempo real.
          </p>
        </div>

        <div className="cad2-panel">
          <svg viewBox="0 0 1000 452" role="img" style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="A cadeia do setor: pedido, produto e pagamento circulando entre consumidor, revenda, distribuidor e indústria, com todos os dados convergindo para a SEWE">
            <defs>
              <marker id="cadmL" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M10,0 L0,5 L10,10 Z" fill="#aab7d0"/>
              </marker>
              <marker id="cadmT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="#75e3e4"/>
              </marker>
              <marker id="cadmG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="#f0b429"/>
              </marker>
            </defs>

            {/* colunas: liga cada elo às pistas */}
            {NODES.map((n, i) => (
              <line key={i} x1={n.cx} y1={130} x2={n.cx} y2={258} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
            ))}

            {/* pistas de fluxo */}
            {LANES.map((l, i) => {
              const left = l.dir === 'left';
              return (
                <g key={i}>
                  <text x={62} y={l.y - 9} fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" letterSpacing="2" fill={l.color} opacity="0.85">
                    {left ? '← ' + l.label : l.label + ' →'}
                  </text>
                  <line x1={left ? 938 : 62} y1={l.y} x2={left ? 62 : 938} y2={l.y}
                    stroke={l.color} strokeOpacity="0.35" strokeWidth="1.5"
                    markerEnd={`url(#${left ? 'cadmL' : (l.label === 'PEDIDO' ? 'cadmT' : 'cadmG')})`}/>
                  <line className={left ? 'cad2-dash-l' : 'cad2-dash-r'} x1={62} y1={l.y} x2={938} y2={l.y}
                    stroke={l.color} strokeWidth="2.4" strokeLinecap="round"/>
                  {[0, 1].map(k => (
                    <circle key={k} r="4.5" fill={l.color} opacity="0.95">
                      <animateMotion dur={l.dur} begin={`${k * (parseFloat(l.dur) / 2)}s`} repeatCount="indefinite"
                        path={left ? `M938,${l.y} L62,${l.y}` : `M62,${l.y} L938,${l.y}`}/>
                    </circle>
                  ))}
                </g>
              );
            })}

            {/* convergência para a SEWE */}
            {CONV.map((d, i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="#75e3e4" strokeOpacity="0.16" strokeWidth="1.5"/>
                <circle r="3.6" fill="#75e3e4">
                  <animateMotion dur="3.4s" begin={`${i * 0.85}s`} repeatCount="indefinite" path={d}/>
                </circle>
              </g>
            ))}

            {/* elos da cadeia */}
            {NODES.map((n, i) => (
              <g key={i} className="cad2-node">
                <rect x={n.cx - 102} y={30} width={204} height={100} rx={14}
                  fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
                <NodeIcon type={n.icon} cx={n.cx} cy={58}/>
                <text x={n.cx} y={96} textAnchor="middle" fontFamily="Chakra Petch, sans-serif" fontWeight="700" fontSize="16" fill="#fff">{n.t}</text>
                <text x={n.cx} y={116} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.55)">{n.sub}</text>
              </g>
            ))}

            {/* hub SEWE */}
            <rect x={392} y={338} width={216} height={54} rx={27}
              fill="rgba(117,227,228,0.1)" stroke="#75e3e4" strokeOpacity="0.55" strokeWidth="1.5" className="cad2-hub"/>
            <text x={500} y={361} textAnchor="middle" fontFamily="Chakra Petch, sans-serif" fontWeight="700" fontSize="19" fill="#75e3e4" letterSpacing="3">SEWE</text>
            <text x={500} y={379} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.6)" letterSpacing="1.5">DADOS · BI · IA · TEMPO REAL</text>

            <text x={500} y={434} textAnchor="middle" fontSize="13" fill="rgba(255,255,255,0.55)">
              Os três fluxos viram um só painel: sellout, estoque e financeiro de ponta a ponta, em tempo real.
            </text>
          </svg>
        </div>
      </div>
      <style>{`
        .cad2-panel {
          background: linear-gradient(150deg, #15243d, #0d1a2e);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          padding: clamp(10px, 2vw, 26px);
        }
        .cad2-dash-r { stroke-dasharray: 5 14; animation: cad2r 1.1s linear infinite; }
        .cad2-dash-l { stroke-dasharray: 5 14; animation: cad2l 1.1s linear infinite; }
        @keyframes cad2r { to { stroke-dashoffset: -19; } }
        @keyframes cad2l { to { stroke-dashoffset: 19; } }
        .cad2-hub { animation: cad2glow 2.6s ease-in-out infinite; }
        @keyframes cad2glow {
          0%, 100% { stroke-opacity: 0.4; }
          50% { stroke-opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cad2-dash-r, .cad2-dash-l, .cad2-hub { animation: none; }
        }
      `}</style>
    </section>
  );
}

function IndustriaMap() {
  const fronts = [
    { c: BU_C.integration, icon: 'link',  step: '01', name: 'Enxergue a rede inteira', flow: 'SEWE Integration',
      d: 'O sellout, o estoque e a curva de cada distribuidor que vende os seus produtos, produto a produto, em um só painel.' },
    { c: BU_C.bi, icon: 'brain', step: '02', name: 'Decida com IA', flow: 'SEWE BI + IA',
      d: 'Onde falta produto, onde sobra estoque e onde há espaço para crescer, com a próxima ação pronta, sem garimpar gráfico.' },
    { c: BU_C.sales, icon: 'store', step: '03', name: 'Venda mais no canal', flow: 'SEWE Sales',
      d: 'Portal de pedidos, promoções, CRM e carteira de clientes: a rede inteira vendendo no padrão da indústria.' },
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
  const kpis = [
    { v: 'R$ 128,4M', l: 'sellout da rede · MTD', t: 'up' },
    { v: '87,2%', l: 'cobertura de PDV', t: 'up' },
    { v: '3,4%', l: 'ruptura no canal', t: 'down' },
    { v: '512', l: 'distribuidores ativos', t: 'up' },
  ];
  const rows = [
    { n: 'Distribuidor Alfa',    uf: 'SC', sellout: 'R$ 24,1M', cov: 94, rup: 1.8, w: 100 },
    { n: 'Distribuidor Beta',    uf: 'RS', sellout: 'R$ 19,7M', cov: 91, rup: 2.2, w: 82 },
    { n: 'Distribuidor Gama',    uf: 'PR', sellout: 'R$ 16,3M', cov: 88, rup: 3.1, w: 68 },
    { n: 'Distribuidor Delta',   uf: 'SC', sellout: 'R$ 12,9M', cov: 85, rup: 3.6, w: 54 },
    { n: 'Distribuidor Épsilon', uf: 'SP', sellout: 'R$ 9,4M',  cov: 79, rup: 4.9, w: 39 },
    { n: 'Distribuidor Ômega',   uf: 'MG', sellout: 'R$ 7,1M',  cov: 74, rup: 5.4, w: 29 },
  ];
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-soft) 0%, #f4f6fb 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 40px' }}>
          <div className="eyebrow">A rede em um só painel</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            O sellout de cada distribuidor, <span style={{ color: 'var(--navy)' }}>produto a produto</span>.
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
              <div key={i} className="inp-tr">
                <span className="inp-name"><b>{r.n}</b><em>{r.uf}</em></span>
                <span className="inp-sellout">
                  <span className="inp-bar"><span className="inp-bar-fill" style={{ width: r.w + '%' }}/></span>
                  <span className="tnum">{r.sellout}</span>
                </span>
                <span className="inp-hide tnum" style={{ color: r.cov >= 85 ? 'var(--turquoise-ink)' : 'var(--text-2)' }}>{r.cov}%</span>
                <span className="tnum" style={{ color: r.rup > 4 ? 'var(--danger)' : 'var(--text-2)', fontWeight: 600 }}>{r.rup}%</span>
              </div>
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
        list: ['Painel único de toda a rede', 'Alertas de ruptura e excesso', 'Recomendação de ação pronta'],
      }}
    />
  );
}

function IndustriaSales() {
  return (
    <EcoFront
      id="sales"
      bg="var(--bg-soft)"
      c={BU_C.sales.color} soft={BU_C.sales.soft} ink={BU_C.sales.ink}
      eyebrow="SEWE SALES"
      title="Do pedido ao CRM, a rede vendendo no"
      hl="padrão da indústria"
      lead="Não é só um portal de pedidos: é a operação comercial da rede inteira. Catálogo, promoção, aprovação, carteira e CRM num só lugar, integrado ao ERP de cada distribuidor."
      feats={[
        { icon: 'store',    t: 'Portal do cliente', d: 'Catálogo digital, consulta de preço e pedido self-service, com a identidade e as regras da indústria.' },
        { icon: 'check',    t: 'Pedido dentro da política', d: 'Aprovação automática por alçada: desconto, crédito e condição comercial sempre dentro da regra.' },
        { icon: 'trophy',   t: 'Promoções e incentivos', d: 'Campanhas e incentivos comerciais para o canal, com resultado acompanhado por distribuidor.' },
        { icon: 'users',    t: 'CRM e carteira de clientes', d: 'Histórico, frequência de compra e próxima ação de cada conta. Quem parou de comprar aparece.' },
        { icon: 'clock',    t: 'Gestão de atividades', d: 'Workflow do time comercial: tarefas, visitas e follow-ups organizados e mensuráveis.' },
        { icon: 'link',     t: 'Integrado ao ERP do distribuidor', d: 'O pedido cai direto no ERP, sem redigitação e sem retrabalho para a rede.' },
        { icon: 'target',   t: 'Catálogo e tabela por canal', d: 'Sortimento e preço certos para cada tipo de canal, sem planilha paralela.' },
        { icon: 'trending', t: 'Visão de vendas da rede', d: 'O que cada distribuidor vende, para quem e com que margem, em tempo real.' },
      ]}
      aside={{
        bg: 'linear-gradient(160deg,#3a1c05,#27160a)',
        tag: 'OPERAÇÃO COMPLETA', tagColor: '#ffd2a8', tagBg: 'rgba(253,112,20,0.2)',
        metric: '8 entregas', metricLabel: 'do catálogo ao CRM, num só módulo',
        desc: 'Da consulta de preço ao pós-venda, distribuidores, vendedores e clientes operando com as mesmas regras e a mesma informação.',
        list: ['Pedido dentro da política', 'CRM e carteira de clientes', 'Integração com o ERP do distribuidor'],
      }}
    />
  );
}

/* Modularidade — contrate tudo ou só uma parte */
function IndustriaModular() {
  const combos = [
    { c: BU_C.integration, t: 'Só enxergar a rede', d: 'O painel de sellout, estoque e cobertura de cada distribuidor. Visibilidade imediata, sem mexer na operação.', tag: 'PORTA DE ENTRADA' },
    { c: BU_C.bi, t: 'Enxergar + decidir', d: 'A visibilidade da rede com a IA por cima: alertas de ruptura, mix por região e previsão de demanda.', tag: 'MAIS ESCOLHIDO' },
    { c: BU_C.sales, t: 'Ecossistema completo', d: 'Da visibilidade à venda: painel, IA e a operação comercial da rede rodando no padrão da indústria.', tag: 'CICLO FECHADO' },
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
      <IndustriaCadeia/>
      <IndustriaMap/>
      <IntegrationSection/>
      <IndustriaNetworkPanel/>
      <IndustriaBI/>
      <IndustriaSales/>
      <IndustriaModular/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── SOLUÇÕES SOB MEDIDA ─────────────────────────────────── */
function SolucoesOfferings() {
  const items = [
    { icon: 'chart', t: 'Qlik Sense', d: 'Parceiro oficial: licenças homologadas, ambiente na nuvem hospedado no Brasil e a camada SEWE de dashboards e IA em cima.' },
    { icon: 'cpu',   t: 'BI e dashboards sob medida', d: 'Modelagem, ETL e painéis desenhados para o seu processo, não um pacote genérico. Cada indicador ligado a uma decisão.' },
    { icon: 'link',  t: 'Engenharia de dados', d: 'Conexão com qualquer ERP ou fonte, pipelines e governança. Sua equipe recebe o dado pronto, confiável e no lugar certo.' },
    { icon: 'users', t: 'Consultoria e squad', d: 'Diagnóstico, roadmap e um time SEWE acompanhando de perto, do primeiro dado ao resultado sustentado.' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 44px' }}>
          <div className="eyebrow">O que entregamos</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Um squad de tecnologia <span style={{ color: 'var(--navy)' }}>sob medida</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Para empresas de qualquer setor que precisam de dados confiáveis e decisões mais rápidas.
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

/* Qlik por dentro — profundidade técnica */
function SolucoesTech() {
  const items = [
    { icon: 'brain', t: 'Motor associativo in-memory', d: 'O Qlik indexa todas as relações entre os seus dados. Você explora em qualquer direção, sem consulta pré-montada e sem esperar o TI escrever SQL.' },
    { icon: 'link', t: 'Pipelines e cargas incrementais', d: 'Extração do ERP com cargas incrementais agendadas, camadas de dados e modelagem dimensional. Histórico preservado e recarga sem pesar na origem.' },
    { icon: 'shield', t: 'Segurança em nível de linha', d: 'Section Access nativo: cada usuário enxerga só a filial, a carteira ou o recorte que pode ver. SSO, criptografia e trilha de auditoria.' },
    { icon: 'alert', t: 'Alertas orientados a dado', d: 'Alertas disparados pela condição do indicador, não por horário, direto no celular. Relatórios assinados chegam por e-mail no ritmo que você definir.' },
    { icon: 'cpu', t: 'Embedded analytics e APIs', d: 'Dashboards embutidos em portais e sistemas próprios, com APIs REST para automação e integração ao restante do seu ecossistema.' },
    { icon: 'trending', t: 'IA nativa + camada SEWE', d: 'A IA do Qlik somada aos algoritmos SEWE: previsão de demanda, alerta de churn e sugestão de compra rodando sobre o mesmo modelo de dados.' },
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
    { n: '02', t: 'Modelagem & engenharia', d: 'Conexão às fontes, pipelines e modelagem. A base confiável que sustenta tudo.' },
    { n: '03', t: 'Go-live', d: 'Dashboards e IA no ar, com a sua equipe treinada e usando no dia a dia.' },
    { n: '04', t: 'Evolução contínua', d: 'Um squad SEWE acompanhando, ajustando e ampliando conforme você cresce.' },
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
        lead="Para empresas de qualquer setor: Qlik Sense, dashboards personalizados, engenharia de dados e consultoria. Um time de tecnologia da SEWE dedicado ao seu desafio."
      >
        <div style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 999, background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xs)', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>
          <img src="assets/qlik-logo.png" alt="Qlik" style={{ height: 15, width: 'auto', display: 'block' }}/>
          Parceiro oficial Qlik · Referência nacional em dados
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">Falar sobre o meu projeto <Icon name="arrow" size={16} className="chev"/></a>
          <a href="https://wa.me/5548984704389" className="btn btn-outline btn-lg">WhatsApp</a>
        </div>
      </PageHero>
      <SolucoesOfferings/>
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

// Ecosystem visualization, "O distribuidor operando ao vivo"
// A single, polished interactive scene: the distributor's operation as a working
// pipeline. Orders/data flow left→right through 5 stations; SEWE sits on top
// (Gestão Estratégica) and underneath (Financeiro), reading every station.
// Selecting a suite lights up the part of the operation it plugs into.

const SUITES = {
  estrategica: {
    label: 'Gestão Estratégica', short: '360°', color: '#0e7a7c', icon: 'target',
    role: 'A camada que lê a operação inteira',
    stations: ['fornecedor', 'estoque', 'expedicao', 'vendas', 'cliente'],
    decision: 'Consolidando 7 filiais · margem, ruptura e positivação em uma só tela',
    kpis: [{ v: 'R$ 18,4M', l: 'receita MTD' }, { v: '25,4%', l: 'EBITDA' }, { v: '+28%', l: 'YoY' }],
  },
  suprimentos: {
    label: 'Suprimentos', short: 'Suprimentos', color: '#2d436c', icon: 'boxes',
    role: 'Entra na compra e no estoque',
    stations: ['fornecedor', 'estoque'],
    decision: '17 SKUs de Curva A em risco de ruptura → pedido sugerido enviado ao ERP',
    kpis: [{ v: '-15%', l: 'custos op.' }, { v: '+90%', l: 'assertividade' }, { v: '-20%', l: 'estoque parado' }],
  },
  comercial: {
    label: 'Comercial', short: 'Comercial', color: '#3d5684', icon: 'trending',
    role: 'Entra na força de vendas e no cliente',
    stations: ['vendas', 'cliente'],
    decision: 'Cliente Curva A: 47 dias sem comprar → ação enviada ao vendedor agora',
    kpis: [{ v: '+30%', l: 'reativação' }, { v: '+25%', l: 'LTV' }, { v: '+35%', l: 'produtividade' }],
  },
  financeiro: {
    label: 'Financeiro', short: 'Financeiro', color: '#586580', icon: 'dollar',
    role: 'Corre por baixo de toda a operação',
    stations: ['fornecedor', 'estoque', 'expedicao', 'vendas', 'cliente'],
    decision: 'Margem líquida real por SKU já descontando rebate, frete e imposto · DRE ao vivo',
    kpis: [{ v: '+1,1pp', l: 'margem' }, { v: '2 dias', l: 'até closing' }, { v: '100%', l: 'auditável' }],
  },
};

const STATIONS = [
  { key: 'fornecedor', label: 'Fornecedores', sub: 'Compra', icon: 'factory',
    stat: { base: 128, suffix: ' pedidos', fmt: 'int' } },
  { key: 'estoque', label: 'Estoque', sub: 'Armazém', icon: 'warehouse',
    stat: { base: 3482, suffix: ' SKUs', fmt: 'int' } },
  { key: 'expedicao', label: 'Expedição', sub: 'Logística', icon: 'truck',
    stat: { base: 96, suffix: '% no prazo', fmt: 'int' } },
  { key: 'vendas', label: 'Força de Vendas', sub: 'Carteira', icon: 'users',
    stat: { base: 84, suffix: '% positivação', fmt: 'int' } },
  { key: 'cliente', label: 'Clientes', sub: 'PDV', icon: 'store',
    stat: { base: 1248, suffix: ' ativos', fmt: 'int' } },
];

// Live-jitter hook: gently moves a value within ±range every tick (ops feel).
function useLive(base, range = 2, decimals = 0, period = 2200) {
  const reduce = React.useMemo(() => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [v, setV] = React.useState(base);
  React.useEffect(() => {
    if (reduce) { setV(base); return; }
    const id = setInterval(() => {
      const delta = (Math.random() - 0.45) * range;
      setV(prev => {
        let next = prev + delta;
        if (next > base + range * 2) next = base + range;
        if (next < base - range * 2) next = base - range;
        return next;
      });
    }, period);
    return () => clearInterval(id);
  }, [base, range, decimals, period, reduce]);
  return decimals > 0 ? v.toFixed(decimals) : Math.round(v);
}

function fmtInt(n) { return n.toLocaleString('pt-BR'); }

function EcosystemSection({ animated = true }) {
  const [active, setActive] = React.useState('estrategica');
  const S = SUITES[active];
  const litSet = new Set(S.stations);

  return (
    <section id="bi" className="section" style={{ background: 'linear-gradient(180deg, #fff 0%, #f4f6fb 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 40px' }}>
          <div className="eyebrow">SEWE BI · o distribuidor operando</div>
          <h2 style={{ marginTop: 14, marginBottom: 14 }}>Veja onde cada produto SEWE <br className="hide-mob"/>se acopla à sua operação.</h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17 }}>
            Da compra ao PDV, os dados correm pela sua operação em tempo real. A SEWE lê cada estação, decide nos bastidores e devolve a próxima ação para a área certa. Clique numa suíte e veja onde ela entra.
          </p>
        </div>

        {/* Suite selector */}
        <div className="op-tabs" style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 22 }}>
          {Object.keys(SUITES).map(k => {
            const s = SUITES[k];
            const on = active === k;
            return (
              <button key={k} onClick={() => setActive(k)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '11px 18px', borderRadius: 999,
                  background: on ? s.color : '#fff',
                  color: on ? '#fff' : 'var(--navy-900)',
                  border: `1.5px solid ${on ? s.color : 'var(--line)'}`,
                  boxShadow: on ? '0 10px 26px rgba(45,67,108,0.22)' : 'var(--shadow-xs)',
                  fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 14.5,
                  cursor: 'pointer', transition: 'all .2s ease', letterSpacing: '0.01em',
                }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: on ? 'rgba(255,255,255,0.2)' : s.color, color: '#fff', display: 'grid', placeItems: 'center' }}>
                  <Icon name={s.icon} size={13} stroke={2}/>
                </span>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* The operating stage */}
        <div className="op-stage" style={{ position: 'relative', background: '#fff', border: '1px solid var(--line)', borderRadius: 22, boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          {/* isometric floor grid backdrop */}
          <div aria-hidden className="op-floor"/>

          {/* TOP RAIL, Gestão Estratégica */}
          <StrategicRail active={active} dim={active !== 'estrategica' && active !== 'financeiro' ? false : false} highlight={active === 'estrategica'} animated={animated}/>

          {/* OPERATION LINE */}
          <div className="op-line-wrap">
            <OperationLine litSet={litSet} activeColor={S.color} active={active} animated={animated}/>
          </div>

          {/* BOTTOM RAIL, Financeiro */}
          <FinanceRail highlight={active === 'financeiro'} animated={animated}/>

          {/* READOUT CONSOLE */}
          <ReadoutConsole suite={S}/>
        </div>
      </div>

      <EcosystemStyles/>
    </section>
  );
}

// ── Top rail: the C-level layer reading everything ──
function StrategicRail({ highlight, animated }) {
  const receita = useLive(18.42, 0.05, 2, 2600);
  const margem = useLive(18.4, 0.15, 1, 2400);
  const positiv = useLive(84.2, 0.4, 1, 2000);
  const ruptura = useLive(2.1, 0.12, 1, 2800);
  const items = [
    { l: 'Faturamento MTD', v: `R$ ${receita}M`, t: 'up' },
    { l: 'Margem líquida', v: `${margem}%`, t: 'up' },
    { l: 'Positivação', v: `${positiv}%`, t: 'up' },
    { l: 'Ruptura · Curva A', v: `${ruptura}%`, t: 'down' },
  ];
  return (
    <div className={'op-rail op-rail-top' + (highlight ? ' is-hot' : '')}>
      <div className="op-rail-tag">
        <span style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(117,227,228,0.16)', color: 'var(--turquoise)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name="target" size={15} stroke={2}/>
        </span>
        <div>
          <div className="op-rail-name">Gestão Estratégica</div>
          <div className="op-rail-sub">VISÃO 360° · TEMPO REAL</div>
        </div>
      </div>
      <div className="op-rail-kpis">
        {items.map((it, i) => (
          <div key={i} className="op-rail-kpi">
            <div className="op-rail-kpi-v tnum">
              {it.v}
              <span style={{ color: it.t === 'up' ? '#5ce0c4' : '#ff9aa2', fontSize: 10, marginLeft: 5 }}>{it.t === 'up' ? '▲' : '▼'}</span>
            </div>
            <div className="op-rail-kpi-l">{it.l}</div>
          </div>
        ))}
      </div>
      <div className="op-live"><span className="op-live-dot"/>LIVE</div>
    </div>
  );
}

// ── Operation line: 5 stations with flowing orders/data between them ──
function OperationLine({ litSet, activeColor, active, animated }) {
  return (
    <div className="op-line">
      {/* the conveyor / flow track behind nodes */}
      <div className="op-track" aria-hidden>
        <div className="op-track-line"/>
        {animated && Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="op-pulse" style={{ animationDelay: `${i * 0.9}s`, background: activeColor }}/>
        ))}
      </div>

      <div className="op-nodes">
        {STATIONS.map((st, i) => {
          const lit = litSet.has(st.key);
          return <Station key={st.key} st={st} lit={lit} color={activeColor} idx={i} active={active} animated={animated}/>;
        })}
      </div>
    </div>
  );
}

function Station({ st, lit, color, idx, active, animated }) {
  const isInt = st.stat.fmt === 'int';
  const live = useLive(st.stat.base, isInt ? Math.max(1, st.stat.base * 0.01) : 1, 0, 1800 + idx * 220);
  const showFinance = active === 'financeiro';
  return (
    <div className={'op-node' + (lit ? ' lit' : ' dim')}>
      <div className="op-node-tile" style={lit ? { background: color, borderColor: color, boxShadow: `0 14px 30px ${color}40` } : {}}>
        <Icon name={st.icon} size={26} stroke={1.7}/>
        {lit && animated && <span className="op-node-ring" style={{ borderColor: color }}/>}
        {showFinance && lit && <span className="op-node-money">R$</span>}
      </div>
      <div className="op-node-base"/>
      <div className="op-node-label">{st.label}</div>
      <div className="op-node-sub">{st.sub}</div>
      <div className={'op-node-stat' + (lit ? ' on' : '')} style={lit ? { color } : {}}>
        <span className="tnum">{fmtInt(live)}</span>{st.stat.suffix}
      </div>
    </div>
  );
}

// ── Bottom rail: finance underlying everything ──
function FinanceRail({ highlight, animated }) {
  const entrada = useLive(4.28, 0.04, 2, 2400);
  const saida = useLive(3.11, 0.04, 2, 2600);
  const caixa = useLive(8.2, 0.05, 1, 3000);
  return (
    <div className={'op-rail op-rail-bottom' + (highlight ? ' is-hot' : '')}>
      <div className="op-rail-tag">
        <span style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(45,67,108,0.1)', color: 'var(--navy-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name="dollar" size={15} stroke={2}/>
        </span>
        <div>
          <div className="op-rail-name" style={{ color: 'var(--navy-900)' }}>Financeiro</div>
          <div className="op-rail-sub" style={{ color: 'var(--text-3)' }}>FLUXO QUE CORRE POR BAIXO DA OPERAÇÃO</div>
        </div>
      </div>
      <div className="op-money-flow">
        <div className="op-money-item"><span className="op-money-v tnum" style={{ color: 'var(--success)' }}>+R$ {entrada}M</span><span className="op-money-l">entradas</span></div>
        <Icon name="arrow" size={14} style={{ color: 'var(--text-3)' }}/>
        <div className="op-money-item"><span className="op-money-v tnum" style={{ color: 'var(--danger)' }}>−R$ {saida}M</span><span className="op-money-l">saídas</span></div>
        <Icon name="arrow" size={14} style={{ color: 'var(--text-3)' }}/>
        <div className="op-money-item"><span className="op-money-v tnum" style={{ color: 'var(--navy-900)' }}>R$ {caixa}M</span><span className="op-money-l">caixa projetado</span></div>
      </div>
    </div>
  );
}

// ── Readout console: what SEWE is deciding right now for the active suite ──
function ReadoutConsole({ suite }) {
  return (
    <div className="op-readout">
      <div className="op-readout-head">
        <span style={{ width: 38, height: 38, borderRadius: 10, background: suite.color, color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name={suite.icon} size={20} stroke={1.8}/>
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 17, color: 'var(--navy-900)' }}>Suíte {suite.label}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{suite.role}</div>
        </div>
        <div className="op-kpi-chips">
          {suite.kpis.map((k, i) => (
            <div key={i} className="op-kpi-chip" style={{ color: suite.color }}>
              <b>{k.v}</b> {k.l}
            </div>
          ))}
        </div>
      </div>
      <div className="op-readout-line">
        <span className="op-readout-prompt" style={{ color: suite.color }}>›</span>
        <span className="op-readout-text">{suite.decision}</span>
        <span className="op-caret"/>
      </div>
    </div>
  );
}

function EcosystemStyles() {
  return (
    <style>{`
      .hide-mob { display: inline; }

      .op-stage { padding: 0; }
      .op-floor {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        background-image:
          linear-gradient(rgba(45,67,108,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,67,108,0.04) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 85%);
        -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 85%);
      }

      /* Rails */
      .op-rail {
        position: relative; z-index: 2;
        display: flex; align-items: center; gap: 20px;
        padding: 14px 22px;
        transition: background .3s ease, box-shadow .3s ease;
      }
      .op-rail-top {
        background: linear-gradient(100deg, #15243d, #2d436c);
        color: #fff;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .op-rail-top.is-hot { box-shadow: inset 0 0 0 2px rgba(117,227,228,0.5); }
      .op-rail-bottom {
        background: var(--bg-soft);
        border-top: 1px solid var(--line);
      }
      .op-rail-bottom.is-hot { box-shadow: inset 0 0 0 2px rgba(45,67,108,0.3); background: #eef2f8; }
      .op-rail-tag { display: flex; align-items: center; gap: 11px; min-width: 210px; }
      .op-rail-name { font-family: 'Chakra Petch'; font-weight: 600; font-size: 14px; color: #fff; letter-spacing: 0.02em; }
      .op-rail-sub { font-size: 9.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.55); font-family: 'JetBrains Mono', monospace; margin-top: 1px; }
      .op-rail-kpis { display: flex; gap: 28px; flex: 1; flex-wrap: wrap; }
      .op-rail-kpi-v { font-family: 'Chakra Petch'; font-weight: 700; font-size: 19px; color: #fff; line-height: 1; }
      .op-rail-kpi-l { font-size: 10.5px; color: rgba(255,255,255,0.6); margin-top: 4px; letter-spacing: 0.02em; }
      .op-live {
        display: inline-flex; align-items: center; gap: 7px;
        font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600;
        letter-spacing: 0.12em; color: var(--turquoise);
        padding: 5px 11px; border-radius: 999px; background: rgba(117,227,228,0.1); border: 1px solid rgba(117,227,228,0.25);
      }
      .op-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--turquoise); box-shadow: 0 0 0 0 rgba(117,227,228,0.6); animation: oplive 1.6s ease-out infinite; }
      @keyframes oplive { 0% { box-shadow: 0 0 0 0 rgba(117,227,228,0.6);} 70%{ box-shadow:0 0 0 8px rgba(117,227,228,0);} 100%{ box-shadow:0 0 0 0 rgba(117,227,228,0);} }

      .op-money-flow { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
      .op-money-item { display: flex; flex-direction: column; }
      .op-money-v { font-family: 'Chakra Petch'; font-weight: 700; font-size: 17px; line-height: 1; }
      .op-money-l { font-size: 10.5px; color: var(--text-3); margin-top: 3px; letter-spacing: 0.02em; }

      /* Operation line */
      .op-line-wrap { position: relative; z-index: 2; padding: 44px 28px 40px; }
      .op-line { position: relative; }
      .op-track { position: absolute; left: 0; right: 0; top: 38px; height: 4px; z-index: 0; }
      .op-track-line {
        position: absolute; left: 4%; right: 4%; top: 1px; height: 2px;
        background: repeating-linear-gradient(90deg, #d3dae6 0 8px, transparent 8px 16px);
      }
      .op-pulse {
        position: absolute; top: -3px; left: 4%;
        width: 9px; height: 9px; border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(117,227,228,0.18);
        animation: opflow 6.3s linear infinite;
      }
      @keyframes opflow {
        0% { left: 3%; opacity: 0; transform: scale(0.6); }
        8% { opacity: 1; transform: scale(1); }
        92% { opacity: 1; transform: scale(1); }
        100% { left: 96%; opacity: 0; transform: scale(0.6); }
      }

      .op-nodes { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
      .op-node { display: flex; flex-direction: column; align-items: center; text-align: center; transition: opacity .3s ease, transform .3s ease; }
      .op-node.dim { opacity: 0.38; }
      .op-node.lit { opacity: 1; }
      .op-node-tile {
        position: relative;
        width: 76px; height: 76px; border-radius: 18px;
        background: #fff; border: 1.5px solid var(--line);
        color: var(--slate);
        display: grid; place-items: center;
        box-shadow: var(--shadow-sm);
        transition: all .3s cubic-bezier(.2,.7,.3,1);
      }
      .op-node.lit .op-node-tile { color: #fff; transform: translateY(-4px); }
      .op-node-ring { position: absolute; inset: -6px; border-radius: 22px; border: 2px solid; opacity: .5; animation: opring 1.8s ease-out infinite; }
      @keyframes opring { 0% { transform: scale(0.92); opacity: .55; } 100% { transform: scale(1.18); opacity: 0; } }
      .op-node-money {
        position: absolute; top: -8px; right: -8px;
        width: 24px; height: 24px; border-radius: 50%;
        background: var(--success); color: #fff;
        font-size: 10px; font-weight: 700; font-family: 'JetBrains Mono', monospace;
        display: grid; place-items: center; box-shadow: var(--shadow-sm);
      }
      .op-node-base {
        width: 56px; height: 9px; border-radius: 50%; margin-top: 8px;
        background: radial-gradient(ellipse at center, rgba(45,67,108,0.16), transparent 70%);
      }
      .op-node-label { font-family: 'Chakra Petch'; font-weight: 600; font-size: 14px; color: var(--navy-900); margin-top: 6px; }
      .op-node-sub { font-size: 10.5px; color: var(--text-3); letter-spacing: 0.1em; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; margin-top: 1px; }
      .op-node-stat { font-size: 12px; color: var(--text-3); margin-top: 7px; font-weight: 500; transition: color .3s ease; }
      .op-node-stat.on { font-weight: 600; }

      /* Readout console */
      .op-readout { position: relative; z-index: 2; margin: 0 22px 22px; background: var(--bg-soft); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; }
      .op-readout-head { display: flex; align-items: center; gap: 13px; flex-wrap: wrap; }
      .op-kpi-chips { display: flex; gap: 7px; margin-left: auto; flex-wrap: wrap; }
      .op-kpi-chip { padding: 5px 11px; border-radius: 7px; background: #fff; border: 1px solid var(--line); font-size: 12px; font-family: 'JetBrains Mono', monospace; }
      .op-kpi-chip b { font-family: 'Chakra Petch'; }
      .op-readout-line { display: flex; align-items: center; gap: 9px; margin-top: 14px; padding-top: 14px; border-top: 1px dashed var(--line); font-family: 'JetBrains Mono', monospace; font-size: 13px; }
      .op-readout-prompt { font-weight: 700; font-size: 16px; }
      .op-readout-text { color: var(--text); }
      .op-caret { width: 8px; height: 16px; background: var(--turquoise-2); display: inline-block; animation: opcaret 1.1s steps(1) infinite; }
      @keyframes opcaret { 50% { opacity: 0; } }

      @media (max-width: 860px) {
        .hide-mob { display: none; }
        .op-rail { flex-direction: column; align-items: flex-start; gap: 12px; }
        .op-rail-tag { min-width: 0; }
        .op-rail-kpis { gap: 18px; }
        .op-rail-kpi-v { font-size: 16px; }
        .op-live { position: absolute; top: 14px; right: 18px; }
        .op-line-wrap { padding: 32px 12px 28px; overflow-x: auto; }
        .op-nodes { grid-template-columns: repeat(5, minmax(92px, 1fr)); min-width: 520px; }
        .op-node-tile { width: 60px; height: 60px; border-radius: 14px; }
        .op-kpi-chips { margin-left: 0; }
      }
    `}</style>
  );
}

Object.assign(window, { EcosystemSection });

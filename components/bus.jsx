// Sewe Group, the connected ecosystem + the three BUs on the home page.
// Audience = distributor (protagonist). Integration brings industry↔distributor
// data in; BI turns it into decisions; Sales acts on the client. MinerConect is
// a separate product (own page) with a routing door for industry/other companies.

const BU = {
  integration: { color: '#00a335', soft: 'rgba(0,163,53,0.08)', ink: '#0a7a2c', name: 'Integration' },
  bi:          { color: '#2d436c', soft: 'rgba(45,67,108,0.08)', ink: '#2d436c', name: 'BI' },
  sales:       { color: '#fd7014', soft: 'rgba(253,112,20,0.09)', ink: '#c9550a', name: 'Sales' },
};

/* ────────────────────────────────────────────────────────────
   CONNECTED ECOSYSTEM, three frentes, one distributor
──────────────────────────────────────────────────────────── */
function ConnectedEcosystem() {
  const nodes = [
    {
      k: 'integration', icon: 'link', step: '01', flow: 'Capta os dados',
      title: 'SEWE Integration', color: BU.integration.color, soft: BU.integration.soft,
      desc: 'Conecta indústria e distribuidor. Traz sellout, estoque e curva de cada ponto da rede para dentro da operação.',
      href: '#integration',
    },
    {
      k: 'sales', icon: 'store', step: '02', flow: 'Age no cliente',
      title: 'SEWE Sales', color: BU.sales.color, soft: BU.sales.soft,
      desc: 'Vira a força de vendas num e-commerce B2B. O cliente do distribuidor compra sozinho, com CRM e regras comerciais.',
      href: '#sales',
    },
    {
      k: 'bi', icon: 'brain', step: '03', flow: 'Fecha o ciclo com decisão',
      title: 'SEWE BI', color: BU.bi.color, soft: BU.bi.soft,
      desc: 'A IA cruza tudo nos bastidores, suprimentos, comercial, financeiro e gestão, e entrega a próxima ação pronta.',
      href: '#suites',
    },
  ];

  return (
    <section id="ecossistema" className="section" style={{ background: 'linear-gradient(180deg,#fff 0%, var(--bg-tinted) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 14px' }}>
          <div className="eyebrow">Um ecossistema, três frentes</div>
          <h2 style={{ marginTop: 14, marginBottom: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Conectadas em volta do <span style={{ color: 'var(--navy)' }}>distribuidor</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17 }}>
            Os dados entram pela Integration, a Sales vende e gera mais dado na ponta, e o BI fecha o ciclo virando tudo em decisão.
            Um ciclo só, com a SEWE cuidando da engenharia de ponta a ponta.
          </p>
        </div>

        <div className="eco3" style={{ position: 'relative', marginTop: 44 }}>
          <div aria-hidden className="eco3-track"/>
          <div className="eco3-grid">
            {nodes.map((n, i) => (
              <a key={n.k} href={n.href} className="eco3-card reveal card-hover" style={{ '--c': n.color, '--cs': n.soft }}>
                <div className="eco3-top">
                  <span className="eco3-icon" style={{ background: n.color }}>
                    <Icon name={n.icon} size={22} stroke={1.85}/>
                  </span>
                  <span className="eco3-step">{n.step}</span>
                </div>
                <div className="eco3-flow" style={{ color: n.color }}>{n.flow}</div>
                <div className="eco3-title">{n.title}</div>
                <p className="eco3-desc">{n.desc}</p>
                <span className="eco3-cta" style={{ color: n.color }}>
                  Ver detalhes <Icon name="arrow" size={15} stroke={2}/>
                </span>
                {i < nodes.length - 1 && (
                  <span className="eco3-arrow" aria-hidden><Icon name="arrow" size={18} stroke={2.2}/></span>
                )}
              </a>
            ))}
          </div>

          <div className="eco3-base reveal">
            <SMark size={26} color="#2d436c"/>
            <div>
              <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 15, color: 'var(--navy-900)' }}>O distribuidor no centro</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Uma operação, um CRM, uma fonte de verdade, não três ferramentas soltas.</div>
            </div>
            <a href="#diagnostico" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>Falar com a SEWE <span className="chev">→</span></a>
          </div>
        </div>
      </div>

      <style>{`
        .eco3-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; position: relative; z-index: 1; }
        .eco3-track { position: absolute; top: 92px; left: 12%; right: 12%; height: 2px; z-index: 0;
          background: repeating-linear-gradient(90deg,#cdd5e2 0 7px, transparent 7px 15px); }
        .eco3-card { position: relative; display: flex; flex-direction: column; background: #fff;
          border: 1px solid var(--line); border-top: 3px solid var(--c); border-radius: var(--r-lg);
          padding: 24px; box-shadow: var(--shadow-sm); transition: all .2s ease; }
        .eco3-card:hover { transform: translateY(-3px); }
        .eco3-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .eco3-icon { width: 46px; height: 46px; border-radius: 12px; color: #fff; display: grid; place-items: center;
          box-shadow: 0 8px 20px var(--cs); }
        .eco3-step { font-family: var(--ff-mono); font-size: 13px; font-weight: 600; color: var(--text-3); letter-spacing: .08em; }
        .eco3-flow { font-family: var(--ff-mono); font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }
        .eco3-title { font-family: var(--ff-display); font-weight: 700; font-size: 20px; color: var(--navy-900); margin-bottom: 8px; }
        .eco3-desc { font-size: 14px; color: var(--text-2); line-height: 1.6; flex: 1; }
        .eco3-cta { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; font-weight: 600; font-size: 14px; }
        .eco3-arrow { position: absolute; right: -28px; top: 92px; transform: translateY(-50%); z-index: 3;
          width: 34px; height: 34px; border-radius: 50%; background: #fff; border: 1px solid var(--line);
          display: grid; place-items: center; color: var(--slate); box-shadow: var(--shadow-sm); }
        .eco3-base { display: flex; align-items: center; gap: 14px; margin-top: 24px; padding: 16px 20px;
          background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); box-shadow: var(--shadow-xs); }
        @media (max-width: 860px) {
          .eco3-grid { grid-template-columns: 1fr; gap: 28px; }
          .eco3-track { display: none; }
          .eco3-arrow { right: 50%; top: auto; bottom: -24px; transform: translateX(50%) rotate(90deg); }
          .eco3-base { flex-direction: column; align-items: flex-start; }
          .eco3-base .btn { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   INTEGRATION, industry ↔ distributor, + "Para Indústrias" door
──────────────────────────────────────────────────────────── */
function IntegrationSection() {
  const C = BU.integration;
  const feats = [
    { icon: 'truck',    t: 'Sellout consolidado', d: 'Fim dos relatórios atrasados: consolide vendas e estoques de toda a rede, produto a produto, sem depender de planilha manual.' },
    { icon: 'warehouse',t: 'Estoque na ponta',    d: 'Enxergue ruptura e excesso no canal antes que virem perda, em toda a rede.' },
    { icon: 'line',     t: 'Estratégia ponta a ponta', d: 'Decisões baseadas em fatos, não estimativas: direcione o mix, ajuste preço e expanda a cobertura sabendo o que o mercado absorve.' },
    { icon: 'link',     t: 'Conexão com qualquer ERP', d: 'Zero esforço para a sua TI: a SEWE cuida da integração de forma agnóstica. Sua equipe só recebe o dado pronto e limpo.' },
  ];
  return (
    <section id="integration" className="section" style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="bu-head reveal">
          <div>
            <div className="bu-eyebrow" style={{ color: C.ink, background: C.soft }}>
              <SMark size={16} color={C.color}/> SEWE INTEGRATION
            </div>
            <h2 style={{ marginTop: 16, fontSize: 'clamp(26px,3.2vw,38px)' }}>
              A ponte de dados entre <span style={{ color: C.color }}>indústria e distribuidor</span>.
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14, maxWidth: 560 }}>
              A SEWE Integration conecta o ERP dos seus distribuidores à indústria em tempo real, gerando uma via de
              mão dupla: inteligência estratégica para o seu negócio e eficiência operacional para o seu canal.
            </p>
          </div>
        </div>

        <div className="bu-grid">
          <div className="bu-feats">
            {feats.map((f, i) => (
              <div key={i} className="bu-feat reveal">
                <span className="bu-feat-icon" style={{ background: C.soft, color: C.ink }}>
                  <Icon name={f.icon} size={20} stroke={1.8}/>
                </span>
                <div>
                  <div className="bu-feat-t">{f.t}</div>
                  <div className="bu-feat-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Industry routing door */}
          <aside className="bu-aside reveal" style={{ background: 'linear-gradient(160deg,#0c2f17,#06250f)', '--c': C.color }}>
            <div className="bu-aside-tag" style={{ color: '#aef0c2', background: 'rgba(0,163,53,0.18)' }}>PARA INDÚSTRIAS</div>
            <h3 style={{ color: '#fff', fontSize: 24, marginTop: 14, lineHeight: 1.25 }}>Assuma o controle estratégico da sua rede de distribuição.</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginTop: 12 }}>
              Conecte seus distribuidores e acompanhe o sellout real, a cobertura e o giro de cada produto,
              da fábrica ao ponto de venda.
            </p>
            <ul className="bu-aside-list">
              {['Sellout por distribuidor e por SKU', 'Cobertura e positivação da rede', 'Ruptura no canal em tempo real'].map((x, i) => (
                <li key={i}><Icon name="check" size={16} stroke={2.4} style={{ color: C.color }}/> {x}</li>
              ))}
            </ul>
            <a href="#diagnostico" className="bu-aside-btn" style={{ background: C.color }}>
              Falar sobre a rede <Icon name="arrow" size={16} stroke={2.2}/>
            </a>
          </aside>
        </div>
      </div>
      <BUStyles/>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   SEWE SALES, sales team → B2B e-commerce + CRM
──────────────────────────────────────────────────────────── */
function SalesSection() {
  const C = BU.sales;
  const revenda = [
    { icon: 'store',   t: 'Catálogo e pedido 24/7', d: 'A revenda consulta produto, estoque e preço e faz o pedido sozinha, a qualquer hora.' },
    { icon: 'dollar',  t: 'Limite de crédito na hora', d: 'Cada cliente enxerga o próprio limite e compra dentro da política, sem ligar pro financeiro.' },
    { icon: 'sparkle', t: 'Descoberta de produtos', d: 'Novidades e recompra inteligente: o portal sugere itens que fazem sentido pra cada cliente.' },
    { icon: 'target',  t: 'Ações e promoções', d: 'Campanhas, combos e incentivos comerciais aparecem na hora certa, por carteira.' },
  ];
  const vendedor = [
    { icon: 'trending', t: 'Insights de venda', d: 'O sistema sugere a próxima ação: quem reativar, o que oferecer e onde há espaço pra crescer.' },
    { icon: 'users',    t: 'Carteira sob controle', d: 'Cada vendedor com a carteira organizada, histórico do cliente e metas na palma da mão.' },
    { icon: 'check',    t: 'Atividades e agenda', d: 'Crie visitas, follow-ups e tarefas e acompanhe a execução do time em tempo real.' },
    { icon: 'chart',    t: 'CRM Sewe + BI', d: 'A venda que acontece no portal já volta como dado pro BI, virando decisão.' },
  ];
  const chain = [
    { icon: 'warehouse', k: 'Distribuidor + vendedor', d: 'gerencia e impulsiona' },
    { icon: 'store',     k: 'Revenda + cliente final', d: 'compra e recompra' },
  ];
  return (
    <section id="sales" className="section" style={{ background: 'var(--bg-soft)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="bu-head reveal">
          <div>
            <div className="bu-eyebrow" style={{ color: C.ink, background: C.soft }}>
              <SMark size={16} color={C.color}/> SEWE SALES
            </div>
            <h2 style={{ marginTop: 16, fontSize: 'clamp(26px,3.2vw,38px)' }}>
              O elo entre você e a sua <span style={{ color: C.color }}>revenda</span>.
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14, maxWidth: 640 }}>
              Um e-commerce B2B com CRM que liga a sua revenda à sua operação. O cliente compra sozinho
              e o vendedor vende melhor, com o dado correndo de ponta a ponta.
            </p>
          </div>
        </div>

        {/* connectivity chain */}
        <div className="sx-chain reveal">
          {chain.map((c, i) => (
            <React.Fragment key={c.k}>
              <div className="sx-node">
                <span className="sx-node-icon"><Icon name={c.icon} size={22} stroke={1.8}/></span>
                <div className="sx-node-k">{c.k}</div>
                <div className="sx-node-d">{c.d}</div>
              </div>
              {i < chain.length - 1 && <span className="sx-node-link" aria-hidden><Icon name="link" size={16} stroke={2}/></span>}
            </React.Fragment>
          ))}
          <div className="sx-chain-cap">Sewe Sales conecta os dois</div>
        </div>

        {/* two audiences */}
        <div className="sx-cols">
          <div className="sx-col reveal">
            <div className="sx-col-h"><Icon name="store" size={18} stroke={2}/> Para a revenda e o cliente</div>
            <div className="sx-feats">
              {revenda.map((f, i) => (
                <div key={i} className="sx-feat">
                  <span className="sx-feat-icon"><Icon name={f.icon} size={18} stroke={1.8}/></span>
                  <div><div className="sx-feat-t">{f.t}</div><div className="sx-feat-d">{f.d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="sx-col reveal">
            <div className="sx-col-h"><Icon name="users" size={18} stroke={2}/> Para o vendedor e o distribuidor</div>
            <div className="sx-feats">
              {vendedor.map((f, i) => (
                <div key={i} className="sx-feat">
                  <span className="sx-feat-icon"><Icon name={f.icon} size={18} stroke={1.8}/></span>
                  <div><div className="sx-feat-t">{f.t}</div><div className="sx-feat-d">{f.d}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BUStyles/>
      <style>{`
        .sx-chain { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; margin:8px 0 40px; padding:22px 20px; background:#fff; border:1px solid var(--line); border-radius:var(--r-lg); box-shadow:var(--shadow-xs); position:relative; }
        .sx-node { display:flex; flex-direction:column; align-items:center; text-align:center; padding:6px 22px; }
        .sx-node-icon { width:46px; height:46px; border-radius:12px; display:grid; place-items:center; background:${C.soft}; color:${C.ink}; margin-bottom:10px; }
        .sx-node-k { font-family:var(--ff-display); font-weight:700; font-size:15px; color:var(--navy-900); }
        .sx-node-d { font-size:12px; color:var(--text-3); margin-top:3px; }
        .sx-node-link { color:${C.color}; margin:0 6px; align-self:flex-start; margin-top:18px; }
        .sx-chain-cap { position:absolute; bottom:-11px; left:50%; transform:translateX(-50%); background:${C.color}; color:#fff; font-family:var(--ff-mono); font-size:10.5px; font-weight:600; letter-spacing:.08em; padding:3px 12px; border-radius:999px; white-space:nowrap; }
        .sx-cols { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .sx-col { background:#fff; border:1px solid var(--line); border-radius:var(--r-lg); padding:24px; box-shadow:var(--shadow-xs); }
        .sx-col-h { display:flex; align-items:center; gap:9px; font-family:var(--ff-display); font-weight:700; font-size:15px; color:${C.ink}; padding-bottom:14px; margin-bottom:16px; border-bottom:1px solid var(--line-2); }
        .sx-feats { display:grid; gap:16px; }
        .sx-feat { display:flex; gap:12px; }
        .sx-feat-icon { width:36px; height:36px; border-radius:9px; background:${C.soft}; color:${C.ink}; display:grid; place-items:center; flex-shrink:0; }
        .sx-feat-t { font-family:var(--ff-display); font-weight:700; font-size:14.5px; color:var(--navy-900); }
        .sx-feat-d { font-size:13px; color:var(--text-2); line-height:1.5; margin-top:3px; }
        .sx-industry { display:grid; grid-template-columns:1.2fr 1fr; gap:28px; align-items:center; margin-top:20px; padding:30px; border-radius:var(--r-xl); background:linear-gradient(160deg,#3a1c05,#27160a); }
        .sx-ind-tag { display:inline-block; padding:5px 12px; border-radius:999px; font-family:var(--ff-mono); font-size:11px; font-weight:700; letter-spacing:.1em; color:#ffd2a8; background:rgba(253,112,20,0.2); }
        .sx-ind-h { color:#fff; font-size:24px; margin-top:14px; line-height:1.25; }
        .sx-ind-p { color:rgba(255,255,255,0.72); font-size:15px; margin-top:12px; line-height:1.55; }
        .sx-ind-list { display:grid; gap:10px; }
        .sx-ind-li { display:flex; align-items:center; gap:10px; color:rgba(255,255,255,0.9); font-size:14.5px; }
        .sx-ind-li svg { color:${C.color}; flex-shrink:0; }
        @media (max-width:860px){ .sx-cols{grid-template-columns:1fr;} .sx-industry{grid-template-columns:1fr; gap:20px;} .sx-node{padding:6px 10px;} .sx-node-link{display:none;} }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   MINERCONECT teaser, routes to its own page
──────────────────────────────────────────────────────────── */
function MinerTeaser() {
  return (
    <section className="section-sm" style={{ background: 'linear-gradient(135deg,#1a2440,#0e1830)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: .5,
        backgroundImage: 'radial-gradient(600px 300px at 85% 20%, rgba(245,166,35,0.14), transparent 60%)' }}/>
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <MinerLogo height={46}/>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '.14em', color: '#f5b94a', fontWeight: 600, textTransform: 'uppercase' }}>Produto à parte</div>
          <h3 style={{ color: '#fff', fontSize: 22, marginTop: 8, lineHeight: 1.3 }}>
            Comunicação com IA e WhatsApp oficial para falar com toda a sua base.
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14.5, marginTop: 8, maxWidth: 620 }}>
            Marketing, convites, parabenização e ações comerciais, com identificação automática do
            contato certo de cada lead. Para distribuidores, indústrias e qualquer empresa.
          </p>
        </div>
        <a href="minerconect.html" className="btn btn-lg" style={{ background: '#f5a623', color: '#1a2440', fontWeight: 700 }}>
          Conhecer o MinerConect <span className="chev">→</span>
        </a>
      </div>
    </section>
  );
}

function BUStyles() {
  return (
    <style>{`
      .bu-head { margin-bottom: 36px; }
      .bu-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 10px;
        border-radius: 999px; font-family: var(--ff-display); font-weight: 700; font-size: 12.5px; letter-spacing: .06em; }
      .bu-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: start; }
      .bu-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .bu-feat { display: flex; gap: 14px; padding: 20px; background: #fff; border: 1px solid var(--line);
        border-radius: var(--r-lg); box-shadow: var(--shadow-xs); }
      .bu-feat-icon { width: 42px; height: 42px; border-radius: 11px; display: grid; place-items: center; flex-shrink: 0; }
      .bu-feat-t { font-family: var(--ff-display); font-weight: 700; font-size: 16px; color: var(--navy-900); }
      .bu-feat-d { font-size: 13.5px; color: var(--text-2); line-height: 1.55; margin-top: 5px; }
      .bu-aside { border-radius: var(--r-xl); padding: 28px; position: relative; overflow: hidden; }
      .bu-aside-tag { display: inline-block; padding: 5px 12px; border-radius: 999px; font-family: var(--ff-mono);
        font-size: 11px; font-weight: 700; letter-spacing: .1em; }
      .bu-aside-list { list-style: none; padding: 0; margin: 18px 0 24px; display: grid; gap: 10px; }
      .bu-aside-list li { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.85); font-size: 14.5px; }
      .bu-aside-btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 22px; border-radius: 999px;
        color: #fff; font-weight: 700; font-size: 15px; transition: transform .15s ease, filter .15s ease; }
      .bu-aside-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
      @media (max-width: 860px) {
        .bu-grid { grid-template-columns: 1fr; }
        .bu-feats { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}

Object.assign(window, { ConnectedEcosystem, IntegrationSection, SalesSection, MinerTeaser });

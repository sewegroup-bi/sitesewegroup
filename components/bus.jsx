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

// Celular reto entre as duas colunas: catálogo do cliente em cima,
// visão de metas do vendedor embaixo — o mesmo app para os dois.
function SalesPhone() {
  const c = BU.sales.color;
  const ink = BU.sales.ink;
  return (
    <div className="sxp-wrap">
      <div className="sxp-phone">
        <div className="sxp-notch"></div>
        <div className="sxp-topbar">
          <span className="sxp-logo">SEWE SALES</span>
          <span className="sxp-live">● online</span>
        </div>

        <div className="sxp-mode"><Icon name="store" size={11} stroke={2}/> Visão da revenda</div>
        <div className="sxp-product">
          <div className="sxp-thumb" style={{ backgroundImage: 'url(https://picsum.photos/seed/racaosewe/80/80)' }}></div>
          <div className="sxp-pinfo">
            <div className="sxp-pname">Ração Premier 15kg</div>
            <div className="sxp-pprice">R$ 45,00 <span>un.</span></div>
          </div>
          <div className="sxp-stepper"><span>–</span><b>2</b><span>+</span></div>
        </div>
        <div className="sxp-credit">
          <div className="sxp-credit-l"><span>Limite disponível</span><b>R$ 12,5K</b></div>
          <div className="sxp-credit-bar"><i style={{ width: '62%' }}></i></div>
        </div>

        <div className="sxp-divider"><span><Icon name="link" size={11} stroke={2}/> mesmo app</span></div>

        <div className="sxp-mode"><Icon name="users" size={11} stroke={2}/> Visão do vendedor</div>
        <div className="sxp-meta">
          <div className="sxp-meta-h"><span>Meta do mês</span><b>82%</b></div>
          <div className="sxp-meta-bar"><i style={{ width: '82%' }}></i></div>
        </div>
        <div className="sxp-insight">
          <span className="sxp-insight-tag">Próxima ação</span>
          <div className="sxp-insight-t">Reativar Pet Center Sul · sem pedido há 34 dias</div>
        </div>

        <div className="sxp-tabbar">
          <span className="on"><Icon name="store" size={14} stroke={1.8}/></span>
          <span><Icon name="boxes" size={14} stroke={1.8}/></span>
          <span><Icon name="trending" size={14} stroke={1.8}/></span>
          <span><Icon name="users" size={14} stroke={1.8}/></span>
        </div>
      </div>
      <style>{`
        .sxp-wrap { position:relative; display:flex; justify-content:center; }
        .sxp-wrap::before { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:280px; height:280px; border-radius:50%;
          background:radial-gradient(circle, color-mix(in srgb, ${c} 15%, transparent), transparent 70%); }
        .sxp-phone { position:relative; width:228px; box-sizing:border-box; background:#fff;
          border:2.5px solid var(--navy-900); border-radius:34px; padding:16px 14px 14px;
          box-shadow:var(--shadow-lg); display:flex; flex-direction:column; }
        .sxp-notch { width:44px; height:5px; border-radius:99px; background:var(--line); margin:0 auto 12px; }
        .sxp-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .sxp-logo { font-family:'Chakra Petch'; font-weight:700; font-size:10px; letter-spacing:0.08em; color:var(--navy-900); }
        .sxp-live { font-size:8.5px; color:var(--success); font-weight:600; }
        .sxp-mode { display:inline-flex; align-items:center; gap:5px; font-family:var(--ff-mono); font-size:8.5px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:${ink}; background:${BU.sales.soft}; border-radius:999px; padding:3px 9px; margin-bottom:8px; align-self:flex-start; }
        .sxp-product { display:flex; align-items:center; gap:9px; border:1px solid var(--line); border-radius:11px; padding:8px; margin-bottom:8px; }
        .sxp-thumb { width:36px; height:36px; border-radius:8px; background-size:cover; background-position:center; border:1px solid var(--line); flex-shrink:0; }
        .sxp-pinfo { flex:1; min-width:0; }
        .sxp-pname { font-size:10px; color:var(--navy-900); font-weight:600; }
        .sxp-pprice { font-family:'Chakra Petch'; font-weight:700; font-size:12px; color:var(--navy-900); margin-top:2px; }
        .sxp-pprice span { font-size:8.5px; color:var(--text-3); font-weight:400; }
        .sxp-stepper { display:flex; align-items:center; gap:6px; background:var(--bg-soft); border:1px solid var(--line); border-radius:8px; padding:3px 7px; font-size:10.5px; color:var(--navy-900); }
        .sxp-credit { border:1px solid var(--line); border-radius:11px; padding:8px 10px; margin-bottom:4px; }
        .sxp-credit-l { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:6px; }
        .sxp-credit-l span { font-size:9px; color:var(--text-3); }
        .sxp-credit-l b { font-family:'Chakra Petch'; font-size:11.5px; color:var(--navy-900); }
        .sxp-credit-bar, .sxp-meta-bar { height:5px; border-radius:99px; background:var(--bg-soft); overflow:hidden; }
        .sxp-credit-bar i { display:block; height:100%; border-radius:99px; background:var(--success); }
        .sxp-divider { display:flex; align-items:center; gap:8px; margin:10px 0; color:var(--text-3); }
        .sxp-divider::before, .sxp-divider::after { content:''; flex:1; height:1px; background:var(--line); }
        .sxp-divider span { display:inline-flex; align-items:center; gap:4px; font-family:var(--ff-mono); font-size:8px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${c}; }
        .sxp-meta { border:1px solid var(--line); border-radius:11px; padding:8px 10px; margin-bottom:8px; }
        .sxp-meta-h { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:6px; }
        .sxp-meta-h span { font-size:9px; color:var(--text-3); }
        .sxp-meta-h b { font-family:'Chakra Petch'; font-size:11.5px; color:${ink}; }
        .sxp-meta-bar i { display:block; height:100%; border-radius:99px; background:${c}; }
        .sxp-insight { border:1px solid var(--line); border-left:3px solid ${c}; border-radius:10px; padding:8px 10px; margin-bottom:12px; background:var(--bg-soft); }
        .sxp-insight-tag { font-family:var(--ff-mono); font-size:8px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:${ink}; }
        .sxp-insight-t { font-size:9.5px; color:var(--navy-900); line-height:1.4; margin-top:3px; }
        .sxp-tabbar { display:flex; justify-content:space-around; padding-top:9px; border-top:1px solid var(--line); color:var(--text-3); margin-top:auto; }
        .sxp-tabbar .on { color:${c}; }
      `}</style>
    </div>
  );
}

function SalesTabCard({ kind }) {
  const c = BU.sales.color;
  const ink = BU.sales.ink;
  const body = {
    ia: (
      <React.Fragment>
        <div className="sxv-h"><Icon name="sparkle" size={13} stroke={2}/> SEWE IA · BASTIDORES</div>
        {[
          ['Radar', 'Pet Center Sul esfriando · sem pedido há 34 dias', 'follow-up quente'],
          ['Oferecer', 'Linha Premium p/ Agro Boa Vista', 'alta afinidade'],
          ['Meta', 'Carteira Leste em 71% do alvo', 'reforçar rota'],
        ].map((r, i) => (
          <div key={i} className="sxv-row">
            <span className="sxv-tag">{r[0]}</span>
            <span className="sxv-txt">{r[1]}</span>
            <em className="sxv-note">{r[2]}</em>
          </div>
        ))}
      </React.Fragment>
    ),
    direta: (
      <React.Fragment>
        <div className="sxv-h"><Icon name="dollar" size={13} stroke={2}/> VENDA DIRETA · PASSO A PASSO</div>
        {[
          ['Produtos e carrinho', true],
          ['Serviços e entrega', true],
          ['Pagamento', false],
          ['Confirmação', false],
        ].map((s, i) => (
          <div key={i} className={'sxv-step' + (s[1] ? ' done' : '')}>
            <span className="sxv-step-dot">{s[1] ? '✓' : i + 1}</span>{s[0]}
          </div>
        ))}
        <div className="sxv-foot">desconto dentro do limite da filial ✓</div>
      </React.Fragment>
    ),
    carteiras: (
      <React.Fragment>
        <div className="sxv-h"><Icon name="users" size={13} stroke={2}/> CARTEIRA · KANBAN DE ATIVIDADES</div>
        {[
          ['Visita Agro Boa Vista', true],
          ['Proposta Pet Center Sul', true],
          ['Follow-up Mercado União', false],
        ].map((s, i) => (
          <div key={i} className={'sxv-step' + (s[1] ? ' done' : '')}>
            <span className="sxv-step-dot">{s[1] ? '✓' : i + 1}</span>{s[0]}
          </div>
        ))}
        <div className="sxv-meter"><span>Meta do mês · gamificação</span><b>82%</b></div>
        <div className="sxv-bar"><i style={{ width: '82%' }}></i></div>
      </React.Fragment>
    ),
    aprova: (
      <React.Fragment>
        <div className="sxv-h"><Icon name="shield" size={13} stroke={2}/> FILA DE APROVAÇÕES</div>
        <div className="sxv-row">
          <span className="sxv-tag">14% off</span>
          <span className="sxv-txt">Pedido #48211 · acima do limite do canal</span>
          <em className="sxv-note">aguarda gestor</em>
        </div>
        <div className="sxv-row">
          <span className="sxv-tag">Aprovado</span>
          <span className="sxv-txt">Pedido #48198 · 9% off, dentro da regra</span>
          <em className="sxv-note">automático</em>
        </div>
        <div className="sxv-foot">histórico completo: quem aprovou o quê</div>
      </React.Fragment>
    ),
    whats: (
      <React.Fragment>
        <div className="sxv-h"><Icon name="chat" size={13} stroke={2}/> WHATSAPP OFICIAL · META ✓</div>
        <div className="sxv-bub">Pedido <b>#48210</b> confirmado ✅ Previsão de entrega: quinta-feira.</div>
        <div className="sxv-bub">Sua nota fiscal chegou 📄</div>
        <div className="sxv-bub me">Perfeito, obrigado!</div>
        <div className="sxv-foot">conversa registrada no CRM</div>
      </React.Fragment>
    ),
    bi: (
      <React.Fragment>
        <div className="sxv-h dark"><Icon name="chart" size={13} stroke={2}/> RELATÓRIOS · TEMPO REAL</div>
        <div className="sxv-kpis">
          {[['R$ 382k', 'vendas hoje', '▲'], ['R$ 1.8k', 'ticket médio', '▲'], ['12', 'orçamentos a vencer', '!']].map((k, i) => (
            <div key={i} className="sxv-kpi"><b>{k[0]} <i>{k[2]}</i></b><span>{k[1]}</span></div>
          ))}
        </div>
        <div className="sxv-foot">o pedido da rua já está no DRE</div>
      </React.Fragment>
    ),
  }[kind];
  return (
    <div className={'sxv-card' + (kind === 'bi' ? ' sxv-dark' : '')}>
      {body}
      <style>{`
        .sxv-card { width: 100%; max-width: 320px; background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 18px; box-shadow: var(--shadow-lg); }
        .sxv-dark { background: linear-gradient(160deg, #17284e, #0b1530); border-color: #223558; }
        .sxv-h { display: flex; align-items: center; gap: 6px; font-family: var(--ff-mono); font-size: 9.5px; font-weight: 700; letter-spacing: 0.09em; color: ${ink}; margin-bottom: 12px; }
        .sxv-dark .sxv-h { color: #7ff0f1; }
        .sxv-row { display: flex; align-items: center; gap: 8px; border: 1px solid var(--line); border-left: 3px solid ${c}; border-radius: 10px; padding: 8px 10px; margin-bottom: 8px; }
        .sxv-tag { font-family: var(--ff-mono); font-size: 8.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: ${ink}; background: ${BU.sales.soft}; border-radius: 99px; padding: 2px 7px; flex-shrink: 0; }
        .sxv-txt { font-size: 11px; color: var(--navy-900); line-height: 1.35; flex: 1; }
        .sxv-note { font-style: normal; font-size: 9px; color: var(--text-3); white-space: nowrap; }
        .sxv-step { display: flex; align-items: center; gap: 9px; font-size: 12px; color: var(--text-2); border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; margin-bottom: 7px; }
        .sxv-step.done { color: var(--navy-900); background: var(--bg-soft); }
        .sxv-step-dot { width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; font-size: 10px; font-weight: 700; background: ${BU.sales.soft}; color: ${ink}; flex-shrink: 0; }
        .sxv-step.done .sxv-step-dot { background: var(--success); color: #fff; }
        .sxv-meter { display: flex; justify-content: space-between; align-items: baseline; margin-top: 12px; font-size: 10px; color: var(--text-3); }
        .sxv-meter b { font-family: 'Chakra Petch'; font-size: 13px; color: ${ink}; }
        .sxv-bar { height: 6px; border-radius: 99px; background: var(--bg-soft); overflow: hidden; margin-top: 6px; }
        .sxv-bar i { display: block; height: 100%; border-radius: 99px; background: ${c}; }
        .sxv-bub { background: #eafff2; border: 1px solid #bfe8cd; border-radius: 12px 12px 12px 4px; padding: 9px 12px; font-size: 11.5px; color: #163b26; line-height: 1.45; margin-bottom: 8px; max-width: 92%; }
        .sxv-bub.me { background: var(--bg-soft); border-color: var(--line); border-radius: 12px 12px 4px 12px; margin-left: auto; }
        .sxv-foot { font-family: var(--ff-mono); font-size: 9px; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-3); text-align: center; margin-top: 10px; }
        .sxv-dark .sxv-foot { color: rgba(174,247,247,0.75); }
        .sxv-kpis { display: grid; gap: 10px; }
        .sxv-kpi { display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 10px 12px; }
        .sxv-kpi b { font-family: 'Chakra Petch'; font-size: 18px; color: #fff; }
        .sxv-kpi b i { font-style: normal; font-size: 11px; color: #4ade80; }
        .sxv-kpi span { font-size: 10px; color: rgba(255,255,255,0.6); margin-top: 3px; }
      `}</style>
    </div>
  );
}

function SalesSection() {
  const C = BU.sales;
  const tabs = [
    { key: 'ia', label: 'Sewe IA', icon: 'sparkle',
      h: 'A inteligência que trabalha nos bastidores.',
      d: 'A IA cruza histórico, mix e frequência de compra e entrega a próxima ação pronta, direto no fluxo de quem vende.',
      feats: [
        { icon: 'sparkle', t: 'Radar de clientes esfriando', d: 'Quem parou de comprar aparece com follow-up quente sugerido e o momento certo de agir.' },
        { icon: 'boxes', t: 'Mix e cross-sell por cliente', d: 'Sugestão do produto certo com base no comportamento de clientes parecidos.' },
        { icon: 'alert', t: 'Alertas no celular', d: 'O vendedor é avisado na rua: oportunidade, risco de churn e meta em risco.' },
      ] },
    { key: 'catalogos', label: 'Catálogos & Preços', icon: 'boxes',
      h: 'O preço certo para cada cliente, sempre.',
      d: 'O preço combinado não muda no meio da negociação: catálogo por cliente, markup por filial e proteção pela vigência do orçamento.',
      feats: [
        { icon: 'boxes', t: 'Catálogo por cliente', d: 'Cada cliente vê o próprio catálogo e as próprias promoções, com precedência sobre o padrão da empresa.' },
        { icon: 'dollar', t: 'Markup por filial e canal', d: 'Mudou o custo, mudou o preço na hora, em todas as pontas de uma vez.' },
        { icon: 'lock', t: 'Preço protegido por vigência', d: 'Mudança de tabela não surpreende o cliente no meio do orçamento.' },
      ] },
    { key: 'b2b', label: 'Pedidos B2B', icon: 'store',
      h: 'Sua rede compra sozinha, você só acompanha.',
      d: 'O pedido nasce digitado: ninguém digita o mesmo pedido duas vezes, e nada chega por telefone sem preço nem estoque.',
      feats: [
        { icon: 'store', t: 'Portal de compra da rede', d: 'Catálogo, promoções e limite de crédito por revenda, com compra 24/7.' },
        { icon: 'check', t: 'Fluxo completo', d: 'Carrinho, entrega, pagamento e confirmação num só caminho, sem redigitação.' },
        { icon: 'link', t: 'Histórico por filial', d: 'Numeração própria por filial e o rastro completo de cada pedido.' },
      ] },
    { key: 'direta', label: 'Venda Direta', icon: 'dollar',
      h: 'Do orçamento ao pedido aprovado, em seis passos.',
      d: 'A venda ao cliente final dentro do sistema, com margem controlada: produtos, serviços, entrega e pagamento num passo a passo guiado.',
      feats: [
        { icon: 'check', t: 'Passo a passo guiado', d: 'Produtos, carrinho, serviços, entrega, pagamento e confirmação, sem etapa esquecida.' },
        { icon: 'shield', t: 'Desconto sempre no limite', d: 'Capado ao limite da filial; acima disso, vai automaticamente para aprovação.' },
        { icon: 'clock', t: 'Status claros', d: 'Rascunho, aguardando confirmação, aprovado ou perdido: todo mundo sabe onde a venda está.' },
      ] },
    { key: 'carteiras', label: 'Carteiras & Atividades', icon: 'users',
      h: 'Cada vendedor com a sua carteira, e motivo para bater meta.',
      d: 'Carteiras por filial com gamificação de metas e kanban de atividades: a gestão vê o funil inteiro sem pedir relatório a ninguém.',
      feats: [
        { icon: 'users', t: 'Carteira por vendedor', d: 'Cada um enxerga só a própria carteira, com clientes estratégicos marcados.' },
        { icon: 'trophy', t: 'Gamificação de metas', d: 'Metas, radar de churn e follow-up quente: motivo diário para vender mais.' },
        { icon: 'calendar', t: 'Kanban com auditoria', d: 'Visitas, tarefas e follow-ups organizados e mensuráveis, com histórico completo.' },
      ] },
    { key: 'aprova', label: 'Aprovações', icon: 'shield',
      h: 'A política comercial da empresa, aplicada pelo sistema.',
      d: 'Desconto combinado no corredor e margem descoberta no fim do mês acabam aqui: a regra da diretoria vale em 100% dos pedidos.',
      feats: [
        { icon: 'shield', t: 'Regras por gatilho', d: 'Desconto acima do limite do canal dispara aprovação automaticamente.' },
        { icon: 'check', t: 'Fila com justificativa', d: 'Cada aprovação com contexto, justificativa e histórico de quem decidiu o quê.' },
        { icon: 'users', t: 'Roteamento por papel', d: 'O que é do gestor não passa por cima dele, e o vendedor não trava esperando.' },
      ] },
    { key: 'whats', label: 'WhatsApp Oficial', icon: 'chat',
      h: 'A conversa onde o seu cliente já está.',
      d: 'Integração oficial com a API da Meta: confirmações, campanhas e atendimento pelo WhatsApp, com tudo registrado no CRM.',
      feats: [
        { icon: 'chat', t: 'API oficial da Meta', d: 'Número verificado e conversas dentro das políticas do WhatsApp, sem risco de bloqueio.' },
        { icon: 'zap', t: 'Pedido e status automáticos', d: 'Confirmação de pedido, faturamento e entrega chegam ao cliente sem ninguém digitar.' },
        { icon: 'link', t: 'Registrado no CRM', d: 'Cada conversa vira histórico do cliente: contexto completo para o vendedor e para a gestão.' },
      ] },
    { key: 'bi', label: 'Relatórios & BI', icon: 'chart',
      h: 'Decisão com número, não com impressão.',
      d: 'KPIs, curva ABC e análise de carteira, e o diferencial Sewe: tudo nativo do BI, com a venda da rua caindo no DRE na hora.',
      feats: [
        { icon: 'chart', t: 'KPIs comerciais prontos', d: 'Vendas, clientes ativos, ticket médio e orçamentos a vencer, por vendedor, filial e período.' },
        { icon: 'boxes', t: 'Curva ABC e carteira', d: 'O que vende, para quem e com que margem, sem montar planilha.' },
        { icon: 'brain', t: 'Nativo do BI Sewe', d: 'O pedido fechado na rua atualiza margem, DRE e previsão de caixa em tempo real.' },
      ] },
  ];
  const facts = [
    { icon: 'users', t: 'Implantação conduzida de ponta a ponta', d: 'Catálogos, usuários, regras e integração com ERP configurados com o nosso time.' },
    { icon: 'link', t: 'Venda digital em um único fluxo', d: 'Portal B2B, força de vendas, propostas, pedidos e aprovações na mesma operação.' },
    { icon: 'shield', t: 'Política comercial aplicada na origem', d: 'Preços, descontos e limites validados antes de o pedido ser confirmado.' },
    { icon: 'lock', t: 'Cada um vê só o que é seu', d: 'Segregação de dados por operação, aplicada no servidor, com rastreabilidade.' },
    { icon: 'cpu', t: 'Integrado ao ERP que você já usa', d: 'Digitalize a venda sem trocar o sistema que sustenta a operação.' },
  ];
  const [tab, setTab] = React.useState(0);
  const t = tabs[tab];
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
              <SMark size={16} color={C.color}/> ECOSSISTEMA COMERCIAL · SEWE SALES
            </div>
            <h2 style={{ marginTop: 16, fontSize: 'clamp(26px,3.2vw,38px)' }}>
              Toda a sua operação comercial — da tabela de preço ao pedido aprovado — em <span style={{ color: C.color }}>uma única plataforma</span>.
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14, maxWidth: 700 }}>
              Catálogo e preço por cliente, pedidos B2B, venda direta, carteiras, aprovações, WhatsApp oficial e relatórios,
              com a política comercial da sua empresa garantida em cada venda. E, por ser Sewe, tudo nativo do BI.
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

        {/* ecosystem tabs */}
        <div className="sx-tabs reveal">
          {tabs.map((x, i) => (
            <button key={x.key} type="button" className={'sx-tab' + (i === tab ? ' on' : '')} onClick={() => setTab(i)}>
              <Icon name={x.icon} size={15} stroke={2}/> {x.label}
            </button>
          ))}
        </div>

        <div className="sx-panel" key={t.key}>
          <div className="sx-panel-copy">
            <h3 className="sx-panel-h">{t.h}</h3>
            <p className="sx-panel-d">{t.d}</p>
            <div className="sx-feats" style={{ marginTop: 22 }}>
              {t.feats.map((f, i) => (
                <div key={i} className="sx-feat">
                  <span className="sx-feat-icon"><Icon name={f.icon} size={18} stroke={1.8}/></span>
                  <div><div className="sx-feat-t">{f.t}</div><div className="sx-feat-d">{f.d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="sx-panel-visual">
            {(t.key === 'catalogos' || t.key === 'b2b') ? <SalesPhone/> : <SalesTabCard kind={t.key === 'carteiras' ? 'carteiras' : t.key}/>}
          </div>
        </div>

        {/* barra de fatos: garantias no lugar de métricas */}
        <div className="sx-facts reveal">
          {facts.map((f, i) => (
            <div key={i} className="sx-fact">
              <span className="sx-fact-icon"><Icon name={f.icon} size={16} stroke={1.8}/></span>
              <div className="sx-fact-t">{f.t}</div>
              <div className="sx-fact-d">{f.d}</div>
            </div>
          ))}
        </div>

        {/* CTAs padronizados */}
        <div className="sx-cta reveal">
          <a href="/#agendar" className="btn btn-primary btn-lg">Peça uma demonstração</a>
          <a href="https://wa.me/5548984704389?text=Quero%20falar%20com%20um%20especialista%20sobre%20o%20SEWE%20SALES" className="btn btn-outline btn-lg">Fale com um especialista</a>
          <div className="sx-cta-micro">Demonstração guiada, sem compromisso e sem cartão de crédito.</div>
        </div>
      </div>
      <BUStyles/>
      <style>{`
        .sx-chain { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; margin:8px 0 36px; padding:22px 20px; background:#fff; border:1px solid var(--line); border-radius:var(--r-lg); box-shadow:var(--shadow-xs); position:relative; }
        .sx-node { display:flex; flex-direction:column; align-items:center; text-align:center; padding:6px 22px; }
        .sx-node-icon { width:46px; height:46px; border-radius:12px; display:grid; place-items:center; background:${C.soft}; color:${C.ink}; margin-bottom:10px; }
        .sx-node-k { font-family:var(--ff-display); font-weight:700; font-size:15px; color:var(--navy-900); }
        .sx-node-d { font-size:12px; color:var(--text-3); margin-top:3px; }
        .sx-node-link { color:${C.color}; margin:0 6px; align-self:flex-start; margin-top:18px; }
        .sx-chain-cap { position:absolute; bottom:-11px; left:50%; transform:translateX(-50%); background:${C.color}; color:#fff; font-family:var(--ff-mono); font-size:10.5px; font-weight:600; letter-spacing:.08em; padding:3px 12px; border-radius:999px; white-space:nowrap; }
        .sx-tabs { display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin:26px 0 22px; }
        .sx-tab { display:inline-flex; align-items:center; gap:7px; padding:10px 16px; border-radius:999px;
          background:#fff; border:1px solid var(--line); color:var(--navy-900);
          font-family:var(--ff-display); font-weight:600; font-size:13.5px; cursor:pointer;
          transition:all .18s ease; }
        .sx-tab:hover { border-color:${C.color}; }
        .sx-tab.on { background:${C.color}; border-color:${C.color}; color:#fff; box-shadow:0 8px 20px ${C.soft}; }
        .sx-panel { display:grid; grid-template-columns:1.15fr 0.85fr; gap:32px; align-items:center;
          background:#fff; border:1px solid var(--line); border-radius:var(--r-xl); padding:32px 36px;
          box-shadow:var(--shadow-xs); animation:sxFade .3s ease; }
        @keyframes sxFade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .sx-panel-h { font-family:var(--ff-display); font-weight:700; font-size:clamp(20px,2.2vw,26px); color:var(--navy-900); }
        .sx-panel-d { color:var(--text-2); font-size:15.5px; line-height:1.6; margin-top:10px; max-width:560px; }
        .sx-panel-visual { display:flex; justify-content:center; }
        .sx-feats { display:grid; gap:16px; }
        .sx-feat { display:flex; gap:12px; }
        .sx-feat-icon { width:36px; height:36px; border-radius:9px; background:${C.soft}; color:${C.ink}; display:grid; place-items:center; flex-shrink:0; }
        .sx-feat-t { font-family:var(--ff-display); font-weight:700; font-size:14.5px; color:var(--navy-900); }
        .sx-feat-d { font-size:13px; color:var(--text-2); line-height:1.5; margin-top:3px; }
        .sx-facts { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-top:28px; }
        .sx-fact { background:#fff; border:1px solid var(--line); border-radius:var(--r-lg); padding:16px; box-shadow:var(--shadow-xs); }
        .sx-fact-icon { width:30px; height:30px; border-radius:8px; background:${C.soft}; color:${C.ink}; display:grid; place-items:center; margin-bottom:10px; }
        .sx-fact-t { font-family:var(--ff-display); font-weight:700; font-size:13px; color:var(--navy-900); line-height:1.35; }
        .sx-fact-d { font-size:11.5px; color:var(--text-2); line-height:1.5; margin-top:5px; }
        .sx-cta { text-align:center; margin-top:34px; display:flex; flex-direction:column; align-items:center; gap:0; }
        .sx-cta .btn { margin:0 6px 12px; display:inline-flex; }
        .sx-cta { flex-direction:row; flex-wrap:wrap; justify-content:center; align-items:center; }
        .sx-cta-micro { flex-basis:100%; font-size:12px; color:var(--text-3); margin-top:2px; text-align:center; }
        @media (max-width:1100px){ .sx-facts{grid-template-columns:repeat(2,1fr);} .sx-facts .sx-fact:last-child{grid-column:span 2;} }
        @media (max-width:860px){ .sx-panel{grid-template-columns:1fr; padding:24px;} .sx-node{padding:6px 10px;} .sx-node-link{display:none;} .sx-tab{font-size:12.5px; padding:9px 13px;} }
        @media (max-width:560px){ .sx-facts{grid-template-columns:1fr;} .sx-facts .sx-fact:last-child{grid-column:auto;} }
      `}</style>
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

Object.assign(window, { ConnectedEcosystem, IntegrationSection, SalesSection });

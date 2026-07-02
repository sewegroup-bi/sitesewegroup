// Audience pages: Indústria + Soluções Sob Medida. Each mounts into its own root.
// Reuses shared sections (PageHero, IntegrationSection, DifferentiatorsSection,
// CTASection, SiteHeader/Footer) plus a few tailored blocks. Phase-1 scope:
// coherent, navigable pages; deeper build lands in phase 2.

const BU_C = {
  integration: { color: '#00a335', soft: 'rgba(0,163,53,0.08)', ink: '#0a7a2c' },
  bi:          { color: '#2d436c', soft: 'rgba(45,67,108,0.08)', ink: '#2d436c' },
  sales:       { color: '#fd7014', soft: 'rgba(253,112,20,0.09)', ink: '#c9550a' },
};

/* ── INDÚSTRIA ───────────────────────────────────────────── */
function IndustriaMap() {
  const fronts = [
    { c: BU_C.integration, icon: 'link',  step: '01', name: 'Integration', flow: 'Capta a rede',
      d: 'Sellout, estoque e curva de cada distribuidor que vende os seus produtos, produto a produto, em um só painel.' },
    { c: BU_C.bi, icon: 'brain', step: '02', name: 'BI + IA', flow: 'Transforma em decisão',
      d: 'A IA cruza os dados da rede nos bastidores e devolve cobertura, giro e ruptura no canal, com a próxima ação pronta.' },
    { c: BU_C.sales, icon: 'store', step: '03', name: 'Sales', flow: 'Ativa o canal',
      d: 'Coloque toda a rede de distribuidores vendendo no mesmo padrão, com catálogo, tabela e regras unificadas.' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 44px' }}>
          <div className="eyebrow">O ecossistema para a indústria</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Da fábrica ao PDV, <span style={{ color: 'var(--navy)' }}>uma rede visível</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>
            Três frentes conectadas trazem o que acontece na ponta de volta para a sua estratégia.
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
              <div className="im-name">SEWE {f.name}</div>
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
    { n: 'Multiseg Distribuição', uf: 'SC', sellout: 'R$ 24,1M', cov: 94, rup: 1.8, w: 100 },
    { n: 'PETSUL Atacado',        uf: 'RS', sellout: 'R$ 19,7M', cov: 91, rup: 2.2, w: 82 },
    { n: 'WMG',                   uf: 'PR', sellout: 'R$ 16,3M', cov: 88, rup: 3.1, w: 68 },
    { n: 'Eletro Transol',        uf: 'SC', sellout: 'R$ 12,9M', cov: 85, rup: 3.6, w: 54 },
    { n: 'Mocelin',               uf: 'SP', sellout: 'R$ 9,4M',  cov: 79, rup: 4.9, w: 39 },
    { n: 'KGM',                   uf: 'MG', sellout: 'R$ 7,1M',  cov: 74, rup: 5.4, w: 29 },
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

function IndustriaPage() {
  return (
    <>
      <SiteHeader/>
      <PageHero
        eyebrow="Para a Indústria"
        title="Enxergue toda a sua rede, da fábrica ao ponto de venda."
        lead="Conecte seus distribuidores e acompanhe sellout, cobertura e giro de cada produto, do CD ao PDV. A SEWE cuida da engenharia e da modelagem, você recebe a rede inteira em um só painel."
      >
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">Falar sobre a rede <Icon name="arrow" size={16} className="chev"/></a>
          <a href="https://wa.me/5548984704389" className="btn btn-outline btn-lg">WhatsApp</a>
        </div>
      </PageHero>
      <IndustriaMap/>
      <IndustriaNetworkPanel/>
      <IntegrationSection/>
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
  return (
    <>
      <SiteHeader/>
      <PageHero
        eyebrow="Soluções Sob Medida"
        title="Dados e IA muito além do BI de prateleira."
        lead="Para empresas de qualquer setor: Qlik Sense, dashboards personalizados, engenharia de dados e consultoria. Um time de tecnologia da SEWE dedicado ao seu desafio."
      >
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">Falar sobre o meu projeto <Icon name="arrow" size={16} className="chev"/></a>
          <a href="https://wa.me/5548984704389" className="btn btn-outline btn-lg">WhatsApp</a>
        </div>
      </PageHero>
      <SolucoesOfferings/>
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

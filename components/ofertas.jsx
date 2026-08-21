// Ofertas com página própria, nascidas de seções que viviam escondidas dentro
// de /industria (auditoria de copy, ago/2026):
//   /prospeccao       → Prospecção de Mercado
//   /comercio-digital → Comércio Digital B2B (camada de experiência + SEWE Sales)
//
// Depends on: brand.jsx (Icon, SMark), layout.jsx (SiteHeader/PageHero/ProofBar/SiteFooter),
// bus.jsx (SalesSection), rest.jsx (ObjectionBlock/CTASection), i18n.jsx (tr/tx/useLocale).

// Mesmo efeito de revelar-ao-rolar de audience.jsx (as seções movidas usam .reveal).
function useRevealOfertas() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    const fallback = setTimeout(() => els.forEach(el => el.classList.add('in')), 800);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
}

function IndustriaProspeccao() {
  const filtros = [tx('UF e cidade'), 'CNAE', tx('Porte'), tx('Data de abertura'), tx('Capital social'), tx('Já é cliente')];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
          <div className="eyebrow">{tx('Inteligência comercial · mercado potencial')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>{tx('Quem existe no seu mercado e')} <span style={{ color: 'var(--navy)' }}>{tx('você ainda não atende')}</span>.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Cruzamos a base pública de empresas ativas com a carteira da sua rede. O resultado é o mapa de onde a sua marca não chegou, com nome, CNPJ e endereço.')}</p>
        </div>

        <div className="pr-panel">
          <div className="pr-head">
            <span className="pr-head-l"><SMark size={16} color="var(--turquoise-2)"/> {tx('PROSPECÇÃO DE MERCADO')}</span>
            <span className="pr-chip">{tx('Recorte ilustrativo')}</span>
          </div>
          <div className="pr-body">
            <div className="pr-kpis">
              <div className="pr-kpi"><div className="pr-kpi-v tnum">455.052</div><div className="pr-kpi-l">{tx('empresas ativas no recorte')}</div></div>
              <div className="pr-kpi"><div className="pr-kpi-v tnum">13.264</div><div className="pr-kpi-l">{tx('abertas nos últimos 12 meses')}</div></div>
              <div className="pr-kpi"><div className="pr-kpi-v tnum">8,4%</div><div className="pr-kpi-l">{tx('share de positivação da rede')}</div></div>
              <div className="pr-kpi pr-kpi-hl"><div className="pr-kpi-v tnum">417 mil</div><div className="pr-kpi-l">{tx('fora da base · mercado endereçável')}</div></div>
            </div>
            <div className="pr-cols">
              <div className="pr-col">
                <div className="pr-col-h">{tx('Filtre por')}</div>
                <div className="pr-chips">{filtros.map(f => <span key={f} className="pr-f">{f}</span>)}</div>
              </div>
              <div className="pr-col">
                <div className="pr-col-h">{tx('E responda')}</div>
                <ul className="pr-ul">
                  <li>{tx('Em quais cidades existe demanda e a rede não positivou ninguém?')}</li>
                  <li>{tx('Qual distribuidor tem cobertura ociosa na própria praça?')}</li>
                  <li>{tx('Quantas empresas do seu CNAE-alvo abriram no trimestre?')}</li>
                  <li>{tx('Onde vale abrir um novo canal e onde vale reforçar o atual?')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .pr-panel { background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
        .pr-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 20px; background: linear-gradient(120deg, #15243d, #0d1a2e); }
        .pr-head-l { display: inline-flex; align-items: center; gap: 10px; font-family: var(--ff-display); font-weight: 600; font-size: 12.5px; letter-spacing: .1em; color: #fff; }
        .pr-chip { font-family: var(--ff-mono); font-size: 10px; letter-spacing: .08em; color: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.16); border-radius: 999px; padding: 3px 10px; }
        .pr-body { padding: 20px; }
        .pr-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .pr-kpi { background: #fff; border: 1px solid var(--line); border-radius: var(--r-md); padding: 16px 18px; }
        .pr-kpi-hl { border-color: var(--turquoise-2); box-shadow: 0 0 0 1px var(--turquoise-2); }
        .pr-kpi-v { font-family: var(--ff-display); font-weight: 700; font-size: 26px; line-height: 1; color: var(--navy-900); }
        .pr-kpi-hl .pr-kpi-v { color: var(--turquoise-ink); }
        .pr-kpi-l { font-size: 11.5px; color: var(--text-2); margin-top: 8px; line-height: 1.4; }
        .pr-cols { display: grid; grid-template-columns: 1fr 1.3fr; gap: 20px; margin-top: 18px; padding-top: 18px; border-top: 1px dashed var(--line); }
        .pr-col-h { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--text-3); margin-bottom: 12px; }
        .pr-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .pr-f { padding: 7px 14px; background: #fff; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; color: var(--text-2); }
        .pr-ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
        .pr-ul li { position: relative; padding-left: 20px; font-size: 14.5px; color: var(--text); line-height: 1.5; }
        .pr-ul li::before { content: ''; position: absolute; left: 0; top: 8px; width: 7px; height: 7px; border-radius: 2px; background: var(--turquoise-2); }
        @media (max-width: 900px) { .pr-kpis { grid-template-columns: 1fr 1fr; } .pr-cols { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}


function IndustriaCamadaComercio() {
  const camadas = [
    {
      k: tx('Camada de experiência'), dono: tx('A indústria controla'), c: '#00a335', soft: 'rgba(0,163,53,0.1)',
      itens: [tx('Portfólio'), tx('Lançamentos'), tx('Preço'), tx('Tabelas específicas'), tx('Campanhas'), tx('Promoções'), tx('Segmentação'), tx('Produtos estratégicos'), tx('Recomendações')],
    },
    {
      k: tx('Camada operacional'), dono: tx('O distribuidor segue dono'), c: '#fd7014', soft: 'rgba(253,112,20,0.1)',
      itens: [tx('Estoque'), tx('Crédito'), tx('Faturamento'), tx('Separação'), tx('Logística'), tx('Entrega'), tx('Relacionamento local')],
    },
    {
      k: tx('Camada da revenda'), dono: tx('A revenda passa a ter'), c: '#2d436c', soft: 'rgba(45,67,108,0.1)',
      itens: [tx('Ambiente único'), tx('Distribuidores habilitados'), tx('Estoque'), tx('Preço e condições'), tx('Promoções'), tx('Lançamentos'), tx('Substitutos'), tx('Orçamento com precificação própria'), tx('Acompanhamento do pedido')],
    },
  ];
  return (
    <section className="section" style={{ background: 'var(--band)', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div className="cc-quote reveal">
          <div className="eyebrow">{tx('SEWE Sales · camada de comércio digital')}</div>
          <blockquote>{tx('A indústria investe em produto, marca, campanhas, canais e geração de demanda. Mas no momento em que a revenda decide comprar, a experiência fica praticamente inteira nas mãos do vendedor do distribuidor.')}</blockquote>
          <p className="cc-quote-d">{tx('Não é um e-commerce por cima do canal. É uma camada sobre a operação que já existe: a indústria recupera a experiência de compra sem tirar do distribuidor nada do que é dele.')}</p>
        </div>

        <div className="cc-stack">
          {camadas.map((c, i) => (
            <div key={i} className="cc-row reveal" style={{ '--c': c.c, '--cs': c.soft }}>
              <div className="cc-rail">
                <div className="cc-k">{c.k}</div>
                <div className="cc-dono">{c.dono}</div>
              </div>
              <div className="cc-items">
                {c.itens.map(it => <span key={it} className="cc-it">{it}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="cc-foot reveal">{tx('Centraliza-se a experiência sem centralizar a operação.')}</div>
      </div>
      <style>{`
        .cc-quote { max-width: 860px; margin: 0 auto 40px; text-align: center; }
        .cc-quote blockquote { margin: 18px 0 0; font-family: var(--ff-display); font-weight: 600; font-size: clamp(20px, 2.6vw, 30px); line-height: 1.35; color: var(--navy-900); }
        .cc-quote-d { font-size: 16px; color: var(--text-2); line-height: 1.65; margin-top: 18px; }
        .cc-stack { display: grid; gap: 12px; }
        .cc-row { display: grid; grid-template-columns: 230px 1fr; gap: 20px; align-items: center; background: #fff; border: 1px solid var(--line); border-left: 3px solid var(--c); border-radius: var(--r-lg); padding: 20px 24px; box-shadow: var(--shadow-xs); }
        .cc-k { font-family: var(--ff-mono); font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--c); }
        .cc-dono { font-family: var(--ff-display); font-weight: 700; font-size: 17px; color: var(--navy-900); margin-top: 6px; line-height: 1.25; }
        .cc-items { display: flex; flex-wrap: wrap; gap: 8px; }
        .cc-it { padding: 7px 14px; background: var(--cs); border: 1px solid color-mix(in srgb, var(--c) 22%, transparent); border-radius: 8px; font-size: 13px; color: var(--text); }
        .cc-foot { text-align: center; font-family: var(--ff-display); font-weight: 700; font-size: clamp(18px, 2vw, 23px); color: var(--navy-900); margin-top: 30px; }
        @media (max-width: 860px) { .cc-row { grid-template-columns: 1fr; gap: 14px; } }
      `}</style>
    </section>
  );
}


/* ── /prospeccao ─────────────────────────────────────────────────────────────
   O que a oferta entrega, em três passos, usando só o que já era afirmado na
   seção original: base pública × carteira da rede → mapa com nome e endereço. */
function ProspeccaoComoFunciona() {
  const passos = [
    { n: '01', t: tx('Lemos a carteira da sua rede'),
      d: tx('Quem cada distribuidor já atende hoje, direto do ERP, sem planilha no meio.') },
    { n: '02', t: tx('Cruzamos com a base pública de empresas ativas'),
      d: tx('Filtrada pelo perfil que interessa: CNAE, porte, cidade, data de abertura e capital social.') },
    { n: '03', t: tx('Entregamos o mapa do que falta'),
      d: tx('As empresas que ninguém da rede positivou, com nome, CNPJ e endereço, por praça e por distribuidor.') },
  ];
  return (
    <section className="section" style={{ background: 'var(--band)', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 36 }}>
          <div className="eyebrow">{tx('Como funciona')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(26px,3.2vw,38px)' }}>{tx('Três passos, nenhum trabalho para o seu time.')}</h2>
        </div>
        <div className="pv-grid">
          {passos.map(p => (
            <div key={p.n} className="pv-card reveal">
              <div className="pv-n">{p.n}</div>
              <div className="pv-t">{p.t}</div>
              <p className="pv-d">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .pv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .pv-card { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: 26px; box-shadow: var(--shadow-sm); }
        .pv-n { font-family: var(--ff-display); font-weight: 700; font-size: 34px; color: var(--turquoise-2); line-height: 1; }
        .pv-t { font-family: var(--ff-display); font-weight: 700; font-size: 18px; color: var(--navy-900); margin-top: 10px; line-height: 1.25; }
        .pv-d { font-size: 14.5px; color: var(--text-2); line-height: 1.6; margin: 8px 0 0; }
        @media (max-width: 900px) { .pv-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function ProspeccaoPage() {
  useLocale();
  useRevealOfertas();
  return (
    <>
      <SiteHeader translated/>
      <PageHero
        eyebrow={tx('Prospecção de Mercado')}
        title={tx('O mercado que existe na sua praça e ninguém da rede atende.')}
        lead={tx('Cruzamos a base pública de empresas ativas com a carteira da sua rede e devolvemos o mapa de onde a sua marca não chegou — com nome, CNPJ e endereço.')}
      >
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">{tr('cta.primary')} <Icon name="arrow" size={16} className="chev"/></a>
          <a href="/industria" className="btn btn-outline btn-lg">{tx('Ver a solução para indústria')}</a>
        </div>
      </PageHero>
      <ProofBar/>
      <IndustriaProspeccao/>
      <ProspeccaoComoFunciona/>
      <ObjectionBlock/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── /comercio-digital ───────────────────────────────────────────────────── */
function ComercioDigitalPage() {
  useLocale();
  useRevealOfertas();
  return (
    <>
      <SiteHeader translated/>
      <PageHero
        eyebrow={tx('Comércio Digital B2B2C')}
        title={tx('A revenda compra da sua marca, no seu padrão, sem tirar nada do distribuidor.')}
        lead={tx('Uma camada de compra sobre a operação que já existe: a indústria define portfólio, preço e campanha; o distribuidor segue dono do crédito, do faturamento e da entrega.')}
      >
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">{tr('cta.primary')} <Icon name="arrow" size={16} className="chev"/></a>
          <a href="/industria" className="btn btn-outline btn-lg">{tx('Ver a solução para indústria')}</a>
        </div>
      </PageHero>
      <ProofBar/>
      <IndustriaCamadaComercio/>
      <SalesSection audience="industria"/>
      <ObjectionBlock/>
      <CTASection/>
      <SiteFooter/>
    </>
  );
}

/* ── mount ───────────────────────────────────────────────── */
SEWE_I18N_READY.then(function mountOfertas() {
  const map = { 'prospeccao-root': ProspeccaoPage, 'comercio-digital-root': ComercioDigitalPage };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) ReactDOM.createRoot(el).render(React.createElement(map[id]));
  });
});

Object.assign(window, { ProspeccaoPage, ComercioDigitalPage });

// Home landing — audience-first. High-level positioning of SEWE as a technology
// & AI company (reference in Brazil), then a 3-door chooser that routes each
// visitor to the page built for them: Indústria, Distribuidor, Soluções Sob Medida.
// Depends on: brand.jsx (Icon). Exposes: HomeLanding.

const WA = 'https://wa.me/5548984704389';

function HomePositioning() {
  return (
    <section className="hp" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hp-copy reveal in">
          <h1 className="display hp-h1">
            A tecnologia de dados e IA que vira <span className="hp-hl">decisão</span>.
          </h1>
        </div>
      </div>
    </section>
  );
}

function AudienceChooser() {
  const doors = [
    {
      icon: 'factory', kicker: 'Sou indústria',
      title: 'Enxergue toda a sua rede',
      desc: 'Do sellout ao PDV: Integration, BI e Sales conectando fábrica, distribuidor e revenda em um só mapa.',
      cta: 'Ver o ecossistema', href: 'industria.html',
    },
    {
      icon: 'warehouse', kicker: 'Sou distribuidor',
      title: 'Decida com o dado na mão',
      desc: 'Menos ruptura, mais positivação, capital de giro livre. BI, IA e Sales sob medida para a sua operação.',
      cta: 'Ver soluções', href: 'distribuidor.html',
    },
    {
      icon: 'cpu', kicker: 'Outra empresa · Projeto',
      title: 'Projetos de dados sob medida',
      desc: 'Qlik Sense, dashboards personalizados e consultoria de dados para o seu desafio específico.',
      cta: 'Ver soluções', href: 'solucoes.html',
    },
  ];
  return (
    <section id="escolha" className="section" style={{ position: 'relative', paddingTop: 'clamp(16px, 2vw, 28px)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 44px' }}>
          <div className="eyebrow">Por onde você começa</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Qual o perfil da sua empresa?
          </h2>
        </div>

        <div className="hc-grid">
          {doors.map(d => (
            <a key={d.href} href={d.href} className="hc-card card-hover reveal">
              <span className="hc-icon"><Icon name={d.icon} size={26} stroke={1.7}/></span>
              <div className="hc-kicker">{d.kicker}</div>
              <div className="hc-title">{d.title}</div>
              <p className="hc-desc">{d.desc}</p>
              <span className="hc-cta">{d.cta} <Icon name="arrow" size={16} stroke={2}/></span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .hc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .hc-card {
          display: flex; flex-direction: column; background: #fff;
          border: 1px solid var(--line); border-top: 3px solid var(--navy-900); border-radius: var(--r-lg);
          padding: 30px 26px; box-shadow: var(--shadow-sm); transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .hc-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-top-color: var(--turquoise-2); }
        .hc-icon {
          width: 54px; height: 54px; border-radius: 14px; display: grid; place-items: center;
          background: rgba(117,227,228,0.14); color: var(--turquoise-ink); margin-bottom: 20px;
        }
        .hc-kicker { font-family: var(--ff-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--turquoise-ink); margin-bottom: 8px; }
        .hc-title { font-family: var(--ff-display); font-weight: 700; font-size: 22px; color: var(--navy-900); margin-bottom: 10px; }
        .hc-desc { font-size: 14.5px; color: var(--text-2); line-height: 1.6; flex: 1; }
        .hc-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 22px; font-family: var(--ff-display); font-weight: 600; font-size: 15px; color: var(--navy-900); }
        .hc-card:hover .hc-cta { color: var(--turquoise-ink); }
        @media (max-width: 900px) { .hc-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function TrustBand() {
  const items = [
    { icon: 'trophy', t: 'Parceiro oficial Qlik', d: 'Analytics líder global, homologação e suporte local.' },
    { icon: 'star',   t: 'Prêmio SEWE',           d: 'Reconhecendo os distribuidores mais data-driven do país.', href: 'premio.html' },
    { icon: 'shield', t: 'LGPD por projeto',       d: 'Dados cifrados, auditáveis e hospedados no Brasil.' },
  ];
  return (
    <section className="section-sm" style={{ background: '#fff' }}>
      <div className="container">
        <div className="tb-grid">
          {items.map((it, i) => {
            const inner = (
              <>
                <span className="tb-icon"><Icon name={it.icon} size={20} stroke={1.8}/></span>
                <div>
                  <div className="tb-t">{it.t}{it.href && <Icon name="arrow" size={13} stroke={2} style={{ marginLeft: 6, verticalAlign: 'middle' }}/>}</div>
                  <div className="tb-d">{it.d}</div>
                </div>
              </>
            );
            return it.href
              ? <a key={i} href={it.href} className="tb-item tb-link">{inner}</a>
              : <div key={i} className="tb-item">{inner}</div>;
          })}
        </div>
      </div>
      <style>{`
        .tb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .tb-item { display: flex; gap: 14px; align-items: flex-start; padding: 18px 20px; background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--r-md); }
        .tb-link { transition: border-color .2s ease, transform .2s ease; }
        .tb-link:hover { border-color: var(--turquoise-2); transform: translateY(-2px); }
        .tb-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(45,67,108,0.08); color: var(--navy-700); display: grid; place-items: center; flex-shrink: 0; }
        .tb-t { font-family: var(--ff-display); font-weight: 700; font-size: 15px; color: var(--navy-900); }
        .tb-d { font-size: 13px; color: var(--text-2); line-height: 1.5; margin-top: 4px; }
        @media (max-width: 780px) { .tb-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function HomeLanding() {
  return (
    <>
      <div className="home-top" style={{ position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, background: `
          radial-gradient(1100px 520px at 82% -8%, rgba(117,227,228,0.16), transparent 60%),
          radial-gradient(820px 480px at 8% 42%, rgba(117,227,228,0.07), transparent 60%),
          linear-gradient(180deg, #ffffff 0%, #fafbfd 100%)` }}/>
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
          backgroundImage: 'linear-gradient(var(--line-2) 1px, transparent 1px), linear-gradient(90deg, var(--line-2) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 95% 88% at 55% 34%, black 62%, transparent 96%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 88% at 55% 34%, black 62%, transparent 96%)' }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HomePositioning/>
          <AudienceChooser/>
        </div>
      </div>
      <CTASection/>
    </>
  );
}

// hero-scoped styles
(function injectHomeStyles() {
  if (document.getElementById('hp-styles')) return;
  const s = document.createElement('style');
  s.id = 'hp-styles';
  s.textContent = `
    .hp { padding: clamp(56px, 7vw, 92px) 0 clamp(20px, 2.5vw, 32px); }
    .hp-copy { max-width: 900px; margin: 0 auto; text-align: center; }
    .hp-partner {
      display: inline-flex; align-items: center; gap: 9px; padding: 7px 16px; border-radius: 999px;
      background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow-xs);
      font-size: 12.5px; color: var(--text-2); font-weight: 500; margin-bottom: 26px;
    }
    .hp-h1 { font-size: clamp(38px, 5vw, 68px); line-height: 1.04; }
    .hp-hl {
      background: linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 36%, var(--turquoise-ink) 100%);
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hp-lead { color: var(--text-2); font-size: 19px; line-height: 1.6; margin: 24px auto 0; max-width: 680px; }
    .hp-cta { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 34px; flex-wrap: wrap; }
  `;
  document.head.appendChild(s);
})();

Object.assign(window, { HomeLanding });

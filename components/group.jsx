// Sewe Group opener — group-level, technology-company framing above the BI hero.
// Light/white treatment (matches the other pages). High-level positioning only:
// SEWE as a data-technology company, a reference in Brazil — the visitor goes
// deeper into the ecosystem further down the page. Keeps the BI hero intact below.
// Depends on: brand.jsx (Icon). Exposes: SeweGroupIntro.

function SeweGroupIntro() {
  const proof = [
    { v: '+R$ 5 Bi', l: 'faturamento monitorado' },
    { v: '+500', l: 'distribuidores atendidos' },
    { v: '+10 mil', l: 'horas de engenharia' },
    { v: 'Nacional', l: 'cobertura em todo o Brasil' },
  ];

  return (
    <section id="grupo" className="grp" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* backdrop: white + faint turquoise glow + subtle grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(1000px 460px at 82% -20%, rgba(117,227,228,0.14), transparent 62%),
          linear-gradient(180deg, #ffffff 0%, #fafbfd 100%)
        `,
      }}/>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(var(--line-2) 1px, transparent 1px), linear-gradient(90deg, var(--line-2) 1px, transparent 1px)',
        backgroundSize: '58px 58px',
        maskImage: 'radial-gradient(ellipse 78% 80% at 50% 20%, black 30%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 78% 80% at 50% 20%, black 30%, transparent 78%)',
      }}/>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grp-copy reveal in">
          <h1 className="display grp-h1">
            A tecnologia de dados que move todo o <span className="grp-hl">ecossistema de distribuição</span>.
          </h1>
          <p className="grp-lead">
            A SEWE é um grupo de tecnologia que conecta indústria, distribuidor e revenda em uma só
            inteligência, dados, IA aplicada e a plataforma de BI trabalhando por trás de cada decisão da cadeia.
          </p>

          <div className="grp-cta">
            <a href="/quem-somos" className="btn btn-primary btn-lg">
              Conheça o grupo <Icon name="arrow" size={16} className="chev"/>
            </a>
            <a href="#diagnostico" className="btn btn-outline btn-lg">
              Falar com a SEWE
            </a>
          </div>
        </div>

        {/* proof strip */}
        <div className="grp-proof reveal">
          {proof.map((p, i) => (
            <div key={i} className="grp-proof-item">
              <div className="grp-proof-v">{p.v}</div>
              <div className="grp-proof-l">{p.l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .grp { padding: clamp(60px, 7.5vw, 96px) 0 clamp(40px, 5vw, 60px); }
        .grp-copy { max-width: 900px; margin: 0 auto; text-align: center; }
        .grp-h1 { font-size: clamp(32px, 4.2vw, 54px); line-height: 1.07; }
        .grp-hl {
          background: linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 38%, var(--turquoise-ink) 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .grp-lead { color: var(--text-2); font-size: 18px; line-height: 1.6; margin: 22px auto 0; max-width: 660px; }
        .grp-cta { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 32px; flex-wrap: wrap; }

        /* proof strip */
        .grp-proof {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
          margin-top: 56px; padding-top: 34px; border-top: 1px solid var(--line);
        }
        .grp-proof-item { text-align: center; }
        .grp-proof-v { font-family: var(--ff-display); font-weight: 700; font-size: clamp(24px, 2.6vw, 32px); color: var(--navy-900); line-height: 1; }
        .grp-proof-l { font-size: 13px; color: var(--text-3); margin-top: 8px; }

        @media (max-width: 900px) {
          .grp-proof { grid-template-columns: 1fr 1fr; gap: 26px 18px; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { SeweGroupIntro });

// Distribuidor page — inherits the full product experience (formerly the home):
// BI hero, connected ecosystem, Integration, BI operating stage, Suites, Sales,
// maturity, MinerConect teaser, differentiators, cases, FAQ, CTA. Mounts into
// #distribuidor-root. Carries the Tweaks panel (hero headline + ecosystem motion).

function TweaksPanel({ state, setState, active, onClose }) {
  if (!active) return null;
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 60,
      width: 300, background: '#fff', border: '1px solid var(--line)',
      borderRadius: 14, boxShadow: 'var(--shadow-lg)', padding: 16,
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 14, color: 'var(--navy-900)', letterSpacing: '0.04em' }}>TWEAKS</div>
        <button onClick={onClose} style={{ width: 24, height: 24, borderRadius: 6, color: 'var(--text-2)' }} aria-label="Close">
          <Icon name="plus" size={14} style={{ transform: 'rotate(45deg)' }}/>
        </button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Operação ao vivo</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[
          { k: true,  l: 'Animada' },
          { k: false, l: 'Estática' },
        ].map(o => (
          <button key={String(o.k)} onClick={() => setState({ ...state, ecosystemAnimated: o.k })}
            style={{
              padding: '10px 12px', textAlign: 'center',
              background: state.ecosystemAnimated === o.k ? 'var(--navy-900)' : 'var(--bg-soft)',
              color:      state.ecosystemAnimated === o.k ? '#fff' : 'var(--text)',
              border: '1px solid ' + (state.ecosystemAnimated === o.k ? 'var(--navy-900)' : 'var(--line)'),
              borderRadius: 8, fontSize: 13, fontWeight: 500,
              cursor: 'pointer', transition: 'all .15s ease',
            }}>
            {o.l}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 16, marginBottom: 8, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hero headline</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {[
          { k: 0, l: 'Menos ruptura. Mais positivação.' },
          { k: 1, l: 'Decisões prontas para distribuidores.' },
          { k: 2, l: 'R$ 5Bi monitorados · 30 dias go-live.' },
        ].map(o => (
          <button key={o.k} onClick={() => setState({ ...state, headlineVariant: o.k })}
            style={{
              padding: '8px 12px', textAlign: 'left',
              background: state.headlineVariant === o.k ? 'var(--navy-900)' : 'var(--bg-soft)',
              color:      state.headlineVariant === o.k ? '#fff' : 'var(--text)',
              border: '1px solid ' + (state.headlineVariant === o.k ? 'var(--navy-900)' : 'var(--line)'),
              borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function DistribuidorApp() {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "ecosystemAnimated": true,
    "headlineVariant": 0
  }/*EDITMODE-END*/;
  const [state, setState] = React.useState(DEFAULTS);
  const [tweaksActive, setTweaksActive] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode')   setTweaksActive(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksActive(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const applySet = (next) => {
    setState(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*'); } catch {}
  };

  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [state.ecosystemAnimated]);

  return (
    <>
      <SiteHeader/>
      <main>
        <Hero headlineVariant={state.headlineVariant}/>
        <LogosStrip/>
        <BragBar/>
        <EcosystemSection animated={state.ecosystemAnimated}/>
        <SuitesSection/>
        <SalesSection/>
        <MaturitySection/>
        <MinerTeaser/>
        <DifferentiatorsSection/>
        <CasesSection/>
        <FAQSection/>
        <CTASection/>
      </main>
      <SiteFooter/>
      <TweaksPanel state={state} setState={applySet} active={tweaksActive} onClose={() => setTweaksActive(false)}/>
    </>
  );
}

const __distRoot = document.getElementById('distribuidor-root');
if (__distRoot) ReactDOM.createRoot(__distRoot).render(<DistribuidorApp/>);

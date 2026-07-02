// Root app for the HOME (index.html): high-level positioning + audience chooser.
// The deep product content now lives on the audience pages (distribuidor.html,
// industria.html, solucoes.html). Mounts into #sewe-root.

function App() {
  // Reveal on scroll
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteHeader home/>
      <main>
        <HomeLanding/>
      </main>
      <SiteFooter home/>
    </>
  );
}

const __seweRoot = document.getElementById('sewe-root');
if (__seweRoot) ReactDOM.createRoot(__seweRoot).render(<App/>);

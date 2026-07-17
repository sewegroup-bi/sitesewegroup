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
    const fallback = setTimeout(() => els.forEach(el => el.classList.add('in')), 800);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  // Ao chegar em /#secao vindo de outra página, rola até a âncora depois que o
  // React monta o conteúdo (o navegador tenta rolar antes de a seção existir).
  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (tries++ < 15) setTimeout(tick, 100);
    };
    const t = setTimeout(tick, 60);
    return () => clearTimeout(t);
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

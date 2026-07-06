// Shared site chrome, single source of truth for header + footer + page hero.
// Used by index.html and every subpage (quem-somos, premio, blog, faq, posts).
// Depends on: brand.jsx (Icon). Exposes: SiteHeader, SiteFooter, PageHero.

const WHATSAPP = 'https://wa.me/5548984704389';

// hash link that works from any page: on the home use "#x", elsewhere "index.html#x"
function navHref(home, hash) { return home ? hash : 'index.html' + hash; }

function SiteHeader({ home = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Início', href: 'index.html' },
    { label: 'Soluções', children: [
      { label: 'Indústria',          href: 'industria.html' },
      { label: 'Distribuidor',       href: 'distribuidor.html' },
      { label: 'Estratégia & Dados', href: 'solucoes.html' },
      { label: 'MinerConect',        href: 'minerconect.html' },
    ]},
    { label: 'Conteúdos', children: [
      { label: 'Blog',        href: 'blog.html' },
      { label: 'Prêmio SEWE', href: 'premio.html' },
    ]},
    { label: 'Quem Somos', href: 'quem-somos.html' },
    { label: 'FAQ',        href: 'faq.html' },
  ];

  const curPage = (typeof window !== 'undefined' ? (window.location.pathname.split('/').pop() || 'index.html') : 'index.html');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'saturate(1.4) blur(14px)', WebkitBackdropFilter: 'saturate(1.4) blur(14px)',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid var(--line-2)',
      transition: 'background .25s ease, border-color .25s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '12px var(--gutter)' }}>
        <a href="index.html" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="assets/sewe-logo.png" alt="SEWE GROUP" style={{ height: 52, width: 'auto', display: 'block' }}/>
        </a>
        <div style={{ flex: 1 }}/>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop">
          {links.map(l => {
            const active = l.href === curPage || (l.children || []).some(c => c.href === curPage);
            const cls = active ? 'nav-link nav-link-active' : 'nav-link';
            if (!l.children) {
              return <a key={l.label} href={l.href} className={cls}>{l.label}</a>;
            }
            return (
              <div key={l.label} className="nav-item">
                <span className={cls} tabIndex={0}>
                  {l.label} <Icon name="arrowDown" size={12} stroke={2.2} style={{ marginLeft: 2 }}/>
                </span>
                <div className="nav-dd">
                  <div className="nav-dd-box">
                    {l.children.map(c => (
                      <a key={c.href} href={c.href} className={c.href === curPage ? 'nav-dd-link nav-dd-link-active' : 'nav-dd-link'}>{c.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <a href={WHATSAPP} className="nav-desktop" style={{
          fontSize: 14, fontWeight: 600, color: 'var(--navy)', padding: '9px 20px',
          border: '1.5px solid var(--navy)', borderRadius: 99, transition: 'all .15s ease', whiteSpace: 'nowrap',
        }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
           onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}>
          Fale Conosco
        </a>
        <button onClick={() => setOpen(v => !v)} className="nav-mobile" aria-label="Menu"
          style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid var(--line)', display: 'none', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={open ? 'minus' : 'bars'} size={18}/>
        </button>
      </div>
      {open && (
        <div className="nav-mobile-panel" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
          <div className="container" style={{ padding: '12px var(--gutter) 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map(l => l.children ? (
              <div key={l.label}>
                <div style={{ padding: '12px 8px 4px', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{l.label}</div>
                {l.children.map(c => (
                  <a key={c.href} href={c.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 8px 10px 18px', borderBottom: '1px solid var(--line-2)', fontSize: 15, color: 'var(--navy-900)' }}>{c.label}</a>
                ))}
              </div>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '12px 8px', borderBottom: '1px solid var(--line-2)', fontSize: 15, color: 'var(--navy-900)' }}>{l.label}</a>
            ))}
            <a href={WHATSAPP} onClick={() => setOpen(false)} style={{ padding: '12px 8px', fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>Fale Conosco</a>
          </div>
        </div>
      )}
      <style>{`
        .nav-link {
          display: inline-flex; align-items: center; padding: 8px 12px; font-size: 14px;
          color: var(--text-2); font-weight: 500; border-radius: 8px; white-space: nowrap;
          transition: color .15s ease; cursor: pointer;
        }
        .nav-link:hover { color: var(--turquoise-ink); }
        .nav-link-active {
          color: var(--navy-900); font-weight: 600; background: #fff;
          border: 1px solid var(--line); box-shadow: var(--shadow-sm);
        }
        .nav-item { position: relative; }
        .nav-dd { position: absolute; top: 100%; left: 0; padding-top: 8px; display: none; z-index: 60; }
        .nav-item:hover .nav-dd, .nav-item:focus-within .nav-dd { display: block; }
        .nav-dd-box {
          min-width: 215px; background: #fff; border: 1px solid var(--line);
          border-radius: 12px; box-shadow: var(--shadow-md); padding: 8px;
        }
        .nav-dd-link {
          display: block; padding: 10px 12px; border-radius: 8px; font-size: 14px;
          color: var(--text-2); white-space: nowrap; transition: background .12s ease, color .12s ease;
        }
        .nav-dd-link:hover { background: var(--bg-soft); color: var(--turquoise-ink); }
        .nav-dd-link-active { color: var(--navy-900); font-weight: 600; background: var(--bg-soft); }
        @media (max-width: 1040px) { .nav-desktop { display: none !important; } .nav-mobile { display: flex !important; } }
        @media (min-width: 1041px) { .nav-mobile-panel { display: none !important; } }
      `}</style>
    </header>
  );
}

// Compact page header for subpages: eyebrow + title + optional lead, on a soft tinted band.
function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 64, paddingBottom: 56, background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(var(--line-2) 1px, transparent 1px), linear-gradient(90deg, var(--line-2) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 75%)',
      }}/>
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 820 }}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 style={{ marginTop: 14, fontSize: 'clamp(34px, 4.6vw, 56px)' }}>{title}</h1>
        {lead && <p style={{ marginTop: 18, fontSize: 18, color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 680 }}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}

function SiteFooter({ home = false }) {
  const col = {
    title: { fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', marginBottom: 14 },
    link:  { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.62)', padding: '6px 0', transition: 'color .15s ease' },
  };
  const onEnter = e => e.currentTarget.style.color = 'var(--turquoise)';
  const onLeave = e => e.currentTarget.style.color = 'rgba(255,255,255,0.62)';
  return (
    <footer style={{ background: '#0b1220', color: 'rgba(255,255,255,0.66)', paddingTop: 64 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="foot-grid">
          <div>
            <img src="assets/sewe-logo.png" alt="SEWE GROUP" style={{ height: 50, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}/>
            <p style={{ color: 'rgba(255,255,255,0.56)', marginTop: 16, fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
              Inteligência de dados para distribuidores e atacadistas. Consultoria + tecnologia + Qlik.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <div style={{ padding: '6px 12px', borderRadius: 6, background: 'rgba(117,227,228,0.1)', color: 'var(--turquoise)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', border: '1px solid rgba(117,227,228,0.2)' }}>
                PARCEIRO OFICIAL QLIK
              </div>
            </div>
          </div>
          <div>
            <div style={col.title}>Soluções</div>
            <a style={col.link} href="industria.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Indústria</a>
            <a style={col.link} href="distribuidor.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Distribuidor</a>
            <a style={col.link} href="solucoes.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Estratégia & Dados</a>
            <a style={col.link} href="minerconect.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>MinerConect</a>
          </div>
          <div>
            <div style={col.title}>Empresa</div>
            <a style={col.link} href="quem-somos.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Quem Somos</a>
            <a style={col.link} href="premio.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Prêmio SEWE</a>
            <a style={col.link} href="blog.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Blog</a>
            <a style={col.link} href="faq.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>FAQ</a>
          </div>
          <div>
            <div style={col.title}>Contato</div>
            <a style={col.link} href={WHATSAPP} onMouseEnter={onEnter} onMouseLeave={onLeave}>WhatsApp · (48) 98470-4389</a>
            <a style={col.link} href="mailto:contato@sewegroup.com.br" onMouseEnter={onEnter} onMouseLeave={onLeave}>contato@sewegroup.com.br</a>
            <div style={{ ...col.link, color: 'rgba(255,255,255,0.5)' }}>Florianópolis · SC · Brasil</div>
            <div style={{ ...col.link, color: 'rgba(255,255,255,0.5)' }}>Atendimento: seg-sex · 9h-18h</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0 36px', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)' }}>
            © 2026 SEWE Group · Todos os direitos reservados
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 12, color: 'rgba(255,255,255,0.42)' }}>
            <a href="politica-de-privacidade.html" style={{ color: 'inherit' }}>Política de Privacidade</a>
            <a href="politica-de-privacidade.html#lgpd" style={{ color: 'inherit' }}>LGPD</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .foot-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .foot-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter, PageHero });

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
      { label: 'Distribuidor & Atacado', href: 'distribuidor.html' },
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
        <a href="index.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img src="assets/sewe-icon.png" alt="SEWE GROUP" style={{ height: 36, width: 36, display: 'block', borderRadius: 9 }}/>
          <span style={{ width: 1, alignSelf: 'stretch', background: 'var(--line)' }}></span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 21, letterSpacing: '0.04em', color: 'var(--navy-900)' }}>SEWE</span>
            <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 10.5, letterSpacing: '0.34em', color: 'var(--text-3)', textTransform: 'uppercase', marginTop: 3 }}>Group</span>
          </span>
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
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <img src="assets/sewe-icon.png" alt="SEWE GROUP" style={{ height: 36, width: 36, display: 'block', borderRadius: 9, filter: 'invert(1)' }}/>
              <span style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.25)' }}></span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 21, letterSpacing: '0.04em', color: '#fff' }}>SEWE</span>
                <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 500, fontSize: 10.5, letterSpacing: '0.34em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: 3 }}>Group</span>
              </span>
            </span>
            <p style={{ color: 'rgba(255,255,255,0.56)', marginTop: 16, fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
              Inteligência de dados para distribuidores e atacadistas. Consultoria + tecnologia + Qlik.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <div style={{ padding: '6px 12px', borderRadius: 6, background: 'rgba(117,227,228,0.1)', color: 'var(--turquoise)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', border: '1px solid rgba(117,227,228,0.2)' }}>
                PARCEIRO OFICIAL QLIK
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[
                { label: 'YouTube', href: 'https://www.youtube.com/@sewegroup',
                  d: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z' },
                { label: 'Instagram', href: 'https://www.instagram.com/sewegroup/',
                  d: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.72 3.72 0 0 1-.9 1.38 3.72 3.72 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.85a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sewegroup/',
                  d: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} title={s.label}
                  className="foot-social"
                  style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.62)', transition: 'color .15s ease, border-color .15s ease, background .15s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--turquoise)'; e.currentTarget.style.borderColor = 'rgba(117,227,228,0.4)'; e.currentTarget.style.background = 'rgba(117,227,228,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}>
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={col.title}>Soluções</div>
            <a style={col.link} href="industria.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Indústria</a>
            <a style={col.link} href="distribuidor.html" onMouseEnter={onEnter} onMouseLeave={onLeave}>Distribuidor & Atacado</a>
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

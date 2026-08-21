// Vitrine do Instagram — usada no fim do Blog (e reutilizável em outras páginas).
// Renderiza os posts pelo embed OFICIAL do Instagram (sem token, sem API):
// cada permalink virou um <blockquote class="instagram-media"> e o embed.js do
// Instagram o transforma no post real.
//
// COMO ATUALIZAR OS POSTS: no Instagram, abra o post → "..." → "Copiar link"
// e cole aqui em SEWE_IG_POSTS (o mais recente em cima). Nada mais é preciso.
//
// Performance/privacidade: o script do Instagram só é carregado quando a seção
// chega perto da viewport — quem nunca rola até o fim do blog não baixa nada
// de terceiros.
//
// Depends on: brand.jsx (Icon), i18n.jsx (tr/useLocale). Exposes: InstagramSection.

const SEWE_IG_PROFILE = 'https://www.instagram.com/sewegroup/';

const SEWE_IG_POSTS = [
  'https://www.instagram.com/reel/DDCjJZmugeJ/',
  'https://www.instagram.com/p/DCm4tGnh25x/',
  'https://www.instagram.com/p/DbvwKSqIEgo/',
  'https://www.instagram.com/p/DbDbIEBFC-p/',
  'https://www.instagram.com/p/Da6I07ggagH/',
  'https://www.instagram.com/p/DalDE2OFrUl/',
  'https://www.instagram.com/p/DZ405eXES55/',
  'https://www.instagram.com/reel/DZvUFfwTjCp/',
];

const SEWE_IG_EMBED_SRC = 'https://www.instagram.com/embed.js';

// Carrega o embed.js uma única vez por página e reprocessa os blockquotes.
function loadInstagramEmbeds() {
  const process = () => { if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process(); };
  const existing = document.querySelector('script[data-sewe-ig]');
  if (existing) { process(); return; }
  const s = document.createElement('script');
  s.async = true;
  s.src = SEWE_IG_EMBED_SRC;
  s.setAttribute('data-sewe-ig', '1');
  s.onload = process;
  document.body.appendChild(s);
}

// HTML do embed. Fica fora do diff do React (dangerouslySetInnerHTML com string
// fixa) para o script do Instagram poder assumir o controle desse nó.
// Texto neutro de propósito: não depende do idioma, então trocar de idioma
// nunca recarrega os posts.
function igEmbedHtml(permalink) {
  const url = encodeURI(permalink.split('?')[0]);
  return (
    '<blockquote class="instagram-media" data-instgrm-permalink="' + url + '?utm_source=ig_embed" ' +
    'data-instgrm-version="14" style="margin:0;width:100%;min-width:326px;border:0;background:#fff">' +
    '<div class="ig-skel"><span class="ig-skel-dot"></span>' +
    '<a href="' + url + '" target="_blank" rel="noopener">instagram.com/sewegroup</a></div>' +
    '</blockquote>'
  );
}

function InstagramSection({ bg = 'var(--bg-soft)' }) {
  useLocale();
  const railRef = React.useRef(null);
  const secRef = React.useRef(null);
  const [armed, setArmed] = React.useState(false);

  // Só busca o script do Instagram quando a seção se aproxima da tela.
  // Checagem por posição (em vez de IntersectionObserver) para funcionar também
  // em aba de fundo / renderizador sem composição, onde o IO não dispara.
  React.useEffect(() => {
    let done = false, raf = 0;
    const near = () => {
      const el = secRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 400 && r.bottom > -400;
    };
    const stop = () => {
      done = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
    const check = () => { if (!done && near()) { setArmed(true); stop(); } };
    const onMove = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(check); };
    check();
    if (!done) {
      window.addEventListener('scroll', onMove, { passive: true });
      window.addEventListener('resize', onMove);
    }
    return stop;
  }, []);

  React.useEffect(() => { if (armed) loadInstagramEmbeds(); }, [armed]);

  const scrollBy = dir => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.ig-card');
    const step = card ? card.getBoundingClientRect().width + 18 : 340;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section ref={secRef} className="section" style={{ background: bg, borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="ig-head">
          <div>
            <div className="eyebrow">{tr('ig.eyebrow')}</div>
            <h2 style={{ marginTop: 12, fontSize: 'clamp(26px,3.2vw,38px)' }}>{tr('ig.title')}</h2>
            <p style={{ marginTop: 12, color: 'var(--text-2)', fontSize: 16.5, lineHeight: 1.55, maxWidth: 560 }}>
              {tr('ig.lead')}
            </p>
          </div>
          <div className="ig-actions">
            <a href={SEWE_IG_PROFILE} target="_blank" rel="noopener" className="ig-follow">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.72 3.72 0 0 1-.9 1.38 3.72 3.72 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.85a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z"/>
              </svg>
              {tr('ig.follow')}
            </a>
            <div className="ig-arrows">
              <button type="button" className="ig-arrow" aria-label={tr('ig.prev')} onClick={() => scrollBy(-1)}>
                <Icon name="arrow" size={16} stroke={2} style={{ transform: 'rotate(180deg)' }}/>
              </button>
              <button type="button" className="ig-arrow" aria-label={tr('ig.next')} onClick={() => scrollBy(1)}>
                <Icon name="arrow" size={16} stroke={2}/>
              </button>
            </div>
          </div>
        </div>

        <div className="ig-rail" ref={railRef}>
          {SEWE_IG_POSTS.map(url => (
            <div key={url} className="ig-card" dangerouslySetInnerHTML={{ __html: igEmbedHtml(url) }}/>
          ))}
          <a href={SEWE_IG_PROFILE} target="_blank" rel="noopener" className="ig-card ig-more">
            <span className="ig-more-icon"><Icon name="arrow" size={22} stroke={2}/></span>
            <span className="ig-more-t">{tr('ig.seeall')}</span>
            <span className="ig-more-d">@sewegroup</span>
          </a>
        </div>
      </div>

      <style>{`
        .ig-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; flex-wrap: wrap; }
        .ig-actions { display: flex; align-items: center; gap: 10px; }
        .ig-follow {
          display: inline-flex; align-items: center; gap: 9px; padding: 11px 20px; border-radius: 99px;
          background: var(--navy-900); color: #fff; font-size: 14px; font-weight: 600;
          text-decoration: none; white-space: nowrap; transition: opacity .15s ease, transform .15s ease;
        }
        .ig-follow:hover { opacity: .9; transform: translateY(-1px); }
        .ig-arrows { display: flex; gap: 8px; }
        .ig-arrow {
          width: 40px; height: 40px; border-radius: 99px; background: #fff; cursor: pointer;
          border: 1px solid var(--line); color: var(--navy-900); display: grid; place-items: center;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .ig-arrow:hover { border-color: var(--turquoise-2); box-shadow: var(--shadow-xs); }
        .ig-rail {
          display: flex; gap: 18px; align-items: stretch; overflow-x: auto; overflow-y: hidden;
          scroll-snap-type: x mandatory; padding: 4px 4px 18px; margin: 0 -4px;
          scrollbar-width: thin;
        }
        .ig-rail::-webkit-scrollbar { height: 8px; }
        .ig-rail::-webkit-scrollbar-thumb { background: var(--line); border-radius: 99px; }
        .ig-card {
          flex: 0 0 auto; width: 328px; scroll-snap-align: start;
          border-radius: 14px; overflow: hidden; background: #fff;
          border: 1px solid var(--line); box-shadow: var(--shadow-sm);
        }
        .ig-card iframe { display: block; border-radius: 14px; }
        .ig-skel {
          height: 420px; display: grid; place-items: center; gap: 12px; align-content: center;
          background: linear-gradient(180deg, #fff 0%, var(--bg-soft, #f6f8fb) 100%);
          font-size: 12.5px; color: var(--text-3);
        }
        .ig-skel a { color: var(--text-3); text-decoration: none; }
        .ig-skel-dot {
          width: 26px; height: 26px; border-radius: 99px;
          border: 2px solid var(--line); border-top-color: var(--turquoise-2);
          animation: ig-spin 1s linear infinite;
        }
        @keyframes ig-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .ig-skel-dot { animation: none; } }
        .ig-more {
          min-height: 420px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end;
          gap: 6px; padding: 26px; text-decoration: none;
          background: linear-gradient(150deg, #0e1729 0%, #2d436c 120%);
          border-color: transparent; transition: transform .2s ease, box-shadow .2s ease;
        }
        .ig-more:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
        .ig-more-icon {
          width: 46px; height: 46px; border-radius: 99px; display: grid; place-items: center; margin-bottom: auto;
          background: rgba(117,227,228,0.16); color: var(--turquoise);
        }
        .ig-more-t { font-family: var(--ff-display); font-weight: 700; font-size: 19px; color: #fff; }
        .ig-more-d { font-family: var(--ff-mono); font-size: 12px; letter-spacing: .08em; color: var(--turquoise); }
        @media (max-width: 700px) {
          .ig-head { align-items: flex-start; }
          .ig-arrows { display: none; }
          .ig-card { width: min(328px, 86vw); }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { InstagramSection });

// ─────────────────────────────────────────────────────────────
// SEWE, engajamento no fim do post: compartilhar, curtir e comentar.
// Depends on: brand.jsx (Icon).
//
// Curtidas e comentários ficam no Supabase (mesmo projeto do CRM):
//   curtir   → RPC blog_toggle_like / blog_like_count
//   ler      → RPC blog_comments_public  (nunca devolve e-mail)
//   comentar → Edge Function blog-comment (valida, freia spam e grava)
// SQL de criação: supabase/blog-engajamento.sql
//
// Se o backend ainda não estiver publicado, o componente esconde curtir e
// comentários sozinho e deixa só a barra de compartilhar. A página nunca quebra.
// ─────────────────────────────────────────────────────────────

const SEWE_SB_URL = 'https://bjohdxudealxhsumrxsg.supabase.co';
const SEWE_SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2hkeHVkZWFseGhzdW1yeHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMzQxNjYsImV4cCI6MjA5NDkxMDE2Nn0.0LvntzXgZZNJmvYP_3nrVHQibEKZhjpAa5AwzMj6wEw';

const sbHeaders = {
  'Content-Type': 'application/json',
  'apikey': SEWE_SB_ANON,
  'Authorization': `Bearer ${SEWE_SB_ANON}`,
};

function sbRpc(fn, args) {
  return fetch(`${SEWE_SB_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST', headers: sbHeaders, body: JSON.stringify(args),
  }).then(r => { if (!r.ok) throw new Error(`rpc ${fn} ${r.status}`); return r.json(); });
}

// Id anônimo do visitante, só para não contar a mesma curtida duas vezes.
function visitorId() {
  try {
    let v = localStorage.getItem('sewe_visitor');
    if (!v) {
      v = (crypto.randomUUID && crypto.randomUUID()) ||
          'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
          });
      localStorage.setItem('sewe_visitor', v);
    }
    return v;
  } catch { return null; }
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
function fmtQuando(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return `${d.getDate()} de ${MESES[d.getMonth()]}. de ${d.getFullYear()}`;
}

// ── Ícones de marca (glifos preenchidos, fora do set de traço do brand.jsx) ──
const GlyphFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.29-.04-1.28-.13-2.44-.13-2.42 0-4.06 1.48-4.06 4.19v2.24H7.4V14h2.8v8h3.3z"/>
  </svg>
);
const GlyphLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9h3.6v12H3.2zM9.6 9h3.45v1.64h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.36 4.33 5.43V21h-3.6v-5.4c0-1.29-.02-2.95-1.83-2.95-1.83 0-2.11 1.4-2.11 2.85V21H9.6z"/>
  </svg>
);
const GlyphWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2.2c-5.42 0-9.83 4.4-9.83 9.82 0 1.73.45 3.42 1.32 4.91L2.1 21.8l4.99-1.31a9.8 9.8 0 0 0 4.95 1.34h.01c5.42 0 9.83-4.41 9.83-9.83 0-2.62-1.02-5.09-2.88-6.94A9.75 9.75 0 0 0 12.04 2.2zm0 17.97h-.01a8.16 8.16 0 0 1-4.15-1.14l-.3-.18-3.08.81.82-3-.19-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.5 3.67-8.17 8.17-8.17 2.18 0 4.23.85 5.77 2.4a8.11 8.11 0 0 1 2.39 5.78c0 4.5-3.66 8.14-8.17 8.14zm4.48-6.1c-.24-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.04-.38-1.97-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.24-.29.36-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.04s.88 2.36.99 2.52c.13.16 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.59.19 1.12.16 1.54.1.47-.07 1.45-.6 1.65-1.17.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.46-.29z"/>
  </svg>
);
const GlyphMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7.5 8.5 5.5 8.5-5.5"/>
  </svg>
);
const GlyphHeart = ({ filled }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.5 5.1a5.1 5.1 0 0 0-7.2 0L12 6.4l-1.3-1.3a5.1 5.1 0 1 0-7.2 7.2L12 20.8l8.5-8.5a5.1 5.1 0 0 0 0-7.2z"/>
  </svg>
);

// ── Compartilhar ──────────────────────────────────────────────
function ShareBar({ title }) {
  const [copiado, setCopiado] = React.useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const alvos = [
    { nome: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Glyph: GlyphFacebook },
    { nome: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Glyph: GlyphLinkedin },
    { nome: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, Glyph: GlyphWhatsapp },
    { nome: 'E-mail', href: `mailto:?subject=${t}&body=${t}%0A%0A${u}`, Glyph: GlyphMail },
  ];

  const btn = {
    width: 38, height: 38, borderRadius: 99, display: 'grid', placeItems: 'center',
    border: '1px solid var(--line)', background: '#fff', color: 'var(--navy-900)',
    transition: 'all .16s ease',
  };
  const hover = (e, on) => {
    e.currentTarget.style.borderColor = on ? 'var(--turquoise-ink)' : 'var(--line)';
    e.currentTarget.style.color = on ? 'var(--turquoise-ink)' : 'var(--navy-900)';
    e.currentTarget.style.transform = on ? 'translateY(-1px)' : 'none';
  };

  const copiar = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }).catch(() => {});
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 16, color: 'var(--navy-900)' }}>Compartilhe</span>
      {alvos.map(({ nome, href, Glyph }) => (
        <a key={nome} href={href} target="_blank" rel="noopener noreferrer"
           aria-label={`Compartilhar no ${nome}`} title={`Compartilhar no ${nome}`}
           style={btn} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
          <Glyph/>
        </a>
      ))}
      <button type="button" onClick={copiar} aria-label="Copiar link do artigo" title="Copiar link"
        style={{ ...btn, cursor: 'pointer' }} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
        <Icon name={copiado ? 'check' : 'link'} size={17}/>
      </button>
      {copiado && <span style={{ fontSize: 13, color: 'var(--turquoise-ink)', fontWeight: 600 }}>Link copiado</span>}
    </div>
  );
}

// ── Curtir ────────────────────────────────────────────────────
function LikeButton({ slug, total, curtido, onToggle }) {
  const [enviando, setEnviando] = React.useState(false);

  const clicar = () => {
    if (enviando) return;
    const v = visitorId();
    if (!v) return;
    setEnviando(true);
    // Otimista: responde ao clique na hora e corrige quando o banco confirmar.
    onToggle({ curtido: !curtido, total: total + (curtido ? -1 : 1) });
    sbRpc('blog_toggle_like', { p_slug: slug, p_visitor: v })
      .then(r => {
        onToggle({ curtido: r.liked, total: r.count });
        try { localStorage.setItem(`sewe_like_${slug}`, r.liked ? '1' : '0'); } catch {}
      })
      .catch(() => onToggle({ curtido, total }))
      .finally(() => setEnviando(false));
  };

  return (
    <button type="button" onClick={clicar} aria-pressed={curtido}
      aria-label={curtido ? 'Remover curtida' : 'Curtir este artigo'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        padding: '9px 16px', borderRadius: 99, fontSize: 14, fontWeight: 600,
        fontFamily: 'inherit', transition: 'all .16s ease',
        border: `1px solid ${curtido ? 'var(--turquoise-ink)' : 'var(--line)'}`,
        background: curtido ? 'rgba(117,227,228,0.14)' : '#fff',
        color: curtido ? 'var(--turquoise-ink)' : 'var(--navy-900)',
      }}>
      <GlyphHeart filled={curtido}/>
      {curtido ? 'Curtido' : 'Curtir'}
      {total > 0 && (
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 13, opacity: 0.85 }}>{total}</span>
      )}
    </button>
  );
}

// ── Comentários ───────────────────────────────────────────────
const VAZIO = { first_name: '', last_name: '', email: '', body: '', consent: false, website: '' };

function CommentForm({ slug, onNovo }) {
  const [f, setF] = React.useState(VAZIO);
  const [erro, setErro] = React.useState('');
  const [enviando, setEnviando] = React.useState(false);
  const [pronto, setPronto] = React.useState(false);

  const set = (k, v) => setF(prev => ({ ...prev, [k]: v }));

  const enviar = (e) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    fetch(`${SEWE_SB_URL}/functions/v1/blog-comment`, {
      method: 'POST', headers: sbHeaders, body: JSON.stringify({ ...f, slug }),
    })
      .then(async r => {
        const json = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(json.error || 'Não consegui enviar seu comentário. Tente novamente.');
        if (json.comment) onNovo(json.comment);
        setF(VAZIO);
        setPronto(true);
      })
      .catch(err => setErro(err.message))
      .finally(() => setEnviando(false));
  };

  const campo = {
    width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 15,
    fontFamily: 'inherit', color: 'var(--navy-900)', background: '#fff',
    border: '1px solid var(--line)', outline: 'none',
  };
  const foco = (e, on) => { e.target.style.borderColor = on ? 'var(--turquoise-ink)' : 'var(--line)'; };

  if (pronto) {
    return (
      <div style={{ padding: 20, borderRadius: 14, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderLeft: '3px solid var(--turquoise)' }}>
        <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 16, color: 'var(--navy-900)' }}>Comentário publicado. Obrigado!</div>
        <button type="button" onClick={() => setPronto(false)}
          style={{ marginTop: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--turquoise-ink)' }}>
          Escrever outro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="cmt-linha" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input style={campo} placeholder="Nome" value={f.first_name} required maxLength={40}
          onChange={e => set('first_name', e.target.value)} onFocus={e => foco(e, true)} onBlur={e => foco(e, false)}/>
        <input style={campo} placeholder="Sobrenome" value={f.last_name} maxLength={40}
          onChange={e => set('last_name', e.target.value)} onFocus={e => foco(e, true)} onBlur={e => foco(e, false)}/>
      </div>
      <input style={campo} type="email" placeholder="E-mail" value={f.email} required maxLength={160}
        onChange={e => set('email', e.target.value)} onFocus={e => foco(e, true)} onBlur={e => foco(e, false)}/>
      <textarea style={{ ...campo, minHeight: 120, resize: 'vertical', lineHeight: 1.6 }} placeholder="Comentário"
        value={f.body} required maxLength={2000}
        onChange={e => set('body', e.target.value)} onFocus={e => foco(e, true)} onBlur={e => foco(e, false)}/>

      {/* honeypot: invisível para gente, irresistível para bot */}
      <input name="website" value={f.website} onChange={e => set('website', e.target.value)}
        tabIndex={-1} autoComplete="off" aria-hidden
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}/>

      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, cursor: 'pointer' }}>
        <input type="checkbox" required checked={f.consent} onChange={e => set('consent', e.target.checked)}
          style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--turquoise-ink)', flexShrink: 0 }}/>
        <span>
          Autorizo a publicação do meu nome e do meu comentário nesta página e o tratamento dos meus dados pela
          SEWE Group, nos termos da <a href="/politica-de-privacidade" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>Política de Privacidade</a> e
          da Lei 13.709/18 (LGPD). Meu e-mail não fica visível no site e posso pedir a exclusão a qualquer momento
          por <a href="mailto:contato@sewegroup.com.br" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>contato@sewegroup.com.br</a>.
        </span>
      </label>

      {erro && (
        <div style={{ fontSize: 13.5, color: '#c53030', fontWeight: 500 }}>{erro}</div>
      )}

      <div>
        <button type="submit" className="btn btn-primary" disabled={enviando}
          style={{ opacity: enviando ? 0.6 : 1, cursor: enviando ? 'default' : 'pointer' }}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
}

function CommentList({ itens }) {
  if (!itens.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
      {itens.map(c => {
        const iniciais = String(c.author || '?').split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
        return (
          <div key={c.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div aria-hidden style={{
              width: 40, height: 40, borderRadius: 99, flexShrink: 0, display: 'grid', placeItems: 'center',
              background: 'var(--bg-soft)', border: '1px solid var(--line)', color: 'var(--navy-900)',
              fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 14,
            }}>{iniciais}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 15, color: 'var(--navy-900)' }}>{c.author}</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{fmtQuando(c.created_at)}</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-2)', marginTop: 4, whiteSpace: 'pre-wrap' }}>{c.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Bloco completo ────────────────────────────────────────────
function PostEngagement({ slug, title }) {
  const [estado, setEstado] = React.useState('carregando'); // carregando | ok | off
  const [likes, setLikes] = React.useState({ total: 0, curtido: false });
  const [comentarios, setComentarios] = React.useState([]);

  React.useEffect(() => {
    let vivo = true;
    Promise.all([
      sbRpc('blog_like_count', { p_slug: slug }),
      sbRpc('blog_comments_public', { p_slug: slug }),
    ]).then(([total, lista]) => {
      if (!vivo) return;
      let curtido = false;
      try { curtido = localStorage.getItem(`sewe_like_${slug}`) === '1'; } catch {}
      setLikes({ total: Number(total) || 0, curtido });
      setComentarios(Array.isArray(lista) ? lista : []);
      setEstado('ok');
    }).catch(() => { if (vivo) setEstado('off'); });
    return () => { vivo = false; };
  }, [slug]);

  const divisor = { marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--line)' };

  return (
    <>
      <div style={{ ...divisor, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <ShareBar title={title}/>
        {estado === 'ok' && (
          <LikeButton slug={slug} total={likes.total} curtido={likes.curtido} onToggle={setLikes}/>
        )}
      </div>

      {estado === 'ok' && (
        <div style={divisor}>
          <h2 style={{ fontSize: 24, marginBottom: 18 }}>
            {comentarios.length ? `Comentários (${comentarios.length})` : 'Deixe um comentário'}
          </h2>
          <CommentList itens={comentarios}/>
          <CommentForm slug={slug} onNovo={c => setComentarios(prev => [c, ...prev])}/>
        </div>
      )}

      <style>{`@media(max-width:560px){.cmt-linha{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}

window.PostEngagement = PostEngagement;

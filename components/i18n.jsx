// i18n — idioma do site (PT-BR padrão, EN e ES).
// Fonte única de textos traduzidos + seletor de idioma (só bandeirinha).
//
// Como usar em um componente:
//   function Algo() {
//     useLocale();                       // re-renderiza quando o idioma muda
//     return <h2>{tr('home.h1a')}</h2>;  // texto traduzido
//   }
//
// Como adicionar texto novo: crie a chave em SEWE_STRINGS com pt/en/es.
// Chave sem tradução cai no português (nunca quebra a página).
//
// Expõe: tr, useLocale, getLocale, setLocale, SEWE_LOCALES, Flag, LangSwitcher, I18nNotice.

const SEWE_LOCALES = [
  { code: 'pt', name: 'Português', htmlLang: 'pt-BR' },
  { code: 'en', name: 'English',   htmlLang: 'en' },
  { code: 'es', name: 'Español',   htmlLang: 'es' },
];

// ── Textos ────────────────────────────────────────────────────────────────────
const SEWE_STRINGS = {
  // Header / navegação
  'nav.home':        { pt: 'Início',              en: 'Home',                es: 'Inicio' },
  'nav.solutions':   { pt: 'Soluções',            en: 'Solutions',           es: 'Soluciones' },
  'nav.industry':    { pt: 'Indústria',           en: 'Manufacturers',       es: 'Industria' },
  'nav.distributor': { pt: 'Distribuidor & Atacado', en: 'Distribution & Wholesale', es: 'Distribuidor & Mayorista' },
  'nav.platform':    { pt: 'Plataforma de Dados & IA', en: 'Data & AI Platform', es: 'Plataforma de Datos e IA' },
  'nav.prospecting': { pt: 'Prospecção de Mercado', en: 'Market Prospecting', es: 'Prospección de Mercado' },
  'nav.commerce':    { pt: 'Comércio Digital B2B2C', en: 'B2B2C Digital Commerce', es: 'Comercio Digital B2B2C' },
  'nav.content':     { pt: 'Conteúdos',           en: 'Content',             es: 'Contenidos' },
  'nav.blog':        { pt: 'Blog',                en: 'Blog',                es: 'Blog' },
  'nav.award':       { pt: 'Prêmio SEWE',         en: 'SEWE Award',          es: 'Premio SEWE' },
  'nav.about':       { pt: 'Quem Somos',          en: 'About Us',            es: 'Quiénes Somos' },
  'nav.faq':         { pt: 'FAQ',                 en: 'FAQ',                 es: 'FAQ' },
  'nav.contact':     { pt: 'Fale Conosco',        en: 'Talk to Us',          es: 'Contáctenos' },
  'nav.menu':        { pt: 'Menu',                en: 'Menu',                es: 'Menú' },
  'nav.lang':        { pt: 'Idioma',              en: 'Language',            es: 'Idioma' },

  // Aviso de página ainda não traduzida (vazio no PT: a faixa nem aparece)
  'i18n.notice':     { pt: '',
                       en: 'The content on this page — articles and legal text — is published in Portuguese only.',
                       es: 'El contenido de esta página — artículos y texto legal — se publica solo en portugués.' },

  // Footer
  'foot.tagline':    { pt: 'Inteligência de dados para distribuidores e atacadistas. Consultoria + tecnologia + Qlik.',
                       en: 'Data intelligence for distributors and wholesalers. Consulting + technology + Qlik.',
                       es: 'Inteligencia de datos para distribuidores y mayoristas. Consultoría + tecnología + Qlik.' },
  'foot.qlik':       { pt: 'PARCEIRO OFICIAL QLIK', en: 'OFFICIAL QLIK PARTNER', es: 'PARTNER OFICIAL QLIK' },
  'foot.solutions':  { pt: 'Soluções',   en: 'Solutions', es: 'Soluciones' },
  'foot.company':    { pt: 'Empresa',    en: 'Company',   es: 'Empresa' },
  'foot.contact':    { pt: 'Contato',    en: 'Contact',   es: 'Contacto' },
  'foot.referral':   { pt: 'Indique e Ganhe', en: 'Refer & Earn', es: 'Recomienda y Gana' },
  'foot.city':       { pt: 'Florianópolis · SC · Brasil', en: 'Florianópolis · SC · Brazil', es: 'Florianópolis · SC · Brasil' },
  'foot.hours':      { pt: 'Atendimento: seg-sex · 9h-18h', en: 'Support: Mon-Fri · 9am-6pm (BRT)', es: 'Atención: lun-vie · 9h-18h (BRT)' },
  'foot.rights':     { pt: '© 2026 SEWE Group · Todos os direitos reservados',
                       en: '© 2026 SEWE Group · All rights reserved',
                       es: '© 2026 SEWE Group · Todos los derechos reservados' },
  'foot.privacy':    { pt: 'Política de Privacidade', en: 'Privacy Policy', es: 'Política de Privacidad' },
  'foot.lgpd':       { pt: 'LGPD', en: 'LGPD', es: 'LGPD' },

  // Home — posicionamento
  'home.h1a':        { pt: 'Dados que viram decisão.', en: 'Data that becomes decision.', es: 'Datos que se vuelven decisión.' },
  'home.h1b':        { pt: 'Decisão que vira',        en: 'Decision that becomes',        es: 'Decisión que se vuelve' },
  'home.h1hl':       { pt: 'margem',                  en: 'margin',                      es: 'margen' },
  'home.lead':       { pt: 'BI, IA e CRM para distribuidores, atacadistas e indústrias.',
                       en: 'BI, AI and CRM for distributors, wholesalers and manufacturers.',
                       es: 'BI, IA y CRM para distribuidores, mayoristas e industrias.' },

  // CTA padrão do site: dois rótulos, repetidos sem variação em todas as páginas.
  'cta.primary':     { pt: 'Agendar diagnóstico de 30 min', en: 'Book a 30-min assessment', es: 'Agendar diagnóstico de 30 min' },
  'cta.secondary':   { pt: 'Ver como funciona', en: 'See how it works', es: 'Ver cómo funciona' },

  // Home — escolha de perfil
  'home.pick.eyebrow': { pt: 'Três operações, três caminhos', en: 'Three operations, three paths', es: 'Tres operaciones, tres caminos' },
  'home.pick.title':   { pt: 'Por onde você quer começar?', en: 'Where do you want to start?', es: '¿Por dónde quiere empezar?' },
  'home.pick.lead':    { pt: 'Escolha o perfil da sua empresa e veja a solução certa para a sua operação.',
                         en: 'Pick your company profile and see the right solution for your operation.',
                         es: 'Elija el perfil de su empresa y vea la solución correcta para su operación.' },

  'home.door1.kicker': { pt: 'Sou indústria', en: 'I am a manufacturer', es: 'Soy industria' },
  'home.door1.title':  { pt: 'Enxergue toda a sua rede', en: 'See your entire network', es: 'Vea toda su red' },
  'home.door1.desc':   { pt: 'Do sellout ao PDV: Integration, Sales e BI conectando fábrica, distribuidor e revenda em um só mapa.',
                         en: 'From sell-out to the point of sale: Integration, Sales and BI connecting plant, distributor and reseller on a single map.',
                         es: 'Del sell-out al punto de venta: Integration, Sales y BI conectando fábrica, distribuidor y reventa en un solo mapa.' },
  'home.door1.cta':    { pt: 'Ver o ecossistema', en: 'See the ecosystem', es: 'Ver el ecosistema' },

  'home.door2.kicker': { pt: 'Sou distribuidor ou atacadista', en: 'I am a distributor or wholesaler', es: 'Soy distribuidor o mayorista' },
  'home.door2.title':  { pt: 'Decida com o dado na mão', en: 'Decide with the data in hand', es: 'Decida con el dato en la mano' },
  'home.door2.desc':   { pt: 'Menos ruptura, mais positivação, capital de giro livre. BI, IA e Sales sob medida para a sua operação.',
                         en: 'Fewer stockouts, higher order coverage, working capital freed up. BI, AI and Sales tailored to your operation.',
                         es: 'Menos quiebres de stock, más cobertura de pedidos, capital de trabajo libre. BI, IA y Sales a la medida de su operación.' },
  'home.door2.cta':    { pt: 'Ver soluções', en: 'See solutions', es: 'Ver soluciones' },

  'home.door3.kicker': { pt: 'Já tenho time de dados', en: 'I already have a data team', es: 'Ya tengo equipo de datos' },
  'home.door3.title':  { pt: 'Plataforma de Dados & IA', en: 'Data & AI Platform', es: 'Plataforma de Datos e IA' },
  'home.door3.desc':   { pt: 'Do dado bruto no ERP ao agente que executa a ação: Qlik de ponta a ponta, com a engenharia de dados da SEWE por trás.',
                         en: 'From raw ERP data to the agent that takes action: Qlik end to end, backed by SEWE data engineering.',
                         es: 'Del dato bruto en el ERP al agente que ejecuta la acción: Qlik de punta a punta, con la ingeniería de datos de SEWE detrás.' },
  'home.door3.cta':    { pt: 'Ver a plataforma', en: 'See the platform', es: 'Ver la plataforma' },

  // Agenda / CTA
  'agenda.eyebrow':  { pt: 'Sessão estratégica', en: 'Strategy session', es: 'Sesión estratégica' },
  'agenda.title':    { pt: 'Agende uma sessão estratégica de diagnóstico.', en: 'Book a strategic diagnostic session.', es: 'Agende una sesión estratégica de diagnóstico.' },
  'agenda.lead':     { pt: 'Escolha o melhor horário na agenda abaixo. Conversa online, pelo Google Meet, com um especialista SEWE sobre o potencial da sua operação.',
                       en: 'Pick the best time below. An online conversation over Google Meet with a SEWE specialist about the potential of your operation.',
                       es: 'Elija el mejor horario en la agenda de abajo. Conversación online, por Google Meet, con un especialista SEWE sobre el potencial de su operación.' },
  'agenda.iframe':   { pt: 'Agendar demonstração · SEWE Group', en: 'Book a demo · SEWE Group', es: 'Agendar demostración · SEWE Group' },
  'agenda.loading':  { pt: 'Carregando agenda…', en: 'Loading calendar…', es: 'Cargando agenda…' },
  'agenda.nofit':    { pt: 'Não achou horário?', en: 'No time slot works?', es: '¿No encontró horario?' },
  'agenda.full':     { pt: 'Abra a agenda completa', en: 'Open the full calendar', es: 'Abra la agenda completa' },
  'agenda.or':       { pt: 'ou', en: 'or', es: 'o' },
  'agenda.wa':       { pt: 'chame no WhatsApp', en: 'reach us on WhatsApp', es: 'escríbanos por WhatsApp' },
  'agenda.wamsg':    { pt: 'Olá! Quero agendar uma sessão estratégica com a SEWE.',
                       en: 'Hi! I would like to book a strategy session with SEWE.',
                       es: 'Hola! Quiero agendar una sesión estratégica con SEWE.' },

  // Instagram
  'ig.eyebrow':      { pt: 'No Instagram · @sewegroup', en: 'On Instagram · @sewegroup', es: 'En Instagram · @sewegroup' },
  'ig.title':        { pt: 'O dia a dia da SEWE, em posts.', en: 'SEWE day to day, in posts.', es: 'El día a día de SEWE, en posts.' },
  'ig.lead':         { pt: 'Conteúdo curto sobre gestão, dados e IA na distribuição — publicado primeiro no nosso Instagram.',
                       en: 'Short takes on management, data and AI in distribution — published first on our Instagram.',
                       es: 'Contenido corto sobre gestión, datos e IA en la distribución — publicado primero en nuestro Instagram.' },
  'ig.follow':       { pt: 'Seguir @sewegroup', en: 'Follow @sewegroup', es: 'Seguir @sewegroup' },
  'ig.seeall':       { pt: 'Ver o perfil completo', en: 'See the full profile', es: 'Ver el perfil completo' },
  'ig.loading':      { pt: 'Carregando o post…', en: 'Loading post…', es: 'Cargando la publicación…' },
  'ig.prev':         { pt: 'Post anterior', en: 'Previous post', es: 'Publicación anterior' },
  'ig.next':         { pt: 'Próximo post', en: 'Next post', es: 'Publicación siguiente' },
  'ig.open':         { pt: 'Abrir no Instagram', en: 'Open on Instagram', es: 'Abrir en Instagram' },
};

// ── Estado do idioma ──────────────────────────────────────────────────────────
const SEWE_LANG_KEY = 'sewe-lang';
const SEWE_LANG_SUBS = new Set();

function normalizeLocale(raw) {
  const code = String(raw || '').toLowerCase().slice(0, 2);
  return SEWE_LOCALES.some(l => l.code === code) ? code : null;
}

function detectLocale() {
  if (typeof window === 'undefined') return 'pt';
  try {
    const fromUrl = normalizeLocale(new URLSearchParams(window.location.search).get('lang'));
    if (fromUrl) return fromUrl;
    const stored = normalizeLocale(window.localStorage.getItem(SEWE_LANG_KEY));
    if (stored) return stored;
    const navLangs = window.navigator.languages || [window.navigator.language || ''];
    for (const nav of navLangs) {
      const hit = normalizeLocale(nav);
      if (hit) return hit;
    }
  } catch (_) { /* storage bloqueado */ }
  return 'pt';
}

let SEWE_LOCALE = detectLocale();

function getLocale() { return SEWE_LOCALE; }

function applyHtmlLang(code) {
  const loc = SEWE_LOCALES.find(l => l.code === code);
  if (loc && typeof document !== 'undefined') document.documentElement.setAttribute('lang', loc.htmlLang);
}

function setLocale(code) {
  const next = normalizeLocale(code) || 'pt';
  if (next === SEWE_LOCALE) return;
  SEWE_LOCALE = next;
  try { window.localStorage.setItem(SEWE_LANG_KEY, next); } catch (_) {}
  applyHtmlLang(next);
  const notify = () => SEWE_LANG_SUBS.forEach(fn => fn(next));
  notify();                                       // navegação troca na hora
  if (next !== 'pt') loadContentDict().then(notify); // copy troca ao chegar o dicionário
}

// tr('chave') → texto no idioma atual (cai no pt quando falta tradução).
// Usado na navegação e nos rótulos curtos compartilhados (header, footer, home).
function tr(key, code) {
  const entry = SEWE_STRINGS[key];
  if (!entry) return key;
  const loc = code || SEWE_LOCALE;
  return entry[loc] || entry.pt || key;
}

// ── Copy das páginas: a própria frase em português é a chave ──────────────────
// tx('Frase em português') → tradução, ou a própria frase quando o idioma é PT
// (ou quando ainda não existe tradução). O dicionário mora em i18n-content.js e
// só é baixado se o visitante escolher EN/ES — quem lê em português não paga
// nada por isso.
let SEWE_TX = null;

function tx(pt, code) {
  const loc = code || SEWE_LOCALE;
  if (loc === 'pt' || !SEWE_TX) return pt;
  const entry = SEWE_TX[pt];
  return (entry && entry[loc]) || pt;
}

let SEWE_TX_PENDING = null;
function loadContentDict() {
  if (SEWE_TX) return Promise.resolve();
  if (!SEWE_TX_PENDING) {
    SEWE_TX_PENDING = import('./i18n-content.js')
      .then(m => { SEWE_TX = m.SEWE_TX; })
      .catch(() => { SEWE_TX = {}; });   // sem dicionário o site fica em PT
  }
  return SEWE_TX_PENDING;
}

// Assina as mudanças de idioma e devolve o código atual.
// Guarda um contador (não o código): setLocale avisa duas vezes — na hora e de
// novo quando o dicionário de conteúdo chega — e o React descartaria o segundo
// aviso se o valor do estado fosse o mesmo.
function useLocale() {
  const [, bump] = React.useState(0);
  React.useEffect(() => {
    const fn = () => bump(n => n + 1);
    SEWE_LANG_SUBS.add(fn);
    fn();   // o idioma pode ter mudado entre o render e o efeito
    return () => SEWE_LANG_SUBS.delete(fn);
  }, []);
  return SEWE_LOCALE;
}

applyHtmlLang(SEWE_LOCALE);

// Visitante que já chega em EN/ES: os pontos de montagem (app.jsx, pages.jsx,
// audience.jsx, distribuidor.jsx) esperam esta promessa antes de renderizar, para
// a página não aparecer em português e piscar para o outro idioma.
const SEWE_I18N_READY = SEWE_LOCALE === 'pt' ? Promise.resolve() : loadContentDict();

// ── Bandeirinhas (SVG inline: emoji de bandeira não renderiza no Windows) ─────
function Flag({ code, size = 21 }) {
  const w = size, h = Math.round(size * 0.7);
  const common = {
    width: w, height: h, viewBox: '0 0 30 21', role: 'img', 'aria-hidden': 'true',
    style: { display: 'block', borderRadius: 3, flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.10) inset' },
  };
  if (code === 'en') return (
    <svg {...common}>
      <rect width="30" height="21" fill="#fff"/>
      {[0, 1, 2, 3, 4, 5, 6].map(i => <rect key={i} y={i * 3.23} width="30" height="1.615" fill="#b22234"/>)}
      <rect width="13" height="11.3" fill="#3c3b6e"/>
      {[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => (
        <circle key={r + '-' + c} cx={1.7 + c * 2.55 + (r % 2 ? 1.27 : 0)} cy={1.7 + r * 2.65} r="0.6" fill="#fff"/>
      )))}
    </svg>
  );
  if (code === 'es') return (
    <svg {...common}>
      <rect width="30" height="21" fill="#c60b1e"/>
      <rect y="5.25" width="30" height="10.5" fill="#ffc400"/>
    </svg>
  );
  return (
    <svg {...common}>
      <rect width="30" height="21" fill="#009b3a"/>
      <path d="M15 2.6 27.4 10.5 15 18.4 2.6 10.5z" fill="#fedf00"/>
      <circle cx="15" cy="10.5" r="4.4" fill="#002776"/>
      <path d="M10.8 8.6a10.7 10.7 0 0 1 8.5 3.4q-.05.5-.2.95a9.9 9.9 0 0 0-8.6-3.4q.1-.5.3-.95z" fill="#fff"/>
    </svg>
  );
}

// ── Seletor de idioma: só a bandeirinha (o nome aparece só dentro do menu) ────
function LangSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);
  const box = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const current = SEWE_LOCALES.find(l => l.code === locale) || SEWE_LOCALES[0];

  return (
    <div className="lang" ref={box}>
      <button type="button" className="lang-btn" onClick={() => setOpen(v => !v)}
        aria-label={tr('nav.lang') + ': ' + current.name} title={current.name}
        aria-haspopup="listbox" aria-expanded={open}>
        <Flag code={current.code} size={21}/>
        <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="lang-menu" role="listbox" aria-label={tr('nav.lang')}>
          {SEWE_LOCALES.map(l => (
            <button key={l.code} type="button" role="option" aria-selected={l.code === locale}
              className={l.code === locale ? 'lang-opt lang-opt-on' : 'lang-opt'}
              onClick={() => { setLocale(l.code); setOpen(false); }}>
              <Flag code={l.code} size={20}/>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
      <style>{`
        .lang { position: relative; display: inline-flex; }
        .lang-btn {
          display: inline-flex; align-items: center; gap: 5px; padding: 6px 8px;
          border: 1px solid var(--line); border-radius: 99px; background: #fff;
          color: var(--text-3); cursor: pointer;
          transition: border-color .15s ease, color .15s ease, box-shadow .15s ease;
        }
        .lang-btn:hover { border-color: var(--turquoise-2); color: var(--navy-900); box-shadow: var(--shadow-xs); }
        .lang-menu {
          position: absolute; top: calc(100% + 8px); right: 0; z-index: 70; min-width: 178px;
          background: #fff; border: 1px solid var(--line); border-radius: 12px;
          box-shadow: var(--shadow-md); padding: 6px;
        }
        .lang-opt {
          display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 10px;
          border: 0; border-radius: 8px; background: transparent; cursor: pointer;
          font-size: 14px; color: var(--text-2); text-align: left;
          transition: background .12s ease, color .12s ease;
        }
        .lang-opt:hover { background: var(--bg-soft); color: var(--turquoise-ink); }
        .lang-opt-on { color: var(--navy-900); font-weight: 600; background: var(--bg-soft); }
      `}</style>
    </div>
  );
}

// Faixa discreta avisando que a página ainda não foi traduzida (não aparece no PT).
function I18nNotice() {
  const locale = useLocale();
  if (locale === 'pt' || !tr('i18n.notice')) return null;
  return (
    <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ padding: '9px var(--gutter)', fontSize: 12.5, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Flag code={locale} size={16}/>
        <span>{tr('i18n.notice')}</span>
      </div>
    </div>
  );
}

Object.assign(window, { SEWE_LOCALES, SEWE_I18N_READY, tr, tx, useLocale, getLocale, setLocale, Flag, LangSwitcher, I18nNotice });

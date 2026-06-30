// MinerConect — standalone product page (own brand: navy + gold).
// Audience: distributor first, but with a routing door for industry / any company.
// Reuses Icon + MinerLogo from brand.jsx (loaded before this file).

const GOLD = '#f5a623';
const GOLD_2 = '#ffb938';

function MinerHeader() {
  const [open, setOpen] = React.useState(false);
  const links = [
    { label: 'A ferramenta', href: '#ferramenta' },
    { label: 'Como usar', href: '#usos' },
    { label: 'Para quem', href: '#publico' },
  ];
  return (
    <header className="mc-header">
      <div className="mc-container mc-nav">
        <a href="minerconect.html" style={{ display: 'inline-flex' }}><MinerLogo height={34}/></a>
        <nav className="mc-nav-links">
          {links.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="index.html" className="mc-back">← SEWE Group</a>
          <a href="#contato" className="mc-btn mc-btn-gold mc-hide-mob">Agendar demo</a>
        </div>
      </div>
    </header>
  );
}

function MinerHero() {
  return (
    <section className="mc-hero">
      <div aria-hidden className="mc-hero-mesh"/>
      <div className="mc-container mc-hero-inner">
        <div className="mc-hero-copy">
          <div className="mc-pill"><span className="mc-dot"/> WHATSAPP OFICIAL · META BUSINESS</div>
          <h1>
            Inteligência na <span className="mc-grad">qualificação de leads</span> e na conversa com sua base.
          </h1>
          <p>
            O MinerConect coloca o distribuidor falando com toda a sua base de clientes e leads usando
            inteligência artificial e o WhatsApp oficial da Meta. Marketing, convites, parabenização e
            ações comerciais — em escala, sem perder a régua.
          </p>
          <div className="mc-hero-cta">
            <a href="#contato" className="mc-btn mc-btn-gold mc-btn-lg">Agendar demonstração <Icon name="arrow" size={18} stroke={2.2}/></a>
            <a href="#ferramenta" className="mc-btn mc-btn-ghost mc-btn-lg">Ver a ferramenta</a>
          </div>
          <div className="mc-hero-meta">
            <span><Icon name="check" size={15} stroke={2.6}/> API oficial Meta</span>
            <span><Icon name="check" size={15} stroke={2.6}/> CRM Sewe incluso</span>
            <span><Icon name="check" size={15} stroke={2.6}/> LGPD</span>
          </div>
        </div>
        <div className="mc-hero-art">
          <MinerChat/>
        </div>
      </div>
    </section>
  );
}

// Fake WhatsApp-style conversation, gently animated.
function MinerChat() {
  const script = [
    { from: 'ia', text: 'Oi, João! Faz 12 dias que a Distribuidora Sul não faz um pedido. 👀' },
    { from: 'ia', text: 'Separei uma condição em 3 itens de Curva A que costumam girar com você.' },
    { from: 'lead', text: 'Boa! Me manda os preços?' },
    { from: 'ia', text: 'Claro 👇 já com seu desconto de carteira aplicado.' },
  ];
  const [n, setN] = React.useState(1);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(script.length); return; }
    if (n >= script.length) { const r = setTimeout(() => setN(1), 3200); return () => clearTimeout(r); }
    const t = setTimeout(() => setN(v => v + 1), 1100);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="mc-chat">
      <div className="mc-chat-top">
        <span className="mc-chat-av">SC</span>
        <div>
          <div className="mc-chat-name">SEWE · Comercial</div>
          <div className="mc-chat-status"><span className="mc-online"/> online · IA ativa</div>
        </div>
        <Icon name="sparkle" size={18} style={{ color: GOLD, marginLeft: 'auto' }}/>
      </div>
      <div className="mc-chat-body">
        {script.slice(0, n).map((m, i) => (
          <div key={i} className={'mc-msg ' + (m.from === 'ia' ? 'mc-msg-ia' : 'mc-msg-lead')}>
            {m.text}
          </div>
        ))}
        {n < script.length && <div className="mc-msg mc-msg-ia mc-typing"><span/><span/><span/></div>}
      </div>
      <div className="mc-chat-input"><span>Mensagem automatizada · template aprovado</span><Icon name="zap" size={16} style={{ color: GOLD }}/></div>
    </div>
  );
}

function MinerFeatures() {
  const feats = [
    { icon: 'brain',  t: 'IA conversacional', d: 'A IA puxa o assunto certo para cada cliente — reativação, oferta, cobrança ou relacionamento — no tom da sua operação.' },
    { icon: 'search', t: 'Localizador de leads', d: 'Identifica automaticamente o contato correto do decisor de cada lead, para você falar com quem realmente compra.' },
    { icon: 'zap',    t: 'WhatsApp oficial Meta', d: 'Disparos e conversas pela API oficial, com templates aprovados — sem risco de bloqueio, com entregabilidade real.' },
    { icon: 'users',  t: 'CRM Sewe integrado', d: 'Cada conversa cai na carteira certa, com histórico e próxima ação. O comercial enxerga tudo num lugar só.' },
  ];
  return (
    <section id="ferramenta" className="mc-section">
      <div className="mc-container">
        <div className="mc-head">
          <div className="mc-eyebrow">A FERRAMENTA</div>
          <h2>Comunicação em escala, com a inteligência de um vendedor.</h2>
        </div>
        <div className="mc-feat-grid">
          {feats.map((f, i) => (
            <div key={i} className="mc-feat">
              <span className="mc-feat-icon"><Icon name={f.icon} size={24} stroke={1.8}/></span>
              <div className="mc-feat-t">{f.t}</div>
              <p className="mc-feat-d">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MinerUses() {
  const uses = [
    { icon: 'target',   t: 'Ações comerciais', d: 'Campanhas e ofertas segmentadas por carteira e curva.' },
    { icon: 'sparkle',  t: 'Marketing', d: 'Lançamentos, novidades e conteúdo direto na base.' },
    { icon: 'calendar', t: 'Convites', d: 'Eventos, treinamentos e visitas com confirmação automática.' },
    { icon: 'star',     t: 'Parabenização', d: 'Aniversários e datas que mantêm o relacionamento quente.' },
  ];
  return (
    <section id="usos" className="mc-section mc-section-soft">
      <div className="mc-container">
        <div className="mc-head">
          <div className="mc-eyebrow">COMO USAR</div>
          <h2>Uma base inteira ativada — sem time inteiro digitando.</h2>
        </div>
        <div className="mc-use-grid">
          {uses.map((u, i) => (
            <div key={i} className="mc-use">
              <span className="mc-use-icon"><Icon name={u.icon} size={20} stroke={1.9}/></span>
              <div>
                <div className="mc-use-t">{u.t}</div>
                <div className="mc-use-d">{u.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MinerAudience() {
  const who = [
    { tag: 'PRINCIPAL', t: 'Distribuidores', d: 'Ative sua carteira de clientes e leads, reative quem parou de comprar e mantenha o relacionamento no automático.', primary: true },
    { tag: 'TAMBÉM PARA', t: 'Indústrias', d: 'Fale com toda a rede de distribuidores e pontos de venda com uma comunicação padronizada e inteligente.' },
    { tag: 'TAMBÉM PARA', t: 'Qualquer empresa', d: 'Precisa falar com uma base grande de contatos com IA e WhatsApp oficial? O MinerConect atende.' },
  ];
  return (
    <section id="publico" className="mc-section">
      <div className="mc-container">
        <div className="mc-head">
          <div className="mc-eyebrow">PARA QUEM É</div>
          <h2>Feito para o distribuidor. Aberto para a indústria e além.</h2>
        </div>
        <div className="mc-who-grid">
          {who.map((w, i) => (
            <div key={i} className={'mc-who' + (w.primary ? ' mc-who-primary' : '')}>
              <div className="mc-who-tag">{w.tag}</div>
              <div className="mc-who-t">{w.t}</div>
              <p className="mc-who-d">{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MinerCTA() {
  return (
    <section id="contato" className="mc-cta">
      <div aria-hidden className="mc-cta-glow"/>
      <div className="mc-container mc-cta-inner">
        <MinerLogo height={48}/>
        <h2>Pronto para falar com toda a sua base?</h2>
        <p>Agende uma demonstração e veja o MinerConect ativando clientes e leads em tempo real.</p>
        <div className="mc-hero-cta" style={{ justifyContent: 'center' }}>
          <a href="https://wa.me/5548984704389" className="mc-btn mc-btn-gold mc-btn-lg">Falar no WhatsApp <Icon name="arrow" size={18} stroke={2.2}/></a>
          <a href="index.html" className="mc-btn mc-btn-ghost mc-btn-lg">Voltar para SEWE Group</a>
        </div>
      </div>
    </section>
  );
}

function MinerFooter() {
  return (
    <footer className="mc-footer">
      <div className="mc-container mc-footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <MinerLogo height={30}/>
          <span className="mc-footer-by">um produto <a href="index.html">SEWE Group</a></span>
        </div>
        <div className="mc-footer-meta">© {new Date().getFullYear()} SEWE Group · Inteligência no seu negócio!</div>
      </div>
    </footer>
  );
}

function MinerApp() {
  return (
    <>
      <MinerHeader/>
      <main>
        <MinerHero/>
        <MinerFeatures/>
        <MinerUses/>
        <MinerAudience/>
        <MinerCTA/>
      </main>
      <MinerFooter/>
    </>
  );
}

// Guard: only mount on the MinerConect page (see minerconect.html). Prevents the
// design-system bundle from rendering this page into another card's #root.
const __minerRoot = document.getElementById('miner-root');
if (__minerRoot) ReactDOM.createRoot(__minerRoot).render(<MinerApp/>);

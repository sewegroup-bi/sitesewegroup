// Content pages: Quem Somos, Prêmio, Blog index, Blog post, FAQ.
// Depends on: brand.jsx (Icon), layout.jsx (SiteHeader/SiteFooter/PageHero), blogdata.jsx (SEWE_POSTS).
// faq.html additionally loads rest.jsx for FAQSection.

// Data no formato do idioma escolhido (pt-BR: "24 de fev. de 2025").
const DATE_LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
function fmtDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  const loc = DATE_LOCALES[getLocale()] || 'pt-BR';
  return d.toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' });
}
const COVER = {
  premio: { bg: 'linear-gradient(135deg, #1a2844 0%, #2d436c 60%, #0e7a7c 130%)', chip: 'var(--turquoise)' },
  blog:   { bg: 'linear-gradient(135deg, #0e1729 0%, #2d436c 120%)', chip: 'var(--turquoise)' },
};

// ── Card used on Blog index + Prêmio winners list ──
function PostCard({ post }) {
  const c = COVER[post.category] || COVER.blog;
  return (
    <a href={'/' + post.slug} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', textDecoration: 'none' }}>
      <div className="grain" style={{ background: c.bg, padding: '22px 22px 20px', color: '#fff', position: 'relative', minHeight: 132, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '0.12em', color: c.chip, fontWeight: 600 }}>{post.cover.tag}</div>
        {post.cover.logo && (
          <div style={{ background: post.cover.logoBg || '#fff', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 64 }}>
            <img src={post.cover.logo} alt="" style={{ maxHeight: 44, maxWidth: '80%', objectFit: 'contain', display: 'block' }}/>
          </div>
        )}
        {post.cover.metric && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="display" style={{ fontSize: 40, color: '#fff', lineHeight: 1 }}>{post.cover.metric}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{post.cover.metricLabel}</span>
          </div>
        )}
      </div>
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{fmtDate(post.date)} · {tx(post.readTime)}</div>
        <h3 style={{ fontSize: 20, lineHeight: 1.25 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>{post.excerpt}</p>
        <span style={{ marginTop: 'auto', fontSize: 13, color: 'var(--turquoise-ink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{tx('Ler artigo')} <Icon name="arrow" size={13}/>
        </span>
      </div>
    </a>
  );
}

// ── Renders the body blocks of a post ──
function PostBlocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === 'lead') return <p key={i} style={{ fontSize: 22, lineHeight: 1.5, color: 'var(--navy-900)', fontWeight: 500, margin: '0 0 8px' }}>{b.text}</p>;
    if (b.type === 'h')    return <h2 key={i} style={{ fontSize: 26, marginTop: 16 }}>{b.text}</h2>;
    if (b.type === 'p')    return <p key={i} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text)' }}>{b.text}</p>;
    if (b.type === 'list') return (
      <ul key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {b.items.map((it, j) => (
          <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16.5, color: 'var(--text)', lineHeight: 1.6 }}>
            <span style={{ marginTop: 3, width: 18, height: 18, borderRadius: 6, background: 'rgba(117,227,228,0.2)', color: 'var(--turquoise-ink)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Icon name="check" size={11} stroke={3}/>
            </span>
            {it}
          </li>
        ))}
      </ul>
    );
    if (b.type === 'metrics') return (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, margin: '4px 0' }}>
        {b.items.map((m, j) => (
          <div key={j} style={{ padding: '18px 20px', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 14 }}>
            <div className="display" style={{ fontSize: 30, color: 'var(--navy-900)', lineHeight: 1.1 }}>{m.value}</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.45 }}>{m.label}</div>
          </div>
        ))}
      </div>
    );
    if (b.type === 'callout') return (
      <div key={i} style={{ padding: '18px 22px', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderLeft: '3px solid var(--turquoise)', borderRadius: 14, margin: '4px 0' }}>
        <p style={{ fontSize: 18.5, lineHeight: 1.6, color: 'var(--navy-900)', fontWeight: 500, margin: 0 }}>{b.text}</p>
      </div>
    );
    if (b.type === 'stat') return (
      <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '20px 24px', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 14, margin: '4px 0' }}>
        <span className="display" style={{ fontSize: 48, color: 'var(--navy-900)', lineHeight: 1 }}>{b.value}</span>
        <span style={{ fontSize: 15, color: 'var(--text-2)' }}>{b.label}</span>
      </div>
    );
    if (b.type === 'quote') return (
      <blockquote key={i} style={{ margin: '4px 0', padding: '4px 0 4px 22px', borderLeft: '3px solid var(--turquoise)' }}>
        <p style={{ fontSize: 20, fontStyle: 'italic', color: 'var(--navy-900)', lineHeight: 1.5 }}>"{b.text}"</p>
        {b.who && <footer style={{ marginTop: 8, fontSize: 14, color: 'var(--text-3)' }}>, {b.who}</footer>}
      </blockquote>
    );
    return null;
  });
}

// ── Blog index ──
function BlogIndexPage() {
  useLocale();   // re-renderiza quando o idioma muda
  const posts = window.SEWE_POSTS || [];
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow={tx('Blog SEWE')} title={tx('Inteligência de dados, na prática.')}
        lead={tx('Como distribuidor decide melhor: capital de giro, ruptura, mix e reforma tributária, escritos por quem implanta BI em distribuição todo mês.')}/>
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="post-grid">
            {posts.map(p => <PostCard key={p.slug} post={p}/>)}
          </div>
        </div>
      </section>
      <InstagramSection/>
      <SiteFooter/>
      <style>{`@media(max-width:960px){.post-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:640px){.post-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}

// ── Single blog post ──
function BlogPostPage({ slug }) {
  useLocale();   // re-renderiza quando o idioma muda
  const post = (window.SEWE_POSTS || []).find(p => p.slug === slug);
  if (!post) return (<><SiteHeader/><div className="container" style={{ padding: '120px 0', textAlign: 'center' }}><h1>{tx('Post não encontrado')}</h1><p style={{ marginTop: 12 }}><a href="/blog" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>{tx('Voltar para o blog')}</a></p></div><SiteFooter/></>);
  const c = COVER[post.category] || COVER.blog;
  const backHref = post.category === 'premio' ? '/premio' : '/blog';
  const backLabel = post.category === 'premio' ? 'Prêmio SEWE' : 'Blog';
  return (
    <>
      <SiteHeader/>
      <section className="grain" style={{ background: c.bg, color: '#fff', paddingTop: 56, paddingBottom: 56, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 360px at 85% 0%, rgba(117,227,228,0.16), transparent 60%)' }}/>
        <div className="container" style={{ position: 'relative', maxWidth: 820 }}>
          <a href={backHref} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={13}/></span> {backLabel}
          </a>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.12em', color: c.chip, fontWeight: 600, marginTop: 18 }}>{post.cover.tag}</div>
          <h1 style={{ color: '#fff', marginTop: 12, fontSize: 'clamp(30px,4vw,48px)' }}>{post.title}</h1>
          <div style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{post.author} · {fmtDate(post.date)} · {tx(post.readTime)}</div>
        </div>
      </section>
      <article className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {post.cover.logo && (
            <div style={{ background: post.cover.logoBg || '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: '26px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 96 }}>
              <img src={post.cover.logo} alt={post.title} style={{ maxHeight: 72, maxWidth: '70%', objectFit: 'contain', display: 'block' }}/>
            </div>
          )}
          <PostBlocks blocks={post.blocks}/>
          {post.references && post.references.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12 }}>{tx('Referências')}</div>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {post.references.map((r, i) => (
                  <li key={i} style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {r.source && <strong style={{ color: 'var(--navy-900)' }}>{r.source}: </strong>}
                    <a href={r.url} target="_blank" rel="noopener noreferrer nofollow" style={{ color: 'var(--turquoise-ink)', fontWeight: 500 }}>{r.label}</a>
                    {r.note && <span> &mdash; {r.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(() => {
            const a = (window.SEWE_AUTHORS || {})[post.author];
            if (!a) return null;
            const initials = post.author.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
            return (
              <div style={{ marginTop: 20, padding: 24, borderRadius: 16, border: '1px solid var(--line)', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                {a.photo
                  ? <img src={a.photo} alt={post.author} style={{ width: 64, height: 64, borderRadius: 99, objectFit: 'cover', flexShrink: 0 }}/>
                  : <div aria-hidden style={{ width: 64, height: 64, borderRadius: 99, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, var(--navy-900), var(--turquoise-ink))', color: '#fff', fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 22 }}>{initials}</div>}
                <div>
                  <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{tx('Sobre o autor')}</div>
                  <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 18, color: 'var(--navy-900)', marginTop: 4 }}>{post.author}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--turquoise-ink)', fontWeight: 600, marginTop: 2 }}>{a.role}</div>
                  <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 8 }}>{a.bio}</p>
                  {a.linkedin && <a href={a.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 13.5, color: 'var(--turquoise-ink)', fontWeight: 600 }}>LinkedIn <Icon name="arrow" size={13}/></a>}
                </div>
              </div>
            );
          })()}
          <div style={{ marginTop: 24, padding: 24, borderRadius: 16, background: 'var(--bg-soft)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 18, color: 'var(--navy-900)' }}>{tx('Quer esse nível de gestão na sua distribuição?')}</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>{tx('Agende um diagnóstico gratuito de 30 minutos.')}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="/#agendar" className="btn btn-primary">{(post.cta && post.cta.primary) || tr('cta.primary')} <Icon name="arrow" size={16} className="chev"/></a>
              {post.cta && post.cta.secondary && (
                <a href="https://wa.me/5548984704389" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#fff', color: 'var(--navy-900)', border: '1px solid var(--line)' }}>{post.cta.secondary}</a>
              )}
            </div>
          </div>
          {/* Compartilhar, curtir e comentar — engage.jsx, só carregado nas páginas de post */}
          {typeof PostEngagement === 'function' && <PostEngagement slug={post.slug} title={post.title}/>}
        </div>
      </article>
      <SiteFooter/>
    </>
  );
}

// ── Prêmio ──
function PremioPage() {
  useLocale();   // re-renderiza quando o idioma muda
  const winners = (window.SEWE_POSTS || []).filter(p => p.category === 'premio');
  const pillars = [
    { icon: 'boxes',  t: tx('Organização'),   d: tx('Dados unificados e processos claros, a casa em ordem antes de crescer.') },
    { icon: 'dollar', t: tx('Lucratividade'), d: tx('Crescer com margem saudável, controle de ruptura e mix inteligente.') },
    { icon: 'trending', t: tx('Prosperidade'), d: tx('Resultado que se distribui: para a operação, o time e os clientes.') },
    { icon: 'target', t: tx('Bons Processos'), d: tx('Decisão diária guiada por dado, não por achismo nem por planilha.') },
  ];
  const steps = [
    { n: '01', t: tx('Acompanhamento'), d: tx('Ao longo do ano, os indicadores de cada distribuidor são monitorados na plataforma SEWE.') },
    { n: '02', t: tx('Análise dos pilares'), d: tx('Avaliamos organização, lucratividade, prosperidade e bons processos com base em dados reais.') },
    { n: '03', t: tx('Reconhecimento'), d: tx('O distribuidor que mais evoluiu é reconhecido como vencedor do ciclo.') },
  ];
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow="Prêmio SEWE" title={tx('Prêmio SEWE de Gestão Inteligente e Prosperidade.')}
        lead={tx('Um reconhecimento aos distribuidores que transformam dados em decisões, e decisões em prosperidade.')}>
        <div style={{ marginTop: 24 }}>
          <a href="#vencedores" className="btn btn-primary">{tx('Ver vencedores')} <Icon name="arrow" size={16} className="chev"/></a>
        </div>
      </PageHero>

      {/* Pillars */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
            <div className="eyebrow">{tx('O que avaliamos')}</div>
            <h2 style={{ marginTop: 14 }}>{tx('Quatro pilares de uma gestão que prospera.')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="pillar-grid">
            {pillars.map((p, i) => (
              <div key={i} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(45,67,108,0.07)', color: 'var(--navy-700)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={p.icon} size={22} stroke={1.8}/>
                </div>
                <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 19, color: 'var(--navy-900)' }}>{p.t}</div>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
            <div className="eyebrow">{tx('Como funciona')}</div>
            <h2 style={{ marginTop: 14 }}>{tx('Do dado ao reconhecimento.')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="pillar-grid">
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: 28 }}>
                <div className="display" style={{ fontSize: 40, color: 'var(--turquoise-2)' }}>{s.n}</div>
                <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 19, color: 'var(--navy-900)', marginTop: 8 }}>{s.t}</div>
                <p style={{ fontSize: 14.5, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winners */}
      <section id="vencedores" className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
            <div className="eyebrow">Vencedores</div>
            <h2 style={{ marginTop: 14 }}>{tx('Quem já levou o Prêmio SEWE.')}</h2>
          </div>
          {winners.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="post-grid">
              {winners.map(p => <PostCard key={p.slug} post={p}/>)}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-2)' }}>{tx('Os vencedores serão anunciados em breve.')}</p>
          )}
        </div>
      </section>

      {/* O Prêmio é prova social; aqui ele ganha um pedido de próximo passo. */}
      <section className="section grain" style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 55%, var(--turquoise-ink) 120%)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="eyebrow" style={{ color: 'var(--turquoise)' }}>{tx('Próximo ciclo')}</div>
          <h2 style={{ color: '#fff', marginTop: 14 }}>{tx('Quer ser avaliado no próximo Prêmio SEWE?')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 16, fontSize: 18 }}>
            {tx('A avaliação começa pelos seus indicadores. Em 30 minutos olhamos a sua operação e mostramos em que ponto dos quatro pilares você está hoje.')}
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#agendar" className="btn btn-accent btn-lg">{tx('Quero ser avaliado')} <Icon name="arrow" size={16} className="chev"/></a>
            <a href="/distribuidor" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{tr('cta.secondary')}</a>
          </div>
        </div>
      </section>
      <SiteFooter/>
      <style>{`@media(max-width:960px){.pillar-grid{grid-template-columns:1fr 1fr !important;}.post-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:600px){.pillar-grid{grid-template-columns:1fr !important;}.post-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}

// ── Quem Somos (história) ──
function QuemSomosPage() {
  useLocale();   // re-renderiza quando o idioma muda
  const timeline = [
    { y: '2018–2020', t: tx('Nasce da operação, não do laboratório'), d: tx('A SEWE surge de dentro do setor de distribuição, gente que viveu o problema de afogar em dados e passar fome de decisão. O foco desde o início: traduzir dados em ação.') },
    { y: '2021–2022', t: tx('Parceria oficial Qlik + foco no Pet/Vet'), d: tx('A escolha pela plataforma Qlik consolida a base tecnológica. Os primeiros distribuidores do setor Pet e Veterinário provam o modelo: BI vertical, pronto, com DNA de distribuição.') },
    { y: '2023–2025', t: tx('Expansão de setores e da IA aplicada'), d: tx('A SEWE chega a indústrias, agro e distribuidores de tecnologia. A inteligência artificial passa a rodar nos bastidores, entregando decisões prontas em vez de mais gráficos.') },
    { y: tx('Hoje'), t: tx('Referência nacional em dados para distribuição'), d: tx('São mais de 500 distribuidores e R$ 5 bilhões em faturamento monitorado, com cobertura nacional e um ecossistema completo: BI, Integration e Sales.') },
  ];
  const vmv = [
    { k: tx('Missão'), icon: 'target', theme: 'turq', d: tx('Facilitar a vida dos clientes, por meio de uma atuação consultiva e colaborativa que transforma tecnologia em resultados.') },
    { k: tx('Visão'), icon: 'zap', theme: 'navy', d: tx('Ser reconhecido por nossos clientes como o melhor parceiro estratégico de tecnologia.') },
  ];
  const valores = [
    { k: tx('Comprometimento'), icon: 'shield',
      sig: tx('Agimos com responsabilidade, propósito e dedicação, buscando sempre o melhor resultado para clientes, equipe e parceiros.'),
      com: tx('Cumprimos o que prometemos, cultivamos relações de confiança e buscamos excelência em cada entrega.'),
      imp: tx('Clientes que confiam na nossa marca e percebem consistência e credibilidade em tudo o que fazemos.') },
    { k: tx('Eficiência'), icon: 'zap',
      sig: tx('Buscamos produtividade e qualidade em tudo o que fazemos, eliminando desperdícios e simplificando processos.'),
      com: tx('Planejamos com clareza, executamos com foco e revisamos as práticas para o melhor resultado com o menor esforço.'),
      imp: tx('Clientes percebem agilidade, organização e confiança em cada interação com a SEWE.') },
    { k: tx('Entendimento de Negócios'), icon: 'search',
      sig: tx('Antes de aplicar tecnologia, compreendemos a essência e os desafios do negócio do cliente, adaptando-nos ao seu contexto.'),
      com: tx('Atuamos como consultores: questionando, analisando e traduzindo tecnologia em resultados práticos.'),
      imp: tx('Soluções personalizadas, com aderência real e mensurável ao negócio de cada cliente.') },
    { k: tx('Colaboração'), icon: 'users',
      sig: tx('Acreditamos que resultados sustentáveis nascem da colaboração entre pessoas, dentro da equipe e com os clientes.'),
      com: tx('Compartilhamos conhecimento, ouvimos diferentes perspectivas e trabalhamos de forma integrada e transparente.'),
      imp: tx('Um ambiente saudável, com alto engajamento interno e relacionamentos de longo prazo com os clientes.') },
    { k: tx('Inovação Aplicada'), icon: 'sparkle',
      sig: tx('Usamos dados, tecnologia e conhecimento para transformar complexidade em simplicidade e informação em valor.'),
      com: tx('Incentivamos o aprendizado contínuo, a experimentação e a busca por novas formas de gerar impacto real.'),
      imp: tx('Clientes desenvolvem novas capacidades e evoluem continuamente com as nossas soluções.') },
    { k: tx('Resultados Consistentes'), icon: 'trophy',
      sig: tx('O que fazemos deve gerar impacto tangível: resultados concretos para os clientes e aprendizado para a equipe.'),
      com: tx('Estabelecemos metas claras, medimos desempenho e celebramos conquistas.'),
      imp: tx('Resultados sustentáveis e consistentes, que reforçam a nossa credibilidade e propósito.') },
    { k: tx('Desenvolvimento Integrado'), icon: 'link',
      sig: tx('Unimos pessoas, processos e tecnologia para o crescimento equilibrado de clientes, colaboradores e parceiros.'),
      com: tx('Atuamos como construtores de soluções e conhecimento, com troca constante de experiências e metodologias.'),
      imp: tx('Um ambiente de evolução conectada, onde todos prosperam em conjunto.') },
  ];
  const [valAtivo, setValAtivo] = React.useState(0);
  const V = valores[valAtivo];
  return (
    <>
      <SiteHeader translated/>
      <PageHero eyebrow={tx('Quem Somos')} title={tx('A inteligência de dados que nasceu dentro da distribuição.')}
        lead={tx('A SEWE não veio de um laboratório de software. Veio do chão do setor, e por isso fala a língua de quem vive ruptura, curva ABC, positivação e capital de giro.')}/>

      {/* Story / timeline */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="eyebrow">{tx('Nossa história')}</div>
          <h2 style={{ marginTop: 14, marginBottom: 40 }}>{tx('Uma trajetória guiada por dado.')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((m, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 28 }} className="tl-row">
                <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 18, color: 'var(--turquoise-ink)', paddingTop: 2 }}>{m.y}</div>
                <div style={{ position: 'relative', paddingLeft: 28, paddingBottom: i < timeline.length - 1 ? 36 : 0, borderLeft: '2px solid var(--line)' }}>
                  <span style={{ position: 'absolute', left: -8, top: 4, width: 14, height: 14, borderRadius: 99, background: 'var(--turquoise)', border: '3px solid #fff', boxShadow: '0 0 0 2px var(--turquoise-2)' }}/>
                  <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 20, color: 'var(--navy-900)' }}>{m.t}</div>
                  <p style={{ fontSize: 16, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.65 }}>{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atuação / mapa das Américas */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="atua-grid">
            <div>
              <div className="eyebrow">{tx('Onde atuamos')}</div>
              <h2 style={{ marginTop: 14 }}>{tx('Do Brasil para as Américas.')}</h2>
              <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 16, lineHeight: 1.65, maxWidth: 460 }}>{tx('Atendemos distribuidores e indústrias em todos os estados do Brasil, com operações internacionais em expansão pelo continente.')}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', display: 'grid', gap: 14 }}>
                {[
                  { pais: 'Brasil', d: tx('Presença em todos os estados') },
                  { pais: tx('Estados Unidos'), d: tx('Operação internacional · Sewe Integration') },
                  { pais: 'Chile', d: tx('Operação internacional · Sewe Integration') },
                  { pais: tx('Colômbia'), d: tx('Operação internacional · Sewe Integration') },
                ].map((x, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ marginTop: 5, width: 14, height: 14, borderRadius: 4, background: 'linear-gradient(135deg, #2d436c, #3f7d8c)', flexShrink: 0 }}/>
                    <div>
                      <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 17, color: 'var(--navy-900)' }}>{x.pais}</div>
                      <div style={{ fontSize: 13.5, color: 'var(--text-2)' }}>{x.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--text-3)' }}>
                <span style={{ width: 11, height: 11, borderRadius: 3, background: 'linear-gradient(135deg, #2d436c, #3f7d8c)' }}/>{tx('Países com operação SEWE')}</div>
            </div>
            <div style={{ maxWidth: 480, margin: '0 auto', width: '100%' }}>
              {typeof AmericasMap !== 'undefined' ? <AmericasMap/> : null}
            </div>
          </div>
        </div>
        <style>{`
          .atua-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
          @media (max-width: 860px) { .atua-grid { grid-template-columns: 1fr; gap: 32px; } }
        `}</style>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 940, margin: '0 auto' }} className="mv-grid">
            {vmv.map((v, i) => (
              <div key={i} className={'mv-card mv-' + v.theme}>
                <span className="mv-ic"><Icon name={v.icon} size={26} stroke={1.9}/></span>
                <div className="mv-k">{v.k}</div>
                <p className="mv-d">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Valores — interativo */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
            <div className="eyebrow">{tx('Nossos valores')}</div>
            <h2 style={{ marginTop: 14 }}>{tx('O que nos guia, na prática.')}</h2>
            <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 14 }}>{tx('Selecione um valor e veja o que ele significa, como praticamos e o que ele gera para você.')}</p>
          </div>
          <div className="val-grid">
            <div className="val-list">
              {valores.map((v, i) => (
                <button key={i} type="button" className={'val-chip' + (i === valAtivo ? ' on' : '')} onClick={() => setValAtivo(i)}>
                  <span className="val-chip-ic"><Icon name={v.icon} size={16} stroke={1.9}/></span>
                  {v.k}
                </button>
              ))}
            </div>
            <div className="val-panel" key={valAtivo}>
              <div className="val-panel-h"><span className="val-panel-ic"><Icon name={V.icon} size={22} stroke={1.8}/></span>{V.k}</div>
              <p className="val-sig">{V.sig}</p>
              <div className="val-detail">
                <div className="val-block">
                  <div className="val-block-t">{tx('Como praticamos')}</div>
                  <p>{V.com}</p>
                </div>
                <div className="val-block">
                  <div className="val-block-t">{tx('O que gera para você')}</div>
                  <p>{V.imp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .val-grid { display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start; }
          .val-list { display: flex; flex-direction: column; gap: 8px; }
          .val-chip { display: flex; align-items: center; gap: 11px; text-align: left; padding: 13px 16px; border-radius: 12px;
            background: #fff; border: 1px solid var(--line); color: var(--navy-900);
            font-family: var(--ff-display); font-weight: 600; font-size: 14.5px; cursor: pointer; transition: all .18s ease; }
          .val-chip:hover { border-color: var(--turquoise-2); }
          .val-chip.on { background: var(--navy-900); border-color: var(--navy-900); color: #fff; }
          .val-chip-ic { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; flex-shrink: 0;
            background: rgba(117,227,228,0.18); color: var(--turquoise-ink); }
          .val-chip.on .val-chip-ic { background: rgba(117,227,228,0.22); color: var(--turquoise); }
          .val-panel { background: #fff; border: 1px solid var(--line); border-radius: var(--r-xl); padding: 34px 38px;
            box-shadow: var(--shadow-sm); animation: valFade .3s ease; }
          @keyframes valFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .val-panel-h { display: flex; align-items: center; gap: 14px; font-family: var(--ff-display); font-weight: 700;
            font-size: clamp(21px, 2.4vw, 27px); color: var(--navy-900); }
          .val-panel-ic { width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; flex-shrink: 0;
            background: rgba(117,227,228,0.18); color: var(--turquoise-ink); }
          .val-sig { font-size: 17px; color: var(--navy-900); line-height: 1.6; margin-top: 18px; }
          .val-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 24px; padding-top: 22px; border-top: 1px solid var(--line-2); }
          .val-block-t { font-family: var(--ff-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--turquoise-ink); margin-bottom: 8px; }
          .val-block p { font-size: 14.5px; color: var(--text-2); line-height: 1.6; }
          @media (max-width: 860px) {
            .val-grid { grid-template-columns: 1fr; }
            .val-list { flex-direction: row; flex-wrap: wrap; }
            .val-chip { flex: 1 1 auto; }
            .val-detail { grid-template-columns: 1fr; gap: 18px; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="section grain" style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 60%, var(--turquoise-ink) 130%)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ color: '#fff' }}>{tx('Vamos transformar sua distribuição?')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 16, fontSize: 18 }}>{tx('Um diagnóstico gratuito de 30 minutos, com os seus dados, sem compromisso.')}</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#agendar" className="btn btn-accent btn-lg">{tr('cta.primary')} <Icon name="arrow" size={16} className="chev"/></a>
            <a href="https://wa.me/5548984704389" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{tx('Falar no WhatsApp')}</a>
          </div>
        </div>
      </section>
      <SiteFooter/>
      <style>{`
        @media(max-width:960px){.pillar-grid{grid-template-columns:1fr !important;}}
        @media(max-width:600px){.tl-row{grid-template-columns:1fr !important;gap:6px !important;}}
        .mv-card { position: relative; overflow: hidden; border-radius: var(--r-xl); padding: 40px 38px;
          border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
        .mv-turq { background: linear-gradient(155deg, rgba(117,227,228,0.16) 0%, rgba(117,227,228,0.05) 55%, #ffffff 100%); }
        .mv-navy { background: linear-gradient(155deg, var(--navy-900) 0%, var(--navy-800, #223558) 70%, var(--turquoise-ink) 150%); border-color: var(--navy-900); }
        .mv-ic { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 16px; margin-bottom: 22px; }
        .mv-turq .mv-ic { background: rgba(117,227,228,0.25); color: var(--turquoise-ink); }
        .mv-navy .mv-ic { background: rgba(117,227,228,0.16); color: var(--turquoise); }
        .mv-k { font-family: var(--ff-display); font-weight: 700; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; }
        .mv-turq .mv-k { color: var(--turquoise-ink); }
        .mv-navy .mv-k { color: var(--turquoise); }
        .mv-d { font-family: var(--ff-display); font-weight: 600; font-size: clamp(19px, 2vw, 23px); line-height: 1.45; margin-top: 12px; }
        .mv-turq .mv-d { color: var(--navy-900); }
        .mv-navy .mv-d { color: #fff; }
        @media(max-width:860px){ .mv-grid{grid-template-columns:1fr !important;} }
      `}</style>
    </>
  );
}

// ── FAQ (reuses FAQSection from rest.jsx) ──
function FaqPage() {
  useLocale();   // re-renderiza quando o idioma muda
  return (
    <>
      <SiteHeader translated/>
      <PageHero eyebrow={tx('Perguntas frequentes')} title={tx('O que diretores perguntam antes de assinar.')}
        lead={tx('Tudo sobre go-live, ERP, Sewe Sales, LGPD e investimento, direto ao ponto.')}/>
      {typeof FAQSection !== 'undefined' ? <FAQSection/> : null}
      <SiteFooter/>
    </>
  );
}

/* ── Política de Privacidade ── */
function PrivacidadePage() {
  useLocale();   // re-renderiza quando o idioma muda
  const h = { fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 22, color: 'var(--navy-900)', margin: '36px 0 12px' };
  const p = { fontSize: 15.5, color: 'var(--text-2)', lineHeight: 1.7, margin: '0 0 14px' };
  const li = { fontSize: 15.5, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 8 };
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow="Transparência" title="Política de Privacidade."
        lead="Como a SEWE Group coleta, usa e protege os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018)."/>
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <p style={p}><b>Última atualização:</b> agosto de 2026.</p>
          <p style={p}>Esta política se aplica ao site da SEWE Group (sewegroup.com.br) e aos canais de contato vinculados a ele. Controladora dos dados: SEWE Group, Florianópolis · SC · Brasil. Contato: contato@sewegroup.com.br.</p>

          <h2 style={h}>1. Quais dados coletamos</h2>
          <ul style={{ paddingLeft: 22, margin: '0 0 14px' }}>
            <li style={li}><b>Dados de contato enviados por você</b> nos formulários do site: nome, e-mail, empresa e telefone/WhatsApp.</li>
            <li style={li}><b>Dados de agendamento</b>, quando você reserva uma reunião pela nossa agenda: nome, e-mail, telefone e empresa informados no Google Agenda.</li>
            <li style={li}><b>Dados de conversa</b>, quando você opta por falar conosco pelo WhatsApp.</li>
            <li style={li}><b>Dados de comentário no blog</b>, quando você comenta um artigo: nome, sobrenome, e-mail, o texto do comentário, a data do envio, o seu endereço IP (guardado apenas como código embaralhado, sem possibilidade de leitura) e o navegador utilizado.</li>
            <li style={li}><b>Curtidas em artigos</b>, registradas com um identificador aleatório gerado no seu navegador. Esse identificador não é ligado ao seu nome nem ao seu e-mail, e serve só para não contar a mesma curtida duas vezes.</li>
          </ul>
          <p style={p}>Não coletamos dados sensíveis pelo site e não utilizamos os seus dados para decisões automatizadas.</p>

          <h2 style={h}>2. Para que usamos</h2>
          <ul style={{ paddingLeft: 22, margin: '0 0 14px' }}>
            <li style={li}>Responder ao seu contato e realizar o diagnóstico ou a demonstração solicitados.</li>
            <li style={li}>Registrar o seu interesse em nosso sistema de relacionamento (CRM) para dar sequência ao atendimento comercial.</li>
            <li style={li}>Publicar o seu comentário no blog e manter essa área livre de spam e de conteúdo abusivo.</li>
            <li style={li}>Cumprir obrigações legais e regulatórias, quando aplicável.</li>
          </ul>
          <p style={p}>Base legal: execução de procedimentos preliminares a contrato, a seu pedido (art. 7º, V, da LGPD) e legítimo interesse no atendimento comercial (art. 7º, IX), sempre com o mínimo de dados necessário.</p>

          <h2 style={h}>3. Com quem compartilhamos</h2>
          <p style={p}>Seus dados não são vendidos. Eles são processados por fornecedores que sustentam a nossa operação, contratados sob obrigações de confidencialidade e segurança: infraestrutura de banco de dados (Supabase), agenda e e-mail (Google) e ferramenta de mensagens (WhatsApp/Meta), podendo haver transferência internacional para países com grau de proteção adequado ou mediante salvaguardas contratuais.</p>
          <p style={p}>Algumas páginas exibem <b>conteúdo incorporado de terceiros</b> — a agenda de reuniões do Google e as publicações do nosso perfil do Instagram (Meta), no fim do blog. Esse conteúdo é carregado somente quando você rola até ele e, ao ser carregado, o provedor recebe dados técnicos da sua navegação (como endereço IP e cookies próprios do serviço), conforme a política de privacidade do respectivo provedor. A SEWE Group não recebe nem armazena esses dados.</p>

          <h2 style={h}>4. Por quanto tempo guardamos</h2>
          <p style={p}>Mantemos os dados de contato comercial enquanto durar o relacionamento ou a tratativa, e os eliminamos ou anonimizamos quando deixarem de ser necessários, salvo obrigação legal de retenção.</p>
          <p style={p}>Comentários permanecem publicados enquanto o artigo estiver no ar, ou até que você peça a exclusão.</p>

          <h2 style={h}>5. Como protegemos</h2>
          <p style={p}>Adotamos criptografia em trânsito, controle de acesso por credencial e o princípio do menor privilégio nos sistemas que armazenam dados pessoais.</p>

          <h2 style={h} id="comentarios">6. Comentários e curtidas no blog</h2>
          <p style={p}>Ao enviar um comentário, você autoriza a publicação do <b>seu nome e do texto que escreveu</b> na página do artigo, de forma pública e acessível a qualquer visitante. Base legal: o seu consentimento (art. 7º, I, da LGPD), manifestado na caixa de seleção do formulário.</p>
          <p style={p}>O <b>seu e-mail nunca é publicado</b>. Ele fica registrado apenas no nosso banco de dados, para que possamos identificar o autor e responder, se for o caso. O endereço IP é guardado como código embaralhado (hash), com a única finalidade de conter spam e envios automatizados, com base no nosso legítimo interesse em manter o site seguro (art. 7º, IX).</p>
          <p style={p}>Comentários são publicados imediatamente, sem aprovação prévia. A SEWE Group pode remover, a qualquer momento e sem aviso, comentários com spam, propaganda, conteúdo ofensivo, ilegal ou alheio ao tema do artigo.</p>
          <p style={p}>Para pedir a exclusão de um comentário seu, escreva para <a href="mailto:contato@sewegroup.com.br" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>contato@sewegroup.com.br</a> informando o artigo e o nome utilizado. Curtidas podem ser desfeitas por você mesmo, clicando novamente no botão.</p>

          <h2 style={h} id="lgpd">7. Seus direitos (LGPD)</h2>
          <p style={p}>Nos termos dos arts. 17 a 22 da LGPD, você pode solicitar a qualquer momento: confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados, informação sobre compartilhamentos e revogação de consentimento.</p>
          <p style={p}>Para exercer qualquer direito, escreva para <a href="mailto:contato@sewegroup.com.br" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>contato@sewegroup.com.br</a>. Respondemos no prazo legal.</p>

          <h2 style={h}>8. Alterações desta política</h2>
          <p style={p}>Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A versão vigente estará sempre nesta página, com a data de atualização no topo.</p>
        </div>
      </section>
      <SiteFooter/>
    </>
  );
}

// ── Mount the right page based on which root exists ──
SEWE_I18N_READY.then(function mountPages() {
  const single = { 'quemsomos-root': QuemSomosPage, 'premio-root': PremioPage, 'blog-root': BlogIndexPage, 'faq-root': FaqPage, 'privacidade-root': PrivacidadePage };
  Object.keys(single).forEach(id => {
    const el = document.getElementById(id);
    if (el) ReactDOM.createRoot(el).render(React.createElement(single[id]));
  });
  const postEl = document.getElementById('post-root');
  if (postEl) ReactDOM.createRoot(postEl).render(React.createElement(BlogPostPage, { slug: postEl.getAttribute('data-slug') }));
});

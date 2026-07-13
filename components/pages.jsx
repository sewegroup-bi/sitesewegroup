// Content pages: Quem Somos, Prêmio, Blog index, Blog post, FAQ.
// Depends on: brand.jsx (Icon), layout.jsx (SiteHeader/SiteFooter/PageHero), blogdata.jsx (SEWE_POSTS).
// faq.html additionally loads rest.jsx for FAQSection.

const MONTHS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
function fmtDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return `${d.getDate()} de ${MONTHS[d.getMonth()]}. de ${d.getFullYear()}`;
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
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{fmtDate(post.date)} · {post.readTime}</div>
        <h3 style={{ fontSize: 20, lineHeight: 1.25 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>{post.excerpt}</p>
        <span style={{ marginTop: 'auto', fontSize: 13, color: 'var(--turquoise-ink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          Ler artigo <Icon name="arrow" size={13}/>
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
  const posts = window.SEWE_POSTS || [];
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow="Blog SEWE" title="Inteligência de dados, na prática."
        lead="Artigos sobre gestão de distribuição, capital de giro, ruptura, mix e os bastidores do Prêmio SEWE."/>
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="post-grid">
            {posts.map(p => <PostCard key={p.slug} post={p}/>)}
          </div>
        </div>
      </section>
      <SiteFooter/>
      <style>{`@media(max-width:960px){.post-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:640px){.post-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}

// ── Single blog post ──
function BlogPostPage({ slug }) {
  const post = (window.SEWE_POSTS || []).find(p => p.slug === slug);
  if (!post) return (<><SiteHeader/><div className="container" style={{ padding: '120px 0', textAlign: 'center' }}><h1>Post não encontrado</h1><p style={{ marginTop: 12 }}><a href="/blog" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>Voltar para o blog</a></p></div><SiteFooter/></>);
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
          <div style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{post.author} · {fmtDate(post.date)} · {post.readTime}</div>
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
          <div style={{ marginTop: 24, padding: 24, borderRadius: 16, background: 'var(--bg-soft)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 18, color: 'var(--navy-900)' }}>Quer esse nível de gestão na sua distribuição?</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>Agende um diagnóstico gratuito de 30 minutos.</div>
            </div>
            <a href="/#agendar" className="btn btn-primary">Agendar Diagnóstico <Icon name="arrow" size={16} className="chev"/></a>
          </div>
        </div>
      </article>
      <SiteFooter/>
    </>
  );
}

// ── Prêmio ──
function PremioPage() {
  const winners = (window.SEWE_POSTS || []).filter(p => p.category === 'premio');
  const pillars = [
    { icon: 'boxes',  t: 'Organização',   d: 'Dados unificados e processos claros, a casa em ordem antes de crescer.' },
    { icon: 'dollar', t: 'Lucratividade', d: 'Crescer com margem saudável, controle de ruptura e mix inteligente.' },
    { icon: 'trending', t: 'Prosperidade', d: 'Resultado que se distribui: para a operação, o time e os clientes.' },
    { icon: 'target', t: 'Bons Processos', d: 'Decisão diária guiada por dado, não por achismo nem por planilha.' },
  ];
  const steps = [
    { n: '01', t: 'Acompanhamento', d: 'Ao longo do ano, os indicadores de cada distribuidor são monitorados na plataforma SEWE.' },
    { n: '02', t: 'Análise dos pilares', d: 'Avaliamos organização, lucratividade, prosperidade e bons processos com base em dados reais.' },
    { n: '03', t: 'Reconhecimento', d: 'O distribuidor que mais evoluiu é reconhecido como vencedor do ciclo.' },
  ];
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow="Prêmio SEWE" title="Prêmio SEWE de Gestão Inteligente e Prosperidade."
        lead="Um reconhecimento aos distribuidores que transformam dados em decisões, e decisões em prosperidade.">
        <div style={{ marginTop: 24 }}>
          <a href="#vencedores" className="btn btn-primary">Ver vencedores <Icon name="arrow" size={16} className="chev"/></a>
        </div>
      </PageHero>

      {/* Pillars */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
            <div className="eyebrow">O que avaliamos</div>
            <h2 style={{ marginTop: 14 }}>Quatro pilares de uma gestão que prospera.</h2>
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
            <div className="eyebrow">Como funciona</div>
            <h2 style={{ marginTop: 14 }}>Do dado ao reconhecimento.</h2>
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
            <h2 style={{ marginTop: 14 }}>Quem já levou o Prêmio SEWE.</h2>
          </div>
          {winners.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="post-grid">
              {winners.map(p => <PostCard key={p.slug} post={p}/>)}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-2)' }}>Os vencedores serão anunciados em breve.</p>
          )}
        </div>
      </section>
      <SiteFooter/>
      <style>{`@media(max-width:960px){.pillar-grid{grid-template-columns:1fr 1fr !important;}.post-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:600px){.pillar-grid{grid-template-columns:1fr !important;}.post-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}

// ── Quem Somos (história) ──
function QuemSomosPage() {
  const timeline = [
    { y: '2018–2020', t: 'Nasce da operação, não do laboratório', d: 'A SEWE surge de dentro do setor de distribuição, gente que viveu o problema de afogar em dados e passar fome de decisão. O foco desde o início: traduzir dados em ação.' },
    { y: '2021–2022', t: 'Parceria oficial Qlik + foco no Pet/Vet', d: 'A escolha pela plataforma Qlik consolida a base tecnológica. Os primeiros distribuidores do setor Pet e Veterinário provam o modelo: BI vertical, pronto, com DNA de distribuição.' },
    { y: '2023–2025', t: 'Expansão de setores e da IA aplicada', d: 'A SEWE chega a indústrias, agro e distribuidores de tecnologia. A inteligência artificial passa a rodar nos bastidores, entregando decisões prontas em vez de mais gráficos.' },
    { y: 'Hoje', t: 'Referência nacional em dados para distribuição', d: 'São mais de 500 distribuidores e R$ 5 bilhões em faturamento monitorado, com cobertura nacional e um ecossistema completo: BI, Integration e Sales.' },
  ];
  const vmv = [
    { k: 'Missão', d: 'Transformar dados em decisões que geram prosperidade para distribuidores e seus clientes.' },
    { k: 'Visão', d: 'Ser a inteligência de dados padrão do setor de distribuição no Brasil.' },
    { k: 'Valores', d: 'Parceria de verdade, DNA de distribuição e resultado acima de relatório. Dado vira ação, todo dia.' },
  ];
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow="Quem Somos" title="A inteligência de dados que nasceu dentro da distribuição."
        lead="A SEWE não veio de um laboratório de software. Veio do chão do setor, e por isso fala a língua de quem vive ruptura, curva ABC, positivação e capital de giro."/>

      {/* Story / timeline */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="eyebrow">Nossa história</div>
          <h2 style={{ marginTop: 14, marginBottom: 40 }}>Uma trajetória guiada por dado.</h2>
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
              <div className="eyebrow">Onde atuamos</div>
              <h2 style={{ marginTop: 14 }}>Do Brasil para as Américas.</h2>
              <p style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 16, lineHeight: 1.65, maxWidth: 460 }}>
                Atendemos distribuidores e indústrias em todos os estados do Brasil,
                com operações internacionais em expansão pelo continente.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', display: 'grid', gap: 14 }}>
                {[
                  { pais: 'Brasil', d: 'Presença em todos os estados' },
                  { pais: 'Estados Unidos', d: 'Operação internacional · Sewe Integration' },
                  { pais: 'Chile', d: 'Operação internacional · Sewe Integration' },
                  { pais: 'Colômbia', d: 'Operação internacional · Sewe Integration' },
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
                <span style={{ width: 11, height: 11, borderRadius: 3, background: 'linear-gradient(135deg, #2d436c, #3f7d8c)' }}/>
                Países com operação SEWE
              </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="pillar-grid">
            {vmv.map((v, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--turquoise-ink)' }}>{v.k}</div>
                <p style={{ fontSize: 17, color: 'var(--navy-900)', marginTop: 12, lineHeight: 1.6 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section grain" style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 60%, var(--turquoise-ink) 130%)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ color: '#fff' }}>Vamos transformar sua distribuição?</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 16, fontSize: 18 }}>Um diagnóstico gratuito de 30 minutos, com os seus dados, sem compromisso.</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#agendar" className="btn btn-accent btn-lg">Agendar Diagnóstico <Icon name="arrow" size={16} className="chev"/></a>
            <a href="https://wa.me/5548984704389" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Falar no WhatsApp</a>
          </div>
        </div>
      </section>
      <SiteFooter/>
      <style>{`
        @media(max-width:960px){.pillar-grid{grid-template-columns:1fr !important;}}
        @media(max-width:600px){.tl-row{grid-template-columns:1fr !important;gap:6px !important;}}
      `}</style>
    </>
  );
}

// ── FAQ (reuses FAQSection from rest.jsx) ──
function FaqPage() {
  return (
    <>
      <SiteHeader/>
      <PageHero eyebrow="Perguntas frequentes" title="O que diretores perguntam antes de assinar."
        lead="Tudo sobre go-live, ERP, LGPD, parceria Qlik e investimento, direto ao ponto."/>
      {typeof FAQSection !== 'undefined' ? <FAQSection/> : null}
      <SiteFooter/>
    </>
  );
}

/* ── Política de Privacidade ── */
function PrivacidadePage() {
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
          <p style={p}><b>Última atualização:</b> julho de 2026.</p>
          <p style={p}>Esta política se aplica ao site da SEWE Group (sewegroup.com.br) e aos canais de contato vinculados a ele. Controladora dos dados: SEWE Group, Florianópolis · SC · Brasil. Contato: contato@sewegroup.com.br.</p>

          <h2 style={h}>1. Quais dados coletamos</h2>
          <ul style={{ paddingLeft: 22, margin: '0 0 14px' }}>
            <li style={li}><b>Dados de contato enviados por você</b> nos formulários do site: nome, e-mail, empresa e telefone/WhatsApp.</li>
            <li style={li}><b>Dados de agendamento</b>, quando você reserva uma reunião pela nossa agenda: nome, e-mail, telefone e empresa informados no Google Agenda.</li>
            <li style={li}><b>Dados de conversa</b>, quando você opta por falar conosco pelo WhatsApp.</li>
          </ul>
          <p style={p}>Não coletamos dados sensíveis pelo site e não utilizamos os seus dados para decisões automatizadas.</p>

          <h2 style={h}>2. Para que usamos</h2>
          <ul style={{ paddingLeft: 22, margin: '0 0 14px' }}>
            <li style={li}>Responder ao seu contato e realizar o diagnóstico ou a demonstração solicitados.</li>
            <li style={li}>Registrar o seu interesse em nosso sistema de relacionamento (CRM) para dar sequência ao atendimento comercial.</li>
            <li style={li}>Cumprir obrigações legais e regulatórias, quando aplicável.</li>
          </ul>
          <p style={p}>Base legal: execução de procedimentos preliminares a contrato, a seu pedido (art. 7º, V, da LGPD) e legítimo interesse no atendimento comercial (art. 7º, IX), sempre com o mínimo de dados necessário.</p>

          <h2 style={h}>3. Com quem compartilhamos</h2>
          <p style={p}>Seus dados não são vendidos. Eles são processados por fornecedores que sustentam a nossa operação, contratados sob obrigações de confidencialidade e segurança: infraestrutura de banco de dados (Supabase), agenda e e-mail (Google) e ferramenta de mensagens (WhatsApp/Meta), podendo haver transferência internacional para países com grau de proteção adequado ou mediante salvaguardas contratuais.</p>

          <h2 style={h}>4. Por quanto tempo guardamos</h2>
          <p style={p}>Mantemos os dados de contato comercial enquanto durar o relacionamento ou a tratativa, e os eliminamos ou anonimizamos quando deixarem de ser necessários, salvo obrigação legal de retenção.</p>

          <h2 style={h}>5. Como protegemos</h2>
          <p style={p}>Adotamos criptografia em trânsito, controle de acesso por credencial e o princípio do menor privilégio nos sistemas que armazenam dados pessoais.</p>

          <h2 style={h} id="lgpd">6. Seus direitos (LGPD)</h2>
          <p style={p}>Nos termos dos arts. 17 a 22 da LGPD, você pode solicitar a qualquer momento: confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados, informação sobre compartilhamentos e revogação de consentimento.</p>
          <p style={p}>Para exercer qualquer direito, escreva para <a href="mailto:contato@sewegroup.com.br" style={{ color: 'var(--turquoise-ink)', fontWeight: 600 }}>contato@sewegroup.com.br</a>. Respondemos no prazo legal.</p>

          <h2 style={h}>7. Alterações desta política</h2>
          <p style={p}>Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A versão vigente estará sempre nesta página, com a data de atualização no topo.</p>
        </div>
      </section>
      <SiteFooter/>
    </>
  );
}

// ── Mount the right page based on which root exists ──
(function mountPages() {
  const single = { 'quemsomos-root': QuemSomosPage, 'premio-root': PremioPage, 'blog-root': BlogIndexPage, 'faq-root': FaqPage, 'privacidade-root': PrivacidadePage };
  Object.keys(single).forEach(id => {
    const el = document.getElementById(id);
    if (el) ReactDOM.createRoot(el).render(React.createElement(single[id]));
  });
  const postEl = document.getElementById('post-root');
  if (postEl) ReactDOM.createRoot(postEl).render(React.createElement(BlogPostPage, { slug: postEl.getAttribute('data-slug') }));
})();

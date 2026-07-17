// Sincroniza os posts do blog: gera o JSON-LD (BlogPosting) no <head> e o corpo
// do artigo em HTML estático dentro de #post-root, lendo a fonte da verdade em
// components/blogdata.jsx. Re-executável. Uso: `npm run sync:posts`.
//
// Por que existe: o BLOG-GUIA.md (§2.3) exige que o corpo do artigo também exista
// como HTML estático (para o Google indexar sem executar JS). Este script mantém
// esse HTML e o JSON-LD sempre iguais ao blogdata, sem edição manual.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.sewegroup.com.br';
const PUBLISHER_LOGO = BASE + '/assets/sewe-logo-tagline.png';
const DEFAULT_IMAGE = BASE + '/assets/sewe-logo-tagline.png';

const code = fs.readFileSync(path.join(ROOT, 'components/blogdata.jsx'), 'utf8');
const win = {};
new Function('window', code)(win);
const POSTS = win.SEWE_POSTS;
const AUTHORS = win.SEWE_AUTHORS || {};

const MONTHS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
function fmtDate(iso){ const d=new Date(iso+'T12:00:00'); return `${d.getDate()} de ${MONTHS[d.getMonth()]}. de ${d.getFullYear()}`; }
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const escAttr = s => esc(s).replace(/"/g,'&quot;');

function blocksHtml(blocks){
  return blocks.map(b=>{
    if(b.type==='lead') return `      <p class="post-lead">${esc(b.text)}</p>`;
    if(b.type==='h')    return `      <h2>${esc(b.text)}</h2>`;
    if(b.type==='p')    return `      <p>${esc(b.text)}</p>`;
    if(b.type==='list') return `      <ul>\n${b.items.map(it=>`        <li>${esc(it)}</li>`).join('\n')}\n      </ul>`;
    if(b.type==='metrics') return `      <ul class="post-metrics">\n${b.items.map(m=>`        <li><strong>${esc(m.value)}</strong> ${esc(m.label)}</li>`).join('\n')}\n      </ul>`;
    if(b.type==='callout') return `      <div class="post-callout" style="padding:18px 22px;background:var(--bg-soft);border:1px solid var(--line);border-left:3px solid var(--turquoise);border-radius:14px;margin:4px 0;"><p style="font-size:18.5px;line-height:1.6;color:var(--navy-900);font-weight:500;margin:0;">${esc(b.text)}</p></div>`;
    if(b.type==='stat') return `      <p class="post-stat"><strong>${esc(b.value)}</strong> ${esc(b.label)}</p>`;
    if(b.type==='quote') return `      <blockquote>\n        <p>&ldquo;${esc(b.text)}&rdquo;</p>${b.who?`\n        <footer>${esc(b.who)}</footer>`:''}\n      </blockquote>`;
    return '';
  }).filter(Boolean).join('\n');
}

function staticBody(post){
  const a = AUTHORS[post.author];
  const p = [];
  p.push(`  <article class="container" style="max-width:720px;margin:0 auto;padding:48px 24px;">`);
  p.push(`    <p style="font-family:var(--ff-mono);font-size:12px;letter-spacing:0.12em;color:var(--turquoise-ink);font-weight:600;">${esc(post.cover.tag)}</p>`);
  p.push(`    <h1>${esc(post.title)}</h1>`);
  p.push(`    <p style="color:var(--text-3);font-size:14px;">Por ${esc(post.author)} · Publicado em ${esc(fmtDate(post.date))} · ${esc(post.readTime)}</p>`);
  p.push(blocksHtml(post.blocks));
  if(post.references && post.references.length){
    p.push(`    <h2>Referências</h2>`);
    p.push(`    <ul>`);
    post.references.forEach(r=>{
      const src = r.source ? `<strong>${esc(r.source)}:</strong> ` : '';
      const note = r.note ? ` &mdash; ${esc(r.note)}` : '';
      p.push(`      <li>${src}<a href="${escAttr(r.url)}" target="_blank" rel="noopener noreferrer nofollow">${esc(r.label)}</a>${note}</li>`);
    });
    p.push(`    </ul>`);
  }
  if(a){
    p.push(`    <section aria-label="Sobre o autor" style="margin-top:24px;padding-top:20px;border-top:1px solid var(--line);">`);
    p.push(`      <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-3);font-weight:600;">Sobre o autor</p>`);
    p.push(`      <p><strong>${esc(post.author)}</strong> — ${esc(a.role)}</p>`);
    p.push(`      <p>${esc(a.bio)}</p>`);
    if(a.linkedin) p.push(`      <p><a href="${escAttr(a.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn de ${esc(post.author)}</a></p>`);
    p.push(`    </section>`);
  }
  const ctaP = (post.cta && post.cta.primary) || 'Agendar Diagnóstico';
  const ctaS = (post.cta && post.cta.secondary) || 'Falar com um especialista';
  p.push(`    <p style="margin-top:24px;"><a class="btn btn-primary" href="/#agendar">${esc(ctaP)}</a> · <a href="https://wa.me/5548984704389" target="_blank" rel="noopener noreferrer">${esc(ctaS)}</a></p>`);
  const back = post.category==='premio' ? '/premio' : '/blog';
  p.push(`    <p><a href="${back}">Voltar para o ${post.category==='premio'?'Prêmio SEWE':'Blog'}</a></p>`);
  p.push(`  </article>`);
  return p.join('\n');
}

function jsonLd(post){
  const url = `${BASE}/${post.slug}`;
  const a = AUTHORS[post.author];
  const author = a ? {'@type':'Person',name:post.author,url:a.linkedin,sameAs:[a.linkedin]} : {'@type':'Organization',name:post.author};
  const data = {
    '@context':'https://schema.org','@type':'BlogPosting',
    mainEntityOfPage:{'@type':'WebPage','@id':url},
    headline:post.title, description:post.excerpt, image:DEFAULT_IMAGE,
    author,
    publisher:{'@type':'Organization',name:'SEWE Group',logo:{'@type':'ImageObject',url:PUBLISHER_LOGO}},
    datePublished:post.date, dateModified:post.date, inLanguage:'pt-BR',
  };
  return `  <script type="application/ld+json">\n${JSON.stringify(data,null,2).split('\n').map(l=>'  '+l).join('\n')}\n  </script>`;
}

let done=[];
for(const post of POSTS){
  const file = path.join(ROOT, `${post.slug}.html`);
  if(!fs.existsSync(file)){ console.log('SKIP (sem arquivo):', post.slug); continue; }
  let html = fs.readFileSync(file,'utf8');
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
  html = html.replace(/(\n?)([ \t]*)<\/head>/, `\n${jsonLd(post)}\n</head>`);
  const newRoot = `<div id="post-root" data-slug="${post.slug}">\n${staticBody(post)}\n  </div>`;
  html = html.replace(/<div id="post-root"[\s\S]*?(<script type="module" src="\/src\/entries\/post\.js"><\/script>)/, `${newRoot}\n\n  $1`);
  fs.writeFileSync(file, html);
  done.push(post.slug);
}
console.log('Posts sincronizados:', done.join(', '));

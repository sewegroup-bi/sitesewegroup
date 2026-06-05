/* ══════════════════════════════════════════════════════════
   SEWE GROUP — script.js  v3.0
   Navbar | Network Canvas | Soluções Tabs | Prédio |
   Carrosséis (Why + Depoimentos) | FAQ | Contadores | Mobile
══════════════════════════════════════════════════════════ */

/* ── 1. Navbar: scrolled + active link ── */
(function () {
  const navbar  = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Highlight ativo baseado na seção visível
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === '#' + e.target.id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => obs.observe(s));
})();


/* ── 2. Canvas: malha de dados (Network) ── */
(function () {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], frame;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    const count = Math.floor((W * H) / 18000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  1.5 + Math.random() * 1.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    const MAX_DIST = 140;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          ctx.strokeStyle = `rgba(45,67,108,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(117,227,228,0.55)';
      ctx.fill();
    });
    frame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { cancelAnimationFrame(frame); resize(); draw(); });
  resize(); draw();
})();


/* ── 3. Soluções: troca de abas + destaque do prédio ── */
(function () {
  const tabs    = document.querySelectorAll('.sol-tab');
  const panels  = document.querySelectorAll('.sol-panel');
  const bldBtns = document.querySelectorAll('.bld-btn');

  // Mapeamento tab → área do prédio que deve ser destacada
  const tabToFloor = {
    '360':         null,           // visão geral, sem destaque específico
    'suprimentos': 'suprimentos',
    'comercial':   'comercial',
    'financeiro':  'financeiro',
    'gestao':      'gestao',
  };

  function activateTab(tabId) {
    // Painéis (usam data-panel no HTML)
    tabs.forEach(t   => t.classList.toggle('active', t.dataset.tab === tabId));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === tabId));

    // Botões do prédio
    bldBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));

    // Highlight do andar
    const floorKey = tabToFloor[tabId];
    highlightFloor(floorKey);
  }

  function highlightFloor(key) {
    // Remove todos os destaques
    document.querySelectorAll('.bld-floor, .bld-mid-left, .bld-mid-center, .bld-mid-right, .bld-floor--ground')
      .forEach(el => el.classList.remove('highlighted'));

    if (!key) return;

    const targets = document.querySelectorAll(`[data-area="${key}"]`);
    targets.forEach(el => el.classList.add('highlighted'));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  bldBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // Ativa a primeira aba por padrão
  if (tabs.length) activateTab(tabs[0].dataset.tab);
})();


/* ── 4. Carousel genérico ── */
function makeCarousel({ trackSelector, prevSelector, nextSelector, dotsSelector, cardSelector, visibleCount }) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  const cards     = track.querySelectorAll(cardSelector);
  const btnPrev   = document.querySelector(prevSelector);
  const btnNext   = document.querySelector(nextSelector);
  const dotsWrap  = dotsSelector ? document.querySelector(dotsSelector) : null;

  let current = 0;
  const total  = Math.max(0, cards.length - (visibleCount || 1));

  // Dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getCardWidth() {
    if (!cards.length) return 0;
    const style = getComputedStyle(cards[0]);
    return cards[0].offsetWidth + parseInt(style.marginRight || 0) + 20; // 20 = gap
  }

  function go(index) {
    current = Math.max(0, Math.min(index, total));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current));
    }
  }

  btnPrev && btnPrev.addEventListener('click', () => go(current - 1));
  btnNext && btnNext.addEventListener('click', () => go(current + 1));

  // Swipe touch
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener('resize', () => go(current));
}

/* ── 5. Inicializa carrosséis ── */
makeCarousel({
  trackSelector:   '.why-carousel',
  prevSelector:    '#whyPrev',
  nextSelector:    '#whyNext',
  dotsSelector:    '#whyDots',
  cardSelector:    '.why-card',
  visibleCount:    3,
});

makeCarousel({
  trackSelector:   '.test-carousel',
  prevSelector:    '#testPrev',
  nextSelector:    '#testNext',
  dotsSelector:    '#testDots',
  cardSelector:    '.test-card',
  visibleCount:    2,
});


/* ── 6. FAQ accordion ── */
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Fecha todos
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a')?.classList.remove('open');
      });
      // Abre o clicado se estava fechado
      if (!isOpen) {
        item.classList.add('open');
        ans.classList.add('open');
      }
    });
  });
})();


/* ── 7. Scroll: animação de entrada ── */
(function () {
  const targets = document.querySelectorAll(
    '.ia-card, .plan-card, .macro-stat, .why-card, .test-card, .client-logo, .faq-item'
  );
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.style.opacity = '1');
    return;
  }
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = (el.style.transform || '') + ' translateY(24px)';
    el.style.transition =
      `opacity .5s ease ${i * 0.055}s, transform .5s ease ${i * 0.055}s, box-shadow .25s, border-color .25s`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
})();


/* ── 8. Contadores animados ── */
(function () {
  const counters = document.querySelectorAll('.macro-value[data-target]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseFloat(el.dataset.target);
      const prefix  = el.dataset.prefix || '';
      const suffix  = el.dataset.suffix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      obs.unobserve(el);

      const start = performance.now();
      const dur   = 1600;

      (function step(now) {
        const t    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + (target * ease).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();


/* ── 9. Navbar mobile: toggle ── */
(function () {
  const toggle  = document.querySelector('.nav-toggle');
  const links   = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(26,34,54,.5);z-index:998;
    display:none;backdrop-filter:blur(2px);
  `;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .nav-links.open {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 68px; right: 0;
        width: 260px; height: calc(100vh - 68px);
        background: var(--surface);
        padding: 32px 24px;
        gap: 24px;
        z-index: 999;
        box-shadow: var(--shadow-lg);
        animation: slideIn .25s ease;
        overflow-y: auto;
      }
      @keyframes slideIn { from{transform:translateX(100%);} to{transform:none;} }
    }
  `;
  document.head.appendChild(style);

  function closeMenu() {
    links.classList.remove('open');
    overlay.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    overlay.style.display = open ? 'block' : 'none';
    toggle.setAttribute('aria-expanded', String(open));
  });
  overlay.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();


/* ── 10. Smooth scroll para links âncora ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
})();

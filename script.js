/* ══════════════════════════════════════════════════════════
   SEWE GROUP — script.js
   Versão: 1.0
══════════════════════════════════════════════════════════ */

/* ── 1. Navbar: classe scrolled ── */
(function () {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
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

    // Atualiza posições
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Linhas entre nós próximos
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

    // Pontos
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(117,227,228,0.55)';
      ctx.fill();
    });

    frame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    resize();
    draw();
  });

  resize();
  draw();
})();


/* ── 3. Partículas flutuantes ── */
(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size   = 2 + Math.random() * 4;
    const left   = Math.random() * 100;
    const delay  = Math.random() * 12;
    const dur    = 10 + Math.random() * 14;
    const isTeal = Math.random() > 0.5;

    p.style.cssText = `
      left: ${left}%;
      bottom: -10px;
      width:  ${size}px;
      height: ${size}px;
      background: ${isTeal ? '#75e3e4' : '#2d436c'};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      border-radius: 50%;
    `;
    container.appendChild(p);
  }
})();


/* ── 4. Andares: interatividade mobile (toque) ── */
(function () {
  const floors = document.querySelectorAll('.floor');

  // Em mobile, toque abre/fecha o pop-up
  floors.forEach(floor => {
    floor.addEventListener('click', function (e) {
      // Só em telas pequenas
      if (window.innerWidth > 900) return;

      const wasActive = this.classList.contains('active');
      floors.forEach(f => f.classList.remove('active'));
      if (!wasActive) this.classList.add('active');
    });
  });

  // CSS extra para .active no mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .floor.active .floor-popup  { opacity: 1 !important; max-height: 220px !important; }
      .floor.active .floor-overlay { opacity: 1 !important; }
    }
  `;
  document.head.appendChild(style);
})();


/* ── 5. Scroll: animação de entrada nas seções ── */
(function () {
  const targets = document.querySelectorAll(
    '.ia-card, .result-card, .plan-card, .floor, .hero-stats .stat'
  );

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.style.opacity = '1');
    return;
  }

  // Aplica estado inicial
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = (el.style.transform || '') + ' translateY(20px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s, box-shadow .25s, border-color .25s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.style.transform
          .replace('translateY(20px)', 'translateY(0)');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


/* ── 6. Contadores animados (resultados) ── */
(function () {
  const counters = document.querySelectorAll('.result-number');

  if (!counters.length) return;

  const formats = {
    '+37%': { prefix: '+', suffix: '%', target: 37,  decimals: 0 },
    '-28%': { prefix: '-', suffix: '%', target: 28,  decimals: 0 },
    '4.2x': { prefix: '',  suffix: 'x', target: 4.2, decimals: 1 },
    '72h':  { prefix: '',  suffix: 'h', target: 72,  decimals: 0 },
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const key = el.textContent.trim();
      const cfg = formats[key];
      if (!cfg) return;

      observer.unobserve(el);
      const start = performance.now();
      const dur   = 1600;

      function step(now) {
        const t    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const val  = (cfg.target * ease).toFixed(cfg.decimals);
        el.textContent = cfg.prefix + val + cfg.suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ── 7. Navbar mobile: toggle ── */
(function () {
  const toggle  = document.querySelector('.nav-toggle');
  const links   = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  // Cria overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(26,34,54,.5);z-index:998;
    display:none;backdrop-filter:blur(2px);
  `;
  document.body.appendChild(overlay);

  // Injeta estilos do menu mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 600px) {
      .nav-links.open {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 64px; right: 0;
        width: 260px; height: calc(100vh - 64px);
        background: var(--surface);
        padding: 32px 24px;
        gap: 24px;
        z-index: 999;
        box-shadow: var(--shadow-lg);
        animation: slideIn .25s ease;
      }
      @keyframes slideIn { from{transform:translateX(100%);} to{transform:none;} }
    }
  `;
  document.head.appendChild(style);

  function close() {
    links.classList.remove('open');
    overlay.style.display = 'none';
  }

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    overlay.style.display = open ? 'block' : 'none';
  });
  overlay.addEventListener('click', close);
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

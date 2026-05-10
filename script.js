const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover)').matches;
const isMobile = window.matchMedia('(max-width: 760px)').matches;

document.body.classList.add('animations-ready');

const nav = document.querySelector('#topNav');
window.addEventListener(
  'scroll',
  () => {
    nav?.classList.toggle('scrolled', window.scrollY > 24);
  },
  { passive: true }
);

document.querySelector('.menu-toggle')?.addEventListener('click', (event) => {
  const btn = event.currentTarget;
  const next = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(next));
  nav?.classList.toggle('menu-open', next);
});

function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-scale');
  if (reduceMotion) {
    items.forEach((item) => item.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

function initSpotlight() {
  if (!canHover) return;
  document.querySelectorAll('.spotlight, .card').forEach((card) => {
    let raf = 0;
    card.addEventListener('pointermove', (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
        raf = 0;
      });
    });
  });
}

function initMagnet() {
  if (!canHover || reduceMotion) return;
  document.querySelectorAll('.magnet').forEach((el) => {
    let raf = 0;
    el.addEventListener('pointermove', (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
        el.style.transform = `translate(${x}px, ${y}px)`;
        raf = 0;
      });
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

function initScrollStory() {
  if (reduceMotion || isMobile || typeof window.gsap === 'undefined') return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    })
    .to(
      '.memory-card',
      {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 0.82,
        opacity: 0.22,
        stagger: { amount: 0.4, from: 'random' },
        ease: 'power2.out'
      },
      0
    )
    .to('.hero-inner', { y: -40, scale: 0.96, opacity: 0.88, ease: 'power2.out' }, 0);

  const scenes = document.querySelectorAll('.journey-scene');
  ScrollTrigger.create({
    trigger: '.journey-pin',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      const idx = Math.min(Math.floor(self.progress * scenes.length), scenes.length - 1);
      scenes.forEach((scene, i) => scene.classList.toggle('active', i === idx));
      document.documentElement.style.setProperty('--journey-progress', self.progress.toFixed(3));
    }
  });
}

function initMemoryHalo() {
  const canvas = document.querySelector('#memoryHalo');
  if (!canvas || reduceMotion || isMobile) return;

  const ctx = canvas.getContext('2d');
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue('--accent-luminous-rgb').trim();
  const bg = styles.getPropertyValue('--bg-rgb').trim();
  const particles = Array.from({ length: 180 }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 0.18 + Math.random() * 0.42,
    speed: 0.00008 + Math.random() * 0.00016,
    size: 1 + Math.random() * 2.4,
    y: Math.random()
  }));

  let active = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      active = entry.isIntersecting;
    },
    { threshold: 0.12 }
  );
  observer.observe(canvas);

  let width = 1;
  let height = 1;
  let dpr = 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  function tick() {
    requestAnimationFrame(tick);
    if (!active) return;
    const now = performance.now();
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width * 0.54, height * 0.52);
    ctx.rotate(Math.sin(now * 0.00018) * 0.18);

    for (let i = 0; i < 3; i += 1) {
      ctx.save();
      ctx.rotate(now * (0.00011 + i * 0.00004) + i * 1.9);
      ctx.beginPath();
      ctx.ellipse(0, 0, width * (0.16 + i * 0.05), height * 0.23, i * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${accent}, ${0.32 - i * 0.05})`;
      ctx.lineWidth = 32 - i * 6;
      ctx.lineCap = 'round';
      ctx.shadowColor = `rgba(${accent}, 0.22)`;
      ctx.shadowBlur = 24;
      ctx.stroke();
      ctx.restore();
    }

    particles.forEach((dot) => {
      const angle = dot.angle + now * dot.speed;
      const x = Math.cos(angle) * width * dot.radius;
      const y = (dot.y - 0.5) * height * 0.72 + Math.sin(angle * 1.7) * 18;
      ctx.fillStyle = `rgba(${bg}, 0.52)`;
      ctx.fillRect(x, y, dot.size, dot.size);
    });
    ctx.restore();
  }
  tick();
}

function initForm() {
  document.querySelector('.waitlist')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button');
    if (!button) return;
    button.textContent = '已为你留出位置';
    button.setAttribute('aria-disabled', 'true');
  });
}

initReveal();
initSpotlight();
initMagnet();
initScrollStory();
initMemoryHalo();
initForm();

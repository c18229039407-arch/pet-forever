# DESIGN.md

> 让爱不因离别中断：以纪念馆般的庄重、产品级的清晰和电影式滚动，呈现一个温柔但不脆弱的宠物数字永生平台。

## 1. Visual Theme & Atmosphere

**Style**: Warm Memorial Editorial with Cinematic Product Story
**Keywords**: 温柔、庄重、永恒、记忆档案、数字生命、留白、高级、克制动效
**Tone**: 安静、有分寸、可信赖、被认真对待 — NOT 廉价治愈、卡通宠物、强科技蓝、过度煽情
**Feel**: 像在清晨的纪念馆里翻开一本有光的生命册，技术在幕后，爱在前景。

**Reference Audit**: `https://www.shopify.com/editions/winter2026`
- 参考站主色提取：`#F7F7EE` 米白背景、`#292919` 深橄榄黑文字、`#DCDCD0` 低对比边界、`#909083` 次级文字。
- 字体气质：大字号紧凑编辑感标题 + 中性无衬线正文；原站使用 Neue Montreal / HWCigars 一类定制字体，本站改为中文可用的 Noto Serif SC + Noto Sans SC。
- 结构节奏：长页面、多 section、每个 section 像一个完整产品能力场景；模块数量多但视觉统一。
- 动效线索：媒体入场、滑动触发的状态变化、弹性 scale、连续 section 叙事、轻微 pop-in，不采用强烈科技粒子。

**Interaction Tier**: L3 沉浸体验
**Dependencies**: CSS + GSAP + ScrollTrigger + Three.js; 不启用 Lenis，保留原生滚动以保证顺滑。

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #f7f4ea;
  --surface: #fffdf6;
  --surface-alt: #ebe5d8;
  --surface-muted: #ddd5c6;
  --surface-deep: #292919;
  --surface-hover: #f1eadf;

  /* Borders */
  --border: #d8d0c2;
  --border-hover: #b9ad99;
  --border-dark: #4c4a39;

  /* Text */
  --text: #292919;
  --text-secondary: #5c5c4e;
  --text-tertiary: #8a8778;
  --text-inverse: #f7f4ea;

  /* Accent */
  --accent: #9a6f47;
  --accent-hover: #7f5937;
  --accent-soft: #ead9c2;
  --accent-luminous: #d7a96b;
  --memorial-blue: #5f7f91;
  --petal: #c9877f;

  /* RGB variants for rgba() */
  --bg-rgb: 247, 244, 234;
  --surface-rgb: 255, 253, 246;
  --surface-deep-rgb: 41, 41, 25;
  --text-rgb: 41, 41, 25;
  --accent-rgb: 154, 111, 71;
  --accent-luminous-rgb: 215, 169, 107;
  --petal-rgb: 201, 135, 127;

  /* Semantic */
  --success: #577864;
  --error: #9b4f48;
  --warning: #b1843f;
  --focus: #5f7f91;
}
```

**Color Rules:**
- 所有页面实现必须通过 CSS 变量引用颜色；组件 CSS 禁止出现新的硬编码 hex。
- 主背景保持暖米白，深色 section 只用于关键叙事段落和结尾 CTA，避免整页压抑。
- 强调色以旧铜金和柔玫瑰为主，表达记忆与温度；蓝色只用于安全、专业资源和可信赖提示。
- 同一屏内最多一个高饱和强调色，且面积小于 12%。
- 错误与安全提示必须温和，不使用刺眼红色大面积警示。

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;600;700;900&family=Noto+Sans+SC:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --font-serif: 'Noto Serif SC', 'Songti SC', 'STSong', Georgia, serif;
  --font-sans: 'Noto Sans SC', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SFMono-Regular', 'Roboto Mono', Consolas, monospace;
}
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | var(--font-serif) | clamp(4.2rem, 10vw, 10rem) | 900 | 0.96 | 0 |
| Section H2 | var(--font-serif) | clamp(2.5rem, 6vw, 6.8rem) | 700 | 1.02 | 0 |
| H3 | var(--font-sans) | clamp(1.25rem, 2vw, 2rem) | 700 | 1.35 | 0.01em |
| Body | var(--font-sans) | clamp(1rem, 1.2vw, 1.125rem) | 400 | 1.8 | 0.02em |
| Label | var(--font-sans) | 0.78rem | 700 | 1.2 | 0.12em |
| Mono/Code | var(--font-mono) | 0.875rem | 500 | 1.6 | 0 |

**Typography Rules:**
- 中文页面正文行高不低于 1.7，长段落优先使用 16px 以上字号。
- Hero 标题可极大，但必须保持“庄重的留白”，不得挤压副标题和 CTA。
- Section H2 使用衬线字体表达纪念感；功能卡、导航、按钮使用无衬线保证清晰。
- 数字指标使用无衬线粗体，不使用科技感等宽数字作为主视觉。
- **NEVER use**: Comic Sans, Impact, Papyrus, system-only Chinese fallback without Noto Sans SC, overly condensed display fonts.

**Text Decoration:**
- Hero H1: 只允许在“永在”或“PetForever”局部使用暖铜渐变文字，不加投影。
- Section H2: 默认纯色；滚动入场可用 mask reveal，不使用持续闪烁。
- Body: 不使用渐变和阴影，保证阅读舒适。

## 4. Component Stylings

### Buttons
```css
.btn {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.875rem 1.25rem;
  border: 1px solid var(--border-dark);
  border-radius: 999px;
  background: var(--surface-deep);
  color: var(--text-inverse);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), background 220ms ease, color 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.btn:hover {
  transform: translateY(-2px);
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  box-shadow: 0 18px 42px rgba(var(--accent-rgb), 0.24);
}
.btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 8px 20px rgba(var(--accent-rgb), 0.18);
}
.btn:focus-visible {
  outline: 3px solid rgba(var(--surface-deep-rgb), 0.18);
  outline-offset: 3px;
}
.btn:disabled,
.btn[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.46;
  transform: none;
  box-shadow: none;
}
.btn.secondary {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}
.btn.secondary:hover {
  background: var(--surface-hover);
  color: var(--text);
  border-color: var(--border-hover);
  box-shadow: none;
}
```

### Cards
```css
.card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 0 rgba(var(--text-rgb), 0.04);
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease, background 220ms ease, box-shadow 320ms ease;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-luminous-rgb), 0.26), transparent 36%);
  transition: opacity 220ms ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  background: var(--surface-hover);
  box-shadow: 0 24px 70px rgba(var(--text-rgb), 0.1);
}
.card:hover::before {
  opacity: 1;
}
.card:focus-within {
  outline: 3px solid rgba(var(--focus), 0.22);
  outline-offset: 3px;
}
```

### Navigation
```css
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 0 clamp(1rem, 4vw, 3rem);
  background: transparent;
  color: var(--text);
  border-bottom: 1px solid transparent;
  transition: background 260ms ease, border-color 260ms ease, min-height 260ms ease;
}
.nav.scrolled {
  min-height: 64px;
  background: rgba(var(--bg-rgb), 0.86);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: rgba(var(--text-rgb), 0.1);
}
.nav a,
.nav button {
  min-height: 44px;
  color: inherit;
}
.nav a:hover,
.nav button:hover {
  color: var(--accent-hover);
}
.nav a:focus-visible,
.nav button:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 4px;
}
```

### Links
```css
.link {
  color: var(--text);
  text-decoration: none;
  background-image: linear-gradient(var(--accent), var(--accent));
  background-size: 0 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: color 180ms ease, background-size 240ms ease;
}
.link:hover {
  color: var(--accent-hover);
  background-size: 100% 1px;
}
.link:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}
.link[aria-disabled='true'] {
  color: var(--text-tertiary);
  pointer-events: none;
}
```

### Tags / Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 30px;
  padding: 0.35rem 0.72rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(var(--surface-rgb), 0.72);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
}
.badge:hover {
  background: var(--surface-deep);
  border-color: var(--surface-deep);
  color: var(--text-inverse);
}
.badge:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}
```

### Memorial Timeline
```css
.timeline {
  display: grid;
  gap: 1rem;
  border-left: 1px solid var(--border);
  padding-left: clamp(1rem, 3vw, 2rem);
}
.timeline-item {
  position: relative;
  padding: 1rem;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: calc(-1rem - 5px);
  top: 1.4rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-luminous);
  box-shadow: 0 0 0 6px rgba(var(--accent-luminous-rgb), 0.18);
}
.timeline-item:hover {
  border-color: var(--border-hover);
}
```

## 5. Layout Principles

**Container:**
- Max width: 1320px
- Padding: `clamp(1rem, 4vw, 3rem)`
- Narrow variant for long text: 760px
- Hero min height: `min(980px, 100svh)`，但底部必须露出下一 section 的暗示内容。

**Spacing Scale:**
- Section padding: `clamp(5rem, 12vw, 11rem) 0`
- Compact section padding: `clamp(3.5rem, 8vw, 7rem) 0`
- Component gap: `clamp(1rem, 2.6vw, 2rem)`
- Card internal padding: `clamp(1.2rem, 3vw, 2.2rem)`

**Grid:**
```css
.container {
  width: min(100% - 2rem, 1320px);
  margin-inline: auto;
}
.split {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
}
.bento {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.8vw, 1.25rem);
}
.span-4 { grid-column: span 4; }
.span-5 { grid-column: span 5; }
.span-6 { grid-column: span 6; }
.span-7 { grid-column: span 7; }
.span-12 { grid-column: span 12; }
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `border: 1px solid var(--border)` | 正文区、时间线、说明块 |
| Subtle | `0 12px 30px rgba(var(--text-rgb), 0.06)` | 普通功能卡、媒体卡 |
| Elevated | `0 30px 90px rgba(var(--text-rgb), 0.12)` | Hero 记忆卡、浮层预览 |
| Luminous | `0 0 60px rgba(var(--accent-luminous-rgb), 0.24)` | 数字宠物激活、纪念日烛光 |
| Inverse | `0 34px 100px rgba(0, 0, 0, 0.28)` | 深色 CTA、WebGL 签名段 |

阴影只用于层级，不用于制造梦幻感；移动端减少阴影半径以避免页面发灰。

## 7. Animation & Interaction

**Motion Philosophy**: 电影式但低声量。滚动是翻阅记忆，hover 是轻声回应，所有动效都服务于“被认真保存”。
**Tier**: L3

### Dependencies
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"></script>
```

### Base Setup
```js
gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.reveal').forEach((el) => {
  if (reduceMotion) {
    el.classList.add('in-view');
    return;
  }
  ScrollTrigger.create({
    trigger: el,
    start: 'top 82%',
    once: true,
    onEnter: () => el.classList.add('in-view')
  });
});

const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });
```

### Entrance Animation
```css
@keyframes heroMaskIn {
  from { clip-path: inset(0 0 100% 0); opacity: 0; transform: translateY(28px); }
  to { clip-path: inset(0 0 0 0); opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-title .line {
  display: block;
  animation: heroMaskIn 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.hero-title .line:nth-child(2) { animation-delay: 140ms; }
.hero-title .line:nth-child(3) { animation-delay: 280ms; }
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 760ms cubic-bezier(0.16, 1, 0.3, 1), transform 760ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

### Scroll Behavior
```js
if (!reduceMotion) {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.memory-constellation',
      start: 'top top',
      end: '+=120%',
      scrub: 0.8,
      pin: true
    }
  })
  .to('.memory-card', {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.92,
    opacity: 0.16,
    stagger: { amount: 0.5, from: 'random' },
    ease: 'power2.out'
  })
  .fromTo('.archive-preview', { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power3.out' }, '<0.2');

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
```

### Hover & Focus States
```css
.magnet {
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}
.spotlight {
  --mx: 50%;
  --my: 50%;
}
.spotlight::before {
  background: radial-gradient(circle at var(--mx) var(--my), rgba(var(--accent-luminous-rgb), 0.22), transparent 34%);
}
:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 4px;
}
```

### Special Effects
- Hero H1: SplitText / mask reveal，三行标题依次展开。
- Section H2: ScrollFloat 风格，标题在滚动进入时轻微上浮。
- Body / Label: ScrollReveal 行粒度 reveal，不做中文字粒度拆分。
- Element: CTA Magnet，hover 时跟随鼠标轻微位移，离开归位。
- Component: Memory Constellation，散落照片、声纹、性格片段在首屏形成记忆星图，首次滑动汇聚为“永久档案”。
- Component: MagicBento / SpotlightCard，功能区为不等大 bento，鼠标跟随暖光。
- Background: Grainient + Threads，暖米白颗粒和丝线作为全局底纹。
- L3 Scroll Story: 一个 pin-scrub 记忆汇聚段；一个左 pin / 右 swap 的建档、陪伴、纪念、哀愈四场景段；一个 Three.js 透明记忆环，仅在可见时渲染。

### Three.js Signature Moment
```js
function initMemoryHalo(canvas) {
  if (!canvas || reduceMotion || window.innerWidth < 760) return;
  const io = new IntersectionObserver(([entry]) => {
    canvas.dataset.active = entry.isIntersecting ? 'true' : 'false';
  }, { threshold: 0.12 });
  io.observe(canvas);
  /* Implement one translucent torus knot / ring of points.
     Render loop must skip frames when canvas.dataset.active !== 'true'. */
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .memory-constellation,
  .journey-pin {
    min-height: auto;
  }
  .memory-card,
  .journey-scene {
    transform: none !important;
    opacity: 1 !important;
  }
  canvas.webgl {
    display: none;
  }
}
```

## 8. Do's and Don'ts

### Do
- 用“离开”“记得”“陪伴”“永久档案”等温和词汇，避免生硬的死亡叙述。
- 首屏必须让品牌名、产品定位、情感主张一眼可见。
- 每个动效段都要有清晰叙事目的：重建、陪伴、纪念、哀愈。
- 使用真实感的记忆介质：照片、时间轴、声纹、手写感留言、烛光，而不是卡通宠物插画。
- 建档流程展示必须庄重，不做促销式转化压迫。
- 安全与心理资源入口要被看见，但不能突然打断用户。
- 移动端优先保证文字、CTA 和流程卡片的可读性。
- Footer 或 README 注明 “Motion effects derived from vue-bits by DavidHDev (MIT)” 若复用相关源码。

### Don't
- 不要把页面做成普通虚拟宠物 App，禁止卡通乐园、游戏化喂养、金币奖励等语义。
- 不要用大面积紫蓝科技渐变、霓虹、赛博网格来表达 AI。
- 不要用廉价温情文案强迫用户“走出来”。
- 不要在 CTA 周围制造倒计时、限时优惠、强促销压迫。
- 不要让宠物“复活”的措辞过度绝对化；应强调数字陪伴和记忆保存。
- 不要用整页毛玻璃或大面积 blur，滚动性能优先。
- 不要把 UI 卡片套在另一张大卡片里，页面 section 应该是完整带状叙事。
- 不要在移动端保留复杂 WebGL 或 pin-scrub，必须降级为静态/轻量 reveal。
- 不要让可交互文字按钮低于 44px 高度。
- 不要让深色 section 连续超过两屏，避免情绪过重。

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1120px | 12 栏 bento、L3 pin-scrub、Three.js 记忆环、双栏叙事 |
| Tablet | 760px-1120px | 6 栏 bento、降低 parallax 幅度、pin 段改为较短 sticky |
| Mobile | < 760px | 单列、禁用 WebGL、禁用复杂 pin、导航折叠、CTA 全宽或双按钮换行 |

**Touch Targets:** minimum 44px
**Collapsing Strategy:** Hero 记忆卡从星图降级为横向可滑动卡组；功能 bento 降级为单列大卡；左 pin / 右 swap 降级为连续四张场景卡。

```css
@media (max-width: 1120px) {
  .split {
    grid-template-columns: 1fr;
  }
  .span-4,
  .span-5,
  .span-6,
  .span-7 {
    grid-column: span 6;
  }
}

@media (max-width: 760px) {
  .container {
    width: min(100% - 1.25rem, 100%);
  }
  .nav {
    min-height: 64px;
    padding-inline: 0.875rem;
  }
  .hero {
    min-height: 92svh;
    padding-top: 6rem;
  }
  .hero-title {
    font-size: clamp(3.25rem, 18vw, 5.75rem);
  }
  .bento {
    grid-template-columns: 1fr;
  }
  .span-4,
  .span-5,
  .span-6,
  .span-7,
  .span-12 {
    grid-column: 1;
  }
  .btn {
    width: 100%;
  }
  .memory-constellation,
  .journey-pin {
    height: auto;
    min-height: auto;
  }
  .webgl {
    display: none;
  }
}
```

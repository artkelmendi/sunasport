/* =========================================================================
   SUNASPORT — app engine (vanilla JS, no build step)
   ========================================================================= */
(function () {
  const { PRODUCTS, BRAND_THEME, productCopy } = window.SUNA;
  const EUR = (n) => '€' + n.toFixed(2);
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- SVG product icons (line-art, on-dark) ---------------- */
  const ICONS = {
    shoe: `<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 54c0-6 1-12 3-17l9 4 6-10 10 6 8-12c14 5 26 12 38 18 12 6 24 9 30 10 4 .6 6 3 6 7v8c0 3-2 5-5 5H13c-3 0-5-2-5-5v-14Z" fill="currentColor" fill-opacity=".14"/><path d="M8 54c0-6 1-12 3-17l9 4 6-10 10 6 8-12c14 5 26 12 38 18 12 6 24 9 30 10 4 .6 6 3 6 7v8c0 3-2 5-5 5H13c-3 0-5-2-5-5v-14Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M14 62h94" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M44 33l7 4M58 41l7 4M72 49l7 3" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    cleat: `<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 50c0-5 1-10 3-15l10 5 6-10 11 6 8-12c15 6 30 14 44 20 6 3 12 4 18 5 4 .5 6 3 6 7v7c0 3-2 5-5 5H13c-3 0-5-2-5-5V50Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M24 73v4M44 73v4M64 73v4M84 73v4M104 73v4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M40 30l8 4M56 38l8 4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    hoodie: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 16c0 8 6 12 15 12s15-4 15-12l16 8c6 3 9 9 9 16v8l-12 5v28c0 2-2 4-4 4H39c-2 0-4-2-4-4V53l-12-5v-8c0-7 3-13 9-16l3-2Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M35 16c2 9 9 14 15 14s13-5 15-14" stroke="currentColor" stroke-width="3"/><path d="M50 30v24M44 40h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    tee: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37 18 27 24l-12 9 8 13 8-5v40c0 2 2 4 4 4h30c2 0 4-2 4-4V41l8 5 8-13-12-9-10-6c-2 6-7 9-13 9s-11-3-13-9Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
    pants: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 14h36l4 72c0 2-2 4-4 4H58c-2 0-4-1-4-3l-4-37-4 37c0 2-2 3-4 3H32c-2 0-4-2-4-4l4-72Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M30 30h40" stroke="currentColor" stroke-width="3"/></svg>`,
    jacket: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 16 22 24c-5 3-8 8-8 14v6l10 4v34c0 2 2 4 4 4h44c2 0 4-2 4-4V52l10-4v-6c0-6-3-11-8-14l-16-8-12 7-12-7Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M50 23v63" stroke="currentColor" stroke-width="3" stroke-dasharray="4 5"/><path d="M40 40h6M54 40h6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    bag: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 34c0-11 9-18 20-18s20 7 20 18" stroke="currentColor" stroke-width="3"/><rect x="22" y="32" width="56" height="54" rx="10" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3"/><path d="M22 50h56" stroke="currentColor" stroke-width="3"/><path d="M44 60h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    ball: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="34" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3"/><path d="m50 34 11 8-4 13H43l-4-13 11-8Z" fill="currentColor" fill-opacity=".35"/><path d="m50 16 0 18M22 38l17 5M78 38l-17 5M33 78l10-15M67 78 57 63" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    cap: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 64c0-20 14-34 32-34s32 14 32 30c0 2-1 4-3 4H50" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M50 64H14c-3 0-5-2-4-5 1-4 5-6 10-6h30v11Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M50 30c8 4 12 18 12 34" stroke="currentColor" stroke-width="3"/></svg>`,
    socks: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 14h18v34c0 4 2 6 6 9l10 7c6 4 8 11 5 17-3 7-11 9-17 5L41 76c-5-3-9-9-9-16V14h8Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M32 30h26" stroke="currentColor" stroke-width="3"/></svg>`,
  };

  function mediaMarkup(p) {
    const icon = ICONS[p.icon] || ICONS.shoe;
    return `
      <div class="pmedia">
        <div class="pmedia__wm">${p.brand}</div>
        <div class="pmedia__icon">${icon}</div>
        ${p.img ? `<img class="pmedia__img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()">` : ''}
      </div>`;
  }

  function badgeMarkup(p) {
    if (!p.badge) return '';
    const cls = p.badge === 'SALE' ? 'tag-sale' : p.badge === 'HOT' ? 'tag-hot' : 'tag-new';
    return `<span class="tag ${cls} absolute top-3 left-3 z-[5]">${p.badge}</span>`;
  }

  function stars(rating) {
    const full = Math.round(rating);
    let s = '';
    for (let i = 1; i <= 5; i++) {
      s += `<svg viewBox="0 0 20 20" class="w-3.5 h-3.5" fill="${i <= full ? 'var(--volt-deep)' : 'none'}" stroke="var(--volt-deep)" stroke-width="1.5"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5Z"/></svg>`;
    }
    return s;
  }

  function swatches(p) {
    return p.colors.slice(0, 4).map((c) => `<span class="swatch" style="background:${c}"></span>`).join('');
  }

  /* ---------------- product card ---------------- */
  function labelFor(b) { return b === 'NEW' ? 'Just In' : b === 'HOT' ? 'Best Seller' : b === 'SALE' ? 'Sale' : ''; }
  function genderSub(p) { return (p.gender === 'Unisex' ? 'Unisex' : p.gender + "'s") + ' ' + p.sub; }

  function cardMarkup(p) {
    return `
    <article class="product-card group" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="block relative" aria-label="${p.brand} ${p.name}">
        ${mediaMarkup(p)}
        <div class="quickadd">
          <button class="btn btn-ink btn-block js-quickadd" data-id="${p.id}" type="button">Add to bag</button>
        </div>
      </a>
      <div class="pt-3.5">
        ${p.badge ? `<p class="text-[13px] font-semibold mb-1 text-[var(--volt)]">${labelFor(p.badge)}</p>` : ''}
        <h3 class="font-semibold text-[15px] leading-snug">
          <a href="product.html?id=${p.id}" class="hover:text-[var(--muted)] transition-colors">${p.name}</a>
        </h3>
        <p class="text-[var(--muted)] text-[14px] mt-0.5">${genderSub(p)}</p>
        <p class="text-[var(--muted)] text-[14px]">${p.colors.length} Colour${p.colors.length > 1 ? 's' : ''}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="font-semibold text-[15px] ${p.old ? 'text-[var(--volt)]' : ''}">${EUR(p.price)}</span>
          ${p.old ? `<span class="text-[var(--muted)] line-through text-[13px]">${EUR(p.old)}</span>` : ''}
        </div>
      </div>
    </article>`;
  }

  function renderGrid(target, list) {
    const el = typeof target === 'string' ? qs(target) : target;
    if (!el) return;
    el.innerHTML = list.map(cardMarkup).join('');
  }

  /* ---------------- CART (localStorage) ---------------- */
  const CART_KEY = 'suna.cart.v1';
  const readCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
  const writeCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));
  let cart = readCart();

  const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = () => cart.reduce((n, i) => { const p = byId(i.id); return n + (p ? p.price * i.qty : 0); }, 0);

  function addToCart(id, opts = {}) {
    const p = byId(id);
    if (!p) return;
    const size = opts.size || (p.sizes && p.sizes[0]) || 'One Size';
    const key = id + '::' + size;
    const found = cart.find((i) => i.key === key);
    if (found) found.qty += opts.qty || 1;
    else cart.push({ key, id, size, qty: opts.qty || 1 });
    writeCart(cart);
    syncCart();
    toast(`Added ${p.name}`, p.brand + ' • ' + (size === 'One Size' ? size : 'Size ' + size));
    openDrawer();
  }
  function setQty(key, qty) {
    const it = cart.find((i) => i.key === key);
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) cart = cart.filter((i) => i.key !== key);
    writeCart(cart);
    syncCart();
  }
  function removeItem(key) { cart = cart.filter((i) => i.key !== key); writeCart(cart); syncCart(); }

  const FREE_SHIP = 90;

  function syncCart() {
    qsa('[data-cart-count]').forEach((el) => {
      const c = cartCount();
      el.textContent = c;
      el.style.display = c > 0 ? 'grid' : 'none';
    });
    renderDrawer();
  }

  function renderDrawer() {
    const body = qs('#drawerBody');
    const footer = qs('#drawerFooter');
    if (!body) return;
    if (!cart.length) {
      body.innerHTML = `
        <div class="h-full grid place-items-center text-center px-8 py-16">
          <div>
            <div class="mx-auto w-16 h-16 rounded-full grid place-items-center" style="background:var(--paper-2)">
              <svg viewBox="0 0 24 24" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6h15l-1.5 9h-12L6 6Z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
            </div>
            <p class="font-display text-2xl mt-4">Your bag is empty</p>
            <p class="text-[var(--muted)] mt-1">Let's fix that.</p>
            <a href="shop.html" class="btn btn-ink mt-5">Shop now</a>
          </div>
        </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }
    if (footer) footer.style.display = 'block';
    body.innerHTML = cart.map((i) => {
      const p = byId(i.id);
      if (!p) return '';
      return `
      <div class="flex gap-3 py-4 border-b hairline">
        <a href="product.html?id=${p.id}" class="w-20 shrink-0">${mediaSmall(p)}</a>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between gap-2">
            <div class="min-w-0">
              <p class="font-display u-wide text-[11px] text-[var(--muted)] uppercase">${p.brand}</p>
              <p class="font-display text-[17px] leading-tight truncate">${p.name}</p>
              <p class="text-xs text-[var(--muted)] mt-0.5">Size ${i.size}</p>
            </div>
            <button class="js-remove text-[var(--muted)] hover:text-[var(--sale)] shrink-0" data-key="${i.key}" aria-label="Remove">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5 5 19"/></svg>
            </button>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border hairline rounded-full">
              <button class="js-dec w-8 h-8 grid place-items-center" data-key="${i.key}" aria-label="Decrease">−</button>
              <span class="w-7 text-center text-sm font-semibold">${i.qty}</span>
              <button class="js-inc w-8 h-8 grid place-items-center" data-key="${i.key}" aria-label="Increase">+</button>
            </div>
            <span class="font-semibold">${EUR(p.price * i.qty)}</span>
          </div>
        </div>
      </div>`;
    }).join('');

    // footer totals + free-ship progress
    const total = cartTotal();
    const remain = Math.max(0, FREE_SHIP - total);
    const pct = Math.min(100, (total / FREE_SHIP) * 100);
    qs('#drawerSubtotal').textContent = EUR(total);
    const prog = qs('#shipProgress');
    if (prog) {
      prog.style.width = pct + '%';
      qs('#shipMsg').innerHTML = remain > 0
        ? `Add <b>${EUR(remain)}</b> for <b>free delivery</b>`
        : `<b>You've unlocked free delivery!</b>`;
    }
  }

  function mediaSmall(p) {
    if (p.img) return `<div class="rounded-md overflow-hidden aspect-square bg-[#f4f4f4]"><img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover" loading="lazy" onerror="this.remove()"></div>`;
    return `<div class="rounded-md overflow-hidden grid place-items-center aspect-square" style="background:#f4f4f4;color:var(--ink)">
      <div style="width:62%">${ICONS[p.icon] || ICONS.shoe}</div></div>`;
  }

  /* ---------------- drawer + scrim ---------------- */
  function openDrawer() { qs('#cartDrawer')?.classList.add('open'); qs('#scrim')?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { qs('#cartDrawer')?.classList.remove('open'); qs('#scrim')?.classList.remove('open'); document.body.style.overflow = ''; }

  /* ---------------- toast ---------------- */
  let toastWrap;
  function toast(title, sub) {
    if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap); }
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="dot"></span><div><div class="leading-tight">${title}</div>${sub ? `<div class="text-xs text-white/60 leading-tight">${sub}</div>` : ''}</div>`;
    toastWrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('in'));
    setTimeout(() => { el.classList.remove('in'); setTimeout(() => el.remove(), 320); }, 2600);
  }

  /* ---------------- shared chrome: header/footer/drawer ---------------- */
  function injectChrome() {
    // cart drawer + scrim (once)
    if (!qs('#cartDrawer')) {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
      <div id="scrim" class="drawer-scrim"></div>
      <aside id="cartDrawer" class="drawer" aria-label="Shopping bag" role="dialog" aria-modal="true">
        <header class="flex items-center justify-between px-5 py-4 border-b hairline">
          <h2 class="font-display text-2xl">Your Bag</h2>
          <button id="drawerClose" class="w-9 h-9 grid place-items-center rounded-full hover:bg-[var(--paper-2)]" aria-label="Close bag">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5 5 19"/></svg>
          </button>
        </header>
        <div class="px-5 pt-4">
          <div class="rounded-xl px-4 py-3" style="background:var(--paper-2)">
            <p id="shipMsg" class="text-sm"></p>
            <div class="h-2 rounded-full mt-2 overflow-hidden" style="background:#dcd9cf">
              <div id="shipProgress" class="h-full rounded-full" style="width:0%;background:var(--volt-deep);transition:width .4s var(--ease)"></div>
            </div>
          </div>
        </div>
        <div id="drawerBody" class="flex-1 overflow-y-auto px-5"></div>
        <footer id="drawerFooter" class="border-t hairline px-5 py-4">
          <div class="flex justify-between items-baseline mb-1"><span class="text-[var(--muted)]">Subtotal</span><span id="drawerSubtotal" class="font-display text-2xl">€0.00</span></div>
          <p class="text-xs text-[var(--muted)] mb-3">Taxes &amp; shipping calculated at checkout.</p>
          <button class="btn btn-ink btn-block" onclick="alert('Demo only — checkout is not wired up.')">Checkout</button>
          <button id="keepShopping" class="btn btn-ghost btn-block mt-2">Keep shopping</button>
        </footer>
      </aside>`;
      document.body.appendChild(wrap);
    }
    syncCart();
  }

  /* ---------------- scroll reveal ---------------- */
  function initReveal() {
    const els = qsa('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- mega-menu nav (built from catalogue) ---------------- */
  function buildNav() {
    const groups = ['Shoes', 'Clothing', 'Accessories'];
    const subsByGroup = {}; groups.forEach((g) => subsByGroup[g] = [...new Set(PRODUCTS.filter((p) => p.group === g).map((p) => p.sub))]);
    const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
    const enc = encodeURIComponent;

    const colsForGender = (gender) => groups.map((g) => ({
      title: g,
      links: [['All ' + g, `shop.html?gender=${gender}&group=${g}`]].concat(subsByGroup[g].map((s) => [s, `shop.html?gender=${gender}&group=${g}&sub=${enc(s)}`])),
    }));
    const featuredCol = { title: 'Featured', links: [['New Arrivals', 'shop.html'], ['Best Sellers', 'shop.html?sort=rating'], ['On Sale', 'shop.html?sale=1'], ['Shop All', 'shop.html']] };

    const items = [
      { label: 'New & Featured', href: 'shop.html', cols: [featuredCol, { title: 'Shop by', links: groups.map((g) => ['All ' + g, `shop.html?group=${g}`]) }, { title: 'Trending', links: [['Sneakers', 'shop.html?group=Shoes'], ['Slides', `shop.html?sub=${enc('Slides')}`], ['Track tops', `shop.html?sub=${enc('Jackets')}`], ['Tees', `shop.html?sub=${enc('T-Shirts')}`]] }] },
      { label: 'Men', href: 'shop.html?gender=Men', cols: colsForGender('Men') },
      { label: 'Women', href: 'shop.html?gender=Women', cols: colsForGender('Women') },
      { label: 'Kids', href: 'shop.html?gender=Kids', cols: colsForGender('Kids') },
      { label: 'Brands', href: 'shop.html', brands: true },
      { label: 'Sale', href: 'shop.html?sale=1', hot: true },
    ];

    const nav = qs('#siteNav');
    if (nav) {
      nav.innerHTML = items.map((it) => {
        if (!it.cols && !it.brands) return `<div class="mega-item"><a href="${it.href}" class="nav-link ${it.hot ? 'hot' : ''}">${it.label}</a></div>`;
        let panel;
        if (it.brands) {
          panel = `<div class="max-w-8xl mx-auto px-6 py-8"><p class="mega-col-title mb-4">All brands</p><div class="grid grid-cols-4 gap-x-8 gap-y-2.5">${brands.map((b) => `<a href="shop.html?brand=${enc(b)}" class="mega-link text-[15px]">${b}</a>`).join('')}</div></div>`;
        } else {
          panel = `<div class="max-w-8xl mx-auto px-6 py-8 grid grid-cols-${Math.min(it.cols.length, 4)} gap-8">${it.cols.map((col) => `<div><p class="mega-col-title mb-3">${col.title}</p><div class="flex flex-col gap-2">${col.links.map((l) => `<a href="${l[1]}" class="mega-link text-[15px]">${l[0]}</a>`).join('')}</div></div>`).join('')}</div>`;
        }
        return `<div class="mega-item"><a href="${it.href}" class="nav-link ${it.hot ? 'hot' : ''}">${it.label}</a><div class="mega">${panel}</div></div>`;
      }).join('');
    }

    const m = qs('#mobileNavBody');
    if (m) {
      m.innerHTML = items.map((it) => {
        if (!it.cols && !it.brands) return `<a href="${it.href}" class="block py-3 border-b border-white/10 font-display uppercase text-2xl ${it.hot ? 'text-volt' : ''}">${it.label}</a>`;
        const sub = it.brands
          ? brands.map((b) => `<a href="shop.html?brand=${enc(b)}" class="block py-1.5 text-white/70">${b}</a>`).join('')
          : it.cols.map((col) => `<a href="${col.links[0][1]}" class="block py-1.5 text-white/70">${col.title}</a>`).join('');
        return `<div class="border-b border-white/10"><button type="button" class="js-mtog w-full flex items-center justify-between py-3 font-display uppercase text-2xl"><span>${it.label}</span><svg viewBox="0 0 24 24" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button><div class="hidden pb-3 pl-1">${sub}</div></div>`;
      }).join('');
      qsa('#mobileNavBody .js-mtog').forEach((btn) => btn.addEventListener('click', () => { btn.nextElementSibling.classList.toggle('hidden'); btn.querySelector('svg').classList.toggle('-rotate-180'); }));
      qsa('#mobileNavBody a').forEach((a) => a.addEventListener('click', () => { qs('#mobileNav')?.classList.remove('open'); document.body.style.overflow = ''; }));
    }
  }

  /* ---------------- header behavior ---------------- */
  function initHeader() {
    const header = qs('#siteHeader');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
      onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    }
    qs('#menuToggle')?.addEventListener('click', () => { qs('#mobileNav')?.classList.add('open'); document.body.style.overflow = 'hidden'; });
    qs('#menuClose')?.addEventListener('click', () => { qs('#mobileNav')?.classList.remove('open'); document.body.style.overflow = ''; });
    qsa('#mobileNav a').forEach((a) => a.addEventListener('click', () => { qs('#mobileNav')?.classList.remove('open'); document.body.style.overflow = ''; }));
  }

  /* ---------------- global delegated events ---------------- */
  function initEvents() {
    document.addEventListener('click', (e) => {
      const qa = e.target.closest('.js-quickadd');
      if (qa) { e.preventDefault(); addToCart(qa.dataset.id); return; }
      if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openDrawer(); return; }
      if (e.target.closest('#drawerClose') || e.target.closest('#scrim') || e.target.closest('#keepShopping')) { closeDrawer(); return; }
      const inc = e.target.closest('.js-inc'); if (inc) { const it = cart.find((i) => i.key === inc.dataset.key); if (it) setQty(it.key, it.qty + 1); return; }
      const dec = e.target.closest('.js-dec'); if (dec) { const it = cart.find((i) => i.key === dec.dataset.key); if (it) setQty(it.key, it.qty - 1); return; }
      const rm = e.target.closest('.js-remove'); if (rm) { removeItem(rm.dataset.key); return; }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
  }

  /* ---------------- page initialisers ---------------- */
  function initHome() {
    const withImg = PRODUCTS.filter((p) => p.img);
    const trending = withImg.filter((p) => ['HOT', 'NEW'].includes(p.badge))
      .concat(withImg.filter((p) => !['HOT', 'NEW'].includes(p.badge)))
      .slice(0, 8);
    renderGrid('#trendingGrid', trending);
    renderGrid('#newGrid', withImg.filter((p) => p.group !== 'Shoes' || ['nk-calm-slide', 'nk-court-td', 'ad-adilette'].includes(p.id)).slice(0, 4));
  }

  /* hex -> colour family */
  const FAMILY_HEX = { Black:'#0b0b0c', White:'#ffffff', Grey:'#9a9a9a', Beige:'#e3d4b8', Brown:'#6b4a35', Red:'#e11d2a', Orange:'#f97316', Yellow:'#eab308', Green:'#1f8f4e', Blue:'#1d4ed8', Purple:'#7c3aed', Pink:'#ec4899' };
  function hexToFamily(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    if (max < 45) return 'Black';
    if (min > 205 && d < 24) return 'White';
    if (d < 28) return 'Grey';
    let hue; if (max === r) hue = ((g - b) / d) % 6; else if (max === g) hue = (b - r) / d + 2; else hue = (r - g) / d + 4;
    hue *= 60; if (hue < 0) hue += 360;
    if (hue < 18 || hue >= 345) return 'Red';
    if (hue < 45) return max < 165 ? 'Brown' : 'Orange';
    if (hue < 66) return max < 165 ? 'Brown' : (min > 120 ? 'Beige' : 'Yellow');
    if (hue < 170) return 'Green';
    if (hue < 255) return 'Blue';
    if (hue < 295) return 'Purple';
    return 'Pink';
  }

  function initShop() {
    const grid = qs('#shopGrid');
    if (!grid) return;
    const params = new URLSearchParams(location.search);
    const state = { q: params.get('q') || '', genders: new Set(), groups: new Set(), subs: new Set(), brands: new Set(), sizes: new Set(), colours: new Set(), onSale: params.get('sale') === '1', max: 0, sort: params.get('sort') || 'featured' };
    if (params.get('group')) state.groups.add(params.get('group'));
    if (params.get('gender')) state.genders.add(params.get('gender'));
    if (params.get('brand')) state.brands.add(decodeURIComponent(params.get('brand')));
    if (params.get('sub')) state.subs.add(decodeURIComponent(params.get('sub')));

    const allBrands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
    const allGenders = ['Men', 'Women', 'Kids', 'Unisex'];
    const allGroups = ['Shoes', 'Clothing', 'Accessories'];
    const allSubs = [...new Set(PRODUCTS.map((p) => p.sub))].sort();
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
    const allSizes = (() => {
      const set = new Set(); PRODUCTS.forEach((p) => p.sizes.forEach((s) => set.add(String(s))));
      const arr = [...set];
      const letters = arr.filter((s) => sizeOrder.includes(s)).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
      const nums = arr.filter((s) => /^\d/.test(s)).sort((a, b) => parseFloat(a) - parseFloat(b));
      const other = arr.filter((s) => !sizeOrder.includes(s) && !/^\d/.test(s));
      return [...letters, ...nums, ...other];
    })();
    const colourOrder = ['Black', 'White', 'Grey', 'Beige', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink'];
    const allColours = [...new Set(PRODUCTS.flatMap((p) => p.colors.map(hexToFamily)))].sort((a, b) => colourOrder.indexOf(a) - colourOrder.indexOf(b));
    const maxPrice = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 10) * 10;
    state.max = maxPrice;
    const count = (fn) => PRODUCTS.filter(fn).length;

    /* ---- UI builders ---- */
    const sec = (title, body, open = true) => `
      <div class="border-b hairline py-4">
        <button type="button" class="js-acc w-full flex items-center justify-between text-left">
          <span class="mega-col-title">${title}</span>
          <svg viewBox="0 0 24 24" class="w-4 h-4 acc-ico ${open ? '' : '-rotate-90'} transition-transform" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="acc-body ${open ? '' : 'hidden'} pt-2.5">${body}</div>
      </div>`;
    const row = (cls, val, label, cnt) => `
      <label class="flex items-center gap-2.5 cursor-pointer py-1.5 group text-[15px]">
        <input type="checkbox" value="${val}" class="${cls} peer sr-only">
        <span class="w-5 h-5 rounded border-2 hairline grid place-items-center peer-checked:bg-[var(--ink)] peer-checked:border-[var(--ink)] transition-colors shrink-0">
          <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
        </span>
        <span class="flex-1 group-hover:text-black transition-colors">${label}</span>
        <span class="text-muted text-[13px]">${cnt}</span>
      </label>`;

    function buildUI() {
      const gender = allGenders.map((g) => row('js-f-gender', g, g, count((p) => p.gender === g))).join('');
      const group = allGroups.map((g) => row('js-f-group', g, g, count((p) => p.group === g))).join('');
      const sub = allSubs.map((s) => row('js-f-sub', s, s, count((p) => p.sub === s))).join('');
      const brand = `<input id="brandSearch" type="search" placeholder="Search brand" class="w-full h-9 rounded-lg bg-paper-2 px-3 text-sm mb-1 outline-none focus:ring-2 focus:ring-[var(--ink)]">
        <div id="brandList" class="max-h-56 overflow-y-auto pr-1 no-scrollbar">${allBrands.map((b) => row('js-f-brand', b, b, count((p) => p.brand === b))).join('')}</div>`;
      const size = `<div class="flex flex-wrap gap-2">${allSizes.map((s) => `<button type="button" class="js-f-size size-chip !min-w-0 !px-2.5 !py-1.5 !text-[13px]" data-size="${s}">${s}</button>`).join('')}</div>`;
      const colour = `<div class="flex flex-wrap gap-x-3 gap-y-3">${allColours.map((c) => `<button type="button" class="js-f-colour flex flex-col items-center gap-1 w-[52px]" data-colour="${c}" title="${c}"><span class="swatch-lg" style="background:${FAMILY_HEX[c] || '#ccc'}"></span><span class="text-[11px] text-muted leading-none">${c}</span></button>`).join('')}</div>`;
      const price = `<input id="priceRange" type="range" min="10" max="${maxPrice}" value="${maxPrice}" class="w-full">
        <div class="flex justify-between text-xs text-muted mt-2"><span>€10</span><span>Up to <b id="priceVal" class="text-ink">€${maxPrice}</b></span></div>`;
      qs('#filterSections').innerHTML = sec('Gender', gender) + sec('Category', group) + sec('Product type', sub, false) + sec('Brand', brand) + sec('Size', size, false) + sec('Colour', colour, false) + sec('Price', price);

      qsa('#filterSections .js-acc').forEach((btn) => btn.addEventListener('click', () => {
        btn.parentElement.querySelector('.acc-body').classList.toggle('hidden');
        btn.querySelector('.acc-ico').classList.toggle('-rotate-90');
      }));
      const bind = (cls, set) => qsa(cls).forEach((c) => c.addEventListener('change', () => { c.checked ? set.add(c.value) : set.delete(c.value); apply(); }));
      bind('.js-f-gender', state.genders); bind('.js-f-group', state.groups); bind('.js-f-sub', state.subs); bind('.js-f-brand', state.brands);
      qsa('.js-f-size').forEach((b) => b.addEventListener('click', () => { b.classList.toggle('sel'); b.classList.contains('sel') ? state.sizes.add(b.dataset.size) : state.sizes.delete(b.dataset.size); apply(); }));
      qsa('.js-f-colour').forEach((b) => b.addEventListener('click', () => { b.classList.toggle('sel'); b.classList.contains('sel') ? state.colours.add(b.dataset.colour) : state.colours.delete(b.dataset.colour); apply(); }));
      qs('#brandSearch')?.addEventListener('input', (e) => { const q = e.target.value.toLowerCase(); qsa('#brandList label').forEach((l) => { l.style.display = l.textContent.toLowerCase().includes(q) ? '' : 'none'; }); });
      qs('#priceRange')?.addEventListener('input', (e) => { state.max = +e.target.value; qs('#priceVal').textContent = '€' + state.max; apply(); });
      syncControls();
    }

    function syncControls() {
      qsa('.js-f-gender').forEach((c) => (c.checked = state.genders.has(c.value)));
      qsa('.js-f-group').forEach((c) => (c.checked = state.groups.has(c.value)));
      qsa('.js-f-sub').forEach((c) => (c.checked = state.subs.has(c.value)));
      qsa('.js-f-brand').forEach((c) => (c.checked = state.brands.has(c.value)));
      qsa('.js-f-size').forEach((b) => b.classList.toggle('sel', state.sizes.has(b.dataset.size)));
      qsa('.js-f-colour').forEach((b) => b.classList.toggle('sel', state.colours.has(b.dataset.colour)));
    }

    function apply() {
      let list = PRODUCTS.slice();
      if (state.q) { const q = state.q.toLowerCase(); list = list.filter((p) => (p.name + ' ' + p.brand + ' ' + p.sub + ' ' + p.gender).toLowerCase().includes(q)); }
      if (state.genders.size) list = list.filter((p) => state.genders.has(p.gender) || p.gender === 'Unisex');
      if (state.groups.size) list = list.filter((p) => state.groups.has(p.group));
      if (state.subs.size) list = list.filter((p) => state.subs.has(p.sub));
      if (state.brands.size) list = list.filter((p) => state.brands.has(p.brand));
      if (state.sizes.size) list = list.filter((p) => p.sizes.some((s) => state.sizes.has(String(s))));
      if (state.colours.size) list = list.filter((p) => p.colors.some((c) => state.colours.has(hexToFamily(c))));
      if (state.onSale) list = list.filter((p) => p.old);
      list = list.filter((p) => p.price <= state.max);
      if (state.sort === 'low') list.sort((a, b) => a.price - b.price);
      else if (state.sort === 'high') list.sort((a, b) => b.price - a.price);
      else if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
      renderGrid(grid, list);
      qs('#resultCount').textContent = list.length;
      qs('#shopEmpty').style.display = list.length ? 'none' : 'block';
      grid.style.display = list.length ? '' : 'none';
      renderChips();
    }

    function renderChips() {
      const chips = [];
      const add = (label, clear) => chips.push({ label, clear });
      state.genders.forEach((v) => add(v, () => state.genders.delete(v)));
      state.groups.forEach((v) => add(v, () => state.groups.delete(v)));
      state.subs.forEach((v) => add(v, () => state.subs.delete(v)));
      state.brands.forEach((v) => add(v, () => state.brands.delete(v)));
      state.sizes.forEach((v) => add('Size ' + v, () => state.sizes.delete(v)));
      state.colours.forEach((v) => add(v, () => state.colours.delete(v)));
      if (state.onSale) add('On sale', () => { state.onSale = false; });
      if (state.q) add('“' + state.q + '”', () => { state.q = ''; qs('#searchInput').value = ''; });
      if (state.max < maxPrice) add('Under €' + state.max, () => { state.max = maxPrice; const pr = qs('#priceRange'); if (pr) pr.value = maxPrice; const pv = qs('#priceVal'); if (pv) pv.textContent = '€' + maxPrice; });
      qs('#clearFilters').classList.toggle('hidden', chips.length === 0);
      const wrap = qs('#activeChips');
      wrap.innerHTML = chips.map((c, i) => `<button class="js-chip inline-flex items-center gap-1.5 bg-paper-2 hover:bg-[#e7e7e7] rounded-full pl-3 pr-2 py-1 text-sm transition-colors" data-i="${i}">${c.label}<svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5 5 19"/></svg></button>`).join('');
      qsa('#activeChips .js-chip').forEach((b) => b.addEventListener('click', () => { chips[+b.dataset.i].clear(); syncControls(); apply(); }));
    }

    // toolbar
    if (state.q) qs('#searchInput').value = state.q;
    { const _ss = qs('#sortSelect'); if (_ss) _ss.value = state.sort; }
    qs('#searchInput')?.addEventListener('input', (e) => { state.q = e.target.value; apply(); });
    qs('#sortSelect')?.addEventListener('change', (e) => { state.sort = e.target.value; apply(); });
    qs('#clearFilters')?.addEventListener('click', () => {
      state.q = ''; state.genders.clear(); state.groups.clear(); state.subs.clear(); state.brands.clear(); state.sizes.clear(); state.colours.clear(); state.onSale = false; state.max = maxPrice; state.sort = 'featured';
      qs('#searchInput').value = ''; const ss = qs('#sortSelect'); if (ss) ss.value = 'featured';
      const pr = qs('#priceRange'); if (pr) pr.value = maxPrice; const pv = qs('#priceVal'); if (pv) pv.textContent = '€' + maxPrice;
      syncControls(); apply();
    });

    // mobile drawer
    const openF = () => { qs('#filterPanel').classList.add('open'); qs('#filterScrim').classList.add('open'); document.body.style.overflow = 'hidden'; };
    const closeF = () => { qs('#filterPanel').classList.remove('open'); qs('#filterScrim').classList.remove('open'); document.body.style.overflow = ''; };
    qs('#filterToggle')?.addEventListener('click', openF);
    qs('#filterClose')?.addEventListener('click', closeF);
    qs('#filterScrim')?.addEventListener('click', closeF);

    buildUI();
    apply();
  }

  function initProduct() {
    const root = qs('#productRoot');
    if (!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const p = byId(id) || PRODUCTS[0];
    document.title = `${p.name} — SUNASPORT`;

    let chosenSize = null;
    const sizeChips = p.sizes.map((s, i) => `<button class="size-chip js-size ${i === 0 && p.sizes.length === 1 ? 'sel' : ''}" data-size="${s}">${s}</button>`).join('');

    const galleryHTML = (p.imgs && p.imgs.length)
      ? `<div class="relative">${badgeMarkup(p)}<div class="pmedia"><img id="pdpMainImg" class="pmedia__img" src="${p.imgs[0]}" alt="${p.name}"></div></div>
         <div class="grid grid-cols-4 gap-3 mt-3">
           ${p.imgs.slice(0, 8).map((src, i) => `<button type="button" class="js-thumb rounded-md overflow-hidden aspect-square bg-[#f4f4f4] transition ${i === 0 ? 'ring-2 ring-[var(--ink)]' : 'opacity-70 hover:opacity-100'}" data-src="${src}"><img src="${src}" alt="" class="w-full h-full object-cover"></button>`).join('')}
         </div>`
      : `<div class="relative">${badgeMarkup(p)}${mediaMarkup(p)}</div>
         <div class="grid grid-cols-4 gap-3 mt-3">${[0, 1, 2, 3].map((i) => `<div class="rounded-md overflow-hidden ${i === 0 ? 'ring-2 ring-[var(--ink)]' : 'opacity-60'}">${mediaSmall(p)}</div>`).join('')}</div>`;

    root.innerHTML = `
      <nav class="text-sm text-[var(--muted)] mb-5 flex gap-1.5 items-center flex-wrap">
        <a href="index.html" class="hover:text-black">Home</a><span>/</span>
        <a href="shop.html?group=${p.group}" class="hover:text-black">${p.group}</a><span>/</span>
        <span class="text-[var(--ink)]">${p.name}</span>
      </nav>
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div class="lg:sticky lg:top-28">${galleryHTML}</div>
        <div>
          <p class="font-display u-wide uppercase text-[var(--muted)]">${p.brand}</p>
          <h1 class="font-display text-4xl md:text-5xl leading-[.95] mt-1">${p.name}</h1>
          <div class="flex items-center gap-3 mt-3">
            <div class="flex gap-0.5">${stars(p.rating)}</div>
            <span class="text-sm text-[var(--muted)]">${p.rating} · ${p.reviews} reviews</span>
          </div>
          <div class="flex items-center gap-3 mt-5">
            <span class="font-display text-4xl">${EUR(p.price)}</span>
            ${p.old ? `<span class="text-[var(--muted)] line-through text-xl">${EUR(p.old)}</span>` : ''}
            ${p.old ? `<span class="tag tag-sale">Save ${EUR(p.old - p.price)}</span>` : ''}
          </div>
          <p class="text-[var(--muted)] leading-relaxed mt-5 max-w-prose">${productCopy(p)}</p>

          <div class="mt-6">
            <p class="font-display u-wide uppercase text-sm mb-2">Colour</p>
            <div class="flex gap-2">${p.colors.map((c, i) => `<span class="swatch !w-7 !h-7 ${i === 0 ? 'ring-2 ring-offset-2 ring-[var(--ink)]' : ''}" style="background:${c}"></span>`).join('')}</div>
          </div>

          <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
              <p class="font-display u-wide uppercase text-sm">Size</p>
              <button class="text-sm underline text-[var(--muted)] hover:text-black">Size guide</button>
            </div>
            <div class="flex flex-wrap gap-2" id="sizeWrap">${sizeChips}</div>
            <p id="sizeErr" class="text-[var(--sale)] text-sm mt-2 hidden">Please select a size.</p>
          </div>

          <div class="flex gap-3 mt-7">
            <button id="addBtn" class="btn btn-ink flex-1">Add to bag — ${EUR(p.price)}</button>
            <button id="wishBtn" class="btn btn-ghost !px-4" aria-label="Save to wishlist">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.6 8.3 2.2 5 5.5 5 7.6 5 9 6.2 12 9c3-2.8 4.4-4 6.5-4 3.3 0 4.9 3.3 3.5 6.7C19.5 16.4 12 21 12 21Z"/></svg>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-3 mt-7 text-center">
            ${[['truck', 'Free delivery', 'over €90'], ['refresh', '30-day returns', 'free & easy'], ['shield', 'Authentic', '100% genuine']].map(([ic, t, s]) => `
              <div class="rounded-xl p-3 border hairline">
                <div class="mx-auto mb-1.5 w-8 h-8 grid place-items-center text-[var(--ink)]">${miniIcon(ic)}</div>
                <p class="font-display text-[15px] leading-tight">${t}</p>
                <p class="text-xs text-[var(--muted)]">${s}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;

    // size selection
    qsa('.js-size', root).forEach((b) => b.addEventListener('click', () => {
      qsa('.js-size', root).forEach((x) => x.classList.remove('sel'));
      b.classList.add('sel'); chosenSize = b.dataset.size; qs('#sizeErr').classList.add('hidden');
    }));
    if (p.sizes.length === 1) chosenSize = p.sizes[0];

    qsa('.js-thumb', root).forEach((b) => b.addEventListener('click', () => {
      const main = qs('#pdpMainImg', root); if (main) main.src = b.dataset.src;
      qsa('.js-thumb', root).forEach((x) => { x.classList.remove('ring-2', 'ring-[var(--ink)]'); x.classList.add('opacity-70'); });
      b.classList.add('ring-2', 'ring-[var(--ink)]'); b.classList.remove('opacity-70');
    }));

    qs('#addBtn').addEventListener('click', () => {
      if (!chosenSize) { qs('#sizeErr').classList.remove('hidden'); return; }
      addToCart(p.id, { size: chosenSize });
    });
    qs('#wishBtn').addEventListener('click', () => toast('Saved to wishlist', p.name));

    // related
    const related = PRODUCTS.filter((x) => x.id !== p.id && (x.brand === p.brand || x.group === p.group)).slice(0, 4);
    renderGrid('#relatedGrid', related);
  }

  function miniIcon(k) {
    const m = {
      truck: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>`,
      refresh: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>`,
      shield: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"/><path d="M9 12l2 2 4-4"/></svg>`,
    };
    return m[k] || '';
  }

  /* ---------------- boot ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    injectChrome();
    buildNav();
    initHeader();
    initEvents();
    initReveal();
    const page = document.body.dataset.page;
    if (page === 'home') initHome();
    if (page === 'shop') initShop();
    if (page === 'product') initProduct();
  });

  // expose a couple helpers for inline use
  window.SUNA.addToCart = addToCart;
  window.SUNA.renderGrid = renderGrid;
})();

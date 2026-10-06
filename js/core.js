/* Kosha Wealth — core helpers: icons, charts, avatars, motion */
window.K = window.K || {};
(function (K) {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  K.$ = $; K.$$ = $$;

  /* ---------- formatting ---------- */
  K.inr = n => (n < 0 ? '-' : '') + '₹' + Math.round(Math.abs(n)).toLocaleString('en-IN');
  K.L = n => { const a = Math.abs(n), s = n < 0 ? '-' : ''; return a >= 1e7 ? s + '₹' + (a / 1e7).toFixed(2) + ' Cr' : a >= 1e5 ? s + '₹' + (a / 1e5).toFixed(a >= 1e6 ? 1 : 2).replace(/\.?0+$/, '') + ' L' : K.inr(n) };
  K.short = n => { const a = Math.abs(n); return a >= 1e7 ? (a / 1e7).toFixed(a >= 1e8 ? 0 : 1).replace(/\.0$/, '') + 'Cr' : a >= 1e5 ? (a / 1e5).toFixed(a >= 1e6 ? 0 : 1).replace(/\.0$/, '') + 'L' : a >= 1e3 ? (a / 1e3).toFixed(0) + 'k' : Math.round(a) + '' };
  K.pc = (v, d = 1) => `<span class="${v >= 0 ? 'up' : 'dn'}">${v >= 0 ? '+' : ''}${v.toFixed(d)}%</span>`;
  K.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- icons ---------- */
  const P = {
    arrow: 'M5 12h14M13 6l6 6-6 6', arrowUp: 'M7 17 17 7M8 7h9v9', plus: 'M12 5v14M5 12h14', minus: 'M5 12h14', check: 'M5 12.5l4.5 4.5L19 7.5',
    chev: 'M6 9l6 6 6-6', chevR: 'M9 6l6 6-6 6', chevL: 'M15 6l-6 6 6 6', x: 'M6 6l12 12M18 6 6 18',
    search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM20 20l-4-4',
    bell: 'M6.5 16v-5a5.5 5.5 0 0 1 11 0v5l1.5 2h-14zM10 21h4', bag: 'M4.5 8h15l-1.4 10.2a2 2 0 0 1-2 1.8H7.9a2 2 0 0 1-2-1.8zM9 8V6.5a3 3 0 0 1 6 0V8',
    menu: 'M4 7h16M4 12h16M4 17h10', moon: 'M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z',
    shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2.2 2.2L15.5 10',
    home: 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z',
    cap: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
    sunrise: 'M3 18h18M7 18a5 5 0 0 1 10 0M12 6v3M5 10l2 2M19 10l-2 2',
    plane: 'M21 3 3 10l7 3 3 7zM10 13l11-10', heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
    trend: 'M3 17l6-6 4 4 8-8M15 7h6v6', chart: 'M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6',
    wallet: 'M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 7l12-3v3M16 13.5h2',
    bank: 'M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18', doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
    user: 'M12 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM5 20c0-4 3.2-6 7-6s7 2 7 6',
    users: 'M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3 19c0-3.3 2.7-5 6-5s6 1.7 6 5M16 5.5a2.7 2.7 0 0 1 0 5M17.5 14.3c2 .6 3.5 2 3.5 4.7',
    lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3', star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z',
    download: 'M12 4v11M7 11l5 5 5-5M5 20h14', calendar: 'M5 6h14v14H5zM5 10h14M9 3v4M15 3v4', refresh: 'M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4',
    filter: 'M4 6h16M7 12h10M10 18h4', sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8v.01',
    percent: 'M6 18 18 6M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM16 13.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z', leaf: 'M5 19C5 10 10 5 20 5c0 10-5 15-14 15zM5 19l8-8',
    scale: 'M12 4v16M6 20h12M5 8h14M5 8l-3 7a3 3 0 0 0 6 0zM19 8l-3 7a3 3 0 0 0 6 0z', building: 'M5 21V5l8-2v18M13 9h6v12M8 8h2M8 12h2M8 16h2',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2', target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM12 11.5a.5.5 0 1 0 0 1',
    mail: 'M4 6h16v12H4zM4 7l8 6 8-6', chat: 'M5 5h14v10H10l-5 4z', pin: 'M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
    play: 'M8 5v14l11-7z', bolt: 'M13 3 5 14h6l-1 7 8-11h-6z', globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
    pie: 'M12 3v9h9a9 9 0 1 1-9-9zM15 3a9 9 0 0 1 6 6h-6z', layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5', rupee: 'M7 5h10M7 9.5h10M8 5c6 0 7 3.5 5 6s-4 2.5-5 2.5l7 6',
    gift: 'M4 11h16v9H4zM3 8h18v3H3zM12 8v12M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0', coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.6-2.5 1.9S9.5 12.5 9.5 13.8s1 1.8 2.5 1.8 2.5-.8 2.5-1.8',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z', qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-4M14 18h2v2h-2z',
    book: 'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h10', award: 'M12 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM8.5 13.5 7 21l5-3 5 3-1.5-7.5',
    compare: 'M8 4v16M16 4v16M4 8h8M12 16h8', logout: 'M10 4H5v16h5M15 8l4 4-4 4M19 12H9', grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6', bar: 'M5 20V10M12 20V4M19 20v-7', trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8', flag: 'M5 21V4M5 5h12l-2 4 2 4H5',
  };
  K.ico = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${n === 'star' ? '' : ''}<path d="${P[n] || P.info}"/></svg>`;
  K.icof = n => `<svg class="i f" viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n]}"/></svg>`;
  K.logo = (dark) => `<svg viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="10" fill="${dark ? '#fff' : 'var(--ink)'}"/><path d="M11.5 8.5v17" stroke="${dark ? '#0B0F2E' : 'var(--bg)'}" stroke-width="3" stroke-linecap="round"/><path d="M12 18.5 22.5 8.5" stroke="#E8A317" stroke-width="3" stroke-linecap="round"/><path d="M16 17.5l6.5 8" stroke="${dark ? '#0B0F2E' : 'var(--bg)'}" stroke-width="3" stroke-linecap="round"/></svg>`;
  K.brand = (href, dark) => `<a class="logo" href="${href}" ${dark ? 'style="color:#fff"' : ''}>${K.logo(dark)}<span><b>Kosha</b> <i ${dark ? 'style="color:#7FD8E0"' : ''}>Wealth</i></span></a>`;

  /* ---------- finance maths ---------- */
  K.sipFV = (p, y, r) => { const i = r / 1200, n = Math.round(y * 12); return i === 0 ? p * n : p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) };
  K.need = (fv, y, r = 12) => fv / K.sipFV(1, y, r);

  /* ---------- toast ---------- */
  K.toast = m => { const t = $('#toast'); t.innerHTML = K.ico('check') + K.esc(m); t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2800) };
  document.addEventListener('click', e => { const t = e.target.closest('[data-toast]'); if (t) K.toast(t.dataset.toast) });

  /* ---------- theme ---------- */
  const R = document.documentElement;
  K.theme = t => { R.dataset.theme = t; $$('.theme').forEach(b => { b.innerHTML = K.ico(t === 'dark' ? 'sun' : 'moon'); const l = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'; b.setAttribute('aria-label', l); b.title = l }); try { localStorage.setItem('kw4', t) } catch (e) { } K.rerenderCharts && K.rerenderCharts() };
  document.addEventListener('click', e => { if (e.target.closest('.theme')) K.theme(R.dataset.theme === 'dark' ? 'light' : 'dark') });

  /* ---------- sparkline / donut / ring ---------- */
  K.spark = (d, o = {}) => {
    const w = o.w || 96, h = o.h || 32, mn = Math.min(...d), mx = Math.max(...d), c = o.c || (d[d.length - 1] >= d[0] ? 'var(--up)' : 'var(--down)');
    const pts = d.map((v, i) => [i / (d.length - 1) * w, h - 3 - (v - mn) / (mx - mn || 1) * (h - 6)]);
    const l = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${o.fill ? `<path d="${l} L${w} ${h} L0 ${h}Z" fill="${c}" opacity=".12"/>` : ''}<path d="${l}" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };
  K.donut = (segs, o = {}) => {
    const s = o.size || 180, t = o.thick || 22, r = (s - t) / 2, C = 2 * Math.PI * r, tot = segs.reduce((a, x) => a + x[1], 0) || 1; let off = 0;
    const gap = o.gap ?? 3;
    return `<svg class="donut" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" role="img" aria-label="${o.label || 'Allocation chart'}"><circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${o.track || 'var(--rule)'}" stroke-width="${t}" opacity=".5"/>${segs.map(x => { const len = Math.max(0, x[1] / tot * C - gap), el = `<circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${x[2]}" stroke-width="${t}" stroke-linecap="butt" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${s / 2} ${s / 2})"><title>${x[0]} ${x[1]}%</title></circle>`; off += x[1] / tot * C; return el }).join('')}</svg>`;
  };
  K.ring = (p, o = {}) => {
    const s = o.size || 84, t = o.thick || 8, r = (s - t) / 2, C = 2 * Math.PI * r, v = Math.max(0, Math.min(1, p));
    return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" aria-hidden="true"><circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${o.track || 'var(--rule)'}" stroke-width="${t}"/><circle class="rg" cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${o.c || 'var(--teal)'}" stroke-width="${t}" stroke-linecap="round" stroke-dasharray="${(C * v).toFixed(2)} ${C.toFixed(2)}" transform="rotate(-90 ${s / 2} ${s / 2})"/></svg>`;
  };

  /* ---------- interactive line / stacked-area chart ---------- */
  const nice = (max, n = 4) => { const raw = max / n, p = Math.pow(10, Math.floor(Math.log10(raw || 1))), f = raw / p, s = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10; return s * p };
  const charts = new Set();
  K.chart = (el, o) => {
    el.classList.add('chart'); el._o = o; charts.add(el);
    const draw = () => {
      if (!el.isConnected) { charts.delete(el); return }
      if (el._drawn) el.classList.add('st'); el._drawn = true;
      const o = el._o, W = Math.max(280, el.clientWidth || 600), H = o.h || 280, pl = o.noY ? 8 : (o.pl || 56), pr = 14, pt = 16, pb = o.noX ? 8 : 30, n = o.series[0].data.length;
      const stacked = !!o.stack, lay = o.series.map((s, i) => s.data.map((v, k) => stacked ? o.series.slice(0, i + 1).reduce((a, q) => a + q.data[k], 0) : v));
      const all = lay.flat(); let mx = o.ymax ?? Math.max(...all), mn = o.ymin ?? (stacked ? 0 : Math.min(...all));
      if (o.ymin == null && !stacked) { const pad = (mx - mn) * .12 || 1; mn = Math.max(0, mn - pad); mx += pad }
      const step = nice(mx - mn, 4), top = Math.ceil(mx / step) * step, bot = o.ymin ?? (stacked ? 0 : Math.floor(mn / step) * step);
      const X = i => pl + i / (n - 1) * (W - pl - pr), Y = v => pt + (1 - (v - bot) / (top - bot || 1)) * (H - pt - pb);
      let g = '', ticks = ''; for (let v = bot; v <= top + 1e-9; v += step) { const y = Y(v).toFixed(1); g += `<line class="gl" x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}"/>`; if (!o.noY) ticks += `<text x="${pl - 10}" y="${+y + 4}" text-anchor="end">${(o.yfmt || K.short)(v)}</text>` }
      const nx = Math.min(o.xticks || 6, n); let xl = ''; if (!o.noX) for (let k = 0; k < nx; k++) { const i = Math.round(k / (nx - 1) * (n - 1)); xl += `<text x="${X(i).toFixed(1)}" y="${H - 8}" text-anchor="${k === 0 ? 'start' : k === nx - 1 ? 'end' : 'middle'}">${o.x(i)}</text>` }
      let body = '';
      o.series.forEach((s, si) => {
        const up = lay[si], lo = si && stacked ? lay[si - 1] : null;
        const line = up.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ');
        if (s.fill) { const base = lo ? lo.map((v, i) => 'L' + X(n - 1 - i).toFixed(1) + ' ' + Y(lo[n - 1 - i]).toFixed(1)).join(' ') : `L${X(n - 1).toFixed(1)} ${Y(bot).toFixed(1)} L${X(0).toFixed(1)} ${Y(bot).toFixed(1)}`; body += `<path class="fadein" d="${line} ${base} Z" fill="${s.fill}"/>` }
        if (s.line !== false) body += `<path class="ln draw" pathLength="1" d="${line}" stroke="${s.color}" ${s.dash ? `style="stroke-dasharray:${s.dash};animation:none"` : ''}/>`;
      });
      el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" height="${H}" role="img" aria-label="${o.label || 'Chart'}">${g}${ticks}${xl}${body}<line class="cur" y1="${pt}" y2="${H - pb}" stroke="var(--ink)" stroke-opacity=".35" stroke-dasharray="3 4" style="display:none"/>${o.series.map(s => `<circle class="dot" r="5" fill="var(--card)" stroke="${s.color}" stroke-width="2.5" style="display:none"/>`).join('')}<rect class="hit" x="${pl}" y="0" width="${W - pl - pr}" height="${H}" fill="transparent"/></svg><div class="tip"></div>`;
      const svg = el.firstChild, tip = el.lastChild, cur = svg.querySelector('.cur'), dots = [...svg.querySelectorAll('.dot')];
      const move = e => {
        const r = svg.getBoundingClientRect(), cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left, i = Math.max(0, Math.min(n - 1, Math.round((cx - pl) / (W - pl - pr) * (n - 1))));
        cur.setAttribute('x1', X(i)); cur.setAttribute('x2', X(i)); cur.style.display = '';
        dots.forEach((d, si) => { d.setAttribute('cx', X(i)); d.setAttribute('cy', Y(lay[si][i])); d.style.display = '' });
        const fm = o.fmt || K.L; let rows = o.series.map(s => `<div><i style="background:${s.color}"></i>${s.name}: <b style="display:inline;font-size:.82rem;opacity:1">${fm(s.data[i])}</b></div>`).join('');
        if (stacked && o.total) rows += `<div style="margin-top:3px;padding-top:3px;border-top:1px solid rgba(255,255,255,.2)">${o.total}: <b style="display:inline;font-size:.82rem;opacity:1">${fm(lay[lay.length - 1][i])}</b></div>`;
        tip.innerHTML = `<b>${(o.tipx || o.x)(i)}</b>${rows}`; tip.classList.add('on');
        const tw = tip.offsetWidth / 2 + 4, px = Math.max(tw, Math.min(W - tw, X(i))); tip.style.left = px + 'px'; tip.style.top = (Y(lay[lay.length - 1][i]) - 8) + 'px';
      };
      const hit = svg.querySelector('.hit'); hit.addEventListener('mousemove', move); hit.addEventListener('touchmove', move, { passive: true }); hit.addEventListener('touchstart', move, { passive: true });
      hit.addEventListener('mouseleave', () => { cur.style.display = 'none'; dots.forEach(d => d.style.display = 'none'); tip.classList.remove('on') });
    };
    draw(); el._draw = draw;
    if (!el._ro && window.ResizeObserver) { let w = el.clientWidth; el._ro = new ResizeObserver(() => { if (Math.abs(el.clientWidth - w) > 4) { w = el.clientWidth; el._draw() } }); el._ro.observe(el) }
  };
  K.rerenderCharts = () => charts.forEach(c => c.isConnected && c._draw && c._draw());

  /* ---------- avatars (flat, geometric portraits) ---------- */
  const SKIN = ['#F1C9A5', '#E0A982', '#C98B63', '#A8683F', '#EBBE98', '#8A5330'], HAIR = ['#1B1B2F', '#3B2417', '#6B4A2B', '#C9C9D6', '#12122A', '#5A3320'], BG = ['#FBEED0', '#DCEEEE', '#E9E7FB', '#FBE4DC', '#DDF1E6', '#E7EAF4'], SHIRT = ['#10143A', '#0A6F78', '#E8A317', '#6B63D8', '#D9573B', '#232A73'];
  K.avatar = (i, o = {}) => {
    const s = o.size || 64, sk = SKIN[i % 6], hr = HAIR[(i * 5 + 1) % 6], bg = BG[i % 6], sh = SHIRT[(i * 3 + 2) % 6], style = (o.hair ?? i) % 4, fem = o.f ?? (i % 2 === 1);
    const hair = fem ? (style % 2 ? `<path d="M20 30c0-11 6-17 12-17s12 6 12 17c0 8-1 14-3 20h-4c3-8 2-14 0-17-4 3-9 4-17 3-1 5 0 11 1 14h-4c-1-6-2-12 3-20z" fill="${hr}"/>` : `<path d="M20 31c0-11 5-17 12-17s12 6 12 17v3c-3-6-6-9-12-9s-9 3-12 9z" fill="${hr}"/><path d="M19 30c-2 10 0 18 3 22l3-1c-3-6-4-14-3-21zM45 30c2 10 0 18-3 22l-3-1c3-6 4-14 3-21z" fill="${hr}"/>`) : (style % 2 ? `<path d="M21 30c0-9 4-15 11-15s11 6 11 15c-2-5-5-8-11-8s-9 3-11 8z" fill="${hr}"/>` : `<path d="M21 28c1-9 5-13 11-13s10 4 11 13c-3-3-6-4-11-4s-8 1-11 4z" fill="${hr}"/>`);
    return `<svg viewBox="0 0 64 64" width="${s}" height="${s}" role="img" aria-label="${o.alt || 'Portrait illustration'}" style="border-radius:${o.sq ? '18px' : '50%'};background:${bg};flex:none"><path d="M6 64c0-13 11-20 26-20s26 7 26 20z" fill="${sh}"/><path d="M27 42h10v7c0 2-2 4-5 4s-5-2-5-4z" fill="${sk}"/><ellipse cx="32" cy="31" rx="11" ry="13" fill="${sk}"/>${hair}${fem ? '' : ''}<circle cx="27.5" cy="32" r="1.2" fill="#2B1B12"/><circle cx="36.5" cy="32" r="1.2" fill="#2B1B12"/><path d="M28.5 38.5q3.5 2.5 7 0" stroke="#7A3E2A" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
  };

  /* ---------- motion: reveal + count-up ---------- */
  const fmtN = (v, el) => { const d = +el.dataset.dec || 0, f = el.dataset.fmt, x = d ? v.toFixed(d) : Math.round(v); return (el.dataset.pre || '') + (f === 'in' ? Math.round(v).toLocaleString('en-IN') : (d ? x : Number(x).toLocaleString('en-IN'))) + (el.dataset.suf || '') };
  const count = el => { const to = +el.dataset.count, t0 = performance.now(), dur = matchMedia('(prefers-reduced-motion:reduce)').matches ? 1 : 1700; const tick = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmtN(to * e, el); if (k < 1) requestAnimationFrame(tick) }; requestAnimationFrame(tick) };
  let io; try { io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.dataset.count != null && !e.target._c) { e.target._c = 1; count(e.target) } io.unobserve(e.target) } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' }) } catch (e) { }
  K.observe = (root = document) => {
    $$('[data-r],[data-count]', root).forEach(el => {
      if (el.dataset.count != null) el.textContent = fmtN(0, el);
      if (io) io.observe(el); else { el.classList.add('in'); if (el.dataset.count != null) el.textContent = fmtN(+el.dataset.count, el) }
    });
    /* safety: if nothing fires (print, odd viewers) reveal everything after a moment */
    setTimeout(() => $$('[data-r]:not(.in)', root).forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in') }), 1400);
  };
  /* slider fill sync */
  K.fill = r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%');
  document.addEventListener('input', e => { if (e.target.type === 'range') K.fill(e.target) });
  K.fillAll = root => $$('input[type=range]', root).forEach(K.fill);
})(window.K);

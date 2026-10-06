/* Kosha Wealth — public shell (header, footer) + home page */
(function (K) {
  const { $, $$, ico, inr, L, pc, F } = K;
  K.pages = K.pages || {};

  /* ---------- header ---------- */
  const NAVMAP = { 'mutual-funds': 0, 'fixed-income': 0, goals: 1, calculators: 2, research: 3, about: 4, pricing: 4, contact: 4 };
  K.buildShell = () => {
    $('#util').innerHTML = `<div class="w"><div class="l"><span class="dotg"></span>AMFI-registered Mutual Fund Distributor · ARN-XXXXX</div><div class="r"><a href="#/about/grievance">Investor charter</a><a href="#/contact">Help centre</a><a href="tel:1800XXXXXXX">1800 XXX XXXX</a></div></div>`;
    $('#ph').innerHTML = `<div class="w">${K.brand('#/')}
      <nav aria-label="Main"><ul class="pnav" id="pnav">${K.NAV.map((n, i) => `<li data-i="${i}"><button aria-expanded="false" aria-haspopup="true">${n.k}${ico('chev')}</button><div class="mega" role="menu">${n.cols.map(c => `<div class="mcol"><h6>${c.h}</h6>${c.items.map(it => `<a class="mi" role="menuitem" href="${it[3]}"><span class="ic">${ico(it[2])}</span><span><b>${it[0]}</b><small>${it[1]}</small></span></a>`).join('')}</div>`).join('')}<div class="mfeat"><span class="ic">${ico(n.feat.ic)}</span><h4>${n.feat.t}</h4><p>${n.feat.d}</p>${n.feat.login ? `<button class="b b-gold b-sm" data-login>${n.feat.cta}${ico('arrow', 'go')}</button>` : `<a class="b b-gold b-sm" href="${n.feat.h}">${n.feat.cta}${ico('arrow', 'go')}</a>`}</div></div></li>`).join('')}</ul></nav>
      <div class="pact"><button class="ib theme" aria-label="Switch to dark mode"></button><button class="login" data-login>Log in</button><button class="b b-ink hide-s" data-login>Open an account</button><button class="ib burger" id="burger" aria-label="Open menu">${ico('menu')}</button></div></div>`;
    $('#mnav').innerHTML = `<div class="top">${K.brand('#/')}<button class="ib" id="mclose" aria-label="Close menu">${ico('x')}</button></div>${K.NAV.map(n => `<details><summary>${n.k}</summary>${n.cols.flatMap(c => c.items).map(it => `<a href="${it[3]}"><b>${it[0]}</b> <span class="xs">· ${it[1]}</span></a>`).join('')}<div style="height:12px"></div></details>`).join('')}<div class="bt"><button class="b b-go b-lg" data-login>Open an account</button><button class="b b-line b-lg" data-login>Log in</button></div>`;
    $('#pf').innerHTML = footer();
    /* mega behaviour */
    const nav = $('#pnav'); let t;
    const close = () => { $$('#pnav>li.open').forEach(l => { l.classList.remove('open'); l.firstChild.setAttribute('aria-expanded', 'false') }); $('#mscrim').classList.remove('show') };
    const open = li => { close(); li.classList.add('open'); li.firstChild.setAttribute('aria-expanded', 'true'); $('#mscrim').classList.add('show') };
    K.closeMega = close;
    $$('#pnav>li').forEach(li => {
      li.addEventListener('mouseenter', () => { clearTimeout(t); if (matchMedia('(hover:hover)').matches) open(li) });
      li.addEventListener('mouseleave', () => { t = setTimeout(close, 160) });
      li.firstChild.addEventListener('click', e => { e.stopPropagation(); li.classList.contains('open') ? close() : open(li) });
    });
    $('#mscrim').onclick = close; nav.addEventListener('click', e => { if (e.target.closest('a')) close() });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close() });
    $('#burger').onclick = () => $('#mnav').classList.add('show'); $('#mclose').onclick = () => $('#mnav').classList.remove('show');
    $('#mnav').addEventListener('click', e => { if (e.target.closest('a')) $('#mnav').classList.remove('show') });
    addEventListener('scroll', () => $('#ph').classList.toggle('sc', scrollY > 8), { passive: true });
  };
  K.markNav = path => { const k = NAVMAP[path.split('/')[1]]; $$('#pnav>li>button').forEach((b, i) => b.classList.toggle('on', i === k)) };

  function footer() {
    const col = (h, items) => `<div><h4>${h}</h4><ul>${items.map(i => `<li><a href="${i[1]}">${i[0]}</a></li>`).join('')}</ul></div>`;
    return `<div class="wm" aria-hidden="true">Kosha</div><div class="w"><div class="pf-top">
      <div>${K.brand('#/', true)}<p style="margin-top:18px;max-width:36ch;color:#B9BDE0">Mutual fund advisory for families who would rather have a plan than a tip. Based in Chennai, investing across India.</p>
        <form class="nl" data-nl><input type="email" placeholder="Your email" aria-label="Email address" required><button class="b b-gold b-sm">Subscribe</button></form>
        <div class="pf-contact"><span>hello@koshawealth.in</span><span>1800 XXX XXXX · Mon–Sat, 9am–7pm</span></div>
        <div class="pf-soc"><a href="#/" aria-label="LinkedIn">${ico('link')}</a><a href="#/" aria-label="YouTube">${ico('play')}</a><a href="#/" aria-label="Email">${ico('mail')}</a></div></div>
      ${col('Invest', [['Mutual funds', '#/mutual-funds'], ['Bonds and deposits', '#/fixed-income'], ['NPS', '#/fixed-income/nps'], ['Insurance', '#/fixed-income/insurance'], ['Kosha Select', '#/mutual-funds/select']])}
      ${col('Plan and tools', [['Goal planner', '#/goals'], ['SIP calculator', '#/calculators/sip'], ['Retirement', '#/calculators/retire'], ['Tax saving', '#/calculators/tax'], ['All calculators', '#/calculators']])}
      ${col('Company', [['About us', '#/about'], ['How we earn', '#/pricing'], ['Research', '#/research'], ['Careers', '#/about/careers'], ['Contact', '#/contact']])}
      ${col('Investor support', [['Help and FAQs', '#/contact'], ['Security', '#/about/security'], ['Grievance redressal', '#/about/grievance'], ['Investor charter', '#/about/grievance'], ['Privacy and terms', '#/about']])}
    </div><div class="pf-legal"><p>[Company legal name] Private Limited, AMFI-registered Mutual Fund Distributor, ARN-XXXXX, valid till DD/MM/YYYY. CIN XXXXXXXXXXXXXXXXXXXXX. Registered office: [address], Chennai, Tamil Nadu.</p><p>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Past performance does not indicate future returns. Bonds are offered through a SEBI-registered Online Bond Platform Provider partner.</p><p>This is a demonstration website. Fund names, figures, people and reviews are illustrative placeholders. © 2026 Kosha Wealth.</p></div></div>`;
  }

  /* ---------- shared pieces ---------- */
  K.mobForm = (cta = 'Start free') => `<form class="mob" data-mob><span>+91</span><input inputmode="tel" maxlength="10" placeholder="10-digit mobile number" aria-label="Mobile number"><button class="b b-go">${cta}${ico('arrow', 'go')}</button></form>`;
  K.stars = n => `<span class="stars" aria-label="${n} stars">${'★★★★★'.split('').map(() => ico('star', 'f')).join('')}</span>`;
  K.qr = () => { let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647, N = 25; let d = ''; const fin = (x, y) => `<path d="M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5z" fill="#10143A" fill-rule="evenodd"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#10143A"/>`; for (let y = 0; y < N; y++)for (let x = 0; x < N; x++) { if ((x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)) continue; if (r() > .52) d += `M${x} ${y}h1v1h-1z` } return `<svg viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges" role="img" aria-label="QR code placeholder"><path d="${d}" fill="#10143A"/>${fin(0, 0)}${fin(N - 7, 0)}${fin(0, N - 7)}</svg>` };

  /* ---------- goal planner (home + goals page) ---------- */
  const RET = [12, 14, 7, 8];
  K.plannerHTML = (id = 'gp') => `<div class="gp" id="${id}"><div class="gp-tabs" role="tablist" aria-label="Choose a goal">${K.GOALS.map((g, i) => `<button role="tab" data-g="${g.id}" style="--c:${g.color}" aria-selected="${i === 0}"><span class="ic">${ico(g.icon)}</span>${g.short}</button>`).join('')}</div><div class="gp-b"><div class="gp-l"></div><div class="gp-r"></div></div></div>`;
  K.wirePlanner = (start, id = 'gp') => {
    const root = $('#' + id); if (!root) return; let g = K.GOALS.find(x => x.id === start) || K.GOALS[0], cost = g.cost, yrs = g.yrs;
    const ret = g => g.mix.reduce((s, m, i) => s + m * RET[i], 0) / 100, yr0 = new Date().getFullYear();
    const calc = () => { const r = ret(g), fv = cost * 1e5 * Math.pow(1 + g.infl / 100, yrs), s = K.need(fv, yrs, r); return { r, fv, s } };
    const paint = () => {
      root.querySelectorAll('.gp-tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.g === g.id));
      const gl = root.querySelector('.gp-l'), gr = root.querySelector('.gp-r'), eq = g.mix[0] + g.mix[1], gold = g.mix[3];
      const lv = yrs < 4 ? [.6, .4, .2, 0] : [1, .85, .45, .1], cols = [['Start', lv[0]], ['Midway', lv[1]], ['3 years out', lv[2]], ['Goal year', lv[3]]];
      gl.innerHTML = `<span class="eyebrow" style="color:${g.color}">${g.short}</span><h3 style="margin-top:14px">${g.name}</h3><p class="d">${g.desc}</p>
        <div class="sl"><div class="top"><label for="gpc">It costs about, today</label><span class="val n"><span id="gpcv"></span></span></div><input type="range" id="gpc" min="1" max="${Math.max(500, g.cost * 3)}" step="1" value="${cost}"></div>
        <div class="sl"><div class="top"><label for="gpy">And I need it in</label><span class="val n"><span id="gpyv"></span></span></div><input type="range" id="gpy" min="1" max="35" value="${yrs}"></div>
        <div class="gp-out"><div class="k">Invest each month</div><div class="big n"><span id="gps"></span><small>/ month</small></div>
        <div class="row n"><div>Cost then, after ${g.infl}% yearly inflation<b id="gpf"></b></div><div>You put in<b id="gpi"></b></div><div>Growth does<b id="gpg"></b></div></div></div>
        <div class="gp-act"><button class="b b-go" data-login>Start this plan${ico('arrow', 'go')}</button><a class="b b-line" href="#/contact">Talk to an advisor</a></div>`;
      gr.innerHTML = `<div><h4>Your path to the goal</h4><div id="gpch"></div><div class="legend" style="margin-top:12px"><span><i style="background:var(--teal)"></i>Your SIP, growing</span><span><i style="background:var(--gold)"></i>What the goal will cost</span></div></div>
        <div><h4>How we would invest it, and when we de-risk</h4><div class="gl4">${cols.map(c => { const e = Math.round(eq * c[1]), d = 100 - e - gold; return `<div><div class="stk"><i style="height:${e}%;background:${K.MIXC[1][1]}"></i><i style="height:${d}%;background:#9AA1D8"></i><i style="height:${gold}%;background:var(--gold)"></i></div><small>${c[0]}<br><b class="n">${e}% equity</b></small></div>` }).join('')}</div></div>
        <div class="gp-adv">${g.adv.map(a => `<div>${ico('check')}<span>${a}</span></div>`).join('')}</div>`;
      sync(); K.fillAll(gl);
      gl.querySelector('#gpc').oninput = e => { cost = +e.target.value; sync() }; gl.querySelector('#gpy').oninput = e => { yrs = +e.target.value; sync() };
    };
    const sync = () => {
      const { r, fv, s } = calc(), q = x => root.querySelector(x); q('#gpcv').textContent = L(cost * 1e5); q('#gpyv').textContent = yrs + (yrs > 1 ? ' years' : ' year');
      q('#gps').textContent = inr(s); q('#gpf').textContent = L(fv); q('#gpi').textContent = L(s * yrs * 12); q('#gpg').textContent = L(fv - s * yrs * 12);
      const n = yrs * 12 + 1, sip = [], tgt = []; for (let i = 0; i < n; i++) { sip.push(i ? K.sipFV(s, i / 12, r) : 0); tgt.push(cost * 1e5 * Math.pow(1 + g.infl / 100, i / 12)) }
      K.chart(q('#gpch'), { h: 250, series: [{ name: 'Your SIP', data: sip, color: 'var(--teal)', fill: 'color-mix(in srgb,var(--teal) 14%,transparent)' }, { name: 'Goal cost', data: tgt, color: 'var(--gold)', dash: '6 6' }], x: i => i === 0 ? 'Today' : yr0 + Math.round(i / 12), tipx: i => 'Year ' + (i / 12).toFixed(1), yfmt: K.short, fmt: K.L, ymin: 0, xticks: 5 });
    };
    root.querySelector('.gp-tabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; g = K.GOALS.find(x => x.id === b.dataset.g); cost = g.cost; yrs = g.yrs; paint() };
    paint();
  };

  /* ---------- hero data ---------- */
  const heroSeries = (() => { const o = []; let v = 4.2e5; for (let m = 0; m < 48; m++) { v = v * (1 + .0095 + Math.sin(m * .9) * .011) + 14000; o.push(v) } return o })();

  /* ---------- product stage ---------- */
  const lg = (t, c) => `<span class="lg" style="background:${c}">${t}</span>`;
  const PRODS = [
    { k: 'Mutual funds', s: '1,500+ funds from 40+ fund houses, or eight we would buy ourselves.', bg: 'var(--teal-soft)', c: 'var(--teal)', h: 'Pick from 1,500 funds, or start with eight.', facts: [['SIP from', '₹500'], ['Funds', '1,500+'], ['Money back in', '1–3 days']], href: '#/mutual-funds', cta: 'Explore mutual funds',
      vis: () => { const rows = K.SEL.slice(0, 3).map(i => F[i - 1]); return `<div class="mini">${rows.map((f, i) => `<div class="frow">${lg(f.amc[0], ['#0A6F78', '#232A73', '#D9573B'][i])}<span><b>${f.name}</b><small>${f.cat} · ${f.sub}</small></span><span class="sp">${K.spark(K.sparkFor(f), { w: 74, h: 28 })}</span><span class="rt n">+${f.r3.toFixed(1)}%<small>3 yr</small></span></div>`).join('')}</div><div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><span class="pill gold">${ico('award')} Kosha Select</span><span class="pill">Rated 4 and 5 stars only</span></div>` } },
    { k: 'SIP and step-up', s: 'Invest every month, raise it every year, and never think about timing.', bg: 'var(--gold-soft)', c: 'var(--gold-2)', h: 'A date in the calendar, and a bank that remembers.', facts: [['Set up in', '5 minutes'], ['Step-up', 'Yearly, 5–25%'], ['Pause', 'Any time']], href: '#/mutual-funds/sip', cta: 'See how SIPs work',
      vis: () => `<div class="mini"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px"><div><small class="muted">Monthly SIP</small><div class="serif n" style="font-size:2.4rem;color:var(--ink);line-height:1.1">₹10,000</div></div><span class="pill up">${ico('refresh')} Step-up 10% yearly</span></div><div class="cal">${['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => `<div class="ok">${m}</div>`).join('')}${['Oct'].map(m => `<div class="nx">${m}</div>`).join('')}${['Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map(m => `<div>${m}</div>`).join('')}</div><p class="sm muted" style="margin-top:14px">Next debit: <b style="color:var(--ink)">5 October</b>, from HDFC Bank ••6549</p></div>` },
    { k: 'Bonds', s: 'Listed bonds with fixed interest, sorted by rating, yield and run.', bg: 'var(--violet-soft)', c: 'var(--violet)', h: 'Fixed interest, in the order that suits you.', facts: [['Yields up to', '11.4%'], ['From', '₹10,000'], ['Interest', 'Monthly']], href: '#/fixed-income', cta: 'Browse bonds',
      vis: () => `<div class="mini"><div class="ladder">${[['1 year', 8.4, '#2FB6C1'], ['2 years', 9.6, '#1FA0AC'], ['3 years', 10.2, '#0A8D99'], ['5 years', 10.9, '#0A6F78'], ['7 years', 11.4, '#07565D']].map(r => `<div class="rg"><span>${r[0]}</span><i data-w="${r[1] / 12 * 100}" style="background:${r[2]}"></i><b class="n">${r[1]}%</b></div>`).join('')}</div><div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap"><span class="pill violet">AAA to A</span><span class="pill">Secured only</span><span class="pill">NSE and BSE listed</span></div></div>` },
    { k: 'Fixed deposits', s: 'Rated company deposits, with interest monthly, quarterly or at maturity.', bg: 'var(--rose-soft)', c: 'var(--rose)', h: 'Know your maturity amount on day one.', facts: [['Rates up to', '8.5%'], ['Issuers', 'AA and above'], ['Tenures', '1–5 years']], href: '#/fixed-income', cta: 'See deposit rates',
      vis: () => `<div class="mini" style="text-align:center;padding:30px 20px"><small class="muted">Rated deposit, 3 years</small><div class="big-rate n">8.5<small>% a year</small></div><div class="chips" style="justify-content:center;margin:18px 0"><span class="chip">1 yr</span><span class="chip">2 yr</span><span class="chip on">3 yr</span><span class="chip">5 yr</span></div><p class="sm muted">₹5,00,000 becomes <b style="color:var(--ink)">₹6,40,900</b> on 3 July 2029</p></div>` },
    { k: 'NPS', s: 'Retirement savings with an extra ₹50,000 deduction beyond 80C.', bg: 'var(--up-soft)', c: 'var(--up)', h: 'Retire on your terms, and save tax on the way.', facts: [['Extra deduction', '₹50,000'], ['Start from', '₹1,000'], ['Cost', 'Lowest in India']], href: '#/fixed-income/nps', cta: 'Learn about NPS',
      vis: () => `<div class="mini"><small class="muted">Tax-saving room each year</small><div class="taxbar" style="margin:14px 0"><div style="flex:3;background:var(--teal)">80C · ₹1.5 L</div><div style="flex:1;background:var(--gold);color:#2A1C00">NPS · ₹50 K</div></div><div style="display:flex;justify-content:space-between;align-items:baseline"><span class="sm muted">Extra tax saved at 30% slab</span><b class="serif n" style="font-size:1.8rem;color:var(--up)">₹15,600</b></div></div>` },
    { k: 'Insurance', s: 'Term life and health cover, so a crisis never forces you to sell.', bg: 'var(--cream-2)', c: 'var(--ink)', h: 'So a bad year never has to touch the plan.', facts: [['Term cover', '₹1 Cr+'], ['Premium from', '₹750 / mo'], ['Claims', 'We stay with you']], href: '#/fixed-income/insurance', cta: 'Get a quote',
      vis: () => `<div class="mini"><div style="display:flex;gap:16px;align-items:center;margin-bottom:18px"><span class="ic" style="width:56px;height:56px;border-radius:18px;background:var(--ink);color:var(--bg);display:grid;place-items:center">${ico('shield')}</span><div><small class="muted">Term cover for a 32-year-old</small><div class="serif n" style="font-size:2rem;color:var(--ink);line-height:1.1">₹1 Crore <span class="sm muted" style="font-family:var(--sans)">till age 60</span></div></div></div><div class="frow" style="grid-template-columns:1fr auto"><b>Premium</b><span class="n"><b>₹ 760</b> <small>a month</small></span></div><div class="frow" style="grid-template-columns:1fr auto"><b>Claim settlement</b><span class="n"><b>98.4%</b></span></div></div>` }
  ];

  /* ---------- pieces of the home page ---------- */
  const marqueeNames = ['Arya Mutual Fund', 'Bharat AMC', 'Kaveri Asset Management', 'Meridian Funds', 'Sahyadri Investments', 'Vistara Mutual Fund', 'Nilgiri Capital', 'Palar Finance'];
  const readsHome = () => { const a = K.ARTICLES; return `<div class="rs"><a class="rfeat" href="#/research/read/${a[0].id}" data-r><div class="art"><svg viewBox="0 0 600 300" preserveAspectRatio="none"><defs><linearGradient id="rg1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#38C2CE" stop-opacity=".45"/><stop offset="1" stop-color="#38C2CE" stop-opacity="0"/></linearGradient></defs><path d="M0 200 C60 190 90 120 140 150 S220 230 270 160 340 60 400 110 470 190 520 90 580 40 600 30 V300 H0Z" fill="url(#rg1)"/><path d="M0 200 C60 190 90 120 140 150 S220 230 270 160 340 60 400 110 470 190 520 90 580 40 600 30" fill="none" stroke="#E8A317" stroke-width="3"/><path d="M0 240 L600 120" stroke="#8C93C4" stroke-dasharray="6 7" opacity=".6"/></svg></div><span class="pill gold tag">${a[0].cat}</span><h3>${a[0].title}</h3><p>${a[0].dek}</p><div class="m">${a[0].date} · ${a[0].mins} minute read</div></a>
    <div data-r style="--d:.1s"><div class="pulse n">${[['Nifty 50', '24,812', '−0.6%', 0], ['Sensex', '81,340', '−0.5%', 0], ['Gold, 10 g', '₹1,02,430', '+0.8%', 1], ['10-yr G-sec', '6.84%', '+2 bps', 1]].map(p => `<div><small>${p[0]}</small><b>${p[1]}</b><span class="${p[3] ? 'up' : 'dn'}">${p[2]}</span></div>`).join('')}</div><div class="rl">${a.slice(1, 5).map(r => { const [d, m] = r.date.split(' '); return `<a href="#/research/read/${r.id}"><span class="dt"><b>${d}</b><small>${m.slice(0, 3)}</small></span><span><span class="k">${r.cat}</span><h4>${r.title}</h4><span class="mm">${r.mins} minute read</span></span></a>` }).join('')}</div><a class="lnk" href="#/research" style="margin-top:24px">All research ${ico('arrow')}</a></div></div>` };

  K.pages['/'] = () => {
    const h = `
<section class="hero"><div class="w">
  <div><a class="hpill" href="#/goals" data-r><b>New</b>Plan by goal, invest by SIP ${ico('arrow')}</a>
  <h1 data-r style="--d:.05s">Give every rupee a <em>reason</em>.</h1>
  <p class="lede" data-r style="--d:.12s">Tell us what you are saving for. A named advisor turns it into a mutual fund plan for each goal, and stays on the line when markets get loud.</p>
  <div data-r style="--d:.2s">${K.mobForm('Start free')}<div class="hnote"><span>${ico('check')}Paperless KYC in 10 minutes</span><span>${ico('check')}No account fees to begin</span></div></div>
  <div class="proof" data-r style="--d:.28s"><div class="stack">${[0, 1, 2, 3].map(i => K.avatar(i + 3, { size: 44 })).join('')}</div><div class="t"><b>62,000+ families</b>planning with a named advisor</div><span class="sep"></span><div class="t">${K.stars(5)}<br><b class="n" style="display:inline">4.8</b> on app stores</div></div></div>
  <div class="hv" id="hv" aria-hidden="true">
    <div class="coin">₹</div>
    <div class="hcard main"><div class="top"><span class="lab">Your portfolio</span><span class="pill up">${ico('trend')} +24.1%</span></div><div class="big n">₹12,48,300</div><div class="gain up n">+₹2,41,800 since you started</div><div class="hch" id="hch"></div></div>
    <div class="hcard goal"><span class="ringv">${K.ring(.62, { size: 62, thick: 7, c: 'var(--gold)' })}<div>62%</div></span><span><b>Aarav’s college</b><small>On track for 2034</small></span></div>
    <div class="hcard sip"><span class="ck">${ico('check')}</span><span><b>SIP of ₹10,000 done</b><small>Debited 5 Nov · Arya Flexi Cap</small></span></div>
    <div class="hcard chat">${K.avatar(1, { size: 38 })}<div><b>Priya, your advisor</b><p>Markets are down 4%. Your plan has not changed, so no action is needed.</p></div></div>
  </div>
</div></section>

<section class="band dark"><div class="w"><div class="stats">
  <div class="stat" data-r><div class="num n"><span data-count="4200" data-pre="₹">0</span><small>Cr</small></div><p>of family wealth advised across India</p></div>
  <div class="stat" data-r style="--d:.08s"><div class="num n"><span data-count="62" data-suf="K+">0</span></div><p>families with a plan and a named advisor</p></div>
  <div class="stat" data-r style="--d:.16s"><div class="num n"><span data-count="98" data-suf="%">0</span></div><p>of calls answered within three rings</p></div>
  <div class="stat" data-r style="--d:.24s"><div class="num n"><span data-count="14">0</span><small>yrs</small></div><p>of advising through every kind of market</p></div></div></div>
  <div class="marq" aria-hidden="true"><div class="track">${[0, 1].map(() => marqueeNames.map(n => `<span>${n}</span>`).join('')).join('')}</div></div></section>

<section class="sec"><div class="w"><div class="prod">
  <div><span class="eyebrow">What you can invest in</span><h2 style="margin:18px 0 0" data-r>One account. <em>Every</em> way to grow money.</h2><div class="ptab" id="ptab" role="tablist" aria-orientation="vertical">${PRODS.map((p, i) => `<button role="tab" data-p="${i}" aria-selected="${i === 0}"><span class="no">0${i + 1}</span><span><b>${p.k}</b><small>${p.s}</small></span>${ico('arrow')}</button>`).join('')}</div></div>
  <div class="stage" id="stage" data-r="rt"></div></div></div></section>

<section class="sec cream" style="padding-top:112px"><div class="w">
  <div class="shead c"><span class="eyebrow">Plan a goal</span><h2 data-r>Start with what <em>matters</em> to you.</h2><p class="lede" data-r>Each goal gets its own portfolio, its own monthly amount and its own mix of funds. Move the sliders and watch the plan rewrite itself.</p></div>
  <div data-r="s">${K.plannerHTML()}</div></div></section>

<section class="sec"><div class="w"><div class="how">
  <div class="how-l"><span class="eyebrow">How it works</span><h2 style="margin:18px 0 22px" data-r>From first call to <em>quarterly review</em>.</h2><p class="lede" data-r>Picking a fund takes a minute. Staying invested through a bad year is the hard part, and that is what the advisor is for.</p><a class="b b-ink" href="#/contact">Book a 30-minute call${ico('arrow', 'go')}</a><div class="how-pr" id="hp"><i class="on"></i><i></i><i></i><i></i></div></div>
  <div id="steps">
   <div class="step" data-r><span class="nm">01</span><div><div class="when">Week one</div><h3>We talk about your goals</h3><p>A 30-minute call about what you are saving for, when you will need it, and how you would feel if markets fell by a fifth.</p><div class="vg slots"><span>Mon 10:30</span><span class="on">Tue 4:00</span><span>Wed 11:00</span><span>Sat 9:30</span></div></div></div>
   <div class="step" data-r><span class="nm">02</span><div><div class="when">Within two days</div><h3>You get a written plan</h3><p>Funds and a monthly amount for every goal, with the reasoning spelled out so you can question any of it.</p><div class="vg doc"><div class="hd"><span>Your plan · Karthik R.</span><span style="color:var(--teal)">3 goals</span></div><div class="ln" style="width:92%"></div><div class="ln" style="width:78%"></div><div class="ln g"></div><div class="ln" style="width:64%"></div></div></div></div>
   <div class="step" data-r><span class="nm">03</span><div><div class="when">Ten minutes</div><h3>You invest, online</h3><p>Paperless KYC with Aadhaar and PAN, add your bank, and your SIPs start on the date you choose. Nothing moves until you say so.</p><div class="vg chk"><div><span class="ck">${ico('check')}</span>PAN and Aadhaar via DigiLocker</div><div><span class="ck">${ico('check')}</span>Selfie and signature</div><div class="pend"><span class="ck">${ico('clock')}</span>Autopay for your SIP</div></div></div></div>
   <div class="step" data-r><span class="nm">04</span><div><div class="when">Every quarter</div><h3>We review it together</h3><p>We check each goal against its target and tell you if anything needs to change, and why. Most quarters the answer is nothing.</p><div class="vg score">${[['College', .62, 'var(--gold)'], ['Home', .41, 'var(--teal)'], ['Retire', .18, 'var(--violet)']].map(s => `<div><span class="ringv">${K.ring(s[1], { size: 64, thick: 7, c: s[2] })}<div>${Math.round(s[1] * 100)}%</div></span><br>${s[0]}</div>`).join('')}</div></div></div>
  </div></div></div></section>

<section class="sec dark"><div class="w"><div class="tm">
  <div><span class="eyebrow gold">The time machine</span><h2 data-r>What ₹10,000 a month does <em>while you are busy</em>.</h2><p class="lede" data-r>Move the sliders. The gold part is growth you did not have to save for. Then look at what waiting costs.</p>
  <div class="sls" id="tmS"><div class="sl"><div class="top"><label for="tA">Monthly SIP</label><span class="val n" id="tAv"></span></div><input type="range" id="tA" min="1000" max="150000" step="500" value="10000"></div><div class="sl"><div class="top"><label for="tY">For how long</label><span class="val n" id="tYv"></span></div><input type="range" id="tY" min="3" max="40" value="20"></div><div class="sl"><div class="top"><label for="tR">Expected yearly return</label><span class="val n" id="tRv"></span></div><input type="range" id="tR" min="6" max="18" step=".5" value="12"></div></div></div>
  <div class="tm-out" data-r="rt"><div class="lab">After <span id="tY2"></span>, you could have</div><div class="val n" id="tV"></div><div id="tCh"></div><div class="tm-chips n"><div>You invest<b id="tI"></b></div><div>Growth<b id="tG"></b></div><div>Money multiplies<b id="tM"></b></div></div><div class="tm-late" id="tLate"></div></div>
</div></div></section>

<section class="sec cream"><div class="w"><div class="rd">
  <div><span class="eyebrow">Asset allocation</span><h2 style="margin:18px 0 20px" data-r>Spread out, <em>on purpose</em>.</h2><p class="lede" data-r style="margin-bottom:34px">Drag the dial to see how a portfolio changes as you take more risk, and what that has meant in the worst year of the last twenty.</p>
  <div class="rd-ctl" data-r><div class="sl" style="margin-bottom:0"><div class="top"><label for="rdS">How would you feel in a bad year?</label><span class="val" id="rdN"></span></div><input type="range" id="rdS" min="1" max="5" value="3"><div class="rd-lbls" id="rdL"><span>Cautious</span><span>Careful</span><span>Balanced</span><span>Growth</span><span>Bold</span></div></div>
  <div class="rd-st n"><div>Expected, per year<b id="rdE"></b></div><div class="neg">Worst year in 20<b id="rdW"></b></div><div>Stay invested for<b id="rdH"></b></div></div></div></div>
  <div class="rd-vis" data-r="rt"><span class="ringv" id="rdD"></span><div class="rd-lg n" id="rdG"></div><p class="fine" style="max-width:40ch;text-align:center">Illustrative allocations and historical ranges, not a forecast. Your own mix depends on your goals and your answers to our risk questions.</p></div>
</div></div></section>

<section class="sec"><div class="w"><div class="sel">
  <div><span class="eyebrow">Kosha Select</span><h2 style="margin:18px 0 18px" data-r>1,500 funds in. <em>Eight</em> out.</h2><p class="lede" data-r>Every quarter our research committee puts the whole market through four filters. What survives goes on the list, and what drops off gets a written explanation.</p>
  <div class="funnel" data-r>${[['All funds', '1,512', '#10143A', 100], ['Cost and consistency', '318', '#232A73', 86], ['Manager and process', '64', '#0A6F78', 72], ['Kosha Select', '8', '#E8A317', 58]].map(f => `<div style="background:${f[2]};width:${f[3]}%;${f[2] === '#E8A317' ? 'color:#2A1C00' : ''}"><span>${f[0]}</span><b class="n">${f[1]}</b></div>`).join('')}</div><a class="lnk" href="#/mutual-funds/select">How we choose ${ico('arrow')}</a></div>
  <div class="lb" data-r="rt"><div class="lb-h"><div class="chips" id="lbT">${['Most chosen', 'Best 3 years', 'Tax saving', 'Gold'].map((c, i) => `<button class="chip" data-c="${i}" aria-pressed="${i === 0}">${c}</button>`).join('')}</div><span class="fine">Sample data</span></div><div class="lb-hd"><span>#</span><span>Fund</span><span>Trend</span><span>1 year</span><span>3 years</span><span>5 years</span><span></span></div><div id="lbR"></div></div>
</div></div></section>

<section class="sec advs"><div class="w"><div class="adv">
  <div><div class="phone" data-r="s"><div class="nt"></div><div class="scr"><div class="hd">${K.avatar(1, { size: 40 })}<span><b>Priya Subramanian</b><small>● Online · Your advisor</small></span></div>
   <div class="msgs" id="msgs"><div class="msg u">Markets are down 6%. Should I stop my SIP?<small>10:42</small></div><div class="msg a">Short answer: no. Your daughter’s fund is a 12-year goal, and this is the month your ₹10,000 buys the most units.<div class="card"><span class="pill gold">College fund</span>62% · on track</div><small>10:44</small></div><div class="msg u">Okay. That helps, thank you.<small>10:45</small></div><div class="msg a">Always. I will send the quarterly note on Friday.<small>10:45</small></div></div></div></div></div>
  <div class="adv-r"><span class="eyebrow gold">Your advisor</span><h2 style="margin:18px 0 22px" data-r>A real person, <em>by name</em>.</h2><p class="lede" data-r>Not a call centre, and not a chatbot. One advisor who knows your goals, picks up when you call, and talks you out of mistakes before you make them.</p>
  <div class="adv-st n" data-r><div><b data-count="120">0</b><span>families per advisor, at most</span></div><div><b data-count="38" data-suf=" min">0</b><span>average first response</span></div><div><b>4×</b><span>planned reviews every year</span></div></div>
  <div class="team" data-r>${[['Priya S.', 'CFP · 12 yrs', 1], ['Vikram N.', 'CFA · 9 yrs', 4], ['Anjali R.', 'CFP · 15 yrs', 5], ['Suresh M.', 'NISM · 7 yrs', 2]].map(t => `<span class="tm1">${K.avatar(t[2], { size: 40 })}<span><b>${t[0]}</b>${t[1]}</span></span>`).join('')}</div></div>
</div></div></section>

<section class="sec cream"><div class="w"><div class="vo" id="vo">
  <div class="vo-card" data-r="s"><div class="av" id="voA"></div><div class="big n" id="voB"></div><div class="bl" id="voBL"></div><span class="pill gold gl" id="voG"></span></div>
  <div><span class="eyebrow">In their words</span><blockquote id="voQ" style="margin-top:22px"></blockquote><div class="vo-by"><div><b id="voN"></b><span id="voP"></span></div><div class="vo-nav"><div class="vo-dots" id="voD"></div><button class="ib" id="voPr" aria-label="Previous story">${ico('chevL')}</button><button class="ib" id="voNx" aria-label="Next story">${ico('chevR')}</button></div></div></div>
</div><div class="rt-strip" data-r>${[['4.8', 'App Store · 11,200 ratings'], ['4.7', 'Google Play · 9,800 ratings'], ['4.9', 'Google reviews · 2,300'], ['94%', 'clients who stay 5+ years']].map(r => `<div><b class="n">${r[0]}</b><span>${r[1]}</span></div>`).join('')}</div><p class="fine" style="margin-top:14px;text-align:center">Placeholder reviews and ratings for the demo.</p></div></section>

<section class="sec"><div class="w">
  <div class="shead c"><span class="eyebrow">Your money, your name</span><h2 data-r>Your money <em>never</em> sits with us.</h2><p class="lede" data-r>You pay the fund house directly. Units are credited to a folio in your name. We plan, advise and place orders on your instruction, and nothing more.</p></div>
  <div class="tf" data-r><div class="tf-d"><div class="tf-n"><div class="ic">${ico('bank')}</div><b>Your bank account</b><small>UPI, net banking or autopay</small></div><div class="tf-a"><span>PAYS DIRECTLY</span></div><div class="tf-n"><div class="ic">${ico('building')}</div><b>The fund house</b><small>Regulated by SEBI, audited, ring-fenced</small></div><div class="tf-a"><span>UNITS CREDITED</span></div><div class="tf-n"><div class="ic">${ico('user')}</div><b>A folio in your name</b><small>Visible to you in the registrar’s records</small></div></div>
  <p class="tf-note"><b>Kosha sits beside this line, never in it.</b> We cannot move your money anywhere except back to your own bank account.</p></div>
  <div class="tfacts">${[['shield', 'SEBI and AMFI registered', 'A registered distributor, with a published grievance route and an investor charter.'], ['lock', 'Bank-grade security', 'Encrypted end to end, with OTP on every login and order. Data is never sold.'], ['doc', 'Units in your name', 'If Kosha shut down tomorrow, your investments would be untouched.'], ['scale', 'Escalation ladder', 'Advisor, head of service, then SEBI’s SCORES, with timelines at every step.']].map((f, i) => `<div data-r style="--d:${i * .08}s"><span class="ic">${ico(f[0])}</span><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join('')}</div>
</div></section>

<section class="sec cream"><div class="w"><div class="shead row"><div><span class="eyebrow">From our research desk</span><h2 style="margin-top:18px" data-r>Notes, not <em>noise</em>.</h2></div><p class="lede" data-r>Plain-language notes on markets, tax and money decisions. No predictions, no hot tips, and a note when we change our mind.</p></div>${readsHome()}</div></section>

<section class="sec apps"><div class="w"><div class="app-g">
  <div><span class="eyebrow gold">The app</span><h2 style="margin:18px 0 22px;color:#fff" data-r>Your whole plan, <em>in your pocket</em>.</h2><p class="lede" data-r>Invest, check goals, download statements and message your advisor, from a phone that is already in your hand.</p>
  <div class="app-f" data-r>${[['bolt', 'Invest in under a minute', 'Saved bank, saved plan.'], ['target', 'Goals, not just balances', 'See every goal against its target.'], ['chat', 'Message Priya', 'Replies from a person, not a bot.'], ['lock', 'Face ID and OTP', 'Locked by default.']].map(f => `<div><span class="ic">${ico(f[0])}</span><span><b>${f[1]}</b>${f[2]}</span></div>`).join('')}</div>
  <div class="getapp" data-r><div class="qr">${K.qr()}</div><div class="stores"><button class="store" data-toast="App Store link (demo)">${ico('download')}<span><small>Download on the</small>App Store</span></button><button class="store" data-toast="Google Play link (demo)">${ico('play')}<span><small>Get it on</small>Google Play</span></button></div></div></div>
  <div class="phones" data-r="s"><div class="phone p1"><div class="nt"></div><div class="scr"><div class="ph-hd"><small>Goals</small><b>3 on track</b></div><div class="ph-b">${K.GOALS.slice(0, 4).map((g, i) => `<div class="ph-t"><span><b>${g.short}</b><span>${['62%', '41%', '78%', '100%'][i]} of target</span></span><span class="ringv">${K.ring([.62, .41, .78, 1][i], { size: 38, thick: 5, c: g.color })}</span></div>`).join('')}</div></div></div>
  <div class="phone p2"><div class="nt"></div><div class="scr"><div class="ph-hd"><small>Portfolio value</small><b class="n">₹12,48,300</b><span class="pill up" style="margin-top:6px">+₹2,140 today</span></div><div class="ph-b"><div id="phch"></div>${K.SEL.slice(0, 3).map(i => F[i - 1]).map(f => `<div class="ph-t"><span><b>${f.name.replace(' Fund', '')}</b><span>${f.cat}</span></span><b class="up n">+${f.r3.toFixed(1)}%</b></div>`).join('')}</div></div></div></div>
</div></div></section>

<section class="sec"><div class="w"><div class="fq">
  <div class="fq-l"><span class="eyebrow">Questions</span><h2 style="margin:18px 0 0" data-r>Things people ask <em>before</em> they start.</h2><div class="chips" id="fqC">${['All', ...Object.keys(K.FAQ)].map((c, i) => `<button class="chip" data-c="${c}" aria-pressed="${i === 0}">${c}</button>`).join('')}</div><div class="help"><span class="ic">${ico('phone')}</span><div><b>Still unsure?</b><span>Call 1800 XXX XXXX, or <a href="#/contact" style="color:var(--teal);font-weight:600">book a call</a>.</span></div></div></div>
  <div id="fqL" data-r></div></div></div></section>

<section class="fin"><div class="w"><div class="fin-c" data-r="s"><div><h2>Bring your goals. We will bring the <em>plan</em>.</h2><p>Open an account in ten minutes, or talk to an advisor first. Either way, nothing is sold to you today.</p><div class="or2"><a href="#/contact">Request a call</a><a href="#/pricing">See how we earn</a></div></div><div>${K.mobForm('Get started')}</div></div></div></section>`;

    return {
      h, w() {
        /* hero chart + parallax */
        K.chart($('#hch'), { h: 120, noX: true, noY: true, series: [{ name: 'Value', data: heroSeries, color: 'var(--teal)', fill: 'color-mix(in srgb,var(--teal) 16%,transparent)' }], x: i => 'Month ' + i, ymin: 0, fmt: K.L });
        const hv = $('#hv'); if (hv && matchMedia('(hover:hover)').matches) { const hero = hv.closest('.hero'); hero.addEventListener('mousemove', e => { const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;[...hv.children].forEach((c, i) => c.style.translate = `${-x * (8 + i * 5)}px ${-y * (8 + i * 5)}px`) }) }
        /* products */
        const st = $('#stage'); let pi = 0;
        const showP = i => { pi = i; const p = PRODS[i]; $$('#ptab button').forEach((b, k) => b.setAttribute('aria-selected', k === i)); st.style.background = `linear-gradient(145deg,${p.bg},color-mix(in srgb,${p.c} 16%,${p.bg}))`; st.innerHTML = `<div class="st-h"><h3>${p.h}</h3><span class="pill" style="background:var(--card);color:${p.c}">${p.k}</span></div><div class="vis">${p.vis()}</div><div class="st-f"><div class="facts n">${p.facts.map(f => `<div>${f[0]}<b>${f[1]}</b></div>`).join('')}</div><a class="b b-ink" href="${p.href}">${p.cta}${ico('arrow', 'go')}</a></div>`; requestAnimationFrame(() => $$('.ladder i', st).forEach(e => e.style.width = e.dataset.w + '%')) };
        $('#ptab').onclick = e => { const b = e.target.closest('button'); if (b) showP(+b.dataset.p) }; showP(0);
        /* planner */
        K.wirePlanner('edu');
        /* steps progress */
        const bars = $$('#hp i'), steps = $$('#steps .step');
        if (window.IntersectionObserver) { const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const k = steps.indexOf(e.target); bars.forEach((b, j) => b.classList.toggle('on', j <= k)) } }), { rootMargin: '-40% 0px -40% 0px' }); steps.forEach(s => so.observe(s)) }
        /* time machine */
        const tm = () => {
          const a = +$('#tA').value, y = +$('#tY').value, r = +$('#tR').value, v = K.sipFV(a, y, r), inv = a * 12 * y, yr0 = new Date().getFullYear();
          $('#tAv').textContent = inr(a); $('#tYv').textContent = y + ' yrs'; $('#tRv').textContent = r + '%'; $('#tY2').textContent = y + ' years';
          $('#tV').textContent = L(v); $('#tI').textContent = L(inv); $('#tG').textContent = L(v - inv); $('#tM').textContent = (v / inv).toFixed(1) + '×';
          const ins = [], gro = []; for (let k = 0; k <= y; k++) { const f = K.sipFV(a, k, r), i = a * 12 * k; ins.push(i); gro.push(Math.max(0, f - i)) }
          K.chart($('#tCh'), { h: 240, stack: true, series: [{ name: 'You invested', data: ins, color: '#7FD8E0', fill: 'rgba(127,216,224,.28)' }, { name: 'Growth', data: gro, color: '#E8A317', fill: 'rgba(232,163,23,.4)' }], x: i => yr0 + i, tipx: i => 'Year ' + i, total: 'Total value', xticks: 5 });
          const late = y > 6 ? v - K.sipFV(a, y - 5, r) : 0; $('#tLate').style.display = late ? '' : 'none'; $('#tLate').innerHTML = `${K.ico('clock')}<span>Starting <b>5 years later</b> and finishing on the same day would leave you <b>${L(late)}</b> short.</span>`;
        };['#tA', '#tY', '#tR'].forEach(s => $(s).oninput = tm); K.fillAll($('#tmS')); tm();
        /* risk dial */
        const MIX = [[10, 0, 75, 10, 5], [25, 5, 55, 10, 5], [35, 15, 35, 10, 5], [42, 28, 20, 6, 4], [48, 38, 8, 4, 2]], NM = ['Large companies', 'Mid and small', 'Debt', 'Gold', 'Cash'], CL = ['#2F3A9E', '#12A3AE', '#9AA1D8', '#E8A317', '#C9CCD9'], EX = ['7.5%', '9.5%', '11%', '12.5%', '13.5%'], WO = ['−3%', '−9%', '−16%', '−24%', '−31%'], HZ = ['1+ yrs', '3+ yrs', '5+ yrs', '7+ yrs', '10+ yrs'], LB = ['Cautious', 'Careful', 'Balanced', 'Growth', 'Bold'];
        const rd = () => { const k = +$('#rdS').value - 1, m = MIX[k]; $('#rdN').textContent = LB[k]; $('#rdE').textContent = EX[k]; $('#rdW').textContent = WO[k]; $('#rdH').textContent = HZ[k];
          $$('#rdL span').forEach((s, i) => s.classList.toggle('on', i === k));
          $('#rdD').innerHTML = K.donut(m.map((v, i) => [NM[i], v, CL[i]]), { size: 260, thick: 38, gap: 3 }) + `<div><b class="n">${m[0] + m[1]}%</b><small>in equity</small></div>`;
          $('#rdG').innerHTML = m.map((v, i) => v ? `<div><span><i style="background:${CL[i]}"></i>${NM[i]}</span><b>${v}%</b></div>` : '').join('') };
        $('#rdS').oninput = rd; K.fill($('#rdS')); rd();
        /* leaderboard */
        const sets = [F.filter(f => f.rating >= 3 && f.cat !== 'Liquid').sort((a, b) => b.inv - a.inv), F.filter(f => f.cat !== 'Liquid').sort((a, b) => b.r3 - a.r3), F.filter(f => f.cat === 'ELSS'), F.filter(f => f.cat === 'Gold')];
        K.leaderboard($('#lbR'), sets[0].slice(0, 5)); $('#lbT').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; $$('#lbT .chip').forEach(x => x.setAttribute('aria-pressed', x === c)); K.leaderboard($('#lbR'), sets[+c.dataset.c].slice(0, 5)) };
        /* chat */
        const ms = $$('#msgs .msg'); ms.forEach((m, i) => m.style.transitionDelay = (i * 1.1 + .3) + 's'); if (window.IntersectionObserver) { const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); co.disconnect() } }), { threshold: .35 }); co.observe($('#msgs')) } else $('#msgs').classList.add('in');
        /* testimonials */
        let vi = 0, vt; const V = K.VOICES, vo = $('#vo');
        $('#voD').innerHTML = V.map(() => '<i></i>').join('');
        const sv = i => { vi = (i + V.length) % V.length; const v = V[vi]; vo.classList.remove('sw'); void vo.offsetWidth; vo.classList.add('sw'); $('#voA').innerHTML = K.avatar(v.a + 2, { size: 112, alt: v.n }); $('#voB').textContent = v.big; $('#voBL').textContent = v.bl; $('#voG').textContent = v.g; $('#voQ').textContent = v.q; $('#voN').textContent = v.n; $('#voP').textContent = v.p; $$('#voD i').forEach((d, k) => d.classList.toggle('on', k === vi)) };
        const auto = () => { clearInterval(vt); vt = setInterval(() => { if (!document.body.contains(vo)) return clearInterval(vt); sv(vi + 1) }, 8000) };
        $('#voPr').onclick = () => { sv(vi - 1); auto() }; $('#voNx').onclick = () => { sv(vi + 1); auto() }; vo.onmouseenter = () => clearInterval(vt); vo.onmouseleave = auto; sv(0); auto();
        /* app phone chart */
        K.chart($('#phch'), { h: 96, noX: true, noY: true, series: [{ name: 'Value', data: heroSeries.slice(0, 40), color: 'var(--teal)', fill: 'color-mix(in srgb,var(--teal) 16%,transparent)' }], x: i => i, ymin: 0 });
        /* faq */
        const fq = c => { $('#fqL').innerHTML = K.faqHTML(c === 'All' ? '' : c); $$('#fqL details')[0] && ($$('#fqL details')[0].open = true) }; fq('All');
        $('#fqC').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; $$('#fqC .chip').forEach(x => x.setAttribute('aria-pressed', x === c)); fq(c.dataset.c) };
      }
    };
  };

  /* leaderboard rows (shared with mutual funds page) */
  K.leaderboard = (el, list) => {
    el.innerHTML = list.map((f, i) => `<div class="lb-r n"><span class="rk">${i + 1}</span><div class="nm"><button data-f="${f.id}">${f.name}</button><small><span class="pill">${f.cat}</span>${K.rate(f.rating)}</small></div><span class="sp">${K.spark(K.sparkFor(f), { w: 86, h: 30 })}</span><div class="rt r1"><b class="${f.r1 >= 0 ? 'up' : 'dn'}">${f.r1.toFixed(1)}%</b><small>1 yr</small></div><div class="rt"><b class="${f.r3 >= 0 ? 'up' : 'dn'}">${f.r3.toFixed(1)}%</b><small>3 yr</small></div><div class="rt r5"><b class="${f.r5 >= 0 ? 'up' : 'dn'}">${f.r5.toFixed(1)}%</b><small>5 yr</small></div><button class="addb" data-login>Invest</button></div>`).join('');
  };
  K.rate = n => `<span class="rate" aria-label="${n} of 5">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= n ? 'on' : ''}"></i>`).join('')}</span>`;
})(window.K);

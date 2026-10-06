/* Kosha Wealth — public pages, part 2: Research, About, Pricing, Contact, Calculators */
(function (K) {
  const { $, $$, ico, inr, L, F } = K;
  const cta = K.cta2, yr0 = new Date().getFullYear();

  /* ---------- abstract article art ---------- */
  const ART = [
    ['#0B0F2E', '<path d="M0 90 C60 80 80 150 140 140 S220 60 280 120 360 200 400 210" fill="none" stroke="#E8A317" stroke-width="4"/><circle cx="400" cy="210" r="9" fill="#E8A317"/><path d="M0 130 L400 130" stroke="#8C93C4" stroke-dasharray="6 7" opacity=".5"/>'],
    ['#0A4C54', '<path d="M0 200 C100 190 160 100 400 60" fill="none" stroke="#7FD8E0" stroke-width="4"/><path d="M0 170 L400 140" fill="none" stroke="#E8A317" stroke-width="4"/><circle cx="262" cy="108" r="8" fill="#fff"/>'],
    ['#E8A317', '<circle cx="300" cy="130" r="110" fill="none" stroke="#10143A" stroke-width="3" opacity=".2"/><circle cx="300" cy="130" r="74" fill="none" stroke="#10143A" stroke-width="3" opacity=".35"/><circle cx="300" cy="130" r="38" fill="#10143A"/>'],
    ['#232A73', '<path d="M40 220 A150 150 0 0 1 340 220" fill="none" stroke="#7FD8E0" stroke-width="3"/><path d="M90 220 A100 100 0 0 1 290 220" fill="none" stroke="#E8A317" stroke-width="3"/><path d="M140 220 A50 50 0 0 1 240 220" fill="none" stroke="#fff" stroke-width="3"/>'],
    ['#6B63D8', '<path d="M0 200 C120 170 260 90 400 40" fill="none" stroke="#fff" stroke-width="4"/><path d="M0 200 C120 180 260 130 400 100" fill="none" stroke="#10143A" stroke-width="4"/><path d="M400 40 V100" stroke="#fff" stroke-dasharray="3 5"/>'],
    ['#D9573B', '<g fill="#FBE4DC">' + [40, 90, 140, 190, 240, 290, 340].map((x, i) => `<rect x="${x}" y="${[90, 70, 50, 40, 120, 150, 130][i]}" width="34" height="${220 - [90, 70, 50, 40, 120, 150, 130][i]}" rx="6" opacity="${i === 4 || i === 5 ? 1 : .55}"/>`).join('') + '</g>']
  ];
  K.art = (id, cls = '') => { const a = ART[(id - 1) % 6]; return `<svg class="art-s ${cls}" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="260" fill="${a[0]}"/>${a[1]}</svg>` };

  /* ======================= RESEARCH ======================= */
  K.pages['/research'] = (sub) => {
    if (sub && sub.startsWith('read/')) return article(+sub.split('/')[1]);
    const A = K.ARTICLES, cats = ['All', ...new Set(A.map(a => a.cat))];
    const h = `
<section class="rh"><div class="w"><div class="rh-top"><span>Tuesday, 6 October 2026</span><span>Issue 214</span><span>Free, every Monday</span></div>
  <h1 data-r>The Research <em>Desk</em></h1><p class="lede" data-r style="--d:.08s">Plain-language notes on markets, tax and money decisions. No predictions, no hot tips, and a note when we change our mind.</p></div>
  <div class="tick"><div class="track">${[0, 1].map(() => [['Nifty 50', '24,812', '−0.6%', 0], ['Sensex', '81,340', '−0.5%', 0], ['Nifty Midcap', '57,120', '−1.1%', 0], ['Gold, 10 g', '₹1,02,430', '+0.8%', 1], ['10-yr G-sec', '6.84%', '+2 bps', 1], ['USD/INR', '84.62', '+0.1%', 0], ['Brent', '$78.4', '−0.7%', 1]].map(t => `<span><b>${t[0]}</b> ${t[1]} <em class="${t[3] ? 'up' : 'dn'}">${t[2]}</em></span>`).join('')).join('')}</div></div></section>

<section class="sec" style="padding-top:64px"><div class="w">
  <a class="feat2" href="#/research/read/${A[0].id}" data-r>${K.art(1)}<div><span class="pill gold">Featured · ${A[0].cat}</span><h2>${A[0].title}</h2><p>${A[0].dek}</p><div class="by">${K.avatar(1, { size: 36 })}<span><b>${A[0].by}</b>${A[0].date} · ${A[0].mins} min read</span></div></div></a>
  <div class="chips" id="rC" style="margin:64px 0 32px">${cats.map((c, i) => `<button class="chip" data-c="${c}" aria-pressed="${i === 0}">${c}</button>`).join('')}</div>
  <div id="rL"></div></div></section>

<section class="sec dark"><div class="w"><div class="nlb"><div><span class="eyebrow gold">Monday Money Note</span><h2 style="margin:18px 0 14px" data-r>One email a week. <em>Five minutes.</em></h2><p class="lede">What moved, what we did about it, and one thing to learn. 41,000 people read it.</p></div><form class="mob" data-nl style="max-width:none"><input type="email" required placeholder="you@example.com" aria-label="Email" style="padding-left:20px"><button class="b b-gold">Subscribe${ico('arrow', 'go')}</button></form></div></div></section>`;
    return {
      t: 'Research', h, w() {
        const paint = c => { const l = A.slice(1).filter(a => c === 'All' || a.cat === c), big = l.slice(0, 2), rest = l.slice(2);
          $('#rL').innerHTML = `<div class="mag">${big.map((a, i) => `<a class="mc ${i ? 'sm' : ''}" href="#/research/read/${a.id}">${K.art(a.id)}<div><span class="k">${a.cat}</span><h3>${a.title}</h3><p>${a.dek}</p><small>${a.date} · ${a.mins} min read</small></div></a>`).join('')}</div>${rest.length ? `<div class="rl2">${rest.map(a => `<a href="#/research/read/${a.id}"><div class="th">${K.art(a.id)}</div><div><span class="k">${a.cat}</span><h4>${a.title}</h4><p>${a.dek}</p></div><small>${a.date}<br>${a.mins} min read</small></a>`).join('')}</div>` : ''}${l.length ? '' : '<div class="none">Nothing here yet.</div>'}`; K.observe($('#rL')) };
        $('#rC').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; $$('#rC .chip').forEach(x => x.setAttribute('aria-pressed', x === c)); paint(c.dataset.c) }; paint('All');
      }
    };
  };

  function article(id) {
    const a = K.ARTICLES.find(x => x.id === id) || K.ARTICLES[0], rel = K.ARTICLES.filter(x => x.id !== a.id).slice(0, 3);
    const fig = { 1: '<figure data-r><div id="fg"></div><div class="legend" style="margin-top:8px"><span><i style="background:var(--teal)"></i>Kept the SIP going</span><span><i style="background:var(--gold)"></i>Paused for six months</span></div><figcaption>Same fund, same market, ₹10,000 a month. Illustrative, using a 12-month fall followed by recovery.</figcaption></figure>', 5: '<figure data-r><div id="fg"></div><div class="legend" style="margin-top:8px"><span><i style="background:var(--teal)"></i>Direct plan</span><span><i style="background:var(--gold)"></i>Regular plan</span></div><figcaption>₹10,000 a month for 20 years at 12% before costs. Direct 0.6%, regular 1.4%. Illustrative.</figcaption></figure>', 6: `<figure data-r><div class="barfig">${[['Fall in the final year of saving', 18], ['Fall in the first year of retirement', 23]].map(r => `<div><span>${r[0]}</span><i style="width:${r[1] * 3.4}%"><b>−${r[1]}%</b></i></div>`).join('')}</div><figcaption>Cut in the sustainable monthly withdrawal after a 20% market fall. Illustrative model.</figcaption></figure>` }[a.id] || '';
    const body = a.body.map((p, i) => `<p data-r>${p}</p>${i === 1 ? `<blockquote data-r>${a.take[0]}.</blockquote>` : ''}${i === 2 ? fig : ''}`).join('');
    const h = `<div class="rprog" id="rp"></div>
<article><header class="ah2"><div class="w w-n"><a class="lnk" href="#/research" style="margin-bottom:28px">${ico('chevL')} The Research Desk</a><div><span class="pill gold">${a.cat}</span></div><h1 data-r>${a.title}</h1><p class="lede" data-r>${a.dek}</p><div class="by2" data-r>${K.avatar(a.by === 'Priya Subramanian' ? 1 : 4, { size: 48 })}<span><b>${a.by}</b>${a.date} · ${a.mins} minute read</span></div></div></header>
<div class="w"><div class="rb"><aside><div class="tk-box"><h4>Key takeaways</h4><ul>${a.take.map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul></div><div class="shr"><span>Share</span><button class="ib" data-toast="Link copied (demo)" aria-label="Copy link">${ico('link')}</button><button class="ib" data-toast="Opening email (demo)" aria-label="Email">${ico('mail')}</button></div></aside><div class="prose">${body}<div class="end-cta" data-r><h3 class="serif">Want this applied to your plan?</h3><p>Your advisor reviews your goals every quarter. Ask them anything from this note.</p><div style="display:flex;gap:12px;flex-wrap:wrap"><a class="b b-go" href="#/contact">Talk to an advisor${ico('arrow', 'go')}</a><a class="b b-line" href="#/goals">Plan a goal</a></div></div></div></div></div></article>
<section class="sec cream"><div class="w"><div class="shead"><span class="eyebrow">Keep reading</span><h2>More from the desk.</h2></div><div class="relr">${rel.map(r => `<a href="#/research/read/${r.id}">${K.art(r.id)}<span class="k">${r.cat}</span><h4>${r.title}</h4><small>${r.mins} min read</small></a>`).join('')}</div></div></section>`;
    return {
      t: a.title.split('.')[0], h, w() {
        const bar = $('#rp'), on = () => { if (!document.body.contains(bar)) return removeEventListener('scroll', on); const d = document.documentElement; bar.style.width = (scrollY / (d.scrollHeight - innerHeight) * 100) + '%' }; addEventListener('scroll', on, { passive: true });
        if (a.id === 1) { const r = [.0095, 0, 0].length && Array.from({ length: 60 }, (_, m) => m < 10 ? -.028 : m < 14 ? .01 : .0135), c = [0], p = [0]; let v = 0, w = 0; r.forEach((x, m) => { v = (v + 10000) * (1 + x); w = ((m >= 6 && m < 12) ? w : w + 10000) * (1 + x); c.push(v); p.push(w) }); K.chart($('#fg'), { h: 260, series: [{ name: 'Kept going', data: c, color: 'var(--teal)', fill: 'color-mix(in srgb,var(--teal) 10%,transparent)' }, { name: 'Paused', data: p, color: 'var(--gold)' }], x: i => i ? 'Yr ' + (i / 12).toFixed(0) : 'Start', tipx: i => 'Month ' + i, fmt: K.L, yfmt: K.short, ymin: 0, xticks: 6 }) }
        if (a.id === 5) { const d = [], g = []; for (let k = 0; k <= 20; k++) { d.push(K.sipFV(10000, k, 11.4)); g.push(K.sipFV(10000, k, 10.6)) } K.chart($('#fg'), { h: 260, series: [{ name: 'Direct', data: d, color: 'var(--teal)', fill: 'color-mix(in srgb,var(--teal) 10%,transparent)' }, { name: 'Regular', data: g, color: 'var(--gold)' }], x: i => 'Yr ' + i, tipx: i => 'After ' + i + ' years', fmt: K.L, yfmt: K.short, ymin: 0, xticks: 5 }) }
      }
    };
  }

  /* ======================= ABOUT ======================= */
  const TEAM = [['Priya Subramanian', 'Head of advisory', 'CFP · 12 years', 1, 'Retirement, family plans'], ['Vikram Narayan', 'Chief investment officer', 'CFA · 19 years', 4, 'Fund selection, markets'], ['Anjali Rangan', 'Senior advisor', 'CFP · 15 years', 5, 'Education, NRI clients'], ['Suresh Menon', 'Head of operations', 'MBA · 14 years', 2, 'Orders, KYC, support'], ['Deepa Chandran', 'Compliance officer', 'CS, LLB · 11 years', 3, 'Regulation, grievances'], ['Arjun Pillai', 'Head of technology', 'B.Tech · 16 years', 0, 'App, security, data'], ['Lakshmi Iyer', 'Research lead', 'CFA · 10 years', 7, 'Debt and hybrid funds'], ['Rahul Varma', 'Head of client care', 'MA · 9 years', 6, 'Onboarding, service']];
  K.pages['/about'] = () => {
    const h = `
<section class="ab-hero"><div class="w"><div><span class="eyebrow">About Kosha</span><h1 data-r>A small firm that <em>answers the phone</em>.</h1><p class="lede" data-r style="--d:.08s">Most families are sold products. We think they should be given a plan, and someone to call when the market gets loud.</p><div class="acts" data-r style="--d:.16s"><a class="b b-ink b-lg" href="#/contact">Meet an advisor${ico('arrow', 'go')}</a><button class="b b-line b-lg" data-scroll="story">Our story</button></div></div>
  <div class="collage" data-r="s" aria-hidden="true"><div class="c1">${K.avatar(1, { size: 200, sq: 1 })}</div><div class="c2">${K.avatar(4, { size: 150, sq: 1 })}</div><div class="c3"><b class="serif n">14</b><span>years of answering calls</span></div><div class="c4">${K.avatar(5, { size: 170, sq: 1 })}</div><div class="c5"><span class="pill gold">${ico('phone')} 3 rings</span></div></div></div></section>
${K.subnav([['Story', 'story'], ['Principles', 'principles'], ['People', 'people'], ['Security', 'security'], ['Grievances', 'grievance'], ['Careers', 'careers']])}

<section class="sec" data-anchor="story"><div class="w"><div class="shead"><span class="eyebrow">Our story</span><h2 data-r>Fourteen years, <em>one</em> idea.</h2></div></div>
  <div class="tl"><div class="tl-in">${[['2012', 'Three advisors, one office', 'Kosha opens in Chennai with 41 families, all from word of mouth.'], ['2015', '₹100 crore advised', 'First hire for research. First written fund-review process.'], ['2018', 'The goal planner', 'Every family gets a plan per goal, not one big portfolio.'], ['2020', 'The March calls', 'Four thousand calls in two weeks. We lost almost no one.'], ['2023', 'The app', 'Same advisor, now with a message button.'], ['2026', '62,000 families', 'Still capped at 120 families per advisor.']].map((e, i) => `<div class="ev" data-r style="--d:${i * .06}s"><b class="serif n">${e[0]}</b><i></i><h4>${e[1]}</h4><p>${e[2]}</p></div>`).join('')}</div></div></section>

<section class="sec cream" data-anchor="principles"><div class="w"><div class="shead"><span class="eyebrow">What we believe</span><h2 data-r>Four rules we <em>do not</em> bend.</h2></div>
  <div class="prn">${[['Plans before products', 'We never open with a fund. We open with a goal, a date and an amount, and the fund comes last.', 'target'], ['Answer the phone', 'Advisors are capped at 120 families so that a call on a bad Monday gets picked up in three rings.', 'phone'], ['Say the cost out loud', 'What you pay us, what the fund charges and what the tax will be, in writing, before you invest.', 'scale'], ['Review, do not react', 'Quarterly reviews against a written plan. A headline is not a reason to change anything.', 'refresh']].map((p, i) => `<div class="pr" data-r><span class="nm serif">0${i + 1}</span><div><h3 class="serif">${p[0]}</h3><p>${p[1]}</p></div><span class="ic">${ico(p[2])}</span></div>`).join('')}</div></div></section>

<section class="sec" data-anchor="people"><div class="w"><div class="shead row"><div><span class="eyebrow">The people</span><h2 style="margin-top:18px" data-r>Names, faces and <em>qualifications</em>.</h2></div><p class="lede" data-r>Every advisor’s credentials are published, and every client knows theirs by name.</p></div>
  <div class="ppl">${TEAM.map((t, i) => `<div class="pp1" data-r style="--d:${(i % 4) * .06}s"><div class="ph1">${K.avatar(t[3], { size: 150, sq: 1, f: [1, 5, 3, 7].includes(t[3]) })}</div><h4>${t[0]}</h4><b>${t[1]}</b><small>${t[2]}</small><span class="pill">${t[4]}</span></div>`).join('')}</div><p class="fine" style="margin-top:18px">Illustrated placeholders. Replace with real team photographs and credentials.</p></div></section>

<section class="sec dark" data-anchor="security"><div class="w"><div class="shead row"><div><span class="eyebrow gold">Security</span><h2 style="margin-top:18px" data-r>Built so we <em>cannot</em> lose your money.</h2></div><p class="lede" data-r>The safest system is one where we simply do not hold anything. The rest of the protections are there for your data.</p></div>
  <div class="sec6">${[['lock', 'Money never touches us', 'You pay the fund house directly. We hold no client funds, ever.'], ['shield', 'Encrypted end to end', 'TLS 1.3 in transit, AES-256 at rest, keys held in an HSM.'], ['phone', 'OTP on every action', 'Logins, orders, bank changes and withdrawals all need a one-time code.'], ['eye', 'Withdrawals only to you', 'Redemptions can only go to your own verified bank account.'], ['doc', 'Audited every year', 'Independent security audit and penetration test, summaries published.'], ['users', 'Your data stays yours', 'Never sold, never used for ads, deleted on request.']].map((s, i) => `<div data-r style="--d:${(i % 3) * .07}s"><span class="ic">${ico(s[0])}</span><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div></div></section>

<section class="sec" data-anchor="grievance"><div class="w"><div class="gv"><div><span class="eyebrow">Grievance redressal</span><h2 style="margin:18px 0 20px" data-r>If something goes wrong, <em>here is the ladder</em>.</h2><p class="lede" data-r>Four steps, each with a deadline. The last one is outside Kosha entirely, and you can go straight to it if you prefer.</p>
  <div class="reg" data-r><h4>Registrations</h4><dl>${[['AMFI registration (ARN)', 'ARN-XXXXX'], ['Valid till', 'DD/MM/YYYY'], ['CIN', 'XXXXXXXXXXXXXXXXXXXXX'], ['Registered office', '[Address], Chennai']].map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl></div></div>
  <div class="lad">${[['1', 'Your advisor', 'Same working day', 'Call or message. Most issues end here.'], ['2', 'Head of client care', '3 working days', 'care@koshawealth.in · 1800 XXX XXXX'], ['3', 'Compliance officer', '7 working days', 'compliance@koshawealth.in · name and number published'], ['4', 'SEBI SCORES / AMFI', 'External', 'scores.sebi.gov.in · independent of Kosha']].map((s, i) => `<div data-r style="--d:${i * .08}s"><span class="st">${s[0]}</span><div><b>${s[1]}</b><span class="pill gold">${s[2]}</span><p>${s[3]}</p></div></div>`).join('')}</div></div></div></section>

<section class="sec cream" data-anchor="careers"><div class="w"><div class="shead row"><div><span class="eyebrow">Careers</span><h2 style="margin-top:18px" data-r>Come help families <em>invest well</em>.</h2></div><p class="lede" data-r>We hire slowly, pay fairly, and cap client load so advisors are never rushed. Four roles are open.</p></div>
  <div class="roles">${[['Wealth advisor', 'Chennai · Full time', 'Advisory'], ['Frontend engineer', 'Remote, India · Full time', 'Technology'], ['Research analyst, debt', 'Chennai · Full time', 'Research'], ['Client care associate', 'Coimbatore · Full time', 'Service']].map(r => `<a href="#/about/careers" data-toast="Role details open here (demo)"><b>${r[0]}</b><span>${r[1]}</span><span class="pill">${r[2]}</span>${ico('arrowUp')}</a>`).join('')}</div></div></section>
${cta('Meet the people who would look after your plan.', 'Open an account')}`;
    return { t: 'About', h, w() { K.wireSubnav() } };
  };

  /* ======================= PRICING ======================= */
  const feat = [['Goal planner and calculators', 1, 1, 1], ['Direct-plan mutual funds', 1, 1, 1], ['Bonds, FDs, NPS and insurance', 1, 1, 1], ['Written plan for every goal', 0, 1, 1], ['Named advisor, phone and chat', 0, 1, 1], ['Quarterly reviews', 0, 1, 1], ['Tax-aware rebalancing', 0, 1, 1], ['Dedicated manager and family office desk', 0, 0, 1], ['Estate and succession planning', 0, 0, 1]];
  K.pages['/pricing'] = () => {
    const h = `
<section class="ph-hero pr-h"><div class="w"><span class="eyebrow">How we earn</span><h1 data-r>Pricing with no <em>small print</em>.</h1><p class="lede" data-r style="--d:.08s">You can invest on your own for free, or pay us openly for a plan and a person. We never earn a commission hidden inside the fund you buy.</p><div class="seg" id="prT" style="margin-top:34px" data-r><button data-m="0" aria-pressed="true">Billed yearly</button><button data-m="1" aria-pressed="false">Billed quarterly</button></div></div></section>
<section class="sec" style="padding-top:30px"><div class="w"><div class="tiers">${[['On your own', '₹0', 'forever', 'For people who know what they want and need a good place to do it.', 'Start free', 0], ['Guided', '0.4%', 'of invested assets, a year', 'A written plan for every goal, a named advisor, and quarterly reviews.', 'Start with an advisor', 1], ['Private', '0.3%', 'above ₹1 crore invested', 'Everything in Guided, plus a dedicated manager and estate planning.', 'Request an introduction', 0]].map((t, i) => `<div class="tier ${t[5] ? 'hl' : ''}" data-r style="--d:${i * .08}s">${t[5] ? '<span class="pill gold pop">Most families choose this</span>' : ''}<h3 class="serif">${t[0]}</h3><div class="pr-n"><b class="n serif">${t[1]}</b><small>${t[2]}</small></div><p>${t[3]}</p><ul>${feat.filter(f => f[i + 1]).slice(0, i === 0 ? 3 : i === 1 ? 7 : 9).map(f => `<li>${ico('check')}${f[0]}</li>`).join('')}</ul><button class="b ${t[5] ? 'b-gold' : 'b-line'} b-wide" data-login>${t[4]}</button></div>`).join('')}</div>
  <p class="fine" style="margin-top:22px;text-align:center">Illustrative structure for the demo. Replace with the client’s actual pricing. Fund expense ratios and taxes are separate and always shown before you invest.</p></div></section>

<section class="sec cream"><div class="w"><div class="pcalc"><div><span class="eyebrow">What it would cost you</span><h2 style="margin:18px 0 20px" data-r>Compare it to a <em>regular plan</em>.</h2><p class="lede" data-r>In a regular plan, a distributor’s commission sits inside the fund’s cost, and you never see a bill. With us, the same money is a visible fee on a direct plan.</p>
  <div class="sl" style="margin-top:34px"><div class="top"><label for="pcA">Amount invested</label><span class="val n" id="pcAv"></span></div><input type="range" id="pcA" min="500000" max="50000000" step="500000" value="3000000"></div></div>
  <div class="pc-o" data-r="rt"><div class="pc-r"><span>Regular plan, commission inside the fund</span><i id="pcB1"></i><b class="n" id="pcV1"></b></div><div class="pc-r"><span>Kosha Guided on direct plans</span><i id="pcB2"></i><b class="n" id="pcV2"></b></div><div class="pc-r"><span>On your own, direct plans</span><i id="pcB3"></i><b class="n" id="pcV3"></b></div><p class="pc-s" id="pcS"></p></div></div></div></section>

<section class="sec"><div class="w"><div class="shead c"><span class="eyebrow">Compare plans</span><h2 data-r>Exactly what you <em>get</em>.</h2></div><div class="tbl cmp" data-r><table class="t"><thead><tr><th></th><th>On your own</th><th>Guided</th><th>Private</th></tr></thead><tbody>${feat.map(f => `<tr><td>${f[0]}</td>${[1, 2, 3].map(i => `<td>${f[i] ? `<span class="ck">${ico('check')}</span>` : '<span class="no">—</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>

<section class="sec cream"><div class="w"><div class="fq"><div class="fq-l"><span class="eyebrow">Fees, answered</span><h2 style="margin:18px 0 0" data-r>Ask us <em>anything</em> about money.</h2></div><div data-r>${K.faqHTML('Advice and fees')}</div></div></div></section>
${cta('Start free. Add an advisor when you want one.', 'Get started')}`;
    return {
      t: 'How we earn', h, w() {
        const pc = () => { const a = +$('#pcA').value, reg = a * .008, gd = Math.min(a * .004, 60000) , own = 0; $('#pcAv').textContent = L(a); const mx = reg;
          [['1', reg, 'var(--rose)'], ['2', gd, 'var(--teal)'], ['3', own, 'var(--up)']].forEach(([k, v, c]) => { $('#pcV' + k).textContent = v ? inr(v) + ' / yr' : '₹0'; $('#pcB' + k).style.cssText = `width:${Math.max(2, v / mx * 100)}%;background:${c}` });
          $('#pcS').innerHTML = `Over 10 years, Guided costs about <b>${L((reg - gd) * 10)}</b> less than the commission inside a regular plan, and you can see every rupee of it.` };
        $('#pcA').oninput = pc; K.fillAll($('#pcA').parentNode); pc();
        $('#prT').onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('#prT button').forEach(x => x.setAttribute('aria-pressed', x === b)); K.toast(b.dataset.m === '1' ? 'Billed in four equal parts (demo)' : 'Billed once a year (demo)') };
      }
    };
  };

  /* ======================= CONTACT ======================= */
  const OFF = [['Chennai', 'Head office', ['[Building], [Street], Nungambakkam', 'Chennai, Tamil Nadu 600034'], 'Mon–Sat, 9am–7pm', 0], ['Bengaluru', 'Advisory studio', ['[Building], Indiranagar', 'Bengaluru, Karnataka 560038'], 'Mon–Sat, 10am–6pm', 1], ['Coimbatore', 'Client care centre', ['[Building], RS Puram', 'Coimbatore, Tamil Nadu 641002'], 'Mon–Sat, 9am–6pm', 2]];
  K.pages['/contact'] = () => {
    const h = `
<section class="ct-hero"><div class="w"><div><span class="eyebrow">Talk to an advisor</span><h1 data-r>Talk to a <em>person</em>.</h1><p class="lede" data-r style="--d:.08s">Leave your number and we will call within one working day. No sales script, and no obligation to invest.</p>
  <div class="chan" data-r style="--d:.16s">${[['phone', 'Call us', '1800 XXX XXXX', 'Mon–Sat, 9am–7pm'], ['chat', 'WhatsApp', '+91 9XXXX XXXXX', 'Replies in 38 min'], ['mail', 'Email', 'hello@koshawealth.in', 'Within a day'], ['pin', 'Visit', 'Chennai, Bengaluru, Coimbatore', 'By appointment']].map(c => `<a href="#/contact" data-toast="${c[1]} (demo)"><span class="ic">${ico(c[0])}</span><span><small>${c[1]}</small><b>${c[2]}</b><em>${c[3]}</em></span></a>`).join('')}</div></div>
  <div class="book" data-r="rt" id="bk"></div></div></section>

<section class="sec"><div class="w"><div class="ofc"><div><span class="eyebrow">Our offices</span><h2 style="margin:18px 0 24px" data-r>Drop in, <em>say hello</em>.</h2><div class="ofc-t" id="ofT">${OFF.map((o, i) => `<button class="chip" data-o="${i}" aria-pressed="${i === 0}">${o[0]}</button>`).join('')}</div><div id="ofD" style="margin-top:28px"></div></div><div class="map" data-r="rt" id="ofM" aria-hidden="true"></div></div></div></section>

<section class="sec cream"><div class="w"><div class="fq"><div class="fq-l"><span class="eyebrow">Quick answers</span><h2 style="margin:18px 0 0" data-r>Maybe we have <em>already</em> answered it.</h2></div><div data-r>${K.faqHTML('Getting started')}</div></div></div></section>`;
    return {
      t: 'Contact', h, w() {
        /* booking */
        const days = []; const d0 = new Date(); for (let i = 1; days.length < 6; i++) { const d = new Date(d0); d.setDate(d0.getDate() + i); if (d.getDay() !== 0) days.push(d) }
        const slots = ['9:30 am', '10:30 am', '11:30 am', '12:30 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:30 pm']; let day = 0, slot = -1, step = 0;
        const dn = d => d.toLocaleDateString('en-IN', { weekday: 'short' }), dd = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        const bk = () => { const el = $('#bk');
          if (step === 2) { el.innerHTML = `<div class="done2"><span class="bigck">${ico('check')}</span><h3 class="serif">You are booked.</h3><p>${dn(days[day])}, ${dd(days[day])} at ${slots[slot]}. An advisor will call you on the number you gave. A confirmation is on its way.</p><button class="b b-line" id="bkR">Book another time</button></div>`; $('#bkR').onclick = () => { step = 0; slot = -1; bk() }; return }
          el.innerHTML = `<h3 class="serif">Book a 30-minute call</h3><p class="muted sm" style="margin:4px 0 20px">Free. With a certified advisor, not a salesperson.</p>
          <div class="lab">Pick a day</div><div class="days">${days.map((d, i) => `<button class="${i === day ? 'on' : ''}" data-d="${i}"><small>${dn(d)}</small><b class="n">${d.getDate()}</b></button>`).join('')}</div>
          <div class="lab" style="margin-top:20px">Pick a time</div><div class="slt">${slots.map((s, i) => { const off = (i * 3 + day * 5) % 7 === 0; return `<button class="${i === slot ? 'on' : ''}" data-s="${i}" ${off ? 'disabled' : ''}>${s}</button>` }).join('')}</div>
          <form id="bkF" style="margin-top:22px;display:grid;gap:14px"><div class="f2"><div class="fld"><label for="bn">Your name</label><input id="bn" required></div><div class="fld"><label for="bm">Mobile number</label><input id="bm" required inputmode="tel" maxlength="10"></div></div><div class="fld"><label for="bt">What would you like to talk about?</label><select id="bt"><option>Starting to invest</option><option>Planning for retirement</option><option>Reviewing funds I already own</option><option>Saving tax</option><option>Something else</option></select></div><button class="b b-go b-lg b-wide" ${slot < 0 ? 'disabled style="opacity:.5"' : ''}>${slot < 0 ? 'Pick a time to continue' : 'Confirm for ' + slots[slot]}</button></form>`;
          $('.days', el).onclick = e => { const b = e.target.closest('button'); if (b) { day = +b.dataset.d; slot = -1; bk() } }; $('.slt', el).onclick = e => { const b = e.target.closest('button'); if (b && !b.disabled) { slot = +b.dataset.s; bk() } };
          $('#bkF').onsubmit = e => { e.preventDefault(); if (slot < 0) return; step = 2; bk() } };
        bk();
        /* offices */
        const of = i => { const o = OFF[i]; $$('#ofT .chip').forEach((c, k) => c.setAttribute('aria-pressed', k === i)); $('#ofD').innerHTML = `<h3 class="serif" style="font-size:2rem">${o[0]} <small style="font-size:.9rem;font-family:var(--sans);color:var(--muted)">${o[1]}</small></h3><p style="margin:12px 0;font-size:1.05rem">${o[2].join('<br>')}</p><p class="muted">${o[3]}</p><a class="lnk" style="margin-top:14px" href="#/contact" data-toast="Directions open in Maps (demo)">Get directions ${ico('arrow')}</a>`;
          const pins = [[46, 52], [38, 30], [30, 60]]; $('#ofM').innerHTML = `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"><rect width="400" height="400" fill="var(--cream)"/><path d="M-10 120 C100 90 160 190 260 150 S380 60 420 90" stroke="var(--teal-soft)" stroke-width="26" fill="none"/>${[[40, 0, 400, 380], [0, 260, 400, 90], [120, 0, 260, 400], [0, 180, 420, 210], [300, 0, 160, 400]].map((r, i) => `<path d="M${r[0]} ${r[1]} L${r[2]} ${r[3]}" stroke="var(--card)" stroke-width="${i % 2 ? 10 : 16}"/>`).join('')}${[[60, 220, 70, 50], [250, 260, 90, 60], [180, 60, 70, 60], [300, 150, 60, 50]].map(b => `<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="8" fill="var(--cream-2)"/>`).join('')}<g transform="translate(${pins[i][0] * 4 - 22} ${pins[i][1] * 4 - 52})"><ellipse cx="22" cy="54" rx="14" ry="5" fill="#10143A" opacity=".18"/><path d="M22 0C10 0 2 9 2 20c0 15 20 34 20 34s20-19 20-34C42 9 34 0 22 0z" fill="#10143A"/><circle cx="22" cy="20" r="8" fill="#E8A317"/></g></svg>` };
        $('#ofT').onclick = e => { const c = e.target.closest('.chip'); if (c) of(+c.dataset.o) }; of(0);
      }
    };
  };

  /* ======================= CALCULATORS ======================= */
  K.pages['/calculators'] = (sub) => {
    const h = `
<section class="ph-hero"><div class="w"><span class="eyebrow">Calculators</span><h1 data-r>Do the maths <em>before</em> you decide.</h1><p class="lede" data-r style="--d:.08s">Six simple tools for SIPs, lump sums, step-ups, withdrawals, retirement and tax. Everything updates as you move a slider.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="w" id="chub" data-r></div></section>
<section class="sec cream"><div class="w"><div class="shead c"><span class="eyebrow">The idea behind them</span><h2 data-r>Three things every calculator <em>teaches</em>.</h2></div><div class="three">${[['Time beats timing', 'Doubling the years does far more than doubling the amount. Try 10 vs 20 years on the SIP calculator.', 'clock'], ['Small raises compound', 'A 10% yearly step-up often does more than starting with a larger amount. Compare in the step-up tool.', 'trend'], ['Withdrawals need a plan', 'A 4% withdrawal rate can last decades. At 8% it rarely does. Test it with the SWP calculator.', 'scale']].map((t, i) => `<div data-r style="--d:${i * .08}s"><span class="ic">${ico(t[2])}</span><h3 class="serif">${t[0]}</h3><p>${t[1]}</p></div>`).join('')}</div></div></section>
${cta('Numbers are a start. A plan is the finish.', 'Start my plan')}`;
    return { t: 'Calculators', h, w() { K.calcHub($('#chub'), (sub || '').split('/')[0] || 'sip', { hash: 1 }) } };
  };
})(window.K);

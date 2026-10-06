/* Kosha Wealth — router, login, global handlers */
(function (K) {
  const { $, $$ } = K;
  const pm = () => $('#pm');
  let first = true;

  K.showPub = path => {
    const [, page, ...rest] = path.split('/'), fn = K.pages['/' + (page || '')];
    if (!fn) { location.hash = '#/'; return }
    const sub = rest.join('/'), r = fn(sub), m = pm();
    K.closeMega && K.closeMega();
    m.innerHTML = r.h; m.classList.remove('pgin'); void m.offsetWidth; m.classList.add('pgin');
    r.w && r.w(sub); K.fillAll(m); K.observe(m); K.markNav(path);
    const t = sub && m.querySelector(`[data-anchor="${sub.split('/')[0]}"]`);
    if (t) setTimeout(() => t.scrollIntoView({ behavior: first ? 'auto' : 'smooth', block: 'start' }), 60); else window.scrollTo(0, 0);
    document.title = (r.t ? r.t + ' — ' : '') + 'Kosha Wealth' + (r.t ? '' : ' — Give every rupee a reason');
    first = false;
  };

  function route() {
    const h = location.hash.slice(1) || '/';
    if (h.startsWith('/app/')) { document.body.classList.add('in'); K.app.show(h.slice(5)) }
    else { document.body.classList.remove('in'); K.showPub(h) }
  }
  window.addEventListener('hashchange', route);

  /* ---- login ---- */
  const openL = (num) => { $('#lm').classList.add('show'); $('#scrim').classList.add('show'); if (num) $('#mob').value = num; setTimeout(() => $('#mob').focus(), 60) };
  K.closeAll = () => { $('#lm').classList.remove('show'); $('#drawer').classList.remove('show'); $('#drawer').setAttribute('aria-hidden', 'true'); $('#scrim').classList.remove('show') };
  K.openLogin = openL;
  document.addEventListener('click', e => {
    if (e.target.closest('[data-login]')) { e.preventDefault(); $('#mnav').classList.remove('show'); openL() }
    if (e.target.closest('[data-close]')) K.closeAll();
  });
  $('#lm').onclick = e => { if (e.target.id === 'lm') K.closeAll() };
  const login = () => { K.closeAll(); location.hash = '#/app/overview'; K.toast('Welcome back, Ravi (demo login)') };
  $('#otp').onclick = login; $('#gl').onclick = login; $('#scrim').onclick = K.closeAll;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { K.closeAll(); $$('.menu').forEach(x => x.classList.remove('show')); $('#mnav').classList.remove('show') } });
  document.addEventListener('submit', e => {
    const f = e.target;
    if (f.matches('[data-mob]')) { e.preventDefault(); openL(f.querySelector('input').value.replace(/\D/g, '')) }
    if (f.matches('[data-nl]')) { e.preventDefault(); K.toast('Subscribed. The first note arrives Monday (demo)'); f.reset() }
  });

  /* ---- boot ---- */
  K.buildShell(); K.app.build();
  let st = 'light'; try { st = localStorage.getItem('kw4') || 'light' } catch (e) { } K.theme(st === 'dark' ? 'dark' : 'light');
  route();
})(window.K);

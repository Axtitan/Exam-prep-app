// Applies the saved theme before first paint so the page never flashes the wrong colours.
(function () {
  var pref = 'system';
  try { pref = localStorage.getItem('prep_theme') || 'system'; } catch (e) {}
  var dark = pref === 'dark' || (pref === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
})();

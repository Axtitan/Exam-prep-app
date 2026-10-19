'use strict';
/* Grad Prep: graduate-trainee exam practice.
   All page text is inserted with textContent / DOM nodes (never innerHTML) so question data
   can't inject markup, and there are no inline handlers, which lets the page run under a strict CSP. */

// ─── Exam registry ───────────────────────────────────────────────────────────
const M = {
  free: { mode: 'free', mins: 0, title: 'Practice', sub: 'No clock. The working appears after every answer.' },
  t: (mins, title, sub) => ({ mode: 'timed', mins, title, sub }),
};
const EXAMS = [
  { id: 'firstbank', name: 'First Bank', org: 'First Bank of Nigeria, graduate trainee',
    desc: 'Critical, verbal, abstract and numerical reasoning from First Bank past papers, with every figure and data table.',
    modes: [M.t(60, 'Standard paper', 'The real First Bank clock.'), M.t(90, 'Extended paper', 'More time for a deeper session.'), M.t(30, 'Speed drill', 'Half the time, to build pace.'), M.free], ac: true },
  { id: 'gtbank', name: 'GTBank', org: 'GTBank and GTCO, entry level',
    desc: 'Numerical, verbal, critical and abstract reasoning from past papers and assessment screenshots.',
    modes: [M.t(60, 'Standard paper', 'The real GTBank clock.'), M.t(45, 'Speed drill', 'A tighter clock to build pace.'), M.t(90, 'Extended paper', 'More time for a deeper session.'), M.free] },
  { id: 'premiumtrust', name: 'Premium Trust', org: 'Premium Trust Bank, graduate trainee',
    desc: 'Numerical, verbal, abstract, logical and critical reasoning, plus banking, economics and ICT.',
    modes: [M.t(60, 'Standard paper', 'The real test clock.'), M.t(45, 'Speed drill', 'A tighter clock to build pace.'), M.t(90, 'Extended paper', 'More time for a deeper session.'), M.free] },
  { id: 'deloitte', name: 'Deloitte', org: 'Deloitte graduate aptitude, with Dragnet', essay: true,
    desc: 'Quantitative, verbal and abstract reasoning and general knowledge from the 2024 assessment and the study pack, the 100 Dragnet chart questions, and a timed essay test.',
    modes: [M.t(60, 'Standard paper', 'A full mixed paper.'), M.t(45, 'Intensive', 'A balanced challenge against the clock.'), M.t(30, 'Speed drill', 'Half the time, to build pace.'), M.free] },
  { id: 'workforce', name: 'Workforce', org: 'Workforce Group ability test',
    desc: 'Five Workforce ability papers plus the 2026 Newcross and Top Talent screenshots: verbal, numerical, abstract and critical reasoning, and general knowledge.',
    modes: [{ mode: 'free', mins: 0, title: 'Deadline revision', sub: 'Every question from the Newcross and Top Talent 2026 screenshots, with full working.', only: 'dl', all: true },
      M.t(50, 'Real conditions', '50 questions in 50 minutes, no calculator.'), M.t(35, 'Speed drill', 'A tighter clock to build pace.'), M.free] },
  { id: 'ey', name: 'EY', org: 'EY, Jobberman aptitude',
    desc: 'Logical, numerical, verbal and critical reasoning rebuilt from EY assessment screenshots.',
    modes: [M.t(30, 'Speed drill', 'Half the time, to build pace.'), M.t(40, 'Intensive', 'A balanced challenge against the clock.'), M.t(60, 'Standard paper', 'The real EY clock.'), M.free] },
  { id: 'seplat', name: 'SEPLAT', org: 'SEPLAT Energy, graduate',
    desc: 'Numerical, quantitative and verbal reasoning, plus banking, finance and general knowledge.',
    modes: [M.t(60, 'Standard paper', 'The real countdown.'), M.t(90, 'Extended paper', 'More time for a deeper session.'), M.free] },
  { id: 'access', name: 'Access Bank', org: 'Access Bank, graduate trainee',
    desc: 'Quantitative and verbal reasoning, critical reasoning, patterns and general knowledge.',
    modes: [M.t(90, 'Full paper', 'The real Access Bank clock, no calculator.'), M.t(60, 'Speed drill', 'A tighter clock to build pace.'), M.t(45, 'Intensive drill', 'Fast, focused practice.'), M.free] },
  { id: 'general', name: 'General Aptitude', org: 'Mixed practice set',
    desc: 'A general numerical and verbal reasoning set that suits any graduate-trainee test.',
    modes: [M.t(40, 'Timed', 'A 40-minute countdown.'), M.t(60, 'Extended', 'An hour against the clock.'), M.free] },
];
const EXAM = Object.fromEntries(EXAMS.map((e) => [e.id, e]));
const REG = window.PREP_REGISTRY || {};
const SESSION_SIZE = 50;
const KEYS = ['A', 'B', 'C', 'D', 'E'];
const TOTAL = Object.values(REG).reduce((s, r) => s + r.count, 0);
// Some logic items have more than one valid option; `alsoOk` lists the extra ones.
const isRight = (q, i) => i === q.ans || (q.alsoOk || []).includes(i);
const answerText = (q) => [q.ans, ...(q.alsoOk || [])].sort().map((i) => `${KEYS[i]}) ${q.opts[i]}`).join('  or  ');

// ─── Small DOM helpers ───────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const k of kids.flat()) if (k !== null && k !== undefined && k !== false) el.append(k instanceof Node ? k : String(k));
  return el;
}
const clear = (el) => { el.replaceChildren(); return el; };
const fill = (el, ...kids) => { el.replaceChildren(...kids.flat().filter((k) => k !== null && k !== undefined && k !== false)); return el; };
const fmt = (n) => Number(n).toLocaleString();
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; // a clock, not an index. taste-skill-ignore
const meter = (pct, label) => { const s = h('span'); s.style.width = pct + '%'; return h('div', { class: 'meter', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': label }, s); };
const leaderRow = (left, right, cls = 'r-row') => h('p', { class: cls }, h('span', { text: left }), h('i', { 'aria-hidden': 'true' }), h('span', { text: right }));

// ─── Storage (all access guarded: private mode or blocked storage must not break the app) ─
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage full or blocked */ } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } },
};
let PROGRESS = store.get('prep_progress', { exams: {}, sessions: [], favs: [] });
const saveProgress = () => store.set('prep_progress', PROGRESS);
const examProg = (id) => (PROGRESS.exams[id] = PROGRESS.exams[id] || { seen: {} });
function completion(id) {
  const total = (REG[id] && REG[id].count) || 0;
  const seen = Object.keys(examProg(id).seen).length;
  return { total, seen, pct: total ? Math.min(100, Math.round((seen / total) * 100)) : 0 };
}
function accuracy(id) {
  const vals = Object.values(examProg(id).seen);
  return vals.length ? Math.round((vals.filter(Boolean).length / vals.length) * 100) : null;
}

// ─── Question bank loading (one script per exam, loaded on demand) ───────────
window.PREP_DATA = window.PREP_DATA || {};
const loading = {};
function loadBank(id) {
  if (window.PREP_DATA[id]) return Promise.resolve(window.PREP_DATA[id]);
  if (!EXAM[id]) return Promise.reject(new Error('Unknown exam'));
  return (loading[id] = loading[id] || new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `data/${id}.js`;
    s.onload = () => (window.PREP_DATA[id] ? resolve(window.PREP_DATA[id]) : reject(new Error('Bank did not load')));
    s.onerror = () => { delete loading[id]; reject(new Error('Could not load questions')); };
    document.head.append(s);
  }));
}

// ─── Topics (categories merged across exams) ─────────────────────────────────
function topicKey(cat) { return cat.trim().toLowerCase().replace(/\s+/g, ' '); }
function buildTopics() {
  const t = {};
  for (const [id, r] of Object.entries(REG)) {
    for (const [cat, n] of Object.entries(r.cats || {})) {
      const k = topicKey(cat);
      t[k] = t[k] || { key: k, name: cat, count: 0, exams: new Set() };
      t[k].count += n; t[k].exams.add(id);
    }
  }
  return Object.values(t).filter((x) => x.count >= 15).sort((a, b) => b.count - a.count);
}
const TOPICS = buildTopics();

// ─── Navigation ──────────────────────────────────────────────────────────────
let currentView = 'dashboard';
function showView(name, anchor) {
  if (session && session.timer && name !== 'quiz' && name !== 'result') stopTimer();
  if (name !== 'essay' && typeof Essay !== 'undefined' && Essay.timer) { Essay.count(); Essay.stop(); }
  const changed = name !== currentView;
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === 'v-' + name));
  document.querySelectorAll('.bar-links [data-nav]').forEach((n) => n.classList.toggle('active', n.dataset.nav === name && (name !== 'dashboard' || !!anchor)));
  document.body.classList.toggle('in-quiz', name === 'quiz' || (name === 'essay' && !$('essay-write').hidden));
  currentView = name;
  if (name === 'dashboard') renderHome();
  if (name === 'topics') renderTopics();
  if (name === 'progress') renderProgress();
  if (name === 'ac') renderAc();
  if (name === 'settings') renderSettings();
  if (name === 'about') renderAbout();
  if (anchor && $(anchor)) scrollToEl($(anchor), !changed);
  else window.scrollTo({ top: 0, behavior: 'instant' });
  observeRise();
}

function scrollToEl(el, smooth) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: smooth && !reduce ? 'smooth' : 'instant' });
}

// ─── Home ────────────────────────────────────────────────────────────────────
function testBar(e, open) {
  const c = completion(e.id), r = REG[e.id] || { cats: {} }, acc = accuracy(e.id);
  const cats = Object.entries(r.cats).sort((a, b) => b[1] - a[1]);
  const panel = h('div', { class: 'bar-panel' },
    h('p', { class: 'desc', text: e.desc }),
    h('ul', { class: 'items' }, ...cats.map(([cat, n]) => h('li', {}, h('span', { text: cat }), h('i', { 'aria-hidden': 'true' }), h('span', { text: fmt(n) })))),
    h('ul', { class: 'items' }, h('li', {}, h('span', { text: 'Answered so far' }), h('i', { 'aria-hidden': 'true' }), h('span', { text: `${fmt(c.seen)} of ${fmt(c.total)}${acc === null ? '' : `, ${acc}% right`}` }))),
    meter(c.pct, `${e.name} completion`),
    h('div', { class: 'row' },
      h('button', { class: 'btn', text: `Open ${e.name}`, onclick: () => openExam(e.id) }),
      h('button', { class: 'btn quiet', text: 'Quick practice', onclick: () => { currentExam = e.id; selectedCats.clear(); startExam(M.free); } }),
      e.essay ? h('button', { class: 'btn quiet', text: 'Essay test', onclick: () => Essay.open(e.id) }) : null));
  return h('details', { class: 'bar-item', open: open || undefined },
    h('summary', {}, h('span', { text: e.name }), h('span', { class: 'count', text: fmt(c.total) }), h('span', { class: 'plus', 'aria-hidden': 'true', text: '+' })),
    panel);
}

// Real worked answers printed on the showcase slips (copied verbatim from the banks).
const SLIPS = [
  { b: 'Dragnet, numerical', l: ['Which two media make £6.15bn of 2011 advertising?', 'TV 21% × 20.5 = 4.305', 'Magazines 9% × 20.5 = 1.845', '4.305 + 1.845 = 6.15', 'Answer: E, Magazines and Television'] },
  { b: 'Workforce 5.0, verbal', l: ['Offshoring is synonymous with outsourcing.', 'Offshoring is outsourcing “when functions are moved abroad”.', 'A kind of outsourcing, not another word for it.', 'Answer: False'] },
  { b: 'Workforce 4.0, numerical', l: ['Judy is twice Adam’s age; six years ago five times.', '2A − 6 = 5(A − 6)', '3A = 24, so A = 8', 'Answer: Judy is 16'] },
  { b: 'Access Bank, quantitative', l: ['12 miles on a 4/5 tank. How far on 1/3?', 'Full tank = 12 ÷ 4/5 = 15 miles', '15 × 1/3 = 5', 'Answer: E, 5 miles'] },
  { b: 'Deloitte, quantitative', l: ['Two taps fill 2/5 in 20 minutes; one runs dry.', 'Key says C, 15 minutes.', 'Working says 60 minutes.', 'You see both, with the reason.'] },
  { b: 'First Bank, verbal', l: ['Prosecuting trespass is very difficult.', 'The passage says trespass is usually only a civil wrong.', 'It never says how hard prosecution is.', 'Answer: Can’t say'] },
];

function renderHome() {
  const timing = $('v-dashboard').querySelector('.timing');
  if (!timing.children.length) timing.append(...Array.from({ length: 40 }, () => h('span')));
  $('hero-sub').textContent = `${fmt(TOTAL)} past questions from nine graduate-trainee tests, every one worked and explained.`;
  fill($('test-bars'), ...EXAMS.map((e, i) => testBar(e, i === 0)));
  if (!$('slips').children.length) {
    const heights = [38, 30, 44, 34, 40, 27];
    $('slips').append(...SLIPS.map((s, i) => {
      const el = h('div', { class: 'slip rise' }, h('b', { text: s.b }), h('p', { class: 'cut', 'aria-hidden': 'true', text: '- - - - - - - - - - - - - - - -' }), ...s.l.map((x) => h('p', { text: x })));
      el.style.height = heights[i] + 'svh';
      el.style.setProperty('--d', i * 80 + 'ms');
      return el;
    }));
  }
  $('stats-total').textContent = fmt(TOTAL);
  const groups = [['Banks', ['firstbank', 'gtbank', 'premiumtrust', 'access']], ['Firms', ['deloitte', 'workforce', 'ey']], ['Other', ['seplat', 'general']]];
  fill($('stats-receipt'),
    ...groups.flatMap(([g, ids]) => [h('p', { class: 'r-group', text: g }), ...ids.map((id) => leaderRow(EXAM[id].name, fmt(REG[id] ? REG[id].count : 0)))]),
    h('p', { class: 'r-total' }, h('span', { text: 'Total' }), h('span', { text: fmt(TOTAL) })));
  Try.ensure();
}

// The live thing: one real question on the answer-sheet stub.
const Try = {
  pool: null, q: null,
  async ensure() { if (!this.q) await this.next(); },
  async next() {
    try {
      if (!this.pool) {
        const bank = await loadBank('workforce');
        this.pool = bank.filter((q) => !q.img && !q.passage && q.q.length < 170 && q.opts.length >= 4 && /Numerical|General|Critical/.test(q.cat));
      }
      this.q = this.pool[Math.floor(Math.random() * this.pool.length)];
      this.paint();
    } catch (e) { $('try-q').textContent = 'The sample question could not load. Choose a test below instead.'; }
  },
  paint(chosen) {
    const q = this.q, done = chosen !== undefined;
    $('try-src').textContent = `${q.src}, ${q.cat.toLowerCase()}`;
    $('try-q').textContent = q.q;
    fill($('try-opts'), ...q.opts.map((o, i) => {
      let cls = 'bubble';
      if (done && isRight(q, i)) cls += ' correct'; else if (done && i === chosen) cls += ' wrong';
      return h('button', { class: cls, disabled: done, onclick: () => this.paint(i), 'aria-label': `Option ${KEYS[i]}: ${o}` },
        h('span', { class: 'dot', text: KEYS[i] }), h('span', { text: o }));
    }));
    const res = $('try-result');
    res.hidden = !done; $('try-next').hidden = !done;
    if (done) {
      const ok = isRight(q, chosen);
      fill(res, h('p', { class: 'verdict', text: ok ? 'Right.' : `Not quite. The answer is ${KEYS[q.ans]}.` }), h('p', { text: q.exp }));
    }
  },
};

// ─── Exam page ───────────────────────────────────────────────────────────────
let currentExam = null;
const selectedCats = new Set();
function openExam(id) {
  const e = EXAM[id]; if (!e) return;
  currentExam = id; selectedCats.clear();
  const r = REG[id] || { count: 0, cats: {} };
  $('exam-title').textContent = e.name;
  $('exam-sub').textContent = `${e.desc} Each paper draws ${SESSION_SIZE} questions at random.`;
  const c = completion(id), acc = accuracy(id);
  const fact = (b, s) => h('div', { class: 'fact' }, h('b', { text: b }), h('span', { text: s }));
  fill($('exam-stats'), fact(fmt(r.count), 'questions'), fact(Object.keys(r.cats).length, 'topics'), fact(c.pct + '%', 'done'), fact(acc === null ? 'none yet' : acc + '%', 'right'));
  renderCats();
  fill($('mode-grid'), ...e.modes.map((m) => h('button', { class: 'mode', onclick: () => startExam(m) },
    h('span', {}, h('span', { class: 'mode-title', text: m.title }), h('br'), h('span', { class: 'mode-sub', text: m.sub })),
    h('span', { class: 'mode-time', text: m.mins ? `${m.mins} min` : 'no clock' }))));
  fill($('exam-extra'), e.ac ? h('button', { class: 'btn quiet', text: 'Assessment centre prep', onclick: () => showView('ac') }) : null,
    e.essay ? h('button', { class: 'btn quiet', text: 'Essay test (20 min, marked by the tutor)', onclick: () => Essay.open(e.id) }) : null);
  showView('exam');
  loadBank(id).catch(() => {}); // warm the cache while the user picks a mode
}
function renderCats() {
  const cats = (REG[currentExam] && REG[currentExam].cats) || {};
  const all = h('button', { class: 'chip', 'aria-pressed': String(selectedCats.size === 0), onclick: () => { selectedCats.clear(); renderCats(); } }, 'All topics');
  fill($('exam-cats'), all, ...Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([cat, n]) =>
    h('button', { class: 'chip', 'aria-pressed': String(selectedCats.has(cat)), onclick: () => { selectedCats.has(cat) ? selectedCats.delete(cat) : selectedCats.add(cat); renderCats(); } },
      cat, h('span', { class: 'n', text: n }))));
}
function renderTopics() {
  fill($('grid-topics'), ...TOPICS.map((t) => h('button', { class: 'bar-row', onclick: () => startTopic(t) },
    h('span', { text: t.name }),
    h('span', { class: 'count', text: `${fmt(t.count)} from ${t.exams.size} test${t.exams.size > 1 ? 's' : ''}` }))));
}

// ─── Entrances ───────────────────────────────────────────────────────────────
let riser = null;
function observeRise() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.rise').forEach((el) => el.classList.add('in')); return; }
  riser = riser || new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); riser.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.view.active .rise:not(.in), .foot .rise:not(.in)').forEach((el) => riser.observe(el));
}

// ─── Quiz session ────────────────────────────────────────────────────────────
let session = null;
async function startExam(m) {
  let bank;
  try { bank = await loadBank(currentExam); } catch (e) { alert('Sorry, the questions could not be loaded. Check your connection and try again.'); return; }
  const base = m.only ? bank.filter((q) => q[m.only]) : bank;
  const pool = selectedCats.size ? base.filter((q) => selectedCats.has(q.cat)) : base;
  begin({ kind: 'exam', examId: currentExam, label: m.only ? `${EXAM[currentExam].name} ${m.title.toLowerCase()}` : EXAM[currentExam].name, mode: m.mode, mins: m.mins, pool, cats: [...selectedCats], all: m.all });
}
async function startTopic(t) {
  let pool = [];
  try {
    for (const id of t.exams) {
      const bank = await loadBank(id);
      pool = pool.concat(bank.filter((q) => topicKey(q.cat) === t.key).map((q) => Object.assign({ _exam: id }, q)));
    }
  } catch (e) { alert('Sorry, the questions could not be loaded.'); return; }
  begin({ kind: 'topic', examId: null, label: t.name, mode: 'free', mins: 0, pool, topic: t });
}
function begin(cfg) {
  const qs = shuffle([...cfg.pool]).slice(0, cfg.all ? undefined : SESSION_SIZE);
  if (!qs.length) { alert('No questions match the selected topics.'); return; }
  stopTimer();
  session = Object.assign(cfg, { qs, cur: 0, answered: {}, skipped: new Set(), correct: 0, wrong: 0, reviewing: false, paused: false, timeLeft: cfg.mins * 60, timer: null, saved: false });
  const timed = cfg.mode !== 'free';
  $('timer').hidden = !timed; $('pause-btn').hidden = !timed;
  if (timed) { $('timer').textContent = fmtTime(session.timeLeft); startTimer(); }
  showView('quiz');
  render();
}
function startTimer() {
  stopTimer();
  session.timer = setInterval(() => {
    if (session.paused) return;
    session.timeLeft--;
    const t = $('timer'); t.textContent = fmtTime(Math.max(0, session.timeLeft)); t.classList.toggle('warn', session.timeLeft < 120);
    if (session.timeLeft <= 0) finish();
  }, 1000);
}
function stopTimer() { if (session && session.timer) { clearInterval(session.timer); session.timer = null; } }
const examOf = (q) => q._exam || session.examId;

function render() {
  const s = session, q = s.qs[s.cur], n = s.qs.length, isAns = s.answered[s.cur] !== undefined;
  $('q-counter').textContent = `${s.reviewing ? 'Review' : 'Question'} ${s.cur + 1} of ${n}`;
  $('prog-fill').style.width = ((s.cur + 1) / n * 100).toFixed(0) + '%';
  $('s-correct').textContent = s.correct; $('s-wrong').textContent = s.wrong;
  $('s-remain').textContent = n - Object.keys(s.answered).length;
  $('q-tag').textContent = q.cat;
  $('q-src').textContent = [s.kind === 'topic' ? EXAM[examOf(q)].name : null, q.src].filter(Boolean).join(' · ');

  const pas = $('q-passage');
  pas.hidden = !q.passage; $('q-passage-body').textContent = q.passage || '';
  if (q.passage && pas.dataset.text !== q.passage) { pas.open = true; pas.dataset.text = q.passage; }

  $('q-text').textContent = q.q;
  const fig = $('q-figure');
  if (q.img) { fig.hidden = false; $('q-figure-img').src = q.img; $('q-figure-label').textContent = q.imgLabel || 'Figure'; }
  else { fig.hidden = true; $('q-figure-img').removeAttribute('src'); }

  const opts = clear($('opts'));
  q.opts.forEach((o, i) => {
    let cls = 'opt';
    if (isAns && isRight(q, i)) cls += ' correct';
    else if (isAns && i === s.answered[s.cur]) cls += ' wrong';
    opts.append(h('button', { class: cls, role: 'listitem', disabled: isAns || s.reviewing, onclick: () => pick(i), 'aria-label': `Option ${KEYS[i]}: ${o}` },
      h('span', { class: 'opt-key', text: KEYS[i] }), h('span', { class: 'opt-txt', text: o })));
  });

  const exp = $('exp');
  if (isAns) {
    const ok = isRight(q, s.answered[s.cur]);
    exp.hidden = false;
    const head = $('exp-head'); head.className = 'exp-head ' + (ok ? 'ok' : 'err');
    head.textContent = ok ? 'Right.' : `Not quite. You chose ${KEYS[s.answered[s.cur]]}.`;
    fill($('exp-body'), 
      h('div', { class: 'exp-answer', text: `Answer: ${answerText(q)}` }),
      h('div', { text: q.exp || 'No written working for this question yet. Ask the tutor below.' }),
      q.note ? h('div', { class: 'exp-note' }, h('strong', { text: 'Note on this question: ' }), q.note) : null);
  } else if (s.reviewing) {
    exp.hidden = false; $('exp-head').className = 'exp-head'; $('exp-head').textContent = 'Not answered';
    fill($('exp-body'), h('div', { class: 'exp-answer', text: `Answer: ${answerText(q)}` }), h('div', { text: q.exp || '' }), q.note ? h('div', { class: 'exp-note', text: 'Note on this question: ' + q.note }) : null);
  } else exp.hidden = true;

  Tutor.attach(q, isAns || s.reviewing ? s.answered[s.cur] : undefined, isAns || s.reviewing);
  renderDots();
  $('btn-prev').disabled = s.cur === 0;
  $('btn-next').textContent = s.cur === n - 1 ? (s.reviewing ? 'Back to results' : 'Finish') : 'Next →';
  $('btn-skip').hidden = isAns || s.reviewing;
}
function renderDots() {
  const s = session;
  fill($('dots'), ...s.qs.map((q, i) => {
    let cls = 'dot-btn';
    if (i === s.cur) cls += ' current';
    if (s.answered[i] !== undefined) cls += isRight(q, s.answered[i]) ? ' ok' : ' err';
    else if (s.skipped.has(i)) cls += ' skipped';
    return h('button', { class: cls, text: i + 1, title: q.cat, 'aria-label': `Go to question ${i + 1}`, onclick: () => { s.cur = i; render(); } });
  }));
}
function pick(i) {
  const s = session, q = s.qs[s.cur];
  if (s.answered[s.cur] !== undefined || s.reviewing) return;
  s.answered[s.cur] = i; s.skipped.delete(s.cur);
  const ok = isRight(q, i);
  if (ok) s.correct++; else s.wrong++;
  const ex = examOf(q);
  if (ex && q.id) { examProg(ex).seen[q.id] = ok ? 1 : 0; saveProgress(); }
  render();
}
function go(dir) {
  const s = session;
  if (dir === 1 && s.cur === s.qs.length - 1) { if (s.reviewing) showView('result'); else finish(); return; }
  s.cur = Math.max(0, Math.min(s.qs.length - 1, s.cur + dir)); render();
}
function skip() { const s = session; s.skipped.add(s.cur); if (s.cur < s.qs.length - 1) s.cur++; render(); }
function togglePause() {
  const s = session; if (!s || s.mode === 'free') return;
  s.paused = !s.paused;
  $('pause-overlay').hidden = !s.paused;
  $('pause-btn').textContent = s.paused ? 'Resume' : 'Pause';
  $('pause-time').textContent = fmtTime(Math.max(0, s.timeLeft));
}

// ─── Results ─────────────────────────────────────────────────────────────────
function finish() {
  const s = session; stopTimer();
  if (s.paused) togglePause();
  $('end-overlay').hidden = true;
  const attempted = Object.keys(s.answered).length;
  const pct = attempted ? Math.round((s.correct / attempted) * 100) : 0;
  $('r-pct').textContent = pct + '%';
  const modeLabel = s.mode === 'free' ? 'practice, no clock' : `${s.mins}-minute paper`;
  $('r-mode').textContent = `${s.label}, ${modeLabel}`;
  let grade, msg;
  if (pct >= 80) { grade = 'Ready for the real paper.'; msg = 'Review anything you missed to push higher.'; }
  else if (pct >= 65) { grade = 'Good, with a few gaps.'; msg = 'Read the working for the ones you missed and aim for 80%.'; }
  else if (pct >= 50) { grade = 'A solid base.'; msg = 'Drill the weakest topics below.'; }
  else { grade = 'Keep going.'; msg = 'Read the working closely, find your weak topics and sit another paper soon.'; }
  $('r-grade').textContent = grade;
  const skipped = s.qs.length - attempted;
  $('r-msg').textContent = `${s.correct} of ${attempted} right${skipped ? `, ${skipped} unanswered` : ''}. ${msg}`;
  const cats = [...new Set(s.qs.map((q) => q.cat))];
  fill($('r-breakdown'), h('p', { class: 'r-group', text: 'By topic' }), ...cats.flatMap((cat) => {
    const idx = s.qs.map((q, i) => (q.cat === cat ? i : -1)).filter((i) => i >= 0);
    const ans = idx.filter((i) => s.answered[i] !== undefined), cor = idx.filter((i) => s.answered[i] !== undefined && isRight(s.qs[i], s.answered[i]));
    const cp = ans.length ? Math.round((cor.length / ans.length) * 100) : 0;
    const bar = h('span'); bar.style.width = cp + '%';
    return [leaderRow(cat, `${cor.length} of ${ans.length}`), h('div', { class: 'bd-meter', 'aria-hidden': 'true' }, bar)];
  }), h('p', { class: 'r-total' }, h('span', { text: 'Score' }), h('span', { text: `${s.correct} of ${attempted}, ${pct}%` })));
  if (!s.saved && attempted) {
    s.saved = true;
    PROGRESS.sessions.unshift({ exam: s.examId, label: s.label, mode: modeLabel, correct: s.correct, attempted, total: s.qs.length, at: Date.now() });
    PROGRESS.sessions = PROGRESS.sessions.slice(0, 40);
    saveProgress();
  }
  showView('result');
}
function review() { session.reviewing = true; session.cur = 0; $('timer').hidden = true; $('pause-btn').hidden = true; showView('quiz'); render(); }
function again() { if (session.kind === 'topic') startTopic(session.topic); else openExam(session.examId); }

// ─── Progress view ───────────────────────────────────────────────────────────
function renderProgress() {
  fill($('progress-grid'), ...EXAMS.map((e) => {
    const c = completion(e.id), acc = accuracy(e.id);
    return h('button', { class: 'prog-row', onclick: () => openExam(e.id) },
      h('span', { class: 'mode-title', text: e.name }),
      h('span', { class: 'sub', text: c.seen ? `${c.pct}% done, ${acc}% right` : 'not started' }),
      meter(c.pct, `${e.name} completion`));
  }));
  const list = clear($('progress-sessions'));
  if (!PROGRESS.sessions.length) list.append(h('p', { text: 'No finished papers yet. Your scores will be listed here.' }));
  else list.append(h('p', { class: 'r-group', text: 'Latest first' }), ...PROGRESS.sessions.map((x) => leaderRow(`${x.label}, ${new Date(x.at).toLocaleDateString()}`, `${x.correct} of ${x.attempted}, ${Math.round((x.correct / x.attempted) * 100)}%`)));
}

// ─── AI tutor ────────────────────────────────────────────────────────────────
const DEFAULT_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'llama-3.3-70b-versatile', 'qwen/qwen3.6-27b'];
const DEFAULT_VISION = 'meta-llama/llama-4-scout-17b-16e-instruct';
const KEY_NAME = 'GROQ_API_KEY';
const Key = {
  get() { try { return sessionStorage.getItem(KEY_NAME) || localStorage.getItem(KEY_NAME) || ''; } catch (e) { return ''; } },
  set(v, remember) {
    try {
      sessionStorage.setItem(KEY_NAME, v);
      if (remember) localStorage.setItem(KEY_NAME, v); else localStorage.removeItem(KEY_NAME);
    } catch (e) { /* storage blocked: key lives only for this page */ Key.mem = v; }
  },
  clear() { try { sessionStorage.removeItem(KEY_NAME); localStorage.removeItem(KEY_NAME); } catch (e) { /* ignore */ } Key.mem = ''; },
  remembered() { try { return !!localStorage.getItem(KEY_NAME); } catch (e) { return false; } },
};
const models = () => { const m = store.get('prep_ai_models', null); return Array.isArray(m) && m.length ? m : DEFAULT_MODELS; };
const visionModel = () => { const v = store.get('prep_ai_vision', null); return v === null ? DEFAULT_VISION : v; };

const Tutor = {
  q: null, chosen: undefined, history: [], busy: false,
  chats: store.get('prep_chat_v2', {}),
  attach(q, chosen, enabled) {
    this.q = q; this.chosen = chosen; this.busy = false;
    $('tutor').hidden = !enabled;
    $('tutor-send').disabled = false;
    this.history = (this.chats[q.id] && this.chats[q.id].msgs) || [];
    const open = this.history.length > 0;
    $('tutor-panel').hidden = !open; $('tutor-open').hidden = open;
    this.paint();
  },
  open() { $('tutor-panel').hidden = false; $('tutor-open').hidden = true; this.paint(); $('tutor-input').focus(); },
  save() {
    if (!this.q || !this.q.id) return;
    this.chats[this.q.id] = { at: Date.now(), msgs: this.history.slice(-20) };
    const ids = Object.keys(this.chats);
    if (ids.length > 150) ids.sort((a, b) => this.chats[a].at - this.chats[b].at).slice(0, ids.length - 150).forEach((k) => delete this.chats[k]);
    store.set('prep_chat_v2', this.chats);
  },
  clearChat() { this.history = []; if (this.q) delete this.chats[this.q.id]; store.set('prep_chat_v2', this.chats); this.paint(); },
  paint(extra) {
    const box = clear($('tutor-msgs'));
    $('tutor-model').textContent = this.q && this.q.img && visionModel() ? 'reads the figure too' : '';
    if (!this.history.length && !extra) box.append(h('div', { class: 'msg assistant', text: 'Ask me why the answer is right, why another option is wrong, or for a faster method.' }));
    for (const m of this.history) box.append(renderMsg(m.role, m.content));
    if (!Key.get()) box.append(keyForm());
    if (extra) box.append(extra);
    box.scrollTop = box.scrollHeight;
  },
  systemPrompt() {
    const q = this.q, ex = EXAM[examOf(q)];
    const lines = [
      `You are a concise, accurate tutor helping a student prepare for the ${ex ? ex.name + ' (' + ex.org + ')' : 'graduate aptitude'} recruitment test.`,
      'Explain the reasoning behind the question below. Use the official answer as the source of truth; if you believe it is wrong, say so politely and show your working.',
      '', `TOPIC: ${q.cat}`,
    ];
    if (q.passage) lines.push('', 'PASSAGE / DATA BRIEF:', q.passage.slice(0, 6000));
    if (q.img) lines.push('', `FIGURE: the question uses a figure (“${q.imgLabel || 'figure'}”).${this.withImage ? ' It is attached to the first user message.' : ' You cannot see it, so rely on the official explanation for any values read from it and say so if needed.'}`);
    lines.push('', 'QUESTION:', q.q, '', 'OPTIONS:', ...q.opts.map((o, i) => `${KEYS[i]}) ${o}`),
      '', `CORRECT ANSWER: ${answerText(q)}`);
    if (this.chosen !== undefined) lines.push(`STUDENT CHOSE: ${KEYS[this.chosen]}) ${q.opts[this.chosen]}${isRight(q, this.chosen) ? ' (correct)' : ' (incorrect)'}`);
    if (q.exp) lines.push('', 'OFFICIAL EXPLANATION:', q.exp);
    if (q.note) lines.push('', 'EDITOR’S NOTE:', q.note);
    lines.push('', 'RULES:', '- Be direct. Refer to options by letter.', '- Keep replies under ~150 words unless a calculation needs more steps.',
      '- Show arithmetic line by line when numbers are involved.', '- No filler such as “great question”.', '- Plain text; **bold** is allowed sparingly.',
      '- Never use LaTeX or maths markup (no \\( \\), \\[ \\], $…$, \\frac, \\times). The reply is shown as plain text, so write maths the way you would type it: 3x − 2y = 24, x/4 − y/6 = 1, 5² = 25, √49 = 7, 12 × 3, 15 ÷ 5, ≤, ≥, ≠, ⇒.');
    return lines.join('\n');
  },
  async send(text) {
    text = (text || '').trim();
    if (!text || this.busy || !this.q) return;
    if (!Key.get()) { this.paint(); return; }
    this.busy = true; $('tutor-send').disabled = true;
    this.history.push({ role: 'user', content: text });
    const thinking = h('div', { class: 'msg thinking', text: 'Thinking…' });
    this.paint(thinking);
    try {
      const reply = await this.ask();
      this.history.push({ role: 'assistant', content: reply });
      this.save();
      this.paint();
    } catch (err) {
      this.history.pop(); // keep history clean so the question can be re-sent
      this.paint(renderMsg('system', err.message));
      if (err.auth) { Key.clear(); this.paint(renderMsg('system', err.message)); }
      $('tutor-input').value = text;
    } finally {
      this.busy = false; $('tutor-send').disabled = false;
    }
  },
  async ask() {
    const key = Key.get();
    let image = null;
    const vm = visionModel();
    if (this.q.img && vm) image = await toDataUrl(this.q.img).catch(() => null);
    const attempts = [];
    if (image) attempts.push({ model: vm, image });
    for (const m of models()) attempts.push({ model: m, image: null });
    let last = '';
    for (const a of attempts) {
      this.withImage = !!a.image;
      const msgs = this.history.map((m, i) => (i === 0 && a.image
        ? { role: 'user', content: [{ type: 'text', text: m.content }, { type: 'image_url', image_url: { url: a.image } }] }
        : { role: m.role, content: m.content }));
      let res;
      try {
        res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({ model: a.model, messages: [{ role: 'system', content: this.systemPrompt() }, ...msgs], temperature: 0.2, max_tokens: 700 }),
          referrerPolicy: 'no-referrer',
        });
      } catch (e) { last = 'Network error. Check your connection.'; continue; }
      let data = null;
      try { data = await res.json(); } catch (e) { /* non-JSON body */ }
      if (res.status === 401 || res.status === 403) {
        const err = new Error('Groq rejected the saved API key, so it has been removed. Enter a valid key to continue.'); err.auth = true; throw err;
      }
      const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      if (res.ok && content) return cleanReply(content);
      last = (data && data.error && data.error.message) || `HTTP ${res.status}`;
      if (res.status === 429) last = 'Rate limit reached on your Groq key. Wait a minute and try again.';
    }
    throw new Error('The tutor could not answer right now. ' + last + ' You can change the model list in Settings.');
  },
};
function cleanReply(t) { return delatex(String(t).replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/^#{1,6}\s*/gm, '')).trim() || '(empty reply)'; }

// Models still slip into LaTeX now and then; turn the common commands into readable plain text.
const TEX_SYMBOLS = {
  times: '×', div: '÷', cdot: '·', pm: '±', mp: '∓', le: '≤', leq: '≤', ge: '≥', geq: '≥', neq: '≠', ne: '≠', approx: '≈', equiv: '≡',
  Rightarrow: '⇒', Longrightarrow: '⇒', implies: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', iff: '⇔', rightarrow: '→', to: '→', longrightarrow: '→', leftarrow: '←',
  therefore: '∴', because: '∵', infty: '∞', circ: '°', degree: '°', percent: '%', ldots: '…', cdots: '…', dots: '…',
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', sigma: 'σ', Sigma: 'Σ', omega: 'ω',
  in: '∈', cup: '∪', cap: '∩', subset: '⊂', angle: '∠', triangle: '△', perp: '⊥', parallel: '∥', sum: 'Σ',
};
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻', '+': '⁺', n: 'ⁿ' };
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
const group = (s) => (/^[\w.²³]+$/.test(s) ? s : `(${s})`);
function delatex(s) {
  if (!/\\[a-zA-Z()[\]]|\$\$|\$[^$\n]*\\/.test(s)) return s;
  s = s.replace(/\\begin\{[a-z*]+\}|\\end\{[a-z*]+\}/g, '')
    .replace(/\$\$|\\\[|\\\]|\\\(|\\\)/g, '')
    .replace(/\$([^$\n]*\\[^$\n]*)\$/g, '$1')
    .replace(/\\(?:left|right|big|Big|bigg|displaystyle|limits)\b\s*/g, '')
    .replace(/\\(?:text|mathrm|mathbf|textbf|operatorname|mathit|boxed)\{([^{}]*)\}/g, '$1')
    .replace(/\\%/g, '%').replace(/\\\$/g, '$').replace(/\\&/g, '&').replace(/\\_/g, '_')
    .replace(/\\\\\s*/g, '\n').replace(/&(?=\s*[=<>≤≥≈])/g, '')
    .replace(/\\(?:quad|qquad|[,;:! ])/g, ' ');
  for (let i = 0; i < 6; i++) {
    const before = s;
    s = s.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (_, a, b) => `${group(a.trim())}/${group(b.trim())}`)
      .replace(/\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}/g, (_, n, a) => `${n === '3' ? '∛' : `(${n})√`}${group(a.trim())}`)
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, (_, a) => `√${group(a.trim())}`)
      .replace(/\{([^{}]*)\}\s*\^/g, '($1)^');
    if (s === before) break;
  }
  s = s.replace(/\^\s*\{?\\circ\}?/g, '°')
    .replace(/\^\{([^{}]*)\}|\^(\S)/g, (m, a, b) => { const x = a ?? b; return [...x].every((c) => SUP[c]) ? [...x].map((c) => SUP[c]).join('') : `^(${x})`; })
    .replace(/_\{([^{}]*)\}|_(\d)/g, (m, a, b) => { const x = a ?? b; return [...x].every((c) => SUB[c]) ? [...x].map((c) => SUB[c]).join('') : `_${x}`; })
    .replace(/\\([a-zA-Z]+)/g, (m, w) => (w in TEX_SYMBOLS ? TEX_SYMBOLS[w] : w))
    .replace(/[{}]/g, '')
    .replace(/[ \t]{2,}/g, ' ').replace(/[ \t]+$/gm, '').replace(/^[ \t]+/gm, '')
    .replace(/\n{3,}/g, '\n\n');
  return s;
}
function renderMsg(role, content) {
  const el = h('div', { class: 'msg ' + role });
  // Safe minimal formatting: **bold** becomes <strong>, everything else stays text.
  String(content).split(/(\*\*[^*\n]+\*\*)/g).forEach((part) => {
    if (/^\*\*[^*\n]+\*\*$/.test(part)) el.append(h('strong', { text: part.slice(2, -2) })); else if (part) el.append(part);
  });
  return el;
}
function keyForm(onSaved = () => Tutor.paint()) {
  const input = h('input', { type: 'password', placeholder: 'Paste your Groq API key (gsk_…)', autocomplete: 'off', spellcheck: 'false', maxlength: '200', 'aria-label': 'Groq API key' });
  const remember = h('input', { type: 'checkbox' });
  const form = h('form', { class: 'tutor-key' },
    h('strong', { text: 'Connect the AI tutor' }),
    h('span', { class: 'hint', text: 'The tutor uses your own free Groq key (console.groq.com → API Keys). It is sent only to api.groq.com.' }),
    input,
    h('label', { class: 'check small' }, remember, 'Remember on this device'),
    h('button', { class: 'btn sm', type: 'submit', text: 'Save key' }));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!/^[\w-]{20,200}$/.test(v)) { input.setCustomValidity('That does not look like a Groq key.'); input.reportValidity(); return; }
    Key.set(v, remember.checked); onSaved();
  });
  input.addEventListener('input', () => input.setCustomValidity(''));
  return form;
}
async function toDataUrl(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  if (blob.size > 3.5e6) throw new Error('image too large');
  return new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(blob); });
}

// ─── Essay test (Deloitte): timed typed essay, marked by the tutor ───────────
// The marker gets a RANGE of acceptable approaches per topic and is told to credit any clear,
// well-supported position. It also returns grammar and expression corrections as structured
// data, which is rendered as text and highlighted inside the essay (never as HTML).
const ESSAY_STORE = 'prep_essays_v1', ESSAY_DRAFT = 'prep_essay_draft';
const Essay = {
  set: null, topic: null, timer: null, endsAt: 0, untimed: false, current: null,
  open(examId = 'deloitte') {
    this.set = (window.PREP_ESSAYS || {})[examId];
    if (!this.set) return;
    this.examId = examId;
    this.stop();
    this.show('pick');
    $('essay-intro').textContent = `${this.set.instructions} The tutor then marks it against the ${this.set.source} criteria and corrects your grammar and expression.`;
    this.topic = null; $('essay-start').disabled = true;
    fill($('essay-topics'), ...this.set.topics.map((t, i) => h('button', { class: 'bar-row essay-topic', 'aria-pressed': 'false', onclick: (e) => this.choose(t, e.currentTarget) },
      h('span', {}, h('span', { class: 'mode-title', text: `Topic ${i + 1}: ${t.title}` }), h('br'), h('span', { class: 'mode-sub', text: t.prompt.length > 150 ? t.prompt.slice(0, 147) + '…' : t.prompt })))));
    this.history();
    const draft = store.get(ESSAY_DRAFT, null);
    if (draft && draft.text && this.set.topics.some((t) => t.id === draft.topicId)) {
      fill($('essay-history'), h('p', { class: 'r-group', text: 'Unfinished draft' }),
        h('p', { class: 'r-row' }, h('span', { text: this.set.topics.find((t) => t.id === draft.topicId).title }), h('i'), h('button', { class: 'link', text: 'Resume', onclick: () => this.resume(draft) })),
        ...$('essay-history').children);
    }
    showView('essay');
  },
  show(part) { ['pick', 'write', 'result'].forEach((p) => { $('essay-' + p).hidden = p !== part; }); },
  choose(t, btn) {
    this.topic = t;
    document.querySelectorAll('.essay-topic').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    $('essay-start').disabled = false;
  },
  start(text = '', secondsLeft) {
    if (!this.topic) return;
    this.untimed = $('essay-untimed').checked;
    $('essay-title').textContent = this.topic.title;
    $('essay-prompt').textContent = this.topic.prompt;
    const ta = $('essay-text'); ta.value = text; ta.readOnly = false;
    this.count();
    this.show('write');
    document.body.classList.add('in-quiz');
    this.startedAt = Date.now();
    const secs = secondsLeft !== undefined ? secondsLeft : this.set.minutes * 60;
    this.endsAt = Date.now() + secs * 1000;
    $('essay-timer').hidden = this.untimed;
    if (!this.untimed) { this.tick(); this.timer = setInterval(() => this.tick(), 500); }
    window.scrollTo({ top: 0, behavior: 'instant' });
    ta.focus();
  },
  resume(draft) {
    const t = this.set.topics.find((x) => x.id === draft.topicId); if (!t) return;
    this.topic = t;
    $('essay-untimed').checked = !draft.endsAt;
    const left = draft.endsAt ? Math.max(30, Math.round((draft.endsAt - draft.savedAt) / 1000)) : undefined;
    this.start(draft.text, left);
  },
  tick() {
    const left = Math.max(0, Math.round((this.endsAt - Date.now()) / 1000));
    const el = $('essay-timer'); el.textContent = fmtTime(left); el.classList.toggle('warn', left <= 120);
    if (left <= 0) { $('essay-text').readOnly = true; this.submit(true); }
  },
  stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } },
  words(t) { return (t.trim().match(/\S+/g) || []).length; },
  count() {
    const text = $('essay-text').value;
    $('essay-words').textContent = this.words(text);
    if (this.topic) store.set(ESSAY_DRAFT, { topicId: this.topic.id, text, endsAt: this.untimed ? 0 : this.endsAt, savedAt: Date.now() });
  },
  async submit(timeUp) {
    this.stop();
    document.body.classList.remove('in-quiz');
    const text = $('essay-text').value.trim();
    if (this.words(text) < 30 && !timeUp) { if (!confirm('Your essay is under 30 words. Submit it anyway?')) { if (!this.untimed) this.timer = setInterval(() => this.tick(), 500); document.body.classList.add('in-quiz'); return; } }
    store.del(ESSAY_DRAFT);
    const used = Math.round((Date.now() - this.startedAt) / 1000);
    this.current = { id: 'e' + Date.now(), topicId: this.topic.id, title: this.topic.title, text, words: this.words(text), secondsUsed: used, untimed: this.untimed, timeUp: !!timeUp, at: Date.now(), grade: null };
    this.saveAttempt();
    this.show('result');
    window.scrollTo({ top: 0, behavior: 'instant' });
    await this.mark();
  },
  saveAttempt() {
    const all = store.get(ESSAY_STORE, []).filter((a) => a.id !== this.current.id);
    all.unshift(this.current);
    store.set(ESSAY_STORE, all.slice(0, 30));
  },
  history() {
    const all = store.get(ESSAY_STORE, []).filter((a) => this.set.topics.some((t) => t.id === a.topicId));
    if (!all.length) { fill($('essay-history'), h('p', { text: 'No essays yet. Your marked essays will be listed here.' })); return; }
    fill($('essay-history'), h('p', { class: 'r-group', text: 'Latest first' }),
      ...all.map((a) => h('p', { class: 'r-row' },
        h('button', { class: 'link', text: `${a.title}, ${new Date(a.at).toLocaleDateString()}`, onclick: () => { this.current = a; this.topic = this.set.topics.find((t) => t.id === a.topicId); this.show('result'); showView('essay'); this.render(); } }),
        h('i'), h('span', { text: a.grade ? `${a.grade.total}/100` : 'not marked' }))));
  },
  // ── Marking ──
  prompt() {
    const t = this.topic, s = this.set, g = t.guide;
    const crit = s.criteria.map((c) => `- ${c.key} (0–${c.weight}): ${c.name}. ${c.desc}`).join('\n');
    const ranges = g.positions.map((p) => `• ${p.stance}: ${p.points.join(' | ')}`).join('\n');
    return [
      `You are an experienced assessor marking a typed essay written in a timed test (${s.minutes} minutes) for the ${s.source}, a graduate recruitment assessment in Nigeria.`,
      '', `ESSAY QUESTION:\n${t.prompt}`,
      '', `WHAT THE QUESTION ASSESSES: ${g.assesses}`,
      '', 'REFERENCE NOTES: a RANGE of acceptable approaches. This is not a model answer and not a checklist.',
      ranges, `Useful examples: ${g.examples.join(' | ')}`, `Typical structure: ${g.structure}`, `Common pitfalls: ${g.pitfalls.join(' | ')}`,
      '', 'MARKING PRINCIPLES:',
      '- Self-expression and reasoning are being assessed, so there is no single correct answer. Give full credit to ANY clear, well-reasoned position, including positions or examples not in the notes. Never penalise a stance for disagreeing with the notes.',
      '- Judge the quality of reasoning, relevance to every part of the question, use of evidence, organisation and language. Penalise a factual claim only when it is clearly wrong, and say why.',
      `- Calibrate to what a strong graduate can write in ${s.minutes} minutes (about 350–550 words). A short essay can still score well on reasoning, but loses structure marks if it is underdeveloped.`,
      '- Be specific: quote or refer to the essay’s own words. Be encouraging but honest.',
      '', `CRITERIA (score each as an integer within its range):\n${crit}`,
      '', 'GRAMMAR AND EXPRESSION: find errors in grammar, spelling, punctuation, word choice, tense, agreement, and awkward or unclear expression. For each, copy the shortest exact excerpt from the essay (verbatim, so it can be found in the text), give the corrected version, and a short reason. List up to 20, most important first. British or Nigerian English spellings are acceptable. If the language is clean, return an empty list.',
      '', 'Return ONLY a JSON object with exactly these keys:',
      '{"scores":{"relevance":0,"argument":0,"evidence":0,"structure":0,"language":0},"position":"one sentence: the stance the essay takes","summary":"2–3 sentences of overall feedback","strengths":["…"],"improvements":["specific, actionable"],"missed_angles":["valid points or examples the essay could have used"],"corrections":[{"original":"exact excerpt","corrected":"fixed text","why":"short reason"}],"improved_paragraph":"a rewrite of the essay’s weakest paragraph in the student’s own voice, corrected and strengthened"}',
    ].join('\n');
  },
  async mark() {
    this.render();
    if (!Key.get()) return;
    const a = this.current;
    $('essay-band').textContent = 'Marking…';
    $('essay-summary').textContent = 'The tutor is reading your essay. This usually takes 10–30 seconds.';
    try {
      const raw = await this.call(a.text);
      a.grade = this.parse(raw);
      a.grade.model = this.lastModel;
      this.saveAttempt();
      PROGRESS.sessions.unshift({ exam: this.examId, label: `${EXAM[this.examId].name} essay`, mode: a.title, correct: a.grade.total, attempted: 100, total: 100, at: a.at });
      PROGRESS.sessions = PROGRESS.sessions.slice(0, 40); saveProgress();
    } catch (err) {
      if (err.auth) Key.clear();
      a.error = err.message;
    }
    this.render();
  },
  async call(text) {
    const key = Key.get();
    let last = '';
    for (const model of models()) {
      for (const json of [true, false]) {
        let res;
        const body = { model, temperature: 0.2, max_tokens: 3000, messages: [{ role: 'system', content: this.prompt() }, { role: 'user', content: `THE ESSAY (${this.words(text)} words${this.current.timeUp ? ', submitted when time ran out' : ''}):\n\n${text || '(empty)'}` }] };
        if (json) body.response_format = { type: 'json_object' };
        try {
          res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(body), referrerPolicy: 'no-referrer' });
        } catch (e) { last = 'Network error. Check your connection.'; break; }
        let data = null; try { data = await res.json(); } catch (e) { /* non-JSON */ }
        if (res.status === 401 || res.status === 403) { const err = new Error('Groq rejected the saved API key, so it has been removed. Enter a valid key and mark the essay again.'); err.auth = true; throw err; }
        const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (res.ok && content) { this.lastModel = model; return content; }
        last = (data && data.error && data.error.message) || `HTTP ${res.status}`;
        if (res.status === 429) { last = 'Rate limit reached on your Groq key. Wait a minute, then mark again.'; break; }
        if (!(json && res.status === 400)) break; // only retry without JSON mode when JSON mode was refused
      }
    }
    throw new Error('The tutor could not mark the essay. ' + last);
  },
  parse(raw) {
    const txt = cleanReply(raw);
    const start = txt.indexOf('{'), end = txt.lastIndexOf('}');
    let j;
    try { j = JSON.parse(txt.slice(start, end + 1)); } catch (e) { throw new Error('The tutor’s reply could not be read. Try marking again.'); }
    const scores = {};
    let total = 0;
    for (const c of this.set.criteria) {
      const v = Math.max(0, Math.min(c.weight, Math.round(Number((j.scores || {})[c.key]) || 0)));
      scores[c.key] = v; total += v;
    }
    const list = (x) => (Array.isArray(x) ? x.filter((s) => typeof s === 'string' && s.trim()).slice(0, 12) : []);
    const corrections = (Array.isArray(j.corrections) ? j.corrections : [])
      .filter((c) => c && typeof c.original === 'string' && typeof c.corrected === 'string' && c.original.trim() && c.original.trim() !== c.corrected.trim())
      .slice(0, 25).map((c) => ({ original: c.original.trim(), corrected: c.corrected.trim(), why: String(c.why || '').trim() }));
    return { scores, total, position: String(j.position || ''), summary: String(j.summary || ''), strengths: list(j.strengths), improvements: list(j.improvements), missed: list(j.missed_angles), corrections, improved: String(j.improved_paragraph || '') };
  },
  band(total) { return total >= 80 ? 'A strong essay.' : total >= 65 ? 'A good essay, with gaps.' : total >= 50 ? 'A fair attempt.' : 'Needs more work.'; },
  // ── Result page ──
  render() {
    const a = this.current, g = a.grade, t = this.topic, crit = this.set.criteria;
    $('essay-regrade').hidden = !Key.get();
    const mins = Math.floor(a.secondsUsed / 60), secs = a.secondsUsed % 60;
    const took = mins ? `${mins} min${secs ? ` ${secs} s` : ''}` : `${secs} s`;
    const meta = `${a.words} words, ${a.untimed ? 'written without the clock' : a.timeUp ? 'submitted when time ran out' : `written in ${took}`}`;
    const parts = [];
    if (g) {
      $('essay-score').textContent = g.total;
      $('essay-band').textContent = this.band(g.total);
      $('essay-summary').textContent = `${t.title}. ${meta}.`;
      parts.push(h('div', { class: 'slip receipt wide' },
        h('p', { class: 'r-group', text: 'Marks' }),
        ...crit.flatMap((c) => { const bar = h('span'); bar.style.width = (g.scores[c.key] / c.weight * 100) + '%'; return [leaderRow(c.name, `${g.scores[c.key]} of ${c.weight}`), h('div', { class: 'bd-meter', 'aria-hidden': 'true' }, bar)]; }),
        h('p', { class: 'r-total' }, h('span', { text: 'Total' }), h('span', { text: `${g.total} of 100` }))));
      parts.push(h('div', { class: 'panel' }, h('h2', { class: 'sec-title sm', text: 'Feedback' }),
        g.position ? h('p', {}, h('b', { text: 'Your position: ' }), g.position) : null,
        g.summary ? h('p', { class: 'essay-p', text: g.summary }) : null,
        g.strengths.length ? [h('h3', { class: 'essay-h', text: 'What worked' }), h('ul', { class: 'ac-list' }, ...g.strengths.map((s) => h('li', { text: s })))] : null,
        g.improvements.length ? [h('h3', { class: 'essay-h', text: 'To improve' }), h('ul', { class: 'ac-list' }, ...g.improvements.map((s) => h('li', { text: s })))] : null,
        g.missed.length ? [h('h3', { class: 'essay-h', text: 'Other valid angles you could have used' }), h('ul', { class: 'ac-list' }, ...g.missed.map((s) => h('li', { text: s })))] : null));
      parts.push(h('div', { class: 'panel' }, h('h2', { class: 'sec-title sm', text: `Grammar and expression (${g.corrections.length})` }),
        g.corrections.length ? h('ol', { class: 'fixes' }, ...g.corrections.map((c) => h('li', {}, h('s', { text: c.original }), ' → ', h('b', { text: c.corrected }), c.why ? h('span', { class: 'hint', text: ` ${c.why}` }) : null)))
          : h('p', { text: 'No language errors found. Well done.' }),
        g.improved ? [h('h3', { class: 'essay-h', text: 'Your weakest paragraph, rewritten' }), h('p', { class: 'essay-p rewrite', text: g.improved })] : null));
    } else {
      $('essay-score').textContent = '—';
      $('essay-band').textContent = a.error ? 'Not marked yet.' : (Key.get() ? 'Marking…' : 'Connect the tutor to get marked.');
      $('essay-summary').textContent = a.error ? a.error : `${t.title}. ${meta}. Compare your essay with the marking guide below while you wait, or connect the tutor.`;
      if (!Key.get()) parts.push(h('div', { class: 'panel' }, keyForm(() => { $('essay-regrade').hidden = false; this.mark(); })));
      if (a.error && Key.get()) $('essay-regrade').hidden = false;
      parts.push(h('div', { class: 'slip receipt wide' }, h('p', { class: 'r-group', text: 'How it is marked' }), ...crit.map((c) => leaderRow(c.name, `${c.weight} marks`)), h('p', { class: 'r-total' }, h('span', { text: 'Total' }), h('span', { text: '100' }))));
    }
    parts.push(h('div', { class: 'panel' }, h('h2', { class: 'sec-title sm', text: 'Your essay' }), this.annotated(a.text, g ? g.corrections : [])));
    const gd = t.guide;
    parts.push(h('div', { class: 'panel' }, h('h2', { class: 'sec-title sm', text: 'Ways to answer this topic' }),
      h('p', { class: 'essay-p', text: `There is no single right answer. Any clear, well-supported position can score well. These are some of the strong routes. ${gd.assesses}` }),
      ...gd.positions.map((p) => [h('h3', { class: 'essay-h', text: p.stance }), h('ul', { class: 'ac-list' }, ...p.points.map((x) => h('li', { text: x })))]),
      h('h3', { class: 'essay-h', text: 'Examples you could use' }), h('ul', { class: 'ac-list' }, ...gd.examples.map((x) => h('li', { text: x }))),
      h('h3', { class: 'essay-h', text: 'A structure that works' }), h('p', { class: 'essay-p', text: gd.structure }),
      h('h3', { class: 'essay-h', text: 'Common pitfalls' }), h('ul', { class: 'ac-list' }, ...gd.pitfalls.map((x) => h('li', { text: x })))));
    fill($('essay-feedback'), ...parts);
  },
  // Essay text with each correction's excerpt highlighted (text nodes and <mark> only).
  annotated(text, corrections) {
    const box = h('div', { class: 'essay-body' });
    if (!text) { box.append('(empty)'); return box; }
    const spans = [];
    for (const c of corrections) {
      let from = 0, idx;
      while ((idx = text.indexOf(c.original, from)) !== -1) {
        if (!spans.some((s) => idx < s.end && idx + c.original.length > s.start)) { spans.push({ start: idx, end: idx + c.original.length, c }); break; }
        from = idx + 1;
      }
    }
    spans.sort((x, y) => x.start - y.start);
    let pos = 0;
    for (const s of spans) {
      if (s.start > pos) box.append(text.slice(pos, s.start));
      box.append(h('mark', { title: `${s.c.corrected}${s.c.why ? ' (' + s.c.why + ')' : ''}`, text: text.slice(s.start, s.end) }));
      pos = s.end;
    }
    box.append(text.slice(pos));
    return box;
  },
};

// ─── Settings ────────────────────────────────────────────────────────────────
function applyTheme(pref) {
  try { localStorage.setItem('prep_theme', pref); } catch (e) { /* ignore */ }
  const dark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  $('theme-label').textContent = dark ? 'Light' : 'Dark';
  const meta = document.querySelector('meta[name=color-scheme]'); if (meta) meta.content = dark ? 'dark' : 'light';
  document.querySelectorAll('[data-theme-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeSet === pref)));
}
function currentThemePref() { try { return localStorage.getItem('prep_theme') || 'system'; } catch (e) { return 'system'; } }
function renderSettings() {
  applyTheme(currentThemePref());
  $('key-input').value = '';
  $('key-remember').checked = Key.remembered();
  $('key-status').textContent = Key.get() ? `A key is saved ${Key.remembered() ? 'on this device' : 'for this tab only'}.` : 'No key saved.';
  $('model-input').value = models().join(', ');
  $('vision-input').value = visionModel();
}

// ─── About ───────────────────────────────────────────────────────────────────
function renderAbout() {
  const sec = (title, ...paras) => [h('h2', { text: title }), ...paras.map((p) => (Array.isArray(p) ? h('ul', {}, ...p.map((li) => h('li', { text: li }))) : h('p', { text: p })))];
  fill($('about-body'), 
    ...sec('Where the questions come from', 'Every bank was rebuilt from the past-question PDFs and screenshots for each employer. Questions were re-solved one by one, not copied from the printed keys.'),
    ...sec('What was checked',
      ['Where the source document has an answer key, that key is the answer used here. Every question was also worked independently; where the working disagrees with the key, the note on the question shows the alternative answer and why.',
        'Where a document has no answer key (Workforce 5.0, the EY screenshots and a few individual items), the answer was worked out independently.',
        'Questions that could not be answered reliably (missing options, broken figures, contradictory data or unverifiable trivia) were removed rather than guessed.',
        'Reading passages and data tables were re-attached to the questions that depend on them, and figures were extracted from the original documents.',
        'Every question has a worked explanation. The AI tutor receives the passage, figure (when a vision model is set), options, answer, your choice and the explanation.']),
    ...sec('Exam notes',
      ['Deloitte: 71 questions from the 2024 graduate assessment (screenshots with no key, so worked out independently), the study pack’s sample papers with duplicates merged, and the 100-question Dragnet set with each chart re-checked. It also has the 2024 essay test: ten real topics, 20 minutes, marked by the tutor against five criteria, with grammar corrections.',
        'Workforce: five ability papers. Paper 5.0 has no published key, so its answers were worked out independently and are marked as such.',
        'General Aptitude: a mixed numerical and verbal practice set, useful for any test.']),
    ...sec('Privacy', 'Progress, favourites and tutor chats stay in your browser. The only outside service the app talks to is Groq, and only when you use the AI tutor with your own key.'));
}

// ─── Assessment centre (First Bank) ──────────────────────────────────────────
let acTab = 'framework';
const AC_TABS = [['framework', 'Five-step framework'], ['cases', 'Case studies'], ['group', 'Group exercise'], ['cbi', 'Interview'], ['presentation', 'Presentation']];
function renderAc() {
  if (typeof AC_CONTENT === 'undefined') return;
  fill($('ac-tabs'), ...AC_TABS.map(([k, l]) => h('button', { class: 'tab', role: 'tab', 'aria-selected': String(acTab === k), text: l, onclick: () => { acTab = k; renderAc(); } })));
  const body = clear($('ac-body')), A = AC_CONTENT;
  if (acTab === 'framework') {
    body.append(h('div', { class: 'ac-note' }, h('b', { text: A.framework.title + '. ' }), A.framework.note),
      ...A.framework.steps.map((s) => h('div', { class: 'fw-step' }, h('div', { class: 'fw-num', text: s.n }), h('div', {}, h('h3', { text: s.title }), h('p', { text: s.body })))));
  } else if (acTab === 'cases') {
    body.append(h('div', { class: 'ac-note', text: 'Read the scenario, write your own answer with the 5-step framework, then open the model answer.' }),
      ...A.cases.map((c) => {
        const a = c.answer, ans = h('div', { class: 'ac-ans' });
        let n = 1;
        const step = (t, p) => ans.append(h('h4', { text: `${n++} · ${t}` }), p);
        step('Clarify the problem', h('p', { text: a.clarify }));
        step('Find the root cause', h('p', { text: a.root }));
        if (a.options) step('Options & trade-offs', h('div', {}, ...a.options.map((o) => h('div', { class: 'ac-opt' }, h('b', { text: o.name }), h('span', {}, h('b', { text: 'For: ' }), o.pros), h('span', {}, h('b', { text: 'Against: ' }), o.cons)))));
        if (a.qa) a.qa.forEach((x) => step(x.q, h('p', { text: x.a })));
        if (a.recommend) step('Recommendation & justification', h('p', { text: a.recommend }));
        step('Risk and execution: what could go wrong', h('p', { text: a.risk }));
        return h('div', { class: 'ac-case' },
          h('span', { class: 'ac-case-tag', text: c.tag }), h('h3', { text: c.title }),
          ...c.scenario.map((p) => h('p', { text: p })),
          h('table', { class: 'ac-data' }, h('tbody', {}, ...c.data.map(([k, v]) => h('tr', {}, h('td', { text: k }), h('td', { text: v }))))),
          h('p', { class: 'ac-task', text: 'Your task: ' + c.task }),
          c.assessors ? [h('div', { class: 'ac-h', text: 'What the assessors are looking for' }), h('div', { class: 'ac-chips' }, ...c.assessors.map((x) => h('span', { text: x })))] : null,
          c.strongApproach ? h('div', { class: 'ac-quote' }, h('b', { text: 'Strong approach: ' }), c.strongApproach) : null,
          h('details', {}, h('summary', { text: 'Show model answer (5-step framework)' }), ans));
      }));
  } else if (acTab === 'group') {
    const g = A.group;
    body.append(h('div', { class: 'ac-note' }, h('b', { text: g.title + '. ' }), g.scenario),
      h('div', { class: 'ac-h', text: 'The three rules' }),
      ...g.rules.map((r) => h('div', { class: 'ac-rule' }, h('div', { class: 'fw-num', text: r.n }), h('div', {}, h('h3', { text: r.title }), h('p', { text: r.body })))),
      h('div', { class: 'ac-h', text: 'What the assessors watch for' }), h('div', { class: 'ac-chips' }, ...g.criteria.map((c) => h('span', { text: c }))),
      h('div', { class: 'ac-h', text: 'Phrases that score points' }), ...g.powerPhrases.map((p) => h('div', { class: 'ac-quote', text: p })),
      h('div', { class: 'ac-h', text: 'What not to do' }), h('ul', { class: 'ac-list' }, ...g.donts.map((d) => h('li', { text: d }))));
  } else if (acTab === 'cbi') {
    const c = A.cbi;
    body.append(h('div', { class: 'ac-note' }, h('b', { text: c.star.name + '. ' }), c.star.steps.map(([k, v]) => `${k} — ${v}`).join(' · ')),
      ...c.questions.map((q) => h('details', { class: 'ac-q' }, h('summary', { text: q.q }),
        h('div', { class: 'ac-q-body' }, h('span', { class: 'ac-cmp', text: q.competency }), h('ul', { class: 'ac-list' }, ...q.how.map((x) => h('li', { text: x }))),
          h('div', { class: 'ac-avoid' }, h('b', { text: 'Avoid: ' }), q.avoid)))));
  } else {
    const p = A.presentation;
    body.append(h('div', { class: 'ac-note', text: p.topic }),
      h('div', { class: 'ac-h', text: 'Suggested structure' }), h('ul', { class: 'ac-list' }, ...p.structure.map(([k, v]) => h('li', {}, h('b', { text: k }), ' — ' + v))),
      h('div', { class: 'ac-h', text: 'Delivery tips' }), h('ul', { class: 'ac-list' }, ...p.tips.map((t) => h('li', { text: t }))));
  }
}

// ─── Event wiring (delegated; no inline handlers) ────────────────────────────
document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-nav]');
  if (nav) { showView(nav.dataset.nav, nav.dataset.anchor); return; }
  const anc = e.target.closest('[data-anchor-scroll]');
  if (anc) { scrollToEl($(anc.dataset.anchorScroll), true); return; }
  const ask = e.target.closest('[data-ask]');
  if (ask) { Tutor.send(ask.dataset.ask); return; }
  const ts = e.target.closest('[data-theme-set]');
  if (ts) { applyTheme(ts.dataset.themeSet); return; }
  const act = e.target.closest('[data-action]');
  if (!act) return;
  switch (act.dataset.action) {
    case 'try-next': Try.next(); break;
    case 'essay-start': Essay.start(); break;
    case 'essay-submit': if (confirm('Submit your essay for marking?')) Essay.submit(false); break;
    case 'essay-again': Essay.open(Essay.examId); break;
    case 'essay-back': openExam(Essay.examId); break;
    case 'essay-regrade': Essay.current.error = null; Essay.mark(); break;
    case 'toggle-theme': applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); break;
    case 'prev': go(-1); break;
    case 'next': go(1); break;
    case 'skip': skip(); break;
    case 'pause': togglePause(); break;
    case 'end': if (session.reviewing) showView('result'); else { if (session.paused) togglePause(); $('end-overlay').hidden = false; } break;
    case 'end-cancel': $('end-overlay').hidden = true; break;
    case 'end-confirm': finish(); break;
    case 'review': review(); break;
    case 'again': again(); break;
    case 'zoom': $('zoom-img').src = $('q-figure-img').src; $('zoom-overlay').hidden = false; break;
    case 'zoom-close': $('zoom-overlay').hidden = true; break;
    case 'tutor-open': Tutor.open(); break;
    case 'tutor-clear': Tutor.clearChat(); break;
    case 'key-clear': Key.clear(); renderSettings(); break;
    case 'models-save': {
      const list = $('model-input').value.split(',').map((s) => s.trim()).filter((s) => /^[\w./:-]{2,100}$/.test(s));
      store.set('prep_ai_models', list.length ? list : DEFAULT_MODELS);
      store.set('prep_ai_vision', /^[\w./:-]{2,100}$/.test($('vision-input').value.trim()) ? $('vision-input').value.trim() : '');
      renderSettings(); $('key-status').textContent = 'Models saved.'; break;
    }
    case 'models-reset': store.del('prep_ai_models'); store.del('prep_ai_vision'); renderSettings(); break;
    case 'reset-progress':
      if (confirm('Reset all progress, favourites and session history on this device?')) { PROGRESS = { exams: {}, sessions: [], favs: [] }; saveProgress(); renderSettings(); }
      break;
    case 'reset-chats':
      if (confirm('Delete all saved tutor conversations?')) { Tutor.chats = {}; store.del('prep_chat_v2'); store.del('prep_chat_histories'); }
      break;
    default: break;
  }
});
$('essay-text').addEventListener('input', () => Essay.count());
$('tutor-form').addEventListener('submit', (e) => { e.preventDefault(); const v = $('tutor-input').value; $('tutor-input').value = ''; Tutor.send(v); });
$('key-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = $('key-input').value.trim();
  if (!/^[\w-]{20,200}$/.test(v)) { $('key-status').textContent = 'That does not look like a Groq API key.'; return; }
  Key.set(v, $('key-remember').checked); renderSettings();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') $('zoom-overlay').hidden = true;
  if (currentView !== 'quiz' || !session) return;
  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
  if (session.paused) { if (e.key === ' ') { e.preventDefault(); togglePause(); } return; }
  if (e.key === 'ArrowRight') { e.preventDefault(); go(1); return; }
  if (e.key === 'ArrowLeft') { e.preventDefault(); if (session.cur > 0) go(-1); return; }
  if (e.key === ' ' && session.mode !== 'free' && !session.reviewing) { e.preventDefault(); togglePause(); return; }
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toUpperCase();
  const idx = KEYS.indexOf(k) >= 0 ? KEYS.indexOf(k) : (k >= '1' && k <= '5' ? Number(k) - 1 : -1);
  const q = session.qs[session.cur];
  if (idx >= 0 && idx < q.opts.length && session.answered[session.cur] === undefined && !session.reviewing) { e.preventDefault(); pick(idx); }
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { if (currentThemePref() === 'system') applyTheme('system'); });
window.addEventListener('beforeunload', (e) => { if ((session && session.timer && currentView === 'quiz') || (currentView === 'essay' && !$('essay-write').hidden)) { e.preventDefault(); e.returnValue = ''; } });

// ─── Start ───────────────────────────────────────────────────────────────────
applyTheme(currentThemePref());
// Hero photographs crossfade slowly (the signature move); paused when the tab is hidden.
const Hero = {
  i: 0, timer: null,
  start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const imgs = document.querySelectorAll('.hero-photo img');
    if (imgs.length < 2) return;
    this.timer = setInterval(() => {
      if (document.hidden || currentView !== 'dashboard') return;
      imgs[this.i].classList.remove('on'); this.i = (this.i + 1) % imgs.length; imgs[this.i].classList.add('on');
    }, 6500);
  },
};
const showObs = 'IntersectionObserver' in window && new IntersectionObserver((en) => en.forEach((x) => x.target.classList.toggle('inview', x.isIntersecting)), { threshold: 0.2 });
if (showObs) document.querySelectorAll('.show').forEach((el) => showObs.observe(el));
document.querySelectorAll('#v-dashboard .hero-card > *, #v-dashboard .stub > *, .how-text > *, .how .receipt, .sheets > .sec-title, .csheet > *, .stats-left > div, .stats .receipt, .tests-col > *, .show-text, .postcard > *').forEach((el, i, all) => {
  el.classList.add('rise');
  const sib = [...el.parentElement.children].indexOf(el);
  el.style.setProperty('--d', Math.min(sib, 5) * 80 + 'ms');
});
document.documentElement.classList.add('js');
showView('dashboard');
Hero.start();

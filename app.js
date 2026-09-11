// ─── EY QUESTION BANK ─────────────────────────────────────────────────────────
// ─── SEPLAT QUESTION BANK ─────────────────────────────────────────────────────
// ─── APP STATE ────────────────────────────────────────────────────────────────
let currentExam = null; // 'ey', 'seplat', 'general', or 'access'
let BANK = [];
let qs=[], mode='free', minutes=0, cur=0;
let answered={}, skipped=new Set(), correct=0, wrong=0;
let timerInterval=null, timeLeft=0, paused=false;
let selectedCats=new Set(), reviewing=false;
let CATS=[];
const SESSION_SIZE=50;
let expCollapsed = false;

// ─── EXAM SELECTION ───────────────────────────────────────────────────────────
function selectExam(exam) {
  currentExam = exam;
  BANK = exam === 'firstbank' ? FIRST_BANK
       : exam === 'ey' ? EY_BANK
       : exam === 'seplat' ? SEPLAT_BANK
       : exam === 'access' ? ACCESS_BANK
       : exam === 'gtbank' ? GTBANK
       : exam === 'premiumtrust' ? PREMIUM_TRUST
       : GENERAL_APTITUDE_BANK;
  CATS = [...new Set(BANK.map(q=>q.cat))];
  selectedCats.clear();

  const badge = document.getElementById('home-badge');
  const title = document.getElementById('home-title');
  const sub = document.getElementById('home-sub');
  const accentProp = exam === 'firstbank' ? '--fb-blue'
       : exam === 'ey' ? '--ey-gold'
       : exam === 'seplat' ? '--sep-green'
       : exam === 'access' ? '--acc-red'
       : exam === 'gtbank' ? '--gtb-orange'
       : exam === 'premiumtrust' ? '--ptb-teal'
       : '--gen-blue';
  document.documentElement.style.setProperty('--accent', `var(${accentProp})`);

  if(exam === 'firstbank') {
    badge.className = 'exam-badge fb';
    badge.innerHTML = '🏦 FIRST BANK GRADUATE TRAINEE PREP';
    title.textContent = 'First Bank Assessment Practice';
    sub.textContent = `${FIRST_BANK.length} questions from the First Bank graduate trainee past papers — Critical, Verbal, Abstract and Numerical Reasoning, with every figure, data table and worked explanation included. Each session draws ${SESSION_SIZE} random questions.`;
    buildModeGrid([
      {m:'timed',mins:60,badge:'⏱ 60 MIN EXAM',badgeCls:'timed',title:'Standard Exam',sub:'60 minutes. Mirrors real First Bank test conditions.'},
      {m:'timed',mins:90,badge:'🕐 90 MIN MODE',badgeCls:'timed',title:'Extended Exam',sub:'90 minutes for a full-length, deeper practice session.'},
      {m:'blitz',mins:30,badge:'🔥 30 MIN BLITZ',badgeCls:'fast',title:'Speed Mode',sub:'30 minutes, maximum pressure. Build exam speed.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. Full explanations after every answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',60)">Start 60-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button><button class="btn ac-entry" onclick="openAssessmentCenter()">🎯 Assessment Center Prep</button>`;
  } else if(exam === 'gtbank') {
    badge.className = 'exam-badge gtb';
    badge.innerHTML = '🟠 GTBANK / GTCO ENTRY LEVEL PREP';
    title.textContent = 'GTBank Assessment Practice';
    sub.textContent = `${GTBANK.length} questions from GTBank/GTCO past papers and real assessment screenshots — Numerical, Verbal, Critical and Abstract Reasoning, with every figure included and every answer verified with a worked explanation. Each session draws ${SESSION_SIZE} random questions.`;
    buildModeGrid([
      {m:'timed',mins:60,badge:'⏱ 60 MIN EXAM',badgeCls:'timed',title:'Standard Exam',sub:'60 minutes. Mirrors real GTBank test conditions.'},
      {m:'timed',mins:45,badge:'🔥 45 MIN BLITZ',badgeCls:'fast',title:'Speed Mode',sub:'45 minutes, maximum pressure. Build exam speed.'},
      {m:'timed',mins:90,badge:'🕐 90 MIN MODE',badgeCls:'timed',title:'Extended Exam',sub:'90 minutes for a full-length, deeper practice session.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. Full explanations after every answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',60)">Start 60-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button>`;
  } else if(exam === 'premiumtrust') {
    badge.className = 'exam-badge ptb';
    badge.innerHTML = '💎 PREMIUM TRUST BANK GRADUATE TRAINEE PREP';
    title.textContent = 'Premium Trust Bank Assessment Practice';
    sub.textContent = `${PREMIUM_TRUST.length} questions from Premium Trust Bank graduate trainee past papers — Numerical, Verbal, Abstract, Logical & Critical Reasoning, Banking/Economics and ICT. Every answer key entry was crosschecked (and corrected where wrong), with a worked explanation for every question. Each session draws ${SESSION_SIZE} random questions.`;
    buildModeGrid([
      {m:'timed',mins:60,badge:'⏱ 60 MIN EXAM',badgeCls:'timed',title:'Standard Exam',sub:'60 minutes. Mirrors real test conditions.'},
      {m:'timed',mins:45,badge:'🔥 45 MIN BLITZ',badgeCls:'fast',title:'Speed Mode',sub:'45 minutes, maximum pressure. Build exam speed.'},
      {m:'timed',mins:90,badge:'🕐 90 MIN MODE',badgeCls:'timed',title:'Extended Exam',sub:'90 minutes for a full-length, deeper practice session.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. Full explanations after every answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',60)">Start 60-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button>`;
  } else if(exam === 'ey') {
    badge.className = 'exam-badge ey';
    badge.innerHTML = '🟡 EY JOBBERMAN APTITUDE PREP';
    title.textContent = 'EY Assessment Practice System';
    sub.textContent = `${EY_BANK.length} questions covering Logical, Numerical, Verbal, Critical Reasoning & more. Each session gives you ${SESSION_SIZE} random questions. Practice until you're exam-ready.`;
    buildModeGrid([
      {m:'blitz',mins:30,badge:'🔥 30 MIN BLITZ',badgeCls:'fast',title:'Speed Mode',sub:'30 minutes, maximum pressure. Build exam speed.'},
      {m:'timed',mins:40,badge:'⏱ 40 MIN MODE',badgeCls:'timed',title:'Intensive Mode',sub:'40 minutes. A balanced challenge with time pressure.'},
      {m:'timed',mins:60,badge:'✅ 60 MIN EXAM',badgeCls:'timed',title:'Standard Exam',sub:'60 minutes. Mirrors the real EY exam conditions.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. Instant feedback and full explanations after each answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',60)">Start 60-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button>`;
  } else if(exam === 'seplat') {
    badge.className = 'exam-badge sep';
    badge.innerHTML = '🟢 SEPLAT PETROLEUM PREP';
    title.textContent = 'SEPLAT Assessment Practice System';
    sub.textContent = `${SEPLAT_BANK.length} questions from real SEPLAT past papers covering Numerical, Quantitative, Verbal Reasoning, Banking & Finance, and General Knowledge. Select a mode below to begin.`;
    buildModeGrid([
      {m:'timed',mins:60,badge:'⏱ 60 MIN EXAM',badgeCls:'timed',title:'Timed Mode',sub:'Simulate real exam conditions with a 60-minute countdown.'},
      {m:'timed',mins:90,badge:'🕐 90 MIN MODE',badgeCls:'timed',title:'Extended Exam',sub:'90 minutes for a deeper practice session under timed pressure.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. See explanations immediately after each answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',60)">Start 60-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button>`;
  } else if(exam === 'access') {
    badge.className = 'exam-badge acc';
    badge.innerHTML = '🔴 ACCESS BANK APTITUDE PREP';
    title.textContent = 'Access Bank Assessment Practice System';
    sub.textContent = `${ACCESS_BANK.length} questions from real Access Bank past papers covering Quantitative Reasoning, Verbal Reasoning, Critical Reasoning, Intelligence & Pattern Recognition, and General Knowledge. Select a mode below to begin.`;
    buildModeGrid([
      {m:'timed',mins:90,badge:'⏱ 90 MIN EXAM',badgeCls:'timed',title:'Full Exam Mode',sub:'90 minutes simulating real Access Bank exam conditions. No calculator allowed.'},
      {m:'timed',mins:60,badge:'✅ 60 MIN BLITZ',badgeCls:'fast',title:'Speed Mode',sub:'60 minutes, maximum pressure. Build exam speed and accuracy.'},
      {m:'timed',mins:45,badge:'🔥 45 MIN DRILL',badgeCls:'fast',title:'Intensive Drill',sub:'45 minutes — fast-paced practice for 50 focused questions.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. See explanations and answer rationale immediately after each answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',90)">Start 90-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button>`;
  } else {
    badge.className = 'exam-badge gen';
    badge.innerHTML = '🔵 GENERAL APTITUDE PREP';
    title.textContent = 'General Aptitude Practice System';
    sub.textContent = `${GENERAL_APTITUDE_BANK.length} questions from real Workforce past papers covering Numerical and Verbal Reasoning. Select a mode below to begin.`;
    buildModeGrid([
      {m:'timed',mins:40,badge:'⏱ 40 MIN EXAM',badgeCls:'timed',title:'Timed Mode',sub:'Simulate real exam conditions with a 40-minute countdown.'},
      {m:'timed',mins:60,badge:'✅ 60 MIN EXAM',badgeCls:'timed',title:'Extended Exam',sub:'60 minutes for a deeper practice session under timed pressure.'},
      {m:'free',mins:0,badge:'📖 PRACTICE',badgeCls:'practice',title:'Practice Mode',sub:'No clock. See explanations immediately after each answer.'},
    ]);
    document.getElementById('home-btns').innerHTML = `<button class="btn primary" onclick="startQuiz('timed',40)">Start 40-min Exam</button><button class="btn" onclick="startQuiz('free',0)">Practice Mode</button>`;
  }

  buildHomeCats();
  show('s-home');
}

function buildModeGrid(modes) {
  const grid = document.getElementById('mode-grid');
  grid.innerHTML = '';
  modes.forEach(m => {
    const div = document.createElement('div');
    div.className = 'mode-card';
    div.onclick = () => startQuiz(m.m, m.mins);
    div.innerHTML = `<span class="mc-badge ${m.badgeCls}">${m.badge}</span><div class="mc-title">${m.title}</div><div class="mc-sub">${m.sub}</div>`;
    grid.appendChild(div);
  });
}

function goToSelect() {
  if(timerInterval) clearInterval(timerInterval);
  if(paused) { document.getElementById('pause-overlay').classList.remove('show'); paused=false; }
  document.getElementById('cancel-overlay').classList.remove('show');
  document.documentElement.style.setProperty('--accent', 'var(--blue)');
  show('s-select');
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function buildHomeCats() {
  const el = document.getElementById('home-cats'); el.innerHTML = '';
  ['All',...CATS].forEach(c => {
    const b = document.createElement('button');
    b.className = 'cat-chip' + (c==='All'&&selectedCats.size===0?' sel':selectedCats.has(c)?' sel':'');
    b.textContent = c;
    b.onclick = () => {
      if(c==='All') selectedCats.clear();
      else { selectedCats.has(c)?selectedCats.delete(c):selectedCats.add(c); }
      buildHomeCats();
    };
    el.appendChild(b);
  });
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function startQuiz(m, mins) {
  mode=m; minutes=mins; cur=0; answered={}; skipped=new Set(); correct=0; wrong=0; reviewing=false; paused=false;
  let pool = selectedCats.size===0 ? [...BANK] : BANK.filter(q=>selectedCats.has(q.cat));
  pool = shuffle(pool);
  qs = pool.slice(0, SESSION_SIZE);
  if(qs.length===0){ alert('No questions match selected categories.'); return; }
  timeLeft = mins*60;
  if(timerInterval) clearInterval(timerInterval);
  const tel=document.getElementById('timer'), pb=document.getElementById('pause-btn');
  if(m!=='free') {
    tel.style.display=''; pb.style.display='';
    tel.textContent=fmtTime(timeLeft); tel.className='timer-box';
    timerInterval=setInterval(()=>{
      if(paused) return;
      timeLeft--;
      tel.textContent=fmtTime(timeLeft);
      tel.className='timer-box'+(timeLeft<120?' warn':'');
      if(timeLeft<=0){ clearInterval(timerInterval); showResult(); }
    },1000);
  } else { tel.style.display='none'; pb.style.display='none'; }
  show('s-quiz'); render();
}

function fmtTime(s){ const m=Math.floor(s/60),sec=s%60; return`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; }

function toggleChart(){
  const el=document.getElementById('q-chart');
  el.classList.toggle('expanded');
}

function togglePause() {
  paused=!paused;
  const overlay=document.getElementById('pause-overlay'), pauseBtn=document.getElementById('pause-btn');
  if(paused) {
    overlay.classList.add('show'); pauseBtn.textContent='▶ Resume';
    document.getElementById('pause-time-display').textContent=fmtTime(timeLeft);
  } else { overlay.classList.remove('show'); pauseBtn.textContent='⏸ Pause'; }
}

function buildDots() {
  const el=document.getElementById('dots'); el.innerHTML='';
  qs.forEach((q,i)=>{
    const d=document.createElement('div');
    let cls='dot';
    if(i===cur) cls+=' active';
    else if(answered[i]!==undefined) cls+=(answered[i]===q.ans?' ok':' err');
    else if(skipped.has(i)) cls+=' skipped';
    d.className=cls; d.textContent=i+1; d.title=q.cat;
    d.onclick=()=>{ cur=i; render(); };
    el.appendChild(d);
  });
}

function render() {
  if(cur>=qs.length){ showResult(); return; }
  const q=qs[cur], total=qs.length;
  document.getElementById('q-counter').textContent=reviewing?`Review: ${cur+1} of ${total}`:`Question ${cur+1} of ${total}`;
  document.getElementById('prog-fill').style.width=`${((cur+1)/total*100).toFixed(0)}%`;
  document.getElementById('s-correct').textContent=correct;
  document.getElementById('s-wrong').textContent=wrong;
  document.getElementById('s-remain').textContent=total-Object.keys(answered).length;

  // Tag
  const tagEl=document.getElementById('q-tag');
  tagEl.textContent=q.cat;
  const TAG_CLS={firstbank:'fb-tag',ey:'ey-tag',seplat:'sep-tag',access:'acc-tag',general:'gen-tag'};
  tagEl.className='q-tag '+(TAG_CLS[currentExam]||'gen-tag');
  document.getElementById('q-text').textContent=q.q;

  // Passage or data brief (comprehension passages, chart intros)
  const passEl=document.getElementById('q-passage');
  if(q.passage){
    document.getElementById('q-passage-body').textContent=q.passage;
    passEl.style.display='';
    passEl.open=true;
  } else {
    passEl.style.display='none';
    passEl.open=false;
  }

  // Chart image
  const chartEl=document.getElementById('q-chart');
  const chartImg=document.getElementById('q-chart-img');
  if(q.img){
    chartImg.src=q.img;
    chartEl.style.display='';
    chartEl.classList.remove('expanded');
    document.getElementById('q-chart-label').textContent=q.imgLabel||'Figure';
  } else {
    chartEl.style.display='none';
    chartImg.src='';
  }

  resetAiChat(q, answered[cur]!==undefined);
  buildDots();

  const keys=['A','B','C','D','E'], isAns=answered[cur]!==undefined;
  const optsEl=document.getElementById('opts'); optsEl.innerHTML='';
  q.opts.forEach((opt,i)=>{
    const d=document.createElement('div');
    d.className='opt'+(isAns?' locked':'');
    if(isAns) {
      if(i===q.ans) d.classList.add('correct');
      else if(i===answered[cur]) d.classList.add('wrong');
    } else { d.onclick=()=>pick(cur,i,q); }
    d.innerHTML=`<span class="opt-key">${keys[i]}</span><span class="opt-txt">${opt}</span>`;
    optsEl.appendChild(d);
  });

  // Explanation box
  const expBox=document.getElementById('exp-box');
  const expHeader=document.getElementById('exp-header');
  const expIcon=document.getElementById('exp-icon');
  const expTitle=document.getElementById('exp-title');
  const expBody=document.getElementById('exp-body');
  expCollapsed=false;
  document.getElementById('exp-toggle').textContent='▾';
  expBody.style.display='';

  if(isAns) {
    const ok=answered[cur]===q.ans;
    expBox.classList.add('show');
    expHeader.className='exp-header '+(ok?'ok':'err');
    expIcon.textContent=ok?'✓':'✗';
    expTitle.textContent=ok?'Correct! See explanation':'Incorrect — see explanation';
    const expText=q.exp || (ok?'This is the correct answer based on the given information.':'The correct answer is option '+keys[q.ans]+': '+q.opts[q.ans]+'.');
    const noteHtml=q.note?`<span class="exp-note"><strong>Note on this question:</strong> ${q.note}</span>`:'';
    expBody.innerHTML=`<strong>Correct answer: ${keys[q.ans]}) ${q.opts[q.ans]}</strong><br><br>${expText}${noteHtml}`;
  } else {
    expBox.classList.remove('show');
  }

  document.getElementById('btn-prev').disabled=(cur===0);
  document.getElementById('btn-next').textContent=cur===qs.length-1?'Finish ✓':'Next →';
  document.getElementById('btn-skip').style.display=(isAns||reviewing)?'none':'';
}

function toggleExp() {
  expCollapsed=!expCollapsed;
  document.getElementById('exp-body').style.display=expCollapsed?'none':'';
  document.getElementById('exp-toggle').textContent=expCollapsed?'▸':'▾';
}

function pick(qi,sel,q) {
  if(answered[qi]!==undefined) return;
  answered[qi]=sel; skipped.delete(cur);
  if(sel===q.ans) correct++; else wrong++;
  render();
}

function go(dir) {
  if(dir===1&&cur===qs.length-1){ if(timerInterval)clearInterval(timerInterval); showResult(); return; }
  cur=Math.max(0,Math.min(qs.length-1,cur+dir)); render();
}
function skip(){ skipped.add(cur); if(cur<qs.length-1) cur++; render(); }

// ─── RESULT ───────────────────��───────────────────────────────────────────────
function showResult() {
  if(timerInterval){ clearInterval(timerInterval); }
  if(paused){ togglePause(); }
  const attempted=Object.keys(answered).length;
  const pct=attempted>0?Math.round(correct/attempted*100):0;
  document.getElementById('r-pct').textContent=pct+'%';
  const ring=document.getElementById('score-ring');
  if(ring) ring.style.setProperty('--pct', pct+'%');
  const EXAM_NAMES={firstbank:'First Bank',ey:'EY',seplat:'SEPLAT',access:'Access Bank',general:'General Aptitude'};
  const examName=EXAM_NAMES[currentExam]||'General Aptitude';
  const modeLabels={'blitz':`${minutes}-Minute Blitz`,'timed':`${minutes}-Minute Exam`,'free':'Practice Mode (Untimed)'};
  document.getElementById('r-mode-label').textContent=`${examName} — ${modeLabels[mode]||'Practice Mode'}`;
  let grade,color,msg;
  if(pct>=80){ grade=`Excellent — ${examName} Ready 🎯`; color='var(--green)'; msg='Outstanding performance! You are well prepared. Review any missed questions to push even higher.'; }
  else if(pct>=65){ grade='Good — Minor Gaps'; color='var(--accent)'; msg='Strong attempt. Read the explanations for questions you missed and aim above 80% on your next try.'; }
  else if(pct>=50){ grade='Developing — Needs Practice'; color='var(--amber)'; msg='Solid foundation. Focus on your weakest categories and drill those question types consistently.'; }
  else { grade='Keep Going — You Can Do This'; color='var(--red)'; msg='Don\'t be discouraged. Study the explanations carefully, identify your weak areas, and retake regularly.'; }
  const gradeEl=document.getElementById('r-grade'); gradeEl.textContent=grade; gradeEl.style.color=color;
  const skippedCount=qs.length-attempted;
  document.getElementById('r-msg').textContent=`${correct} of ${attempted} questions answered correctly${skippedCount>0?` (${skippedCount} skipped)`:''}.  ${msg}`;
  const bd=document.getElementById('r-breakdown'); bd.innerHTML='';
  CATS.forEach(cat=>{
    const catQs=qs.filter(q=>q.cat===cat); if(!catQs.length) return;
    const catIdx=catQs.map(q=>qs.indexOf(q));
    const catAns=catIdx.filter(i=>answered[i]!==undefined);
    const catCor=catIdx.filter(i=>answered[i]===qs[i].ans);
    const cp=catAns.length?Math.round(catCor.length/catAns.length*100):0;
    const fillColor=cp>=80?'var(--green)':cp>=60?'var(--accent)':cp>=40?'var(--amber)':'var(--red)';
    const d=document.createElement('div'); d.className='bd-item';
    d.innerHTML=`<div class="bd-cat">${cat}</div><div class="bd-val">${catCor.length}/${catAns.length} correct — ${cp}%</div><div class="bd-bar"><div class="bd-fill" style="width:${cp}%;background:${fillColor}"></div></div>`;
    bd.appendChild(d);
  });
  show('s-result');
}

function reviewMode() {
  reviewing=true; cur=0;
  show('s-quiz');
  document.getElementById('timer').style.display='none';
  document.getElementById('pause-btn').style.display='none';
  render();
}

function goHome() {
  if(timerInterval) clearInterval(timerInterval);
  if(paused) togglePause();
  selectedCats.clear();
  buildHomeCats();
  show('s-home');
}

function confirmCancel() {
  if(paused) togglePause();
  document.getElementById('cancel-overlay').classList.add('show');
}
function closeCancelOverlay() { document.getElementById('cancel-overlay').classList.remove('show'); }
function cancelAssessment() {
  document.getElementById('cancel-overlay').classList.remove('show');
  if(paused) togglePause();
  if(timerInterval){ clearInterval(timerInterval); timerInterval=null; }
  showResult();
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
function show(id){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

// ─── AI CHAT ─────────────────────────────────────────────────────────────────
const CHAT_STORE_KEY = 'prep_chat_histories';
const CHAT_STORE = JSON.parse(localStorage.getItem(CHAT_STORE_KEY) || '{}');
let aiChatOpen=false, aiChatQ=null, aiChatHistory=[], aiChatLocked=false;

function openAiChat(){
  const chatEl=document.getElementById('ai-chat'), btnEl=document.getElementById('ai-chat-btn');
  if(!aiChatOpen){
    chatEl.classList.add('open'); btnEl.style.display='none'; aiChatOpen=true;
    const msgs=document.getElementById('ai-messages');
    if(msgs.children.length===0) addAiMsg('ai',"I can explain why the correct answer is right and why other options don't work. What would you like to know?");
    chatEl.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
}

function toggleAiChat(){
  const chatEl=document.getElementById('ai-chat'), body=document.getElementById('ai-messages');
  const inputRow=chatEl.querySelector('.ai-input-row'), toggleBtn=document.getElementById('ai-chat-toggle-btn');
  const collapsed=body.style.display==='none';
  body.style.display=collapsed?'':'none';
  inputRow.style.display=collapsed?'':'none';
  toggleBtn.textContent=collapsed?'▾ Hide':'▸ Show';
}

function addAiMsg(role,text){
  const msgs=document.getElementById('ai-messages');
  const d=document.createElement('div');
  d.className='ai-msg '+role; d.textContent=text;
  msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
  return d;
}

async function sendAiMsg(){
  if(aiChatLocked||!aiChatQ) return;
  const input=document.getElementById('ai-input'), sendBtn=document.getElementById('ai-send');
  const userText=input.value.trim(); if(!userText) return;
  if(userText.toLowerCase()==='reset key'){ localStorage.removeItem('GROQ_API_KEY'); addAiMsg('ai','Saved Groq key cleared. Send any message and I will ask you for a new key.'); return; }
  input.value=''; aiChatLocked=true; sendBtn.disabled=true; sendBtn.textContent='...';
  addAiMsg('user',userText);
  const thinkEl=addAiMsg('thinking','Thinking…');
  const q=aiChatQ, keys=['A','B','C','D','E'];
  const optsText=q.opts.map((o,i)=>`${keys[i]}: ${o}`).join('\n');
  const correctLetter=keys[q.ans], correctText=q.opts[q.ans];
  const systemPrompt=`You are a concise exam tutor helping a student prepare for the ${({firstbank:'First Bank graduate trainee',ey:'EY graduate aptitude',seplat:'SEPLAT petroleum company',access:'Access Bank graduate trainee',gtbank:'GTBank/GTCO entry-level recruitment',premiumtrust:'Premium Trust Bank graduate trainee'})[currentExam]||'Workforce general aptitude'} exam.
The student has just answered a question. Your job is to explain the reasoning clearly and directly.

QUESTION:
${q.q}

OPTIONS:
${optsText}

CORRECT ANSWER: ${correctLetter}) ${correctText}
OFFICIAL EXPLANATION: ${q.exp}

RULES:
- Be direct and specific. Reference option letters (A, B, C, D) by name.
- Keep answers under 120 words unless genuinely needed.
- Never say "great question" or use filler phrases.
- If the student asks why an option is wrong, explain the specific flaw in that option's logic.
- Use the official explanation as your source of truth.`;
  aiChatHistory.push({role:'user',content:userText});

  const qKey = currentExam + '_' + q.q;
  CHAT_STORE[qKey] = aiChatHistory;
  localStorage.setItem(CHAT_STORE_KEY, JSON.stringify(CHAT_STORE));

  let apiKey = localStorage.getItem('GROQ_API_KEY');
  if (!apiKey) {
    apiKey = prompt('Please enter your Groq API Key to use the AI Assistant (this is saved locally in your browser):');
    if (apiKey) {
      localStorage.setItem('GROQ_API_KEY', apiKey);
    } else {
      thinkEl.remove();
      addAiMsg('ai', 'Error: A Groq API Key is required to use the AI assistant.');
      return;
    }
  }

  const MODELS=['openai/gpt-oss-120b','openai/gpt-oss-20b','qwen/qwen3.6-27b'];
  let res=null, data=null, lastErr='';
  for (const model of MODELS) {
    try {
      res=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${apiKey}`
      },
      body:JSON.stringify({
        model:model,
        messages:[
          {role:'system',content:systemPrompt},
          ...aiChatHistory
        ],
        temperature:0.2,
        max_tokens:512
      })
    });
      const txt=await res.text();
      try{ data=JSON.parse(txt); }catch(e){ data=null; lastErr='Non-JSON response: '+txt.slice(0,200); }
      if(res.ok && data && data.choices) break;
      lastErr = (data&&data.error&&data.error.message)?data.error.message:('HTTP '+res.status);
      if(res.status===401||res.status===403) break;
      res=null;
    } catch(e) { lastErr=e.message||'network error'; res=null; }
  }
  if(!res){
  if(res && (res.status===401||res.status===403)){
      localStorage.removeItem('GROQ_API_KEY');
      thinkEl.remove(); addAiMsg('ai','That saved Groq API key was rejected, so I cleared it. Press Send again and I will ask you for a fresh key.');
      aiChatLocked=false; sendBtn.disabled=false; sendBtn.textContent='Ask'; input.focus();
      return;
    }
    thinkEl.remove(); addAiMsg('ai','Groq could not answer after trying several models. Error: '+lastErr+' — you can type reset key to enter a fresh key.');
    aiChatLocked=false; sendBtn.disabled=false; sendBtn.textContent='Ask'; input.focus();
    return;
  }
  { // success path
    if(false){
    }
    const reply=data.choices&&data.choices[0]&&data.choices[0].message?data.choices[0].message.content:('Unexpected Groq response: '+JSON.stringify(data).slice(0,200));
    thinkEl.remove(); addAiMsg('ai',reply);
    aiChatHistory.push({role:'assistant',content:reply});
    
    CHAT_STORE[qKey] = aiChatHistory;
    localStorage.setItem(CHAT_STORE_KEY, JSON.stringify(CHAT_STORE));
  }
  aiChatLocked=false; sendBtn.disabled=false; sendBtn.textContent='Ask'; input.focus();
}

function resetAiChat(q,isAnswered){
  aiChatQ=isAnswered?q:null;
  aiChatOpen=false; aiChatLocked=false;
  const chatEl=document.getElementById('ai-chat'), btnEl=document.getElementById('ai-chat-btn');
  const msgs=document.getElementById('ai-messages'), toggleBtn=document.getElementById('ai-chat-toggle-btn');
  const inputRow=chatEl.querySelector('.ai-input-row'), body=document.getElementById('ai-messages');
  chatEl.classList.remove('open'); msgs.innerHTML='';
  toggleBtn.textContent='▾ Hide'; body.style.display=''; inputRow.style.display='';
  
  if(isAnswered){
    const qKey = currentExam + '_' + q.q;
    aiChatHistory = CHAT_STORE[qKey] || [];
    btnEl.classList.add('visible'); btnEl.style.display='';
    if(aiChatHistory.length > 0) {
      aiChatHistory.forEach(msg => addAiMsg(msg.role, msg.content));
      chatEl.classList.add('open');
      btnEl.style.display='none';
      aiChatOpen=true;
    }
  } else {
    aiChatHistory = [];
    btnEl.classList.remove('visible'); btnEl.style.display='none';
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
// Start on exam select screen

// ─── THEME ────────────────────────────────────────────────────────────────
function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  const icon=document.getElementById('theme-icon'), label=document.getElementById('theme-label');
  if(icon) icon.textContent = t==='dark' ? '◑' : '◐';
  if(label) label.textContent = t==='dark' ? 'Light' : 'Dark';
  try{ localStorage.setItem('prep_theme', t); }catch(e){}
}
function toggleTheme(){
  applyTheme(document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
}

// ─── KEYBOARD SHORTCUTS ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const quiz=document.getElementById('s-quiz');
  if(!quiz || !quiz.classList.contains('active')) return;
  const t=e.target;
  if(t && (t.tagName==='INPUT' || t.tagName==='TEXTAREA')) return;
  if(paused){ if(e.key===' '){ e.preventDefault(); togglePause(); } return; }
  const q=qs[cur];
  if(!q) return;
  if(e.key==='ArrowRight'){ e.preventDefault(); go(1); return; }
  if(e.key==='ArrowLeft'){ e.preventDefault(); if(cur>0) go(-1); return; }
  if(e.key===' '){ e.preventDefault(); if(mode!=='free') togglePause(); return; }
  let idx=-1;
  const k=e.key.toUpperCase();
  if('ABCDE'.indexOf(k)>=0) idx='ABCDE'.indexOf(k);
  else if(k>='1' && k<='5') idx=parseInt(k,10)-1;
  if(idx>=0 && idx<q.opts.length && answered[cur]===undefined && !reviewing){
    e.preventDefault();
    pick(cur, idx, q);
  }
});

// ─── STARTUP ───────────────────────────────────────────────────────────
(function init(){
  let saved=null;
  try{ saved=localStorage.getItem('prep_theme'); }catch(e){}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  const ALL=[
    ['cnt-fb', typeof FIRST_BANK!=='undefined'?FIRST_BANK:[]],
    ['cnt-ey', typeof EY_BANK!=='undefined'?EY_BANK:[]],
    ['cnt-sep', typeof SEPLAT_BANK!=='undefined'?SEPLAT_BANK:[]],
    ['cnt-acc', typeof ACCESS_BANK!=='undefined'?ACCESS_BANK:[]],
    ['cnt-gtb', typeof GTBANK!=='undefined'?GTBANK:[]],
    ['cnt-ptb', typeof PREMIUM_TRUST!=='undefined'?PREMIUM_TRUST:[]],
    ['cnt-gen', typeof GENERAL_APTITUDE_BANK!=='undefined'?GENERAL_APTITUDE_BANK:[]],
  ];
  ALL.forEach(([id,bank])=>{
    const el=document.getElementById(id);
    if(el) el.textContent = bank.length.toLocaleString()+' questions';
  });

  const every=[].concat.apply([], ALL.map(x=>x[1]));
  const total=every.length;
  const cats=new Set(every.map(q=>q.cat));
  const withExp=every.filter(q=>q.exp && String(q.exp).trim()).length;
  const strip=document.getElementById('stat-strip');
  if(strip && total){
    strip.innerHTML =
      '<div class="stat"><b>'+total.toLocaleString()+'</b><span>practice questions</span></div>'+
      '<div class="stat"><b>'+ALL.length+'</b><span>exam banks</span></div>'+
      '<div class="stat"><b>'+cats.size+'</b><span>question categories</span></div>'+
      '<div class="stat"><b>'+Math.round(withExp/total*100)+'%</b><span>with explanations</span></div>';
  }
})();

// ─── ASSESSMENT CENTER (First Bank) ─────────────────────────────────────────
let acTab = 'framework';

function openAssessmentCenter(){
  if(typeof AC_CONTENT === 'undefined') return;
  show('s-ac');
  renderAc();
  window.scrollTo({top:0, behavior:'smooth'});
}

function setAcTab(t){ acTab = t; renderAc(); window.scrollTo({top:0, behavior:'smooth'}); }

function renderAc(){
  const tabs = [['framework','🧭 5-Step Framework'],['cases','📊 Case Studies'],['group','👥 Group Exercise'],['cbi','🎤 CBI Interview'],['presentation','🖥 Presentation']];
  document.getElementById('ac-tabs').innerHTML = tabs.map(([k,l]) =>
    `<button class="ac-tab${acTab===k?' active':''}" onclick="setAcTab('${k}')">${l}</button>`).join('');
  const b = document.getElementById('ac-body');
  if(acTab==='framework') b.innerHTML = renderAcFramework();
  else if(acTab==='cases') b.innerHTML = renderAcCases();
  else if(acTab==='group') b.innerHTML = renderAcGroup();
  else if(acTab==='cbi') b.innerHTML = renderAcCbi();
  else b.innerHTML = renderAcPres();
}

function renderAcFramework(){
  const f = AC_CONTENT.framework;
  return `<div class="ac-note"><b>${f.title}.</b> ${f.note}</div>` +
    f.steps.map(s => `<div class="fw-step"><div class="fw-num">${s.n}</div><div><h3>${s.title}</h3><p>${s.body}</p></div></div>`).join('');
}

function renderAcCases(){
  return `<div class="ac-note">Read the scenario, then <b>write your own answer using the 5-step framework before opening the model answer</b>. Your written answer may feed the group discussion — write it to defend it out loud.</div>` +
    AC_CONTENT.cases.map(c => {
      const a = c.answer;
      let inner = `<h4>1 · Clarify the problem</h4><p>${a.clarify}</p><h4>2 · Find the root cause</h4><p>${a.root}</p>`;
      let n = 3;
      if(a.options){
        inner += `<h4>${n} · Options &amp; trade-offs</h4>` + a.options.map(o => `<div class="ac-opt"><b>${o.name}</b><span>✅ ${o.pros}</span><span>⚠️ ${o.cons}</span></div>`).join('');
        n++;
      }
      if(a.qa){
        inner += a.qa.map(q => `<h4>${n} · ${q.q}</h4><p>${q.a}</p>`).join('');
        n += a.qa.length;
      }
      if(a.recommend){
        inner += `<h4>${n} · Recommendation &amp; justification</h4><p>${a.recommend}</p>`;
        n++;
      }
      inner += `<h4>${n} · Risk &amp; execution — what could go wrong</h4><p>${a.risk}</p>`;
      return `
    <div class="ac-case">
      <span class="ac-case-tag">${c.tag}</span>
      <h3>${c.title}</h3>
      ${c.scenario.map(p => `<p>${p}</p>`).join('')}
      <table class="ac-data">${c.data.map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
      <p class="ac-task">Your task: ${c.task}</p>
      ${c.assessors ? `<div class="ac-h" style="margin-top:14px">What the assessors are looking for</div><div class="ac-chips">${c.assessors.map(a => `<span>${a}</span>`).join('')}</div>` : ''}
      ${c.strongApproach ? `<div class="ac-quote"><b>Strong approach (from the guide):</b> ${c.strongApproach}</div>` : ''}
      <details><summary>Show model answer (5-step framework)</summary>
        <div class="ac-ans">${inner}</div>
      </details>
    </div>`;
    }).join('');
}

function renderAcGroup(){
  const g = AC_CONTENT.group;
  return `
    <div class="ac-note"><b>${g.title}.</b> ${g.scenario}</div>
    <div class="ac-h">The three rules — commit these to memory</div>
    <div class="ac-rules">
      ${g.rules.map(r => `<div class="ac-rule"><div class="fw-num">${r.n}</div><div><h3>${r.title}</h3><p>${r.body}</p></div></div>`).join('')}
    </div>
    <div class="ac-h">What the assessors are watching for</div>
    <div class="ac-chips">${g.criteria.map(c => `<span>${c}</span>`).join('')}</div>
    <div class="ac-h">Phrases that score points</div>
    ${g.powerPhrases.map(p => `<div class="ac-quote">${p}</div>`).join('')}
    <div class="ac-h">What NOT to do</div>
    <ul class="ac-list">${g.donts.map(d => `<li>${d}</li>`).join('')}</ul>`;
}

function renderAcCbi(){
  const c = AC_CONTENT.cbi;
  return `
    <div class="ac-note"><b>${c.star.name}.</b> ${c.star.steps.map(([k,v]) => `<b>${k}</b> — ${v}`).join(' · ')}</div>
    ${c.questions.map(q => `
    <details class="ac-q">
      <summary>${q.q}</summary>
      <div class="ac-q-body">
        <span class="ac-cmp">${q.competency}</span>
        <ul class="ac-list">${q.how.map(h => `<li>${h}</li>`).join('')}</ul>
        <div class="ac-avoid"><b>Avoid:</b> ${q.avoid}</div>
      </div>
    </details>`).join('')}`;
}

function renderAcPres(){
  const p = AC_CONTENT.presentation;
  return `
    <div class="ac-note">${p.topic}</div>
    <div class="ac-h">Suggested structure</div>
    <ul class="ac-list">${p.structure.map(([k,v]) => `<li><b>${k}</b> — ${v}</li>`).join('')}</ul>
    <div class="ac-h">Delivery tips</div>
    <ul class="ac-list">${p.tips.map(t => `<li>${t}</li>`).join('')}</ul>`;
}

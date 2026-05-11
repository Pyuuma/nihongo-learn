// === 日本語ラボ v1.1 — 日语学习平台应用逻辑 ===

const STORAGE_KEY = 'nihongo_lab_v1';

// ─── 状态管理 ───
function defaultState() {
  return {
    currentDay: 1,
    streak: 0,
    lastCompletedDate: null,
    completedToday: [],
    totalWords: 0,
    totalKanji: 0,
    theme: 'light',
    cardReviews: {}  // {day: {vocabIdx: grade}}
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch(e) {}
  return defaultState();
}

function saveState(s) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch(e) {} }

let state = loadState();

// ─── DOM 工具 ───
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
function todayStr() { return new Date().toISOString().slice(0,10); }

function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── 主题切换 ───
function applyTheme() { document.documentElement.classList.toggle('dark', state.theme==='dark'); }
$('#themeToggle').addEventListener('click', ()=>{
  state.theme = state.theme==='dark' ? 'light' : 'dark';
  applyTheme(); saveState(state);
});

// ─── 重置 ───
$('#resetBtn').addEventListener('click', ()=>{
  if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
    state = defaultState(); saveState(state); applyTheme(); renderAll();
    toast('进度已重置');
  }
});

// ─── Tab 切换 ───
$('#tabNav').addEventListener('click', e=>{
  const btn = e.target.closest('.tab'); if (!btn) return;
  $$('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  renderTab(btn.dataset.tab);
});

// ─── 进度条 ───
function updateProgress() {
  const lesson = COURSE.getLesson(state.currentDay);
  const total = lesson ? (lesson.vocab?.length?1:0)+(lesson.grammar?.length?1:0)+(lesson.kanji?.length?1:0)+1 : 5;
  const done = state.completedToday.filter(Boolean).length;
  $('#progressText').textContent = `${done}/${total} 完成`;
  $('#progressFill').style.width = total ? `${(done/total)*100}%` : '0%';
  $('#statStreak').textContent = state.streak;
  $('#statWords').textContent = state.totalWords;
  $('#statKanji').textContent = state.totalKanji;
  const today = todayStr();
  if (state.lastCompletedDate) {
    const diff = Math.floor((new Date(today)-new Date(state.lastCompletedDate))/86400000);
    if (diff > 1) state.streak = 0;
  }
}

// ─── 标记完成 ───
function markDone(day, sectionIdx) {
  if (!state.completedToday.includes(sectionIdx)) {
    state.completedToday.push(sectionIdx);
    const lesson = COURSE.getLesson(day);
    const total = (lesson.vocab?.length?1:0)+(lesson.grammar?.length?1:0)+(lesson.kanji?.length?1:0)+1;
    if (state.completedToday.length >= total) {
      state.totalWords += (lesson.vocab?.length || 0);
      state.totalKanji += (lesson.kanji?.length || 0);
      state.lastCompletedDate = todayStr();
      state.streak += 1;
      toast(`🎉 Day ${day} 全部完成！+${lesson.vocab?.length||0}词 +${lesson.kanji?.length||0}字`);
      if (state.currentDay < COURSE.getDayCount()) {
        state.currentDay = day + 1; state.completedToday = [];
      }
    } else {
      toast(`✅ ${state.completedToday.length}/${total}`);
    }
    saveState(state); updateProgress(); renderAll();
  }
}

// ─── 渲染入口 ───
function renderAll() {
  applyTheme();
  const tab = $('.tab.active')?.dataset?.tab || 'today';
  renderTab(tab); updateProgress();
}

function renderTab(tabId) {
  const c = $('#tabContent'); c.innerHTML = '';
  ({"today":renderToday,"vocab":renderVocab,"grammar":renderGrammar,"kanji":renderKanji,"roadmap":renderRoadmap}[tabId]||(()=>{}))(c);
}

// ─── 今日任务 ───
function renderToday(container) {
  const lesson = COURSE.getLesson(state.currentDay);
  if (!lesson) { container.innerHTML = '<div class="lesson-card"><h3>🎉</h3><div class="content">28天课程全部完成！复习单词卡和语法吧。</div></div>'; return; }

  // 标题
  const hdr = el('div',`lesson-card ${state.completedToday.includes(0)?'completed':''}`);
  hdr.innerHTML = `<h3><span class="badge badge-review">Day ${lesson.day}</span> ${lesson.title}</h3>
    <div class="content">📌 ${COURSE.phases.find(p=>p.id===lesson.phase)?.name||''}</div>
    ${lesson.tips?`<div class="content" style="color:var(--text2);font-size:.85rem">💡 ${lesson.tips}</div>`:''}
    <div class="actions"><button class="btn ${state.completedToday.includes(0)?'btn-outline':'btn-done'}" id="btnDone0">${state.completedToday.includes(0)?'✅ 已了解':'📖 已阅读'}</button></div>`;
  hdr.querySelector('button').addEventListener('click',()=>markDone(lesson.day,0));
  container.appendChild(hdr);

  // 词汇
  if (lesson.vocab?.length) {
    const sec = 1; const card = el('div',`lesson-card ${state.completedToday.includes(sec)?'completed':''}`);
    let html = ''; lesson.vocab.forEach((v,i)=>{ html+=`<div class="example vocab-item" data-day="${lesson.day}" data-idx="${i}" style="cursor:pointer"><div class="jp">${v.jp} <span style="font-size:.7rem;color:var(--text2)">[${v.reading}]</span></div><div style="font-size:.8rem;color:var(--text2)">${v.meaning}</div></div>`; });
    card.innerHTML = `<h3><span class="badge badge-vocab">📝 词汇</span> ${lesson.vocab.length}词</h3><div class="content">${html}</div>
      <div class="actions"><button class="btn btn-review" id="btnReview">🃏 闪卡复习</button><button class="btn ${state.completedToday.includes(sec)?'btn-outline':'btn-done'}" id="btnDone1">${state.completedToday.includes(sec)?'✅ 已完成':'✓ 标记完成'}</button></div>`;
    card.querySelectorAll('.vocab-item').forEach(el=>{ el.addEventListener('click',()=>openFlashcard(parseInt(el.dataset.day),parseInt(el.dataset.idx))); });
    card.querySelector('#btnReview').addEventListener('click',()=>startFlashcards(lesson.day));
    card.querySelector('#btnDone1').addEventListener('click',()=>markDone(lesson.day,sec));
    container.appendChild(card);
  }

  // 语法
  if (lesson.grammar?.length) {
    const sec = 2; const card = el('div',`lesson-card ${state.completedToday.includes(sec)?'completed':''}`);
    let html = ''; lesson.grammar.forEach(g=>{ html+=`<div class="example"><div class="jp">${g.pattern}</div><div style="font-size:.85rem">${g.desc}</div>${g.ex?`<div style="font-size:.8rem;color:var(--text2);margin-top:4px">例：${g.ex}</div>`:''}</div>`; });
    card.innerHTML = `<h3><span class="badge badge-grammar">📖 语法</span></h3><div class="content">${html}</div>
      <div class="actions"><button class="btn ${state.completedToday.includes(sec)?'btn-outline':'btn-done'}" id="btnDone2">${state.completedToday.includes(sec)?'✅ 已完成':'✓ 已理解'}</button></div>`;
    card.querySelector('#btnDone2').addEventListener('click',()=>markDone(lesson.day,sec));
    container.appendChild(card);
  }

  // 汉字
  if (lesson.kanji?.length) {
    const sec = 3; const card = el('div',`lesson-card ${state.completedToday.includes(sec)?'completed':''}`);
    let html = '<div class="kanji-grid">'; lesson.kanji.forEach(k=>{ html+=`<div class="kanji-cell kanji-item" data-char="${k.char}" data-meaning="${k.meaning}" data-reading="${k.reading}"><div class="kchar">${k.char}</div><div class="kmeaning">${k.meaning}</div></div>`; });
    html += '</div>';
    card.innerHTML = `<h3><span class="badge badge-kanji">🈶 汉字</span> ${lesson.kanji.length}字</h3><div class="content">${html}</div>
      <div class="actions"><button class="btn ${state.completedToday.includes(sec)?'btn-outline':'btn-done'}" id="btnDone3">${state.completedToday.includes(sec)?'✅ 已完成':'✓ 已认读'}</button></div>`;
    card.querySelectorAll('.kanji-item').forEach(el=>{ el.addEventListener('click',()=>toast(`${el.dataset.char} = ${el.dataset.meaning} (${el.dataset.reading})`)); });
    card.querySelector('#btnDone3').addEventListener('click',()=>markDone(lesson.day,sec));
    container.appendChild(card);
  }
}

function el(tag,cls) { const e=document.createElement(tag); if(cls)e.className=cls; return e; }

// ─── 闪卡系统 ───
let flashState = null;

function openFlashcard(day, idx) {
  const lesson = COURSE.getLesson(day);
  if (!lesson?.vocab?.[idx]) return;
  // 单卡模式也设 flashState，让评分按钮可用
  flashState = { day, idx, vocab: lesson.vocab, reviewed: 0, mode: 'single' };
  showCard(lesson.vocab[idx]);
}

function startFlashcards(day) {
  const lesson = COURSE.getLesson(day);
  if (!lesson?.vocab?.length) return;
  flashState = { day, idx: 0, vocab: lesson.vocab, reviewed: 0, mode: 'review' };
  showCard(lesson.vocab[0]);
}

function startAllFlashcards() {
  const all = []; COURSE.daily.forEach(d=>{(d.vocab||[]).forEach(v=>all.push(v));});
  if (!all.length) return;
  flashState = { day:0, idx:0, vocab:all, reviewed:0, mode:'review' };
  showCard(all[0]);
}

function showCard(vocab) {
  const modal = $('#flashcardModal');
  modal.classList.add('active');
  $('#cardFront').innerHTML = `<div class="card-jp">${vocab.jp}</div><div class="card-reading">${vocab.reading}</div>`;
  $('#cardBack').innerHTML = `<div class="card-meaning">${vocab.meaning}</div><div class="card-type">${vocab.type||''}</div>`;
  $('#flashcard').classList.remove('flipped');
  updateCardProgress();
  // 自动聚焦以支持键盘
  modal.focus();
}

// ─── 翻卡 ───
$('#flashcard').addEventListener('click', function(e) {
  // 不拦截按钮点击
  if (e.target.closest('button')) return;
  this.classList.toggle('flipped');
});

// ─── 评分按钮 ───
$$('#cardActions button').forEach(btn => {
  btn.addEventListener('click', function() {
    if (!flashState) return;
    const grade = parseInt(this.dataset.grade);
    
    // 保存评分
    if (flashState.day > 0) {
      if (!state.cardReviews[flashState.day]) state.cardReviews[flashState.day] = {};
      state.cardReviews[flashState.day][flashState.idx] = grade;
      saveState(state);
    }

    flashState.reviewed++;

    if (flashState.mode === 'single') {
      // 单卡模式：评分后关闭
      closeModal();
    } else if (flashState.idx < flashState.vocab.length - 1) {
      flashState.idx++;
      setTimeout(() => showCard(flashState.vocab[flashState.idx]), 150);
    } else {
      // 复习完一轮
      if (flashState.reviewed >= flashState.vocab.length) {
        closeModal();
        toast('🎉 闪卡复习完成！');
      } else {
        flashState.idx = 0;
        setTimeout(() => showCard(flashState.vocab[0]), 150);
      }
    }
  });
});

function closeModal() {
  $('#flashcardModal').classList.remove('active');
  flashState = null;
}

$('.modal-backdrop').addEventListener('click', closeModal);

function updateCardProgress() {
  if (!flashState) { $('#cardProgress').textContent = ''; return; }
  $('#cardProgress').textContent = `${flashState.idx+1}/${flashState.vocab.length} 张 · ${flashState.mode==='single'?'单卡模式':'复习模式'}`;
}

// ─── 键盘快捷键 ───
document.addEventListener('keydown', e => {
  if (!$('#flashcardModal').classList.contains('active')) return;
  switch(e.key) {
    case ' ': case 'Spacebar': e.preventDefault(); $('#flashcard').classList.toggle('flipped'); break;
    case '1': $$('#cardActions button[data-grade="1"]')[0]?.click(); break;
    case '2': $$('#cardActions button[data-grade="2"]')[0]?.click(); break;
    case '3': $$('#cardActions button[data-grade="3"]')[0]?.click(); break;
    case '4': $$('#cardActions button[data-grade="4"]')[0]?.click(); break;
    case 'Escape': closeModal(); break;
  }
});

// ─── 单词卡页 ───
function renderVocab(container) {
  const all = []; COURSE.daily.forEach(d=>{(d.vocab||[]).forEach(v=>all.push(v));});
  container.innerHTML = `<div class="lesson-card"><h3>📝 全部词汇 (${all.length})</h3>
    <div class="content">点击任意单词打开闪卡 | 支持键盘 1-4 评分</div>
    <div class="actions"><button class="btn btn-review" id="btnAllCards">🃏 复习全部</button></div></div>`;
  all.forEach((v,i)=>{ const d=el('div','example'); d.style.cssText='cursor:pointer;margin-bottom:6px';
    d.innerHTML=`<span style="font-weight:600">${v.jp}</span> <span style="color:var(--text2);font-size:.8rem">[${v.reading}]</span> — ${v.meaning} <span style="font-size:.7rem;color:var(--text2)">(Day${v.day})</span>`;
    d.addEventListener('click',()=>openFlashcard(v.day, i));
    container.appendChild(d);
  });
  $('#btnAllCards')?.addEventListener('click', startAllFlashcards);
}

// ─── 语法页 ───
function renderGrammar(container) {
  const all = []; COURSE.daily.forEach(d=>{(d.grammar||[]).forEach(g=>all.push({...g,day:d.day,title:d.title}));});
  all.forEach(g=>{ const e=el('div','grammar-card');
    e.innerHTML=`<div class="pattern">${g.pattern} <span style="font-size:.7rem;color:var(--text2);font-weight:400">Day ${g.day}</span></div><div class="desc">${g.desc}</div>${g.ex?`<div class="ex">📌 ${g.ex}</div>`:''}`;
    container.appendChild(e);
  });
}

// ─── 汉字页 ───
function renderKanji(container) {
  const all=[],seen=new Set(); COURSE.daily.forEach(d=>{(d.kanji||[]).forEach(k=>{if(!seen.has(k.char)){seen.add(k.char);all.push(k);}})});
  container.innerHTML = `<div class="lesson-card"><h3>🈶 已学汉字 (${all.length})</h3></div><div class="kanji-grid">${all.map(k=>`<div class="kanji-cell" data-char="${k.char}"><div class="kchar">${k.char}</div><div class="kmeaning">${k.meaning}</div></div>`).join('')}</div>`;
  container.querySelectorAll('.kanji-cell').forEach(el=>{ el.addEventListener('click',()=>toast(`${el.dataset.char} = ${el.querySelector('.kmeaning').textContent}`)); });
}

// ─── 路线图 ───
function renderRoadmap(container) {
  const cp = COURSE.getLesson(state.currentDay)?.phase||'kana';
  COURSE.phases.forEach(p=>{ const e=el('div',`roadmap-phase ${p.id===cp?'phase-current':''}`);
    e.innerHTML=`<h3>${p.id===cp?'📍 ':''}${p.name}</h3><div class="meta">⏱ ${p.weeks} | 🎯 ${p.goal}</div><ul>${phaseDetails(p.id)}</ul>`; container.appendChild(e);
  });
  const r=el('div','roadmap-phase');
  r.innerHTML=`<h3>🔗 资源</h3><ul style="font-size:.85rem">
    <li><a href="https://apps.ankiweb.net/" target="_blank" style="color:var(--accent)">Anki - 间隔重复</a></li>
    <li><a href="https://yomitan.wiki/" target="_blank" style="color:var(--accent)">Yomitan - 浏览器词典</a></li>
    <li><a href="https://www.tofugu.com/japanese/learn-hiragana/" target="_blank" style="color:var(--accent)">Tofugu 假名记忆法</a></li>
    <li><a href="https://guidetojapanese.org/learn/grammar" target="_blank" style="color:var(--accent)">Tae Kim 语法指南</a></li>
    <li><a href="https://github.com/yudataguy/Awesome-Japanese" target="_blank" style="color:var(--accent)">Awesome Japanese (GitHub)</a></li>
    <li><a href="https://github.com/donkuri/japanese-resources" target="_blank" style="color:var(--accent)">沉浸式学习资源</a></li></ul>`;
  container.appendChild(r);
}

function phaseDetails(id) {
  const m={'kana':'<li>平假名46字 (Day1-10)</li><li>片假名46字 (Day11-14)</li><li>工具：Tofugu + Kana Quiz + Anki</li>',
    'beginner':'<li>Genki I 对应内容</li><li>〜です/ます句型</li><li>こそあど指示词</li><li>数字/时间/日期</li><li>ある/いる存在句</li><li>工具：Anki Kaishi 1.5k + Yomitan</li>',
    'elementary':'<li>Genki II 对应内容</li><li>て形/た形活用</li><li>简体vs敬体</li><li>300+汉字(RRTK法)</li><li>工具：Language Reactor + NHK Easy</li>',
    'travel':'<li>交通问路全套场景</li><li>餐厅点餐/结账</li><li>购物/免税</li><li>酒店入住/退房</li><li>独立应对日本旅游全部场景</li>'};
  return m[id]||'';
}

// ─── 启动 ───
applyTheme(); renderAll();

// === 日语学习平台 - 应用逻辑 ===

const STORAGE_KEY = 'nihongo_lab_state';

// 默认状态
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

// 读/写状态
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch(e) {}
  return defaultState();
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch(e) {}
}

let state = loadState();

// ─── 工具函数 ───
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

function todayStr() {
  return new Date().toISOString().slice(0,10);
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2000);
}

// ─── 主题切换 ───
function applyTheme() {
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
}
$('#themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  saveState(state);
});

// ─── 重置 ───
$('#resetBtn').addEventListener('click', () => {
  if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
    state = defaultState();
    saveState(state);
    applyTheme();
    renderAll();
    toast('进度已重置');
  }
});

// ─── Tab 切换 ───
$('#tabNav').addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  $$('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderTab(btn.dataset.tab);
});

// ─── 渲染入口 ───
function renderAll() {
  applyTheme();
  const activeTab = $('.tab.active')?.dataset?.tab || 'today';
  renderTab(activeTab);
  updateProgress();
}

function renderTab(tabId) {
  const container = $('#tabContent');
  container.innerHTML = '';
  switch(tabId) {
    case 'today': renderToday(container); break;
    case 'vocab': renderFlashcards(container); break;
    case 'grammar': renderGrammar(container); break;
    case 'kanji': renderKanji(container); break;
    case 'roadmap': renderRoadmap(container); break;
  }
}

// ─── 进度条 ───
function updateProgress() {
  const lesson = COURSE.getLesson(state.currentDay);
  if (!lesson) return;
  const total = (lesson.vocab?.length || 0) + (lesson.grammar?.length || 0) + (lesson.kanji?.length || 0) + 1;
  const done = state.completedToday.filter(Boolean).length;
  $('#progressText').textContent = `${done}/${total} 完成`;
  $('#progressFill').style.width = total ? `${(done/total)*100}%` : '0%';
  $('#statStreak').textContent = state.streak;
  $('#statWords').textContent = state.totalWords;
  $('#statKanji').textContent = state.totalKanji;
  
  // 检查连续天数
  const today = todayStr();
  if (state.lastCompletedDate) {
    const last = new Date(state.lastCompletedDate);
    const cur = new Date(today);
    const diff = Math.floor((cur - last) / 86400000);
    if (diff > 1) state.streak = 0;
  }
}

// ─── 标记完成 ───
function markDone(day, sectionIdx) {
  if (!state.completedToday.includes(sectionIdx)) {
    state.completedToday.push(sectionIdx);
    const lesson = COURSE.getLesson(day);
    const total = (lesson.vocab?.length || 0) + (lesson.grammar?.length || 0) + (lesson.kanji?.length || 0) + 1;
    if (state.completedToday.length >= total) {
      state.totalWords += (lesson.vocab?.length || 0);
      state.totalKanji += (lesson.kanji?.length || 0);
      state.lastCompletedDate = todayStr();
      state.streak += 1;
      toast('🎉 今日任务全部完成！');
    } else {
      const pct = Math.round((state.completedToday.length/total)*100);
      toast(`✅ 已完成 ${pct}%`);
    }
    saveState(state);
    
    // 完成后推进到下一天
    if (state.completedToday.length >= total && state.currentDay < COURSE.getDayCount()) {
      state.currentDay = day + 1;
      state.completedToday = [];
      saveState(state);
    }
    updateProgress();
    renderAll();
  }
}

// ─── 今日任务 ───
function renderToday(container) {
  const lesson = COURSE.getLesson(state.currentDay);
  if (!lesson) {
    container.innerHTML = `<div class="lesson-card"><h3>🎉 恭喜！</h3><div class="content">你已完成所有28天课程！可以复习之前的单词和语法。</div></div>`;
    return;
  }

  const totalSections = (lesson.vocab?.length?1:0) + (lesson.grammar?.length?1:0) + (lesson.kanji?.length?1:0) + 1;

  // 课程标题
  const header = document.createElement('div');
  header.className = `lesson-card ${state.completedToday.includes(0) ? 'completed' : ''}`;
  header.innerHTML = `
    <h3><span class="badge badge-review">Day ${lesson.day}</span> ${lesson.title}</h3>
    <div class="content">📌 阶段：${COURSE.phases.find(p=>p.id===lesson.phase)?.name || lesson.phase}</div>
    ${lesson.tips ? `<div class="content" style="color:var(--text2);font-size:.85rem">💡 ${lesson.tips}</div>` : ''}
    <div class="actions">
      <button class="btn ${state.completedToday.includes(0)?'btn-outline':'btn-done'}" onclick="markDone(${lesson.day},0)">${state.completedToday.includes(0)?'✅ 已了解':'📖 已阅读'}</button>
    </div>`;
  container.appendChild(header);

  // 词汇
  if (lesson.vocab?.length) {
    const sectionIdx = 1;
    const card = document.createElement('div');
    card.className = `lesson-card ${state.completedToday.includes(sectionIdx) ? 'completed' : ''}`;
    let vocabHtml = '';
    lesson.vocab.forEach((v,i) => {
      vocabHtml += `
        <div class="example" style="cursor:pointer" onclick="openFlashcard(${lesson.day},${i})">
          <div class="jp">${v.jp} <span style="font-size:.7rem;color:var(--text2)">[${v.reading}]</span></div>
          <div style="font-size:.8rem;color:var(--text2)">${v.meaning}</div>
        </div>`;
    });
    card.innerHTML = `
      <h3><span class="badge badge-vocab">📝 词汇</span> ${lesson.vocab.length} 个单词</h3>
      <div class="content">${vocabHtml}</div>
      <div class="actions">
        <button class="btn btn-review" onclick="startFlashcards(${lesson.day})">🃏 闪卡复习</button>
        <button class="btn ${state.completedToday.includes(sectionIdx)?'btn-outline':'btn-done'}" onclick="markDone(${lesson.day},${sectionIdx})">${state.completedToday.includes(sectionIdx)?'✅ 已完成':'✓ 标记完成'}</button>
      </div>`;
    container.appendChild(card);
  }

  // 语法
  if (lesson.grammar?.length) {
    const sectionIdx = 2;
    const card = document.createElement('div');
    card.className = `lesson-card ${state.completedToday.includes(sectionIdx) ? 'completed' : ''}`;
    let grammarHtml = '';
    lesson.grammar.forEach(g => {
      grammarHtml += `
        <div class="example">
          <div class="jp">${g.pattern}</div>
          <div style="font-size:.85rem">${g.desc}</div>
          ${g.ex ? `<div style="font-size:.8rem;color:var(--text2);margin-top:4px">例：${g.ex}</div>` : ''}
        </div>`;
    });
    card.innerHTML = `
      <h3><span class="badge badge-grammar">📖 语法</span></h3>
      <div class="content">${grammarHtml}</div>
      <div class="actions">
        <button class="btn ${state.completedToday.includes(sectionIdx)?'btn-outline':'btn-done'}" onclick="markDone(${lesson.day},${sectionIdx})">${state.completedToday.includes(sectionIdx)?'✅ 已完成':'✓ 已理解'}</button>
      </div>`;
    container.appendChild(card);
  }

  // 汉字
  if (lesson.kanji?.length) {
    const sectionIdx = 3;
    const card = document.createElement('div');
    card.className = `lesson-card ${state.completedToday.includes(sectionIdx) ? 'completed' : ''}`;
    let kanjiHtml = '<div class="kanji-grid">';
    lesson.kanji.forEach(k => {
      kanjiHtml += `<div class="kanji-cell" onclick="toast('${k.char} = ${k.meaning} (${k.reading})')"><div class="kchar">${k.char}</div><div class="kmeaning">${k.meaning}</div></div>`;
    });
    kanjiHtml += '</div>';
    card.innerHTML = `
      <h3><span class="badge badge-kanji">🈶 汉字</span> ${lesson.kanji.length} 个字</h3>
      <div class="content">${kanjiHtml}</div>
      <div class="actions">
        <button class="btn ${state.completedToday.includes(sectionIdx)?'btn-outline':'btn-done'}" onclick="markDone(${lesson.day},${sectionIdx})">${state.completedToday.includes(sectionIdx)?'✅ 已完成':'✓ 已认读'}</button>
      </div>`;
    container.appendChild(card);
  }
}

// ─── 闪卡系统 ───
let flashState = null;

function openFlashcard(day, idx) {
  const lesson = COURSE.getLesson(day);
  if (!lesson?.vocab?.[idx]) return;
  const v = lesson.vocab[idx];
  showModal(v);
}

function startFlashcards(day) {
  const lesson = COURSE.getLesson(day);
  if (!lesson?.vocab?.length) return;
  flashState = { day, idx: 0, vocab: lesson.vocab, reviewed: 0 };
  showModal(lesson.vocab[0]);
}

function showModal(vocab) {
  const modal = $('#flashcardModal');
  modal.classList.add('active');
  $('#cardFront').innerHTML = `<div class="card-jp">${vocab.jp}</div><div class="card-reading">${vocab.reading}</div>`;
  $('#cardBack').innerHTML = `<div class="card-meaning">${vocab.meaning}</div><div style="font-size:.8rem;color:var(--text2)">${vocab.type}</div>`;
  const card = $('#flashcard');
  card.classList.remove('flipped');
  updateCardProgress();
}

$('#flashcard').addEventListener('click', function() {
  this.classList.toggle('flipped');
});

$$('.card-actions button').forEach(btn => {
  btn.addEventListener('click', function() {
    if (!flashState) return;
    const grade = parseInt(this.dataset.grade);
    flashState.reviewed++;
    
    if (flashState.idx < flashState.vocab.length - 1) {
      flashState.idx++;
      setTimeout(() => showModal(flashState.vocab[flashState.idx]), 200);
    } else {
      if (flashState.reviewed >= flashState.vocab.length) {
        $('#flashcardModal').classList.remove('active');
        flashState = null;
        toast('🎉 闪卡复习完成！');
      } else {
        flashState.idx = 0;
        setTimeout(() => showModal(flashState.vocab[0]), 200);
      }
    }
  });
});

$('.modal-backdrop').addEventListener('click', () => {
  $('#flashcardModal').classList.remove('active');
  flashState = null;
});

function updateCardProgress() {
  if (!flashState) {
    $('#cardProgress').textContent = '';
    return;
  }
  $('#cardProgress').textContent = `${flashState.idx + 1} / ${flashState.vocab.length} 张卡片`;
}

// ─── 全部词汇闪卡页 ───
function renderFlashcards(container) {
  const allVocab = [];
  COURSE.daily.forEach(lesson => {
    (lesson.vocab||[]).forEach((v,i) => {
      allVocab.push({ ...v, day: lesson.day, idx: i, title: lesson.title });
    });
  });

  if (!allVocab.length) {
    container.innerHTML = '<div class="lesson-card"><div class="content">暂无词汇数据</div></div>';
    return;
  }

  container.innerHTML = `
    <div class="lesson-card">
      <h3>📝 全部词汇 (${allVocab.length})</h3>
      <div class="content">点击下方任意单词开始闪卡复习</div>
      <div class="actions">
        <button class="btn btn-review" onclick="startAllFlashcards()">🃏 复习全部</button>
      </div>
    </div>`;

  allVocab.forEach((v,i) => {
    const el = document.createElement('div');
    el.className = 'example';
    el.style.cssText = 'cursor:pointer;margin-bottom:6px';
    el.innerHTML = `<span style="font-weight:600">${v.jp}</span> <span style="color:var(--text2);font-size:.8rem">[${v.reading}]</span> — ${v.meaning} <span style="font-size:.7rem;color:var(--text2)">(Day${v.day})</span>`;
    el.addEventListener('click', () => {
      flashState = { day: v.day, idx: i, vocab: allVocab, reviewed: 0 };
      showModal(v);
    });
    container.appendChild(el);
  });
}

function startAllFlashcards() {
  const allVocab = [];
  COURSE.daily.forEach(lesson => {
    (lesson.vocab||[]).forEach(v => allVocab.push(v));
  });
  if (allVocab.length) {
    flashState = { day: 0, idx: 0, vocab: allVocab, reviewed: 0 };
    showModal(allVocab[0]);
  }
}

// ─── 语法页 ───
function renderGrammar(container) {
  const allGrammar = [];
  COURSE.daily.forEach(lesson => {
    (lesson.grammar||[]).forEach(g => allGrammar.push({...g, day:lesson.day, title:lesson.title}));
  });

  if (!allGrammar.length) {
    container.innerHTML = '<div class="lesson-card"><div class="content">暂无语法数据</div></div>';
    return;
  }

  allGrammar.forEach(g => {
    const el = document.createElement('div');
    el.className = 'grammar-card';
    el.innerHTML = `
      <div class="pattern">${g.pattern} <span style="font-size:.7rem;color:var(--text2);font-weight:400">Day ${g.day}</span></div>
      <div class="desc">${g.desc}</div>
      ${g.ex ? `<div class="ex">📌 ${g.ex}</div>` : ''}`;
    container.appendChild(el);
  });
}

// ─── 汉字页 ───
function renderKanji(container) {
  const allKanji = [];
  const seen = new Set();
  COURSE.daily.forEach(lesson => {
    (lesson.kanji||[]).forEach(k => {
      if (!seen.has(k.char)) {
        seen.add(k.char);
        allKanji.push(k);
      }
    });
  });

  if (!allKanji.length) {
    container.innerHTML = '<div class="lesson-card"><div class="content">暂无汉字数据</div></div>';
    return;
  }

  container.innerHTML = `<div class="lesson-card" style="margin-bottom:12px"><h3>🈶 已学汉字 (${allKanji.length})</h3></div>
    <div class="kanji-grid">${allKanji.map(k => 
      `<div class="kanji-cell" onclick="toast('${k.char} = ${k.meaning} (${k.reading})')"><div class="kchar">${k.char}</div><div class="kmeaning">${k.meaning}</div></div>`
    ).join('')}</div>`;
}

// ─── 路线图 ───
function renderRoadmap(container) {
  const phases = COURSE.phases;
  const currentPhase = COURSE.getLesson(state.currentDay)?.phase || 'kana';
  
  phases.forEach((phase, i) => {
    const el = document.createElement('div');
    el.className = `roadmap-phase ${phase.id === currentPhase ? 'phase-current' : ''}`;
    el.innerHTML = `
      <h3>${phase.id === currentPhase ? '📍 ' : ''}${phase.name}</h3>
      <div class="meta">⏱ ${phase.weeks} | 🎯 ${phase.goal}</div>
      <ul>${getPhaseDetails(phase.id)}</ul>`;
    container.appendChild(el);
  });

  // 额外资源
  const res = document.createElement('div');
  res.className = 'roadmap-phase';
  res.innerHTML = `
    <h3>🔗 重要资源</h3>
    <ul style="font-size:.85rem">
      <li><a href="https://apps.ankiweb.net/" target="_blank" style="color:var(--accent)">Anki - 间隔重复记忆</a></li>
      <li><a href="https://yomitan.wiki/" target="_blank" style="color:var(--accent)">Yomitan - 浏览器词典悬浮弹窗</a></li>
      <li><a href="https://www.tofugu.com/japanese/learn-hiragana/" target="_blank" style="color:var(--accent)">Tofugu 假名记忆法</a></li>
      <li><a href="https://guidetojapanese.org/learn/grammar" target="_blank" style="color:var(--accent)">Tae Kim 语法指南</a></li>
      <li><a href="https://github.com/yudataguy/Awesome-Japanese" target="_blank" style="color:var(--accent)">Awesome Japanese (GitHub)</a></li>
      <li><a href="https://github.com/donkuri/japanese-resources" target="_blank" style="color:var(--accent)">沉浸式学习资源汇总</a></li>
    </ul>`;
  container.appendChild(res);
}

function getPhaseDetails(phaseId) {
  const map = {
    'kana': '<li>平假名46字 (Day1-10)</li><li>片假名46字 (Day11-14)</li><li>工具：Tofugu + Kana Quiz + Anki</li><li>目标：5秒内读出任意假名</li>',
    'beginner': '<li>Genki I 前6课内容</li><li>基本句型：〜です/ます</li><li>こそあど指示词体系</li><li>数字/时间/日期</li><li>ある/いる存在句</li><li>喜欢/想要/能力表达</li><li>工具：Anki Kaishi 1.5k + Yomitan</li>',
    'elementary': '<li>Genki II 对应内容</li><li>て形/た形/ない形活用</li><li>简体 vs 敬体</li><li>条件句/被动/使役</li><li>300+汉字 (RRTK法)</li><li>工具：Language Reactor + NHK News Easy</li>',
    'travel': '<li>交通问路全套场景</li><li>餐厅点餐/结账</li><li>购物议价/免税</li><li>酒店入住/退房</li><li>紧急情况应对</li><li>日常寒暄进阶</li><li>目标：独立应对日本旅游全部场景</li>'
  };
  return map[phaseId] || '';
}

// ─── 启动 ───
applyTheme();
renderAll();

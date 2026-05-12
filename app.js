// === 日本語ラボ v2.0 — SRS引擎 + 复习计划 ===

const STORAGE_KEY = 'nihongo_v2';
const SRS_KEY = 'nihongo_srs';

// ─── SRS 默认值 ───
function defaultSRS() { return { interval: 0, ease: 2.5, reps: 0, lapses: 0, due: todayStr() }; }

// ─── 状态管理 ───
function defaultState() {
  return { currentDay:1, streak:0, lastCompletedDate:null, completedToday:[], totalWords:0, totalKanji:0, theme:'light' };
}
function loadState() { try{ const r=localStorage.getItem(STORAGE_KEY); return r?{...defaultState(),...JSON.parse(r)}:defaultState(); }catch(e){return defaultState();} }
function saveState(s) { try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }catch(e){} }
function loadSRS() { try{ const r=localStorage.getItem(SRS_KEY); return r?JSON.parse(r):{}; }catch(e){return {};} }
function saveSRS(srs) { try{ localStorage.setItem(SRS_KEY, JSON.stringify(srs)); }catch(e){} }

let state = loadState();
let srs = loadSRS();

// ─── DOM工具 ───
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
function todayStr() { return new Date().toISOString().slice(0,10); }
function el(tag,cls) { const e=document.createElement(tag); if(cls)e.className=cls; return e; }
function toast(msg) { const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2200); }

// ─── SRS 引擎 ───
function getDueCards() {
  const today = todayStr();
  return ALL_CARDS.filter(c => {
    const sc = srs[c.id];
    if (!sc) return false; // 没学过的不算due
    return sc.due <= today;
  });
}

function getNewCards(day, count) {
  const lesson = COURSE.getCardsForDay(day);
  if (!lesson.length) return [];
  return lesson.filter(c => !srs[c.id]).slice(0, count || 10);
}

function getLearnedCount() { return Object.keys(srs).length; }
function getTotalCards() { return ALL_CARDS.length; }

function updateSRS(cardId, grade) {
  const card = srs[cardId] || { ...defaultSRS() };
  
  if (grade <= 1) {
    // 忘记：重置间隔
    card.lapses += 1;
    card.interval = 1;
    card.ease = Math.max(1.3, card.ease - 0.15);
  } else if (grade === 2) {
    // 困难
    card.interval = Math.max(1, card.interval * 1.2);
    card.ease = Math.max(1.3, card.ease - 0.1);
  } else if (grade === 3) {
    // 良好
    if (card.reps === 0) card.interval = 1;
    else if (card.reps === 1) card.interval = 3;
    else card.interval = Math.round(card.interval * card.ease);
  } else {
    // 简单
    if (card.reps === 0) card.interval = 3;
    else if (card.reps === 1) card.interval = 7;
    else card.interval = Math.round(card.interval * card.ease * 1.3);
    card.ease = Math.min(3.0, card.ease + 0.1);
  }
  
  card.reps += 1;
  card.due = addDays(todayStr(), Math.max(1, Math.round(card.interval)));
  srs[cardId] = card;
  saveSRS(srs);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}

// ─── 主题 ───
function applyTheme() { document.documentElement.classList.toggle('dark', state.theme==='dark'); }
$('#themeToggle').addEventListener('click',()=>{ state.theme=state.theme==='dark'?'light':'dark'; applyTheme(); saveState(state); });
$('#resetBtn').addEventListener('click',()=>{ if(confirm('重置所有进度？不可撤销。')){ state=defaultState(); srs={}; saveState(state); saveSRS(srs); applyTheme(); renderAll(); toast('已重置'); }});

// ─── Tab ───
$('#tabNav').addEventListener('click', e=>{ const b=e.target.closest('.tab'); if(!b)return; $$('.tab').forEach(t=>t.classList.remove('active')); b.classList.add('active'); renderTab(b.dataset.tab); });

// ─── 进度条 ───
function updateProgress() {
  const lesson = COURSE.getLesson(state.currentDay);
  const total = lesson?(lesson.vocab?.length?1:0)+(lesson.grammar?.length?1:0)+(lesson.kanji?.length?1:0)+1:5;
  const done = state.completedToday.filter(Boolean).length;
  $('#progressText').textContent = `${done}/${total}`;
  $('#progressFill').style.width = total?`${(done/total)*100}%`:'0%';
  $('#statStreak').textContent = state.streak;
  $('#statWords').textContent = getLearnedCount();
  $('#statKanji').textContent = state.totalKanji;
}

function markDone(day, sectionIdx) {
  if (!state.completedToday.includes(sectionIdx)) {
    state.completedToday.push(sectionIdx);
    const lesson = COURSE.getLesson(day);
    const total = (lesson.vocab?.length?1:0)+(lesson.grammar?.length?1:0)+(lesson.kanji?.length?1:0)+1;
    if (state.completedToday.length >= total) {
      state.totalKanji += (lesson.kanji?.length||0);
      state.lastCompletedDate = todayStr(); state.streak+=1;
      toast(`🎉 Day ${day} 完成！`);
      if (state.currentDay < COURSE.getDayCount()) { state.currentDay = day+1; state.completedToday=[]; }
    } else { toast(`✅ ${state.completedToday.length}/${total}`); }
    saveState(state); updateProgress(); renderAll();
  }
}

// ─── 渲染入口 ───
function renderAll() { applyTheme(); const tab=$('.tab.active')?.dataset?.tab||'plan'; renderTab(tab); updateProgress(); }
function renderTab(id) { const c=$('#tabContent');c.innerHTML=''; ({"plan":renderPlan,"today":renderToday,"vocab":renderVocab,"grammar":renderGrammar,"kanji":renderKanji,"roadmap":renderRoadmap}[id]||renderPlan)(c); }

// ═══════════════════════════════════════════
// 🆕 复习计划 Tab（新首页）
// ═══════════════════════════════════════════
function renderPlan(container) {
  const due = getDueCards();
  const dayCards = COURSE.getCardsForDay(state.currentDay);
  const newCards = dayCards.filter(c => !srs[c.id]);
  const learned = getLearnedCount();
  const total = getTotalCards();

  container.innerHTML = `
    <div class="lesson-card" style="border-left:4px solid var(--accent)">
      <h3>📋 今日学习计划</h3>
      <div class="content" style="font-size:.9rem">
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin:12px 0">
          <div style="flex:1;min-width:100px;text-align:center;padding:12px;background:var(--bg2);border-radius:8px">
            <div style="font-size:1.8rem;font-weight:700;color:#e53935">${due.length}</div>
            <div style="font-size:.75rem;color:var(--text2)">待复习</div>
          </div>
          <div style="flex:1;min-width:100px;text-align:center;padding:12px;background:var(--bg2);border-radius:8px">
            <div style="font-size:1.8rem;font-weight:700;color:#1e88e5">${newCards.length}</div>
            <div style="font-size:.75rem;color:var(--text2)">新卡片</div>
          </div>
          <div style="flex:1;min-width:100px;text-align:center;padding:12px;background:var(--bg2);border-radius:8px">
            <div style="font-size:1.8rem;font-weight:700;color:var(--green)">${learned}/${total}</div>
            <div style="font-size:.75rem;color:var(--text2)">总进度</div>
          </div>
        </div>
        <div style="margin-top:12px">
          <button class="btn btn-review" id="btnStartSession" style="width:100%;padding:14px;font-size:1rem">
            🚀 开始学习 (${due.length+newCards.length} 张卡片)
          </button>
        </div>
      </div>
    </div>

    <div class="lesson-card">
      <h3>📅 Day ${state.currentDay} · ${COURSE.getLesson(state.currentDay)?.title||''}</h3>
      <div class="content">
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn btn-outline" id="btnGoToday" style="flex:1">📅 查看课程</button>
          <button class="btn btn-outline" id="btnGoVocab" style="flex:1">📝 单词库</button>
          <button class="btn btn-outline" id="btnGoGrammar" style="flex:1">📖 语法</button>
        </div>
      </div>
    </div>

    ${due.length > 0 ? `
    <div class="lesson-card">
      <h3>⏰ 待复习卡片</h3>
      <div class="content">${due.slice(0,10).map(c=>`<span style="display:inline-block;margin:3px;padding:4px 10px;background:var(--bg2);border-radius:6px;font-size:.85rem">${c.jp}<span style="color:var(--text2);font-size:.7rem"> ${c.reading}</span></span>`).join('')}${due.length>10?`<div style="font-size:.75rem;color:var(--text2);margin-top:4px">...还有 ${due.length-10} 张</div>`:''}</div>
    </div>` : ''}
  `;

  $('#btnStartSession').addEventListener('click', startSession);
  $('#btnGoToday').addEventListener('click', ()=>{ $$('.tab').forEach(t=>t.classList.remove('active')); $('[data-tab="today"]').classList.add('active'); renderTab('today'); });
  $('#btnGoVocab').addEventListener('click', ()=>{ $$('.tab').forEach(t=>t.classList.remove('active')); $('[data-tab="vocab"]').classList.add('active'); renderTab('vocab'); });
  $('#btnGoGrammar').addEventListener('click', ()=>{ $$('.tab').forEach(t=>t.classList.remove('active')); $('[data-tab="grammar"]').classList.add('active'); renderTab('grammar'); });
}

// ─── 学习会话：复习卡片(乱序) + 新卡片 ───
function startSession() {
  const due = getDueCards();
  const newCards = getNewCards(state.currentDay, 8);
  
  // 去重（可能同一张卡既due又是new）
  const dueIds = new Set(due.map(c=>c.id));
  const filteredNew = newCards.filter(c=>!dueIds.has(c.id));
  
  // 复习卡片乱序 + 新卡片
  const reviewCards = shuffle([...due]);
  const sessionCards = [...reviewCards, ...filteredNew];
  
  if (!sessionCards.length) {
    toast('📭 暂无需要学习的卡片，明天再来！');
    return;
  }

  flashState = { idx:0, cards:sessionCards, dueCount:reviewCards.length, newCount:filteredNew.length };
  showCard(sessionCards[0]);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i=a.length-1; i>0; i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ─── 今日任务 ───
function renderToday(container) {
  const lesson = COURSE.getLesson(state.currentDay);
  if (!lesson) { container.innerHTML='<div class="lesson-card"><h3>🎉</h3><div class="content">28天课程全部完成！</div></div>'; return; }

  const hdr=el('div',`lesson-card ${state.completedToday.includes(0)?'completed':''}`);
  hdr.innerHTML=`<h3><span class="badge badge-review">Day ${lesson.day}</span> ${lesson.title}</h3><div class="content">📌 ${COURSE.phases.find(p=>p.id===lesson.phase)?.name||''}</div>${lesson.tips?`<div class="content" style="color:var(--text2);font-size:.85rem">💡 ${lesson.tips}</div>`:''}<div class="actions"><button class="btn ${state.completedToday.includes(0)?'btn-outline':'btn-done'}">${state.completedToday.includes(0)?'✅ 已了解':'📖 已阅读'}</button></div>`;
  hdr.querySelector('button').addEventListener('click',()=>markDone(lesson.day,0));
  container.appendChild(hdr);

  if (lesson.vocab?.length) {
    const sec=1; const card=el('div',`lesson-card ${state.completedToday.includes(sec)?'completed':''}`);
    let html=''; lesson.vocab.forEach((v,i)=>{ html+=`<div class="example vocab-item" data-id="${v.id}" style="cursor:pointer"><div class="jp">${v.jp} <span style="font-size:.7rem;color:var(--text2)">[${v.reading}]</span></div><div style="font-size:.8rem;color:var(--text2)">${v.meaning}</div>${srs[v.id]?`<span style="font-size:.65rem;color:var(--green)"> ✅ 已学</span>`:`<span style="font-size:.65rem;color:var(--text2)"> 🆕 新</span>`}</div>`; });
    card.innerHTML=`<h3><span class="badge badge-vocab">📝 词汇</span> ${lesson.vocab.length}词</h3><div class="content">${html}</div><div class="actions"><button class="btn btn-review">🃏 闪卡复习</button><button class="btn ${state.completedToday.includes(sec)?'btn-outline':'btn-done'}">${state.completedToday.includes(sec)?'✅ 已完成':'✓ 标记完成'}</button></div>`;
    card.querySelectorAll('.vocab-item').forEach(el=>{ el.addEventListener('click',()=>{ const c=ALL_CARDS.find(x=>x.id===el.dataset.id); if(c){ flashState={idx:0,cards:[c],dueCount:0,newCount:1}; showCard(c); }}); });
    card.querySelector('.btn-review').addEventListener('click',()=>{ flashState={idx:0,cards:lesson.vocab,dueCount:0,newCount:lesson.vocab.length}; showCard(lesson.vocab[0]); });
    card.querySelector('.btn-done,.btn-outline')?.addEventListener('click',()=>markDone(lesson.day,sec));
    container.appendChild(card);
  }

  if (lesson.grammar?.length) {
    const sec=2; const card=el('div',`lesson-card ${state.completedToday.includes(sec)?'completed':''}`); let html=''; lesson.grammar.forEach(g=>{ html+=`<div class="example"><div class="jp">${g.pattern}</div><div style="font-size:.85rem">${g.desc}</div>${g.ex?`<div style="font-size:.8rem;color:var(--text2);margin-top:4px">例：${g.ex}</div>`:''}</div>`; });
    card.innerHTML=`<h3><span class="badge badge-grammar">📖 语法</span></h3><div class="content">${html}</div><div class="actions"><button class="btn ${state.completedToday.includes(sec)?'btn-outline':'btn-done'}">${state.completedToday.includes(sec)?'✅ 已完成':'✓ 已理解'}</button></div>`;
    card.querySelector('button').addEventListener('click',()=>markDone(lesson.day,sec));
    container.appendChild(card);
  }

  if (lesson.kanji?.length) {
    const sec=3; const card=el('div',`lesson-card ${state.completedToday.includes(sec)?'completed':''}`); let html='<div class="kanji-grid">'; lesson.kanji.forEach(k=>{ html+=`<div class="kanji-cell"><div class="kchar">${k.char}</div><div class="kmeaning">${k.meaning}</div></div>`; }); html+='</div>';
    card.innerHTML=`<h3><span class="badge badge-kanji">🈶 汉字</span> ${lesson.kanji.length}字</h3><div class="content">${html}</div><div class="actions"><button class="btn ${state.completedToday.includes(sec)?'btn-outline':'btn-done'}">${state.completedToday.includes(sec)?'✅ 已完成':'✓ 已认读'}</button></div>`;
    card.querySelector('button').addEventListener('click',()=>markDone(lesson.day,sec));
    container.appendChild(card);
  }
}

// ─── 闪卡系统 ───
let flashState = null;

function showCard(card) {
  const modal = $('#flashcardModal'); modal.classList.add('active');
  $('#cardFront').innerHTML = `<div class="card-jp">${card.jp}</div><div class="card-reading">${card.reading}</div>`;
  $('#cardBack').innerHTML = `<div class="card-meaning">${card.meaning}</div><div class="card-type">${card.type||''} · Day ${card.day||'?'} ${srs[card.id]?`· ⏱ ${srs[card.id].interval}天`:'· 🆕'}</div>`;
  $('#flashcard').classList.remove('flipped');
  updateCardProgress();
}

$('#flashcard').addEventListener('click', function(e) { if(!e.target.closest('button')) this.classList.toggle('flipped'); });

$$('#cardActions button').forEach(btn => { btn.addEventListener('click', function() {
  if (!flashState) return;
  const grade = parseInt(this.dataset.grade);
  const card = flashState.cards[flashState.idx];
  
  // 更新SRS
  if (card) updateSRS(card.id, grade);
  
  if (flashState.idx < flashState.cards.length - 1) {
    flashState.idx++;
    setTimeout(() => showCard(flashState.cards[flashState.idx]), 150);
  } else {
    closeModal();
    const learned = getLearnedCount();
    toast(`🎉 完成！已学 ${learned}/${getTotalCards()} 张`);
    updateProgress();
  }
}); });

function closeModal() { $('#flashcardModal').classList.remove('active'); flashState=null; }
$('.modal-backdrop').addEventListener('click', closeModal);

function updateCardProgress() {
  if (!flashState) { $('#cardProgress').textContent=''; return; }
  const c=flashState.cards[flashState.idx];
  $('#cardProgress').textContent = `${flashState.idx+1}/${flashState.cards.length} · ${c&&srs[c.id]?`间隔:${srs[c.id].interval}天`:'🆕'} · 复习${flashState.dueCount||0}+新${flashState.newCount||0}`;
}

// 键盘
document.addEventListener('keydown', e=>{ if(!$('#flashcardModal').classList.contains('active')) return; switch(e.key){ case' ':case'Spacebar':e.preventDefault();$('#flashcard').classList.toggle('flipped');break; case'1':$$('#cardActions button[data-grade="1"]')[0]?.click();break; case'2':$$('#cardActions button[data-grade="2"]')[0]?.click();break; case'3':$$('#cardActions button[data-grade="3"]')[0]?.click();break; case'4':$$('#cardActions button[data-grade="4"]')[0]?.click();break; case'Escape':closeModal();break; }});

// ─── 单词库（全部 + 搜索） ───
function renderVocab(container) {
  const learned = getLearnedCount(); const total = getTotalCards();
  container.innerHTML = `<div class="lesson-card"><h3>📝 词汇库 (${learned}/${total})</h3>
    <div class="content"><input type="text" id="vocabSearch" placeholder="🔍 搜索词汇..." style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);font-size:.9rem;margin-bottom:8px"></div>
    <div class="content" style="max-height:60vh;overflow-y:auto" id="vocabList"></div></div>`;
  const list = $('#vocabList');
  const renderList = (filter='') => {
    const filtered = filter ? ALL_CARDS.filter(c=>c.jp.includes(filter)||c.reading.includes(filter)||c.meaning.includes(filter)) : ALL_CARDS;
    list.innerHTML = filtered.map(c=>`<div class="example" style="cursor:pointer;margin-bottom:4px" data-id="${c.id}"><span style="font-weight:600">${c.jp}</span> <span style="color:var(--text2);font-size:.75rem">[${c.reading}]</span> — ${c.meaning} ${srs[c.id]?`<span style="font-size:.65rem;color:var(--green)">✅</span>`:`<span style="font-size:.65rem;color:var(--text2)">🆕</span>`} <span style="font-size:.65rem;color:var(--text2)">D${c.day}</span></div>`).join('');
    list.querySelectorAll('.example').forEach(el=>{ el.addEventListener('click',()=>{ const c=ALL_CARDS.find(x=>x.id===el.dataset.id); if(c){ flashState={idx:0,cards:[c],dueCount:0,newCount:srs[c.id]?0:1}; showCard(c); }}); });
  };
  renderList();
  $('#vocabSearch').addEventListener('input', e=>renderList(e.target.value));
}

// ─── 语法 ───
function renderGrammar(container) {
  const all=[]; COURSE.daily.forEach(d=>{(d.grammar||[]).forEach(g=>all.push({...g,day:d.day,title:d.title}));});
  all.forEach(g=>{ const e=el('div','grammar-card'); e.innerHTML=`<div class="pattern">${g.pattern} <span style="font-size:.7rem;color:var(--text2);font-weight:400">D${g.day}</span></div><div class="desc">${g.desc}</div>${g.ex?`<div class="ex">📌 ${g.ex}</div>`:''}`; container.appendChild(e); });
}

// ─── 汉字 ───
function renderKanji(container) {
  const all=[],seen=new Set(); COURSE.daily.forEach(d=>{(d.kanji||[]).forEach(k=>{if(!seen.has(k.char)){seen.add(k.char);all.push(k);}})});
  container.innerHTML=`<div class="lesson-card"><h3>🈶 已学汉字 (${all.length})</h3></div><div class="kanji-grid">${all.map(k=>`<div class="kanji-cell"><div class="kchar">${k.char}</div><div class="kmeaning">${k.meaning}</div></div>`).join('')}</div>`;
}

// ─── 路线图 ───
function renderRoadmap(container) {
  const cp=COURSE.getLesson(state.currentDay)?.phase||'kana';
  COURSE.phases.forEach(p=>{ const e=el('div',`roadmap-phase ${p.id===cp?'phase-current':''}`); e.innerHTML=`<h3>${p.id===cp?'📍 ':''}${p.name}</h3><div class="meta">⏱ ${p.weeks} | 🎯 ${p.goal}</div><ul>${phaseDetails(p.id)}</ul>`; container.appendChild(e); });
  const r=el('div','roadmap-phase'); r.innerHTML=`<h3>🔗 资源</h3><ul style="font-size:.85rem"><li><a href="https://apps.ankiweb.net/" target="_blank" style="color:var(--accent)">Anki</a></li><li><a href="https://yomitan.wiki/" target="_blank" style="color:var(--accent)">Yomitan</a></li><li><a href="https://www.tofugu.com/japanese/learn-hiragana/" target="_blank" style="color:var(--accent)">Tofugu</a></li><li><a href="https://guidetojapanese.org/learn/grammar" target="_blank" style="color:var(--accent)">Tae Kim语法</a></li></ul>`; container.appendChild(r);
}
function phaseDetails(id){ const m={'kana':'<li>平假名46字</li><li>片假名46字</li><li>每行8-9个真词</li>','beginner':'<li>基本句型</li><li>こそあど</li><li>数字/时间</li><li>存在句</li>','elementary':'<li>て形/た形</li><li>简体vs敬体</li><li>300+汉字</li>','travel':'<li>交通/餐厅</li><li>购物/酒店</li><li>独立应对日本游</li>'}; return m[id]||''; }

// ─── 启动 ───
applyTheme(); renderAll();

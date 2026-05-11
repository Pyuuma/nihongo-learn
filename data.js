// === 日语学习平台 - 数据层 ===
// 所有课程内容集中定义于此

const COURSE = {

// ─── 阶段定义 ───
phases: [
  { id:"kana", name:"五十音", weeks:"1-2周", goal:"会读会写平假名+片假名" },
  { id:"beginner", name:"基础入门 N5", weeks:"3-12周", goal:"800-1000词汇,50条语法,简单日常对话" },
  { id:"elementary", name:"日常会话 N4", weeks:"4-6个月", goal:"2000-3000词汇,300汉字,日常交流" },
  { id:"travel", name:"旅游实战 N4-N3", weeks:"7-10个月", goal:"独立应对交通/酒店/餐厅/购物场景" }
],

// ─── 每日课程（28天一个循环，覆盖 Phase 1-2） ───
daily: [
  // === Day 1 ===
  {
    day:1, title:"あいうえお — 平假名第一行", phase:"kana",
    vocab:[
      {jp:"あ", reading:"a", meaning:"(元音) a", type:"kana"},
      {jp:"い", reading:"i", meaning:"(元音) i", type:"kana"},
      {jp:"う", reading:"u", meaning:"(元音) u", type:"kana"},
      {jp:"え", reading:"e", meaning:"(元音) e", type:"kana"},
      {jp:"お", reading:"o", meaning:"(元音) o", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"发音要点",desc:"日语元音比中文少且固定。a=啊 i=衣 u=乌(嘴唇不圆) e=诶 o=哦",ex:"嘴巴放松，发音短促清晰"}
    ],
    tips:"用 Tofugu 记忆法：あ 像『安』字、い 像『以』字、う 像『宇』字"
  },
  // === Day 2 ===
  {
    day:2, title:"かきくけこ — 平假名第二行", phase:"kana",
    vocab:[
      {jp:"か", reading:"ka", meaning:"ka", type:"kana"},
      {jp:"き", reading:"ki", meaning:"ki", type:"kana"},
      {jp:"く", reading:"ku", meaning:"ku", type:"kana"},
      {jp:"け", reading:"ke", meaning:"ke", type:"kana"},
      {jp:"こ", reading:"ko", meaning:"ko", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"か行发音",desc:"か行是清辅音k+元音。注意：日语k比中文k送气少，接近中文g的发音。",ex:"か=ka(接近'嘎') き=ki く=ku け=ke こ=ko"}
    ],
    tips:"复习Day1的あ行，做Kana Quiz练习"
  },
  // === Day 3 ===
  {
    day:3, title:"さしすせそ — 平假名第三行", phase:"kana",
    vocab:[
      {jp:"さ", reading:"sa", meaning:"sa", type:"kana"},
      {jp:"し", reading:"shi", meaning:"shi (不是si!)", type:"kana"},
      {jp:"す", reading:"su", meaning:"su", type:"kana"},
      {jp:"せ", reading:"se", meaning:"se", type:"kana"},
      {jp:"そ", reading:"so", meaning:"so", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"⚠️ し=shi 不是si",desc:"这是中国人最常见的发音错误。日语さ行的『し』读成shi（像英文she），不是si。",ex:"さ=sa し=shi(西) す=su(斯) せ=se そ=so"}
    ],
    tips:"今天学完你就认识15个假名了，占平假名的1/3！"
  },
  // === Day 4 ===
  {
    day:4, title:"たちつてと — 平假名第四行", phase:"kana",
    vocab:[
      {jp:"た", reading:"ta", meaning:"ta", type:"kana"},
      {jp:"ち", reading:"chi", meaning:"chi (不是ti!)", type:"kana"},
      {jp:"つ", reading:"tsu", meaning:"tsu (不是tu!)", type:"kana"},
      {jp:"て", reading:"te", meaning:"te", type:"kana"},
      {jp:"と", reading:"to", meaning:"to", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"⚠️ ち=chi つ=tsu",desc:"た行有2个特殊音：ち读chi（七）、つ读tsu（此）。这是区分日语发音好坏的关键。",ex:"た=ta ち=chi つ=tsu て=te と=to"}
    ],
    tips:"今天开始用Anki卡组复习前3天的假名"
  },
  // === Day 5 ===
  {
    day:5, title:"なにぬねの — 平假名第五行", phase:"kana",
    vocab:[
      {jp:"な", reading:"na", meaning:"na", type:"kana"},
      {jp:"に", reading:"ni", meaning:"ni", type:"kana"},
      {jp:"ぬ", reading:"nu", meaning:"nu", type:"kana"},
      {jp:"ね", reading:"ne", meaning:"ne", type:"kana"},
      {jp:"の", reading:"no", meaning:"no (的/之)", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"の = 的/之",desc:"日语中最常用的助词之一。AのB = A的B。例如：わたしのなまえ = 我的名字",ex:"私(わたし)の名前(なまえ) = 我的名字"}
    ],
    tips:"你已经学了25个假名，过半了！"
  },
  // === Day 6 ===
  {
    day:6, title:"はひふへほ — 平假名第六行", phase:"kana",
    vocab:[
      {jp:"は", reading:"ha(wa做助词)", meaning:"ha (助词时读wa)", type:"kana"},
      {jp:"ひ", reading:"hi", meaning:"hi", type:"kana"},
      {jp:"ふ", reading:"fu", meaning:"fu (不是hu!)", type:"kana"},
      {jp:"へ", reading:"he(e做助词)", meaning:"he (助词时读e)", type:"kana"},
      {jp:"ほ", reading:"ho", meaning:"ho", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"⚠️ ふ=fu は(助词)=wa",desc:"ふ介于hu和fu之间，上牙轻触下唇。は做助词（主题标记）时读wa。",ex:"こんにちは = konnichiwa (你好) ふじさん = Fujisan (富士山)"}
    ],
    tips:"记住：こんにちは的は读wa，不是ha！"
  },
  // === Day 7 ===
  {
    day:7, title:"まみむめも + 复习 — 平假名第七行", phase:"kana",
    vocab:[
      {jp:"ま", reading:"ma", meaning:"ma", type:"kana"},
      {jp:"み", reading:"mi", meaning:"mi", type:"kana"},
      {jp:"む", reading:"mu", meaning:"mu", type:"kana"},
      {jp:"め", reading:"me", meaning:"me", type:"kana"},
      {jp:"も", reading:"mo", meaning:"mo", type:"kana"}
    ],
    kanji:[],
    grammar:[
      {pattern:"复习日：平假名1-7行",desc:"今天复习前35个假名。尝试默写あ行到ま行，不看参考资料。",ex:"可用Kana Quiz测试: https://kuuuube.github.io/kana-quiz/"}
    ],
    tips:"每行花2分钟过一遍，读出声。你已经掌握70%的平假名了！"
  },

  // === Day 8 ===
  {day:8,title:"やゆよ — 平假名第八行",phase:"kana",vocab:[{jp:"や",reading:"ya",meaning:"ya",type:"kana"},{jp:"ゆ",reading:"yu",meaning:"yu",type:"kana"},{jp:"よ",reading:"yo",meaning:"yo",type:"kana"}],kanji:[],grammar:[{pattern:"や行只有3个音",desc:"や行的い和え与あ行重复，所以只有やゆよ三个假名。",ex:"や=ya ゆ=yu よ=yo"}],tips:"只剩最后两行！"},
  // === Day 9 ===
  {day:9,title:"らりるれろ — 平假名第九行",phase:"kana",vocab:[{jp:"ら",reading:"ra",meaning:"ra",type:"kana"},{jp:"り",reading:"ri",meaning:"ri",type:"kana"},{jp:"る",reading:"ru",meaning:"ru",type:"kana"},{jp:"れ",reading:"re",meaning:"re",type:"kana"},{jp:"ろ",reading:"ro",meaning:"ro",type:"kana"}],kanji:[],grammar:[{pattern:"ら行发音技巧",desc:"日语r是舌尖轻弹上颚，介于中文l和r之间。舌头快速轻拍一下即可。",ex:"らりるれろ = ra ri ru re ro (舌尖弹一下，不要卷舌)"}],tips:"最难的一行！多听音频模仿"},
  // === Day 10 ===
  {day:10,title:"わをん — 平假名最后一行",phase:"kana",vocab:[{jp:"わ",reading:"wa",meaning:"wa",type:"kana"},{jp:"を",reading:"wo(o)",meaning:"wo(助词，读o)",type:"kana"},{jp:"ん",reading:"n",meaning:"n(鼻音)",type:"kana"}],kanji:[],grammar:[{pattern:"を=o ん=n",desc:"を只做宾语助词用，读o。ん是唯一的鼻音假名，永远不单独构成音节。",ex:"を読む = 读(书) ほん = 书"}],tips:"🎉 平假名学完了！做一次完整复习测试"},
  
  // === Day 11: Katakana start ===
  {day:11,title:"アイウエオ — 片假名第一行",phase:"kana",vocab:[{jp:"ア",reading:"a",meaning:"a",type:"kana"},{jp:"イ",reading:"i",meaning:"i",type:"kana"},{jp:"ウ",reading:"u",meaning:"u",type:"kana"},{jp:"エ",reading:"e",meaning:"e",type:"kana"},{jp:"オ",reading:"o",meaning:"o",type:"kana"}],kanji:[],grammar:[{pattern:"片假名的用途",desc:"片假名用于：①外来语(コンビニ=便利店) ②拟声词 ③强调(类似英文大写)",ex:"コーヒー = coffee パン = 面包"}],tips:"片假名形状更硬朗，多由汉字偏旁演变"},
  {day:12,title:"カキクケコ — 片假名第二行",phase:"kana",vocab:[{jp:"カ",reading:"ka",meaning:"ka",type:"kana"},{jp:"キ",reading:"ki",meaning:"ki",type:"kana"},{jp:"ク",reading:"ku",meaning:"ku",type:"kana"},{jp:"ケ",reading:"ke",meaning:"ke",type:"kana"},{jp:"コ",reading:"ko",meaning:"ko",type:"kana"}],kanji:[],grammar:[],tips:"カ=力 ク=久 ケ=介 — 想象它们来自这些汉字"},
  {day:13,title:"サシスセソ — 片假名第三行",phase:"kana",vocab:[{jp:"サ",reading:"sa",meaning:"sa",type:"kana"},{jp:"シ",reading:"shi",meaning:"shi",type:"kana"},{jp:"ス",reading:"su",meaning:"su",type:"kana"},{jp:"セ",reading:"se",meaning:"se",type:"kana"},{jp:"ソ",reading:"so",meaning:"so",type:"kana"}],kanji:[],grammar:[{pattern:"⚠️ シ(shi) vs ツ(tsu)",desc:"シ是三点水偏旁→读shi。ツ是三点从上往下→读tsu。二(ニ) vs 二(二)形状不同。",ex:"シ=shi ツ=tsu ン=n ソ=so"}],tips:"シ和ツ是最容易混淆的两个片假名！"},
  {day:14,title:"タチツテト + 片假名中期复习",phase:"kana",vocab:[{jp:"タ",reading:"ta",meaning:"ta",type:"kana"},{jp:"チ",reading:"chi",meaning:"chi",type:"kana"},{jp:"ツ",reading:"tsu",meaning:"tsu",type:"kana"},{jp:"テ",reading:"te",meaning:"te",type:"kana"},{jp:"ト",reading:"to",meaning:"to",type:"kana"}],kanji:[],grammar:[],tips:"今天复习片假名1-4行 + 平假名全部"},

  // === Day 15-17: First phrases ===
  {day:15,title:"初次见面 — 问候语",phase:"beginner",vocab:[{jp:"こんにちは",reading:"konnichiwa",meaning:"你好",type:"phrase"},{jp:"おはようございます",reading:"ohayou gozaimasu",meaning:"早上好(敬语)",type:"phrase"},{jp:"こんばんは",reading:"konbanwa",meaning:"晚上好",type:"phrase"},{jp:"さようなら",reading:"sayounara",meaning:"再见",type:"phrase"},{jp:"ありがとう",reading:"arigatou",meaning:"谢谢",type:"phrase"}],kanji:[],grammar:[{pattern:"は=wa (助词)",desc:"こんにちは、こんばんは中的「は」都读wa。这是历史遗留的助词用法。",ex:"こんにちは ≠ konnichiha！"}],tips:"第一个词就记住：は(ha)做助词读wa！"},
  {day:16,title:"自我介绍",phase:"beginner",vocab:[{jp:"私",reading:"わたし",meaning:"我",type:"word"},{jp:"名前",reading:"なまえ",meaning:"名字",type:"word"},{jp:"〜です",reading:"~desu",meaning:"是~",type:"phrase"},{jp:"よろしくお願いします",reading:"yoroshiku onegai shimasu",meaning:"请多关照",type:"phrase"},{jp:"〜から来ました",reading:"~kara kimashita",meaning:"来自~",type:"phrase"}],kanji:[{char:"私",meaning:"我",reading:"わたし"}],grammar:[{pattern:"AはBです = A是B",desc:"最基本的判断句。は提示主题，です做判断。",ex:"私は田中です = 我是田中"}],tips:"今天学会完整的自我介绍：はじめまして、私は〜です。〜から来ました。よろしくお願いします。"},
  {day:17,title:"数字1-10 + 年龄",phase:"beginner",vocab:[{jp:"一",reading:"いち",meaning:"1",type:"word"},{jp:"二",reading:"に",meaning:"2",type:"word"},{jp:"三",reading:"さん",meaning:"3",type:"word"},{jp:"四",reading:"よん/し",meaning:"4",type:"word"},{jp:"五",reading:"ご",meaning:"5",type:"word"},{jp:"六",reading:"ろく",meaning:"6",type:"word"},{jp:"七",reading:"なな/しち",meaning:"7",type:"word"},{jp:"八",reading:"はち",meaning:"8",type:"word"},{jp:"九",reading:"きゅう/く",meaning:"9",type:"word"},{jp:"十",reading:"じゅう",meaning:"10",type:"word"}],kanji:[{char:"一",meaning:"1",reading:"いち"},{char:"二",meaning:"2",reading:"に"},{char:"三",meaning:"3",reading:"さん"}],grammar:[{pattern:"歳(さい) = 岁",desc:"数字+歳表示年龄。注意：1歳=いっさい(促音变) 8歳=はっさい",ex:"私は25歳です = 我25岁"}],tips:"4和7各有两种读法，日常多用よん和なな"},

  // === Day 18-20: Basic grammar ===
  {day:18,title:"これは〜です — 指示词",phase:"beginner",vocab:[{jp:"これ",reading:"kore",meaning:"这个(近)",type:"word"},{jp:"それ",reading:"sore",meaning:"那个(中)",type:"word"},{jp:"あれ",reading:"are",meaning:"那个(远)",type:"word"},{jp:"何",reading:"なん/なに",meaning:"什么",type:"word"},{jp:"本",reading:"ほん",meaning:"书",type:"word"}],kanji:[{char:"何",meaning:"什么",reading:"なん/なに"},{char:"本",meaning:"书",reading:"ほん"}],grammar:[{pattern:"これは〜です = 这个是~",desc:"こ(近)そ(中)あ(远) + れ(东西)。离说话人近=これ、离听话人近=それ、都远=あれ。",ex:"これは本です = 这是书。それは何ですか = 那是什么？"}],tips:"こそあど体系是日语指示词的基础，记住空间关系"},
  {day:19,title:"〜が好きです — 喜好表达",phase:"beginner",vocab:[{jp:"好き",reading:"すき",meaning:"喜欢",type:"word"},{jp:"猫",reading:"ねこ",meaning:"猫",type:"word"},{jp:"犬",reading:"いぬ",meaning:"狗",type:"word"},{jp:"食べ物",reading:"たべもの",meaning:"食物",type:"word"},{jp:"旅行",reading:"りょこう",meaning:"旅行",type:"word"}],kanji:[{char:"好",meaning:"喜欢",reading:"す"},{char:"食",meaning:"吃",reading:"た"}],grammar:[{pattern:"〜が好きです = 喜欢~",desc:"注意：用が不是を！日语中表示喜好、能力、愿望时用が标记对象。",ex:"猫が好きです = 我喜欢猫。旅行が好きです = 我喜欢旅行。"}],tips:"が和は的区别是日语学习的一道坎，今天先记住这个固定句型"},
  {day:20,title:"〜があります / います — 存在句",phase:"beginner",vocab:[{jp:"あります",reading:"arimasu",meaning:"有(无生命)",type:"word"},{jp:"います",reading:"imasu",meaning:"有/在(有生命)",type:"word"},{jp:"時計",reading:"とけい",meaning:"钟表",type:"word"},{jp:"人",reading:"ひと",meaning:"人",type:"word"},{jp:"机",reading:"つくえ",meaning:"桌子",type:"word"}],kanji:[{char:"時",meaning:"时间",reading:"とき/じ"},{char:"人",meaning:"人",reading:"ひと/じん"}],grammar:[{pattern:"ある vs いる",desc:"无生命物用ある(あります)、有生命物用いる(います)。这是日语的基础二分法。",ex:"時計があります = 有钟。人がいます = 有人。"}],tips:"记住：死物ある、活物いる。植物用ある。"},
  
  // === Day 21-24: Travel basics ===
  {day:21,title:"〜はどこですか — 问路",phase:"travel",vocab:[{jp:"どこ",reading:"doko",meaning:"哪里",type:"word"},{jp:"駅",reading:"えき",meaning:"车站",type:"word"},{jp:"出口",reading:"でぐち",meaning:"出口",type:"word"},{jp:"入口",reading:"いりぐち",meaning:"入口",type:"word"},{jp:"近く",reading:"ちかく",meaning:"附近",type:"word"}],kanji:[{char:"駅",meaning:"车站",reading:"えき"},{char:"出",meaning:"出",reading:"で/しゅつ"}],grammar:[{pattern:"〜はどこですか = ~在哪里？",desc:"最实用的旅游句型。どこ=哪里、ですか=是~吗(疑问)。",ex:"駅はどこですか = 车站在哪里？出口はどこですか = 出口在哪里？"}],tips:"今天开始进入旅游实战模式！每个词都是你在日本会用到的"},
  {day:22,title:"いくらですか + 购物",phase:"travel",vocab:[{jp:"いくら",reading:"ikura",meaning:"多少钱",type:"word"},{jp:"高い",reading:"たかい",meaning:"贵",type:"word"},{jp:"安い",reading:"やすい",meaning:"便宜",type:"word"},{jp:"免税",reading:"めんぜい",meaning:"免税",type:"word"},{jp:"袋",reading:"ふくろ",meaning:"袋子",type:"word"}],kanji:[{char:"高",meaning:"高/贵",reading:"たか"},{char:"安",meaning:"便宜/安全",reading:"やす"}],grammar:[{pattern:"〜をください = 请给我~",desc:"購物時指著東西說「これをください」即可。也可說「〜をお願いします」。",ex:"これをください = 请给我这个。袋をください = 请给我袋子。"}],tips:"日本购物场景三句：いくらですか / これをください / 免税できますか"},
  {day:23,title:"注文 + 餐厅",phase:"travel",vocab:[{jp:"注文",reading:"ちゅうもん",meaning:"点菜",type:"word"},{jp:"メニュー",reading:"menyū",meaning:"菜单",type:"word"},{jp:"お水",reading:"おみず",meaning:"水",type:"word"},{jp:"お会計",reading:"おかいけい",meaning:"结账",type:"word"},{jp:"二人",reading:"ふたり",meaning:"两个人",type:"word"}],kanji:[{char:"注",meaning:"注/点",reading:"ちゅう"},{char:"水",meaning:"水",reading:"みず"}],grammar:[{pattern:"〜はありますか = 有~吗？",desc:"看菜单或询问时用。也可以说「英語のメニューはありますか？」=有英文菜单吗？",ex:"お水はありますか = 有水吗？ベジタリアンメニューはありますか = 有素食菜单吗？"}],tips:"进餐厅说「二人です」(两位)，吃完说「お会計お願いします」"},
  {day:24,title:"交通 + 酒店",phase:"travel",vocab:[{jp:"切符",reading:"きっぷ",meaning:"车票",type:"word"},{jp:"乗り換え",reading:"のりかえ",meaning:"换乘",type:"word"},{jp:"予約",reading:"よやく",meaning:"预约",type:"word"},{jp:"チェックイン",reading:"chekkuin",meaning:"入住",type:"word"},{jp:"鍵",reading:"かぎ",meaning:"钥匙",type:"word"}],kanji:[{char:"切",meaning:"切/票",reading:"きっ"},{char:"乗",meaning:"乘",reading:"の"}],grammar:[{pattern:"〜までお願いします = 请到~",desc:"打车或买票时用。〜まで = 到~、お願いします = 麻烦了。",ex:"東京駅までお願いします = 请到东京站。このホテルまでお願いします = 请到这个酒店。"}],tips:"酒店入住只需说「チェックインお願いします」+ 出示护照"},

  // === Day 25-28: Review & Consolidation ===
  {day:25,title:"复习日：假名+问候",phase:"beginner",vocab:[],kanji:[],grammar:[{pattern:"综合复习",desc:"今天：①默写全部平假名 ②默写全部片假名 ③不看提示说出5句问候语",ex:"测试自己：'你好、谢谢、对不起、我是中国人、请多关照' 怎么说？"}],tips:"假名熟练度是后面所有学习的基础，确保能5秒内读出任何假名"},
  {day:26,title:"复习日：数字+存在句",phase:"beginner",vocab:[],kanji:[],grammar:[{pattern:"综合复习",desc:"①从1数到100 ②用あります/います各造3句 ③こそあど全部造句",ex:"测试：'桌子上有书' '公园里有猫' '我的名字是~' 怎么说？"}],tips:"可以试着用日语描述你房间里有什么东西"},
  {day:27,title:"复习日：旅游句型总复习",phase:"travel",vocab:[],kanji:[],grammar:[{pattern:"模拟场景对话",desc:"模拟4个场景各说3句话：①问路 ②点菜 ③买东西 ④酒店入住",ex:"想象你正在东京：需要找到浅草寺、想吃拉面、想买免税化妆品、已经到了酒店前台"}],tips:"试着不看提示，独立完成4个场景对话"},
  {day:28,title:"阶段检测 + 下一阶段预告",phase:"beginner",vocab:[],kanji:[],grammar:[{pattern:"🎯 28天检测",desc:"恭喜完成第一个学习循环！今天进行综合测试，然后根据掌握情况进入下一阶段。",ex:"测试要点：假名识读、数字、基本问候、こそあど、あるいる、旅游句型"}],tips:"统计你28天学了什么：46个假名、60+词汇、10+语法点、12个汉字、15句实用旅游用语"}
],

// ─── 按标签筛选辅助 ───
getLesson(day){ return this.daily.find(d=>d.day===day) || null; },
getDayCount(){ return this.daily.length; }
};

// 暴露到全局
window.COURSE = COURSE;

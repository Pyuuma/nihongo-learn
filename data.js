// === 日本語ラボ v2.0 — 完整词汇库 + SRS引擎 ===

// ─── 辅助函数 ───
function V(id, jp, reading, meaning, type, day) {
  return { id, jp, reading, meaning, type: type||'word', day: day||0 };
}

// ─── 统一词汇库（所有卡片）───
// id格式: d{day}-{idx} 确保唯一
const ALL_CARDS = [].concat(

// === Day 1-10: 平假名 + 组合词 ===
  V('d1-0','あ','a','a (元音)','kana',1),
  V('d1-1','い','i','i (元音)','kana',1),
  V('d1-2','う','u','u (元音)','kana',1),
  V('d1-3','え','e','e (元音)','kana',1),
  V('d1-4','お','o','o (元音)','kana',1),
  V('d1-5','あい','ai','爱','word',1),
  V('d1-6','いえ','ie','房子/家','word',1),
  V('d1-7','うえ','ue','上面','word',1),
  V('d1-8','おおい','ooi','很多','word',1),

  V('d2-0','か','ka','ka','kana',2),
  V('d2-1','き','ki','ki','kana',2),
  V('d2-2','く','ku','ku','kana',2),
  V('d2-3','け','ke','ke','kana',2),
  V('d2-4','こ','ko','ko','kana',2),
  V('d2-5','かお','kao','脸','word',2),
  V('d2-6','きく','kiku','听/问','word',2),
  V('d2-7','いけ','ike','池塘','word',2),
  V('d2-8','ここ','koko','这里','word',2),

  V('d3-0','さ','sa','sa','kana',3),
  V('d3-1','し','shi','shi','kana',3),
  V('d3-2','す','su','su','kana',3),
  V('d3-3','せ','se','se','kana',3),
  V('d3-4','そ','so','so','kana',3),
  V('d3-5','あさ','asa','早上','word',3),
  V('d3-6','すし','sushi','寿司','word',3),
  V('d3-7','せかい','sekai','世界','word',3),
  V('d3-8','そこ','soko','那里','word',3),

  V('d4-0','た','ta','ta','kana',4),
  V('d4-1','ち','chi','chi','kana',4),
  V('d4-2','つ','tsu','tsu','kana',4),
  V('d4-3','て','te','te','kana',4),
  V('d4-4','と','to','to','kana',4),
  V('d4-5','たかい','takai','高的/贵的','word',4),
  V('d4-6','ちかい','chikai','近的','word',4),
  V('d4-7','つくえ','tsukue','桌子','word',4),
  V('d4-8','とし','toshi','城市/年','word',4),

  V('d5-0','な','na','na','kana',5),
  V('d5-1','に','ni','ni','kana',5),
  V('d5-2','ぬ','nu','nu','kana',5),
  V('d5-3','ね','ne','ne','kana',5),
  V('d5-4','の','no','no (的)','kana',5),
  V('d5-5','なに','nani','什么','word',5),
  V('d5-6','いぬ','inu','狗','word',5),
  V('d5-7','ねこ','neko','猫','word',5),
  V('d5-8','わたしの','watashino','我的','phrase',5),

  V('d6-0','は','ha(wa)','ha(助词读wa)','kana',6),
  V('d6-1','ひ','hi','hi','kana',6),
  V('d6-2','ふ','fu','fu','kana',6),
  V('d6-3','へ','he(e)','he(助词读e)','kana',6),
  V('d6-4','ほ','ho','ho','kana',6),
  V('d6-5','はな','hana','花','word',6),
  V('d6-6','ひと','hito','人','word',6),
  V('d6-7','ふね','fune','船','word',6),
  V('d6-8','ほし','hoshi','星星','word',6),

  V('d7-0','ま','ma','ma','kana',7),
  V('d7-1','み','mi','mi','kana',7),
  V('d7-2','む','mu','mu','kana',7),
  V('d7-3','め','me','me','kana',7),
  V('d7-4','も','mo','mo','kana',7),
  V('d7-5','なまえ','namae','名字','word',7),
  V('d7-6','みせ','mise','商店','word',7),
  V('d7-7','むし','mushi','虫子','word',7),
  V('d7-8','もの','mono','东西','word',7),

  V('d8-0','や','ya','ya','kana',8),
  V('d8-1','ゆ','yu','yu','kana',8),
  V('d8-2','よ','yo','yo','kana',8),
  V('d8-3','やま','yama','山','word',8),
  V('d8-4','ゆき','yuki','雪','word',8),
  V('d8-5','よむ','yomu','读','word',8),

  V('d9-0','ら','ra','ra','kana',9),
  V('d9-1','り','ri','ri','kana',9),
  V('d9-2','る','ru','ru','kana',9),
  V('d9-3','れ','re','re','kana',9),
  V('d9-4','ろ','ro','ro','kana',9),
  V('d9-5','はる','haru','春天','word',9),
  V('d9-6','とり','tori','鸟','word',9),
  V('d9-7','くる','kuru','来','word',9),
  V('d9-8','これ','kore','这个','word',9),

  V('d10-0','わ','wa','wa','kana',10),
  V('d10-1','を','wo(o)','wo(助词读o)','kana',10),
  V('d10-2','ん','n','n','kana',10),
  V('d10-3','わたし','watashi','我','word',10),
  V('d10-4','ほん','hon','书','word',10),
  V('d10-5','にほん','nihon','日本','word',10),

  // === Day 11-14: 片假名 + 外来语 ===
  V('d11-0','ア','a','a','kana',11),V('d11-1','イ','i','i','kana',11),
  V('d11-2','ウ','u','u','kana',11),V('d11-3','エ','e','e','kana',11),
  V('d11-4','オ','o','o','kana',11),
  V('d11-5','アイ','ai','眼睛 (eye)','word',11),
  V('d12-0','カ','ka','ka','kana',12),V('d12-1','キ','ki','ki','kana',12),
  V('d12-2','ク','ku','ku','kana',12),V('d12-3','ケ','ke','ke','kana',12),
  V('d12-4','コ','ko','ko','kana',12),
  V('d12-5','ケーキ','kēki','蛋糕','word',12),
  V('d13-0','サ','sa','sa','kana',13),V('d13-1','シ','shi','shi','kana',13),
  V('d13-2','ス','su','su','kana',13),V('d13-3','セ','se','se','kana',13),
  V('d13-4','ソ','so','so','kana',13),
  V('d13-5','コーヒー','kōhī','咖啡','word',13),
  V('d14-0','タ','ta','ta','kana',14),V('d14-1','チ','chi','chi','kana',14),
  V('d14-2','ツ','tsu','tsu','kana',14),V('d14-3','テ','te','te','kana',14),
  V('d14-4','ト','to','to','kana',14),
  V('d14-5','テスト','tesuto','测试','word',14),

  // === Day 15-28: 实词 + 旅游 ===
  V('d15-0','こんにちは','konnichiwa','你好','phrase',15),
  V('d15-1','おはようございます','ohayou gozaimasu','早上好','phrase',15),
  V('d15-2','こんばんは','konbanwa','晚上好','phrase',15),
  V('d15-3','ありがとう','arigatou','谢谢','phrase',15),
  V('d15-4','すみません','sumimasen','对不起/打扰了','phrase',15),
  V('d15-5','はい','hai','是','word',15),
  V('d15-6','いいえ','iie','不是','word',15),

  V('d16-0','わたし','watashi','我','word',16),
  V('d16-1','なまえ','namae','名字','word',16),
  V('d16-2','です','desu','是/~です','grammar',16),
  V('d16-3','〜からきました','~kara kimashita','来自~','phrase',16),
  V('d16-4','よろしくおねがいします','yoroshiku onegai shimasu','请多关照','phrase',16),
  V('d16-5','にほんじん','nihonjin','日本人','word',16),
  V('d16-6','ちゅうごく','chuugoku','中国','word',16),

  V('d17-0','いち','ichi','1','number',17),
  V('d17-1','に','ni','2','number',17),
  V('d17-2','さん','san','3','number',17),
  V('d17-3','よん/し','yon/shi','4','number',17),
  V('d17-4','ご','go','5','number',17),
  V('d17-5','ろく','roku','6','number',17),
  V('d17-6','なな/しち','nana/shichi','7','number',17),
  V('d17-7','はち','hachi','8','number',17),
  V('d17-8','きゅう/く','kyuu/ku','9','number',17),
  V('d17-9','じゅう','juu','10','number',17),

  V('d18-0','これ','kore','这个','word',18),
  V('d18-1','それ','sore','那个','word',18),
  V('d18-2','あれ','are','那个(远)','word',18),
  V('d18-3','なん/なに','nan/nani','什么','word',18),
  V('d18-4','ほん','hon','书','word',18),
  V('d18-5','ペン','pen','笔','word',18),
  V('d18-6','かばん','kaban','包','word',18),

  V('d19-0','すき','suki','喜欢','word',19),
  V('d19-1','ねこ','neko','猫','word',19),
  V('d19-2','いぬ','inu','狗','word',19),
  V('d19-3','たべもの','tabemono','食物','word',19),
  V('d19-4','りょこう','ryokou','旅行','word',19),
  V('d19-5','おんがく','ongaku','音乐','word',19),
  V('d19-6','えいが','eiga','电影','word',19),

  V('d20-0','あります','arimasu','有(无生命)','word',20),
  V('d20-1','います','imasu','有/在(有生命)','word',20),
  V('d20-2','とけい','tokei','钟表','word',20),
  V('d20-3','ひと','hito','人','word',20),
  V('d20-4','つくえ','tsukue','桌子','word',20),
  V('d20-5','いす','isu','椅子','word',20),
  V('d20-6','まど','mado','窗户','word',20),

  V('d21-0','どこ','doko','哪里','word',21),
  V('d21-1','えき','eki','车站','word',21),
  V('d21-2','でぐち','deguchi','出口','word',21),
  V('d21-3','いりぐち','iriguchi','入口','word',21),
  V('d21-4','ちかく','chikaku','附近','word',21),
  V('d21-5','トイレ','toire','厕所','word',21),
  V('d21-6','びょういん','byouin','医院','word',21),

  V('d22-0','いくら','ikura','多少钱','word',22),
  V('d22-1','たかい','takai','贵','word',22),
  V('d22-2','やすい','yasui','便宜','word',22),
  V('d22-3','めんぜい','menzei','免税','word',22),
  V('d22-4','ふくろ','fukuro','袋子','word',22),
  V('d22-5','くすり','kusuri','药','word',22),
  V('d22-6','ふく','fuku','衣服','word',22),

  V('d23-0','ちゅうもん','chuumon','点菜','word',23),
  V('d23-1','メニュー','menyuu','菜单','word',23),
  V('d23-2','おみず','omizu','水','word',23),
  V('d23-3','おかいけい','okaikei','结账','word',23),
  V('d23-4','ふたり','futari','两个人','word',23),
  V('d23-5','ひとり','hitori','一个人','word',23),
  V('d23-6','ラーメン','raamen','拉面','word',23),

  V('d24-0','きっぷ','kippu','车票','word',24),
  V('d24-1','のりかえ','norikae','换乘','word',24),
  V('d24-2','よやく','yoyaku','预约','word',24),
  V('d24-3','チェックイン','chekkuin','入住','word',24),
  V('d24-4','かぎ','kagi','钥匙','word',24),
  V('d24-5','でんしゃ','densha','电车','word',24),
  V('d24-6','バス','basu','巴士','word',24),
  V('d24-7','タクシー','takushii','出租车','word',24),
);

// ─── 每日课程（保留原有结构，vocab引用卡片ID） ───
const COURSE = {
phases: [
  { id:"kana", name:"五十音", weeks:"1-2周", goal:"会读会写平假名+片假名" },
  { id:"beginner", name:"基础入门 N5", weeks:"3-12周", goal:"800-1000词汇,50条语法,简单日常对话" },
  { id:"elementary", name:"日常会话 N4", weeks:"4-6个月", goal:"2000-3000词汇,300汉字,日常交流" },
  { id:"travel", name:"旅游实战 N4-N3", weeks:"7-10个月", goal:"独立应对交通/酒店/餐厅/购物场景" }
],

daily: [
  { day:1, vocabIds:['d1-0','d1-1','d1-2','d1-3','d1-4','d1-5','d1-6','d1-7','d1-8'], kanji:[], grammar:[{pattern:"发音要点",desc:"日语元音比中文少且固定。a=啊 i=衣 u=乌(不圆唇) e=诶 o=哦",ex:"嘴巴放松，短促清晰"},{pattern:"单词构成",desc:"今天学的假名已经可以组成真词：あい(爱)、いえ(家)、うえ(上面)",ex:"あい = 爱、いえ = 家"}], tips:"Tofugu记忆法 + 今天就能用假名读出真词！", title:"あいうえお — 平假名第一行 + 单词", phase:"kana" },
  { day:2, vocabIds:['d2-0','d2-1','d2-2','d2-3','d2-4','d2-5','d2-6','d2-7','d2-8'], kanji:[], grammar:[{pattern:"か行发音",desc:"か行清辅音k+元音。日语k比中文k送气少，接近g。",ex:"か=ka(嘎) き=ki く=ku け=ke こ=ko"},{pattern:"ここ/そこ/あそこ",desc:"ここ=这里 そこ=那里 あそこ=那边(远)",ex:"ここは駅です = 这里是车站"}], tips:"复习Day1あ行 + Kana Quiz", title:"かきくけこ — 平假名第二行 + 单词", phase:"kana" },
  { day:3, vocabIds:['d3-0','d3-1','d3-2','d3-3','d3-4','d3-5','d3-6','d3-7','d3-8'], kanji:[], grammar:[{pattern:"⚠️ し=shi",desc:"不是si！し读shi(西)。すし=sushi(寿司)。",ex:"さ=sa し=shi す=su せ=se そ=so"},{pattern:"朝・寿司・世界",desc:"あさ(朝)=早上、すし(寿司)、せかい(世界)=world",ex:"あさごはん = 早饭"}], tips:"你已认识15个假名 + 24个真词！", title:"さしすせそ — 平假名第三行 + 单词", phase:"kana" },
  { day:4, vocabIds:['d4-0','d4-1','d4-2','d4-3','d4-4','d4-5','d4-6','d4-7','d4-8'], kanji:[], grammar:[{pattern:"⚠️ ち=chi つ=tsu",desc:"た行特殊音。ち(七)、つ(此)。",ex:"た=ta ち=chi つ=tsu て=te と=to"},{pattern:"形容词基础",desc:"たかい=高/贵、ちかい=近",ex:"このりんごはたかいです = 这个苹果很贵"}], tips:"今天学完一半平假名！", title:"たちつてと — 平假名第四行", phase:"kana" },
  { day:5, vocabIds:['d5-0','d5-1','d5-2','d5-3','d5-4','d5-5','d5-6','d5-7','d5-8'], kanji:[], grammar:[{pattern:"の = 的",desc:"AのB = A的B。わたしのなまえ=我的名字",ex:"ねこのなまえ = 猫的名字"},{pattern:"疑问词 なに",desc:"なに=什么。なにがすきですか？=喜欢什么？",ex:"なにをたべますか = 吃什么？"}], tips:"なに(什么) + の(的) = 实用组合！", title:"なにぬねの — 平假名第五行", phase:"kana" },
  { day:6, vocabIds:['d6-0','d6-1','d6-2','d6-3','d6-4','d6-5','d6-6','d6-7','d6-8'], kanji:[], grammar:[{pattern:"⚠️ ふ=fu は(助)=wa",desc:"ふ介于hu/fu之间。は做助词读wa。",ex:"こんにちは=konnichiwa ふじさん=Fujisan"},{pattern:"はな・ひと・ほし",desc:"はな=花、ひと=人、ほし=星星",ex:"きれいなはな = 漂亮的花"}], tips:"记住：こんにちは的は读wa！", title:"はひふへほ — 平假名第六行", phase:"kana" },
  { day:7, vocabIds:['d7-0','d7-1','d7-2','d7-3','d7-4','d7-5','d7-6','d7-7','d7-8'], kanji:[], grammar:[{pattern:"复习日",desc:"前35个假名复习 + 默写。尝试写出あ行到ま行。",ex:"可用Kana Quiz测试"}], tips:"已学70%平假名+大量实用词！", title:"まみむめも — 第七行 + 复习", phase:"kana" },
  { day:8, vocabIds:['d8-0','d8-1','d8-2','d8-3','d8-4','d8-5'], kanji:[], grammar:[{pattern:"や行只有3个",desc:"やゆよ。い和え与あ行重复。",ex:"や=ya ゆ=yu よ=yo"},{pattern:"山・雪・読む",desc:"やま=山、ゆき=雪、よむ=读",ex:"本をよむ = 读书"}], tips:"只剩最后两行！标题中已含生词", title:"やゆよ — 第八行", phase:"kana" },
  { day:9, vocabIds:['d9-0','d9-1','d9-2','d9-3','d9-4','d9-5','d9-6','d9-7','d9-8'], kanji:[], grammar:[{pattern:"ら行发音",desc:"舌尖轻弹上颚，介于l和r之间。",ex:"らりるれろ = ra ri ru re ro"},{pattern:"はる・とり・くる",desc:"はる=春天、とり=鸟、くる=来",ex:"はるがくる = 春天来了"}], tips:"最难一行！多听音频", title:"らりるれろ — 第九行", phase:"kana" },
  { day:10, vocabIds:['d10-0','d10-1','d10-2','d10-3','d10-4','d10-5'], kanji:[], grammar:[{pattern:"を=o ん=n",desc:"を只做宾语助词读o。ん不单独成音节。",ex:"本をよむ = 读书。にほん = 日本"},{pattern:"わたし・ほん・にほん",desc:"最重要三个词：我、书、日本",ex:"わたしはにほんじんです = 我是日本人"}], tips:"🎉 平假名全部学完！", title:"わをん — 最后一行", phase:"kana" },
  { day:11, vocabIds:['d11-0','d11-1','d11-2','d11-3','d11-4','d11-5'], kanji:[], grammar:[{pattern:"片假名用途",desc:"外来语(コンビニ)、拟声词、强调",ex:"コーヒー=coffee"}], tips:"片假名更硬朗，由汉字偏旁演变", title:"アイウエオ — 片假名第一行", phase:"kana" },
  { day:12, vocabIds:['d12-0','d12-1','d12-2','d12-3','d12-4','d12-5'], kanji:[], grammar:[{pattern:"外来语规则",desc:"长音用ー表示。ケーキ=cake→kēki",ex:"コーヒー カメラ テレビ"}], tips:"カ=力 ク=久 ケ=介", title:"カキクケコ + 外来语", phase:"kana" },
  { day:13, vocabIds:['d13-0','d13-1','d13-2','d13-3','d13-4','d13-5'], kanji:[], grammar:[{pattern:"⚠️ シvsツ",desc:"シ(三点水→shi) ツ(从上往下→tsu)",ex:"シ=shi ツ=tsu"}], tips:"最易混淆的两个片假名！", title:"サシスセソ — 片假名第三行", phase:"kana" },
  { day:14, vocabIds:['d14-0','d14-1','d14-2','d14-3','d14-4','d14-5'], kanji:[], grammar:[{pattern:"片假名复习",desc:"全部片假名+假名总复习",ex:"默写全部平假名+片假名"}], tips:"🎉 五十音全部完成！", title:"タチツテト + 总复习", phase:"kana" },
  { day:15, vocabIds:['d15-0','d15-1','d15-2','d15-3','d15-4','d15-5','d15-6'], kanji:[], grammar:[{pattern:"は=wa (助词)",desc:"こんにちは中的「は」读wa。",ex:"こんにちは≠konnichiha"},{pattern:"はい/いいえ",desc:"是/不是。いいえ较少用，常委婉。",ex:"にほんじんですか？はい、そうです。"}], tips:"每天见面第一句！", title:"问候语 + 基本应答", phase:"beginner" },
  { day:16, vocabIds:['d16-0','d16-1','d16-2','d16-3','d16-4','d16-5','d16-6'], kanji:[{char:"私",meaning:"我",reading:"わたし"}], grammar:[{pattern:"AはBです",desc:"最基本判断句。は提示主题，です判断。",ex:"わたしは田中です"}], tips:"完整自我介绍：はじめまして、わたしは〜です。〜からきました。" ,title:"自我介绍", phase:"beginner" },
  { day:17, vocabIds:['d17-0','d17-1','d17-2','d17-3','d17-4','d17-5','d17-6','d17-7','d17-8','d17-9'], kanji:[{char:"一",meaning:"1",reading:"いち"},{char:"二",meaning:"2",reading:"に"},{char:"三",meaning:"3",reading:"さん"}], grammar:[{pattern:"〜歳(さい)",desc:"数字+歳=岁。1歳=いっさい",ex:"25歳です = 25岁"}], tips:"4/7各有两种读法", title:"数字1-10 + 年龄", phase:"beginner" },
  { day:18, vocabIds:['d18-0','d18-1','d18-2','d18-3','d18-4','d18-5','d18-6'], kanji:[{char:"何",meaning:"什么",reading:"なん"},{char:"本",meaning:"书",reading:"ほん"}], grammar:[{pattern:"こそあど体系",desc:"これ(近)それ(中)あれ(远)どれ(疑)",ex:"これは本です"}], tips:"こそあど是基础指示词体系", title:"これ/それ/あれ — 指示词", phase:"beginner" },
  { day:19, vocabIds:['d19-0','d19-1','d19-2','d19-3','d19-4','d19-5','d19-6'], kanji:[{char:"好",meaning:"喜欢",reading:"す"}], grammar:[{pattern:"〜がすきです",desc:"喜欢~。注意用が不是を！",ex:"ねこがすきです"}], tips:"がvsは是重要区别", title:"〜が好き — 喜好表达", phase:"beginner" },
  { day:20, vocabIds:['d20-0','d20-1','d20-2','d20-3','d20-4','d20-5','d20-6'], kanji:[{char:"時",meaning:"时间",reading:"とき"},{char:"人",meaning:"人",reading:"ひと"}], grammar:[{pattern:"ある vs いる",desc:"无生命=ある、有生命=いる",ex:"時計があります。人がいます。"}], tips:"死物ある、活物いる。植物用ある。", title:"あります/います — 存在句", phase:"beginner" },
  { day:21, vocabIds:['d21-0','d21-1','d21-2','d21-3','d21-4','d21-5','d21-6'], kanji:[{char:"駅",meaning:"车站",reading:"えき"}], grammar:[{pattern:"〜はどこですか",desc:"最实用问路句型",ex:"駅はどこですか"}], tips:"旅游实战模式开始！", title:"〜はどこですか — 问路", phase:"travel" },
  { day:22, vocabIds:['d22-0','d22-1','d22-2','d22-3','d22-4','d22-5','d22-6'], kanji:[{char:"高",meaning:"高/贵",reading:"たか"},{char:"安",meaning:"便宜",reading:"やす"}], grammar:[{pattern:"〜をください",desc:"请给我~",ex:"これをください"}], tips:"三句购物：いくら/これを/免税", title:"いくらですか + 购物", phase:"travel" },
  { day:23, vocabIds:['d23-0','d23-1','d23-2','d23-3','d23-4','d23-5','d23-6'], kanji:[{char:"注",meaning:"点/注",reading:"ちゅう"}], grammar:[{pattern:"〜はありますか",desc:"有~吗？",ex:"英語のメニューはありますか"}], tips:"进店：ふたりです。走时：お会計お願いします", title:"注文 + 餐厅", phase:"travel" },
  { day:24, vocabIds:['d24-0','d24-1','d24-2','d24-3','d24-4','d24-5','d24-6','d24-7'], kanji:[{char:"切",meaning:"票",reading:"きっぷ"},{char:"乗",meaning:"乘",reading:"の"}], grammar:[{pattern:"〜までお願いします",desc:"请到~",ex:"東京駅までお願いします"}], tips:"酒店：チェックインお願いします+护照", title:"交通 + 酒店", phase:"travel" },
  { day:25, vocabIds:[], kanji:[], grammar:[{pattern:"综合复习",desc:"默写全部假名、5句问候语",ex:"你好、谢谢、对不起、我是中国人、请多关照"}], tips:"假名熟练度决定后续学习速度", title:"复习日：假名+问候", phase:"beginner" },
  { day:26, vocabIds:[], kanji:[], grammar:[{pattern:"综合复习",desc:"数字1-100、あります/います造句、こそあど造句",ex:"桌子上有书→つくえの上に本があります"}], tips:"用日语描述房间里的东西", title:"复习日：数字+存在句", phase:"beginner" },
  { day:27, vocabIds:[], kanji:[], grammar:[{pattern:"模拟场景",desc:"4场景各3句：问路/点菜/购物/酒店",ex:"想像在东京找浅草寺、吃拉面、买免税、到酒店前台"}], tips:"不看提示独立完成", title:"复习日：旅游句型总复习", phase:"travel" },
  { day:28, vocabIds:[], kanji:[], grammar:[{pattern:"28天检测",desc:"假名识读、数字、问候、こそあど、あるいる、旅游句型",ex:"全面自测"}], tips:"28天总结：46假名+150+词汇+15旅游用语", title:"阶段检测", phase:"beginner" },
],

getCardsForDay(day) {
  const lesson = this.daily.find(d=>d.day===day);
  if (!lesson) return [];
  return lesson.vocabIds.map(id=>ALL_CARDS.find(c=>c.id===id)).filter(Boolean);
},

getLesson(day) {
  const lesson = this.daily.find(d=>d.day===day);
  if (!lesson) return null;
  return {
    ...lesson,
    vocab: this.getCardsForDay(day)
  };
},

getDayCount() { return this.daily.length; },
getTotalCards() { return ALL_CARDS.length; }
};

// 暴露
window.ALL_CARDS = ALL_CARDS;
window.COURSE = COURSE;

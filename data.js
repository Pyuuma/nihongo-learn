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
  // ═══ Phase 1: 平假名快速复习 (3天) ═══
  { day:1, vocabIds:['d1-0','d1-1','d1-2','d1-3','d1-4','d1-5','d1-6','d1-7','d1-8','d2-0','d2-1','d2-2','d2-3','d2-4','d2-5','d2-6','d2-7','d2-8','d3-0','d3-1','d3-2','d3-3','d3-4','d3-5','d3-6','d3-7','d3-8'], kanji:[], grammar:[{pattern:"元音+か行+さ行",desc:"快速过あ〜そ。重点：し=shi(不是si)　すし=sushi",ex:"あおい=蓝色 あかい=红色 ちいさい=小"}], tips:"你已熟悉假名，重点记单词：あい(爱) いえ(家) かお(脸) すし(寿司) せかい(世界)", title:"あ〜そ 三行速通 + 核心词", phase:"beginner" },
  { day:2, vocabIds:['d4-0','d4-1','d4-2','d4-3','d4-4','d4-5','d4-6','d4-7','d4-8','d5-0','d5-1','d5-2','d5-3','d5-4','d5-5','d5-6','d5-7','d5-8','d6-0','d6-1','d6-2','d6-3','d6-4','d6-5','d6-6','d6-7','d6-8'], kanji:[], grammar:[{pattern:"た〜ほ + 形容词入门",desc:"ち=chi つ=tsu ふ=fu。は做助词读wa。たかい=高/贵 ちかい=近",ex:"こんにちは=konnichiwa それはたかいです=那个很贵"}], tips:"重点：ち/つ/ふ三个特殊音。はな(花) ひと(人) ほし(星星)", title:"た〜ほ 三行速通 + 形容词", phase:"beginner" },
  { day:3, vocabIds:['d7-0','d7-1','d7-2','d7-3','d7-4','d7-5','d7-6','d7-7','d7-8','d8-0','d8-1','d8-2','d8-3','d8-4','d8-5','d9-0','d9-1','d9-2','d9-3','d9-4','d9-5','d9-6','d9-7','d9-8','d10-0','d10-1','d10-2','d10-3','d10-4','d10-5'], kanji:[], grammar:[{pattern:"ま〜ん + 问候语",desc:"の=的　を=宾语助词读o　ん=鼻音。にほん=日本",ex:"わたしのなまえ=我的名字 本をよむ=读书 にほん=日本"}], tips:"平假名复习完毕！今日重点词：なまえ(名字) やま(山) はる(春) わたし(我) にほん(日本)", title:"ま〜ん 收尾 + 问候语入门", phase:"beginner" },

  // ═══ Phase 2: 片假名融入词汇 + 基础语法 (4天) ═══
  { day:4, vocabIds:['d11-0','d11-1','d11-2','d11-3','d11-4','d11-5','d12-0','d12-1','d12-2','d12-3','d12-4','d12-5','d15-0','d15-1','d15-2','d15-3','d15-4','d15-5','d15-6'], kanji:[], grammar:[{pattern:"片假名=外来语",desc:"ア-コ行通过真词学：アイ=眼睛 ケーキ=蛋糕 コーヒー=咖啡。长音用ー",ex:"コーヒーをください = 请给我咖啡"},{pattern:"问候语",desc:"こんにちは(你好) おはよう(早) ありがとう(谢谢) すみません(对不起)",ex:"すみません、駅はどこですか = 请问车站在哪里？"}], tips:"片假名不用死记，通过外来语自然习得。ケーキ(蛋糕) テスト(测试)", title:"片假名ア〜コ + 每日问候", phase:"beginner" },
  { day:5, vocabIds:['d13-0','d13-1','d13-2','d13-3','d13-4','d13-5','d14-0','d14-1','d14-2','d14-3','d14-4','d14-5','d16-0','d16-1','d16-2','d16-3','d16-4','d16-5','d16-6'], kanji:[{char:"私",meaning:"我",reading:"わたし"}], grammar:[{pattern:"AはBです",desc:"最基本判断句。わたしは〜です=我是~",ex:"わたしはにほんじんです = 我是日本人"},{pattern:"⚠️ シvsツ",desc:"シ=三点水(shi)　ツ=从上往下(tsu)",ex:"テスト=test タクシー=taxi"}], tips:"学会完整自我介绍：はじめまして、わたしは〇〇です。ちゅうごくからきました。", title:"片假名サ〜ト + 自我介绍", phase:"beginner" },
  { day:6, vocabIds:['d17-0','d17-1','d17-2','d17-3','d17-4','d17-5','d17-6','d17-7','d17-8','d17-9','d18-0','d18-1','d18-2','d18-3','d18-4','d18-5','d18-6'], kanji:[{char:"一",meaning:"1",reading:"いち"},{char:"二",meaning:"2",reading:"に"},{char:"三",meaning:"3",reading:"さん"},{char:"何",meaning:"什么",reading:"なん"}], grammar:[{pattern:"数字+歳(さい)",desc:"数字1-10。4=よん/し 7=なな/しち。〜歳=岁",ex:"25歳です = 25岁"},{pattern:"こそあど",desc:"これ(这个)それ(那个)あれ(那个远)どれ(哪个)",ex:"これは何ですか = 这是什么？"}], tips:"数字+こそあど = 购物必备组合。いくらですか=多少钱", title:"数字1-10 + こそあど指示词", phase:"beginner" },
  { day:7, vocabIds:['d19-0','d19-1','d19-2','d19-3','d19-4','d19-5','d19-6','d20-0','d20-1','d20-2','d20-3','d20-4','d20-5','d20-6'], kanji:[{char:"好",meaning:"喜欢",reading:"す"},{char:"時",meaning:"时间",reading:"とき"},{char:"人",meaning:"人",reading:"ひと"}], grammar:[{pattern:"〜が好きです",desc:"喜欢~。用が不是を！",ex:"ねこが好きです = 我喜欢猫"},{pattern:"ある vs いる",desc:"无生命=ある(あります) 有生命=いる(います)",ex:"つくえがあります = 有桌子。ねこがいます = 有猫。"}], tips:"好き+ある/いる = 日常会话核心。りょこうが好きです=我喜欢旅行", title:"喜好 + 存在句", phase:"beginner" },

  // ═══ Phase 3: 旅游实战 (17天) ═══
  { day:8, vocabIds:['d21-0','d21-1','d21-2','d21-3','d21-4','d21-5','d21-6'], kanji:[{char:"駅",meaning:"车站",reading:"えき"},{char:"出",meaning:"出",reading:"で"}], grammar:[{pattern:"〜はどこですか",desc:"最实用问路句型",ex:"駅はどこですか = 车站在哪？トイレはどこですか = 厕所在哪？"}], tips:"旅游第一课！记住：すみません+〜はどこですか = 万能问路", title:"问路 — どこですか", phase:"travel" },
  { day:9, vocabIds:['d22-0','d22-1','d22-2','d22-3','d22-4','d22-5','d22-6'], kanji:[{char:"高",meaning:"贵/高",reading:"たか"},{char:"安",meaning:"便宜",reading:"やす"}], grammar:[{pattern:"〜をください",desc:"请给我~。购物时指东西说「これをください」",ex:"これをください = 请给我这个。袋をください = 请给袋子。"}], tips:"购物三句：いくらですか / これをください / 免税できますか", title:"购物 — いくら・ください", phase:"travel" },
  { day:10, vocabIds:['d23-0','d23-1','d23-2','d23-3','d23-4','d23-5','d23-6'], kanji:[{char:"注",meaning:"点/注",reading:"ちゅう"},{char:"水",meaning:"水",reading:"みず"}], grammar:[{pattern:"〜はありますか",desc:"有~吗？菜单、物品询问",ex:"英語のメニューはありますか = 有英文菜单吗？"}], tips:"进店：ふたりです(两位)。走时：お会計お願いします。", title:"餐厅 — 注文・メニュー", phase:"travel" },
  { day:11, vocabIds:['d24-0','d24-1','d24-2','d24-3','d24-4','d24-5','d24-6','d24-7'], kanji:[{char:"切",meaning:"票",reading:"きっ"},{char:"乗",meaning:"乘",reading:"の"}], grammar:[{pattern:"〜までお願いします",desc:"请到~。打车/买票用。",ex:"東京駅までお願いします = 请到东京站。"}], tips:"酒店：チェックインお願いします+出示护照。交通：切符(きっぷ)=车票", title:"交通・酒店", phase:"travel" },

  // ═══ Phase 4: 巩固拓展 (17天) ═══
  { day:12, vocabIds:[], kanji:[], grammar:[{pattern:"场景综合复习①",desc:"问路：駅/トイレ/出口はどこですか。购物：いくら・これをください。餐厅：注文・メニュー",ex:"模拟：你在东京街头、药妆店、拉面店"}], tips:"不看提示，独立完成3个场景对话", title:"复习①：问路+购物+餐厅", phase:"travel" },
  { day:13, vocabIds:[], kanji:[], grammar:[{pattern:"〜たいです",desc:"想做~。动词ます形去ます+たい",ex:"日本に行きたいです = 想去日本。ラーメンを食べたいです = 想吃拉面。"}], tips:"表达愿望的最常用句型", title:"愿望表达 — 〜たい", phase:"elementary" },
  { day:14, vocabIds:[], kanji:[], grammar:[{pattern:"て形入门",desc:"动词连接形。〜てください=请~",ex:"待ってください = 请等一下。教えてください = 请告诉我。"}], tips:"て形是日语最重要的活用形之一", title:"て形① — てください", phase:"elementary" },
  { day:15, vocabIds:[], kanji:[], grammar:[{pattern:"〜ています",desc:"正在~ / 状态持续",ex:"雨が降っています = 正在下雨。日本語を勉強しています = 在学日语。"}], tips:"进行时+状态，日常高频", title:"て形② — ています", phase:"elementary" },
  { day:16, vocabIds:[], kanji:[], grammar:[{pattern:"〜てもいいですか",desc:"可以~吗？请求许可",ex:"写真を撮ってもいいですか = 可以拍照吗？ここに座ってもいいですか = 可以坐这里吗？"}], tips:"旅游必备：拍照、试穿、询问", title:"て形③ — 许可请求", phase:"elementary" },
  { day:17, vocabIds:[], kanji:[], grammar:[{pattern:"ない形",desc:"动词否定形。〜ないでください=请不要~",ex:"タバコを吸わないでください = 请不要吸烟。"}], tips:"否定请求，公共场合必备", title:"ない形 — 否定表达", phase:"elementary" },
  { day:18, vocabIds:[], kanji:[], grammar:[{pattern:"た形",desc:"动词过去形。〜たことがあります=做过~",ex:"日本に行ったことがあります = 去过日本。富士山を見たことがあります = 见过富士山。"}], tips:"过去+经验表达，聊天常用", title:"た形 — 过去・经验", phase:"elementary" },
  { day:19, vocabIds:[], kanji:[], grammar:[{pattern:"〜たり〜たり",desc:"又~又~。列举动作",ex:"食べたり飲んだりしました = 又吃又喝。買い物したり観光したり = 购物观光。"}], tips:"旅游行程描述必备", title:"〜たり〜たり — 列举", phase:"elementary" },
  { day:20, vocabIds:[], kanji:[], grammar:[{pattern:"〜と思います",desc:"我觉得~。表达意见/推测",ex:"明日は雨だと思います = 我觉得明天会下雨。おいしいと思います = 我觉得好吃。"}], tips:"表达观点，告别只说单词的阶段", title:"意见表达 — 〜と思う", phase:"elementary" },
  { day:21, vocabIds:[], kanji:[], grammar:[{pattern:"〜つもりです",desc:"打算~。表达计划",ex:"来年日本に行くつもりです = 打算明年去日本。"}], tips:"旅行计划表达", title:"计划 — 〜つもり", phase:"elementary" },
  { day:22, vocabIds:[], kanji:[], grammar:[{pattern:"条件形 〜ば/〜たら",desc:"如果~。假设条件",ex:"安ければ買います = 如果便宜就买。時間があったら行きます = 有时间就去。"}], tips:"购物砍价、行程安排必备", title:"条件表达 — 〜ば・〜たら", phase:"elementary" },
  { day:23, vocabIds:[], kanji:[], grammar:[{pattern:"敬语入门",desc:"お/ご+〜+です/になります",ex:"お待ちください = 请稍等。いらっしゃいませ = 欢迎光临。"}], tips:"听懂日本店员的话", title:"敬语 — 服务业用语", phase:"elementary" },
  { day:24, vocabIds:[], kanji:[], grammar:[{pattern:"对比・逆接",desc:"〜が(但是) 〜のに(明明~却) 〜より(比~)",ex:"高いですが、おいしいです = 贵但好吃。日本より中国の方が広い = 中国比日本大。"}], tips:"让表达更自然", title:"对比表达", phase:"elementary" },
  { day:25, vocabIds:[], kanji:[], grammar:[{pattern:"场景综合复习②",desc:"交通/酒店/餐厅/购物四大场景 + て形、ない形、た形活用",ex:"模拟完整旅行对话：机场→电车→酒店→餐厅→购物"}], tips:"完整模拟一次日本旅行", title:"复习②：全场景模拟", phase:"travel" },
  { day:26, vocabIds:[], kanji:[], grammar:[{pattern:"阅读练习",desc:"读一段简单的日语文章（餐厅菜单/车站指示牌/酒店须知）",ex:"メニュー：ラーメン800円、餃子400円、ビール500円"}], tips:"实战阅读日本真实材料", title:"阅读实战", phase:"travel" },
  { day:27, vocabIds:[], kanji:[], grammar:[{pattern:"听力挑战",desc:"听一段日语对话（车站广播/餐厅点单/酒店前台）",ex:"まもなく3番線に電車が参ります = 3号站台列车即将进站"}], tips:"建议配合NHK Easy Japanese练习", title:"听力实战", phase:"travel" },
  { day:28, vocabIds:[], kanji:[], grammar:[{pattern:"最终检测 + 学习总结",desc:"完整检测：问候→自我介绍→数字→问路→购物→餐厅→酒店→て/ない/た形",ex:"你已具备日本自由行所需日语能力！"}], tips:"🎉 28天完成！接下来用Anki+沉浸继续进阶", title:"总复习 + 毕业检测", phase:"travel" },
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

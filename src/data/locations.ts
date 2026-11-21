import type { Location } from "../types/tamako";

export const LOCATIONS: Location[] = [
  // =========================================================================
  // 兔山商店街手绘平面图地标（忠实还原 tamakomarket.com/map/ 与 bg.png 方位）
  // =========================================================================
  {
    id: "arcade-entrance",
    nameZh: "兔山商店街入口拱门",
    nameJa: "うさぎ山商店街 入口アーチ",
    subtitle: "双兔圆月标志 · 故事起止点",
    area: "arcade",
    areaLabel: "兔山商店街主街",
    kind: "landmark",
    tone: "sky",
    arcadeCoord: { x: 410, y: 278 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "出町桝形商店街 东/西拱廊入口",
    realWorldAddress: "京都府京都市上京区二神町 / 青龙町",
    descriptionZh:
      "蓝底白边、绘着淡紫云纹与双兔圆月的大招牌高悬街口，右侧还立着检修梯。第 1 话玉子在街头听见铃声，第 12 话众人也从此跑出拱廊迎接新年。",
    settingNoteZh:
      "官网「場面スチール 01」重点参考点，也是出町桝形商店街真实拱廊与兔山商店街全貌建模的坐标原点。",
    officialUrl: "https://tamakomarket.com/map/still/01/",
  },
  {
    id: "usayu",
    nameZh: "钱汤「うさ湯」",
    nameJa: "うさ湯（お風呂屋さん）",
    subtitle: "汤本长治 & 小百合 · 暖汤与仲夏怪谈",
    area: "arcade",
    areaLabel: "兔山商店街北横街",
    kind: "bath",
    tone: "mint",
    arcadeCoord: { x: 606, y: 102 },
    linkedKyotoId: "kyoto-nishikiyu",
    realWorldRef: "旧·锦汤（中京区，建筑原型）",
    realWorldAddress: "京都府京都市中京区堺町通锦小路下八百屋町535",
    descriptionZh:
      "位于北横街的热气腾腾的社区钱汤，由町内会会长汤本长治与女儿小百合父女俩共同经营。德拉多次试图偷窥女汤被当场制裁；史织第一次与玉子一起泡澡后，心里筑起的高墙也悄悄融化；第 7 话小百合出嫁时，整条商店街都送上了满满祝福。",
    settingNoteZh:
      "官网「場面スチール 05a/05b」收录澡堂内景，现实建筑细部取材自京都老牌钱汤「锦汤」。",
    officialUrl: "https://tamakomarket.com/map/still/05/",
  },
  {
    id: "sashimi",
    nameZh: "鲜鱼店「さしみ」",
    nameJa: "さしみ（お魚屋さん）",
    subtitle: "鱼谷隆 & 真理 · 爽朗鱼铺",
    area: "arcade",
    areaLabel: "兔山商店街主街左列",
    kind: "shop",
    tone: "sky",
    arcadeCoord: { x: 286, y: 332 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "鲜鱼店「さが喜」（出町桝形商店街内）",
    descriptionZh:
      "主街最北侧的热情鱼铺，鱼谷隆与真理夫妇总是嗓门洪亮地招呼街坊。无论是清晨早市的吆喝，还是第 1 话与第 7 话大家一起张罗街坊喜事，他们总是第一时间搭把手。",
    settingNoteZh:
      "据第 1 话实景巡礼对照，店铺纵深与门口冰台鱼盘参照出町桝形内的「さが喜」还原。",
  },
  {
    id: "shimizuya",
    nameZh: "豆腐店「清水屋」",
    nameJa: "清水屋（お豆腐屋さん）",
    subtitle: "清水富雄 · 方方正正的温柔",
    area: "arcade",
    areaLabel: "兔山商店街主街左列",
    kind: "shop",
    tone: "leaf",
    arcadeCoord: { x: 286, y: 438 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "豆腐店「いづもや」（出町桝形商店街参考）",
    descriptionZh:
      "清晨就开始做豆腐的清爽店铺，店主富雄戴着墨镜、性格朴实敦厚。第 7 话得知一直暗恋的小百合即将出嫁时，他一边递上豆腐一边宽慰大家「正因为方方正正，才是豆腐嘛」。",
    settingNoteZh:
      "位于「さしみ」下方，暖帘与水槽柜台还原了京都老豆腐铺的紧凑街面尺度。",
  },
  {
    id: "florist-princess",
    nameZh: "花店「フローリスト プリンセス」",
    nameJa: "フローリスト プリンセス（お花屋さん）",
    subtitle: "花濑薰 · 玉子与德拉初遇之地",
    area: "arcade",
    areaLabel: "兔山商店街主街左列",
    kind: "shop",
    tone: "sakura",
    arcadeCoord: { x: 286, y: 544 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "花店「花の春風」（出町桝形商店街参考）",
    descriptionZh:
      "花香四溢的街坊花店，优雅的店主花濑薰总是打理着时令鲜花。TV 第 1 话中，从南国随夜来香花箱远道而来的德拉正是躺在这家店的展示台上与玉子相遇，开启了整段故事。",
    settingNoteZh:
      "官网「場面スチール 03a/03b」与「still/03」重点记录了门口花架、盆栽与德拉初遇的店头。",
    officialUrl: "https://tamakomarket.com/map/still/03/",
  },
  {
    id: "star-and-clown",
    nameZh: "唱片咖啡馆「星とピエロ」",
    nameJa: "星とピエロ（レコード屋・喫茶）",
    subtitle: "八百比邦夫 · 咖啡香与恋之歌",
    area: "arcade",
    areaLabel: "兔山商店街主街左列",
    kind: "shop",
    tone: "navy",
    arcadeCoord: { x: 286, y: 650 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "喫茶華波 & BAR 華波様楽（出町桝形附近参考）",
    descriptionZh:
      "蓝色木框玻璃门后藏着黑胶唱片与醇香咖啡的秘密角落。玉子常来点一杯加了满满牛奶的咖啡，也在这里终于打听到从小哼唱的「妈妈的歌」背后的温暖往事。",
    settingNoteZh:
      "官网「場面スチール 06」展示了蓝门、黑板菜单与店内吧台；官方更以「星とピエロ」名义发行了剧中插入曲辑。",
    officialUrl: "https://tamakomarket.com/map/still/06/",
  },
  {
    id: "arcade-crossroads",
    nameZh: "商店街十字路口（サバさん下）",
    nameJa: "商店街十字路（サバさん）",
    subtitle: "巨型蓝鲭鱼吊饰 · 集会与日常中心",
    area: "arcade",
    areaLabel: "兔山商店街中心",
    kind: "landmark",
    tone: "sky",
    arcadeCoord: { x: 410, y: 748 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "出町桝形商店街中央交叉口（吊鱼装饰原型）",
    descriptionZh:
      "商店街主街与支路交汇的核心广场，头顶拱棚高悬着标志性的大蓝鲭鱼装饰「サバさん」。无论是情人节企划、仲夏鬼屋集会，还是街坊们放学买菜寒暄，这里永远是最热闹的交汇点。",
    settingNoteZh:
      "现实中的出町桝形商店街拱顶同样悬挂着巨型鲭鱼「若狭路」造型装饰，是巡礼一眼必认的标志。",
  },
  {
    id: "tokiwado",
    nameZh: "玩具店「トキワ堂」",
    nameJa: "トキワ堂（おもちゃ屋さん）",
    subtitle: "常盘绿祖父常盘信彦家 · 童趣与心事",
    area: "arcade",
    areaLabel: "兔山商店街主街左列",
    kind: "shop",
    tone: "mint",
    arcadeCoord: { x: 286, y: 812 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "旧·イカワトーイ（出町桝形商店街参考）",
    descriptionZh:
      "常盘绿祖父常盘信彦经营的老牌玩具店，橱窗里摆满模型、剑玉与童年小玩具。第 8 话神奈的木工灵光、第 10 话小绿文化祭前的困惑，都在这里的温柔灯光下慢慢解开。",
    settingNoteZh:
      "位于十字路口以南左列，正对面便是肉店「ジャストミート」。",
  },
  {
    id: "miyako-udon",
    nameZh: "乌冬面馆「みやこうどん」",
    nameJa: "みやこうどん（おうどん屋さん）",
    subtitle: "白木忠直 · 暖胃高汤与温暖灯火",
    area: "arcade",
    areaLabel: "兔山商店街主街左列",
    kind: "shop",
    tone: "apricot",
    arcadeCoord: { x: 286, y: 922 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "出町桝形南端老铺面馆（参考）",
    descriptionZh:
      "主街最南端的暖心乌冬店，沉默寡言却手艺一流的青年店主白木忠直每天熬制滚烫高汤，冬夜排练或放学归来时来上一碗再幸福不过。",
    settingNoteZh:
      "位于商店街南段左侧，常与「トキワ堂」「ジャストミート」一同构成南口日常场景。",
  },
  {
    id: "just-meat",
    nameZh: "精肉店「ジャストミート」",
    nameJa: "ジャストミート（お肉屋さん）",
    subtitle: "満村文子 · 炸可乐饼香气四溢",
    area: "arcade",
    areaLabel: "兔山商店街主街右列",
    kind: "shop",
    tone: "apricot",
    arcadeCoord: { x: 512, y: 822 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "旧·野口屋精肉店（出町桝形参考）",
    descriptionZh:
      "总飘着现炸牛肉可乐饼诱人香气的肉店，爽朗能干的女店主文子深受学生们喜爱。第 2 话商店街情人节作战与第 8 话德拉偷吃危机都少不了这家肉店。",
    settingNoteZh:
      "官网「場面スチール 02」记录了红橙色横招、绿白条纹遮阳篷与热气柜台。",
    officialUrl: "https://tamakomarket.com/map/still/02/",
  },
  {
    id: "tamaya-shop",
    nameZh: "北白川家年糕店「たまや」",
    nameJa: "たまや（北白川家）",
    subtitle: "豆大福、暖帘与温馨居间",
    area: "arcade",
    areaLabel: "兔山商店街东支路",
    kind: "home",
    tone: "sakura",
    arcadeCoord: { x: 707, y: 570 },
    linkedKyotoId: "kyoto-futaba",
    realWorldRef: "出町ふたば（年糕文化与豆大福原型）",
    descriptionZh:
      "三片靛蓝暖帘背后，蒸笼水汽日复一日升腾。北白川豆大在这里捣出全街最松软的豆大福，玉子总在这里研究奇思妙想的新年糕；店后的榻榻米居间与厨房见证了全剧绝大多数家庭日常与欢笑。",
    settingNoteZh:
      "官网设定 03（居间）、06（厨房）、15（客房）及第 7 话第 03 张剧照完整记录了门面与室内尺度。",
    officialUrl: "https://tamakomarket.com/map/setting/03/",
  },
  {
    id: "tamaya-window",
    nameZh: "二楼窗台与纸杯电话",
    nameJa: "二階の窓・糸電話",
    subtitle: "跨越巷弄的童年红线",
    area: "arcade",
    areaLabel: "玉屋 ↔ 大路屋上空",
    kind: "landmark",
    tone: "sakura",
    arcadeCoord: { x: 707, y: 716 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "玉屋与大路屋两家二楼相对窗台",
    descriptionZh:
      "虽然两家父亲见了面就拌嘴，玉子和饼藏卧室的二楼窗户却恰好隔街相望。从小时候起，饼藏拉起的这根纸杯电话线，承载了第 11 话夜话、写不出口的告白，以及剧场版最终回响的答案。",
    settingNoteZh:
      "官方地图中两家之间写着锯齿爆裂标注「ライバルもち屋（对手年糕店）」，而楼上却悄悄牵着一条温柔的纸杯电话线。",
  },
  {
    id: "oojiya",
    nameZh: "大路屋「RICE CAKE Oh!ZEE」",
    nameJa: "大路屋（RICE CAKE Oh!ZEE）",
    subtitle: "大路吾平 · 时髦改名年糕店",
    area: "arcade",
    areaLabel: "兔山商店街东支路",
    kind: "home",
    tone: "navy",
    arcadeCoord: { x: 707, y: 844 },
    linkedKyotoId: "kyoto-masugata",
    realWorldRef: "「たまや」对门建筑位置",
    descriptionZh:
      "与「たまや」隔支路正对的老对手年糕店。店主大路吾平紧跟潮流把店面装修得摩登洋气，改名为「RICE CAKE Oh!ZEE」，与固守传统的豆大每天上演可爱又默契的年糕竞争。",
    settingNoteZh:
      "官网「場面スチール 04」展示了大路屋翻新后的银灰现代门牌、檐下球灯与玻璃橱窗。",
    officialUrl: "https://tamakomarket.com/map/still/04/",
  },

  // =========================================================================
  // 京都实景圣地巡礼坐标（经 OpenStreetMap Nominatim / 官方地图核验）
  // =========================================================================
  {
    id: "kyoto-masugata",
    nameZh: "出町桝形商店街",
    nameJa: "出町桝形商店街",
    subtitle: "兔山商店街真实原型 · 全作核心舞台",
    area: "demachi",
    areaLabel: "出町柳・桝形片区",
    kind: "landmark",
    tone: "sakura",
    kyotoCoord: { lat: 35.030282, lng: 135.769155 },
    linkedArcadeId: "arcade-entrance",
    realWorldRef: "出町桝形商店街（京都市上京区）",
    realWorldAddress: "京都府京都市上京区桝形通出町西入二神町",
    descriptionZh:
      "位于京都御苑东北角的真实拱廊商店街，正是「兔山商店街」的取景原型！屋顶高悬着现实版鲭鱼吊饰，街口能看到玉子与乔伊的「飞出坊や」木牌，街内也设有供圣地巡礼者留言的交流笔记本。",
    settingNoteZh:
      "点击下方按钮即可直接切入「兔山商店街手绘平面图」，逐间探索街道内部的 13 处店铺与客厅、厨房剧情事件。",
    officialUrl: "https://masugata.demachi.jp/tamakomarket/",
  },
  {
    id: "kyoto-futaba",
    nameZh: "出町双叶（出町ふたば）",
    nameJa: "出町ふたば",
    subtitle: "名代豆饼 · 年糕文化风味原点",
    area: "demachi",
    areaLabel: "出町柳・桝形片区",
    kind: "shop",
    tone: "apricot",
    kyotoCoord: { lat: 35.030107, lng: 135.769627 },
    linkedArcadeId: "tamaya-shop",
    realWorldRef: "明治创业京都名代豆饼老铺",
    realWorldAddress: "京都府京都市上京区出町通今出川上ル青龙町236",
    descriptionZh:
      "紧邻出町桝形商店街东口的著名百年和果子名店，以现捣红豆大福（名代豆饼）闻名全国，经常大排长龙，是动画中北白川家「たまや」对豆大福执着与日常风味的重要灵感来源。",
    settingNoteZh:
      "巡礼购饼建议上午前往，买完豆大福正好步行 2 分钟到鸭川三角洲一边赏河景一边品尝。",
  },
  {
    id: "kyoto-demachiza",
    nameZh: "出町座（电影院・书店・咖啡）",
    nameJa: "出町座",
    subtitle: "十周年与纪念特别重映圣地",
    area: "demachi",
    areaLabel: "出町柳・桝形片区",
    kind: "landmark",
    tone: "sky",
    kyotoCoord: { lat: 35.03034, lng: 135.76855 },
    realWorldRef: "位于出町桝形商店街西侧的独立影院",
    realWorldAddress: "京都府京都市上京区三芳町133",
    descriptionZh:
      "扎根在出町桝形商店街内的独立电影院，多次举办《玉子市场》与《玉子爱情故事》特别上映与十周年纪念放映活动，走出影厅便是动画里的商店街拱廊。",
    settingNoteZh:
      "2023–2024 年官方十周年企划中，出町座曾作为重点纪念放映场馆登场。",
    officialUrl: "https://demachiza.com/movies/13404",
  },
  {
    id: "kyoto-delta",
    nameZh: "鸭川三角洲 & 跳乌龟石",
    nameJa: "鴨川デルタ・飛び石",
    subtitle: "《玉子爱情故事》直球告白名场面",
    area: "kamogawa",
    areaLabel: "鸭川三角洲片区",
    kind: "landmark",
    tone: "sky",
    kyotoCoord: { lat: 35.030123, lng: 135.771742 },
    realWorldRef: "贺茂川与高野川交汇沙洲及龟形跳石",
    realWorldAddress: "京都府京都市左京区田中下柳町（贺茂大桥北侧）",
    descriptionZh:
      "高野川与贺茂川在此汇流成鸭川，河面上铺设着著名的乌龟与千鸟造型跳石。剧场版《玉子爱情故事》最揪心也最清澈的名场面就发生在此——夕阳染红水面，饼藏跨在跳石之间对玉子说出：「我喜欢玉子。」",
    settingNoteZh:
      "踩着跳石从沙洲过河时，可以直观感受剧场版里「那块圆石头好像豆大福」的清凉河风与光影角度。",
  },
  {
    id: "kyoto-demachi-bridge",
    nameZh: "出町桥",
    nameJa: "出町橋",
    subtitle: "夕阳西下与分别前夕的归途",
    area: "kamogawa",
    areaLabel: "鸭川三角洲片区",
    kind: "landmark",
    tone: "apricot",
    kyotoCoord: { lat: 35.030422, lng: 135.771109 },
    realWorldRef: "跨越贺茂川连接出町桝形与河洲的大桥",
    realWorldAddress: "京都府京都市上京区青龙町 / 左京区",
    descriptionZh:
      "连接商店街与鸭川三角洲的桥梁。第 9 话送别柚月时的黄昏感伤、剧场版里角色们骑车与步行的归途，都常常把出町桥的栏杆与远山剪影收入镜头。",
    settingNoteZh:
      "桥西即是出町双叶与商店街东口，是衔接街坊生活与广阔川岸空间的分界线。",
  },
  {
    id: "kyoto-kawai-bridge",
    nameZh: "河合桥 & 高野川河畔",
    nameJa: "河合橋・高野川",
    subtitle: "少女心事与绿的温柔托付",
    area: "kamogawa",
    areaLabel: "鸭川三角洲片区",
    kind: "landmark",
    tone: "mint",
    kyotoCoord: { lat: 35.030463, lng: 135.772291 },
    realWorldRef: "跨越东侧高野川通往出町柳站的桥梁与堤岸",
    realWorldAddress: "京都府京都市左京区田中上柳町",
    descriptionZh:
      "东侧跨越聚光水面的河合桥与高野川堤岸草坡。在玉子因饼藏的告白乱了阵脚时，绿在这里与她散步谈心；而剧场版里下鸭方向与出町柳的步行动线也一次次经过这里。",
    settingNoteZh:
      "春天樱花沿着堤岸盛开，河畔视角可以同时望见跳石与远方比叡山轮廓。",
  },
  {
    id: "kyoto-kamo-ohashi",
    nameZh: "贺茂大桥",
    nameJa: "賀茂大橋",
    subtitle: "今出川通跨川大桥 · 夏夜与远景",
    area: "kamogawa",
    areaLabel: "鸭川三角洲片区",
    kind: "landmark",
    tone: "navy",
    kyotoCoord: { lat: 35.028981, lng: 135.771442 },
    realWorldRef: "今出川通跨越鸭川起点的主干桥",
    realWorldAddress: "京都府京都市上京区梶井町 / 左京区田中下柳町",
    descriptionZh:
      "紧挨鸭川三角洲南侧的宽阔石桥，第 4 话祭典夜色、全作多次过桥俯瞰鸭川开阔水面的空镜都取景于此，桥栏石柱是认出镜头方位的绝佳线索。",
    settingNoteZh:
      "站在桥上向北俯瞰，能拍出与剧场版宣传图及多个关键远景一致的三角洲全景构图。",
  },
  {
    id: "kyoto-demachiyanagi",
    nameZh: "京阪出町柳站",
    nameJa: "京阪 出町柳駅",
    subtitle: "连接兔山町与通学列车、京都站的起点",
    area: "kamogawa",
    areaLabel: "鸭川三角洲片区",
    kind: "station",
    tone: "leaf",
    kyotoCoord: { lat: 35.03067, lng: 135.773189 },
    realWorldRef: "京阪电铁鸭东线终点站・出町柳站",
    realWorldAddress: "京都府京都市左京区田中上柳町32-1",
    descriptionZh:
      "玉子、饼藏、绿、神奈等人每天往返商店街与学校的电车乘车终点站。也是剧场版尾声，玉子为了追赶即将赴东京的饼藏，奋力冲进站台搭车奔赴京都站的起点。",
    settingNoteZh:
      "搭乘京阪本线直达伏见区「藤森站」约 20 分钟，现实圣地巡礼可将此作为两大片区串联枢纽。",
  },
  {
    id: "kyoto-shimogamo",
    nameZh: "下鸭神社 & 糺之森",
    nameJa: "下鴨神社・糺の森",
    subtitle: "第 4 话「兔山神社」祭典舞台参考",
    area: "kamogawa",
    areaLabel: "鸭川三角洲片区",
    kind: "shrine",
    tone: "leaf",
    kyotoCoord: { lat: 35.036992, lng: 135.772451 },
    realWorldRef: "世界文化遗产贺茂御祖神社（下鸭神社）",
    realWorldAddress: "京都府京都市左京区下鸭泉川町59",
    descriptionZh:
      "穿过鸭川三角洲往北步入郁郁葱葱的糺之森，便是历史悠久的下鸭神社。TV 第 4 话五月祭典与剧场版、周边企划里的林荫参道和朱红鸟居氛围多取材自这一带。",
    settingNoteZh:
      "从鸭川三角洲沿河合神社步入糺之森约需 8 分钟，林间长椅与碎石参道充满初夏绿意。",
  },
  {
    id: "kyoto-nishikiyu",
    nameZh: "旧·锦汤（うさ湯建筑原型）",
    nameJa: "旧・錦湯",
    subtitle: "唐破风木屋顶与复古男/女汤构图",
    area: "central",
    areaLabel: "京都市中心片区",
    kind: "bath",
    tone: "mint",
    kyotoCoord: { lat: 35.0044, lng: 135.7615 },
    linkedArcadeId: "usayu",
    realWorldRef: "中京区锦市场南侧传统钱汤（2022 年结业保存）",
    realWorldAddress: "京都府京都市中京区堺町通锦小路下八百屋町535",
    descriptionZh:
      "位于锦市场旁的老式木造町家钱汤，剧中「うさ湯」的木门、格栅玻璃、更衣柜与澡堂磁砖设计大量参照了锦汤的真实细节，也承载着第 3 话与第 6 话的钱汤回忆。",
    settingNoteZh:
      "虽已停止营业，但传统町家外观仍保留在街巷中，可与商店街内部的「うさ湯」配合对照。",
  },
  {
    id: "kyoto-fujinomori",
    nameZh: "京阪藤森站",
    nameJa: "京阪 藤森駅",
    subtitle: "玉子一行人的通学电车站",
    area: "fujinomori",
    areaLabel: "伏见・藤森通学片区",
    kind: "station",
    tone: "sky",
    kyotoCoord: { lat: 34.956858, lng: 135.770124 },
    realWorldRef: "京阪本线藤森站（东口与跨线天桥）",
    realWorldAddress: "京都府京都市伏见区深草极乐町",
    descriptionZh:
      "从第 1 话到剧场版反复登场的通学车站。放学后玉子、绿、神奈并肩走出闸机，或是饼藏举着相机偷拍电车进站与天桥风声，都是最经典的日常画框。",
    settingNoteZh:
      "站点保留了简洁的南北跨线通道与东口出入口，从出町柳站乘普通或准急即可直达。",
  },
  {
    id: "kyoto-kitoro",
    nameZh: "キトロ桥 & 琵琶湖疏水通学路",
    nameJa: "キトロ橋・琵琶湖疏水",
    subtitle: "放学林荫水岸 · 饼藏暗下决心的桥边",
    area: "fujinomori",
    areaLabel: "伏见・藤森通学片区",
    kind: "landmark",
    tone: "leaf",
    kyotoCoord: { lat: 34.95787, lng: 135.770698 },
    realWorldRef: "深草キトロ町琵琶湖疏水沿岸步道与小桥",
    realWorldAddress: "京都府京都市伏见区深草キトロ町",
    descriptionZh:
      "紧邻藤森站东侧的琵琶湖疏水支线与「キトロ桥」。绿油油的堤岸护栏、桥墩弧度与电线杆位置几乎逐像素对应动画里的通学路；剧场版中饼藏也曾沿着这条安静水岸思考自己的未来。",
    settingNoteZh:
      "沿疏水向北步行即可串起多处剧集和剧场版原画对照机位，十分适合徒步慢逛。",
  },
  {
    id: "kyoto-shidan-bridge",
    nameZh: "师团桥",
    nameJa: "師団橋",
    subtitle: "横跨疏水的日常通勤小桥",
    area: "fujinomori",
    areaLabel: "伏见・藤森通学片区",
    kind: "landmark",
    tone: "apricot",
    kyotoCoord: { lat: 34.959184, lng: 135.770533 },
    realWorldRef: "第二军道跨琵琶湖疏水桥梁",
    realWorldAddress: "京都府京都市伏见区深草直违桥六丁目",
    descriptionZh:
      "从キトロ桥沿琵琶湖疏水继续北上便来到师团桥。第 1 话清晨骑行上学与放学谈笑的片段中，桥侧栏杆与水面倒影共同构成温柔的京都近郊风景。",
    settingNoteZh:
      "疏水两岸车流较慢，拍照对照镜头时请注意礼让来往行人及自行车。",
  },
  {
    id: "kyoto-seibo",
    nameZh: "兔山高校原型（京都圣母学院周边）",
    nameJa: "京都聖母学院周辺（うさぎ山高校モデル）",
    subtitle: "红砖绿瓦校舍 · 接力棒部与高三同班",
    area: "fujinomori",
    areaLabel: "伏见・藤森通学片区",
    kind: "school",
    tone: "mint",
    kyotoCoord: { lat: 34.957684, lng: 135.772559 },
    realWorldRef: "京都圣母学院高等学校校舍外围街道",
    realWorldAddress: "京都府京都市伏见区深草田谷町1",
    descriptionZh:
      "红砖墙壁配青铜色斜顶的优雅校舍正是「兔山高校」的设计灵感。从第 3 话史织的羽毛球馆、第 5 话绿与玉子的泳池特训、第 10 话文化祭接力棒部舞台，到剧场版玉子与饼藏首次分入高三同班填写志愿表，无数青春闪光都在校舍内诞生。",
    settingNoteZh:
      "此处为现役学校设施，请务必仅在外部公共街道远远欣赏红砖建筑风貌，切勿进入校内或拍摄在校学生。",
  },
  {
    id: "kyoto-station",
    nameZh: "JR 京都站 & 新干线月台",
    nameJa: "JR京都駅・新幹線ホーム",
    subtitle: "《玉子爱情故事》终幕奔赴 · 纸杯电话高潮",
    area: "central",
    areaLabel: "京都市中心片区",
    kind: "station",
    tone: "sakura",
    kyotoCoord: { lat: 34.985849, lng: 135.758767 },
    realWorldRef: "JR 京都站中央口、南北自由通路与东海道新干线站台",
    realWorldAddress: "京都府京都市下京区东盐小路高仓町",
    descriptionZh:
      "对于一直把兔子山商店街当成整个世界的玉子来说，钢铁与玻璃构筑的京都站宛如陌生的迷宫。然而在得知饼藏即将去往东京的这一刻，玉子鼓起全部勇气一路奔跑冲上新干线月台，用纸杯电话将心声「饼藏，我最喜欢你了！」稳稳传达给对方。",
    settingNoteZh:
      "进入新干线月台需购买站台票（入场券）或有效乘车券，切勿影响现场旅客通行。",
  },
];

export const LOCATION_MAP: Record<string, Location> = Object.fromEntries(
  LOCATIONS.map((loc) => [loc.id, loc])
);

export const ARCADE_LOCATIONS = LOCATIONS.filter((l) => Boolean(l.arcadeCoord));
export const KYOTO_LOCATIONS = LOCATIONS.filter((l) => Boolean(l.kyotoCoord));

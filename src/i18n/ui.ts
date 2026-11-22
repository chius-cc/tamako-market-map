import type { CharacterCircle, Locale, WorkKind } from "../types/tamako";

export interface UiMessages {
  docTitle: string;
  brandTitle: string;
  brandSub: string;
  viewSwitchAria: string;
  viewArcade: string;
  viewKyoto: string;
  navAria: string;
  navEpisodes: string;
  navCharacters: string;
  navSearch: string;
  navDirectory: string;
  navArchive: string;
  mobileFilterBtn: string;
  mobileMenuOpenAria: string;
  mobileMenuCloseAria: string;
  mobileDialogAria: string;
  mobileEpisodes: string;
  mobileCharacters: (count: number) => string;
  mobileSearch: string;
  mobileDirectory: (count: number) => string;
  mobileArchive: string;
  langSwitchAria: string;

  // Hints & Dera Mascot
  defaultHint: string;
  hintBrand: string;
  hintSwitchArcade: string;
  hintSwitchKyoto: string;
  hintOpenEpisodes: string;
  hintOpenCharacters: string;
  hintOpenSearch: string;
  hintOpenDirectory: string;
  hintOpenArchive: string;
  hintSelectLoc: (name: string, count: number, sub: string) => string;
  hintHoverArcadeLoc: (name: string, sub: string, count: number) => string;
  hintHoverKyotoLoc: (name: string, ref: string, count: number) => string;
  hintLocateEvent: (title: string, badge: string) => string;
  hintTourStep: (idx: number, total: number, title: string) => string;
  hintWorkChanged: (label: string) => string;
  hintEpisodeToggled: (shortLabel: string, title: string) => string;
  hintSingleEpisode: (shortLabel: string, title: string) => string;
  hintSingleCharacter: (name: string) => string;

  // Dera Dock
  deraDockAria: string;
  deraGuideTitle: string;
  collapseBtn: string;
  deraToggleCollapseAria: string;
  deraToggleExpandAria: string;
  prevScene: string;
  nextScene: string;
  prevSceneAria: string;
  nextSceneAria: string;
  tourLabel: string;

  // Active Filter Strip
  activeFiltersAria: string;
  removeWorkAria: string;
  removeItemAria: (label: string) => string;
  clearSearchAria: string;
  clearAllFilters: string;
  crossMapToKyoto: (count: number) => string;
  crossMapToArcade: (count: number) => string;
  mapLoadingKyoto: string;
  mainMapAria: string;

  // Work Labels
  workLabels: Record<"all" | WorkKind, string>;
  workShortLabels: Record<WorkKind, string>;

  // Arcade Map
  arcadeToolbarAria: string;
  arcadeGuideTag: string;
  arcadeFitBtn: string;
  arcadeZoomGroupAria: string;
  arcadeZoomInAria: string;
  arcadeZoomOutAria: string;
  arcadeRegionAria: string;
  arcadePinAria: (name: string, count: number) => string;
  arcadeBoardSub: string;
  arcadeLegendTitle: string;
  arcadeLegendLine1: string;
  arcadeLegendLine2: string;
  arcadeLegendLine3: string;
  arcadeCompassNorth: string;

  // Kyoto Map
  kyotoToolbarAria: string;
  kyotoPresets: {
    all: string;
    demachi: string;
    fujinomori: string;
    station: string;
  };
  kyotoRoutesActive: string;
  kyotoRoutesInactive: string;
  kyotoZoomGroupAria: string;
  kyotoZoomInAria: string;
  kyotoZoomOutAria: string;
  kyotoRegionAria: string;
  kyotoFallbackAria: string;
  kyotoPinAria: (name: string, count: number) => string;

  // Location Inspector (MapSidebar)
  inspectorAria: string;
  inspectorReopenSub: (count: number) => string;
  inspectorCloseBtn: string;
  inspectorCloseAria: string;
  inspectorStillAlt: (name: string) => string;
  inspectorOwnersAria: string;
  inspectorOwnerTitle: (name: string) => string;
  inspectorJumpArcade: (name: string) => string;
  inspectorJumpKyoto: (name: string) => string;
  googleMapsBtn: string;
  inspectorEventsTitle: (count: number) => string;
  inspectorClickHint: string;
  inspectorDemachizaNote: string;
  inspectorEmpty: string;
  inspectorResetBtn: string;

  // Filter Drawer
  filterTitle: string;
  filterSub: (matched: number, total: number) => string;
  filterResetAll: string;
  filterViewMap: (matched: number) => string;
  filterSearchAria: string;
  filterSearchPlaceholder: string;
  filterTabAria: string;
  filterTabAll: string;
  filterTabEpisodes: string;
  filterTabCharacters: (count: number) => string;
  filterEpSectionAria: string;
  filterEpHeading: string;
  filterClearEps: (count: number) => string;
  filterCharSectionAria: string;
  filterCharHeading: string;
  filterMatchAria: string;
  filterMatchOr: string;
  filterMatchAnd: string;
  circleLabels: Record<CharacterCircle, string>;

  // Event Directory Drawer
  dirTitle: (count: number) => string;
  dirSub: string;
  dirGroupEpisode: string;
  dirGroupArea: string;
  dirCloseAria: string;
  dirEmptyText: string;
  dirShowAllBtn: (total: number) => string;
  dirStagePrefix: string;
  dirLocateBtn: string;
  dirDetailBtn: string;
  areaGroupLabels: Record<"arcade" | "demachi" | "kamogawa" | "fujinomori" | "central", string>;

  // Event Modal
  modalCloseAria: string;
  modalStillAlt: (title: string) => string;
  modalWorkLabel: string;
  modalOnlyThisEp: string;
  modalStageLabel: string;
  modalArcadePrefix: string;
  modalKyotoPrefix: string;
  modalStaffLabel: string;
  modalStaffFormat: (s: {
    script: string;
    storyboard: string;
    director: string;
    animationDirector: string;
  }) => string;
  modalCharsLabel: string;
  modalStaffNotePrefix: string;
  modalPilgrimageTipPrefix: string;
  modalLocateArcade: string;
  modalLocateKyoto: string;

  // Archive & Pilgrimage Modal
  archiveTitle: string;
  archiveTabEpisodes: string;
  archiveTabPilgrimage: string;
  archiveCloseAria: string;
  archiveOnlyThisEp: string;
  archiveOfficialLink: string;
  pilgrimageEtiquette: string;
  pilgrimageRoute1Title: string;
  pilgrimageRoute1Body: string;
  pilgrimageRoute2Title: string;
  pilgrimageRoute2Body: string;
  pilgrimageRoute3Title: string;
  pilgrimageRoute3Body: string;
  pilgrimageLinksTitle: string;
  pilgrimageLinkTvMap: string;
  pilgrimageLinkMovie: string;
  pilgrimageLinkMasugata: string;
  pilgrimageCreditsPrefix: string;
  pilgrimageCreditsCopyright: string;
  pilgrimageCreditsSuffix: string;
}

export const UI_MESSAGES: Record<Locale, UiMessages> = {
  zh: {
    docTitle: "兔山商店街与京都剧情地图 · Tamako Story Map",
    brandTitle: "兔山剧情地图",
    brandSub: "玉子市场 · 玉子爱情故事",
    viewSwitchAria: "核心地图视角切换",
    viewArcade: "🍡 兔山商店街",
    viewKyoto: "🗺️ 京都圣地地图",
    navAria: "地图功能导航",
    navEpisodes: "集数筛选",
    navCharacters: "角色筛选",
    navSearch: "🔍 搜索",
    navDirectory: "📖 事件手账",
    navArchive: "🗂️ 档案与巡礼",
    mobileFilterBtn: "筛选",
    mobileMenuOpenAria: "打开功能菜单",
    mobileMenuCloseAria: "关闭功能菜单",
    mobileDialogAria: "移动端功能导航",
    mobileEpisodes: "🎬 按集数 / 剧场版筛选",
    mobileCharacters: (n) => `🐰 按人物头像筛选（${n} 人）`,
    mobileSearch: "🔍 搜索台词 / 地点 / 剧情",
    mobileDirectory: (n) => `📖 打开剧照事件手账（${n} 幕）`,
    mobileArchive: "🗂️ 全话制作档案 & 巡礼礼仪",
    langSwitchAria: "切换界面语言",

    defaultHint:
      "欢迎来到兔山商店街！点击地图上的金框剧照圆章查看名场面，也可从上方导航按集数或人物头像筛选もち。",
    hintBrand: "欢迎来到兔山商店街！点击地图上的剧照圆章即可探索剧情もち。",
    hintSwitchArcade:
      "切到兔山商店街手绘平面图，逛遍 13 处街坊店铺与二楼糸電話もち！",
    hintSwitchKyoto:
      "切到和纸主题京都圣地地图，巡礼出町桝形、鸭川跳石、藤森与京都站もち！",
    hintOpenEpisodes:
      "按 TV 第 1–12 话、剧场版《玉子爱情故事》或短片筛选剧情もち！",
    hintOpenCharacters:
      "用真实人物头像筛选北白川家、高校同级生、大路家与商店街街坊もち！",
    hintOpenSearch: "搜索名台词、纸杯电话、鸭川、恋之歌或任意店铺名称もち！",
    hintOpenDirectory:
      "展开剧照事件手账，按集数或片区一览全部动画剧照卡片もち。",
    hintOpenArchive: "查看全 14 篇剧集主创名单与京都圣地巡礼礼仪指南もち。",
    hintSelectLoc: (name, count, sub) =>
      `已选中「${name}」：当前有 ${count} 幕剧情。${sub}もち！`,
    hintHoverArcadeLoc: (name, sub, count) =>
      `${name}（${sub}）· 当前有 ${count} 条剧情事件もち`,
    hintHoverKyotoLoc: (name, ref, count) =>
      `${name}（${ref}）· 当前有 ${count} 条剧情事件もち`,
    hintLocateEvent: (title, badge) => `已定位「${title}」（${badge}）もち！`,
    hintTourStep: (idx, total, title) =>
      `剧情巡游（第 ${idx}/${total} 幕）：${title}もち！`,
    hintWorkChanged: (label) => `已切换至「${label}」范围筛选もち！`,
    hintEpisodeToggled: (shortLabel, title) =>
      `已切换集数筛选：${shortLabel}《${title}》もち。`,
    hintSingleEpisode: (shortLabel, title) =>
      `已聚焦至 ${shortLabel}《${title}》全部事件もち！`,
    hintSingleCharacter: (name) => `已筛选「${name}」登场全部名场面もち！`,

    deraDockAria: "德拉导览与剧情巡游控制",
    deraGuideTitle: "德拉·莫奇马兹导览",
    collapseBtn: "收起",
    deraToggleCollapseAria: "收起德拉搭话框",
    deraToggleExpandAria: "展开德拉搭话框",
    prevScene: "← 上一幕",
    nextScene: "下一幕 →",
    prevSceneAria: "上一幕剧情",
    nextSceneAria: "下一幕剧情",
    tourLabel: "🎬 巡游",

    activeFiltersAria: "当前生效筛选条件",
    removeWorkAria: "移除作品筛选",
    removeItemAria: (label) => `移除 ${label}`,
    clearSearchAria: "清除搜索关键词",
    clearAllFilters: "清空筛选",
    crossMapToKyoto: (n) => `命中 ${n} 幕位于京都地图 → 点击切换`,
    crossMapToArcade: (n) => `命中 ${n} 幕位于商店街 → 点击切换`,
    mapLoadingKyoto: "正在铺开和纸主题京都圣地地图もち…",
    mainMapAria: "交互式剧情地图主舞台",

    workLabels: {
      all: "全部作品",
      tv: "TV 全 12 话",
      movie: "剧场版《玉子爱情故事》",
      short: "短片《德拉酱》",
    },
    workShortLabels: {
      tv: "TV 全12话",
      movie: "剧场版",
      short: "南国短片",
    },

    arcadeToolbarAria: "商店街地图导览",
    arcadeGuideTag: "🍡 手绘兔山商店街 · 滚轮/双指缩放 · 点击剧照圆章查看剧情",
    arcadeFitBtn: "适应全街",
    arcadeZoomGroupAria: "商店街缩放控制",
    arcadeZoomInAria: "放大商店街地图",
    arcadeZoomOutAria: "缩小商店街地图",
    arcadeRegionAria: "兔山商店街手绘风交互式平面地图",
    arcadePinAria: (name, count) => `${name}（${count} 条命中事件）`,
    arcadeBoardSub: "出町桝形原型 · 街坊头像与剧照全收录",
    arcadeLegendTitle: "✦ 街坊手账导览",
    arcadeLegendLine1: "· 圆框肖像：各店看板店主",
    arcadeLegendLine2: "· 金框剧照章：点击看该店剧情",
    arcadeLegendLine3: "· 东支路二楼：玉子 ↔ 饼藏糸電話",
    arcadeCompassNorth: "北（出町口）",

    kyotoToolbarAria: "京都巡礼片区快速跳转",
    kyotoPresets: {
      all: "全览京都",
      demachi: "出町桝形 & 鸭川",
      fujinomori: "藤森 & 兔山高校",
      station: "JR 京都站",
    },
    kyotoRoutesActive: "✓ 巡礼动线",
    kyotoRoutesInactive: "显示动线",
    kyotoZoomGroupAria: "地图缩放控制",
    kyotoZoomInAria: "放大京都地图",
    kyotoZoomOutAria: "缩小京都地图",
    kyotoRegionAria: "玉子市场主题京都圣地巡礼矢量地图",
    kyotoFallbackAria: "京都圣地巡礼手绘示意地图",
    kyotoPinAria: (name, count) => `${name}（${count} 条命中事件）`,

    inspectorAria: "当前选中地标与剧照事件列表",
    inspectorReopenSub: (count) => `${count} 幕相关剧情 · 点击展开 ▲`,
    inspectorCloseBtn: "收起 ×",
    inspectorCloseAria: "收起地标详情面板",
    inspectorStillAlt: (name) => `${name} 动画剧照`,
    inspectorOwnersAria: "关联人物快筛",
    inspectorOwnerTitle: (name) => `只看「${name}」相关剧情`,
    inspectorJumpArcade: (name) => `🍡 切入商店街详图（${name}）`,
    inspectorJumpKyoto: (name) => `🗺️ 京都实景定位（${name}）`,
    googleMapsBtn: "Google 地图",
    inspectorEventsTitle: (count) => `此处剧情剧照（${count}）`,
    inspectorClickHint: "点击查看详情",
    inspectorDemachizaNote:
      "「出町座」是十周年纪念特别重映的举办影院，走出影厅便是「出町桝形商店街」拱廊。",
    inspectorEmpty: "当前筛选条件下，该地点暂无命中剧情。",
    inspectorResetBtn: "重置筛选查看全部",

    filterTitle: "剧情筛选与关键词检索",
    filterSub: (m, t) => `当前命中 ${m} / ${t} 幕动画剧情 · 地图实时同步高亮`,
    filterResetAll: "重置全部",
    filterViewMap: (m) => `查看地图 (${m}) ✓`,
    filterSearchAria: "搜索事件标题、名台词、店铺或人物",
    filterSearchPlaceholder: "搜名台词、纸杯电话、鸭川、恋之歌、店铺名...",
    filterTabAria: "筛选分类视图",
    filterTabAll: "全部选项",
    filterTabEpisodes: "🎬 集数与剧场版",
    filterTabCharacters: (n) => `🐰 人物头像 (${n})`,
    filterEpSectionAria: "按作品与集数筛选",
    filterEpHeading: "作品范围与集数剧照选择（支持多选）",
    filterClearEps: (n) => `清除已选集数 (${n})`,
    filterCharSectionAria: "按人物头像筛选",
    filterCharHeading: "按登场人物筛选（真实角色肖像 · 可多选）",
    filterMatchAria: "多角色匹配逻辑",
    filterMatchOr: "任一登场 (OR)",
    filterMatchAnd: "同时同场 (AND)",
    circleLabels: {
      kitashirakawa: "「たまや」北白川家",
      school: "兔山高校同级生",
      ooji: "「RICE CAKE Oh!ZEE」大路家",
      southern: "南国皇室来客",
      arcade: "兔山商店街街坊店主",
    },

    dirTitle: (n) => `剧照事件手账（共 ${n} 幕）`,
    dirSub: "按时间线或圣地片区浏览动画剧照，点击「在地图定位」可直接飞往对应坐标。",
    dirGroupEpisode: "按集数时间序",
    dirGroupArea: "按圣地片区",
    dirCloseAria: "关闭事件手账",
    dirEmptyText: "没有找到符合当前筛选条件的剧情事件。试试放宽角色或清空关键词吧！",
    dirShowAllBtn: (t) => `显示全部 ${t} 幕事件`,
    dirStagePrefix: "舞台：",
    dirLocateBtn: "📍 在地图定位",
    dirDetailBtn: "剧照与台词",
    areaGroupLabels: {
      arcade: "兔山商店街内部",
      demachi: "出町桝形与出町双叶片区",
      kamogawa: "鸭川三角洲与下鸭神社片区",
      fujinomori: "京阪藤森与兔山高校片区",
      central: "JR 京都站与市中心片区",
    },

    modalCloseAria: "关闭剧情详情弹卡",
    modalStillAlt: (t) => `${t} 动画剧照`,
    modalWorkLabel: "所属作品 / 集数",
    modalOnlyThisEp: "只看本话",
    modalStageLabel: "发生舞台与圣地",
    modalArcadePrefix: "商店街：",
    modalKyotoPrefix: "京都：",
    modalStaffLabel: "核心主创",
    modalStaffFormat: (s) =>
      `脚本：${s.script} ／ 分镜：${s.storyboard} ／ 演出：${s.director} ／ 作画监督：${s.animationDirector}`,
    modalCharsLabel: "登场人物（点击快筛）",
    modalStaffNotePrefix: "手账批注：",
    modalPilgrimageTipPrefix: "圣地巡礼小贴士：",
    modalLocateArcade: "🍡 在商店街定位",
    modalLocateKyoto: "🗺️ 在京都地图定位",

    archiveTitle: "全话制作档案与京都圣地巡礼指南",
    archiveTabEpisodes: "📺 全 14 篇剧集档案表",
    archiveTabPilgrimage: "⛩️ 圣地巡礼礼仪 & 资料致谢",
    archiveCloseAria: "关闭档案弹窗",
    archiveOnlyThisEp: "在地图只看本话",
    archiveOfficialLink: "官网介绍",
    pilgrimageEtiquette:
      "街坊礼仪提示：出町桝形商店街是京都居民日常采买生活的拱廊街区，藤森站旁的京都圣母学院也是现役学校设施。实地圣地巡礼时，请勿踏入校园内部或堵塞店铺门口通道，拍摄时注意礼让并避免拍到路人与学生，一起温柔守护这份日常もち！",
    pilgrimageRoute1Title: "出町桝形 & 鸭川线",
    pilgrimageRoute1Body:
      "京阪「出町柳站」出站步行 2 分钟即达河合桥、鸭川三角洲跳石与出町桥，过桥便是名代豆饼老铺「出町双叶」与「出町桝形商店街」。",
    pilgrimageRoute2Title: "藤森通学水岸线",
    pilgrimageRoute2Body:
      "由出町柳站乘京阪本线准急/普通约 20 分钟至「藤森站」，东口出站即是琵琶湖疏水沿岸、キトロ桥与师团桥通学步道。",
    pilgrimageRoute3Title: "JR 京都站追车线",
    pilgrimageRoute3Body:
      "剧场版终幕舞台位于 JR 京都站中央口、南北自由通路与东海道新干线站台（入站台参观需购入场券，请勿妨碍旅客乘降）。",
    pilgrimageLinksTitle: "官方与资料链接",
    pilgrimageLinkTvMap: "TV 官网兔山商店街地图",
    pilgrimageLinkMovie: "剧场版《玉子爱情故事》官网",
    pilgrimageLinkMasugata: "出町桝形商店街圣地专页",
    pilgrimageCreditsPrefix:
      "本站为爱好者制作的非官方交互式剧情与巡礼地图，动画剧照、人物立绘与设定版权归 ",
    pilgrimageCreditsCopyright: "©京都アニメーション／うさぎ山商店街",
    pilgrimageCreditsSuffix:
      " 所有；京都主题矢量地图基于 MapLibre GL、OpenFreeMap 与 OpenStreetMap 数据定制绘制，托管于 Cloudflare Workers。",
  },

  en: {
    docTitle: "Usagiyama & Kyoto Story Map · Tamako Market / Tamako Love Story",
    brandTitle: "Tamako Story Map",
    brandSub: "Tamako Market · Love Story",
    viewSwitchAria: "Switch primary map view",
    viewArcade: "🍡 Usagiyama Arcade",
    viewKyoto: "🗺️ Kyoto Pilgrimage",
    navAria: "Map tools navigation",
    navEpisodes: "Episodes",
    navCharacters: "Characters",
    navSearch: "🔍 Search",
    navDirectory: "📖 Story Log",
    navArchive: "🗂️ Archive & Guide",
    mobileFilterBtn: "Filter",
    mobileMenuOpenAria: "Open navigation menu",
    mobileMenuCloseAria: "Close navigation menu",
    mobileDialogAria: "Mobile navigation menu",
    mobileEpisodes: "🎬 Filter by Episode / Movie",
    mobileCharacters: (n) => `🐰 Filter by Character (${n})`,
    mobileSearch: "🔍 Search Quotes / Spots / Scenes",
    mobileDirectory: (n) => `📖 Open Story Still Log (${n})`,
    mobileArchive: "🗂️ Episode Staff & Pilgrimage Guide",
    langSwitchAria: "Switch language",

    defaultHint:
      "Welcome to Usagiyama Arcade! Click any gold-framed photo stamp on the map, or filter by episode and character portraits above, mochi!",
    hintBrand:
      "Welcome to Usagiyama Shopping Arcade! Click any photo pin on the map to explore scenes, mochi.",
    hintSwitchArcade:
      "Switch to the illustrated Usagiyama Arcade map to explore all 13 shops and the 2nd-floor cup phone!",
    hintSwitchKyoto:
      "Switch to the custom Washi Kyoto map for Demachi Masugata, Kamogawa Delta, Fujinomori & Kyoto Station!",
    hintOpenEpisodes:
      "Filter scenes across TV Episodes 1–12, Tamako Love Story, or the Dera-chan short!",
    hintOpenCharacters:
      "Filter scenes using real portraits of the Kitashirakawa family, classmates, Ooji family & shopkeepers!",
    hintOpenSearch:
      "Search quotes, string phone, Kamogawa, Koi no Uta, or any shop name!",
    hintOpenDirectory:
      "Open the illustrated Story Log drawer to browse anime stills by episode or district.",
    hintOpenArchive:
      "View full staff credits for all 14 works and Kyoto pilgrimage etiquette tips.",
    hintSelectLoc: (name, count, sub) =>
      `Selected "${name}" (${count} matching scene${count === 1 ? "" : "s"}) — ${sub}, mochi!`,
    hintHoverArcadeLoc: (name, sub, count) =>
      `${name} (${sub}) · ${count} matching scene${count === 1 ? "" : "s"}`,
    hintHoverKyotoLoc: (name, ref, count) =>
      `${name} (${ref}) · ${count} matching scene${count === 1 ? "" : "s"}`,
    hintLocateEvent: (title, badge) => `Located "${title}" (${badge}), mochi!`,
    hintTourStep: (idx, total, title) =>
      `Story Tour (${idx}/${total}): ${title}!`,
    hintWorkChanged: (label) => `Switched filter scope to "${label}", mochi!`,
    hintEpisodeToggled: (shortLabel, title) =>
      `Toggled episode filter: ${shortLabel} "${title}".`,
    hintSingleEpisode: (shortLabel, title) =>
      `Focused on all scenes from ${shortLabel} "${title}"!`,
    hintSingleCharacter: (name) =>
      `Filtered all scenes featuring ${name}, mochi!`,

    deraDockAria: "Dera guide and story tour controls",
    deraGuideTitle: "Dera Mochimazzi's Guide",
    collapseBtn: "Hide",
    deraToggleCollapseAria: "Collapse Dera speech bubble",
    deraToggleExpandAria: "Expand Dera speech bubble",
    prevScene: "← Prev",
    nextScene: "Next →",
    prevSceneAria: "Previous scene",
    nextSceneAria: "Next scene",
    tourLabel: "🎬 Tour",

    activeFiltersAria: "Active filters",
    removeWorkAria: "Remove work filter",
    removeItemAria: (label) => `Remove ${label}`,
    clearSearchAria: "Clear search query",
    clearAllFilters: "Reset all",
    crossMapToKyoto: (n) => `${n} matching scene${n === 1 ? "" : "s"} on Kyoto Map → Switch`,
    crossMapToArcade: (n) => `${n} matching scene${n === 1 ? "" : "s"} in Arcade → Switch`,
    mapLoadingKyoto: "Unfolding the custom Washi Kyoto Pilgrimage Map, mochi…",
    mainMapAria: "Interactive story map stage",

    workLabels: {
      all: "All Works",
      tv: "TV Series (EP 1–12)",
      movie: "Tamako Love Story (Movie)",
      short: "Dera-chan Short",
    },
    workShortLabels: {
      tv: "TV EP 1–12",
      movie: "Movie",
      short: "Short",
    },

    arcadeToolbarAria: "Arcade map toolbar",
    arcadeGuideTag: "🍡 Illustrated Usagiyama Arcade · Scroll/Pinch to Zoom · Click Photo Pins",
    arcadeFitBtn: "Fit Map",
    arcadeZoomGroupAria: "Arcade zoom controls",
    arcadeZoomInAria: "Zoom in arcade map",
    arcadeZoomOutAria: "Zoom out arcade map",
    arcadeRegionAria: "Interactive illustrated map of Usagiyama Shopping Arcade",
    arcadePinAria: (name, count) => `${name} (${count} matching scenes)`,
    arcadeBoardSub: "Modeled on Demachi Masugata · Shopkeepers & Stills",
    arcadeLegendTitle: "✦ Arcade Map Legend",
    arcadeLegendLine1: "· Round Portraits: Shopkeepers",
    arcadeLegendLine2: "· Gold Photo Pins: Click for Scenes",
    arcadeLegendLine3: "· East Lane 2F: String Phone",
    arcadeCompassNorth: "N (Demachi)",

    kyotoToolbarAria: "Kyoto pilgrimage area shortcuts",
    kyotoPresets: {
      all: "All Kyoto",
      demachi: "Demachi & Kamogawa",
      fujinomori: "Fujinomori & School",
      station: "JR Kyoto Sta.",
    },
    kyotoRoutesActive: "✓ Routes",
    kyotoRoutesInactive: "Show Routes",
    kyotoZoomGroupAria: "Kyoto map zoom controls",
    kyotoZoomInAria: "Zoom in Kyoto map",
    kyotoZoomOutAria: "Zoom out Kyoto map",
    kyotoRegionAria: "Custom Tamako Washi vector map of Kyoto pilgrimage spots",
    kyotoFallbackAria: "Illustrated Kyoto pilgrimage schematic map",
    kyotoPinAria: (name, count) => `${name} (${count} matching scenes)`,

    inspectorAria: "Selected location details and scenes",
    inspectorReopenSub: (count) => `${count} scene${count === 1 ? "" : "s"} · Tap to expand ▲`,
    inspectorCloseBtn: "Hide ×",
    inspectorCloseAria: "Collapse location panel",
    inspectorStillAlt: (name) => `${name} anime still`,
    inspectorOwnersAria: "Filter by associated characters",
    inspectorOwnerTitle: (name) => `Show scenes with ${name}`,
    inspectorJumpArcade: (name) => `🍡 Enter Arcade Map (${name})`,
    inspectorJumpKyoto: (name) => `🗺️ View on Kyoto Map (${name})`,
    googleMapsBtn: "Google Maps",
    inspectorEventsTitle: (count) => `Scenes Here (${count})`,
    inspectorClickHint: "Click for details",
    inspectorDemachizaNote:
      "Demachiza hosted the 10th-anniversary special screenings — step outside and you're right inside Demachi Masugata Arcade!",
    inspectorEmpty: "No scenes match the current filter at this spot.",
    inspectorResetBtn: "Reset filters to view all",

    filterTitle: "Filter Scenes & Search",
    filterSub: (m, t) => `Showing ${m} of ${t} curated scenes · Map updates live`,
    filterResetAll: "Reset All",
    filterViewMap: (m) => `View Map (${m}) ✓`,
    filterSearchAria: "Search scene titles, quotes, shops, or characters",
    filterSearchPlaceholder: "Search quotes, cup phone, Kamogawa, Koi no Uta, shops...",
    filterTabAria: "Filter category tabs",
    filterTabAll: "All Filters",
    filterTabEpisodes: "🎬 Episodes & Movie",
    filterTabCharacters: (n) => `🐰 Characters (${n})`,
    filterEpSectionAria: "Filter by work and episodes",
    filterEpHeading: "Work Scope & Episode Stills (Multi-select)",
    filterClearEps: (n) => `Clear selected (${n})`,
    filterCharSectionAria: "Filter by character portraits",
    filterCharHeading: "Filter by Characters (Official Portraits · Multi-select)",
    filterMatchAria: "Multi-character match logic",
    filterMatchOr: "Any Selected (OR)",
    filterMatchAnd: "Co-appearing (AND)",
    circleLabels: {
      kitashirakawa: "Tamaya · Kitashirakawa Family",
      school: "Usagiyama High Classmates",
      ooji: "RICE CAKE Oh!ZEE · Ooji Family",
      southern: "Southern Royal Visitors",
      arcade: "Usagiyama Arcade Shopkeepers",
    },

    dirTitle: (n) => `Story Scene Log (${n} Scenes)`,
    dirSub: "Browse anime stills chronologically or by district, and jump straight to any spot on the map.",
    dirGroupEpisode: "By Episode Order",
    dirGroupArea: "By District",
    dirCloseAria: "Close story log drawer",
    dirEmptyText: "No scenes match your current filters. Try relaxing character filters or clearing the search box!",
    dirShowAllBtn: (t) => `Show All ${t} Scenes`,
    dirStagePrefix: "Spot: ",
    dirLocateBtn: "📍 Locate on Map",
    dirDetailBtn: "Still & Quote",
    areaGroupLabels: {
      arcade: "Inside Usagiyama Shopping Arcade",
      demachi: "Demachi Masugata & Demachi Futaba",
      kamogawa: "Kamogawa Delta & Shimogamo Shrine",
      fujinomori: "Keihan Fujinomori & Usagiyama High",
      central: "JR Kyoto Station & Downtown Kyoto",
    },

    modalCloseAria: "Close scene modal",
    modalStillAlt: (t) => `${t} anime still`,
    modalWorkLabel: "Work / Episode",
    modalOnlyThisEp: "Only This Episode",
    modalStageLabel: "Stage & Real Spot",
    modalArcadePrefix: "Arcade: ",
    modalKyotoPrefix: "Kyoto: ",
    modalStaffLabel: "Key Staff",
    modalStaffFormat: (s) =>
      `Script: ${s.script} / Storyboard: ${s.storyboard} / Director: ${s.director} / Anim. Dir.: ${s.animationDirector}`,
    modalCharsLabel: "Characters (Click to Filter)",
    modalStaffNotePrefix: "Production Note: ",
    modalPilgrimageTipPrefix: "Pilgrimage Tip: ",
    modalLocateArcade: "🍡 Locate in Arcade",
    modalLocateKyoto: "🗺️ Locate in Kyoto",

    archiveTitle: "Episode Staff Archive & Kyoto Pilgrimage Guide",
    archiveTabEpisodes: "📺 All 14 Works & Staff",
    archiveTabPilgrimage: "⛩️ Pilgrimage Etiquette & Credits",
    archiveCloseAria: "Close archive modal",
    archiveOnlyThisEp: "Filter This Episode",
    archiveOfficialLink: "Official Page",
    pilgrimageEtiquette:
      "Pilgrimage Etiquette: Demachi Masugata is an active neighborhood shopping arcade, and Kyoto Seibo near Fujinomori Station is an active girls' high school. Please never enter school grounds, avoid blocking shopfronts, and respect residents' and students' privacy when taking photos!",
    pilgrimageRoute1Title: "Demachi & Kamogawa Walk",
    pilgrimageRoute1Body:
      "Exit Keihan Demachiyanagi Station and walk 2 minutes across Kawai Bridge, the Kamogawa Delta stepping stones, and Demachi Bridge right to Demachi Futaba and Demachi Masugata Arcade.",
    pilgrimageRoute2Title: "Fujinomori Canal Walk",
    pilgrimageRoute2Body:
      "Take the Keihan Main Line (~20 min from Demachiyanagi) to Fujinomori Station; exit East to walk along the Biwako Canal, Kitoro Bridge, and Shidan Bridge commute path.",
    pilgrimageRoute3Title: "JR Kyoto Station Climax",
    pilgrimageRoute3Body:
      "The movie climax unfolds across JR Kyoto Station's Central Gate, North-South Walkway, and Tokaido Shinkansen platforms (a platform ticket is required to enter).",
    pilgrimageLinksTitle: "Official & Reference Links",
    pilgrimageLinkTvMap: "Official TV Arcade Map",
    pilgrimageLinkMovie: "Tamako Love Story Official Site",
    pilgrimageLinkMasugata: "Demachi Masugata Tamako Page",
    pilgrimageCreditsPrefix:
      "An unofficial fan-made interactive story & pilgrimage map. All anime stills, characters, and settings belong to ",
    pilgrimageCreditsCopyright: "© Kyoto Animation / Usagiyama Shopping District",
    pilgrimageCreditsSuffix:
      ". Custom Kyoto Washi vector map built with MapLibre GL, © OpenFreeMap & © OpenStreetMap contributors, hosted on Cloudflare Workers.",
  },

  ja: {
    docTitle: "うさぎ山商店街＆京都聖地まっぷ · たまこまーけっと／たまこラブストーリー",
    brandTitle: "うさぎ山ストーリーまっぷ",
    brandSub: "たまこまーけっと・ラブストーリー",
    viewSwitchAria: "メインマップ切り替え",
    viewArcade: "🍡 うさぎ山商店街",
    viewKyoto: "🗺️ 京都聖地まっぷ",
    navAria: "マップ機能ナビゲーション",
    navEpisodes: "話数で絞る",
    navCharacters: "キャラで絞る",
    navSearch: "🔍 検索",
    navDirectory: "📖 場面手帖",
    navArchive: "🗂️ 全話・巡礼案内",
    mobileFilterBtn: "絞込",
    mobileMenuOpenAria: "メニューを開く",
    mobileMenuCloseAria: "メニューを閉じる",
    mobileDialogAria: "モバイル機能メニュー",
    mobileEpisodes: "🎬 話数・劇場版で絞り込む",
    mobileCharacters: (n) => `🐰 キャラクターアイコンで絞る（${n}名）`,
    mobileSearch: "🔍 セリフ・お店・スポット検索",
    mobileDirectory: (n) => `📖 場面スチール手帖を開く（${n}件）`,
    mobileArchive: "🗂️ 全話スタッフ＆聖地巡礼マナー",
    langSwitchAria: "表示言語を切り替え",

    defaultHint:
      "うさぎ山商店街へようこそ！地図の金枠スチールスタンプを押すか、上のメニューから話数・キャラクターで場面を探してみるもち！",
    hintBrand:
      "うさぎ山商店街へようこそ！気になるお店のスタンプをクリックして名場面を見るもち。",
    hintSwitchArcade:
      "手描き風の「うさぎ山商店街まっぷ」に切り替えて、13箇所のお店や二階の糸電話を巡るもち！",
    hintSwitchKyoto:
      "和紙風カスタム「京都聖地まっぷ」で出町桝形、鴨川デルタ、藤森、JR京都駅を巡るもち！",
    hintOpenEpisodes:
      "TV全12話・劇場版『たまこラブストーリー』・『南の島のデラちゃん』で絞り込むもち！",
    hintOpenCharacters:
      "北白川家・高校の同級生・大路家・商店街の店主たちを顔アイコンで選ぶもち！",
    hintOpenSearch:
      "名ゼリフや糸電話、鴨川、恋の歌、お店の名前で検索できるもち！",
    hintOpenDirectory:
      "場面スチール手帖を開いて、話数順・エリア別に名シーンを一覧するもち。",
    hintOpenArchive:
      "全14作品のスタッフ一覧と、京都聖地巡礼のマナー案内を確認するもち。",
    hintSelectLoc: (name, count, sub) =>
      `「${name}」を選択中（該当 ${count} シーン）— ${sub}もち！`,
    hintHoverArcadeLoc: (name, sub, count) =>
      `${name}（${sub}）・該当 ${count} シーンもち`,
    hintHoverKyotoLoc: (name, ref, count) =>
      `${name}（${ref}）・該当 ${count} シーンもち`,
    hintLocateEvent: (title, badge) => `「${title}」（${badge}）へ移動したもち！`,
    hintTourStep: (idx, total, title) =>
      `ストーリー巡り（${idx}/${total}）：${title}もち！`,
    hintWorkChanged: (label) => `「${label}」で絞り込んだもち！`,
    hintEpisodeToggled: (shortLabel, title) =>
      `話数フィルター切替：${shortLabel}『${title}』もち。`,
    hintSingleEpisode: (shortLabel, title) =>
      `${shortLabel}『${title}』の場面だけにフォーカスしたもち！`,
    hintSingleCharacter: (name) =>
      `「${name}」が登場する名場面を絞り込んだもち！`,

    deraDockAria: "デラちゃん案内とストーリー巡り",
    deraGuideTitle: "デラ・モチマッヅィの案内",
    collapseBtn: "閉じる",
    deraToggleCollapseAria: "デラの吹き出しを閉じる",
    deraToggleExpandAria: "デラの吹き出しを開く",
    prevScene: "← 前へ",
    nextScene: "次へ →",
    prevSceneAria: "前のシーンへ",
    nextSceneAria: "次のシーンへ",
    tourLabel: "🎬 巡る",

    activeFiltersAria: "適用中の絞り込み条件",
    removeWorkAria: "作品フィルターを解除",
    removeItemAria: (label) => `${label} を解除`,
    clearSearchAria: "検索キーワードを消去",
    clearAllFilters: "すべて解除",
    crossMapToKyoto: (n) => `京都マップ側に ${n} シーン該当 → 切り替える`,
    crossMapToArcade: (n) => `商店街マップ側に ${n} シーン該当 → 切り替える`,
    mapLoadingKyoto: "和紙風の京都聖地まっぷを広げているもち…",
    mainMapAria: "インタラクティブ聖地・ストーリーマップ",

    workLabels: {
      all: "全作品",
      tv: "TVアニメ（全12話）",
      movie: "劇場版『たまこラブストーリー』",
      short: "短編『南の島のデラちゃん』",
    },
    workShortLabels: {
      tv: "TV全12話",
      movie: "劇場版",
      short: "南国短編",
    },

    arcadeToolbarAria: "商店街まっぷガイド",
    arcadeGuideTag: "🍡 手描き風うさぎ山商店街・ホイール/ピンチ拡大・スタンプを押して場面表示",
    arcadeFitBtn: "全体表示",
    arcadeZoomGroupAria: "商店街ズーム操作",
    arcadeZoomInAria: "商店街マップを拡大",
    arcadeZoomOutAria: "商店街マップを縮小",
    arcadeRegionAria: "うさぎ山商店街インタラクティブ平面マップ",
    arcadePinAria: (name, count) => `${name}（該当 ${count} シーン）`,
    arcadeBoardSub: "出町桝形モデル・店主アイコン＆場面スチール収録",
    arcadeLegendTitle: "✦ 商店街まっぷ案内",
    arcadeLegendLine1: "・丸枠アイコン：各お店の店主たち",
    arcadeLegendLine2: "・金枠スタンプ：押して名場面を表示",
    arcadeLegendLine3: "・東路地二階：たまこ↔もち蔵の糸電話",
    arcadeCompassNorth: "北（出町口）",

    kyotoToolbarAria: "京都聖地エリアジャンプ",
    kyotoPresets: {
      all: "京都全域",
      demachi: "出町桝形・鴨川",
      fujinomori: "藤森・高校周辺",
      station: "JR京都駅",
    },
    kyotoRoutesActive: "✓ 巡礼ルート",
    kyotoRoutesInactive: "ルート表示",
    kyotoZoomGroupAria: "京都マップズーム操作",
    kyotoZoomInAria: "京都マップを拡大",
    kyotoZoomOutAria: "京都マップを縮小",
    kyotoRegionAria: "たまこ和紙風カスタム京都聖地ベクターマップ",
    kyotoFallbackAria: "京都聖地イラストマップ",
    kyotoPinAria: (name, count) => `${name}（該当 ${count} シーン）`,

    inspectorAria: "選択スポット詳細と場面リスト",
    inspectorReopenSub: (count) => `関連 ${count} シーン・タップして開く ▲`,
    inspectorCloseBtn: "閉じる ×",
    inspectorCloseAria: "スポット詳細パネルを閉じる",
    inspectorStillAlt: (name) => `${name} 場面スチール`,
    inspectorOwnersAria: "関連キャラクターで絞り込む",
    inspectorOwnerTitle: (name) => `「${name}」の登場シーンを見る`,
    inspectorJumpArcade: (name) => `🍡 商店街まっぷへ（${name}）`,
    inspectorJumpKyoto: (name) => `🗺️ 京都聖地まっぷへ（${name}）`,
    googleMapsBtn: "Google マップ",
    inspectorEventsTitle: (count) => `この場所の場面スチール（${count}）`,
    inspectorClickHint: "クリックで詳細",
    inspectorDemachizaNote:
      "「出町座」は10周年特別上映も行われた映画館。一歩外に出ればすぐ「出町桝形商店街」のアーケードです。",
    inspectorEmpty: "現在の絞り込み条件では、この場所の該当シーンはありません。",
    inspectorResetBtn: "絞り込みをリセット",

    filterTitle: "場面の絞り込み・キーワード検索",
    filterSub: (m, t) => `全 ${t} シーン中 ${m} シーン該当・地図とリアルタイム連動`,
    filterResetAll: "すべて解除",
    filterViewMap: (m) => `地図を見る (${m}) ✓`,
    filterSearchAria: "タイトル・名ゼリフ・お店・キャラクターを検索",
    filterSearchPlaceholder: "セリフ、糸電話、鴨川、恋の歌、店名で検索...",
    filterTabAria: "絞り込みカテゴリ切替",
    filterTabAll: "すべて表示",
    filterTabEpisodes: "🎬 話数・劇場版",
    filterTabCharacters: (n) => `🐰 キャラクター (${n})`,
    filterEpSectionAria: "作品・話数で絞り込む",
    filterEpHeading: "作品・各話スチール選択（複数選択可）",
    filterClearEps: (n) => `話数選択をクリア (${n})`,
    filterCharSectionAria: "キャラクターで絞り込む",
    filterCharHeading: "登場キャラクター選択（顔アイコン・複数選択可）",
    filterMatchAria: "複数キャラ一致モード",
    filterMatchOr: "いずれか登場 (OR)",
    filterMatchAnd: "同時登場 (AND)",
    circleLabels: {
      kitashirakawa: "「たまや」北白川家",
      school: "うさぎ山高校の同級生",
      ooji: "「RICE CAKE Oh!ZEE」大路家",
      southern: "南の島からの客人",
      arcade: "うさぎ山商店街の店主たち",
    },

    dirTitle: (n) => `場面スチール手帖（全 ${n} シーン）`,
    dirSub: "時系列または聖地エリア別にスチールを眺め、「地図で表示」からその場所へジャンプできます。",
    dirGroupEpisode: "話数・時系列順",
    dirGroupArea: "聖地エリア別",
    dirCloseAria: "場面手帖を閉じる",
    dirEmptyText: "条件に一致する場面が見つかりませんでした。条件を緩めるかリセットしてみてください！",
    dirShowAllBtn: (t) => `全 ${t} シーンを表示`,
    dirStagePrefix: "舞台：",
    dirLocateBtn: "📍 地図で表示",
    dirDetailBtn: "スチール詳細",
    areaGroupLabels: {
      arcade: "うさぎ山商店街アーケード内",
      demachi: "出町桝形・出町ふたば周辺",
      kamogawa: "鴨川デルタ・下鴨神社周辺",
      fujinomori: "京阪藤森駅・うさぎ山高校周辺",
      central: "JR京都駅・京都市中心部",
    },

    modalCloseAria: "詳細モーダルを閉じる",
    modalStillAlt: (t) => `${t} 場面スチール`,
    modalWorkLabel: "収録作品・話数",
    modalOnlyThisEp: "この話のみ表示",
    modalStageLabel: "作中舞台・聖地",
    modalArcadePrefix: "商店街：",
    modalKyotoPrefix: "京都：",
    modalStaffLabel: "メインスタッフ",
    modalStaffFormat: (s) =>
      `脚本：${s.script} ／ 絵コンテ：${s.storyboard} ／ 演出：${s.director} ／ 作画監督：${s.animationDirector}`,
    modalCharsLabel: "登場人物（クリックで絞込）",
    modalStaffNotePrefix: "手帖メモ：",
    modalPilgrimageTipPrefix: "聖地巡礼ヒント：",
    modalLocateArcade: "🍡 商店街まっぷで表示",
    modalLocateKyoto: "🗺️ 京都まっぷで表示",

    archiveTitle: "全話スタッフ記録＆京都聖地巡礼ガイド",
    archiveTabEpisodes: "📺 全14作品・各話スタッフ",
    archiveTabPilgrimage: "⛩️ 聖地巡礼マナー＆資料リンク",
    archiveCloseAria: "アーカイブを閉じる",
    archiveOnlyThisEp: "地図でこの話を見る",
    archiveOfficialLink: "公式ページ",
    pilgrimageEtiquette:
      "聖地巡礼マナーのお願い：出町桝形商店街は地域の皆さまが日々お買い物される生活の場であり、藤森駅近くの京都聖母学院は現役の学校施設です。敷地内への立ち入りや店舗前の通行妨害は決して行わず、写真撮影の際も周囲の方々や生徒さんが映り込まないよう温かいご配慮をお願いしますもち！",
    pilgrimageRoute1Title: "出町桝形〜鴨川デルタ散策線",
    pilgrimageRoute1Body:
      "京阪「出町柳駅」から徒歩2分で河合橋・鴨川デルタの飛び石・出町橋へ。橋を渡れば名代豆餅の「出町ふたば」と「出町桝形商店街」東口に到着します。",
    pilgrimageRoute2Title: "藤森〜琵琶湖疏水通学ルート",
    pilgrimageRoute2Body:
      "出町柳駅から京阪本線で約20分の「藤森駅」下車。東口を出るとすぐ琵琶湖疏水沿いの遊歩道、キトロ橋、師団橋の通学路が続きます。",
    pilgrimageRoute3Title: "JR京都駅クライマックス線",
    pilgrimageRoute3Body:
      "劇場版クライマックスはJR京都駅中央口・南北自由通路・東海道新幹線ホームが舞台です（ホームへの入場には入場券が必要です）。",
    pilgrimageLinksTitle: "公式サイト・参考資料",
    pilgrimageLinkTvMap: "TV公式 うさぎ山商店街まっぷ",
    pilgrimageLinkMovie: "映画『たまこラブストーリー』公式",
    pilgrimageLinkMasugata: "出町桝形商店街 たまこ特設頁",
    pilgrimageCreditsPrefix:
      "当サイトはファン制作の非公式インタラクティブ聖地・ストーリーマップです。作中スチール・キャラクター・設定の著作権はすべて ",
    pilgrimageCreditsCopyright: "©京都アニメーション／うさぎ山商店街",
    pilgrimageCreditsSuffix:
      " に帰属します。京都和紙風ベクターマップは MapLibre GL・© OpenFreeMap・© OpenStreetMap contributors をもとに制作し、Cloudflare Workers で配信しています。",
  },
};

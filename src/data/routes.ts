import type { StoryRoute } from "../types/tamako";

export const STORY_ROUTES: StoryRoute[] = [
  {
    id: "route-demachi-kamogawa",
    nameZh: "出町桝形 ↔ 鸭川告白散步线",
    nameJa: "出町桝形〜鴨川デルタ告白ルート",
    workKind: "movie",
    color: "#F66E75",
    dashArray: "7 6",
    summaryZh:
      "从「出町桝形商店街」东口走出，经过出町双叶与出町桥步入鸭川三角洲跳石，再经河合桥绕往下鸭神社或京阪出町柳站。",
    locationIds: [
      "kyoto-demachiza",
      "kyoto-masugata",
      "kyoto-futaba",
      "kyoto-demachi-bridge",
      "kyoto-delta",
      "kyoto-kawai-bridge",
      "kyoto-demachiyanagi",
      "kyoto-shimogamo",
    ],
    path: [
      [35.03034, 135.76855],
      [35.030282, 135.769155],
      [35.030107, 135.769627],
      [35.030422, 135.771109],
      [35.030123, 135.771742],
      [35.030463, 135.772291],
      [35.03067, 135.773189],
    ],
  },
  {
    id: "route-fujinomori-school",
    nameZh: "藤森站 ↔ 琵琶湖疏水通学线",
    nameJa: "藤森駅〜疎水〜うさぎ山高校ルート",
    workKind: "tv",
    color: "#31CBB7",
    dashArray: "6 5",
    summaryZh:
      "从京阪藤森站出发，沿着琵琶湖疏水走过キトロ桥与师团桥，向东望向作为兔山高校原型的红砖校舍。",
    locationIds: [
      "kyoto-fujinomori",
      "kyoto-kitoro",
      "kyoto-shidan-bridge",
      "kyoto-seibo",
    ],
    path: [
      [34.956858, 135.770124],
      [34.95787, 135.770698],
      [34.959184, 135.770533],
      [34.957684, 135.772559],
    ],
  },
  {
    id: "route-climax-chase",
    nameZh: "剧场版终幕：跨城奔赴追车线",
    nameJa: "たまこラブストーリー終幕・京都駅への道",
    workKind: "movie",
    color: "#2E62A2",
    dashArray: "10 6",
    summaryZh:
      "剧场版高潮追赶动线：玉子冲出出町桝形商店街，跑进京阪出町柳站，最终抵达 JR 京都站新干线月台传递纸杯电话。",
    locationIds: [
      "kyoto-masugata",
      "kyoto-kamo-ohashi",
      "kyoto-demachiyanagi",
      "kyoto-station",
    ],
    path: [
      [35.030282, 135.769155],
      [35.028981, 135.771442],
      [35.03067, 135.773189],
      [34.985849, 135.758767],
    ],
  },
];

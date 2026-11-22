export interface LocationLocaleEntry {
  name: string;
  subtitle: string;
  areaLabel: string;
  realWorldRef: string;
  realWorldAddress?: string;
  description: string;
  settingNote: string;
}

export const LOCATIONS_EN: Record<string, LocationLocaleEntry> = {
  "arcade-entrance": {
    name: "Usagiyama Arcade Entrance Arch",
    subtitle: "Twin-Rabbit Moon Sign · Where Stories Begin & End",
    areaLabel: "Usagiyama Main Arcade",
    realWorldRef: "Demachi Masugata Arcade East/West Archway",
    realWorldAddress: "Futagamicho / Seiryucho, Kamigyo-ku, Kyoto",
    description:
      "Crowned with a blue-and-white twin-rabbit moon sign, this archway frames Episode 1's opening bells and birthday surprise as well as Episode 12's joyful dash into the New Year.",
    settingNote:
      "Featured in official 'Scene Still 01' and modeled directly on Demachi Masugata's real entrance arch.",
  },
  usayu: {
    name: "Usayu Public Bathhouse",
    subtitle: "Choji & Sayuri Yumoto · Steamy Baths & Ghost Tales",
    areaLabel: "Usagiyama North Cross Street",
    realWorldRef: "Former Nishikiyu Bathhouse (Nakagyo-ku architectural model)",
    realWorldAddress: "535 Yaoyacho, Sakaimachi-dori, Nakagyo-ku, Kyoto",
    description:
      "The cozy community bathhouse run by council head Choji Yumoto and his daughter Sayuri. Shiori first opens up to Tamako's group in its warm bath in Episode 3, and the whole street celebrates Sayuri's wedding here in Episode 7.",
    settingNote:
      "Recorded in official 'Scene Still 05a/05b', with traditional wooden details inspired by Kyoto's historic Nishikiyu.",
  },
  sashimi: {
    name: "Sashimi Fish Shop",
    subtitle: "Takashi & Mari Uotani · Spirited Morning Fishmonger",
    areaLabel: "Usagiyama Main Arcade (West Side)",
    realWorldRef: "Fresh Fish Shop 'Sagaki' (inside Demachi Masugata)",
    description:
      "Holding the northernmost corner of the main street, Takashi and Mari greet passersby with booming cheer every morning and pitch right in whenever the neighborhood celebrates.",
    settingNote:
      "Its ice display counter and shop depth closely mirror Sagaki inside Demachi Masugata Arcade.",
  },
  shimizuya: {
    name: "Shimizuya Tofu Shop",
    subtitle: "Tomio Shimizuya · Gentle Square Tofu",
    areaLabel: "Usagiyama Main Arcade (West Side)",
    realWorldRef: "Tofu Shop 'Izumoya' (Demachi Masugata reference)",
    description:
      "An early-rising tofu shop run by kindhearted Tomio in sunglasses. In Episode 7, upon learning his long-time crush Sayuri is getting married, he smiles warmly: 'Tofu is tofu precisely because it's square.'",
    settingNote:
      "Positioned just south of Sashimi with traditional water tanks and white noren curtains.",
  },
  "florist-princess": {
    name: "Florist Princess",
    subtitle: "Kaoru Hanase · Where Tamako Met Dera",
    areaLabel: "Usagiyama Main Arcade (West Side)",
    realWorldRef: "Flower Shop 'Hana no Harukaze' (Demachi Masugata reference)",
    description:
      "A fragrant neighborhood flower shop tended by graceful owner Kaoru Hanase. In Episode 1, Dera tumbles out of a crate of southern tuberose blossoms right onto its display table and into Tamako's life.",
    settingNote:
      "Highlighted in official 'Scene Still 03a/03b' with flower stands and seasonal potted blooms.",
  },
  "star-and-clown": {
    name: "Star & Clown Record Cafe",
    subtitle: "Kunio Yaobi · Coffee Aroma & 'Koi no Uta'",
    areaLabel: "Usagiyama Main Arcade (West Side)",
    realWorldRef: "Cafe Hanami & Bar (near Demachi Masugata)",
    description:
      "Behind its deep-blue wooden door, vinyl records spin over milky coffee. Here Tamako finally uncovers the story behind the gentle melody her mother used to hum — written by her own father Mamedai.",
    settingNote:
      "Featured in official 'Scene Still 06' and namesake of the anime's insert song album.",
  },
  "arcade-crossroads": {
    name: "Arcade Crossroads (Under Saba-san)",
    subtitle: "Giant Blue Mackerel Ornament · Heart of the Street",
    areaLabel: "Usagiyama Center",
    realWorldRef: "Demachi Masugata Central Crossing (Hanging Mackerel)",
    description:
      "The bustling central junction beneath the giant hanging blue mackerel 'Saba-san', where town meetings, Valentine campaigns, haunted house prep, and everyday chats converge.",
    settingNote:
      "Real-life Demachi Masugata also suspends a giant Wakasa-road mackerel ornament overhead!",
  },
  tokiwado: {
    name: "Tokiwado Toy Shop",
    subtitle: "Nobuhiko & Midori Tokiwa · Childhood Toys & Heartfelt Advice",
    areaLabel: "Usagiyama Main Arcade (South-West)",
    realWorldRef: "Former Ikawa Toy (Demachi Masugata reference)",
    description:
      "Midori's grandfather Nobuhiko runs this nostalgic toy shop filled with kendama and models — a warm refuge during Anko's Episode 4 gift hunt and Midori's Episode 10 festival slump.",
    settingNote:
      "Located south of the central crossroads directly opposite Just Meat.",
  },
  "miyako-udon": {
    name: "Miyako Udon",
    subtitle: "Tadanao Shiraki · Steaming Dashi & Cozy Lanterns",
    areaLabel: "Usagiyama Main Arcade (South-West)",
    realWorldRef: "Traditional noodle shop at Demachi Masugata south end",
    description:
      "Anchored at the southern end of the street, quiet craftsman Tadanao simmers rich golden udon broth that warms neighbors after late summer events and winter rehearsals.",
    settingNote:
      "Forms the cozy southern arcade cluster together with Tokiwado and Just Meat.",
  },
  "just-meat": {
    name: "Just Meat Butcher Shop",
    subtitle: "Fumiko Mitsumura · Piping-Hot Beef Croquettes",
    areaLabel: "Usagiyama Main Arcade (South-East)",
    realWorldRef: "Former Noguchiya Butcher (Demachi Masugata reference)",
    description:
      "Famous for freshly fried croquettes under its green-and-white awning, lively owner Fumiko powers Episode 2's heart-croquette Valentine special and tempts dieting Dera in Episode 8.",
    settingNote:
      "Captured in official 'Scene Still 02' with its orange sign and bench out front.",
  },
  "tamaya-shop": {
    name: "Tamaya Mochi Shop (Kitashirakawa Home)",
    subtitle: "Mame-Daifuku, Indigo Noren & Tatami Living Room",
    areaLabel: "Usagiyama East Lane",
    realWorldRef: "Demachi Futaba (Mame-daifuku culinary inspiration)",
    description:
      "Behind three indigo noren panels, steam rises daily as Mamedai pounds pillowy mame-daifuku and Tamako dreams up new mochi creations. Its back tatami room hosts the heart of family life.",
    settingNote:
      "Detailed in official settings 03 (living room), 06 (kitchen), and 15 (guest room).",
  },
  "tamaya-window": {
    name: "2nd-Floor Windows & Paper-Cup Phone",
    subtitle: "Childhood Red String Across the Lane",
    areaLabel: "Above Tamaya ↔ Oojiya Lane",
    realWorldRef: "Facing 2nd-floor bedroom windows of Tamaya & Oojiya",
    description:
      "Though their fathers bicker downstairs, Tamako and Mochizou's upstairs windows face directly across the narrow lane — linked since childhood by the paper-cup string phone that carries Episode 11's midnight talk and the movie's final answer.",
    settingNote:
      "Marked 'Rival Mochi Shops' on the official map, yet quietly bridged upstairs by a red string.",
  },
  oojiya: {
    name: "Oojiya / RICE CAKE Oh!ZEE",
    subtitle: "Gohei & Michiko Ooji · Stylishly Rebranded Rival Shop",
    areaLabel: "Usagiyama East Lane",
    realWorldRef: "Shopfront facing Tamaya across the east lane",
    description:
      "Tamaya's longtime rival directly across the lane. Trend-loving Gohei remodels its facade into sleek 'RICE CAKE Oh!ZEE' at year's end while Michiko and Mochizou keep neighborhood ties warm.",
    settingNote:
      "Shown in official 'Scene Still 04' after its modern silver-and-glass New Year makeover.",
  },
  "kyoto-masugata": {
    name: "Demachi Masugata Shopping Arcade",
    subtitle: "Real-Life Model of Usagiyama Arcade · Core Stage",
    areaLabel: "Demachiyanagi & Masugata",
    realWorldRef: "Demachi Masugata Shotengai (Kamigyo-ku, Kyoto)",
    realWorldAddress: "Masugata-dori Demachi Nishiiru, Kamigyo-ku, Kyoto",
    description:
      "Located just northeast of Kyoto Imperial Park, this covered retro shopping street is the real-life Usagiyama Arcade! Visitors can spot the real hanging mackerel ornament, Tamako & Choi wooden signs, and fan pilgrimage notebooks.",
    settingNote:
      "Click 'Enter Arcade Map' below to explore all 13 interior shops and home scenes.",
  },
  "kyoto-futaba": {
    name: "Demachi Futaba",
    subtitle: "Legendary Mame-Mochi Shop · Culinary Inspiration",
    areaLabel: "Demachiyanagi & Masugata",
    realWorldRef: "Meiji-era Kyoto wagashi shop famous for Mame-mochi",
    realWorldAddress: "236 Seiryucho, Demachi-dori Imadegawa-agaru, Kamigyo-ku, Kyoto",
    description:
      "Steps outside the east arch of Demachi Masugata, this century-old wagashi landmark draws daily lines for its freshly pounded red-bean mame-daifuku — inspiring Tamaya's devotion to mochi.",
    settingNote:
      "Visit in the morning to grab mame-daifuku and enjoy it two minutes away by the Kamo River!",
  },
  "kyoto-demachiza": {
    name: "Demachiza (Cinema, Books & Cafe)",
    subtitle: "10th-Anniversary Special Screening Venue",
    areaLabel: "Demachiyanagi & Masugata",
    realWorldRef: "Independent arthouse cinema inside Demachi Masugata",
    realWorldAddress: "133 Miyoshicho, Kamigyo-ku, Kyoto",
    description:
      "Nestled right inside Demachi Masugata Arcade, this beloved community cinema hosted official 10th-anniversary revival screenings of Tamako Market and Tamako Love Story.",
    settingNote:
      "Walking out of the theater places you immediately beneath the anime's arcade roof.",
  },
  "kyoto-delta": {
    name: "Kamogawa Delta & Turtle Stepping Stones",
    subtitle: "Tamako Love Story's Iconic Confession Spot",
    areaLabel: "Kamogawa Delta Area",
    realWorldRef: "Confluence of Kamo & Takano Rivers (North of Kamo Bridge)",
    realWorldAddress: "Tanaka Shimoyanagicho, Sakyo-ku, Kyoto",
    description:
      "Where the Takano and Kamo Rivers meet across turtle- and plover-shaped stepping stones. Bathed in golden sunset in Tamako Love Story, Mochizou stops mid-river to tell Tamako: 'I love you, Tamako!'",
    settingNote:
      "Hop across the stones to see the exact round boulder Tamako compares to mame-daifuku.",
  },
  "kyoto-demachi-bridge": {
    name: "Demachi Bridge",
    subtitle: "Sunset Goodbyes & Everyday Crossings",
    areaLabel: "Kamogawa Delta Area",
    realWorldRef: "Bridge spanning the Kamo River between Masugata & the Delta",
    realWorldAddress: "Seiryucho, Kamigyo-ku / Sakyo-ku, Kyoto",
    description:
      "Linking the shopping arcade directly to Kamogawa Delta, Demachi Bridge frames Anko's breathless Episode 9 farewell to Yuzuki as well as countless twilight walks home.",
    settingNote:
      "Demachi Futaba and the east arcade entrance sit right at its western foot.",
  },
  "kyoto-kawai-bridge": {
    name: "Kawai Bridge & Takano Riverbank",
    subtitle: "Midori's Gentle Push Along the River",
    areaLabel: "Kamogawa Delta Area",
    realWorldRef: "Bridge over the eastern Takano River toward Demachiyanagi Sta.",
    realWorldAddress: "Tanaka Kamiyanagicho, Sakyo-ku, Kyoto",
    description:
      "Spanning the shimmering Takano River on the east side of the delta. When Tamako is flustered after Mochizou's confession, Midori walks beside her here and gently urges her to follow her heart.",
    settingNote:
      "Lined with cherry blossoms in spring and views toward Mount Hiei.",
  },
  "kyoto-kamo-ohashi": {
    name: "Kamo Ohashi Bridge",
    subtitle: "Imadegawa Ave. Stone Bridge · Festival Nights & Panoramas",
    areaLabel: "Kamogawa Delta Area",
    realWorldRef: "Imadegawa-dori main bridge just south of Kamogawa Delta",
    realWorldAddress: "Kajiicho, Kamigyo-ku / Sakyo-ku, Kyoto",
    description:
      "The broad bridge framing the southern edge of Kamogawa Delta, featured in Episode 4's quiet walk home after the shrine festival and panoramic establishing shots throughout the series.",
    settingNote:
      "Looking north from the bridge captures the classic wide view of the entire delta.",
  },
  "kyoto-demachiyanagi": {
    name: "Keihan Demachiyanagi Station",
    subtitle: "Rail Gateway to School & Tamako's Dash to Kyoto Sta.",
    areaLabel: "Kamogawa Delta Area",
    realWorldRef: "Keihan Oto Line Terminus · Demachiyanagi Station",
    realWorldAddress: "32-1 Tanaka Kamiyanagicho, Sakyo-ku, Kyoto",
    description:
      "The daily train terminus connecting Tamako's neighborhood with school — and the station Tamako sprints into during Tamako Love Story's climax to catch Mochizou before he leaves for Tokyo.",
    settingNote:
      "Direct Keihan trains reach Fujinomori Station in about 20 minutes.",
  },
  "kyoto-shimogamo": {
    name: "Shimogamo Shrine & Tadasu-no-Mori Forest",
    subtitle: "Model for Episode 4's May Shrine Festival",
    areaLabel: "Kamogawa Delta Area",
    realWorldRef: "UNESCO World Heritage Shimogamo Shrine",
    realWorldAddress: "59 Shimogamo Izumikawacho, Sakyo-ku, Kyoto",
    description:
      "Just north of Kamogawa Delta through ancient Tadasu-no-Mori woods stands vermilion Shimogamo Shrine, inspiring the lush May festival grounds of Episode 4.",
    settingNote:
      "An 8-minute shady forest stroll north from the tip of Kamogawa Delta.",
  },
  "kyoto-nishikiyu": {
    name: "Former Nishikiyu (Usayu Architectural Model)",
    subtitle: "Karahafu Gable Roof & Retro Sento Tilework",
    areaLabel: "Downtown Kyoto",
    realWorldRef: "Historic wooden sento south of Nishiki Market (closed 2022)",
    realWorldAddress: "535 Yaoyacho, Nakagyo-ku, Kyoto",
    description:
      "A beloved Kyoto machiya bathhouse whose wooden lattice facade, lockers, and retro bath tiles served as the architectural model for Usagiyama's Usayu.",
    settingNote:
      "Though closed in 2022, its nostalgic exterior remains a touchstone for Episode 3 and 6 scenes.",
  },
  "kyoto-fujinomori": {
    name: "Keihan Fujinomori Station",
    subtitle: "Tamako & Friends' Daily Commute Station",
    areaLabel: "Fushimi & Fujinomori Commute",
    realWorldRef: "Keihan Main Line Fujinomori Station (East Exit & Overpass)",
    realWorldAddress: "Fukakusa Gokurakucho, Fushimi-ku, Kyoto",
    description:
      "Appearing from Episode 1 right through Tamako Love Story, where Tamako, Midori, Kanna, and Shiori chat at the ticket gates and Mochizou films passing trains from the footbridge.",
    settingNote:
      "Exit via the East Gate to step directly onto the Biwako Canal school walk.",
  },
  "kyoto-kitoro": {
    name: "Kitoro Bridge & Biwako Canal Path",
    subtitle: "Dappled Green Canal Walk · Mochizou's Resolve",
    areaLabel: "Fushimi & Fujinomori Commute",
    realWorldRef: "Biwako Canal footpath in Fukakusa Kitorocho",
    realWorldAddress: "Fukakusa Kitorocho, Fushimi-ku, Kyoto",
    description:
      "Steps east of Fujinomori Station, this leafy canal-side path and small bridge match the anime's school commute down to every railing — and frame the iconic Tamako Love Story key visual.",
    settingNote:
      "Walk north along the canal from Kitoro Bridge to Shidan Bridge for back-to-back scene matches.",
  },
  "kyoto-shidan-bridge": {
    name: "Shidan Bridge",
    subtitle: "Morning Commute Bridge Over the Canal",
    areaLabel: "Fushimi & Fujinomori Commute",
    realWorldRef: "Bridge crossing Biwako Canal north of Kitoro Bridge",
    realWorldAddress: "Fukakusa Sujikaibashi 6-chome, Fushimi-ku, Kyoto",
    description:
      "Continuing north along the Biwako Canal brings you to Shidan Bridge, seen in Episode 1's crisp winter morning commute and quiet after-school conversations.",
    settingNote:
      "Please stay mindful of local cyclists and pedestrians when lining up camera angles.",
  },
  "kyoto-seibo": {
    name: "Usagiyama High School Model (Kyoto Seibo Area)",
    subtitle: "Red-Brick Campus · Baton Club & Senior Homeroom",
    areaLabel: "Fushimi & Fujinomori Commute",
    realWorldRef: "Streets surrounding Kyoto Seibo Gakuin",
    realWorldAddress: "1 Fukakusa Tayanicho, Fushimi-ku, Kyoto",
    description:
      "Elegant red-brick buildings and green roofs inspired Usagiyama High School — home to Shiori's gym, the summer pool, Episode 10's festival stage, and Tamako & Mochizou's 12th-grade classroom.",
    settingNote:
      "Active school campus — please admire strictly from public streets outside and never photograph students.",
  },
  "kyoto-station": {
    name: "JR Kyoto Station & Shinkansen Platform",
    subtitle: "Tamako Love Story Finale · Paper-Cup Phone Climax",
    areaLabel: "Downtown Kyoto",
    realWorldRef: "JR Kyoto Sta. Central Gate, Concourse & Tokaido Shinkansen",
    realWorldAddress: "Higashishiokojicho, Shimogyo-ku, Kyoto",
    description:
      "To Tamako, who rarely left Usagiyama, glass-and-steel Kyoto Station feels like a giant labyrinth — yet she sprints all the way onto the Shinkansen platform and tosses Mochizou her paper-cup phone: 'Mochizou, I love you!'",
    settingNote:
      "A platform admission ticket is required to enter Shinkansen platforms; please keep clear of boarding passengers.",
  },
};

export const LOCATIONS_JA: Record<string, LocationLocaleEntry> = {
  "arcade-entrance": {
    name: "うさぎ山商店街 入口アーチ",
    subtitle: "双兎と満月の看板・物語の始まりと結び",
    areaLabel: "うさぎ山商店街 本通り",
    realWorldRef: "出町桝形商店街 東口・西口アーケード入口",
    realWorldAddress: "京都府京都市上京区二神町／青龍町",
    description:
      "青い地に白縁、双兎とお月様の看板が掲げられた商店街の玄関口。第1話の鈴の音や誕生日のサプライズ、第12話で新年へ駆け出すラストまで象徴的に描かれる。",
    settingNote:
      "公式サイト「場面スチール 01」収録スポットであり、出町桝形商店街アーケードの起点。",
  },
  usayu: {
    name: "銭湯「うさ湯」",
    subtitle: "湯本長治＆さゆり・湯けむりと夏夜の怪談",
    areaLabel: "うさぎ山商店街 北通り",
    realWorldRef: "旧・錦湯（中京区・建築モデル）",
    realWorldAddress: "京都府京都市中京区堺町通錦小路下ル八百屋町535",
    description:
      "北通りにある昔ながらの温かい銭湯。町内会長の湯本長治と看板娘さゆり親子が営み、第3話で史織がみんなと打ち解け、第7話ではさゆりの花嫁行列が街の祝福に包まれた。",
    settingNote:
      "公式「場面スチール 05a/05b」収録。唐破風の佇まいや脱衣所は京都の名銭湯「旧・錦湯」がモデル。",
  },
  sashimi: {
    name: "鮮魚店「さしみ」",
    subtitle: "魚谷隆＆真理・威勢のいいお魚屋さん",
    areaLabel: "うさぎ山商店街 本通り西側",
    realWorldRef: "鮮魚店「さが喜」（出町桝形商店街内）",
    description:
      "本通りの北端で魚谷夫妻が切り盛りする活気あふれるお魚屋さん。毎朝の元気な掛け声で街を目覚めさせ、お祝い事にも真っ先に駆けつける。",
    settingNote:
      "店頭の氷台や奥行きのある店構えは、出町桝形内の「さが喜」を参考に描かれている。",
  },
  shimizuya: {
    name: "豆腐屋「清水屋」",
    subtitle: "清水富雄・四角くて優しいお豆腐",
    areaLabel: "うさぎ山商店街 本通り西側",
    realWorldRef: "豆政・旧いづもや周辺（出町桝形参考）",
    description:
      "朝早くから仕込みを始める実直なお豆腐屋さん。第7話で片想いのさゆりの結婚を知った富雄が微笑みながら語った「四角いからこそ豆腐だよ」は名言。",
    settingNote:
      "「さしみ」の南隣に位置し、白い暖簾と水槽カウンターが京都らしい風情を醸し出す。",
  },
  "florist-princess": {
    name: "花屋「フローリスト プリンセス」",
    subtitle: "花瀬かおる・たまことデラが出会った場所",
    areaLabel: "うさぎ山商店街 本通り西側",
    realWorldRef: "花屋「花の春風」（出町桝形商店街参考）",
    description:
      "季節の草花が彩るお洒落なお花屋さん。第1話で南国から届いた月下美人の花箱に紛れていたデラとたまこが出会い、すべての物語が動き出した。",
    settingNote:
      "公式「場面スチール 03a/03b」にて店頭の花棚やデラとの出会いが紹介されている。",
  },
  "star-and-clown": {
    name: "レコード喫茶「星とピエロ」",
    subtitle: "八百比邦夫・珈琲の香りと『恋の歌』",
    areaLabel: "うさぎ山商店街 本通り西側",
    realWorldRef: "喫茶華波 周辺（出町桝形近隣参考）",
    description:
      "青い木枠の扉の奥でアナログレコードとミルクたっぷりの珈琲が味わえる喫茶店。たまこが探していた「お母さんの歌」の秘密がここで明かされる。",
    settingNote:
      "公式「場面スチール 06」収録。劇中曲アルバム『星とピエロ』のタイトルにもなった名スポット。",
  },
  "arcade-crossroads": {
    name: "商店街十字路（サバさん下）",
    subtitle: "巨大な青いサバ飾り・街の交差点",
    areaLabel: "うさぎ山商店街 中央",
    realWorldRef: "出町桝形商店街 中央交差点（若狭路サバ飾り）",
    description:
      "アーケード天井に大きな青い魚飾り「サバさん」が泳ぐ中心広場。バレンタイン企画やお化け屋敷、放課後の立ち話まで、いつも笑い声が絶えない。",
    settingNote:
      "実際の出町桝形商店街にも鯖街道にちなんだ大きなサバのオブジェが吊るされている。",
  },
  tokiwado: {
    name: "おもちゃ屋「トキワ堂」",
    subtitle: "常盤信彦＆みどり・懐かしい玩具と真心",
    areaLabel: "うさぎ山商店街 本通り南西",
    realWorldRef: "旧・イカワトーイ（出町桝形商店街参考）",
    description:
      "みどりの祖父・常盤信彦が営む老舗おもちゃ屋さん。第4話のあんこの贈り物選びや、第10話で文化祭の振り付けに悩むみどりを温かく見守った。",
    settingNote:
      "十字路の南西側、「ジャストミート」の向かいに店を構える。",
  },
  "miyako-udon": {
    name: "うどん屋「みやこうどん」",
    subtitle: "白木忠直・湯気立つ黄金色のお出汁",
    areaLabel: "うさぎ山商店街 本通り南西",
    realWorldRef: "出町桝形南端の麺処（参考）",
    description:
      "本通りの南端にある心温まるおうどん屋さん。寡黙な職人・白木忠直が毎日丁寧にとる熱々のお出汁が、寒い日の帰り道や行事のあとの身体に染み渡る。",
    settingNote:
      "「トキワ堂」「ジャストミート」とともに南口エリアの日常風景を形作る。",
  },
  "just-meat": {
    name: "精肉店「ジャストミート」",
    subtitle: "満村文子・揚げたてコロッケのいい匂い",
    areaLabel: "うさぎ山商店街 本通り南東",
    realWorldRef: "旧・野口屋精肉店（出町桝形参考）",
    description:
      "緑と白の縞模様テントが目印のお肉屋さん。満村文子が揚げるサクサクのコロッケは学生たちに大人気で、第2話では特製ハートコロッケも登場！",
    settingNote:
      "公式「場面スチール 02」にオレンジ色の看板と店頭ベンチが記録されている。",
  },
  "tamaya-shop": {
    name: "餅屋「たまや」（北白川家）",
    subtitle: "名代豆大福・藍染暖簾とお茶の間",
    areaLabel: "うさぎ山商店街 東路地",
    realWorldRef: "出町ふたば（豆大福・餅屋文化の着想源）",
    description:
      "三枚の藍暖簾の奥から毎日せいろの湯気が立ち上る北白川家の餅屋。父・豆大が魂を込めてつく豆大福と、奥の茶の間で繰り広げられる賑やかな食卓が全編の中心舞台。",
    settingNote:
      "公式設定03（居間）・06（台所）・15（客間）で間取りまで緻密に描かれている。",
  },
  "tamaya-window": {
    name: "二階の窓と糸電話",
    subtitle: "路地を挟んで繋がる幼なじみの赤い糸",
    areaLabel: "たまや ↔ 大路屋 二階",
    realWorldRef: "「たまや」と「大路屋」の向かい合う二階窓",
    description:
      "階下では父親同士がいつも言い合いをしていても、二階のたまこともち蔵の部屋はすぐ向かい合わせ。幼い頃から渡された糸電話が、第11話の夜の語らいや劇場版のラストへと繋がっていく。",
    settingNote:
      "公式まっぷのギザギザ吹き出し「ライバルもち屋」の真上を繋ぐ大切なモチーフ。",
  },
  oojiya: {
    name: "大路屋「RICE CAKE Oh!ZEE」",
    subtitle: "大路吾平＆道子・お洒落に改装した向かいの餅屋",
    areaLabel: "うさぎ山商店街 東路地",
    realWorldRef: "「たまや」向かいの店舗位置",
    description:
      "「たまや」の真向かいにあるライバル餅屋。流行好きの父・吾平が年末にモダンな「RICE CAKE Oh!ZEE」へと新装開店し、母・道子ともち蔵とともに賑やかな毎日を送る。",
    settingNote:
      "公式「場面スチール 04」に改装後のスタイリッシュな外観が収められている。",
  },
  "kyoto-masugata": {
    name: "出町桝形商店街",
    subtitle: "うさぎ山商店街のモデル・物語のふるさと",
    areaLabel: "出町柳・桝形エリア",
    realWorldRef: "出町桝形商店街（京都市上京区）",
    realWorldAddress: "京都府京都市上京区桝形通出町西入二神町",
    description:
      "京都御苑の北東に位置する実在のアーケード商店街で、「うさぎ山商店街」そのもののモデル！天井のサバ飾りや飛び出し坊や看板、巡礼ノートが今もファンを温かく迎えてくれる。",
    settingNote:
      "下のボタンから「うさぎ山商店街まっぷ」へ切り替えて、街なかの13スポットを詳しく巡れます。",
  },
  "kyoto-futaba": {
    name: "出町ふたば",
    subtitle: "名代豆餅・お餅への愛情のルーツ",
    areaLabel: "出町柳・桝形エリア",
    realWorldRef: "明治創業の京都屈指の老舗和菓子店",
    realWorldAddress: "京都府京都市上京区出町通今出川上ル青龍町236",
    description:
      "出町桝形商店街の東口すぐそばに佇む、名代豆餅で有名な老舗和菓子店。「たまや」の豆大福や活気ある店頭風景の大きなインスピレーションとなった。",
    settingNote:
      "午前中に豆餅を買い求め、徒歩2分の鴨川デルタで味わうのが定番の巡礼コース。",
  },
  "kyoto-demachiza": {
    name: "出町座（映画館・書店・カフェ）",
    subtitle: "10周年特別上映も行われた商店街の映画館",
    areaLabel: "出町柳・桝形エリア",
    realWorldRef: "出町桝形商店街内にあるミニシアター複合施設",
    realWorldAddress: "京都府京都市上京区三芳町133",
    description:
      "出町桝形商店街の中に根を下ろす文化拠点。『たまこまーけっと』10周年特別上映週間などの記念イベントが開催され、スクリーンを出ればすぐ物語の街並みが広がる。",
    settingNote:
      "2023〜2024年の10周年企画でも記念上映会場として多くのファンが訪れた。",
  },
  "kyoto-delta": {
    name: "鴨川デルタ・飛び石",
    subtitle: "『たまこラブストーリー』屈指の告白名場面",
    areaLabel: "鴨川デルタ周辺",
    realWorldRef: "賀茂川と高野川の合流地点・亀の飛び石",
    realWorldAddress: "京都府京都市左京区田中下柳町（賀茂大橋北側）",
    description:
      "賀茂川と高野川が合流する三角州と亀形の飛び石。映画『たまこラブストーリー』で夕陽が水面を染めるなか、もち蔵がたまこに「俺、たまこのことが好きだ！」と想いを伝えた聖地。",
    settingNote:
      "「あの丸い石、豆大福みたい」と語られた石や水辺の光景をそのまま体感できる。",
  },
  "kyoto-demachi-bridge": {
    name: "出町橋",
    subtitle: "夕暮れの見送りと商店街への帰り道",
    areaLabel: "鴨川デルタ周辺",
    realWorldRef: "賀茂川に架かる出町桝形〜デルタ間の橋",
    realWorldAddress: "京都府京都市上京区青龍町／左京区",
    description:
      "商店街の東口と鴨川デルタを結ぶ橋。第9話であんこが転校するユズキくんを全力で見送った黄昏のカットをはじめ、登下校や帰り道に何度も登場する。",
    settingNote:
      "橋の西詰すぐが「出町ふたば」と出町桝形商店街の入口にあたる。",
  },
  "kyoto-kawai-bridge": {
    name: "河合橋・高野川河畔",
    subtitle: "揺れるたまこの心とみどりの優しい背中押し",
    areaLabel: "鴨川デルタ周辺",
    realWorldRef: "高野川に架かる出町柳駅西側の橋と河川敷",
    realWorldAddress: "京都府京都市左京区田中上柳町",
    description:
      "デルタ東側の高野川を渡る橋と堤防の散歩道。告白を受けて戸惑うたまこの隣で、みどりが自分の想いを飲み込みながらそっと背中を押した大切な場所。",
    settingNote:
      "春には桜並木が彩り、飛び石と比叡山の稜線を一望できる。",
  },
  "kyoto-kamo-ohashi": {
    name: "賀茂大橋",
    subtitle: "今出川通の大橋・祭りの夜とデルタ遠景",
    areaLabel: "鴨川デルタ周辺",
    realWorldRef: "鴨川デルタ南側に架かる今出川通の橋",
    realWorldAddress: "京都府京都市上京区梶井町／左京区田中下柳町",
    description:
      "鴨川デルタのすぐ南を渡る風格ある橋。第4話のお祭り帰りに北白川家が夜風を受けながら歩く場面や、デルタ全景を見渡す印象的なロングショットに登場する。",
    settingNote:
      "橋の上から北側を望むと、作中キービジュアルや背景カットと同じ構図が広がる。",
  },
  "kyoto-demachiyanagi": {
    name: "京阪 出町柳駅",
    subtitle: "通学電車の始発駅・京都駅へ駆け出す起点",
    areaLabel: "鴨川デルタ周辺",
    realWorldRef: "京阪鴨東線・叡山電鉄 出町柳駅",
    realWorldAddress: "京都府京都市左京区田中上柳町32-1",
    description:
      "たまこ達が毎日学校へ通う電車のターミナル駅であり、劇場版クライマックスで東京へ発つもち蔵を追いかけてたまこが駆け込んだ始発駅。",
    settingNote:
      "ここから京阪本線で伏見区の「藤森駅」まで直通約20分でアクセスできる。",
  },
  "kyoto-shimogamo": {
    name: "下鴨神社・糺の森",
    subtitle: "第4話「うさぎ山神社」夏祭りの緑陰モデル",
    areaLabel: "鴨川デルタ周辺",
    realWorldRef: "世界文化遺産 賀茂御祖神社（下鴨神社）",
    realWorldAddress: "京都府京都市左京区下鴨泉川町59",
    description:
      "鴨川デルタから北へ続く緑豊かな糺の森と朱塗りの社殿。第4話の5月のお祭りや木漏れ日の参道の雰囲気は、この一帯がモチーフとなっている。",
    settingNote:
      "鴨川デルタ北端から河合神社を経て森の参道を徒歩約8分。",
  },
  "kyoto-nishikiyu": {
    name: "旧・錦湯（うさ湯モデル）",
    subtitle: "唐破風の木造建築とレトロな銭湯タイル",
    areaLabel: "京都市中心部",
    realWorldRef: "錦市場南側の老舗町家銭湯（2022年閉業）",
    realWorldAddress: "京都府京都市中京区堺町通錦小路下ル八百屋町535",
    description:
      "錦市場の近くで長年愛された町家造りの銭湯。「うさ湯」の格子戸や番台、浴室タイルのディテールに色濃く反映されている。",
    settingNote:
      "現在は営業終了しているが、第3話・第6話・第7話の銭湯シーンの原風景。",
  },
  "kyoto-fujinomori": {
    name: "京阪 藤森駅",
    subtitle: "たまこ達の毎日の通学下車駅",
    areaLabel: "伏見・藤森通学エリア",
    realWorldRef: "京阪本線 藤森駅（東口・跨線橋）",
    realWorldAddress: "京都府京都市伏見区深草極楽町",
    description:
      "TV第1話から劇場版まで繰り返し描かれる通学駅。改札を出るたまこ・みどり・かんな・史織の放課後トークや、跨線橋から電車を撮るもち蔵の定番スポット。",
    settingNote:
      "東口を出るとすぐに琵琶湖疏水とキトロ橋の通学路へ繋がる。",
  },
  "kyoto-kitoro": {
    name: "キトロ橋・琵琶湖疏水通学路",
    subtitle: "木漏れ日の水辺・もち蔵が決意を固めた道",
    areaLabel: "伏見・藤森通学エリア",
    realWorldRef: "深草キトロ町 琵琶湖疏水沿い遊歩道",
    realWorldAddress: "京都府京都市伏見区深草キトロ町",
    description:
      "藤森駅東口すぐの琵琶湖疏水沿いの並木道とキトロ橋。『たまこラブストーリー』メインビジュアルそのままの緑のフェンスが続き、もち蔵が進路と恋に向き合った道。",
    settingNote:
      "キトロ橋から北の師団橋まで、疏水沿いに名カットが連続する。",
  },
  "kyoto-shidan-bridge": {
    name: "師団橋",
    subtitle: "朝の光がきらめく疏水の通学橋",
    areaLabel: "伏見・藤森通学エリア",
    realWorldRef: "琵琶湖疏水に架かる師団街道・第二軍道付近の橋",
    realWorldAddress: "京都府京都市伏見区深草直違橋六丁目",
    description:
      "キトロ橋から疏水沿いに北へ歩くと現れる橋。第1話冒頭の澄んだ冬の朝、バトンを手にしたたまこ達が渡る通学風景が印象的。",
    settingNote:
      "歩行者や自転車の往来があるため、見学時は周囲の通行を優先してください。",
  },
  "kyoto-seibo": {
    name: "うさぎ山高校モデル（京都聖母学院周辺）",
    subtitle: "赤レンガ校舎・バトン部と高3の教室",
    areaLabel: "伏見・藤森通学エリア",
    realWorldRef: "京都聖母学院周辺の街並み",
    realWorldAddress: "京都府京都市伏見区深草田谷町1",
    description:
      "赤レンガ壁と緑の屋根が美しい「うさぎ山高校」の外観モデル。バドミントン部の体育館、夏のプール、第10話の文化祭ステージ、そして劇場版の3年生の教室の舞台。",
    settingNote:
      "現役の学校施設のため、校内への立ち入りや生徒さんへの撮影は厳禁です。",
  },
  "kyoto-station": {
    name: "JR京都駅・新幹線ホーム",
    subtitle: "『たまこラブストーリー』終幕・糸電話の答え",
    areaLabel: "京都市中心部",
    realWorldRef: "JR京都駅中央口・南北自由通路・東海道新幹線ホーム",
    realWorldAddress: "京都府京都市下京区東塩小路高倉町",
    description:
      "商店街が世界のすべてだったたまこが、迷宮のようなJR京都駅を必死に駆け抜け、発車間際の新幹線ホームでもち蔵へ糸電話を投げ渡す感動のクライマックス舞台。",
    settingNote:
      "新幹線ホームへの立ち入りには入場券が必要です。乗降客の妨げにならないようご注意ください。",
  },
};

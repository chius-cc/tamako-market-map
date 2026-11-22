export interface CharacterLocaleEntry {
  name: string;
  cv: string;
  affiliation: string;
  bio: string;
  deraComment: string;
}

export const CHARACTERS_EN: Record<string, CharacterLocaleEntry> = {
  tamako: {
    name: "Tamako Kitashirakawa",
    cv: "Aya Suzaki",
    affiliation: "Tamaya Eldest Daughter · Baton Club",
    bio: "A cheerful girl head-over-heels in love with mochi and Usagiyama Shopping Arcade. Born on New Year's Eve and utterly dense about romance, her warmth binds the whole neighborhood together.",
    deraComment:
      "She keeps inventing weird mochi flavors, yet she's unmistakably the pride and joy of Tamaya, mochi!",
  },
  anko: {
    name: "Anko Kitashirakawa",
    cv: "Rina Hidaka",
    affiliation: "Tamako's Younger Sister · 4th Grader",
    bio: "Tamako's fashion-conscious little sister who insists on being called 'An' rather than 'Anko'. Though she calls the family mochi shop old-fashioned, she cares deeply for her sister and dad.",
    deraComment:
      "Sharp-tongued as she is, her eye for great mochi is pure Kitashirakawa pedigree!",
  },
  mamedai: {
    name: "Mamedai Kitashirakawa",
    cv: "Keiji Fujiwara",
    affiliation: "Tamaya Master · Tamako's Father",
    bio: "A stubborn traditional mochi artisan who bickers daily with Gohei across the lane — yet in his youth he wrote the tender rock ballad 'Koi no Uta' for his late wife Hinako.",
    deraComment:
      "First-rate mochi craftsmanship, if only he'd let me sneak an extra bite in the kitchen!",
  },
  fuku: {
    name: "Fuku Kitashirakawa",
    cv: "Tomomichi Nishimura",
    affiliation: "Tamaya Grandfather",
    bio: "Tamako and Anko's gentle, smiling grandfather who watches warmly over his granddaughters and keeps peace around the neighborhood.",
    deraComment: "The mochi old man Fuku shares with me is always extra soft and sweet!",
  },
  hinako: {
    name: "Hinako Kitashirakawa",
    cv: "Yoko Hikasa",
    affiliation: "Tamako & Anko's Late Mother",
    bio: "Tamako's kindhearted mother who passed away when Tamako was five. Formerly in the Baton Club herself, she loved humming the love song Mamedai wrote for her.",
    deraComment:
      "Tamako's radiant smile that warms the whole street surely comes from her gentle mother.",
  },
  midori: {
    name: "Midori Tokiwa",
    cv: "Yuki Kaneko",
    affiliation: "Baton Club Captain · Tokiwado Granddaughter",
    bio: "Tamako's childhood best friend and steady confidante. Quietly harboring deep feelings of her own, she lovingly nudges Tamako toward honesty when it matters most.",
    deraComment:
      "Looking out for both her best friend and her rival — what a remarkably gallant young lady.",
  },
  kanna: {
    name: "Kanna Makino",
    cv: "Juri Nagatsuma",
    affiliation: "Baton Club · Carpenter's Daughter",
    bio: "A deadpan DIY prodigy who carries a carpenter's square everywhere, fears heights, and casually drops sharp insights while building birdhouses for Dera.",
    deraComment:
      "Calling me 'Sir Gentleman' shows fine manners, though that birdhouse doorway was way too narrow!",
  },
  shiori: {
    name: "Shiori Asagiri",
    cv: "Yurie Yamashita",
    affiliation: "Badminton Club · Classmate",
    bio: "Tall, composed, and seemingly aloof, Shiori is actually shy and deeply kind. Invited into Tamaya and Usayu by Tamako, she finds treasured friends in the arcade.",
    deraComment:
      "Ah, Miss Shiori! Those jewel-like eyes deserve my noblest royal tribute again today!",
  },
  mochizou: {
    name: "Mochizou Ooji",
    cv: "Atsushi Tamaru",
    affiliation: "Oojiya Son · Film Club",
    bio: "Tamako's across-the-lane childhood friend who loves filmmaking. After years of unspoken affection, he resolves to study film in Tokyo and confesses his heart at Kamogawa Delta.",
    deraComment:
      "Always pointing that camera at me! Still, his courage by the Kamo River earned my respect.",
  },
  gohei: {
    name: "Gohei Ooji",
    cv: "Fumihiko Tachiki",
    affiliation: "Oojiya / Oh!ZEE Master · Mochizou's Father",
    bio: "Owner of the rival mochi shop opposite Tamaya. Fond of trendy promotions and bickering with Mamedai, he boldly rebrands his shop 'RICE CAKE Oh!ZEE' at year's end.",
    deraComment:
      "Between you and me, his fancy Western-style mochi treats are pretty tasty too.",
  },
  michiko: {
    name: "Michiko Ooji",
    cv: "Satsuki Yukino",
    affiliation: "Oojiya Matron · Mochizou's Mother",
    bio: "Cheerful, sensible co-owner of Oojiya who chuckles at Gohei and Mamedai's rivalry while keeping both mochi families close.",
    deraComment: "Madam Michiko always greets me with the warmest smile whenever I waddle past!",
  },
  dera: {
    name: "Dera Mochimazzi",
    cv: "Takumi Yamazaki",
    affiliation: "Self-Proclaimed Noble Royal Bird",
    bio: "Dispatched from a southern kingdom to find a bride for his prince, only to eat so much mame-daifuku at Tamaya that he grows too round to fly. Pompous yet surprisingly perceptive about love.",
    deraComment:
      "Hmph! Usagiyama Arcade thrives in peace thanks to my regal supervision — be grateful!",
  },
  choi: {
    name: "Choi Mochimazzi",
    cv: "Yuri Yamaoka",
    affiliation: "Southern Royal Bird-Augur",
    bio: "An earnest young fortune-teller who travels north to retrieve Dera and continue the royal bride search, quickly charmed by the arcade's kindness and food.",
    deraComment:
      "Choi drills me mercilessly on diets every day, though she covers for me now and then.",
  },
  mecha: {
    name: "Mecha Mochimazzi",
    cv: "Hiro Shimono",
    affiliation: "Prince of the Southern Kingdom",
    bio: "The gentle southern prince who visits Usagiyama Arcade in Episode 12 to return Tamako's lost medal and escort Dera and Choi home.",
    deraComment:
      "Your Highness! Your personal visit had the whole shopping street closing shop in excitement!",
  },
  kaoru: {
    name: "Kaoru Hanase",
    cv: "Daisuke Ono",
    affiliation: "Florist Princess Owner",
    bio: "The graceful, soft-spoken florist who hands a dazed Dera from a crate of southern blossoms to Tamako in Episode 1, witnessing the very start of the story.",
    deraComment:
      "This elegant gentleman was the very one who entrusted unconscious me into Miss Tamako's hands!",
  },
  yaobi: {
    name: "Kunio Yaobi",
    cv: "Koji Tsujitani",
    affiliation: "Star & Clown Record Cafe Master",
    bio: "Master of the blue-door vinyl cafe Star & Clown and Mamedai's former bandmate in 'Dynamite Beans', quietly spinning the records that bridge two generations of love.",
    deraComment:
      "Rich coffee aroma and vinyl love songs — my favorite window perch in the arcade!",
  },
  shimizuya_tomio: {
    name: "Tomio Shimizuya",
    cv: "Yoshihisa Kawahara",
    affiliation: "Shimizuya Tofu Master",
    bio: "Good-natured tofu maker in sunglasses and an afro. When his long-time crush Sayuri marries in Episode 7, he smiles through heartbreak: 'Tofu is tofu because it's square.'",
    deraComment:
      "Fresh-cut tofu and a gentlemanly spirit even in heartbreak — bravo, Tomio!",
  },
  usayu_yumoto: {
    name: "Choji & Sayuri Yumoto",
    cv: "Kousei Tsukui / Junko Iwao",
    affiliation: "Usayu Bathhouse · Town Council Head",
    bio: "Father and daughter running the neighborhood bathhouse Usayu. Energetic council head Choji leads street events, while beloved Sayuri weds in Episode 7 amid everyone's blessings.",
    deraComment:
      "Usayu's hot baths are heavenly, even if they always boot me out of the ladies' side!",
  },
  sashimi_uotani: {
    name: "Takashi & Mari Uotani",
    cv: "Ken Narita / Yoko Hikasa",
    affiliation: "Sashimi Fish Shop Couple",
    bio: "The spirited couple running Sashimi at the arcade's north entrance, whose booming morning calls wake the entire shopping street.",
    deraComment:
      "Walking past Sashimi's gleaming ice counter always makes my beak water, mochi!",
  },
  justmeat_fumiko: {
    name: "Fumiko Mitsumura",
    cv: "Kumiko Watanabe",
    affiliation: "Just Meat Butcher Matron",
    bio: "Lively owner of Just Meat, famous among students for piping-hot beef croquettes — including special heart-shaped croquettes for Valentine's Day.",
    deraComment:
      "Freshly fried croquettes, crispy outside and juicy inside — shh, don't tell Choi!",
  },
  tokiwa_nobuhiko: {
    name: "Nobuhiko Tokiwa",
    cv: "Hiroshi Yanaka",
    affiliation: "Tokiwado Toy Shop · Midori's Grandfather",
    bio: "Midori's beret-wearing grandfather and proprietor of classic toy shop Tokiwado, always happy to play kendama with neighborhood kids.",
    deraComment:
      "His shop is a treasure trove of toys, and you can see where Midori got her kindness.",
  },
  miyako_tadanao: {
    name: "Tadanao Shiraki",
    cv: "Kenjiro Tsuda",
    affiliation: "Miyako Udon Master",
    bio: "Quiet, headband-wearing udon craftsman at the south end of the arcade whose steaming dashi broth warms everyone on chilly evenings.",
    deraComment:
      "A man of few words, yet his fragrant udon broth wafts all the way up the south lane!",
  },
};

export const CHARACTERS_JA: Record<string, CharacterLocaleEntry> = {
  tamako: {
    name: "北白川たまこ",
    cv: "洲崎 綾",
    affiliation: "「たまや」長女・うさぎ山高校バトン部",
    bio: "お餅と生まれ育ったうさぎ山商店街が何より大好きな女の子。大晦日生まれで恋にはちょっぴり鈍感だけれど、まっすぐな笑顔で街のみんなを繋いでいる。",
    deraComment:
      "いつも妙な新作お餅ばかり考えるが、吾輩が認める「たまや」自慢の看板娘だ！",
  },
  anko: {
    name: "北白川あんこ",
    cv: "日高里菜",
    affiliation: "たまこの妹・小学4年生",
    bio: "おしゃれに興味津々で、「あんこ」ではなく「あん」と呼んでほしい年頃。お餅屋は地味だとぼやきつつ、姉と父をとても大切に思っている。",
    deraComment:
      "口ではツンツンしておるが、お餅を見る目はさすが北白川家の血筋だな！",
  },
  mamedai: {
    name: "北白川豆大",
    cv: "藤原啓治",
    affiliation: "「たまや」店主・たまこの父",
    bio: "昔気質で頑固な餅職人。向かいの「大路屋」の吾平とは顔を合わせれば喧嘩ばかりだが、若き日には妻ひなこのために名曲『恋の歌』を作ったロマンチスト。",
    deraComment:
      "餅つきの腕は天下一品だが、台所でつまみ食いするとすぐ怒るのが玉にキズだ……。",
  },
  fuku: {
    name: "北白川 福",
    cv: "西村知道",
    affiliation: "「たまや」祖父",
    bio: "いつも穏やかな笑顔でたまことあんこの成長を見守る優しいおじいちゃん。商店街の頼れる和ませ役。",
    deraComment: "福じいさんが分けてくれるお餅は、いつも格別に柔らかいのだ！",
  },
  hinako: {
    name: "北白川ひなこ",
    cv: "日笠陽子",
    affiliation: "たまこ・あんこの母",
    bio: "たまこが幼い頃に他界した優しく朗らかな母。学生時代はバトンが上手で、豆大が贈った『恋の歌』を嬉しそうに口ずさんでいた。",
    deraComment:
      "街中をぽかぽかにするたまこの笑顔は、この優しいお母さん譲りなのだろうな。",
  },
  midori: {
    name: "常盤みどり",
    cv: "金子有希",
    affiliation: "バトン部部長・「トキワ堂」孫娘",
    bio: "たまこの幼なじみで頼れる親友。胸の奥に秘めた大切な想いを抱えながらも、最後にはたまこの背中をまっすぐ押してあげる優しい少女。",
    deraComment:
      "親友と恋敵のあいだでたまこのために心を砕くとは、実に気高きレディである。",
  },
  kanna: {
    name: "牧野かんな",
    cv: "長妻樹里",
    affiliation: "バトン部・大工の娘",
    bio: "いつも曲尺を携えるマイペースな大工の娘。高いところは少し苦手だが、鋭い感性と日曜大工の腕前でデラの巣箱も手作りしてくれる。",
    deraComment:
      "吾輩を「紳士」と呼ぶ礼儀は大変よろしいが、あの巣箱は少々小さすぎやしないか！？",
  },
  shiori: {
    name: "朝霧史織",
    cv: "山下百合恵",
    affiliation: "バドミントン部・クラスメイト",
    bio: "クールで大人びて見えるけれど、本当は人見知りでとても心優しい少女。デラとたまこに誘われて訪れた商店街でかけがえのない仲間を得る。",
    deraComment:
      "ああ、史織嬢……その宝石のごとき瞳に、今日も吾輩の愛を捧げようぞ！",
  },
  mochizou: {
    name: "大路もち蔵",
    cv: "田丸篤志",
    affiliation: "「大路屋」の息子・映像研究部",
    bio: "たまこと二階の窓が向かい合う幼なじみ。映画作りに情熱を注ぎ、東京の大学へ進学する決意とともに鴨川デルタで長年の想いを打ち明ける。",
    deraComment:
      "吾輩にカメラばかり向けおって！だが鴨川での一世一代の告白は見上げたものだぞ。",
  },
  gohei: {
    name: "大路吾平",
    cv: "立木文彦",
    affiliation: "「RICE CAKE Oh!ZEE」店主・もち蔵の父",
    bio: "「たまや」の向かいの餅屋店主。豆大とは犬猿の仲ながら、洋風企画や店舗改装で「RICE CAKE Oh!ZEE」を立ち上げるアイデアマン。",
    deraComment:
      "あそこのハイカラな洋風お餅スイーツも、なかなか侮れぬ旨さなのだ。",
  },
  michiko: {
    name: "大路道子",
    cv: "雪野五月",
    affiliation: "「RICE CAKE Oh!ZEE」看板女将・もち蔵の母",
    bio: "さっぱりとした気立ての良いもち蔵の母。吾平と豆大の口喧嘩を笑って受け流しつつ、両家のご近所付き合いを温かく繋いでいる。",
    deraComment: "店の前を通るたび、道子夫人はいつもにこやかに声をかけてくれるぞ！",
  },
  dera: {
    name: "デラ・モチマッヅィ",
    cv: "山崎たくみ",
    affiliation: "自称・高貴なる王室御用達の鳥",
    bio: "南の国の王子のお妃探しの旅の途中、「たまや」の豆大福の虜になって飛べないほど丸々に太ってしまった鳥。見栄っ張りだが恋の機微には敏感。",
    deraComment:
      "ふっふっふ、うさぎ山商店街が今日も平和なのは吾輩が目を光らせているおかげだぞ！",
  },
  choi: {
    name: "チョイ・モチマッヅィ",
    cv: "山岡ゆり",
    affiliation: "南の国の鳥占官",
    bio: "音信不通のデラを追いかけ、お妃探しを続ける真面目な占い師の少女。厳しいツッコミ役だが、商店街のご飯と優しさにすっかり馴染んでいく。",
    deraComment:
      "チョイめ、毎日ダイエットでしごきおるが、時々はフォローしてくれるのだ。",
  },
  mecha: {
    name: "メチャ・モチマッヅィ",
    cv: "下野 紘",
    affiliation: "南の国の王子",
    bio: "第12話でうさぎ山商店街を自ら訪れた穏やかな南国の王子。なくしたメダルをたまこに返し、デラとチョイを優しく迎えに来た。",
    deraComment:
      "王子！わざわざお越しくださり、商店街中が臨時休業の大歓迎でしたぞ！",
  },
  kaoru: {
    name: "花瀬かおる",
    cv: "小野大輔",
    affiliation: "花屋「フローリスト プリンセス」店主",
    bio: "いつも穏やかで気品あふれるお花屋さん。第1話で南国の花箱に紛れ込んでいたデラをたまこに手渡し、物語の始まりを見届けた。",
    deraComment:
      "気絶していた吾輩をたまこ嬢へと託してくれた、実にエレガントな御仁である！",
  },
  yaobi: {
    name: "八百比邦夫",
    cv: "辻谷耕史",
    affiliation: "レコード喫茶「星とピエロ」マスター",
    bio: "青い扉の喫茶店でレコードと珈琲を淹れる寡黙なマスター。かつて豆大とバンド「ダイナマイトビーンズ」を組み、世代を超える恋の記憶を見守る。",
    deraComment:
      "珈琲の香りとレコードの恋歌……窓辺で聴くのが吾輩のお気に入りなのだ。",
  },
  shimizuya_tomio: {
    name: "清水富雄",
    cv: "川原慶久",
    affiliation: "豆腐屋「清水屋」店主",
    bio: "アフロヘアにサングラスがトレードマークの優しいお豆腐屋さん。片想いしていたさゆりの結婚にも「四角いからこそ豆腐だよ」と微笑んで祝福した。",
    deraComment:
      "富雄の切る木綿豆腐は絶品だし、失恋しても粋な男っぷりであったぞ！",
  },
  usayu_yumoto: {
    name: "湯本長治・さゆり",
    cv: "津久井教生／岩男潤子",
    affiliation: "銭湯「うさ湯」親子・町内会長",
    bio: "北通りで銭湯「うさ湯」を営む親子。世話焼きな町内会長の長治と、ふんわり優しい看板娘のさゆり。第7話のさゆりの花嫁姿は街中を幸せにした。",
    deraComment:
      "「うさ湯」の一番風呂は極楽だが、女湯を覗くとすぐ追い出されるのが解せぬ！",
  },
  sashimi_uotani: {
    name: "魚谷 隆・真理",
    cv: "成田 剣／日笠陽子",
    affiliation: "鮮魚店「さしみ」店主夫妻",
    bio: "商店街の北口で威勢よく店を構えるお魚屋さん夫婦。優しいたかしと頼もしい真理の元気な掛け声で、うさぎ山商店街の朝が始まる。",
    deraComment:
      "「さしみ」の氷台に並ぶ新鮮な魚を見ると、つい足が止まってしまうのだ！",
  },
  justmeat_fumiko: {
    name: "満村文子",
    cv: "渡辺久美子",
    affiliation: "精肉店「ジャストミート」女将",
    bio: "揚げたてアツアツのコロッケが大人気のお肉屋さん。バレンタインには特製ハートコロッケで商店街の恋を応援してくれるチャキチャキの女将。",
    deraComment:
      "揚げたてサクサクのコロッケはたまらん……おっと、チョイには内緒だぞ！",
  },
  tokiwa_nobuhiko: {
    name: "常盤信彦",
    cv: "家中 宏",
    affiliation: "おもちゃ屋「トキワ堂」店主・みどりの祖父",
    bio: "みどりのおじいちゃんで老舗玩具店「トキワ堂」の主人。ベレー帽がよく似合い、子どもたちとけん玉で遊ぶのが大好き。",
    deraComment:
      "珍しいおもちゃがいっぱいの楽しい店だ。みどり嬢の優しさはおじいさん譲りだな。",
  },
  miyako_tadanao: {
    name: "白木忠直",
    cv: "津田健次郎",
    affiliation: "うどん屋「みやこうどん」店主",
    bio: "白い頭巾を巻いた寡黙で実直なうどん職人。商店街の南端で毎日丁寧にとる温かいお出汁が、街の人々の心とお腹を満たしている。",
    deraComment:
      "無口だが腕は確か！あの黄金色のお出汁の香りは南通りいっぱいに広がるのだ。",
  },
};

export interface EventLocaleEntry {
  title: string;
  sceneBadge: string;
  seasonTime: string;
  tags: string[];
  summary: string;
  quoteTranslated?: string;
  staffNote: string;
  pilgrimageTip?: string;
}

export const EVENTS_EN: Record<string, EventLocaleEntry> = {
  "ev-01-shidan-morning": {
    title: "Crisp Canal Breeze at Shidan Bridge: Morning Walk to School",
    sceneBadge: "EP 01 · Shidan Bridge",
    seasonTime: "Dec · Winter Morning",
    tags: ["Commute", "Shidan Bridge", "Opening"],
    summary:
      "In the crisp December morning air, Tamako, Midori, and Kanna cross Shidan Bridge over the Biwako Canal on their way to Usagiyama High while Mochizou trails along framing shots with his camera.",
    quoteTranslated: '"Good morning, Tamako-chan!"',
    staffNote:
      "Modeled on Shidan Bridge along Fushimi's Biwako Canal — one of the very first real-world Kyoto spots shown in Episode 1.",
    pilgrimageTip:
      "A pleasant 5-minute walk north along the canal bank from Keihan Fujinomori Station.",
  },
  "ev-01-sashimi-morning": {
    title: "Morning Calls at Sashimi Fish Shop",
    sceneBadge: "EP 01 · Sashimi Fish Shop",
    seasonTime: "Dec · Year-End Morning Market",
    tags: ["Fish Shop", "Morning Market", "Neighbors"],
    summary:
      "At the northern head of the arcade, Takashi and Mari Uotani cheerfully greet Tamako from behind Sashimi's gleaming ice counter — while quietly keeping her upcoming New Year's Eve birthday in mind.",
    quoteTranslated: '"Have a great day at school today too, Tama-chan!"',
    staffNote:
      "Modeled after fresh fish shop 'Sagaki' inside Demachi Masugata Arcade.",
  },
  "ev-01-deai": {
    title: "A Talking Bird in the Flower Crate: Tamako Meets Dera",
    sceneBadge: "EP 01 · Florist Encounter",
    seasonTime: "Dec · After Closing Ceremony",
    tags: ["First Meeting", "Florist", "Iconic Scene"],
    summary:
      "Stopping by Florist Princess after school, Tamako peers into a shipment of southern tuberose blossoms — only for a plump, talking white bird named Dera Mochimazzi to tumble out and sneeze onto her nose!",
    quoteTranslated: '"Excuse me, what are these flowers called?"',
    staffNote:
      "Corresponds directly to official map 'still/03' — the true starting point of Tamako's extraordinary everyday year.",
    pilgrimageTip:
      "Experience Tamako's after-school stroll along the western storefronts of Demachi Masugata.",
  },
  "ev-01-tamaya-birthday": {
    title: "Busiest New Year's Eve: Tamako's Nearly Forgotten Birthday",
    sceneBadge: "EP 01 · Tamaya Mochi Shop",
    seasonTime: "Dec 31 · New Year's Eve Morning",
    tags: ["Tamaya", "Birthday", "Mame-Daifuku"],
    summary:
      "December 31 is both Tamaya's busiest mochi-pounding day of the year and Tamako's birthday. While Mamedai focuses wholly on holiday orders, newly arrived Dera falls hopelessly in love with soft mame-daifuku.",
    quoteTranslated: '"Born on New Year\'s Eve — she truly is a child blessed by mochi!"',
    staffNote:
      "Tamaya's three indigo noren panels and bustling storefront draw inspiration from Kyoto's historic Demachi Futaba.",
    pilgrimageTip:
      "Arrive early at Demachi Futaba if you want to taste freshly pounded mame-daifuku before lines grow!",
  },
  "ev-01-arcade-celebration": {
    title: "Surprise Beneath the Archway: Birthday Wishes from the Whole Street",
    sceneBadge: "EP 01 · Arcade Arch",
    seasonTime: "Dec 31 · New Year's Eve Dusk",
    tags: ["Birthday", "Warmth", "Entrance Arch"],
    summary:
      "No one forgot after all! As stalls wind down on New Year's Eve, shopkeepers alongside Mochizou, Midori, and Kanna gather under the arcade lights to shower Tamako with birthday gifts and smiles.",
    quoteTranslated: '"Happy birthday, Tama-chan!"',
    staffNote:
      "Bookends Episode 1's opening archway shot, establishing the arcade as one big extended family.",
  },
  "ev-02-crossroads-meeting": {
    title: "Town Council Pitch: Bringing Valentine's Day to Usagiyama",
    sceneBadge: "EP 02 · Central Crossroads",
    seasonTime: "Early Feb · Town Meeting",
    tags: ["Town Council", "Valentine", "Arcade Event"],
    summary:
      "Inspired by Valentine displays around town, Tamako proposes a street-wide Valentine campaign. Backed by the florist, butcher, and bathhouse owners, pink heart decorations soon brighten the arcade.",
    quoteTranslated: '"I want to liven up our shopping arcade for Valentine\'s Day too!"',
    staffNote:
      "Centers around the Saba-san crossroads to showcase Tamako's infectious enthusiasm for her street.",
  },
  "ev-02-justmeat-promo": {
    title: "Heart-Shaped Croquettes at Just Meat & Rival Promotions",
    sceneBadge: "EP 02 · Just Meat",
    seasonTime: "Feb 14 · Afternoon",
    tags: ["Croquettes", "Food", "Valentine"],
    summary:
      "Just Meat rolls out piping-hot heart-shaped beef croquettes while Oojiya counters with trendy Valentine sweets, drawing young couples and students down the nostalgic lane.",
    quoteTranslated: '"How about a piping-hot heart croquette for maidens in love!"',
    staffNote:
      "Just Meat's orange sign and green-and-white striped awning are featured in official map 'still/02'.",
  },
  "ev-02-midori-secret": {
    title: "A Quietly Blooming Flower: Midori's Unspoken Feelings",
    sceneBadge: "EP 02 · Usagiyama High",
    seasonTime: "Feb 14 · Dusk",
    tags: ["Midori", "Secret Crush", "School"],
    summary:
      "As Valentine's Day winds down, Midori chooses not to hand over her handmade chocolate as a confession — treasuring her place beside Tamako like a quiet flower blooming in secret.",
    quoteTranslated: '"Whatever the feeling, a flower is still a flower — blooming dearly in the heart."',
    staffNote:
      "Echoes Episode 2's poetic official synopsis capturing Midori's tender restraint.",
  },
  "ev-03-new-class": {
    title: "Cherry-Blossom 11th Grade: Sharing a Class with Shiori Asagiri",
    sceneBadge: "EP 03 · Usagiyama High",
    seasonTime: "Apr · New School Year",
    tags: ["New Term", "Shiori", "Campus"],
    summary:
      "Starting her second year of high school, Tamako sits beside cool, graceful badminton player Shiori Asagiri — who secretly wishes she knew how to start a conversation.",
    quoteTranslated: '"We\'re desk neighbors starting today, Asagiri-san!"',
    staffNote:
      "Red-brick hallways and gymnasium details draw from Kyoto Seibo Gakuin in Fushimi.",
  },
  "ev-03-dera-crush": {
    title: "Dera's Love at First Sight & Tea Time at Tamaya",
    sceneBadge: "EP 03 · Tamaya Living Room",
    seasonTime: "Apr · After School",
    tags: ["Tamaya", "Dera", "Shiori"],
    summary:
      "Smitten at first sight with Shiori, Dera accidentally leads her home to Tamaya. Over warm tea and freshly toasted mochi, Shiori's tense shoulders finally relax in the Kitashirakawa living room.",
    quoteTranslated: '"It\'s delicious... mochi that somehow makes your heart feel warm and safe."',
    staffNote:
      "Set inside official 'setting/03' (Tamaya tatami room), Shiori's first step into the arcade circle.",
  },
  "ev-03-usayu-bath": {
    title: "Melting the Ice in the Warm Waters of Usayu",
    sceneBadge: "EP 03 · Usayu Bathhouse",
    seasonTime: "Apr · Evening",
    tags: ["Bathhouse", "Friendship", "Usayu"],
    summary:
      "Invited to Usayu bathhouse with Tamako, Midori, and Kanna, shy Shiori bursts into genuine laughter amid the rising steam — sealing a four-way friendship (while peeping Dera gets swiftly booted).",
    quoteTranslated: '"Being in the bath together with everyone feels so wonderfully warm."',
    staffNote:
      "Directly featured in official map 'still/05: First Time at the Sento'.",
    pilgrimageTip:
      "Compare Usayu's nostalgic wooden facade with Kyoto's historic Former Nishikiyu.",
  },
  "ev-04-shrine-festival": {
    title: "May Shrine Festival Prep & Anko's Fluttering Heart",
    sceneBadge: "EP 04 · Shrine Approach",
    seasonTime: "May · Early Summer",
    tags: ["Festival", "Anko", "Shimogamo"],
    summary:
      "While the whole arcade buzzes over Usagiyama Shrine's May festival, fourth-grader Anko quietly saves her pocket money hoping to walk the stalls with her classmate Yuzuki.",
    quoteTranslated: '"Stop calling me Anko — call me An!"',
    staffNote:
      "Lush green shrine paths evoke Shimogamo Shrine and Tadasu-no-Mori north of Kamogawa Delta.",
  },
  "ev-04-tokiwado-gift": {
    title: "Choosing a Small Gift at Tokiwado",
    sceneBadge: "EP 04 · Tokiwado",
    seasonTime: "May · Afternoon",
    tags: ["Anko", "Tokiwado", "Growing Up"],
    summary:
      "Even when Anko's festival wish doesn't go as planned, gentle words from Midori and Tamako beneath the evening lanterns teach her that another flower will always bloom down the road.",
    quoteTranslated: '"Even if things don\'t go as wished, another path holds its own flowers."',
    staffNote:
      "Tokiwado and neighboring shops form a gentle cocoon watching over the children's growth.",
  },
  "ev-04-kamogawa-night": {
    title: "Night Breeze on Kamo Ohashi Bridge: Walking Home Together",
    sceneBadge: "EP 04 · Kamo Ohashi",
    seasonTime: "May · Festival Night",
    tags: ["Night View", "Family", "Kamo Bridge"],
    summary:
      "After the festival crowds fade, Mamedai takes crestfallen Anko's hand across the river breeze on Kamo Ohashi Bridge, wrapping up her bittersweet first crush with quiet family warmth.",
    quoteTranslated: '"Come on, let\'s head home, Anko."',
    staffNote:
      "Contrasts daytime festival bustle with tranquil night reflections on the Kamo River.",
  },
  "ev-05-school-pool": {
    title: "Non-Swimmer Bootcamp at Usagiyama High's Summer Pool",
    sceneBadge: "EP 05 · School Pool",
    seasonTime: "Jul · Before Summer Break",
    tags: ["Pool", "Campus", "Friendship"],
    summary:
      "Ahead of the coastal school trip, Midori, Shiori, and Kanna coach non-swimmer Tamako at the outdoor school pool under dazzling July skies and cicada song.",
    quoteTranslated: '"Relax your shoulders, Tamako! I\'ve got you."',
    staffNote:
      "Quietly highlights Midori's attentive, protective care for Tamako.",
  },
  "ev-05-fireworks-confession": {
    title: "Unspoken Under Summer Fireworks: Mochizou's Near-Confession",
    sceneBadge: "EP 05 · Summer Beach Night",
    seasonTime: "Jul · Coastal Trip Night",
    tags: ["Mochizou", "Fireworks", "Near Confession"],
    summary:
      "Egged on by Dera during the overnight beach trip, Mochizou calls Tamako out beneath evening sparklers — only for missed timing and fireworks to drown out the words he longed to say.",
    quoteTranslated: '"Um, Tamako... for a really long time now, I—!"',
    staffNote:
      "Plants the bittersweet seed that finally blossoms a year later in Tamako Love Story.",
  },
  "ev-06-ghost-plan": {
    title: "Beating the August Heat: Usagiyama Haunted House Project",
    sceneBadge: "EP 06 · Central Crossroads",
    seasonTime: "Aug · Midsummer",
    tags: ["Haunted House", "Summer", "Arcade"],
    summary:
      "When sweltering heat slows foot traffic, Tamako rallies her friends and shopkeepers to stage a neighborhood haunted house — until eerie mysteries start happening for real!",
    quoteTranslated: '"Maybe it\'ll send a nice cool shiver right down everyone\'s spine!"',
    staffNote:
      "Official 'setting/10' specially illustrates Tamako, Midori, Kanna, and Shiori's ghost costumes.",
  },
  "ev-06-usayu-spooky": {
    title: "Midnight Chills & Comedy Around Usayu",
    sceneBadge: "EP 06 · Near Usayu",
    seasonTime: "Aug · Late Night",
    tags: ["Ghost Story", "Comedy", "Usayu"],
    summary:
      "Floating fans, shadowy silhouettes, and Dera's bloodcurdling shrieks echo down the dark lane beside Usayu! Though mostly misunderstandings, laughter brings summer energy back to the street.",
    quoteTranslated: '"Gyaaaah! My spine really froze solid this time!"',
    staffNote:
      "Blends Kyoto Animation slapstick timing with the hush of an old shopping street at night.",
  },
  "ev-06-udon-warmdown": {
    title: "Haunted House Triumph & Warm Neighborhood Gathering",
    sceneBadge: "EP 06 · Miyako Udon",
    seasonTime: "Aug · After Closing",
    tags: ["Celebration", "Miyako Udon", "Shopkeepers"],
    summary:
      "After drawing crowds of delighted visitors, shopkeepers and kids unwind together at the south end of the street, laughing that all's well that ends well.",
    quoteTranslated: '"What an uproar — well, all\'s well that ends well!"',
    staffNote:
      "Brings the spooky summer romp back home to cozy neighborhood camaraderie.",
  },
  "ev-07-choi-arrives": {
    title: "Royal Augur Choi Arrives! Panic in Tamaya's Living Room",
    sceneBadge: "EP 07 · Tamaya Living Room",
    seasonTime: "Sep · Early Autumn",
    tags: ["Choi", "Tamaya", "Southern Visitor"],
    summary:
      "Tired of waiting for news, young bird-augur Choi tracks Dera straight to Tamaya. Too embarrassed to admit he got fat on mochi, balloon-round Dera spins a string of hilarious excuses.",
    quoteTranslated: '"Dera-chan, you have gotten way too fat!"',
    staffNote:
      "Matches official Episode 7 still 03 and 'setting/03' down to every tatami mat and cupboard.",
  },
  "ev-07-shimizuya-tofu": {
    title: '"Tofu Is Tofu Precisely Because It\'s Square"',
    sceneBadge: "EP 07 · Shimizuya Tofu",
    seasonTime: "Sep · Afternoon Shopping",
    tags: ["Shimizuya", "Tofu", "Famous Quote"],
    summary:
      "Tofu master Tomio learns through Choi's fortune-telling that his long-time crush Sayuri is getting married. Slicing fresh tofu with a gentle smile, he comforts everyone with quiet grace.",
    quoteTranslated: '"Even if that girl weds, tofu stays faithfully square."',
    staffNote:
      "One of TV Tamako Market's warmest, most bittersweet adult moments.",
  },
  "ev-07-usayu-wedding": {
    title: "Sayuri's Bridal Procession & Blessings from Usayu",
    sceneBadge: "EP 07 · Usayu Bathhouse",
    seasonTime: "Sep · Auspicious Day",
    tags: ["Usayu", "Sayuri", "Wedding"],
    summary:
      "Dressed in a pure white shiromuku kimono, Sayuri steps out from Usayu to applause, red-and-white celebratory mochi from Mamedai, and Tomio's heartfelt smile — deeply moving newcomer Choi.",
    quoteTranslated: '"Wishing you every happiness! The whole arcade has your back!"',
    staffNote:
      "Showcases the lifelong bonds of a traditional Kyoto neighborhood.",
    pilgrimageTip:
      "Picture the bridal send-off outside Kyoto's historic Former Nishikiyu bathhouse.",
  },
  "ev-08-nestbox": {
    title: "Stuck in the Doorway! Kanna's Precision Birdhouse",
    sceneBadge: "EP 08 · Outside Tokiwado",
    seasonTime: "Oct · Autumn",
    tags: ["Kanna", "Carpentry", "Comedy"],
    summary:
      "Kanna crafts a handsome wooden birdhouse to exact measurements — yet mochi-round Dera gets wedged outside the hole! With a 'Do Not Feed' sign hung around his neck, his diet begins.",
    quoteTranslated: '"Sir Gentleman, I built it to exact spec — why won\'t you fit?"',
    staffNote:
      "Kanna's deadpan carpentry ruler vs. round Dera delivers peak visual comedy.",
  },
  "ev-08-diet-arcade": {
    title: '"Don\'t Call Me a Chicken!" Full-Arcade Diet Dash',
    sceneBadge: "EP 08 · Arcade Runway",
    seasonTime: "Oct · Crisp Autumn",
    tags: ["Diet", "Dera", "Famous Quote"],
    summary:
      "Cut off from mame-daifuku, Dera sprints up and down the covered arcade past tempting fried croquettes, tofu, and udon broth, bellowing his immortal cry: 'I won't let you call me a chicken!'",
    quoteTranslated: '"I won\'t let anybody call me a chicken!!"',
    staffNote:
      "Turns the straight covered shopping street into a gauntlet of culinary temptations.",
  },
  "ev-08-fujinomori-autumn": {
    title: "Crimson Leaves Along the Canal: Walking Home Together",
    sceneBadge: "EP 08 · Autumn Canal",
    seasonTime: "Oct · Autumn Dusk",
    tags: ["Autumn Leaves", "Commute", "Canal"],
    summary:
      "Even after slimming down briefly, Dera rebounds on secret snacks — while golden-red autumn foliage arches over the Biwako Canal as Tamako and her friends stroll home side by side.",
    quoteTranslated: '"Seasons turn, the sky grows high, and hearts stay cozy and warm."',
    staffNote:
      "Captures the fiery autumn maple trees overhanging Fushimi's Biwako Canal.",
  },
  "ev-09-anko-farewell": {
    title: "Running to Demachi Bridge: Anko's Brave Goodbye to Yuzuki",
    sceneBadge: "EP 09 · Demachi Bridge",
    seasonTime: "Autumn · Sunset",
    tags: ["Anko", "Farewell", "Courage"],
    summary:
      "Heartbroken to learn Yuzuki is transferring schools, Anko nearly lets him leave without a word — until encouragement from Tamako and Mochizou sends her sprinting to the bridge to wave goodbye.",
    quoteTranslated: '"Safe travels, Yuzuki-kun! Take care!"',
    staffNote:
      "Quietly mirrors Tamako and Mochizou's own unspoken bond as they watch over Anko.",
  },
  "ev-09-star-clown-record": {
    title: "When the Stylus Drops: Clues to Mom's Song at Star & Clown",
    sceneBadge: "EP 09 · Star & Clown",
    seasonTime: "Autumn · Afternoon Coffee",
    tags: ["Star & Clown", "Vinyl", "Mom's Song"],
    summary:
      "At Star & Clown cafe, Tamako searches for the nameless tune her late mother used to hum. Master Yaobi polishes old records and photos, unlocking a romance from decades past.",
    quoteTranslated: '"Everybody loves somebody — someday, everyone falls in love."',
    staffNote:
      "Star & Clown serves as the musical soul of 'Koi no Uta' across both the TV series and film.",
  },
  "ev-09-mamedai-koi-no-uta": {
    title: "'Koi no Uta' Revealed: Young Mamedai's Love Song for Hinako",
    sceneBadge: "EP 09 · Tamaya Shop",
    seasonTime: "Autumn · After Closing",
    tags: ["Koi no Uta", "Mamedai & Hinako", "Tearjerker"],
    summary:
      "The song Tamako could never find in any record store wasn't a pop hit — it was written and sung by shy young Mamedai in his band days to confess his love to Tamako's mother Hinako.",
    quoteTranslated: '"Just like the day I found you—"',
    staffNote:
      "Both Keiji Fujiwara's Mamedai version and Aya Suzaki's Tamako version are beloved franchise anthems.",
  },
  "ev-10-midori-struggle": {
    title: "Choreography Blues at Tokiwado Before the School Festival",
    sceneBadge: "EP 10 · Tokiwado",
    seasonTime: "Nov · Late Autumn",
    tags: ["Baton Club", "Midori", "Festival"],
    summary:
      "Tasked with choreographing the Baton Club's spotlight performance, Midori hits creative block — until her grandfather's warmth and Tamako's wholehearted trust rekindle her joy.",
    quoteTranslated: '"Any baton routine you create is sure to be wonderful, Midori-chan!"',
    staffNote:
      "Tokiwado anchors Midori's childhood memories and quiet strength.",
  },
  "ev-10-arcade-cheers": {
    title: "Neighborhood Cheer Squad: Weaving Arcade Rhythm into Dance",
    sceneBadge: "EP 10 · Arcade Crossroads",
    seasonTime: "Nov · After Practice",
    tags: ["Baton", "Support", "Costumes"],
    summary:
      "With records from Star & Clown, sewing help at Tamaya, and cheerful encouragement from every shopkeeper, the everyday rhythm of Usagiyama inspires the club's routine and stage outfits.",
    quoteTranslated: '"Every single day in this arcade is already the best rhythm there is!"',
    staffNote:
      "Celebrates Naoko Yamada's signature sensitivity to everyday sounds and musicality.",
  },
  "ev-10-festival-stage": {
    title: "Batons Blooming Under Clear Skies: School Festival Triumph",
    sceneBadge: "EP 10 · Usagiyama High",
    seasonTime: "Nov · Festival Day",
    tags: ["School Festival", "Stage", "Baton Club"],
    summary:
      "Silver batons arc high into the air! Tamako, Midori, and Kanna beam on stage in matching pink outfits while Mochizou films proudly and Shiori cheers from the audience.",
    quoteTranslated: '"Hearts and skies soaring high — raise the curtain on our shining stage!"',
    staffNote:
      "The graceful baton toss-and-catch foreshadows Mochizou catching the paper cup in the movie finale.",
  },
  "ev-11-princess-news": {
    title: "Royal Bride Revealed?! Uproar Across Usagiyama Arcade",
    sceneBadge: "EP 11 · Tamaya & Arcade",
    seasonTime: "Early Dec · Winter",
    tags: ["Royal Bride", "Stamp Card", "Arcade"],
    summary:
      "Spotting the mole on Tamako's neck, Choi proclaims her the prince's bride! While neighbors spin royal daydreams, Tamako frets far more over filling up her arcade point card.",
    quoteTranslated: '"Miss Tamako is the candidate to become our prince\'s bride!"',
    staffNote:
      "Official 'setting/04' lovingly illustrates Tamako's prized Usagiyama stamp card.",
  },
  "ev-11-string-phone-night": {
    title: "Midnight Paper-Cup Phone: Wanting and Fearing Change",
    sceneBadge: "EP 11 · 2nd-Floor Windows",
    seasonTime: "Dec · Snowy Night",
    tags: ["String Phone", "Tamako", "Mochizou", "Growing Up"],
    summary:
      "Standing at her bedroom window as winter snow falls, Tamako speaks to Mochizou through their childhood paper-cup phone — wondering aloud whether they too will someday change.",
    quoteTranslated: '"Not wanting to change, yet wanting to grow — hearts are funny things."',
    staffNote:
      "Elevates the paper-cup phone into the central emotional symbol leading into Tamako Love Story.",
  },
  "ev-12-prince-arrives": {
    title: "Prince Mecha Visits & Every Shutter Rolls Down",
    sceneBadge: "EP 12 · Oojiya & Arcade",
    seasonTime: "Late Dec · Year-End",
    tags: ["Prince Mecha", "Closed Shutters", "Year-End"],
    summary:
      "Kind Prince Mecha arrives in person to return Tamako's medal, prompting the excited arcade to close shop for a grand reception — leaving Tamako frozen before an eerily shuttered street.",
    quoteTranslated: '"Seeing every shop shuttered down the street, Tamako stops in her tracks."',
    staffNote:
      "Reveals why Tamako clings so fiercely to the noisy, unchanging warmth of her shopping street.",
  },
  "ev-12-year-end-running": {
    title: "Dashing into the New Year & RICE CAKE Oh!ZEE's Debut",
    sceneBadge: "EP 12 · Arcade Entrance",
    seasonTime: "Dec 31 · New Year's Eve",
    tags: ["TV Finale", "Growth", "Oh!ZEE"],
    summary:
      "Hearing everyone calling her name and smelling fresh mochi, Tamako shakes off her fear and runs smiling into the morning light as Dera departs and newly remodeled 'RICE CAKE Oh!ZEE' rings in a lively new year!",
    quoteTranslated: '"Years turn, yet the warmth of mochi and people stays right here."',
    staffNote:
      "Official map 'still/04' showcases Oojiya's stylish new 'RICE CAKE Oh!ZEE' storefront.",
  },
  "ev-m01-senior-year": {
    title: "Spring of 12th Grade: First Time in the Same Homeroom",
    sceneBadge: "Movie · Senior Classroom",
    seasonTime: "Apr · 12th Grade Spring",
    tags: ["Movie", "Career Sheet", "Homeroom"],
    summary:
      "Entering their final year of high school, Tamako and Mochizou land in the same class for the first time! While classmates discuss universities, Tamako naturally writes 'succeeding Tamaya' — as Mochizou quietly firms his resolve to study film in Tokyo.",
    quoteTranslated: '"After graduation, I\'m planning to go to university in Tokyo."',
    staffNote:
      "Tamako Love Story sets aside talking-bird fantasy for an intimate, grounded Kyoto coming-of-age drama.",
  },
  "ev-m02-fujinomori-canal": {
    title: "Spring Sunlight on Biwako Canal: Through Mochizou's Viewfinder",
    sceneBadge: "Movie · Fujinomori Canal",
    seasonTime: "Spring · After School",
    tags: ["Movie", "Biwako Canal", "Camera"],
    summary:
      "Along the sunlit canal railings between Fujinomori Station and Kitoro Bridge, Mochizou's camcorder lingers on Tamako's carefree smile. Nudged by Midori's sharp intuition, he vows to stop merely watching from across a window.",
    quoteTranslated: '"Staying the way we\'ve always been... just won\'t do anymore."',
    staffNote:
      "Immortalized in the official Tamako Love Story theatrical poster.",
    pilgrimageTip:
      "Just a 2-minute walk east from Keihan Fujinomori Station to Kitoro and Shidan Bridges.",
  },
  "ev-m03-kamogawa-confession": {
    title: "Sunset Confession on Kamogawa Delta: 'I Love You, Tamako!'",
    sceneBadge: "Movie · Kamogawa Stones",
    seasonTime: "Spring · Golden Sunset",
    tags: ["Movie Climax", "Kamogawa Delta", "Confession"],
    summary:
      "As golden-pink dusk shimmers across Kamogawa Delta, Mochizou calls out across the stepping stones: 'I'm going to Tokyo... and I love you, Tamako!' Caught completely off guard, Tamako nearly slips into the river and flees in a daze.",
    quoteTranslated: '"Tamako — I\'m in love with you!"',
    staffNote:
      "Widely hailed as one of anime history's finest, most tender romance confessions.",
    pilgrimageTip:
      "Two minutes on foot from Demachiyanagi Station; watch your footing on wet stepping stones!",
  },
  "ev-m04-kawai-bridge-midori": {
    title: "Restless Hearts by Kawai Bridge & Midori's Gentle Push",
    sceneBadge: "Movie · Kawai Bridge",
    seasonTime: "After Confession · Dusk",
    tags: ["Movie", "Midori", "Turning Point"],
    summary:
      "Overwhelmed by the realization of romance, Tamako can barely face mochi-making or Mochizou. Walking along Kawai Bridge and the Takano Riverbank, Midori sets aside her own feelings and gently pushes Tamako forward.",
    quoteTranslated: '"Go to him, Tamako. Don\'t lie to your own heart."',
    staffNote:
      "Completes Midori's deeply moving character arc along the quiet river footpath.",
  },
  "ev-m05-arcade-wakeup": {
    title: "Hearing Her Own Heartbeat: Star & Clown & 'Koi no Uta'",
    sceneBadge: "Movie · Arcade & Cafe",
    seasonTime: "Late Spring · Departure Day",
    tags: ["Movie", "Star & Clown", "Awakening"],
    summary:
      "Hearing music from Star & Clown and remembering how her father once sang his heart out to her mother, Tamako finally recognizes what Mochizou means to her — grabbing her paper-cup phone and bolting out of the arcade!",
    quoteTranslated: '"Just like Dad did back then... I have to tell him in my own words!"',
    staffNote:
      "Turns Mamedai and Hinako's love song into a baton of courage passed to Tamako.",
  },
  "ev-m06-demachiyanagi-dash": {
    title: "Breaking Out of Usagiyama: Full-Speed Sprint to Demachiyanagi",
    sceneBadge: "Movie · Demachiyanagi Sta.",
    seasonTime: "Spring · Midday",
    tags: ["Movie", "Sprint", "Demachiyanagi"],
    summary:
      "Spurred on by Midori and Anko's relay of clues, Tamako races out of her familiar shopping street, across the river, and onto a train at Keihan Demachiyanagi Station — venturing out for love on her own.",
    quoteTranslated: '"I have to see Mochizou before he leaves!"',
    staffNote:
      "Demachiyanagi links Usagiyama and Kamogawa with Kyoto's citywide rail network.",
  },
  "ev-m07-kyoto-station-climax": {
    title: "JR Kyoto Station Shinkansen Platform: 'Mochizou, I Love You!'",
    sceneBadge: "Movie · Grand Finale",
    seasonTime: "Spring · Before Departure",
    tags: ["Finale", "String Phone", "Kyoto Station", "Iconic Quote"],
    summary:
      "After getting lost in cavernous JR Kyoto Station and sprinting breathless up to the Tokaido Shinkansen platform just before departure, Tamako tosses one end of the paper-cup phone into Mochizou's hands and speaks her truth: 'Mochizou, I love you so much! ...Over to you!'",
    quoteTranslated: '"Mochizou, I love you! ...Over to you!"',
    staffNote:
      "Earned Naoko Yamada the Japan Media Arts Festival New Face Award for breathtaking direction and sound design.",
    pilgrimageTip:
      "Trace Tamako's route from JR Kyoto Central Gate to the Shinkansen concourse (platform ticket required).",
  },
  "ev-s01-southern-island": {
    title: "Tropical Breeze & Fond Memories of Tamaya's Mochi",
    sceneBadge: "Short · Epilogue",
    seasonTime: "Theatrical Short · Tropics",
    tags: ["Dera-chan Short", "Bonus", "Memories"],
    summary:
      "Back on his sunny southern island beside Choi and Prince Mecha, Dera gazes at drifting clouds and drools nostalgically over Tamaya's mame-daifuku and the lively folks of Usagiyama.",
    quoteTranslated: '"Every now and then, I sure do miss Tamako\'s mochi..."',
    staffNote:
      "Screened in theaters alongside Tamako Love Story as a sweet, lighthearted curtain opener.",
  },
};

export const EVENTS_JA: Record<string, EventLocaleEntry> = {
  "ev-01-shidan-morning": {
    title: "朝の師団橋と琵琶湖疏水：バトンと歩く通学路",
    sceneBadge: "第1話・師団橋通学路",
    seasonTime: "12月・冬休み前の朝",
    tags: ["通学路", "師団橋", "オープニング"],
    summary:
      "澄みきった冬の朝、バトンを手に琵琶湖疏水の師団橋を渡って登校するたまこ・みどり・かんなと、カメラを構えて歩くもち蔵の微笑ましい日常風景。",
    staffNote:
      "伏見区の琵琶湖疏水・師団橋〜キトロ橋周辺がモデル。第1話冒頭から実在の京都の通学路が登場する。",
    pilgrimageTip:
      "京阪藤森駅東口から疏水沿いに北へ徒歩約5分で師団橋に到着します。",
  },
  "ev-01-sashimi-morning": {
    title: "鮮魚店「さしみ」：魚谷夫妻の威勢のいい朝",
    sceneBadge: "第1話・魚屋さしみ",
    seasonTime: "12月・師走の朝市",
    tags: ["お魚屋さん", "朝市", "商店街の日常"],
    summary:
      "本通りの北端で店を構える「さしみ」の前で、魚谷隆・真理夫妻が登校するたまこに元気よく声をかけつつ、大晦日の誕生日プレゼントを密かに心に留める。",
    staffNote:
      "出町桝形商店街内の鮮魚店「さが喜」の店構えがモデル。",
  },
  "ev-01-deai": {
    title: "花箱から飛び出した南国の鳥：たまことデラの出会い",
    sceneBadge: "第1話・花屋での出会い",
    seasonTime: "12月・終業式の帰り道",
    tags: ["出会い", "花屋", "名場面"],
    summary:
      "終業式の帰り道、「フローリスト プリンセス」に立ち寄ったたまこは、南国から届いた花の中に紛れ込んでいた言葉を話す白い鳥・デラ・モチマッヅィと運命の出会いを果たす。",
    staffNote:
      "公式まっぷ「still/03 たまことデラの出会い」対応シーンであり、物語すべての始まり。",
    pilgrimageTip:
      "出町桝形商店街の西側エリアを歩きながら放課後の空気を味わえます。",
  },
  "ev-01-tamaya-birthday": {
    title: "一番忙しい大晦日：忘れられそうなたまこの誕生日",
    sceneBadge: "第1話・たまや店頭",
    seasonTime: "12月31日・大晦日の朝",
    tags: ["たまや", "誕生日", "豆大福"],
    summary:
      "12月31日は餅屋「たまや」にとって一年で一番の大勝負であり、たまこの誕生日。正月餅作りに追われる豆大の横で、デラは豆大福の美味しさにすっかり魅了されていく。",
    staffNote:
      "三枚の藍暖簾とせいろの湯気は、京都の老舗餅屋の活気を受け継いでいる。",
    pilgrimageTip:
      "出町ふたばの名代豆餅を味わうなら午前中の訪問がおすすめです。",
  },
  "ev-01-arcade-celebration": {
    title: "アーチの下のサプライズ：商店街みんなの誕生日祝い",
    sceneBadge: "第1話・入口アーチ",
    seasonTime: "12月31日・大晦日の夕暮れ",
    tags: ["誕生日祝い", "人情", "アーケード"],
    summary:
      "みんなちゃんと覚えていた！店じまいの頃、商店街の店主たちやもち蔵・みどり・かんなが集まり、たまこの誕生日を温かく祝福する。",
    staffNote:
      "商店街全体がひとつの大きな家族のような温かさに満ちた第1話クライマックス。",
  },
  "ev-02-crossroads-meeting": {
    title: "町内会での提案：商店街バレンタイン大作戦！",
    sceneBadge: "第2話・十字路",
    seasonTime: "2月初旬・町内会",
    tags: ["町内会", "バレンタイン", "商店街企画"],
    summary:
      "街のバレンタインムードを見たたまこが「商店街もバレンタインで盛り上げたい！」と提案。店主たちも乗り気になり、通りがハート色に彩られていく。",
    staffNote:
      "サバさんが見守る中央交差点を舞台に、たまこの行動力が光るエピソード。",
  },
  "ev-02-justmeat-promo": {
    title: "「ジャストミート」の特製ハートコロッケと恋模様",
    sceneBadge: "第2話・お肉屋さん前",
    seasonTime: "2月14日・午後",
    tags: ["コロッケ", "バレンタイン", "食べ歩き"],
    summary:
      "精肉店「ジャストミート」ではアツアツのハート型コロッケが登場し、向かいの「大路屋」も洋風企画で対抗！いつもの商店街に甘酸っぱい活気が広がる。",
    staffNote:
      "公式まっぷ「still/02」にも登場する緑白テントの店頭風景。",
  },
  "ev-02-midori-secret": {
    title: "ひそやかに咲く花：みどりが胸にしまった想い",
    sceneBadge: "第2話・うさぎ山高校",
    seasonTime: "2月14日・夕暮れ",
    tags: ["常盤みどり", "片想い", "放課後"],
    summary:
      "賑やかなバレンタインの終わり、みどりは大切な想いを言葉にせず、そっと心に咲く花としてたまこの隣に居続けることを選ぶ。",
    staffNote:
      "第2話公式あらすじの詩的な一節がみどりの繊細な心情を映し出す。",
  },
  "ev-03-new-class": {
    title: "桜咲く高2の新学期：クールな朝霧史織と同じクラスに",
    sceneBadge: "第3話・うさぎ山高校",
    seasonTime: "4月・始業式",
    tags: ["新学期", "朝霧史織", "校舎"],
    summary:
      "高校2年生に進級したたまこは、バドミントン部のクールな美少女・朝霧史織と同じクラスになる。実は人見知りな史織も、ずっとたまこと話してみたいと思っていた。",
    staffNote:
      "赤レンガ造りの校舎や体育館は京都聖母学院周辺がモチーフ。",
  },
  "ev-03-dera-crush": {
    title: "デラの一目惚れと「たまや」のお茶タイム",
    sceneBadge: "第3話・たまや居間",
    seasonTime: "4月・放課後",
    tags: ["たまや", "デラ", "史織"],
    summary:
      "史織に一目惚れしたデラの騒動をきっかけに、史織が「たまや」へ招かれる。温かいお茶とお餅を囲み、史織の緊張がふっとほどけていく。",
    staffNote:
      "公式「setting/03 居間」のちゃぶ台が、史織と商店街を繋ぐ最初の場所に。",
  },
  "ev-03-usayu-bath": {
    title: "ぽかぽかの「うさ湯」で縮まる4人の距離",
    sceneBadge: "第3話・銭湯うさ湯",
    seasonTime: "4月・夜",
    tags: ["銭湯", "友情", "うさ湯"],
    summary:
      "たまこ達と一緒に初めて銭湯「うさ湯」に入った史織。湯けむりのなかで自然と笑顔がこぼれ、4人はかけがえのない親友になる（覗こうとしたデラはお仕置き）。",
    staffNote:
      "公式まっぷ「still/05 はじめての銭湯」に描かれた名シーン。",
    pilgrimageTip:
      "中京区の「旧・錦湯」と照らし合わせると町家銭湯の風情がよく分かります。",
  },
  "ev-04-shrine-festival": {
    title: "5月のうさぎ山神社お祭り準備とあんこの初恋",
    sceneBadge: "第4話・神社参道",
    seasonTime: "5月・新緑の昼下がり",
    tags: ["夏祭り", "あんこ", "下鴨神社"],
    summary:
      "うさぎ山神社のお祭りで街が活気づくなか、小学4年生のあんこは密かに想いを寄せるユズキくんと回るためにお小遣いを貯めていた。",
    staffNote:
      "新緑の木漏れ日と参道の空気感は下鴨神社・糺の森がモチーフ。",
  },
  "ev-04-tokiwado-gift": {
    title: "「トキワ堂」で選ぶ小さな贈り物と姉たちの優しさ",
    sceneBadge: "第4話・トキワ堂",
    seasonTime: "5月・午後",
    tags: ["あんこ", "トキワ堂", "成長"],
    summary:
      "思い通りにいかず落ち込むあんこに、みどりとたまこがそっと寄り添う。「別の道にも別の花が咲く」と知る優しい初夏の夕暮れ。",
    staffNote:
      "「トキワ堂」をはじめ商店街全体が子どもたちの成長を見守る揺りかごになっている。",
  },
  "ev-04-kamogawa-night": {
    title: "賀茂大橋の夜風：家族と並んで帰る祭りのあと",
    sceneBadge: "第4話・賀茂大橋",
    seasonTime: "5月・祭りの夜",
    tags: ["夜景", "家族愛", "賀茂大橋"],
    summary:
      "お祭りの帰り道、父・豆大があんこの手を引き、夜風が吹く賀茂大橋を家族みんなで渡って帰るほろ苦くも温かいラストカット。",
    staffNote:
      "昼の祭囃子と夜の静かな鴨川の水面のコントラストが美しい一幕。",
  },
  "ev-05-school-pool": {
    title: "カナヅチ脱却！うさぎ山高校プールでの水泳特訓",
    sceneBadge: "第5話・高校プール",
    seasonTime: "7月・夏休み前",
    tags: ["プール", "学園", "友情"],
    summary:
      "臨海学校に向けて、泳げないたまこをみどり・史織・かんなが学校のプールで特訓！夏空の下に水しぶきと笑い声が響く。",
    staffNote:
      "たまこを懸命に支えるみどりの眼差しも印象的な青春回。",
  },
  "ev-05-fireworks-confession": {
    title: "夏夜の花火と届かなかったもち蔵の告白",
    sceneBadge: "第5話・臨海学校の夜",
    seasonTime: "7月・海辺の夜",
    tags: ["もち蔵", "花火", "すれ違い"],
    summary:
      "臨海学校の夜、デラに急かされたもち蔵はたまこを呼び出して想いを伝えようとするが、打ち上げ花火と間の悪さに阻まれ、言葉は夜空に消えてしまう。",
    staffNote:
      "この夏夜の未遂が、翌春の『たまこラブストーリー』へと繋がる大切な伏線に。",
  },
  "ev-06-ghost-plan": {
    title: "猛暑を吹き飛ばせ！商店街お化け屋敷プロジェクト",
    sceneBadge: "第6話・十字路",
    seasonTime: "8月・盛夏",
    tags: ["お化け屋敷", "夏休み", "商店街"],
    summary:
      "暑さで閑散とする商店街に客足を呼び戻そうと、たまこ達がお化け屋敷を企画！ところが準備中の空き店舗で本物の怪現象が起き始める……！？",
    staffNote:
      "公式「setting/10」には4人のお化け衣装設定画も収録されている。",
  },
  "ev-06-usayu-spooky": {
    title: "「うさ湯」界隈の怪奇現象！？背筋も凍る真夏の夜",
    sceneBadge: "第6話・うさ湯脇",
    seasonTime: "8月・深夜",
    tags: ["怪談", "コメディ", "うさ湯"],
    summary:
      "夜のアーケードや「うさ湯」周辺に浮かぶ謎の影にデラが大絶叫！ドタバタの勘違いの末、真夏の商店街に再び賑やかな笑い声が戻ってくる。",
    staffNote:
      "夜の商店街ならではの静けさと京アニ流コメディの緩急が絶妙。",
  },
  "ev-06-udon-warmdown": {
    title: "お化け屋敷大成功！商店街みんなのほっこり打ち上げ",
    sceneBadge: "第6話・みやこうどん周辺",
    seasonTime: "8月・閉館後",
    tags: ["打ち上げ", "みやこうどん", "店主たち"],
    summary:
      "お化け屋敷は大盛況のうちに幕を閉じ、店主たちも集まって「終わりよければすべてよし」と笑顔で労い合う。",
    staffNote:
      "南通りの温かな人情で締めくくる夏休みエピソード。",
  },
  "ev-07-choi-arrives": {
    title: "鳥占官チョイ上陸！「たまや」居間での苦しい言い訳",
    sceneBadge: "第7話・たまや居間",
    seasonTime: "9月・初秋",
    tags: ["チョイ", "たまや居間", "南国の使者"],
    summary:
      "デラを追って南国からやって来た真面目な少女・チョイ。お餅で丸々と太った理由を問いただされたデラは、苦し紛れの嘘をついて大慌て！",
    staffNote:
      "第7話公式スチール03は「setting/03 居間」と完全一致する代表的カット。",
  },
  "ev-07-shimizuya-tofu": {
    title: "「四角いからこそ豆腐だよ」清水屋の優しい強がり",
    sceneBadge: "第7話・清水屋",
    seasonTime: "9月・午後のお買い物",
    tags: ["清水屋", "豆腐", "名ゼリフ"],
    summary:
      "密かに想いを寄せていた「うさ湯」のさゆりがお嫁に行くと知った清水富雄。ちょっぴり切ない胸の内を隠して、いつも通り四角い豆腐を切り分ける姿が胸を打つ。",
    staffNote:
      "大人のほろ苦い片想いと粋な優しさを描いた名場面。",
  },
  "ev-07-usayu-wedding": {
    title: "「うさ湯」さゆりさんの花嫁立ちと商店街の祝福",
    sceneBadge: "第7話・銭湯うさ湯",
    seasonTime: "9月・吉日",
    tags: ["うさ湯", "さゆり", "花嫁行列"],
    summary:
      "白無垢姿のさゆりを、豆大の紅白餅や富雄の笑顔、商店街じゅうの温かい拍手が送り出す。遠くから来たチョイの心も街の優しさに解きほぐされていく。",
    staffNote:
      "通り全体で門出を祝う、うさぎ山商店街の絆が凝縮された一幕。",
    pilgrimageTip:
      "京都マップの「旧・錦湯」と重ねて町家銭湯前の門出を想像できます。",
  },
  "ev-08-nestbox": {
    title: "かんな特製の巣箱に入らない！餌やり禁止札のデラ",
    sceneBadge: "第8話・トキワ堂前",
    seasonTime: "10月・秋",
    tags: ["牧野かんな", "日曜大工", "コメディ"],
    summary:
      "かんなが設計寸法どおりに作った立派な木製巣箱に、お腹がつかえて入れないデラ！「エサをあげてはいけません」の札を下げられダイエットが始まる。",
    staffNote:
      "かんなの職人気質とまん丸デラの対比が抜群のギャグ回。",
  },
  "ev-08-diet-arcade": {
    title: "「ニワトリだとは言わせねぇ！」商店街ダイエット激走",
    sceneBadge: "第8話・商店街コース",
    seasonTime: "10月・秋晴れ",
    tags: ["ダイエット", "デラ", "名台詞"],
    summary:
      "豆大福を断たれ、コロッケやうどんの誘惑が漂うアーケードを必死に走るデラが魂の叫び「ニワトリだとは言わせねぇっ！！」を轟かせる。",
    staffNote:
      "直線アーケードの立地を活かした商店街縦断ランニング。",
  },
  "ev-08-fujinomori-autumn": {
    title: "紅葉に染まる琵琶湖疏水：変わらない放課後の帰り道",
    sceneBadge: "第8話・疏水の紅葉",
    seasonTime: "10月・晩秋の夕暮れ",
    tags: ["紅葉", "通学路", "琵琶湖疏水"],
    summary:
      "せっかく痩せたデラもみんなの差し入れですぐ元通りに。色づいた紅葉が揺れる伏見の疏水沿いを、たまこ達が仲良く歩いて帰る穏やかな秋の日。",
    staffNote:
      "藤森〜師団橋間の疏水沿いの美しい紅葉カット。",
  },
  "ev-09-anko-farewell": {
    title: "出町橋での見送り：転校するユズキくんへ走るあんこ",
    sceneBadge: "第9話・出町橋",
    seasonTime: "秋・夕暮れ",
    tags: ["あんこ", "別れ", "勇気"],
    summary:
      "ユズキくんの転校に寂しさを隠せないあんこだったが、たまこともち蔵に背中を押され、夕暮れの橋の上から精一杯「元気でね！」と手を振る。",
    staffNote:
      "あんこを見守るたまこともち蔵の自然な距離感も心に残る。",
  },
  "ev-09-star-clown-record": {
    title: "レコード針が落とす記憶：「星とピエロ」と母の歌",
    sceneBadge: "第9話・星とピエロ",
    seasonTime: "秋・午後の喫茶店",
    tags: ["星とピエロ", "レコード", "母の歌"],
    summary:
      "幼い頃に母・ひなこが口ずさんでいた歌を探して「星とピエロ」を訪れるたまこ。マスター八百比の記憶から、商店街の青春時代が蘇る。",
    staffNote:
      "シリーズ全体のテーマ曲『恋の歌』の謎が紐解かれる重要スポット。",
  },
  "ev-09-mamedai-koi-no-uta": {
    title: "明かされる『KOI NO UTA』：若き豆大がひなこへ贈った恋歌",
    sceneBadge: "第9話・たまや店内",
    seasonTime: "秋・閉店後の夜",
    tags: ["恋の歌", "豆大とひなこ", "感動回"],
    summary:
      "どのレコード屋にもなかった「お母さんの歌」の正体は、若き日の父・豆大がバンド時代に母・ひなこへの想いを込めて作った世界にひとつだけのラブソングだった。",
    staffNote:
      "豆大バージョンとたまこバージョンの『恋の歌』は劇場版でも物語の核を担う。",
  },
  "ev-10-midori-struggle": {
    title: "バトン部部長の悩み：文化祭前の「トキワ堂」",
    sceneBadge: "第10話・トキワ堂",
    seasonTime: "11月・晩秋",
    tags: ["バトン部", "常盤みどり", "文化祭"],
    summary:
      "文化祭の一番注目されるステージ枠を引き当て、振り付けで行き詰まるみどり。祖父やたまこの真っすぐな信頼に触れ、バトンを回す楽しさを取り戻す。",
    staffNote:
      "みどりの原点である「トキワ堂」の温かな灯りが描かれる。",
  },
  "ev-10-arcade-cheers": {
    title: "商店街の応援リズムと手作りステージ衣装",
    sceneBadge: "第10話・商店街＆たまや",
    seasonTime: "11月・練習帰り",
    tags: ["バトン", "衣装作り", "応援"],
    summary:
      "「星とピエロ」のレコードや「たまや」での衣装づくり、街の人々の手拍子からヒントを得て、うさぎ山商店街らしいステップが完成していく。",
    staffNote:
      "日常の音やリズムをアニメーションに昇華する演出が光る。",
  },
  "ev-10-festival-stage": {
    title: "秋空に舞うバトン！うさぎ山高校文化祭ステージ大成功",
    sceneBadge: "第10話・うさぎ山高校",
    seasonTime: "11月・文化祭当日",
    tags: ["文化祭", "晴れ舞台", "バトン部"],
    summary:
      "お揃いのピンクの衣装でステージに立つたまこ・みどり・かんな！高く舞い上がるバトンと輝く笑顔を、客席からもち蔵のカメラと史織の拍手が見守る。",
    staffNote:
      "高く投げたバトンを受け止める動きは、劇場版ラストの糸電話キャッチとも響き合う。",
  },
  "ev-11-princess-news": {
    title: "「あなたが王子のお妃様です！」お妃騒動とポイントカード",
    sceneBadge: "第11話・たまや",
    seasonTime: "12月初旬・冬",
    tags: ["お妃候補", "ポイントカード", "大騒ぎ"],
    summary:
      "チョイのお告げでたまこがお妃候補になり商店街は大騒ぎ！当のたまこは商店街のポイントカードがいっぱいになることばかり気にしていた。",
    staffNote:
      "公式「setting/04」にはたまこ愛用のポイントカード設定画も掲載。",
  },
  "ev-11-string-phone-night": {
    title: "二階の窓の糸電話：変わりたい気持ちと変わりたくない夜",
    sceneBadge: "第11話・二階の窓",
    seasonTime: "12月・雪の夜",
    tags: ["糸電話", "たまこ", "もち蔵", "心の変化"],
    summary:
      "しんしんと冷える夜、二階の窓辺で糸電話を手に取ったたまこと、向かいの部屋で耳を傾けるもち蔵。少しずつ大人へ近づくふたりの距離が静かに揺れる。",
    staffNote:
      "日常編から『たまこラブストーリー』へと橋を架ける名シーン。",
  },
  "ev-12-prince-arrives": {
    title: "メチャ王子来訪！臨時休業でシャッターの下りた商店街",
    sceneBadge: "第12話・大路屋前",
    seasonTime: "12月末・年の瀬",
    tags: ["メチャ王子", "臨時休業", "動揺"],
    summary:
      "メチャ王子が自らメダルを届けに現れ、歓迎準備のため商店街がまさかの臨時休業に。どの店も閉まった静かな通りを見て、たまこは言いようのない不安に立ちすくむ。",
    staffNote:
      "たまこがなぜ「変わらない商店街の賑わい」をこれほど愛していたのかが伝わる回。",
  },
  "ev-12-year-end-running": {
    title: "新しい年へ駆け出そう！「RICE CAKE Oh!ZEE」誕生",
    sceneBadge: "第12話・入口アーチ＆Oh!ZEE",
    seasonTime: "12月31日・年越し",
    tags: ["TV最終回", "新年", "Oh!ZEE"],
    summary:
      "お餅の香りとみんなの呼び声に背中を押され、笑顔を取り戻して駆け出すたまこ。デラ達が帰国し、「大路屋」も「RICE CAKE Oh!ZEE」へと新装開店して新しい一年が始まる！",
    staffNote:
      "公式まっぷ「still/04」では新装開店した「RICE CAKE Oh!ZEE」が誇らしげに輝く。",
  },
  "ev-m01-senior-year": {
    title: "高校3年生の春：初めて同じクラスになった教室と進路調査票",
    sceneBadge: "劇場版・3年の教室",
    seasonTime: "4月・高3新学期",
    tags: ["劇場版", "進路希望", "同じクラス"],
    summary:
      "高校最後の春、初めて同じクラスになったたまこともち蔵。周囲が大学進学を書き込むなか、迷わず「家業を継ぐ」と書くたまこの隣で、もち蔵は東京の美大へ進む決意を固めていた。",
    staffNote:
      "不思議な鳥が去ったあとの等身大の京都の春を瑞々しく切り取る幕開け。",
  },
  "ev-m02-fujinomori-canal": {
    title: "木漏れ日の琵琶湖疏水：カメラ越しに見つめたもち蔵の決意",
    sceneBadge: "劇場版・藤森通学路",
    seasonTime: "春・放課後",
    tags: ["劇場版", "琵琶湖疏水", "ビデオカメラ"],
    summary:
      "藤森駅からキトロ橋・師団橋へ続く緑のフェンス沿い。カメラのファインダー越しにたまこを見つめ続けてきたもち蔵は、みどりの一言をきっかけに「今のままじゃダメだ」と一歩を踏み出す。",
    staffNote:
      "『たまこラブストーリー』メインビジュアルそのままの象徴的な疏水遊歩道。",
    pilgrimageTip:
      "京阪藤森駅東口から徒歩2分でキトロ橋・師団橋エリアを散策できます。",
  },
  "ev-m03-kamogawa-confession": {
    title: "夕暮れの鴨川デルタ・飛び石での告白：「俺、たまこのことが好きだ！」",
    sceneBadge: "劇場版・鴨川飛び石",
    seasonTime: "春・茜色の夕暮れ",
    tags: ["劇場版名場面", "鴨川デルタ", "告白"],
    summary:
      "夕陽にきらめく鴨川デルタの飛び石の上、東京へ行くと告げたもち蔵がまっすぐに想いをぶつける——「俺、たまこのことが好きだ！」。突然の告白に頭が真っ白になったたまこは足をもつれさせ逃げ出してしまう。",
    staffNote:
      "日本アニメ映画史に残る青春告白屈指の名シーン。",
    pilgrimageTip:
      "出町柳駅から徒歩2分。飛び石を渡る際は足元の水濡れにご注意ください。",
  },
  "ev-m04-kawai-bridge-midori": {
    title: "河合橋のたもと：揺れ動くたまこと、みどりの優しい背中押し",
    sceneBadge: "劇場版・河合橋",
    seasonTime: "告白のあと・黄昏",
    tags: ["劇場版", "常盤みどり", "心の転機"],
    summary:
      "「好き」という感情に初めて向き合い戸惑うたまこ。高野川に架かる河合橋のほとりで、ずっとたまこを見守ってきたみどりが自分の想いを胸に秘めたまま優しく背中を押す。",
    staffNote:
      "みどりの切なくも気高い友情が胸に迫る名場面。",
  },
  "ev-m05-arcade-wakeup": {
    title: "胸の鼓動に気づいた商店街：「星とピエロ」と父の恋歌",
    sceneBadge: "劇場版・商店街",
    seasonTime: "晩春・出発の日",
    tags: ["劇場版", "星とピエロ", "気づき"],
    summary:
      "「星とピエロ」の音楽と、かつて父・豆大が母へ想いを伝えた『恋の歌』を思い出し、もち蔵が自分にとって特別な存在だったと気づいたたまこ。糸電話を握りしめ、商店街を飛び出す！",
    staffNote:
      "両親の恋の記憶が、たまこ自身の勇気へと受け継がれる瞬間。",
  },
  "ev-m06-demachiyanagi-dash": {
    title: "うさぎ山を飛び出して：京阪出町柳駅への全力疾走",
    sceneBadge: "劇場版・出町柳駅",
    seasonTime: "春・昼下がり",
    tags: ["劇場版", "疾走", "出町柳駅"],
    summary:
      "みどりやあんこのアシストを受け、これまでひとりで出たことのなかった街を飛び出し、京阪出町柳駅から京都駅へと向かう電車に飛び乗るたまこ。",
    staffNote:
      "出町桝形・鴨川から京都駅方面を結ぶリアルな鉄道動線。",
  },
  "ev-m07-kyoto-station-climax": {
    title: "JR京都駅新幹線ホーム：糸電話で伝えた「もち蔵、大好き！」",
    sceneBadge: "劇場版・クライマックス",
    seasonTime: "春・発車直前",
    tags: ["終幕クライマックス", "糸電話", "京都駅", "名台詞"],
    summary:
      "巨大な迷宮のようなJR京都駅で迷いながらも全力で駆け上がり、発車寸前の新幹線ホームでもち蔵へ糸電話の紙コップを投げるたまこ。ピンと張った糸の向こうへ、ついに返事を届ける——「もち蔵、大好き！……ドーゾ！」",
    staffNote:
      "文化庁メディア芸術祭アニメーション部門新人賞を受賞した山田尚子監督渾身のクライマックス。",
    pilgrimageTip:
      "JR京都駅中央口〜新幹線改札・ホーム（要入場券）で足取りを辿れます。",
  },
  "ev-s01-southern-island": {
    title: "南の島の風と「たまや」のお餅への郷愁",
    sceneBadge: "南国短編・エピローグ",
    seasonTime: "同時上映・南国の陽だまり",
    tags: ["南の島のデラちゃん", "短編", "思い出"],
    summary:
      "南の島へ戻ったデラが、青い海とヤシの木の下でチョイやメチャ王子と過ごしながら、「たまや」の豆大福とうさぎ山商店街のみんなを懐かしく思い出すほのぼの短編。",
    staffNote:
      "『たまこラブストーリー』と同時上映され、劇場の空気をほっこり温めた一編。",
  },
};

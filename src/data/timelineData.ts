import { BirthdayData, TimelineMemory } from '../types';

export const timelineData: TimelineMemory[] = [
  {
    id: 'mem-2019-2021',
    year: '2019 - 2021',
    date: '2019 – 2021',
    title: 'Where It All Began',
    description: 'بداية بدءة بصدفة، و احلي صدفة حصلت. مين يتخيل ان علشان اوقفك مكاني في كنتين المدرسه، يوصلنا اننا نعيش مع بعض العمر ده كله و نتجوز؟ مين يتخيل علشان كنتي ماسكه حاجة سخنة يخلي ده يحصل؟ عشنا يروحي الفترة ديه، و عدينا بحاجات كتير اوي سوا، و مع كل الي حصل خلصت باننا مع بعض زي دايما، و زي ما هيحصل علي طول يروح قلبي.',
    images: [],
    caption: 'لحظات محفورة في القلب.. مش محتاجة صور عشان نفضل فاكرينها.',
    location: 'Where Our Story Began',
    quote: "If there's any kind of magic in this world, it must be in the attempt of understanding someone, sharing something.",
    quoteSource: 'Before Sunrise',
    type: 'memory'
  },
  {
    id: 'mem-2022',
    year: '2022',
    date: '2022',
    title: 'A Year of New Beginnings',
    description:"",
    images: [],
    type: 'memory',
    subSections: [
      {
        id: 'sec-2022-1',
        sectionName: 'Section 1',
        title: 'From our first Captured photos',
        description:"هنا قررنا اننا هنتقابل بعد كل درس، و كنا بنشوف بعض كتير و نروح مع بعض، و اوقات حتي ركبنا الاوتوبيس مع بعض. مكنتش عاوز اروح والله، و كنت عاوز افضل معاكي و نفضل واقفين طول اليوم.",
        images: [
          {
            src: '/images/2022/Section 1/image (44).jpg',
            alt: '2022 Memory 1',
            caption: "",
          },
          {
            src: '/images/2022/Section 1/image (45).jpg',
            alt: '2022 Memory 2',
            caption: ""
          },
          {
            src: '/images/2022/Section 1/image (46).jpg',
            alt: '2022 Memory 3',
            caption: ""
          }
        ],
        caption: "",
        location: 'Our Early Memories',
        quote: "You are scored on my heart from the very first day you walked in.",
        quoteSource: 'Me Before You'
      },
      {
        id: 'sec-2022-2',
        sectionName: 'Section 2',
        title: 'Unforgettable Moments',
        description: "هنا عملتي حركة بجد عمري ما انسها، و دايما فاكرها و بتبسط اوي. عزمتيني علي القهوة، بجد اتبسط بطريقة و فرحت اوي، و فضلنا نشربها سوا في الشارع واقفين مع بعض و بنتصور و نهزر.",
        images: [
          {
            src: '/images/2022/Section 2/image (41).jpg',
            alt: '2022 Section 2 Memory 1',
            caption: ""
          },
          {
            src: '/images/2022/Section 2/image (42).jpg',
            alt: '2022 Section 2 Memory 2',
            caption: ""
          },
          {
            src: '/images/2022/Section 2/image (43).jpg',
            alt: '2022 Section 2 Memory 3',
            caption: ""
          },
          {
            src: '/images/2022/Section 2/IMG_20221127_193416_125.jpg',
            alt: '2022 Section 2 Special Evening',
            caption: ""
          }
        ],
        caption:"",
        location: 'Special Days Together',
        quote: 'When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.',
        quoteSource: 'When Harry Met Sally'
      }
    ]
  },
  {
    id: 'mem-2023',
    year: '2023',
    date: '2023',
    title: '',
    description: '',
    images: [],
    type: 'memory',
    subSections: [
      {
        id: 'sec-2023-1',
        sectionName: 'Section 1',
        title: 'Spontaneous Adventures',
        description: "هنا حصلت الحاجة الي لحد دلوقتي فاكرها و فاكر احساسها. هنا حضنتك لاول مره يمريم، و لاول مره اتحضن في حياتي، و كان منك. و لحد دلوقتي يمريم عارف الاحساس و حافظه، و بفتكره في كل لحظه في حياتي، و مش عاوز غيره في حياتي كلها.",
        images: [
          {
            src: '/images/2023/Section 1/image (35).jpg',
            alt: '2023 Section 1 Photo 1',
            caption: ""
          },
          {
            src: '/images/2023/Section 1/image (36).jpg',
            alt: '2023 Section 1 Photo 2',
            caption: ""
          },
          {
            src: '/images/2023/Section 1/image (37).jpg',
            alt: '2023 Section 1 Photo 3',
            caption: ""
          },
          {
            src: '/images/2023/Section 1/image (38).jpg',
            alt: '2023 Section 1 Photo 4',
            caption: ""
          },
          {
            src: '/images/2023/Section 1/image (39).jpg',
            alt: '2023 Section 1 Photo 5',
            caption: ""
          },
          {
            src: '/images/2023/Section 1/image (40).jpg',
            alt: '2023 Section 1 Photo 6',
            caption: ""
          }
        ],
        caption: "",
        location: 'Every Road With You',
        quote: "I could die right now, I'm just happy. I've never felt that before. I'm just exactly where I want to be.",
        quoteSource: 'Eternal Sunshine of the Spotless Mind'
      },
      {
        id: 'sec-2023-2',
        sectionName: 'Section 2',
        title: 'Winter Days & Warm Hearts',
        description: "هنا كنا دخلنا ثانوية عامة، و رجعنا لنفس العادة نتقابل بعد الدرس و نروح سوا. و هنا حصلت حاجة الي مكنتش متخيل انها تحصل: قابلت طنط لاول مره، و كمان خلتني اركب معاكم. ده اكبر حدث في حياتي والله، و قد ايه ديه حاجة كبيره بنسبالي. مكنتش متصور ده يحصل، و حصل مرتين. بجد حدث كبير جدا.",
        images: [
          {
            src: '/images/2023/Section 2/IMG_20231221_163023_404.jpg',
            alt: '2023 Section 2 December 1',
            caption: ""
          },
          {
            src: '/images/2023/Section 2/IMG_20231221_163023_818.jpg',
            alt: '2023 Section 2 December 2',
            caption: 'تفاصيل هادية وجميلة'
          },
          {
            src: '/images/2023/Section 2/IMG_20231221_163036_774.jpg',
            alt: '2023 Section 2 December 3',
            caption: 'أجمل لقطات جمعتنا'
          },
          {
            src: '/images/2023/Section 2/image (27).jpg',
            alt: '2023 Section 2 Photo 4',
            caption: ""
          },
          {
            src: '/images/2023/Section 2/image (30).jpg',
            alt: '2023 Section 2 Photo 5',
            caption: ""
          },
          {
            src: '/images/2023/Section 2/image (31).jpg',
            alt: '2023 Section 2 Photo 6',
            caption: ""
          }
        ],
        caption: "",
        location: 'December Warmth',
        quote: 'For me, it was always, always about you.',
        quoteSource: 'About Time'
      }
    ]
  },
  {
    id: 'mem-2024',
    year: '2024',
    date: '2024',
    title: 'Milestones & Endless Support',
    description: "هنا خلصنا ثاونية، و بدانا نشوف الدنيا و نخش جامعة، و فضلنا متمسكين ببعض و مصريين علي بعض. و فضلنا مش شايفين غير بعض في الدنيا كلها، و عمري ما اشوف غيرك يمريم والله العظيم. انا مش عغيرك من الدنيا مهما حصل، عاوزك انتي.",
    images: [
      {
        src: '/images/2024/image (25).jpg',
        alt: '2024 Photo 1',
        caption: ""
      },
      {
        src: '/images/2024/image (26).jpg',
        alt: '2024 Photo 2',
        caption: ""
      },
      {
        src: '/images/2024/image (28).jpg',
        alt: '2024 Photo 3',
        caption: ""
      },
      {
        src: '/images/2024/image (33).jpg',
        alt: '2024 Photo 4',
        caption: ""
      },
      {
        src: '/images/2024/image (34).jpg',
        alt: '2024 Photo 5',
        caption: ""
      }
    ],
    caption:"",
    location: 'Our Milestones',
    quote: "It's not gonna be easy. It's going to be really hard... But I want you. I want all of you, forever, every day.",
    quoteSource: 'The Notebook',
    type: 'memory'
  },
  {
    id: 'mem-2025',
    year: '2025',
    date: '2025',
    title: 'Growing Closer Every Single Day',
    description: "هنا خلاص بقا صعنا خالص، و بقينا نخرج من الصبح و نروح بليل، و نقدي مع بعض اليوم كامل و نعمل حاجات كتير اوي. نجيب لعب و نلعبها مع بعض، نجرب اماكن، نتمشي حتي، و خلاص عملنا حاجات كتير اوي السنة ديه، و بجد من احلي سنين حياتي.",
    images: [
      {
        src: '/images/2025/image (19).jpg',
        alt: '2025 Photo 1',
        caption: ""
      },
      {
        src: '/images/2025/image (20).jpg',
        alt: '2025 Photo 2',
        caption: ""
      },
      {
        src: '/images/2025/image (29).jpg',
        alt: '2025 Photo 3',
        caption: ""
      },
      {
        src: '/images/2025/image (3).jpg',
        alt: '2025 Photo 4',
        caption: ""
      },
      {
        src: '/images/2025/image (32).jpg',
        alt: '2025 Photo 5',
        caption: ""
      },
      {
        src: '/images/2025/image (4).jpg',
        alt: '2025 Photo 6',
        caption: ""
      },
      {
        src: '/images/2025/image (5).jpg',
        alt: '2025 Photo 7',
        caption: ""
      },
      {
        src: '/images/2025/image (6).jpg',
        alt: '2025 Photo 8',
        caption: ""
      }
    ],
    caption: "",
    location: 'Everywhere With Love',
    quote: "You make me happier than I ever thought I could be, and I'll spend the rest of my life trying to make you feel the same way.",
    quoteSource: 'Friends',
    type: 'memory'
  },
  {
    id: 'mem-2026',
    year: '2026',
    date: 'Today • 2026',
    title: 'And Here We Are — Your Special Day',
    description: "سنين يمريم سوا، سنين مع بعض. محستش بلحظه بزهق، محستش لحظه باي حاجة غير اني عاوزك، عاوزك جنبي، عاوزك معايا في اي حاجة. عاوز نبقي سوا و بس، سنين. و انا بحلم باليوم الي هتجوزك فيه، و هيجي يمريم والله العظيم هيجي. هدفي الوحيد ربنا يخليكي ليا يحبيبتي، و ياحلي حاجة في حياتي.",
    images: [
      {
        src: '/images/2026 (now)/image (1).jpg',
        alt: '2026 Memory 1',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (2).jpg',
        alt: '2026 Memory 2',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (7).jpg',
        alt: '2026 Memory 3',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (8).jpg',
        alt: '2026 Memory 4',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (9).jpg',
        alt: '2026 Memory 5',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (10).jpg',
        alt: '2026 Memory 6',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (11).jpg',
        alt: '2026 Memory 7',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (12).jpg',
        alt: '2026 Memory 8',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (13).jpg',
        alt: '2026 Memory 9',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (14).jpg',
        alt: '2026 Memory 10',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (15).jpg',
        alt: '2026 Memory 11',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (16).jpg',
        alt: '2026 Memory 12',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (17).jpg',
        alt: '2026 Memory 13',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image (18).jpg',
        alt: '2026 Memory 14',
        caption: ''
      },
      {
        src: '/images/2026 (now)/image.jpg',
        alt: '2026 Memory 15',
        caption: 'Happy Birthday My Love'
      }
    ],
    caption: 'النهاردة وكل يوم.. إنتِ أجمل حاجة في عمري.',
    location: 'Right Here, Right Now',
    quote: 'You have bewitched me, body and soul, and I love, I love, I love you. I never wish to be parted from you from this day on.',
    quoteSource: 'Pride & Prejudice',
    type: 'milestone'
  }
];

export const birthdayData: BirthdayData = {
  recipient: {
    name: 'Maryam',
    nickname: 'مريم',
    birthdayDate: 'August 29',
    ageCelebration: 'Another year of grace & wonder',
    openingQuote: 'حكاية بدأت سنة 2019.',
  },
  timeline: timelineData,
  finale: {
    transitionText1: "مشيتِ في حكايتنا من سنة 2019 لحد النهاردة...",
    transitionText2: "فاضل حاجة كمان...",
    cakeIntroText: "عديتي على كل ذكرى وكل لحظة حلوة جمعتنا سوا.",
    wishPromptText: "غمضي عينيكِ، اتمني أمنية من كل قلبك، واطفي الشمعة..",
    wishCelebrationHeadline: "Happy Birthday, My little girl. !",
    wishCelebrationSubline: "يا رب كل أمنية اتمنيتيها النهاردة تتحقق وتكون سنتك الجاية كلها فرح وسعادة.",
    letterTitle: "To the Heart of My Story",
    letterGreeting: "روح قلبي",
    letterParagraphs: [
      "كل سنة و انتي طيبة، يروح قلبي. كل سنة و انتي معايا، كل سنة و انتي اجمل و احلي بنت اشوفها في حياتي، كل سنة و احنا سوا في كل حاجة الحلو و الوحش.",
      "كبرتي يمريم متخيلة بقالنا قد ايه سوا و كل ده و لسه قدامنا كتير يروحي لسه قدمنا العمر كله سوا ربنا يخليكي ليا يحبيبتي و ميحرمنيش منك ولا لحظه انا يمريم حياتي قايمه عليكي حياتي كلها قايمه علي اليوم الي يتقفل فيه علينا باب واحد في بيتنا و نتجوز يمريم انا بحلم باليوم ده في كل لحظه في حياتي",
      "كبرتي و بقيتي 20 سنة، متخيلة؟ بقيتي انسة خلاص. انسة مريم راحت، انسة مريم جت، انسة 20 بقا.",
      "انا بحبك اوي يمريم، و مش عاوز غيرك في دنيتي والله. انتي احلي حاجة حصلتلي و هتحصلي.",
      "ربنا يخليكي ليا يحبيبتي.",
      "هتجوزك والله العظيم يمريم."
    ],
    letterClosing: "",
    authorName: "حبيبك و قرة عينك يوسف 😙"
  }
};

import { BirthdayData } from '../types';

export const birthdayData: BirthdayData = {
  recipient: {
    name: "Sophia",
    nickname: "My Star",
    birthdayDate: "August 29",
    ageCelebration: "Another year of grace & wonder",
    openingQuote: "A Day Inside Your Story",
    roomPrompt: "Explore the room to uncover the moments that brought us here.",
  },

  roomObjects: [
    {
      id: 'desk-clock',
      name: 'The Antique Clock',
      category: 'Time & Moments',
      iconName: 'Clock',
      position: { x: 22, y: 38 },
      glowColor: '#E8C98A',
      storySnippet: {
        title: 'Seconds Turned Into Memories',
        subtitle: 'Chapter 01 • The Passage of Time',
        text: 'They say time flies when you are happy, but with you, every minute feels both timeless and unforgettable.',
        actionPrompt: 'Look closer at the photographs nearby...',
      }
    },
    {
      id: 'vintage-camera',
      name: 'The Polaroid Camera',
      category: 'Captured Light',
      iconName: 'Camera',
      position: { x: 38, y: 55 },
      glowColor: '#EFA6B8',
      storySnippet: {
        title: 'Moments Frozen in Warmth',
        subtitle: 'Chapter 01 • Physical Keepsakes',
        text: 'Every single photograph holds a secret laughter, a quiet glance, or a memory that still gives me butterflies.',
        actionPrompt: 'There is a gallery of these moments waiting ahead...',
      }
    },
    {
      id: 'leather-journal',
      name: 'The Storybook Journal',
      category: 'Written Words',
      iconName: 'BookOpen',
      position: { x: 54, y: 46 },
      glowColor: '#B9A7D8',
      storySnippet: {
        title: 'Letters & Unspoken Thoughts',
        subtitle: 'Chapter 01 • Notes Left Behind',
        text: 'There are things I don’t say out loud often enough. I wrote them down so you can keep them close forever.',
        actionPrompt: 'A quiet typewriter waits for your touch...',
      }
    },
    {
      id: 'rose-vase',
      name: 'The Preserved Flower',
      category: 'Gentle Grace',
      iconName: 'Flower2',
      position: { x: 70, y: 62 },
      glowColor: '#F6C6D5',
      storySnippet: {
        title: 'A Bloom That Doesn’t Fade',
        subtitle: 'Chapter 01 • Daily Reminders',
        text: 'A little reminder of your softness, resilience, and the gentle beauty you bring into every space you enter.',
      }
    },
    {
      id: 'gift-box',
      name: 'The Mystery Box',
      category: 'A Little Surprise',
      iconName: 'Gift',
      position: { x: 82, y: 72 },
      glowColor: '#E8C98A',
      storySnippet: {
        title: 'A Celebration Waiting For You',
        subtitle: 'Chapter 01 • Today’s Milestone',
        text: 'Today isn’t just an ordinary date on the calendar. It’s the day the world was blessed with you.',
      }
    },
    {
      id: 'open-window',
      name: 'The Sunlit Window',
      category: 'Portal to Our Story',
      iconName: 'Sparkles',
      position: { x: 62, y: 22 },
      glowColor: '#EFA6B8',
      storySnippet: {
        title: 'Beyond This Normal Day',
        subtitle: 'Chapter 01 • Stepping Into Your Story',
        text: 'The room was just the beginning. Outside this window lies a universe of memories, words, and future dreams.',
        actionPrompt: 'Step through the window →',
        isKeyToNextChapter: true,
      }
    }
  ],

  memories: [
    {
      id: 'mem-1',
      title: 'The Evening We First Lost Track of Time',
      date: 'September 14',
      location: 'The Quiet Rooftop Café',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Warm golden hour portrait',
      caption: 'When minutes melted into hours.',
      story: 'We sat together until the cafe started putting chairs on the tables, talking about everything and nothing. I realized right then that being around you felt like coming home.',
      quote: '“Some conversations feel like they were meant to never end.”',
      moodTag: 'The Beginning'
    },
    {
      id: 'mem-2',
      title: 'Stargazing On That Freezing Hilltop',
      date: 'November 03',
      location: 'Lookout Point',
      imageUrl: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Night sky starry view',
      caption: 'Wrapped in two blankets, sharing hot tea.',
      story: 'Even though our teeth were chattering and neither of us could find the constellations we claimed to know, your laugh made the whole universe feel warm.',
      quote: '“Under a million stars, you were the brightest thing.”',
      moodTag: 'Pure Wonder'
    },
    {
      id: 'mem-3',
      title: 'Getting Caught in the Summer Downpour',
      date: 'June 22',
      location: 'The Old Cobblestone Alley',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Raindrops reflecting golden city lights',
      caption: 'One tiny umbrella, completely soaked shoes.',
      story: 'We gave up on trying to stay dry and just started running through the puddles. That smile on your face is permanently etched into my heart.',
      quote: '“The best days are the ones you never planned.”',
      moodTag: 'Spontaneous Joy'
    },
    {
      id: 'mem-4',
      title: 'Lazy Sunday Morning Record Session',
      date: 'February 18',
      location: 'Sunlit Living Room',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Vintage vinyl player in morning light',
      caption: 'Warm coffee, acoustic guitar, nowhere to rush.',
      story: 'No alarms, no to-do lists. Just the smell of fresh brew and the gentle hum of our favorite records while you read on the sofa with your feet tucked in.',
      quote: '“Peace is not a place; it is a person.”',
      moodTag: 'Quiet Comfort'
    },
    {
      id: 'mem-5',
      title: 'Our Spontaneous Coastal Drive',
      date: 'May 08',
      location: 'The Pacific Ocean Highway',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Golden beach sunset horizon',
      caption: 'Windows rolled down, singing terribly to old songs.',
      story: 'We drove with no destination until the sun dipped right into the water. That golden glow reflecting off your eyes was breathtaking.',
      quote: '“Wherever we go together becomes my favorite place.”',
      moodTag: 'Wild Adventure'
    },
    {
      id: 'mem-6',
      title: 'The Simple Moments In Between',
      date: 'All Year Long',
      location: 'Everywhere With You',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Gentle warmth and holding hands',
      caption: 'The grocery runs, the shared glances, the silent support.',
      story: 'The grand adventures are unforgettable, but what I cherish most is how you make every ordinary Tuesday afternoon feel meaningful and sweet.',
      quote: '“It’s not just what we do; it’s who you are.”',
      moodTag: 'Everyday Magic'
    }
  ],

  messages: [
    {
      id: 'msg-1',
      category: 'appreciation',
      categoryLabel: 'Things I Appreciate',
      title: 'The Way You Illuminate Every Space',
      content: [
        "I appreciate the effortless way you bring kindness into rooms full of strangers.",
        "Your empathy isn't an act; it's the genuine beat of your heart.",
        "Thank you for being someone who listens with full presence, who makes people feel seen, and who never fails to make me feel cherished."
      ],
      signature: 'With infinite gratitude'
    },
    {
      id: 'msg-2',
      category: 'what-makes-me-smile',
      categoryLabel: 'What Makes Me Smile',
      title: 'Your Unfiltered, Contagious Laughter',
      content: [
        "The way your eyes crinkle when something is genuinely hilarious.",
        "The little victory dance you do when good food arrives at the table.",
        "How you remember the smallest inside jokes from months ago and bring them up at the perfect comedic moment."
      ],
      signature: 'Always smiling with you'
    },
    {
      id: 'msg-3',
      category: 'admiration',
      categoryLabel: 'Things I Admire',
      title: 'Your Quiet, Undeniable Strength',
      content: [
        "I admire how fiercely you pursue your passions, even when the road is steep.",
        "You carry yourself with a gentle grace that masks an unbreakable resolve.",
        "Watching you overcome challenges inspires me more than words can ever say."
      ],
      signature: 'Your biggest cheerleader'
    },
    {
      id: 'msg-4',
      category: 'little-things',
      categoryLabel: 'Little Things I Remember',
      title: 'The Details You Think I Miss',
      content: [
        "I remember how you take your coffee in the morning when you need a boost.",
        "I remember the playlist you put on when you want to focus.",
        "I remember the way you squeeze my hand three times when we are walking together."
      ],
      signature: 'Saved in my memory forever'
    },
    {
      id: 'msg-5',
      category: 'favorite-memories',
      categoryLabel: 'Favorite Memories',
      title: 'The Unplanned Nights',
      content: [
        "My favorite moments were never the ones on strict itineraries.",
        "They were the midnight kitchen talks, the sudden burst of laughter over spilled tea, and the quiet walks under streetlamps.",
        "With you, the best moments are always the unscripted ones."
      ],
      signature: 'Holding these close'
    },
    {
      id: 'msg-6',
      category: 'hopes',
      categoryLabel: 'Things I Hope You Know',
      title: 'Never Doubt Your Light',
      content: [
        "I hope you always remember how deeply loved and respected you are.",
        "I hope you never allow doubt to dim your vibrant spirit.",
        "You are capable of unimaginable greatness, and I will always stand beside you, cheering for your dreams."
      ],
      signature: 'Forever believing in you'
    }
  ],

  futureMoments: [
    {
      id: 'fut-1',
      tag: 'Dream #01',
      title: 'A Place We Haven’t Visited Yet',
      description: 'Standing side by side beneath the aurora borealis, breath fogging in the arctic air, wrapped in heavy coats with the night sky dancing above us.',
      promise: 'We will pack our warmest bags and make this real.',
      symbol: 'Compass',
      bgGradient: 'from-[#1A1429] via-[#241B38] to-[#0D0914]'
    },
    {
      id: 'fut-2',
      tag: 'Dream #02',
      title: 'A Morning in a Quiet Coastal Villa',
      description: 'Waking up to the sound of crashing Mediterranean waves, fresh fruit on a stone terrace, reading books with no schedule to chase.',
      promise: 'A week of pure stillness just for you.',
      symbol: 'Sun',
      bgGradient: 'from-[#241A20] via-[#331C28] to-[#120B10]'
    },
    {
      id: 'fut-3',
      tag: 'Dream #03',
      title: 'A Milestone We Will Celebrate Together',
      description: 'Popping champagne when you conquer the next big career milestone you’ve been working so tirelessly for. I’ll be the loudest one cheering in the room.',
      promise: 'Every victory of yours is our celebration.',
      symbol: 'Sparkles',
      bgGradient: 'from-[#261E14] via-[#362714] to-[#120D08]'
    },
    {
      id: 'fut-4',
      tag: 'Dream #04',
      title: 'A Lifetime of Stories Still Unwritten',
      description: 'Ten, twenty, fifty years from now—still holding hands on autumn evening walks, laughing at the same silly jokes, with a thousand new memories made.',
      promise: 'My promise to you: I will be there for every chapter.',
      symbol: 'Heart',
      bgGradient: 'from-[#201424] via-[#2D1733] to-[#0F0812]'
    }
  ],

  finale: {
    cakeIntroText: "You have traveled through the memories we've lived, the words I hold close, and the future waiting ahead.",
    wishPromptText: "Close your eyes, make a wish from the bottom of your heart, and blow out the candle.",
    wishCelebrationHeadline: "Happy Birthday, Sophia! ✨",
    wishCelebrationSubline: "May every single wish you made today unfold in the most wonderful way.",
    letterTitle: "To the Heart of My Universe",
    letterGreeting: "My dearest Sophia,",
    letterParagraphs: [
      "Happy Birthday! Today is the day to celebrate everything that makes you who you are: your kindness, your brilliance, your infectious laugh, and the immense love you give so freely to the world.",
      "Looking back at our journey, every memory feels like a precious keepsake. You have turned ordinary moments into poetry, and you have given my world a warmth I never knew before you walked into it.",
      "As you step into this new year of your life, I hope you chase every dream without hesitation. I hope you give yourself the same grace you give to others, and I hope you know that you will never have to walk through this life alone.",
      "Thank you for being my favorite person, my greatest adventure, and the best story I have ever lived."
    ],
    letterClosing: "With all my love, gratitude, and devotion,",
    authorName: "Forever Yours ❤️"
  }
};

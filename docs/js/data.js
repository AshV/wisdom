/**
 * wiz-theme Showcase Data Store
 * Contains curated quotes, author dossiers, mood definitions, translations,
 * and API documentation specs.
 */

export const MOODS = {
  reflective: {
    id: 'reflective',
    name: 'Reflective',
    nameHi: 'चिंतनशील',
    accent: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.45)',
    glowSoft: 'rgba(99, 102, 241, 0.18)',
    border: 'rgba(99, 102, 241, 0.4)',
    bg: '#0f1124',
    headerBg: '#151733',
    freq: 432, // Hz
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    description: 'Deep introspection, quiet contemplation, and inner peace.'
  },
  motivational: {
    id: 'motivational',
    name: 'Motivational',
    nameHi: 'प्रेरणादायी',
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    glowSoft: 'rgba(245, 158, 11, 0.18)',
    border: 'rgba(245, 158, 11, 0.4)',
    bg: '#1c1507',
    headerBg: '#271e09',
    freq: 528,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    description: 'Action, drive, perseverance, and fearless focus.'
  },
  serene: {
    id: 'serene',
    name: 'Serene',
    nameHi: 'शांत व एकाग्र',
    accent: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.45)',
    glowSoft: 'rgba(6, 182, 212, 0.18)',
    border: 'rgba(6, 182, 212, 0.4)',
    bg: '#081720',
    headerBg: '#0e2433',
    freq: 396,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    description: 'Tranquil presence, mindfulness, and release of friction.'
  },
  bold: {
    id: 'bold',
    name: 'Bold',
    nameHi: 'तेजस्वी व साहसी',
    accent: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.45)',
    glowSoft: 'rgba(239, 68, 68, 0.18)',
    border: 'rgba(239, 68, 68, 0.4)',
    bg: '#1c0a0c',
    headerBg: '#2a0e12',
    freq: 639,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    description: 'Unapologetic truth, courage in adversity, and virtue in action.'
  },
  melancholic: {
    id: 'melancholic',
    name: 'Melancholic',
    nameHi: 'गंभीर व मर्मस्पर्शी',
    accent: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.45)',
    glowSoft: 'rgba(139, 92, 246, 0.18)',
    border: 'rgba(139, 92, 246, 0.4)',
    bg: '#140c24',
    headerBg: '#1e1236',
    freq: 417,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    description: 'Poignant nostalgia, sacred longing, and the beauty of human fragility.'
  },
  joyful: {
    id: 'joyful',
    name: 'Joyful',
    nameHi: 'आनंदमय',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    glowSoft: 'rgba(16, 185, 129, 0.18)',
    border: 'rgba(16, 185, 129, 0.4)',
    bg: '#081a14',
    headerBg: '#0d2b20',
    freq: 741,
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    description: 'Gratitude, lightness of being, celebration, and vitality.'
  },
  philosophical: {
    id: 'philosophical',
    name: 'Philosophical',
    nameHi: 'दार्शनिक',
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.45)',
    glowSoft: 'rgba(167, 139, 250, 0.18)',
    border: 'rgba(167, 139, 250, 0.4)',
    bg: '#140f29',
    headerBg: '#1f173d',
    freq: 852,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
    description: 'Foundational existential wisdom, nature of reality, and ethics.'
  },
  romantic: {
    id: 'romantic',
    name: 'Romantic',
    nameHi: 'प्रेम व अनुराग',
    accent: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.45)',
    glowSoft: 'rgba(236, 72, 153, 0.18)',
    border: 'rgba(236, 72, 153, 0.4)',
    bg: '#200b18',
    headerBg: '#301124',
    freq: 963,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #fb7185 100%)',
    description: 'Transcendence of the heart, devotion, and mystical communion.'
  }
};

export const QUOTES = [
  {
    id: 'q001',
    lang: 'en',
    content: 'The wound is the place where the light enters you.',
    author: 'Rumi',
    authorSlug: 'rumi',
    category: 'Wisdom',
    categorySlug: 'wisdom',
    mood: 'reflective',
    tags: ['healing', 'light', 'growth', 'resilience'],
    duration: 8,
    sourceWork: 'The Masnavi (Mathnawi), Book I',
    reflectionPrompt: 'What painful fracture or setback from your past eventually carved out the capacity for your greatest wisdom and empathy today?',
    explanation: "Suffering often feels like a senseless rupture, something that breaks our lives apart and leaves us diminished. Yet Rumi flips this instinct on its head: pain is precisely what shatters the hardened, defensive shell of the ego. When our certainties crumble, the emotional armor we've spent years building finally cracks, allowing compassion, humility, and deeper awareness to flood in.\n\nThe wound is not an ending or an indignity to be hidden away. It is the exact point of vulnerability through which genuine wisdom and light enter your life.",
    practicalInsight: "When grief or disappointment arrives, resist the urge to immediately numb or armor yourself. Treat the crack in your certainty as an opening to learn something honest about who you are.",
    originalQuote: 'The wound is the place where the Light enters you.'
  },
  {
    id: 'q002',
    lang: 'en',
    content: 'What you seek is seeking you.',
    author: 'Rumi',
    authorSlug: 'rumi',
    category: 'Philosophy',
    categorySlug: 'philosophy',
    mood: 'philosophical',
    tags: ['purpose', 'destiny', 'seeking', 'destiny'],
    duration: 7,
    sourceWork: 'The Masnavi (Mathnawi)',
    reflectionPrompt: 'If the quiet yearning in your heart is an invitation waiting to meet you, what first step towards it are you hesitating to take?',
    explanation: "We often think of purpose as a distant prize we must chase down, or meaning as something outside ourselves that we have to hunt and capture. Rumi reminds us that genuine spiritual longing is never a one-way street. Just as thirst in a wanderer's throat implies the real existence of water, your longing for truth, connection, and purpose is proof that those very realities are already pulling you toward them.\n\nYou are not an isolated seeker shouting into an empty void. The deep yearn in your chest is the magnetic resonance of what you are meant to embody.",
    practicalInsight: 'Stop treating your deepest aspirations like an impossible chase. Trust that the quiet pull toward what matters to you is already guiding your next step.',
    originalQuote: 'What you are seeking is seeking you.'
  },
  {
    id: 'q003',
    lang: 'en',
    content: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
    authorSlug: 'marcus-aurelius',
    category: 'Philosophy',
    categorySlug: 'philosophy',
    mood: 'reflective',
    tags: ['mindset', 'happiness', 'stoicism', 'clarity'],
    duration: 8,
    sourceWork: 'Meditations, Book III',
    reflectionPrompt: "Identify a source of friction in your day. How much of your stress comes from the actual event, and how much comes from the story you're telling yourself about it?",
    explanation: 'Most of the anxiety and exhaustion we experience does not come from events themselves, but from the relentless internal commentary we run on top of them. Marcus Aurelius noticed that circumstances are neutral facts—rain falls, plans get disrupted, people behave selfishly. The suffering begins only when our ego attaches a catastrophic story to what happened.\n\nBy taking ownership of your own judgments, you reclaim your inner fortress. You cannot control what happens around you, but nothing can force you to interpret it as your ruin.',
    practicalInsight: 'When friction strikes, separate the raw event from your reaction to it. You have the sovereign freedom to choose calm over panic.',
    originalQuote: 'The happiness of your life depends upon the quality of your thoughts.'
  },
  {
    id: 'q004',
    lang: 'en',
    content: 'Waste no more time arguing about what a good man should be. Be one.',
    author: 'Marcus Aurelius',
    authorSlug: 'marcus-aurelius',
    category: 'Resilience',
    categorySlug: 'resilience',
    mood: 'bold',
    tags: ['action', 'virtue', 'stoicism', 'integrity'],
    duration: 7,
    sourceWork: 'Meditations, Book X, 16',
    reflectionPrompt: 'Where in your work or relationships are you overthinking the ideal approach instead of taking the simple, honorable action right in front of you?',
    explanation: 'It is endlessly seductive to debate ethics, read books on self-improvement, and theorize about how an ideal person ought to live. It gives us the comfortable illusion of progress while saving us from the real risk of action. Marcus, running an empire through plague and warfare, had zero patience for philosophical posturing.\n\nVirtue is not a theoretical debate or an identity you wear for others. It is the immediate, unglamorous choice to be honest, courageous, and fair in whatever situation sits in front of you right now.',
    practicalInsight: "Drop the debate over the 'perfect' way to act. Do the simple, decent, honorable thing waiting on your desk or in your relationships right now.",
    originalQuote: 'Waste no more time arguing over what a good man should be. Be one.'
  },
  {
    id: 'q005',
    lang: 'en',
    content: 'There is no greater agony than bearing an untold story inside you.',
    author: 'Maya Angelou',
    authorSlug: 'maya-angelou',
    category: 'Creativity',
    categorySlug: 'creativity',
    mood: 'melancholic',
    tags: ['expression', 'creativity', 'courage', 'truth'],
    duration: 8,
    sourceWork: 'I Know Why the Caged Bird Sings (1969)',
    reflectionPrompt: 'What truth or creative vision have you been keeping silent, and what would happen if you gave it a voice today?',
    explanation: "Holding unexpressed truth, grief, or creative passion inside our chests creates an agonizing internal pressure. When we keep silent out of fear of judgment, the unspoken reality doesn't disappear—it turns inward, breeding bitterness, fatigue, and self-doubt.\n\nMaya Angelou's insight reminds us that the temporary vulnerability of speaking your truth is nothing compared to the slow, quiet erosion of burying who you are.",
    practicalInsight: "Find a safe, authentic outlet for what you've been holding back. Write it down, share it with someone you trust, or express it through creative work.",
    originalQuote: 'There is no greater agony than bearing an untold story inside you.'
  },
  {
    id: 'q006',
    lang: 'en',
    content: 'A journey of a thousand miles begins with a single step.',
    author: 'Lao Tzu',
    authorSlug: 'lao-tzu',
    category: 'Wisdom',
    categorySlug: 'wisdom',
    mood: 'motivational',
    tags: ['beginnings', 'action', 'patience', 'mastery'],
    duration: 8,
    sourceWork: 'Tao Te Ching, Chapter 64',
    reflectionPrompt: 'What ambitious undertaking has felt so vast that it immobilized you? What tiny, humble movement can you make right now?',
    explanation: 'Grand ambitions often paralyze us because our minds fixate on the sheer scale of the summit rather than the ground beneath our feet. Ancient Taoist thought teaches that the most majestic oak tree grew from a fragile seedling, and the highest terrace began with a basket of earth.\n\nGreatness is not achieved in an explosive leap; it is the compound interest of small, faithful, daily gestures.',
    practicalInsight: 'Stop waiting for perfect momentum. Take the single, imperfect step that is directly in front of you right now.',
    originalQuote: 'A journey of a thousand leagues begins beneath the feet.'
  },
  {
    id: 'q007',
    lang: 'en',
    content: 'We suffer more often in imagination than in reality.',
    author: 'Seneca',
    authorSlug: 'seneca',
    category: 'Peace',
    categorySlug: 'peace',
    mood: 'serene',
    tags: ['stoicism', 'anxiety', 'perspective', 'tranquility'],
    duration: 8,
    sourceWork: 'Moral Letters to Lucilius, Letter XIII',
    reflectionPrompt: 'Which anticipated disaster or anxiety is currently occupying your mind that has not actually occurred?',
    explanation: 'Human imagination is a miraculous gift that easily mutates into our private tormentor. We pre-live catastrophes that may never arrive, compounding present peace with imaginary grief. Seneca reminds us to anchor firmly in the empirical reality of the present moment.\n\nDo not borrow sorrow from tomorrow. Deal only with what is actually sitting upon your table today.',
    practicalInsight: 'Ask yourself: "Is this catastrophe happening right now at this exact second?" If not, release the phantom and return to breath.',
    originalQuote: 'We are more often frightened than hurt; and we suffer more from imagination than from reality.'
  },
  {
    id: 'q008',
    lang: 'en',
    content: 'Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.',
    author: 'Rumi',
    authorSlug: 'rumi',
    category: 'Purpose',
    categorySlug: 'purpose',
    mood: 'romantic',
    tags: ['love', 'calling', 'intuition', 'surrender'],
    duration: 8,
    sourceWork: 'The Masnavi',
    reflectionPrompt: 'What deep fascination or devotion continues to pull at your attention despite worldly advice to ignore it?',
    explanation: 'The analytical mind always demands quantifiable guarantees and conventional validation. But genuine calling operates on subtle, resonant magnetism. When you honor what quickens your spirit, you harmonize with your authentic life path.\n\nTrust the intuitive gravity of authentic love—it carries a navigation system far older and wiser than fear.',
    practicalInsight: 'Carve out an hour today for the project, subject, or craft that calls to your soul, free from practical justification.',
    originalQuote: 'Let yourself be silently drawn by the strange pull of what you really love.'
  },
  // Hindi Showcase Quotes
  {
    id: 'q-hi-001',
    lang: 'hi',
    content: 'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥',
    author: 'कबीर दास',
    authorSlug: 'kabir',
    category: 'प्रेम व ज्ञान',
    categorySlug: 'love-wisdom',
    mood: 'philosophical',
    tags: ['प्रेम', 'ज्ञान', 'भक्ति', 'सत्य'],
    duration: 8,
    sourceWork: 'कबीर ग्रंथावली',
    reflectionPrompt: 'क्या आपके ज्ञान ने आपके हृदय को अधिक संवेदनशील, विनम्र और करुणामय बनाया है?',
    explanation: 'कबीर दास जी कहते हैं कि संसार में लोग बड़ी-बड़ी पुस्तकें पढ़कर काल के गाल में समा गए, परंतु केवल किताबी ज्ञान से कोई वास्तविक ज्ञानी न बन सका। जिसने हृदय में शुद्ध प्रेम और करुणा का मर्म समझ लिया, वही सच्चा ज्ञानी और प्रबुद्ध है।\n\nआंतरिक संवेदनशीलता के बिना समस्त पांडित्य मात्र अहंकार का आवरण है।',
    practicalInsight: 'आज किसी भी व्यक्ति से मिलते समय केवल बौद्धिक तर्क देने के बजाय सहानुभूति और सम्मान से संवाद करें।',
    originalQuote: 'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय।'
  },
  {
    id: 'q-hi-002',
    lang: 'hi',
    content: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य की प्राप्ति न हो जाए।',
    author: 'स्वामी विवेकानंद',
    authorSlug: 'vivekananda',
    category: 'साहस व प्रेरणा',
    categorySlug: 'courage-inspiration',
    mood: 'motivational',
    tags: ['संकल्प', 'साहस', 'कर्म', 'लक्ष्य'],
    duration: 8,
    sourceWork: 'कठोपनिषद् आह्वान',
    reflectionPrompt: 'कौन सा ऐसा उच्च आदर्श है जिसके प्रति आपका समर्पण और निष्ठा कभी कमजोर नहीं होनी चाहिए?',
    explanation: 'स्वामी विवेकानंद ने मनुष्य को उसकी असीम आंतरिक दिव्य शक्ति का स्मरण कराया। वे मानते थे कि दुर्बलता ही एकमात्र पाप है। जब मनुष्य अपने अज्ञान और संशय की निद्रा को त्याग कर अपने लक्ष्य में एकाग्र हो जाता है, तब कोई भी सांसारिक बाधा उसे डिगा नहीं सकती।',
    practicalInsight: 'आलस्य और आत्म-संदेह को एक तरफ रखकर अपने सबसे महत्वपूर्ण कार्य की ओर एक साहसिक कदम आज ही उठाएं।',
    originalQuote: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।'
  },
  {
    id: 'q-hi-003',
    lang: 'hi',
    content: 'जो कल था उसे भूलकर आज एक नई शुरुआत करो, क्योंकि शांति अतीत में नहीं वर्तमान में है।',
    author: 'गौतम बुद्ध',
    authorSlug: 'buddha',
    category: 'शांति व ध्यान',
    categorySlug: 'peace-meditation',
    mood: 'serene',
    tags: ['शांति', 'वर्तमान', 'ध्यान', 'मुक्ति'],
    duration: 8,
    sourceWork: 'धम्मपद',
    reflectionPrompt: 'अतीत की कौन सी ऐसी पुरानी ग्लानि या बात है जिसे अब मन से विसर्जित कर देने का समय आ गया है?',
    explanation: 'भगवान बुद्ध ने सिखाया कि मानव चेतना का अधिकांश क्लेश अतीत के पश्चाताप और भविष्य की चिंताओं से उत्पन्न होता है। जब मन इस क्षण की सच्चाई में बिना राग-द्वेष के ठहरता है, तभी निर्वाण और सहज शांति का प्रकटीकरण होता है।\n\nवर्तमान ही एकमात्र जीवित सत्य है।',
    practicalInsight: 'तीन गहरी सजग सांसें लें और अतीत के बोझ को इसी क्षण अपनी श्वास के साथ विदा कर दें।',
    originalQuote: 'शांति भीतर से आती है, बाहर मत खोजो।'
  },
  {
    id: 'q-hi-004',
    lang: 'hi',
    content: 'मन के हारे हार है, मन के जीते जीत। कहे कबीर हरि पाइए, मन ही की परतीत॥',
    author: 'कबीर दास',
    authorSlug: 'kabir',
    category: 'आत्मबल',
    categorySlug: 'inner-strength',
    mood: 'bold',
    tags: ['मन', 'संकल्प', 'आत्मबल', 'विश्वास'],
    duration: 8,
    sourceWork: 'कबीर साखी',
    reflectionPrompt: 'क्या आपके मन का संकल्प आपकी बाहरी परिस्थितियों से अधिक बलवान है?',
    explanation: 'जीवन के समर में पराजय परिस्थितियों से नहीं, मन के समर्पण से होती है। यदि मन में दृढ़ विश्वास और निष्ठा है तो विपरीत से विपरीत स्थिति भी पराजित हो जाती है। समस्त साधना और विजय का केंद्र अंतःकरण की आस्था है।',
    practicalInsight: 'किसी भी विकट स्थिति में स्वयं को याद दिलाएं कि बाहरी परिस्थितियां अस्थाई हैं, मेरा आंतरिक बल अचल है।',
    originalQuote: 'मन के हारे हार है मन के जीते जीत।'
  },
  {
    id: 'q-hi-005',
    lang: 'hi',
    content: 'ब्रह्मांड की सारी शक्तियां पहले से हमारी हैं। वो हमीं हैं जो अपनी आँखों पर हाथ रख लेते हैं और फिर रोते हैं कि कितना अंधकार है!',
    author: 'स्वामी विवेकानंद',
    authorSlug: 'vivekananda',
    category: 'चेतना',
    categorySlug: 'consciousness',
    mood: 'motivational',
    tags: ['शक्ति', 'चेतना', 'आत्मज्ञान', 'सत्य'],
    duration: 8,
    sourceWork: 'विवेकानंद साहित्य संग्रह',
    reflectionPrompt: 'आपने अपने किन सीमित विचारों और भ्रांतियों से अपनी ही असीम क्षमताओं को ढक रखा है?',
    explanation: 'हम अपनी दीनता और असहायता के स्वयं रचयिता हैं। जब हम अपनी सीमाओं पर ध्यान केंद्रित करते हैं, तो अनंत संभावनाओं का सूर्य होते हुए भी हम अंधकार का अनुभव करते हैं। अपनी आँखों से भय और संकोच का पर्दा हटाते ही दिव्य सामर्थ्य जागृत हो उठता है।',
    practicalInsight: 'स्वयं को कभी दीन या कमजोर न कहें। अपनी क्षमताओं पर पूर्ण आस्था रखते हुए आगे बढ़ें।',
    originalQuote: 'All power is within you; you can do anything and everything.'
  }
];

export const AUTHORS = {
  rumi: {
    slug: 'rumi',
    name: 'Rumi',
    fullName: 'Jalāl ad-Dīn Muḥammad Rūmī',
    era: '13th Century (1207–1273)',
    tradition: 'Sufi Mysticism & Persian Poetry',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rumi',
    summary: 'Master of spiritual ecstasy, timeless devotion, and the alchemy of heartbreak.',
    bio: 'Jalāl ad-Dīn Muḥammad Rūmī was a 13th-century Persian poet, Islamic jurist, and mystic whose words have transcended linguistic and religious boundaries. Born in Balkh (present-day Afghanistan), he settled in Konya, Turkey. Following his transformative encounter with the wandering dervish Shams of Tabriz, Rumi poured his grief and awakening into thousands of verses celebrating love as the primary cosmic force.',
    whyTimeless: "Rumi's poetry does not intellectualize spiritual truth—it sings it. His verses speak directly to human vulnerability, turning grief into an open gateway for transcendent love.",
    keyWorks: [
      { title: 'The Masnavi (Mathnawi)', description: 'A six-volume poetic masterpiece often called "the Quran in Persian", containing 25,000 verses of parables, wisdom, and mystical allegory.' },
      { title: 'Divan-e Shams-e Tabrizi', description: 'A profound collection of passionate lyrical ghazals dedicated to his spiritual mentor Shams.' },
      { title: 'Fihi Ma Fihi (Discourses of Rumi)', description: 'Prose discourses answering profound philosophical questions on faith, devotion, and presence.' }
    ],
    pillars: [
      { concept: 'The Alchemy of the Wound', description: 'Suffering is not punitive; it shatters egoic barriers so grace and insight can flood in.' },
      { concept: 'Divine Magnetism', description: 'Longing is evidence of connection: "What you seek is seeking you."' },
      { concept: 'Radical Inclusivity', description: '"Come, come, whoever you are. Wanderer, worshipper, lover of leaving. Ours is not a caravan of despair."' }
    ]
  },
  'marcus-aurelius': {
    slug: 'marcus-aurelius',
    name: 'Marcus Aurelius',
    fullName: 'Marcus Aurelius Antoninus Augustus',
    era: '2nd Century AD (121–180 AD)',
    tradition: 'Late Roman Stoicism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Marcus_Aurelius',
    summary: 'Philosopher Emperor who forged an impregnable inner fortress amid war and plague.',
    bio: 'Marcus Aurelius ruled the Roman Empire at the peak of its power while enduring the Antonine Plague, frontier wars along the Danube, and constant court intrigue. Every night in his military tent, he penned Meditations—private journal reflections never intended for public eyes—holding himself rigorously accountable to Stoic duty, humility, and rational justice.',
    whyTimeless: 'Marcus proves that Stoicism is not cold detachment, but an ardent commitment to moral responsibility and peace of mind amid unrelenting public pressures.',
    keyWorks: [
      { title: 'Meditations (Τὰ εἰς ἑαυτόν)', description: 'Twelve private books of spiritual exercises, aphorisms, and psychological self-counsel.' }
    ],
    pillars: [
      { concept: 'The Inner Citadel', description: 'Your external circumstances may be besieged, but your governing reason remains sovereign and unconquerable.' },
      { concept: 'Dichotomy of Control', description: 'Separate what belongs to your volition (thoughts, virtues, responses) from external fortune (health, reputation, fate).' },
      { concept: 'Amor Fati & Impermanence', description: 'Embrace whatever fortune brings as fuel for virtue, remembering that all fame turns to dust.' }
    ]
  },
  'maya-angelou': {
    slug: 'maya-angelou',
    name: 'Maya Angelou',
    fullName: 'Marguerite Annie Johnson',
    era: '20th–21st Century (1928–2014)',
    tradition: 'Civil Rights, American Poetry & Memoir',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Maya_Angelou',
    summary: 'A triumphant, lyrical voice of moral courage, unyielding dignity, and creative liberation.',
    bio: 'Maya Angelou rose from childhood trauma and silence in the segregated American South to become one of the most revered literary forces of the modern era. Poet, autobiographer, dramatist, and civil rights warrior alongside Dr. Martin Luther King Jr. and Malcolm X, her work redefined memoir with unapologetic vulnerability and rhythmic power.',
    whyTimeless: "Angelou's life and writing embody the indomitable human spirit. Her work affirms that one's history cannot dictate one's destiny.",
    keyWorks: [
      { title: 'I Know Why the Caged Bird Sings', description: 'Groundbreaking autobiography depicting the triumph of voice and resilience over oppression.' },
      { title: 'And Still I Rise', description: 'Celebrated poetry collection capturing fierce self-respect and joy in the face of prejudice.' },
      { title: 'On the Pulse of Morning', description: 'Historic presidential inaugural poem heard by millions worldwide.' }
    ],
    pillars: [
      { concept: 'The Liberation of Voice', description: 'Silence compounds trauma; telling your honest story is an act of sovereign healing.' },
      { concept: 'Unbroken Dignity', description: '"You may encounter many defeats, but you must not be defeated."' },
      { concept: 'Empathic Humanity', description: '"I’ve learned that people will forget what you said, but people will never forget how you made them feel."' }
    ]
  },
  kabir: {
    slug: 'kabir',
    name: 'कबीर दास (Kabir Das)',
    fullName: 'संत कबीर दास',
    era: '15th Century (1398–1518)',
    tradition: 'Bhakti Movement & Sant Mat',
    wikipediaUrl: 'https://hi.wikipedia.org/wiki/%E0%A4%95%E0%A4%AC%E0%A5%80%E0%A4%B0',
    summary: 'निडर संत, समाज सुधारक और अंतरात्मा के परम सत्य के अन्वेषक।',
    bio: 'संत कबीर दास 15वीं शताब्दी के भारत के महानतम रहस्यवादी कवि और समाज सुधारक थे। उन्होंने काशी की धरती से पाखंड, बाह्य आडंबर, जातिवाद और संकीर्ण संप्रदायवाद पर सीधा प्रहार किया। उनकी साखियां और दोहे आम बोलचाल की भाषा में जीवन के गूढ़तम आध्यात्मिक सत्यों को सरल बना देते हैं।',
    whyTimeless: 'कबीर के विचार आज भी सामाजिक समरसता, आंतरिक शुद्धि और निडरता के सबसे प्रासंगिक प्रकाशस्तंभ हैं।',
    keyWorks: [
      { title: 'कबीर बीजक (Kabir Bijak)', description: 'कबीर पंथ का प्रामाणिक एवं मूल ग्रंथ, जिसमें साखी, सबद और रमैनी का संग्रह है।' },
      { title: 'कबीर ग्रंथावली', description: 'कबीर के प्रामाणिक दोहों और पदों का विस्तृत शास्त्रीय संकलन।' },
      { title: 'अनुराग सागर', description: 'सृष्टि रचना और आत्म-मुक्ति का दार्शनिक संवाद।' }
    ],
    pillars: [
      { concept: 'सहज साधना (Natural Simplicity)', description: 'ईश्वर किसी मंदिर या मस्जिद में नहीं, प्रत्येक जीव के हृदय में विराजता है।' },
      { concept: 'आडंबर विहीन सत्य', description: 'कोरे किताबी ज्ञान से परे वास्तविक अनुभव और प्रेम की सर्वोच्चता।' },
      { concept: 'मन की विजय', description: 'बाहरी संसार से लड़ने के बजाय अंतःकरण के विकारों पर विजय पाना ही सच्चा योग है।' }
    ]
  },
  vivekananda: {
    slug: 'vivekananda',
    name: 'स्वामी विवेकानंद',
    fullName: 'नरेन्द्रनाथ दत्त (Swami Vivekananda)',
    era: '19th–20th Century (1863–1902)',
    tradition: 'Advaita Vedanta & Practical Spirituality',
    wikipediaUrl: 'https://hi.wikipedia.org/wiki/%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%AE%E0%A5%80_%E0%A4%B5%E0%A4%BF%E0%A4%B5%E0%A5%87%E0%A4%95%E0%A4%BE%E0%A4%A8%E0%A4%82%E0%A4%A6',
    summary: 'युवा चेतना के संवाहक, वेदांत के प्रणेता और भारत की आध्यात्मिक चेतना के अग्रदूत।',
    bio: 'स्वामी विवेकानंद रामकृष्ण परमहंस के पट्टशिष्य और आधुनिक भारत के सबसे तेजस्वी युगपुरुष थे। 1893 के शिकागो धर्म संसद में उनके ऐतिहासिक संबोधन ने सम्पूर्ण पाश्चात्य जगत को भारत के सर्वसमावेशी वेदांत दर्शन से विस्मित कर दिया। उन्होंने युवाओं को आत्मबल, सेवा और कर्मयोग का जीवन जीने का संदेश दिया।',
    whyTimeless: 'विवेकानंद का संदेश मनुष्य की सुप्त शक्तियों को झकझोरने वाला शाश्वत शंखनाद है।',
    keyWorks: [
      { title: 'राज योग (Raja Yoga)', description: 'चित्त की वृत्तियों के निरोध और ध्यान की वैज्ञानिक व्याख्या।' },
      { title: 'कर्म योग (Karma Yoga)', description: 'फल की आसक्ति से मुक्त होकर लोककल्याणकारी कर्म करने का मार्गदर्शक ग्रंथ।' },
      { title: 'शिकागो व्याख्यान', description: 'सार्वभौमिक बंधुत्व और सहिष्णुता पर विश्वविख्यात संबोधन।' }
    ],
    pillars: [
      { concept: 'आत्म-श्रद्धा (Supreme Self-Confidence)', description: 'मनुष्य के भीतर समस्त अनंत संभावनाएं पूर्व से ही विद्यमान हैं।' },
      { concept: 'मानव सेवा ही ईश्वर सेवा', description: 'दरिद्र नारायण और असहायों की सेवा ही सर्वोत्तम पूजा है।' },
      { concept: 'अभय (Fearlessness)', description: 'भय ही दुर्बलता की जड़ है; निर्भयता ही सच्चा धर्म है।' }
    ]
  },
  buddha: {
    slug: 'buddha',
    name: 'गौतम बुद्ध (Gautama Buddha)',
    fullName: 'सिद्धार्थ गौतम (Siddhartha Gautama)',
    era: '6th–5th Century BCE (c. 563–483 BCE)',
    tradition: 'Early Buddhism & Vipassana',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/The_Buddha',
    summary: 'The Awakened Sage who charted the Middle Path from suffering to complete liberation.',
    bio: 'Born Prince Siddhartha of Kapilavastu, the Buddha renounced worldly luxury after encountering the inescapable realities of old age, sickness, and death. Through years of asceticism and intense meditation beneath the Bodhi tree at Bodh Gaya, he attained supreme enlightenment, discovering the Four Noble Truths and the Eightfold Noble Path.',
    whyTimeless: "The Buddha's teachings are thoroughly empirical, psychological, and compassionate—requiring no dogma, only keen mindfulness and ethical conduct.",
    keyWorks: [
      { title: 'Dhammapada (धम्मपद)', description: 'Verses on mind training, right conduct, and liberation.' },
      { title: 'Dhammacakkappavattana Sutta', description: 'The First Sermon setting in motion the Wheel of Dhamma at Sarnath.' }
    ],
    pillars: [
      { concept: 'The Four Noble Truths', description: 'Suffering exists, has a cause (craving/ignorance), can cease, and has a clear path to cessation.' },
      { concept: 'Anicca & Anatta (Impermanence & Non-Self)', description: 'All conditioned phenomena are transient and devoid of a fixed, separate ego.' },
      { concept: 'The Noble Eightfold Path', description: 'Cultivation of right view, resolve, speech, action, livelihood, effort, mindfulness, and samadhi.' }
    ]
  },
  'lao-tzu': {
    slug: 'lao-tzu',
    name: 'Lao Tzu',
    fullName: 'Laozi (Old Master)',
    era: '6th–5th Century BCE',
    tradition: 'Philosophical Taoism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Laozi',
    summary: 'Master of water-like wisdom, humility, and the effortless flow of the Tao.',
    bio: 'Lao Tzu is the legendary founder of Taoism and keeper of archives at the Zhou dynasty court. Disillusioned with decaying political integrity, he rode west toward the mountain pass. At the request of the gatekeeper Yinxi, he paused to record eighty-one paradoxical, crystalline chapters on simplicity, soft power, and the organic order of the cosmos.',
    whyTimeless: "Lao Tzu teaches that yielding overcomes stiffness, silence outlasts clamor, and simplicity cures modern frenzy.",
    keyWorks: [
      { title: 'Tao Te Ching (道德經)', description: 'The Classic of the Way of Virtue, composed in 81 short, poetic verses.' }
    ],
    pillars: [
      { concept: 'Wu Wei (Effortless Action)', description: 'Acting without forcing; aligning with natural currents rather than swimming upstream.' },
      { concept: 'The Supreme Virtue of Water', description: 'Water benefits all things without contending, seeking the low places others despise.' },
      { concept: 'Simplicity & Contentment', description: '"He who knows that enough is enough will always have enough."' }
    ]
  },
  seneca: {
    slug: 'seneca',
    name: 'Seneca',
    fullName: 'Lucius Annaeus Seneca',
    era: '1st Century (c. 4 BCE – 65 AD)',
    tradition: 'Roman Stoicism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Seneca_the_Younger',
    summary: 'Statesman, dramatist, and humanist guide to mastering time and mortality.',
    bio: 'Seneca the Younger was a leading Roman Stoic, advisor to Emperor Nero, and one of antiquity’s most eloquent essayists. His letters and treatises tackle the real anxieties of daily living: anger, grief, wealth, and the fleeting nature of time.',
    whyTimeless: 'Seneca speaks not from an ivory tower but from the treacherous currents of power, offering practical solace for anxious minds.',
    keyWorks: [
      { title: 'Letters from a Stoic (Epistulae Morales)', description: '124 personal letters to his friend Lucilius on philosophy as everyday medicine.' },
      { title: 'On the Shortness of Life (De Brevitate Vitae)', description: 'An urgent reminder that life is long enough if we do not squander its hours.' }
    ],
    pillars: [
      { concept: 'Sovereignty Over Time', description: 'Time is our only truly non-renewable asset; spend it deliberately.' },
      { concept: 'Premeditatio Malorum', description: 'Rehearse adversity mentally so you are never caught unprepared by misfortune.' },
      { concept: 'Suffering in Imagination', description: 'Most distress is manufactured by projection rather than current circumstance.' }
    ]
  }
};

export const TRANSLATIONS = {
  en: {
    themeName: 'wiz-theme',
    tagline: 'Immersive Quote Reel Theme for Astro',
    siteTitle: 'Wisdom — Timeless Quotes, Reimagined',
    siteSubtitle: 'High-Performance Vertical Reels & Editorial Modals',
    nav: {
      demo: 'Live Demo',
      features: 'Features',
      customizer: 'Playground',
      quotes: 'Quotes & Thinkers',
      docs: 'Documentation',
      github: 'GitHub'
    },
    hero: {
      badge: 'ASTRO INTEGRATION • V1.0 • OPEN SOURCE',
      title: 'Immersive Quote Reels for Astro',
      subtitle: 'Dynamic WebGL shaders, ambient zen chimes, editorial philosopher dossiers, 9:16 Ultra-HD canvas keepsake cards, and multi-script Devanagari typography.',
      launchReel: 'Launch Live Reel Demo',
      quickstart: 'Quickstart Guide',
      openCustomizer: 'Customize Theme'
    },
    rail: {
      like: 'Like this quote',
      dislike: 'Dislike feedback',
      share: 'Share 9:16 quote card',
      delve: 'Delve deeper into philosophy',
      author: 'Author dossier',
      audioEnable: 'Enable zen chimes',
      audioActive: 'Zen chimes active (Click to mute)',
      explore: 'Explore wisdom catalog'
    },
    delve: {
      badge: 'Philosophical Breakdown',
      title: 'Delve into Wisdom',
      actionableInsight: 'Actionable Insight',
      dailyContemplation: 'Daily Contemplation',
      exploreAuthor: 'Explore Author Dossier',
      shareCard: 'Share Quote Card',
      close: 'Close (Esc)'
    },
    author: {
      badge: 'Philosopher Dossier',
      curatedQuotes: 'Curated Quotes',
      wikipedia: 'Wikipedia',
      whyTimeless: 'Why This Voice Endures',
      bioTitle: 'Biographical Narrative',
      pillarsTitle: 'Core Philosophical Pillars',
      worksTitle: 'Primary Sourced Works',
      close: 'Close (Esc)'
    },
    share: {
      title: 'Share Quote Card',
      storyReel: '9:16 Story & Reel',
      keepsake: 'Ultra-HD Keepsake',
      resolution: 'Ultra-HD 2160×3840 (Rendered via 2D Canvas)',
      downloadPng: 'Download PNG Card',
      copyImage: 'Copy Image',
      copyLink: 'Copy Link',
      close: 'Close'
    },
    explore: {
      title: 'Explore Wisdom',
      searchPlaceholder: 'Search authors, quotes, moods, categories, tags...',
      tabs: {
        all: 'All Quotes',
        liked: 'Liked Quotes',
        moods: 'Moods',
        authors: 'Authors',
        categories: 'Categories'
      }
    }
  },
  hi: {
    themeName: 'विज़ थीम (wiz-theme)',
    tagline: 'एस्ट्रो के लिए सम्मोहक कोट्स रील थीम',
    siteTitle: 'तत्व — जीवन का शाश्वत सार',
    siteSubtitle: 'संत कबीर, स्वामी विवेकानंद और बुद्ध के अनमोल विचार',
    nav: {
      demo: 'लाइव रील डेमो',
      features: 'विशेषताएं',
      customizer: 'थीम प्लेग्राउंड',
      quotes: 'विचार व विचारक',
      docs: 'दस्तावेज़ (Docs)',
      github: 'गिटहब'
    },
    hero: {
      badge: 'एस्ट्रो इंटीग्रेशन • देवनागरी सपोर्ट • ओपन सोर्स',
      title: 'जीवन के अनमोल विचारों की लाइव रील',
      subtitle: 'डायनामिक एंबियंट शेडर्स, जेन धुनें, दार्शनिक जीवन परिचय, 9:16 अल्ट्रा-एचडी शेयर कार्ड और देवनागरी टाइपोग्राफी (रोज़ा वन, मुक्त व सेरिफ)।',
      launchReel: 'लाइव रील शुरू करें',
      quickstart: 'क्विक स्टार्ट गाइड',
      openCustomizer: 'थीम कस्टमाइज़ करें'
    },
    rail: {
      like: 'यह विचार पसंद करें',
      dislike: 'फीडबैक दें',
      share: '9:16 कार्ड शेयर करें',
      delve: 'गहराई से समझें',
      author: 'विचारक का परिचय',
      audioEnable: 'जेन धुन चालू करें',
      audioActive: 'जेन धुन चालू है (म्यूट करें)',
      explore: 'कैटलॉग खोजें'
    },
    delve: {
      badge: 'दार्शनिक व्याख्या',
      title: 'विचार का गूढ़ मर्म',
      actionableInsight: 'काम की बात (सीख)',
      dailyContemplation: 'आज का विचारणीय प्रश्न',
      exploreAuthor: 'विचारक का संपूर्ण परिचय',
      shareCard: 'कार्ड शेयर करें',
      close: 'बंद करें (Esc)'
    },
    author: {
      badge: 'दार्शनिक जीवन परिचय',
      curatedQuotes: 'संकलित विचार',
      wikipedia: 'विकिपीडिया',
      whyTimeless: 'यह आवाज़ क्यों शाश्वत है',
      bioTitle: 'जीवन वृत्तांत',
      pillarsTitle: 'मूल दार्शनिक आधार',
      worksTitle: 'प्रमुख रचित कृतियां',
      close: 'बंद करें (Esc)'
    },
    share: {
      title: 'शेयर कार्ड बनाएं',
      storyReel: '9:16 स्टोरी व रील',
      keepsake: 'अल्ट्रा-एचडी कीपसेक',
      resolution: 'अल्ट्रा-एचडी 2160×3840 (कैनवास 2D द्वारा रेंडर)',
      downloadPng: 'PNG कार्ड डाउनलोड करें',
      copyImage: 'इमेज कॉपी करें',
      copyLink: 'लिंक कॉपी करें',
      close: 'बंद करें'
    },
    explore: {
      title: 'ज्ञान का अन्वेषण',
      searchPlaceholder: 'विचारक, कोट्स, मूड, कैटेगरी या टैग खोजें...',
      tabs: {
        all: 'सभी विचार',
        liked: 'पसंदीदा कोट्स',
        moods: 'मूड्स',
        authors: 'विचारक',
        categories: 'श्रेणियां'
      }
    }
  }
};

export const API_DOCS = [
  {
    category: 'Theme Options',
    prop: 'siteName / siteTitle',
    type: 'string',
    default: "'Wisdom' / 'तत्व'",
    description: 'Brand or site name. Appears in <title>, OpenGraph tags, top header bar, and structured schema data.'
  },
  {
    category: 'Theme Options',
    prop: 'subtitle / tagline',
    type: 'string',
    default: "''",
    description: 'Secondary site subtitle or motto. Automatically formatted into <title> (`Site — Subtitle`) and feed headers.'
  },
  {
    category: 'Theme Options',
    prop: 'brandingText',
    type: 'string',
    default: 'falls back to siteName',
    description: 'Watermark branding text stamped cleanly at the bottom-center of generated 9:16 social keepsake images.'
  },
  {
    category: 'Theme Options',
    prop: 'language / lang',
    type: "'en' | 'hi' | string",
    default: "'en'",
    description: 'Primary BCP-47 language tag. Automatically selects built-in dictionary, font stacks, and reading direction.'
  },
  {
    category: 'Theme Options',
    prop: 'consumerId / siteId',
    type: 'string',
    default: 'derived slug',
    description: 'Top-level namespace identifier in Firebase RTDB isolating engagement telemetry when sharing database instances.'
  },
  {
    category: 'Theme Options',
    prop: 'typography',
    type: 'Partial<TypographyConfig>',
    default: 'Language preset',
    description: 'Custom font family overrides and Google Fonts stylesheet injection URL.'
  },
  {
    category: 'ReelFeed Props',
    prop: 'quotes',
    type: 'QuoteData[]',
    default: 'required',
    description: 'Array of quote objects to render in the vertical scroll-snap reel feed.'
  },
  {
    category: 'ReelFeed Props',
    prop: 'feedTitle',
    type: 'string',
    default: 'inherits siteName',
    description: 'Title displayed in the top fixed navigation bar over the reel.'
  },
  {
    category: 'ReelFeed Props',
    prop: 'feedSubtitle',
    type: 'string',
    default: 'inherits subtitle',
    description: 'Subtitle displayed directly beneath the feed title in the top bar.'
  },
  {
    category: 'ReelFeed Props',
    prop: 'feedType',
    type: "'master' | 'quote' | 'author' | 'mood' | 'category' | 'tag'",
    default: "'master'",
    description: 'Defines the stream mode and whether continuous infinite stream chunking is enabled.'
  }
];

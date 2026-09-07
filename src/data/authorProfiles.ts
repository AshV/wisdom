export interface AuthorWork {
  title: string;
  description: string;
}

export interface PhilosophicalPillar {
  concept: string;
  description: string;
}

export interface AuthorProfile {
  slug: string;
  name: string;
  era: string;
  tradition: string;
  wikipediaUrl: string;
  summary: string;
  bio: string;
  keyWorks: AuthorWork[];
  pillars: PhilosophicalPillar[];
  whyTimeless: string;
}

export const authorProfiles: Record<string, AuthorProfile> = {
  socrates: {
    slug: 'socrates',
    name: 'Socrates',
    era: 'c. 470 – 399 BC',
    tradition: 'Classical Greek Philosophy',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Socrates',
    summary: 'Athenian philosopher widely considered the founding figure of Western moral philosophy and ethical inquiry.',
    bio: 'Socrates was a classical Greek philosopher credit with laying the foundational stones of Western ethics and philosophical inquiry. Walking barefoot through the Agora of Athens, he engaged statesmen, poets, and artisans in relentless dialectical questioning (the Socratic Method), testing unexamined assumptions about justice, piety, and virtue. Unlike the Sophists who taught rhetoric for fee, Socrates claimed no personal wisdom, famously professing only his own ignorance (aporia). Sentenced to death in 399 BC on charges of impiety and corrupting the youth, he chose execution by hemlock rather than compromise his moral principles or abandon the examined life.',
    keyWorks: [
      { title: "Plato's Apology", description: "Socrates' defense speech before the Athenian jury, declaring that 'the unexamined life is not worth living'." },
      { title: "Crito", description: "A dialogue in prison examining civil obedience, moral duty, and why one must never return injury for injury." },
      { title: "Phaedo", description: "Socrates' final hours discussing the immortality of the soul and philosophy as preparation for death." },
      { title: "Gorgias", description: "An examination of rhetoric versus truth, arguing that doing injustice is far worse for the soul than suffering it." },
      { title: "Xenophon's Memorabilia", description: "Recollections of Socrates' everyday conversations, self-control, friendship, and practical wisdom." }
    ],
    pillars: [
      { concept: 'Socratic Ignorance (Aporia)', description: 'Recognizing that true wisdom begins by stripping away the illusion of knowledge.' },
      { concept: 'Care of the Soul (Psyche)', description: 'Prioritizing virtue and inner character far above external wealth, status, or bodily comfort.' },
      { concept: 'Moral Autonomy', description: 'Obeying reason and conscience above the capricious whims of popular opinion or authoritarian decree.' },
      { concept: 'Virtue as Knowledge', description: 'The conviction that nobody does evil knowingly; evil stems from ignorance of true human flourishing.' }
    ],
    whyTimeless: 'Socrates remains the supreme archetype of intellectual courage and moral integrity, reminding every generation that questioning unexamined beliefs is the highest civic and personal duty.'
  },

  plato: {
    slug: 'plato',
    name: 'Plato',
    era: 'c. 428 – 348 BC',
    tradition: 'Classical Greek Philosophy (Platonism)',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Plato',
    summary: 'Pioneering Athenian thinker and founder of the Academy, the first institution of higher learning in the Western world.',
    bio: 'Plato was a classical Athenian philosopher who preserved and expanded the legacy of his mentor Socrates while establishing the fundamental vocabulary of metaphysics, political philosophy, epistemology, and aesthetics. Founding the Academy around 387 BC, Plato composed dozens of immortal dramatic dialogues wherein characters grapple with the nature of justice, love, knowledge, and statecraft. Central to his philosophy is the Theory of Forms—the belief that the physical world of fleeting shadows points toward a transcendent realm of eternal, unchanging truths crowned by the Form of the Good.',
    keyWorks: [
      { title: "The Republic", description: "The masterwork on justice, the ideal city-state, the Philosopher King, and the Allegory of the Cave." },
      { title: "Symposium", description: "A series of banquet speeches on the ascending ladder of love (Eros), from bodily attraction to the divine contemplation of absolute Beauty." },
      { title: "Phaedrus", description: "An exploration of the soul as a winged chariot pulled by two spirited horses, beauty, and authentic rhetoric." },
      { title: "The Laws", description: "Plato's longest dialogue, detailing the practical legal and institutional foundations of a stable, virtuous society." }
    ],
    pillars: [
      { concept: 'Theory of Forms', description: 'The material world is an imperfect reflection of eternal, perfect realities (Truth, Justice, Beauty).' },
      { concept: 'The Allegory of the Cave', description: 'Humanity begins in the darkness of shadows and illusions, requiring philosophical education to step into the sunlight of truth.' },
      { concept: 'The Tripartite Soul', description: 'Harmonizing Reason (Logos), Spirit/Courage (Thumos), and Appetite (Epithumia) under the sovereignty of wisdom.' }
    ],
    whyTimeless: 'Plato articulated the eternal human struggle between superficial appearance and deeper reality, shaping two millennia of philosophy, literature, and spiritual aspiration.'
  },

  'marcus-aurelius': {
    slug: 'marcus-aurelius',
    name: 'Marcus Aurelius',
    era: '121 – 180 AD',
    tradition: 'Late Roman Stoicism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Marcus_Aurelius',
    summary: 'Roman Emperor and philosopher whose private journals became one of history’s greatest spiritual manuals for resilience.',
    bio: 'Marcus Aurelius Antoninus ruled the Roman Empire from 161 to 180 AD as the last of the "Five Good Emperors." Facing the catastrophic Antonine Plague, treasonous rebellion, economic strain, and grueling frontier wars along the Danube, Marcus retreated into his private tent each night to write his personal spiritual reflections. Never intended for publication, his journal—now known as the Meditations—embodies the daily practice of Stoic philosophy: cultivating emotional sovereignty, accepting mortality, treating duty as sacred, and finding tranquility within the "Inner Citadel" amid the turbulence of imperial rule.',
    keyWorks: [
      { title: "Meditations (Books 1 – 12)", description: "Private aphorisms and spiritual exercises on duty, transience, emotional self-control, and cosmic harmony." }
    ],
    pillars: [
      { concept: 'The Inner Citadel', description: 'An unassailable retreat within one’s own rational mind that no external catastrophe can breach unless you allow it.' },
      { concept: 'Amor Fati & Cosmic Flow', description: 'Accepting whatever happens as necessary and natural, finding nourishment in every obstacle.' },
      { concept: 'Memento Mori', description: 'Keeping the certainty of death always before your eyes to strip away trivial vanity and clarify daily priorities.' },
      { concept: 'Cosmopolitan Duty', description: 'Viewing oneself as a citizen of the universal city (Cosmopolis), destined to work alongside fellow human beings for the common good.' }
    ],
    whyTimeless: 'Marcus Aurelius proves that supreme worldly power and supreme moral humility can coexist, offering a timeless blueprint for navigating crises with grace and resolve.'
  },

  seneca: {
    slug: 'seneca',
    name: 'Seneca (Lucius Annaeus Seneca)',
    era: 'c. 4 BC – 65 AD',
    tradition: 'Roman Stoicism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Seneca_the_Younger',
    summary: 'Roman Stoic philosopher, statesman, and playwright who mastered the art of practical wisdom and deliberate living.',
    bio: 'Born in Cordoba and educated in Rome, Lucius Annaeus Seneca was a prominent senator, tragic dramatist, and political advisor to the young Emperor Nero. Known for his elegant Latin prose, Seneca’s philosophical essays and intimate letters to his friend Lucilius transformed Stoic principles into warm, urgent, practical guidance for daily life. He addressed the anxiety of wealth, the terror of illness, the waste of precious time, and the poison of anger with psychological penetration that feels strikingly modern. Forced by Nero to take his own life in 65 AD, Seneca met his death with textbook Stoic composure.',
    keyWorks: [
      { title: "Letters from a Stoic (Epistulae Morales)", description: "124 philosophical letters offering counseling on time, friendship, grief, poverty, and mental independence." },
      { title: "On the Shortness of Life (De Brevitate Vitae)", description: "A piercing essay arguing that life is not short, but that we squander the vast majority of it on trivial distractions." },
      { title: "On Peace of Mind (De Tranquillitate Animi)", description: "A therapeutic dialogue on managing restlessness, professional burnout, and existential dread." },
      { title: "On Anger (De Ira)", description: "A thorough psychological treatise diagnosing anger as temporary madness and outlining methods to master it." }
    ],
    pillars: [
      { concept: 'The Sovereignty of Time', description: 'Time is the only asset that can never be recovered; we must guard it far more jealously than gold or property.' },
      { concept: 'Premeditatio Malorum', description: 'Anticipating potential misfortune so that nothing arrives as an unexpected shock.' },
      { concept: 'True Wealth through Moderation', description: 'He who needs the least is richest, because he cannot be coerced by circumstances.' }
    ],
    whyTimeless: 'Seneca writes not as a detached moralist on a mountain, but as an imperfect human being in the arena, coaching us on how to stay sane and noble in an unpredictable world.'
  },

  epictetus: {
    slug: 'epictetus',
    name: 'Epictetus',
    era: 'c. 50 – c. 135 AD',
    tradition: 'Roman Stoicism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Epictetus',
    summary: 'Former enslaved person who became one of antiquity’s most influential teachers of freedom, dignity, and self-mastery.',
    bio: 'Epictetus was born into slavery in Hierapolis (modern Turkey) and served in the household of a brutal Roman imperial administrative officer. Enduring lifelong physical disability from childhood mistreatment, Epictetus discovered Stoic philosophy under Musonius Rufus. After gaining his freedom, he established a renowned school of philosophy in Nicopolis, Greece, attracting students from across the Roman Empire—including the future emperor Hadrian. Epictetus wrote nothing down; his teachings survive through the meticulous lecture notes and handbook compiled by his devoted pupil Arrian.',
    keyWorks: [
      { title: "Discourses (Diatribai)", description: "Vivid, conversational lectures on human freedom, the judgment of events, and living in accordance with nature." },
      { title: "Enchiridion (The Handbook)", description: "A distilled manual of core Stoic rules for daily conduct and maintaining inner peace under any adversity." },
      { title: "Fragments", description: "Preserved sayings emphasizing personal responsibility and unwavering moral resolve." }
    ],
    pillars: [
      { concept: 'The Dichotomy of Control', description: 'Distinguishing clearly between what is up to us (desires, judgments, choices) and what is not (body, wealth, opinion of others).' },
      { concept: 'Freedom of the Will (Prohairesis)', description: 'Chains can bind the leg, but even Zeus cannot conquer a sovereign, self-governing rational faculty.' },
      { concept: 'Non-Blame & Radical Responsibility', description: 'The uneducated blame others; the beginner blames himself; the truly educated blames neither.' }
    ],
    whyTimeless: 'Having lived at the very bottom of the ancient social hierarchy, Epictetus stripped philosophy of all ivory-tower pretension, demonstrating that invincible inner freedom is available to anyone.'
  },

  'lao-tzu': {
    slug: 'lao-tzu',
    name: 'Lao Tzu (Laozi)',
    era: '6th – 4th Century BC',
    tradition: 'Taoism (Daoism)',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Laozi',
    summary: 'Legendary ancient Chinese sage and author of the Tao Te Ching, teaching the path of effortless action and harmony.',
    bio: 'Lao Tzu, traditionally regarded as an archivist of the royal court of the Zhou dynasty, is the foundational sage of Taoist philosophy. Disillusioned with the decaying morals of society, tradition recounts that he mounted an ox and rode westward toward the frontier. At the Hangu Pass, the gatekeeper begged him to record his wisdom before departing into the wilderness, resulting in the 81 poetic verses of the Tao Te Ching (Daodejing). Lao Tzu’s vision emphasizes humility, non-coercion, the return to simplicity, and yielding strength modeled on the fluidity of water.',
    keyWorks: [
      { title: "Tao Te Ching (Daodejing)", description: "The classic text of Taoism, exploring the mystery of the Way (Tao) and the natural power of virtue (Te)." }
    ],
    pillars: [
      { concept: 'Wu Wei (Effortless Action)', description: 'Acting without force, aggression, or self-assertive ambition; moving in alignment with the natural grain of reality.' },
      { concept: 'The Way of Water', description: 'Softness overcoming hardness; yielding and seeking the lowest places, yet carving through granite over time.' },
      { concept: 'The Uncarved Block (Pu)', description: 'Returning to the original simplicity, freshness, and unpretentious wholeness of natural being.' },
      { concept: 'Emptiness as Utility', description: 'The clay creates the vessel, but it is the emptiness within that holds the water; non-being gives rise to being.' }
    ],
    whyTimeless: 'In an exhausting world addicted to speed, aggression, and relentless striving, Lao Tzu’s gentle wisdom acts as a profound antidote, teaching that stillness and yielding preserve life.'
  },

  'friedrich-nietzsche': {
    slug: 'friedrich-nietzsche',
    name: 'Friedrich Nietzsche',
    era: '1844 – 1900',
    tradition: 'Existential Philosophy & Cultural Critique',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Friedrich_Nietzsche',
    summary: 'German philosopher and poet whose fiery aphorisms challenged complacency and championed radical life-affirmation.',
    bio: 'Friedrich Nietzsche was a German philologist, philosopher, and poet whose incandescent prose fundamentally reshaped modern psychology, theology, and literature. Resigning from his professorship at Basel due to chronic pain, migraines, and failing eyesight, Nietzsche wandered the Swiss Alps, Italy, and the French Riviera, writing works of breathtaking aphoristic power. Rejecting herd morality, nihilism, and life-denying dogmas, he called for self-overcoming, intellectual daring, and the radical affirmation of life in all its suffering and beauty.',
    keyWorks: [
      { title: "Thus Spoke Zarathustra", description: "Philosophical poetry proclaiming self-overcoming, the Overman, and the eternal return of life." },
      { title: "Beyond Good and Evil", description: "A relentless critique of traditional moral systems and an exploration of intellectual honesty." },
      { title: "The Gay Science (Die fröhliche Wissenschaft)", description: "A joyful celebration of free spirits, artistic dance, intellectual courage, and Amor Fati." },
      { title: "Twilight of the Idols", description: "A sharp, concentrated summary of his philosophy, showing how to philosophize with a hammer." }
    ],
    pillars: [
      { concept: 'Amor Fati (Love of Fate)', description: 'Not merely enduring necessity, but actively loving every moment of your life—including its pain—with total devotion.' },
      { concept: 'Self-Overcoming (Selbstüberwindung)', description: 'Viewing human existence not as a finished state, but as a bridge to higher creative mastery and strength.' },
      { concept: 'The Dancing Star', description: 'You must have chaos within you to give birth to a dancing star; creativity requires embracing tension.' },
      { concept: 'The Free Spirit', description: 'Having the intellectual courage to think outside the consensus of the crowd and forge your own authentic values.' }
    ],
    whyTimeless: 'Nietzsche challenges the reader to wake up from complacency, reject victimhood, and turn life’s deepest hardships into radiant creative triumph.'
  },

  'alan-watts': {
    slug: 'alan-watts',
    name: 'Alan Watts',
    era: '1915 – 1973',
    tradition: 'Zen, Taoism & Eastern Philosophy',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Alan_Watts',
    summary: 'British-American philosopher who translated profound Zen and Eastern mysticism into playful, liberating insights for the modern mind.',
    bio: 'Alan Wilson Watts was an English-born philosopher, writer, and speaker celebrated as one of the most charismatic interpreters of Asian philosophy for Western audiences. Drawing upon Zen Buddhism, Taoism, and Vedanta, Watts dissolved the artificial boundary between spirituality and everyday human existence. His lectures and books invited listeners to step out of the illusion of the isolated ego, recognize that humans do not come into the world but out of it (like waves from the ocean), and experience the cosmic play (lila) of the eternal present.',
    keyWorks: [
      { title: "The Way of Zen", description: "A definitive historical and psychological introduction to Zen philosophy and meditation." },
      { title: "The Wisdom of Insecurity", description: "A brilliant manifesto showing that human anxiety comes from clinging to security in a world that is inherently flowing." },
      { title: "The Book: On the Taboo Against Knowing Who You Are", description: "An exploration of identity, revealing that you are the universe looking back at itself." },
      { title: "Nature, Man and Woman", description: "A profound study on restoring sacred connection between human consciousness and the natural environment." }
    ],
    pillars: [
      { concept: 'The Eternal Present', description: 'The future does not exist except as an idea in the now; if you cannot live fully in the present, you cannot live anywhere.' },
      { concept: 'The Illusion of the Ego', description: 'The feeling of being an isolated bag of skin in competition with the universe is a hallucination; you are an expression of the whole cosmos.' },
      { concept: 'Life as Musical Play', description: 'Life has no final destination where you "arrive"; like music or dancing, the purpose of the song is the singing itself.' },
      { concept: 'The Law of Reversed Effort', description: 'Trying to float by thrashing in the water only makes you sink; surrender and trust allow reality to support you.' }
    ],
    whyTimeless: 'With wit, warmth, and lucid clarity, Alan Watts frees the soul from guilt, anxiety, and rigid seriousness, reconnecting us to the joyful mystery of being alive.'
  },

  'carl-jung': {
    slug: 'carl-jung',
    name: 'Carl Gustav Jung',
    era: '1875 – 1961',
    tradition: 'Analytical & Depth Psychology',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Carl_Jung',
    summary: 'Swiss psychiatrist who mapped the human shadow, archetypes, and the soul’s journey toward individuation.',
    bio: 'Carl Gustav Jung was a Swiss psychiatrist and psychoanalyst who founded analytical psychology. Breaking away from Sigmund Freud’s purely biological model, Jung recognized that the human psyche possesses vast spiritual, mythological, and collective depths. Through decades of clinical research and deep personal exploration (documented in his illuminated Red Book), Jung mapped the collective unconscious, dream symbolism, active imagination, synchronicity, and the vital necessity of integrating the shadow self to attain true psychological wholeness.',
    keyWorks: [
      { title: "Memories, Dreams, Reflections", description: "Jung's introspective autobiography exploring his inner visions, encounters with the unconscious, and spiritual realizations." },
      { title: "The Archetypes and the Collective Unconscious", description: "The foundational mapping of universal psychological motifs (Shadow, Anima/Animus, Self) shared across human culture." },
      { title: "The Red Book (Liber Novus)", description: "A visionary illustrated diary detailing his descent into the depths of the psyche and encounter with his inner symbols." },
      { title: "Modern Man in Search of a Soul", description: "Essays addressing the modern spiritual vacuum and the psychological quest for authentic meaning." }
    ],
    pillars: [
      { concept: 'The Shadow & Integration', description: 'True wholeness is achieved not by repressing our dark or wounded parts, but by bringing them into conscious awareness.' },
      { concept: 'Individuation', description: 'The lifelong journey of integrating the conscious ego with the deeper Self, becoming who you truly were born to be.' },
      { concept: 'Synchronicity', description: 'Meaningful coincidences where inner psychological events connect significantly with external reality.' },
      { concept: 'Looking Inward to Awaken', description: 'Who looks outside dreams; who looks inside awakes.' }
    ],
    whyTimeless: 'Jung offered a bridge between empirical science and the human soul, providing an indispensable psychological compass for anyone seeking self-understanding in a fragmented modern world.'
  },

  rumi: {
    slug: 'rumi',
    name: 'Jalal al-Din Muhammad Rumi',
    era: '1207 – 1273 AD',
    tradition: 'Sufi Mysticism & Poetry',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rumi',
    summary: 'Universal poet of mystical love whose verses dissolve dogma and celebrate the soul’s reunion with the Divine.',
    bio: 'Jalal al-Din Muhammad Rumi was a 13th-century Persian poet, Islamic scholar, and Sufi mystic born in Balkh (modern Afghanistan) who lived and taught in Konya (modern Turkey). When the wandering mystic Shams of Tabriz entered his life in 1244, Rumi was transformed from a sober jurist into an ecstatically inspired poet of unconditional love. Across tens of thousands of verses in the Masnavi and Divan-i Shams, Rumi articulated the longing of the human soul to return to its divine origin, transcending all sectarian division through the language of the heart.',
    keyWorks: [
      { title: "Masnavi (Mathnawi)", description: "A monumental 26,000-verse spiritual epic known as the 'Quran in the Persian tongue', packed with parables and mystical allegories." },
      { title: "Divan-i Shams-i Tabrizi", description: "A collection of passionate, lyrical odes celebrating the divine friend, ecstasy, and total spiritual surrender." },
      { title: "Fihi Ma Fihi (Discourses)", description: "Conversational prose teachings addressing ethical dilemmas, patience, and inner cultivation." }
    ],
    pillars: [
      { concept: 'The Field Beyond Judgments', description: 'Out beyond ideas of wrongdoing and rightdoing there is a field; meeting the beloved where words cease.' },
      { concept: 'The Wound as Portal', description: 'The wound is the place where the Light enters you; suffering as the chisel that shapes spiritual capacity.' },
      { concept: 'The Guest House of Emotions', description: 'Treating joy, sorrow, and meanness as unexpected guests sent from beyond for your clearing and growth.' },
      { concept: 'Unconditional Love', description: 'Love is not an emotion between two individuals, but the fundamental gravity holding the universe together.' }
    ],
    whyTimeless: 'Rumi’s verses speak across eight centuries and every cultural divide with unmatched tenderness, offering solace to the brokenhearted and igniting spiritual longing.'
  },

  osho: {
    slug: 'osho',
    name: 'Osho (Bhagwan Shree Rajneesh)',
    era: '1931 – 1990',
    tradition: 'Contemporary Eastern Thought & Meditation',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rajneesh',
    summary: 'Provocative contemporary mystic who synthesized Zen, Sufism, Taoism, and Western therapy around total inner awareness.',
    bio: 'Osho was an Indian mystic, guru, and spiritual teacher who served as a professor of philosophy before traveling across India giving discourses. Rejecting institutionalized dogmas and moralistic hypocrisy, Osho championed meditation not as an ascetic retreat from life, but as a silent, joyful witnessing of the present moment. He introduced Dynamic Meditation and active meditation techniques designed specifically to release suppressed emotional trauma in modern individuals before entering silent awareness.',
    keyWorks: [
      { title: "The Book of Secrets", description: "Comprehensive commentaries on the 112 classical meditation techniques of the Vigyan Bhairav Tantra." },
      { title: "Courage: The Joy of Living Dangerously", description: "A meditation on confronting fear, embracing uncertainty, and living with authentic heart." },
      { title: "Awareness: The Key to Living in Balance", description: "Discourses on mindfulness, witnessing the mind without judgment, and inner freedom." }
    ],
    pillars: [
      { concept: 'The Witnessing Mind', description: 'You are neither the body nor the mind; you are the silent consciousness observing both.' },
      { concept: 'Zorba the Buddha', description: 'The synthesis of earthly celebration (Zorba) with deep spiritual transcendence and silence (Buddha).' },
      { concept: 'Meditation in Action', description: 'Meditation is not sitting under a tree; it is an awareness carried into drinking tea, speaking, and walking.' }
    ],
    whyTimeless: 'Osho’s teachings deconstruct psychological conditioning and societal guilt, directing the seeker back to personal freedom, humor, and radical self-honesty.'
  }
};

/**
 * Helper to retrieve rich author profile with fallback
 */
export function getAuthorProfile(slug: string, fallbackName?: string): AuthorProfile {
  if (authorProfiles[slug]) {
    return authorProfiles[slug];
  }

  const cleanName = fallbackName || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    slug,
    name: cleanName,
    era: 'Historical Thinker',
    tradition: 'Wisdom & Philosophy',
    wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(cleanName.replace(/ /g, '_'))}`,
    summary: `Curated philosophical reflections, timeless sayings, and wisdom from ${cleanName}.`,
    bio: `${cleanName} is featured in Wisdom's curated archive of timeless thinkers, whose words and insights continue to guide human reflection across generations.`,
    keyWorks: [],
    pillars: [
      { concept: 'Timeless Reflection', description: 'Ideas that transcend their historical period to speak directly to the modern human condition.' },
      { concept: 'Ethical Striving', description: 'Guiding humanity toward clarity, virtue, and resilience.' }
    ],
    whyTimeless: `${cleanName}'s insights have endured through history, offering grounding perspective and contemplative depth.`
  };
}

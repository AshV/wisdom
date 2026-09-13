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
  longName?: string;
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

  aristotle: {
    slug: 'aristotle',
    name: 'Aristotle',
    era: '384 – 322 BC',
    tradition: 'Peripatetic Philosophy & Virtue Ethics',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Aristotle',
    summary: 'Universal Greek polymath, student of Plato, and founder of the Lyceum who systematized logic, biology, and virtue ethics.',
    bio: 'Aristotle of Stagira was one of the greatest polymaths in human history, pioneering the formal study of logic, biology, ethics, political theory, rhetoric, and metaphysics. Studying at Plato’s Academy for twenty years before tutoring Alexander the Great and founding the Lyceum in Athens, Aristotle approached reality with empirical curiosity and structured rigor. His ethical philosophy centers on Eudaimonia—human flourishing achieved not through fleeting pleasure or passive belief, but through the lifelong, active practice of excellence (arete) guided by reason and the Golden Mean.',
    keyWorks: [
      { title: "Nicomachean Ethics", description: "The definitive treatise on virtue, moral character, the Golden Mean, friendship (philia), and eudaimonia." },
      { title: "Politics", description: "An examination of the ideal state, citizenship, law, and why man is by nature a political (social) animal." },
      { title: "Metaphysics", description: "The pioneering study of being as being, causality, potentiality vs actuality, and the Unmoved Mover." },
      { title: "Poetics", description: "The foundational work of dramatic theory, defining tragedy, catharsis, plot, and character." },
      { title: "Rhetoric", description: "A masterclass in persuasion, analyzing the three pillars of proof: Ethos (character), Pathos (emotion), and Logos (reason)." }
    ],
    pillars: [
      { concept: 'Eudaimonia (Flourishing)', description: 'The highest human good: an active life of the soul in accordance with reason and virtue over a complete lifespan.' },
      { concept: 'The Golden Mean', description: 'Virtue as the balanced intermediate between excess and deficiency (e.g. courage between cowardice and recklessness).' },
      { concept: 'Habitual Excellence (Hexis)', description: 'We are what we repeatedly do; moral virtue is not a single act or innate trait, but a habit forged through practice.' },
      { concept: 'Perfect Friendship (Philia)', description: 'A single soul dwelling in two bodies; true friendship exists when two good people wish well to each other for their own sake.' }
    ],
    whyTimeless: 'Aristotle provided the fundamental blueprint for practical wisdom (phronesis), showing that living a good and happy life is an actionable craft cultivated through daily choices.'
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
    name: 'Seneca',
    longName: 'Seneca (Lucius Annaeus Seneca)',
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
    name: 'Lao Tzu',
    longName: 'Lao Tzu (Laozi)',
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
    name: 'Carl Jung',
    longName: 'Carl Gustav Jung',
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
    name: 'Rumi',
    longName: 'Jalal al-Din Muhammad Rumi',
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
    name: 'Osho',
    longName: 'Osho (Bhagwan Shree Rajneesh)',
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
  },

  'viktor-frankl': {
    slug: 'viktor-frankl',
    name: 'Viktor Frankl',
    longName: 'Viktor Emil Frankl',
    era: '1905 – 1997',
    tradition: 'Logotherapy & Existential Psychology',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Viktor_Frankl',
    summary: 'Austrian neurologist, psychiatrist, Holocaust survivor, and founder of logotherapy, who proved that humanity’s primary drive is the will to meaning.',
    bio: 'Viktor Emil Frankl was an Austrian neurologist, psychiatrist, and philosopher who founded Logotherapy—often recognized as the "Third Viennese School of Psychotherapy" following Sigmund Freud\'s psychoanalysis and Alfred Adler\'s individual psychology. Born in Vienna, Frankl demonstrated an early brilliance in psychiatry, corresponding with Freud as a teenager and later treating thousands of suicidal women and youths during the Great Depression. In 1942, Frankl, his young pregnant wife Tilly, and his parents were deported by the Nazi regime. Surviving three years of unimaginable brutality across four concentration camps—Theresienstadt, Auschwitz, Kaufering, and Türkheim (a subcamp of Dachau)—Frankl observed firsthand that prisoners who maintained a connection to a transcendent purpose, an unfinished life task, or love for another person possessed far greater psychological resilience against despair and death. Following liberation, he returned to Vienna, served as head of the Department of Neurology at the Vienna Polyclinic Hospital for 25 years, and authored over 30 books, teaching millions that no outer circumstance can strip a human being of the ultimate freedom to choose their attitude and find meaning in existence.',
    keyWorks: [
      { title: "Man's Search for Meaning (...trotzdem Ja zum Leben sagen)", description: "Frankl's seminal masterpiece documenting his experiences in the concentration camps and outlining the foundational principles of logotherapy." },
      { title: "The Doctor and the Soul (Ärztliche Seelsorge)", description: "The definitive clinical treatise examining existential analysis, attitudinal values, and the spiritual dimension of psychiatric healing." },
      { title: "The Will to Meaning: Foundations and Applications of Logotherapy", description: "Lectures clarifying the human yearning for purpose, self-transcendence, and the critique of reductionist psychological determinism." },
      { title: "Psychotherapy and Existentialism", description: "Selected clinical papers demonstrating the integration of existential philosophy with therapeutic technique in treating the existential vacuum." },
      { title: "The Unheard Cry for Meaning", description: "A passionate exploration of modern youth alienation, neuroses born of meaninglessness, and human dignity." }
    ],
    pillars: [
      { concept: 'The Will to Meaning', description: 'The primary motivational force in human beings is not the pleasure principle (Freud) or the strive for superiority (Adler), but the discovery and fulfillment of personal meaning.' },
      { concept: 'The Last of Human Freedoms', description: 'Everything can be taken from a person but one thing: the freedom to choose one\'s attitude in any given set of circumstances, to choose one\'s own way.' },
      { concept: 'Tragic Optimism', description: 'The courageous capacity to say "yes" to life in spite of everything—turning suffering into human achievement, guilt into moral growth, and mortality into responsible urgency.' },
      { concept: 'Self-Transcendence', description: 'Being human always points beyond oneself toward something or someone other than oneself—a goal to fulfill or another human being to encounter with love.' },
      { concept: 'The Three Avenues to Meaning', description: 'Meaning is discovered through what we create (work/deeds), what we experience (nature, art, love), and the attitude we take toward unavoidable suffering.' }
    ],
    whyTimeless: 'Having tested his philosophy in the most harrowing crucible of the twentieth century, Frankl provides an invincible psychological beacon, proving that dignity, responsibility, and meaning reside entirely within the sovereign human soul.'
  },

  'william-james': {
    slug: 'william-james',
    name: 'William James',
    longName: 'William James',
    era: '1842 – 1910',
    tradition: 'Functional Psychology & Pragmatism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/William_James',
    summary: 'Pioneering Harvard polymath and "Father of American Psychology" who mapped the stream of consciousness, neural habit plasticity, and pragmatic belief.',
    bio: 'William James was an American philosopher, psychologist, and physician widely celebrated as the father of American psychology and one of the most influential thinkers of the late 19th and early 20th centuries. The elder brother of novelist Henry James, William earned an M.D. from Harvard and established the first psychological laboratory in the United States. His monumental 1890 work, The Principles of Psychology, revolutionized the scientific study of the mind by introducing the concept of the "stream of thought" and emphasizing the biological and neurological role of habits in conserving conscious energy. Overcoming severe bouts of debilitating depression in his youth through a deliberate commitment to free will, James went on to co-found Pragmatism and Radical Empiricism. His philosophy insists that the ultimate test of any idea, emotion, or belief is not abstract dogma, but its tangible "cash-value" in the living, experiential conduct of life.',
    keyWorks: [
      { title: "The Principles of Psychology (Vols. 1 & 2)", description: "The foundational 1,200-page masterwork that systematized modern psychology, exploring stream of thought, attention, habit, emotion, and the self." },
      { title: "The Varieties of Religious Experience", description: "The Gifford Lectures in Edinburgh, pioneering the psychological study of conversion, saintliness, mysticism, and spiritual consciousness." },
      { title: "Pragmatism: A New Name for Some Old Ways of Thinking", description: "The philosophical landmark arguing that truth is not a static property of an idea, but a process of verification through practical human experience." },
      { title: "The Will to Believe and Other Essays", description: "A spirited defense of our right to adopt passionate beliefs and act on faith where theoretical proof is incomplete." },
      { title: "Habit", description: "A concentrated, brilliant essay demonstrating how the nervous system physically records repeated actions, shaping character and destiny." }
    ],
    pillars: [
      { concept: 'The Plasticity of Habit', description: 'We are walking bundles of habits; our nervous system preserves every moral choice and physical act. Character is forged by conscious, repeated discipline.' },
      { concept: 'The Stream of Consciousness', description: 'Consciousness does not appear chopped up into bits, but flows like a continuous river, unique to each individual and constantly changing.' },
      { concept: 'Voluntary Attention as the Essence of Will', description: 'The greatest effort of the human will is the effort of attention—holding a difficult thought in the center of the mind against the clamor of distracting impulses.' },
      { concept: 'The Pragmatic Method', description: 'Evaluating the truth and validity of philosophies, beliefs, and behaviors by their practical consequences for lived human flourishing.' },
      { concept: 'The Power of Chosen Attitude', description: 'The greatest discovery of my generation is that human beings can alter their lives by altering their attitudes of mind.' }
    ],
    whyTimeless: 'William James unified rigorous empirical observation with radiant humanism, giving humanity actionable, psychologically profound tools to overcome mental paralysis and craft an intentional life.'
  },

  'francois-de-la-rochefoucauld': {
    slug: 'francois-de-la-rochefoucauld',
    name: 'François de La Rochefoucauld',
    longName: 'François VI, Duc de La Rochefoucauld, Prince de Marcillac',
    era: '1613 – 1680',
    tradition: 'French Moralism & Behavioral Aphorisms',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Fran%C3%A7ois_de_La_Rochefoucauld_(writer)',
    summary: 'Master French moralist and aphorist whose forensic dissection of human motives unmasked the pervasive role of self-love, vanity, and self-deception in human conduct.',
    bio: 'François VI, Duc de La Rochefoucauld, was a French nobleman, military officer, and moral philosopher whose sparkling, mercilessly insightful maxims transformed the psychological observation of human behavior. Born into the highest ranks of French aristocracy, La Rochefoucauld engaged in court intrigues, fought valiantly in the civil wars of the Fronde, and was severely wounded in the battle of the Faubourg Saint-Antoine in Paris. Retiring from political turmoil, he immersed himself in the brilliant Parisian salon of Madame de Sablé and Madame de La Fayette, honing his observations into razor-sharp aphorisms. Published in 1665 as the Maximes (Réflexions ou Sentences et Maximes morales), his work exposed the hidden mechanics of human motivation, arguing that our most celebrated virtues—courage, generosity, humility, and sincerity—are frequently disguised expressions of self-love (amour-propre) and the pursuit of social esteem.',
    keyWorks: [
      { title: "Moral Maxims and Reflections (Maximes)", description: "The landmark collection of 500+ aphorisms stripping away the flattering illusions of human morality to expose the psychological engine of self-interest." },
      { title: "Reflections on Diverse Subjects (Réflexions diverses)", description: "Essays exploring social conduct, the art of conversation, friendship, aging, and the acceptance of mortality." },
      { title: "Memoirs of the Regency of Anne of Austria", description: "Firsthand historical recollections of court intrigues, political ambition, and the psychology of power during the Fronde." }
    ],
    pillars: [
      { concept: 'The Omnipresence of Self-Love (Amour-Propre)', description: 'Self-love is the greatest of all flatterers; it speaks all languages and plays all roles, subtly motivating our actions even when we believe we are acting selflessly.' },
      { concept: 'The Mask of Virtue', description: 'What we take for virtue is frequently only an assemblage of different acts and interests arranged by fortune or vanity to earn the good opinion of others.' },
      { concept: 'The Tyranny of the Passions', description: 'The head is always the dupe of the heart; reason rationalizes and justifies what our emotional impulses, desires, and fears have already chosen.' },
      { concept: 'Hypocrisy as Homage', description: 'Hypocrisy is the homage that vice pays to virtue; social morality survives because humans are desperate to appear good even when failing to be good.' }
    ],
    whyTimeless: 'La Rochefoucauld remains the supreme anatomist of the human ego, whose psychological penetrating insight anticipated Nietzsche, Freud, and modern cognitive psychology by two centuries.'
  },

  'swami-vivekananda': {
    slug: 'swami-vivekananda',
    name: 'Swami Vivekananda',
    longName: 'Swami Vivekananda (Narendranath Datta)',
    era: '1863 – 1902',
    tradition: 'Advaita Vedanta & Practical Spirituality',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Swami_Vivekananda',
    summary: 'Monk, philosopher, and orator who introduced Vedanta and Yoga to the Western world at the 1893 Parliament of Religions and revolutionized practical spirituality.',
    bio: 'Swami Vivekananda, born Narendranath Datta in Calcutta, was the chief disciple of the 19th-century mystic Ramakrishna Paramahamsa. Endowed with a razor-sharp intellect, deep mastery of Western and Eastern philosophy, and an incandescent moral presence, Vivekananda represented India and Hinduism at the 1893 Parliament of the World\'s Religions in Chicago, opening with his iconic address "Sisters and brothers of America!" He founded the Ramakrishna Math and Ramakrishna Mission, championing "Practical Vedanta"—the conviction that the highest spiritual realization must express itself in tangible, selfless service to suffering humanity. Emphasizing fearlessness (abhaya), self-reliance, and the inherent divinity in every human soul, his teachings bridged ancient metaphysical wisdom with urgent social action.',
    keyWorks: [
      { title: "Raja Yoga (Conquering the Internal Nature)", description: "The seminal modern commentary on Patanjali's Yoga Sutras, presenting meditation and mind control as an exact empirical science." },
      { title: "Karma Yoga (The Yoga of Action)", description: "A masterclass on non-attached action, teaching how to work without desire for praise or fear of blame as a direct path to spiritual freedom." },
      { title: "Jnana Yoga (The Yoga of Knowledge)", description: "Lectures exploring the metaphysics of Advaita Vedanta, the nature of consciousness (Atman-Brahman), and the illusion of separateness." },
      { title: "Bhakti Yoga (The Yoga of Devotion)", description: "An examination of divine love, transforming emotional longing into universal compassion." },
      { title: "Lectures from Colombo to Almora", description: "Inspirational addresses rallying the youth toward moral strength, education, fearlessness, and social uplift." }
    ],
    pillars: [
      { concept: 'Inherent Divinity of the Soul', description: 'Every human being is essentially divine; religion is the manifestation of the divinity already in man.' },
      { concept: 'Radical Fearlessness (Abhaya)', description: 'The greatest sin is fear; you have within you the infinite power of the universe if you stand up and manifest your strength.' },
      { concept: 'Service as Worship (Seva)', description: 'Serving the living human being—especially the downtrodden—is the highest form of worship of the Divine (Jiva is Shiva).' },
      { concept: 'Harmony of All Faiths', description: 'Different religions are not contradictory truths, but different paths climbing the same mountain to the identical summit.' }
    ],
    whyTimeless: 'Vivekananda’s electrifying call to courage, inner strength, and selfless service cuts through fatalism, inspiring individuals across cultures to awaken their latent potential.'
  },

  'mahatma-gandhi': {
    slug: 'mahatma-gandhi',
    name: 'Mahatma Gandhi',
    longName: 'Mohandas Karamchand Gandhi',
    era: '1869 – 1948',
    tradition: 'Satyagraha & Moral Philosophy',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Mahatma_Gandhi',
    summary: 'Leader of India’s independence movement whose doctrine of Satyagraha (truth-force) and Ahimsa (nonviolence) inspired global civil rights movements.',
    bio: 'Mohandas Karamchand Gandhi was an Indian lawyer, anti-colonial nationalist, and political ethicist whose philosophy of Satyagraha (insistence on Truth through nonviolent soul-force) liberated India from British colonial rule and revolutionized 20th-century social change. Developing his methods while fighting racial discrimination in South Africa for twenty years, Gandhi returned to India to lead nationwide nonviolent campaigns, including the Non-Cooperation Movement, the Salt March to Dandi, and the Quit India Movement. Living with radical simplicity in ashrams, spinning his own khadi cloth, and eating a minimalist diet, Gandhi demonstrated that political victory is meaningless without internal moral self-rule (Swaraj) and universal compassion.',
    keyWorks: [
      { title: "The Story of My Experiments with Truth", description: "Gandhi's candid autobiography chronicling his moral trials, dietetic experiments, spiritual search, and development of nonviolent resistance." },
      { title: "Hind Swaraj (Indian Home Rule)", description: "His foundational 1909 manifesto diagnosing the spiritual poverty of aggressive industrialism and outlining moral self-governance." },
      { title: "Non-Violence in Peace and War", description: "Collected essays and discourses detailing the philosophy, tactics, and personal discipline required for militant nonviolence." },
      { title: "Key to Health", description: "Reflections on bodily discipline, fasting, mental calm, and living in harmony with nature." }
    ],
    pillars: [
      { concept: 'Satyagraha (Truth-Force)', description: 'Holding relentlessly to Truth not through violence or coercion, but through self-suffering, moral persuasion, and unshakeable conviction.' },
      { concept: 'Ahimsa (Universal Nonviolence)', description: 'Not merely passive non-injury, but active love and goodwill toward all living beings, including one\'s opponents.' },
      { concept: 'Swaraj (Self-Mastery before Political Rule)', description: 'True freedom begins with mastering your own desires, fears, and ego; external liberation is a hollow shell without inner discipline.' },
      { concept: 'Sarvodaya (Welfare of All)', description: 'An economic and moral vision measuring the health of a society by the flourishing and dignity of its poorest, most vulnerable members.' }
    ],
    whyTimeless: 'Gandhi proved to humanity that moral force and uncompromising nonviolence can conquer imperial armies, providing the enduring playbook for Martin Luther King Jr., Nelson Mandela, and peace movements worldwide.'
  },

  'rabindranath-tagore': {
    slug: 'rabindranath-tagore',
    name: 'Rabindranath Tagore',
    longName: 'Rabindranath Tagore (Gurudev)',
    era: '1861 – 1941',
    tradition: 'Bengali Renaissance & Universal Humanism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rabindranath_Tagore',
    summary: 'First non-European Nobel laureate in Literature, poet, composer, educator, and philosopher of universal human consciousness and the harmony of nature.',
    bio: 'Rabindranath Tagore was a polymath from Calcutta whose monumental body of poetry, songs, plays, novels, essays, and paintings reshaped modern Bengali and Indian culture. In 1913, he was awarded the Nobel Prize in Literature for his transcendent verse collection Gitanjali (Song Offerings), mesmerizing figures such as W. B. Yeats and Ezra Pound. Tagore founded Visva-Bharati University in Santiniketan, creating an open-air educational sanctuary where humanity and nature commune without the rigid constraints of colonial schooling. Rejecting narrow nationalist chauvinism, Tagore advocated for universal humanism—a spiritual vision recognizing the sacred kinship between human creativity, cosmic harmony, and freedom of thought.',
    keyWorks: [
      { title: "Gitanjali (Song Offerings)", description: "The Nobel Prize-winning collection of 103 luminous prose poems expressing devotional intimacy, cosmic wonder, and surrender to the divine." },
      { title: "Sadhana: The Realization of Life", description: "Philosophical essays delivered at Harvard and Oxford exploring the Upanishadic worldview, the problem of evil, and the realization of unity." },
      { title: "The Religion of Man (Hibbert Lectures)", description: "Tagore's spiritual philosophy defining the divine as the universal humanity dwelling within the human heart." },
      { title: "Gora", description: "His epic novel exploring identity, caste, religious dogmatism, and the discovery of universal human fellowship." },
      { title: "The Post Office & Red Oleanders", description: "Lyrical dramas addressing freedom of the soul, bureaucratic mechanization, and the longing for spiritual beauty." }
    ],
    pillars: [
      { concept: 'Where the Mind is Without Fear', description: 'The ideal of a free society where knowledge is free, reason is not deadened by habit, and the mind is led into ever-widening thought.' },
      { concept: 'Cosmic Kinship with Nature', description: 'Human beings are not conquerors of nature, but harmonious notes in the eternal symphony of the earth, seasons, and cosmos.' },
      { concept: 'Divine Play (Lila) & Joy', description: 'Creation is not an act of grim necessity, but an overflowing expression of divine love, art, and joyous play.' },
      { concept: 'Universal Humanism', description: 'Transcending narrow sectarian borders and nationalistic greed to celebrate the shared spiritual heritage of all humankind.' }
    ],
    whyTimeless: 'Tagore’s lyrical voice elevates the soul above petty tribalism into a radiant sanctuary of peace, artistic freedom, and spiritual wonder.'
  },

  'jiddu-krishnamurti': {
    slug: 'jiddu-krishnamurti',
    name: 'Jiddu Krishnamurti',
    era: '1895 – 1986',
    tradition: 'Inquiry into Consciousness & Radical Insight',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Jiddu_Krishnamurti',
    summary: 'Revolutionary philosophical teacher who dissolved all spiritual organizations, declaring that "Truth is a pathless land" accessible only through direct, choiceless awareness.',
    bio: 'Jiddu Krishnamurti was born in Madanapalle, India, and groomed from youth by the Theosophical Society under Annie Besant and C. W. Leadbeater to be the messianic "World Teacher." In 1929, in a historic act of moral integrity, Krishnamurti dissolved the wealthy Order of the Star, declaring that truth cannot be approached through any religion, guru, ritual, or dogma. For the remaining six decades of his life, he traveled the world holding dialogues and giving discourses, urging listeners not to follow him as a disciple, but to examine their own minds with razor-sharp, non-judgmental observation. He investigated the nature of fear, sorrow, time, psychological conditioning, and the beauty of a mind that has stepped completely out of the prison of the ego.',
    keyWorks: [
      { title: "Freedom from the Known", description: "A distilled, urgent manifesto on stripping away psychological conditioning, fear, and authority to discover authentic freedom." },
      { title: "The First and Last Freedom", description: "Comprehensive dialogues on self-knowledge, the observer and the observed, love, and the ending of sorrow." },
      { title: "Commentaries on Living (Series 1 – 3)", description: "Intimate reflections on nature, encounters with everyday seekers, and direct psychological diagnoses of human suffering." },
      { title: "The Awakening of Intelligence", description: "Dialogues with quantum physicist David Bohm and other thinkers exploring thought, time, and the transformation of human consciousness." },
      { title: "Think on These Things", description: "Lectures to students on authentic education, fearlessness, ambition, and living with true creativity." }
    ],
    pillars: [
      { concept: 'Truth is a Pathless Land', description: 'No guru, belief system, or technique can lead to truth; spiritual realization requires direct, unmediated personal observation.' },
      { concept: 'Choiceless Awareness', description: 'Observing your thoughts, emotions, and reactions without judgment, comparison, condemnation, or justification.' },
      { concept: 'The Observer is the Observed', description: 'The inner division between "I" (the thinker) and "my thought" is an illusion; when this separation ends, psychological conflict dissolves.' },
      { concept: 'Freedom from Psychological Time', description: 'Suffering and anxiety are born when the mind projects psychological memories into future fears; real transformation happens only in the absolute now.' }
    ],
    whyTimeless: 'Krishnamurti strips spirituality of all superstitious comfort, challenging every individual to take complete responsibility for their own mind and live with clarity.'
  },

  'gautama-buddha': {
    slug: 'gautama-buddha',
    name: 'Gautama Buddha',
    longName: 'Siddhartha Gautama (The Buddha)',
    era: 'c. 563 – 483 BC',
    tradition: 'Early Buddhism & The Middle Way',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Gautama_Buddha',
    summary: 'The Enlightened One whose Four Noble Truths and Eightfold Path established a practical psychological science for the cessation of suffering.',
    bio: 'Siddhartha Gautama was born a prince of the Shakya clan in Kapilavastu. Confronted by the reality of aging, sickness, death, and asceticism (the Four Sights), he renounced his royal life at age 29 to seek an answer to universal human suffering. After six years of extreme mortification failed to bring insight, he realized the "Middle Way" between sensual indulgence and severe asceticism. Sitting in deep meditation under the Bodhi tree at Bodh Gaya, he attained Enlightenment (Bodhi). For the next 45 years, the Buddha walked across northern India teaching people of all castes, establishing the Sangha and teaching the Dhamma—a therapeutic, non-dogmatic path to mental liberation (Nibbana).',
    keyWorks: [
      { title: "Dhammapada", description: "423 pithy verses encapsulating the Buddha's ethical teachings, mindfulness, mastery of the mind, and the path of tranquility." },
      { title: "Dhammacakkappavattana Sutta (Setting the Wheel in Motion)", description: "The first sermon at Sarnath setting forth the Four Noble Truths and the Noble Eightfold Path." },
      { title: "Satipatthana Sutta (The Foundations of Mindfulness)", description: "The definitive manual on establishing mindfulness of the body, feelings, mind states, and mental phenomena." },
      { title: "Kalama Sutta (Charter of Free Inquiry)", description: "The landmark discourse instructing seekers never to accept teachings on authority or tradition, but to test them in direct experience." }
    ],
    pillars: [
      { concept: 'The Four Noble Truths', description: 'Understanding the reality of dissatisfaction (Dukkha), its origin in craving (Tanha), its cessation (Nirodha), and the Eightfold Path leading to its end (Magga).' },
      { concept: 'The Middle Path (Majjhima Patipada)', description: 'Avoiding the extremes of sensual obsession and self-punishing austerity, cultivating balanced ethical and mental clarity.' },
      { concept: 'Impermanence (Anicca) & Non-Self (Anatta)', description: 'All conditioned phenomena are in constant flux; clinging to an unchanging personal ego is the root of mental distress.' },
      { concept: 'Mind Precedes All States', description: 'The mind is the forerunner of all actions; with a purified mind, joy follows like a shadow that never leaves.' }
    ],
    whyTimeless: 'The Buddha provided humanity with a timeless, empirical psychology of liberation, proving that serenity and freedom from suffering are accessible through conscious mental training.'
  },

  'ramana-maharshi': {
    slug: 'ramana-maharshi',
    name: 'Ramana Maharshi',
    longName: 'Bhagavan Sri Ramana Maharshi',
    era: '1879 – 1950',
    tradition: 'Advaita Vedanta & Atma-Vichara (Self-Inquiry)',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Ramana_Maharshi',
    summary: 'The silent sage of Arunachala who taught Self-Inquiry (Atma-Vichara) as the direct, effortless path to awakening and peace.',
    bio: 'Ramana Maharshi was born Venkataraman Iyer in Madurai, South India. At age 16, he underwent a spontaneous, intense death experience where he simulated physical death and realized that while the body perishes, the underlying consciousness ("I AM") is eternal and deathless. Overwhelmed by this realization, he left home for the sacred hill of Arunachala in Tiruvannamalai, where he remained for the rest of his life. Living in caves before settling at Sri Ramanasramam, Maharshi welcomed visitors from around the world—including Paul Brunton, Somerset Maugham, and Carl Jung\'s associates. He rarely gave formal lectures; his primary teaching was the palpable, transformative power of silent presence (Mouna), supplemented by the practical method of Self-Inquiry: tracing every thought back to its origin by asking "Who am I?"',
    keyWorks: [
      { title: "Nan Yar? (Who Am I?)", description: "The distilled 28-question dialogue outlining the methodology of Self-Inquiry and the nature of the true Self." },
      { title: "Ulladu Narpadu (Forty Verses on Reality)", description: "A profound poetic treatise on non-dual metaphysics, the illusion of the world-dream, and resting in pure Being." },
      { title: "Upadesha Saram (Essence of Instruction)", description: "30 verses comparing action (Karma), devotion (Bhakti), breath control (Yoga), and wisdom (Jnana) in realizing the Self." },
      { title: "Talks with Sri Ramana Maharshi", description: "Three volumes recording his intimate, razor-sharp answers to seekers, philosophers, and spiritual wanderers over decades." }
    ],
    pillars: [
      { concept: 'Self-Inquiry (Atma-Vichara)', description: 'When any thought arises, do not follow it; immediately ask "To whom has this thought come?" and trace attention back to the source "I".' },
      { concept: 'The Power of Silence (Mouna)', description: 'Silence is not the absence of sound, but the presence of pure awareness; it is the most potent form of spiritual instruction.' },
      { concept: 'The Heart (Hridaya) as the Center', description: 'The true spiritual center is not a physical organ or conceptual chakra, but the seat of consciousness within where the ego subsides.' },
      { concept: 'Effortless Being (Sahaja Samadhi)', description: 'True realization does not require escaping to a cave; it is remaining aware of your true nature while engaging naturally in daily life.' }
    ],
    whyTimeless: 'Ramana Maharshi distilled the most complex metaphysics of ancient India into an intensely practical, immediate question—Who am I?—restoring peace to restless modern seekers.'
  },

  'paramahansa-yogananda': {
    slug: 'paramahansa-yogananda',
    name: 'Paramahansa Yogananda',
    longName: 'Paramahansa Yogananda (Mukunda Lal Ghosh)',
    era: '1893 – 1952',
    tradition: 'Kriya Yoga & Sanatana Dharma',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Paramahansa_Yogananda',
    summary: 'Pioneer of yoga in the West and author of Autobiography of a Yogi, who bridged Eastern meditative science with Western spiritual longing.',
    bio: 'Paramahansa Yogananda was an Indian monk and yogi who introduced millions of Westerners to meditation and Kriya Yoga through his masterwork Autobiography of a Yogi and the Self-Realization Fellowship (SRF). Initiated by his guru Swami Sri Yukteswar Giri in the sacred lineage of Lahiri Mahasaya and Mahavatar Babaji, Yogananda arrived in Boston in 1920 to address the International Congress of Religious Liberals. Across three decades of tireless lecturing, writing, and teaching in the United States, Yogananda presented yoga not as an esoteric cult, but as an empirical science of psycho-physical attunement and direct communion with the Infinite.',
    keyWorks: [
      { title: "Autobiography of a Yogi", description: "One of the most acclaimed spiritual autobiographies in modern history, introducing the science of Kriya Yoga, saints, and miracles." },
      { title: "God Talks With Arjuna: The Bhagavad Gita", description: "A monumental two-volume spiritual commentary revealing the Gita as an allegory of the inner psychological and yogic battle for self-mastery." },
      { title: "The Second Coming of Christ", description: "A detailed commentary on the Four Gospels demonstrating the unity between original Christianity and yogic consciousness." },
      { title: "Man's Eternal Quest & The Divine Romance", description: "Collected talks and essays on purpose, meditation, willpower, and overcoming fear." }
    ],
    pillars: [
      { concept: 'The Science of Kriya Yoga', description: 'A psycho-physiological technique that accelerates human spiritual evolution by neutralizing sensory restlessness and recharging the spine and brain.' },
      { concept: 'Direct Experience over Dogma', description: 'Spiritual truth is not a matter of blind theological belief, but a verifiable state of consciousness attained through regular meditation.' },
      { concept: 'The Unity of Eastern & Western Mysticism', description: 'The teachings of the Bhagavad Gita and the teachings of Jesus Christ point to the identical inner realization of God-consciousness.' },
      { concept: 'Dynamic Willpower', description: 'Will is the switch that controls the flow of energy in the human body; where the mind focuses with intense resolution, energy follows.' }
    ],
    whyTimeless: 'Yogananda opened the treasure-house of Indian meditative science to the modern world, inspiring everyone from Steve Jobs to George Harrison with his radiant warmth and spiritual depth.'
  },

  'sri-aurobindo': {
    slug: 'sri-aurobindo',
    name: 'Sri Aurobindo',
    longName: 'Sri Aurobindo (Aurobindo Ghose)',
    era: '1872 – 1950',
    tradition: 'Integral Yoga & Evolutionary Metaphysics',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sri_Aurobindo',
    summary: 'Philosopher, poet, and yogi who developed Integral Yoga, envisioning the evolutionary ascent of human consciousness to the Supermind.',
    bio: 'Aurobindo Ghose was born in Calcutta and educated in England at St. Paul\'s School, London, and King\'s College, Cambridge. Returning to India, he became a fiery leader in the early Indian nationalist struggle for complete independence (Purna Swaraj). Imprisoned by the British in the Alipore Bomb Case in 1908, Aurobindo experienced profound spiritual awakenings in his prison cell. Retiring from political activism in 1910, he established an ashram in Pondicherry with his spiritual collaborator, Mirra Alfassa ("The Mother"). Over the next forty years, Sri Aurobindo composed masterworks of philosophy and visionary epic poetry, developing "Integral Yoga"—a spiritual path aimed not at escaping the material world for Nirvana, but at divinizing earthly life and accelerating the evolution of consciousness.',
    keyWorks: [
      { title: "The Life Divine", description: "His 1,000-page philosophical magnum opus explaining the evolution of matter, life, and mind toward the Supramental divine consciousness." },
      { title: "Savitri: A Legend and a Symbol", description: "A monumental 24,000-line blank verse spiritual epic recounting the soul's conquest over death and fate." },
      { title: "The Synthesis of Yoga", description: "A comprehensive manual harmonizing the classical paths of Karma, Bhakti, and Jnana Yoga into a unified life practice." },
      { title: "The Human Cycle & The Ideal of Human Unity", description: "Studies in social and political philosophy exploring the psychological stages of human society toward universal solidarity." }
    ],
    pillars: [
      { concept: 'All Life is Yoga', description: 'Spiritual practice is not confined to meditation retreats; every action, relationship, and thought is an opportunity for conscious growth.' },
      { concept: 'Evolutionary Ascent to the Supermind', description: 'Man is a transitional being; just as life emerged from matter and mind from life, a higher Supramental consciousness is evolving in humanity.' },
      { concept: 'Transformation, Not Renunciation', description: 'The aim of spirituality is not to abandon the world as an illusion, but to transform body, mind, and society with divine light.' },
      { concept: 'The Psychic Being (Chaitya Purusha)', description: 'The divine spark in the deepest core of the heart that guides the soul\'s evolution through lifetimes.' }
    ],
    whyTimeless: 'Sri Aurobindo offers an audacious, evolutionary optimism for human destiny, inspiring thinkers, artists, and seekers to participate actively in the elevation of consciousness.'
  },

  chanakya: {
    slug: 'chanakya',
    name: 'Chanakya',
    longName: 'Chanakya (Kautilya / Vishnugupta)',
    era: 'c. 375 – 283 BC',
    tradition: 'Ancient Indian Statecraft & Political Realism',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Chanakya',
    summary: 'Master political strategist, economist, and royal advisor who united India under the Maurya Empire and authored the Arthashastra.',
    bio: 'Chanakya, also known as Kautilya or Vishnugupta, was a professor of political science and economics at the ancient university of Takshashila (Taxila). Witnessing the fragmentation of Indian kingdoms in the face of Alexander the Great\'s invasion, Chanakya engineered the overthrow of the corrupt Nanda dynasty and installed Chandragupta Maurya as emperor, establishing the vast Mauryan Empire. His masterwork, the Arthashastra, is the ancient world\'s most comprehensive treatise on statecraft, economic policy, military strategy, espionage, and civic duty. His aphorisms in Chanakya Niti remain celebrated for their piercing psychological realism and uncompromising emphasis on strategic foresight and self-discipline.',
    keyWorks: [
      { title: "Arthashastra", description: "The definitive 15-book Sanskrit manual on political administration, economic governance, foreign policy, law, and national defense." },
      { title: "Chanakya Niti (Maxims on Practical Life)", description: "A celebrated collection of aphorisms providing pragmatic counsel on leadership, ethics, human psychology, finance, and diplomacy." }
    ],
    pillars: [
      { concept: 'Indriya-Jaya (Self-Mastery in Leadership)', description: 'A leader who cannot conquer his own six internal enemies (lust, anger, greed, vanity, arrogance, and jealousy) will inevitably destroy his kingdom.' },
      { concept: 'Yogakshema (Welfare of the People)', description: 'In the happiness of his subjects lies the king\'s happiness; in their welfare his welfare. Whatever pleases himself he shall not consider as good, but whatever pleases his subjects he shall consider as good.' },
      { concept: 'Strategic Realism & Foresight', description: 'Anticipating potential crises before they manifest; acting with calculated pragmatism rather than emotional naivety.' },
      { concept: 'The Shield of Knowledge', description: 'Learning is like a friend in faraway lands; an educated mind possesses an armor that no enemy can breach.' }
    ],
    whyTimeless: 'Chanakya provided the ancient blueprint for effective governance and realpolitik, demonstrating that noble ideals require strategic discipline and realistic execution to survive.'
  },

  kabir: {
    slug: 'kabir',
    name: 'Kabir',
    longName: 'Sant Kabir Das',
    era: '15th Century (c. 1398 – 1518)',
    tradition: 'Nirguna Bhakti & Mystical Poetry',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Kabir',
    summary: 'Weaver, poet, and fearless mystic of Varanasi whose direct, piercing couplets (Dohas) rejected dogmatic sectarianism and celebrated inner divinity.',
    bio: 'Kabir was a 15th-century Indian mystic poet and saint born in Varanasi into a family of Muslim weavers (Julahas). Associated with the Bhakti and Sufi movements, Kabir composed hundreds of incandescent poems and two-line couplets (Dohas) in vernacular Hindi (Saddukkari). Unapologetically critical of ritual hypocrisy among both Hindu and Muslim orthodoxies, Kabir mocked sacred threads, external bathing in rivers, formal pilgrimages, and sectarian pride. Instead, he taught that the divine (Ram / Allah) resides within the lotus of the human heart, accessible directly through sincere love, moral truth, and inner silence without need for priestly middlemen.',
    keyWorks: [
      { title: "Bijak", description: "The foundational holy compilation of Kabir's poems, songs (shabdas), and couplets (sakhis), preserved by the Kabir Panth." },
      { title: "The Dohas of Kabir", description: "Hundreds of razor-sharp two-line aphorisms distilling life lessons, spiritual discernment, and the vanity of the ego." },
      { title: "Kabir Granthavali & Guru Granth Sahib verses", description: "Over 500 hymns included in the sacred Sikh scripture, celebrated for their pure monotheism and moral power." }
    ],
    pillars: [
      { concept: 'The Divine Within the Heart', description: 'Just as the musk deer searches the forest for the fragrance that resides within its own navel, humans wander to temples while God dwells in the heart.' },
      { concept: 'Piercing the Veil of Hypocrisy', description: 'Rejecting external rituals, caste prejudice, and religious posturing that serve only to flatter the ego.' },
      { concept: 'The Transient Spark of Life', description: 'Life is like a bubble on the surface of water; do not waste your brief moment on petty arguments and endless accumulation.' },
      { concept: 'Sahaj Samadhi (Natural Intimacy with Truth)', description: 'Spiritual liberation is living naturally, working sincerely as a weaver, and remaining quietly attuned to the divine breath (Soham).' }
    ],
    whyTimeless: 'Kabir’s fearless honesty and earthy wit puncture religious pretension, calling humanity back to what truly matters: love, humility, and inner purity.'
  },

  'adi-shankara': {
    slug: 'adi-shankara',
    name: 'Adi Shankara',
    longName: 'Adi Shankaracharya',
    era: 'c. 788 – 820 AD',
    tradition: 'Advaita Vedanta (Non-Dualism)',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Adi_Shankara',
    summary: 'Philosopher, master dialectician, and theologian who consolidated the doctrine of Advaita Vedanta (non-dual reality) across India.',
    bio: 'Adi Shankara was born in Kalady, Kerala, and became a sanyasin at an early age under Govinda Bhagavatpada. In a brief life of 32 years, Shankara traveled barefoot across the length and breadth of the Indian subcontinent, engaging scholars of diverse traditions in philosophical debates and establishing four monastic centers (Mathas) at Sringeri, Puri, Dwaraka, and Joshimath. He wrote definitive commentaries (Bhashyas) on the Principal Upanishads, the Bhagavad Gita, and the Brahma Sutras (the Prasthanatrayi). Shankara’s philosophy posits that ultimate reality is non-dual consciousness (Brahman); the perceived universe of separate objects is an appearance produced by Maya, and the individual soul (Atman) is fundamentally identical with Brahman.',
    keyWorks: [
      { title: "Brahmasutra Bhashya", description: "The cornerstone commentary systematizing non-dual metaphysics and resolving apparent scriptural contradictions." },
      { title: "Vivekachudamani (Crest-Jewel of Discrimination)", description: "A luminous poetic dialogue between teacher and student on cultivating discrimination between the Real and the Unreal." },
      { title: "Atmabodha (Self-Knowledge)", description: "68 verses providing direct metaphors to awaken the intellect to its own non-dual nature." },
      { title: "Bhaja Govindam (Moha Mudgara)", description: "A famous devotional hymn shattering the illusions of wealth, youth, and pedantic grammar in the face of inevitable mortality." }
    ],
    pillars: [
      { concept: 'Brahman Satyam, Jagan Mithya', description: 'Brahman (pure consciousness) alone is real; the universe of changing forms is an appearance (Mithya); the individual Self is not different from Brahman.' },
      { concept: 'Viveka (Spiritual Discrimination)', description: 'The sharp capacity of the intellect to distinguish between the eternal, unchanging Self and fleeting, perishable phenomena.' },
      { concept: 'Vairagya (Dispassion)', description: 'Freedom from obsessive thirst for temporary sensory objects, clearing the mental mirror to reflect truth.' },
      { concept: 'Liberation through Knowledge (Jnana)', description: 'Ignorance (Avidya) is the sole cause of bondage; only direct experiential knowledge of non-duality can dissolve the illusion of suffering.' }
    ],
    whyTimeless: 'Adi Shankara provided the ultimate summit of philosophical non-dualism, presenting a rigorous, luminous intellectual framework for spiritual unity that continues to captivate global philosophers.'
  },

  patanjali: {
    slug: 'patanjali',
    name: 'Patanjali',
    longName: 'Maharshi Patanjali',
    era: 'c. 2nd Century BC',
    tradition: 'Classical Yoga Philosophy (Raja Yoga)',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Patanjali',
    summary: 'Ancient sage and grammarian who systematized Classical Yoga philosophy into the 196 aphorisms of the Yoga Sutras.',
    bio: 'Patanjali was an ancient Indian sage revered for compiling the Yoga Sutras, the foundational text of Classical Yoga philosophy (one of the six orthodox Darshanas of Indian thought). In 196 concise aphorisms (sutras), Patanjali mapped human psychology, the mechanics of mental distraction, and the systematic eight-limbed methodology (Ashtanga Yoga) to calm the turbulent lake of the mind. Treating consciousness with empirical precision, Patanjali articulated that the ultimate goal of yoga is not physical acrobatics, but Kaivalya—the absolute freedom and self-realization of the seer (Purusha) resting in its own pristine nature.',
    keyWorks: [
      { title: "Yoga Sutras of Patanjali", description: "The definitive 4-chapter manual (Samadhi, Sadhana, Vibhuti, Kaivalya) outlining the Eight Limbs of Yoga and the mastery of the mind." },
      { title: "Mahabhashya", description: "The classical commentary on Panini's Sanskrit grammar, celebrated for its linguistic brilliance and philosophical rigor." }
    ],
    pillars: [
      { concept: 'Yogas Chitta Vritti Nirodha', description: 'Yoga is the intentional stilling and mastery of the fluctuations and patterns of the mind.' },
      { concept: 'Ashtanga Yoga (The Eight Limbs)', description: 'The comprehensive framework for living: Yama (ethics), Niyama (discipline), Asana (posture), Pranayama (breath), Pratyahara (sensory withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption).' },
      { concept: 'Abhyasa & Vairagya', description: 'Progress is achieved through two complementary wings: persistent, dedicated practice (Abhyasa) and calm non-attachment to outcomes (Vairagya).' },
      { concept: 'The Seer Rests in Its True Nature', description: 'When the mind becomes quiet, the consciousness that observes reality stops identifying with passing mental waves and rests in its own pristine state.' }
    ],
    whyTimeless: 'Patanjali created humanity\'s most enduring architecture for mental mastery and meditation, providing practical steps to turn mental chaos into profound inner stillness.'
  },

  thiruvalluvar: {
    slug: 'thiruvalluvar',
    name: 'Thiruvalluvar',
    longName: 'Thiruvalluvar (Valluvar)',
    era: 'c. 4th – 5th Century AD',
    tradition: 'Classical Tamil Ethical Philosophy',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Thiruvalluvar',
    summary: 'Ancient Tamil philosopher and poet whose masterwork, the Tirukkural, offers 1,330 couplets of universal secular ethics, statecraft, and human love.',
    bio: 'Thiruvalluvar was an ancient Tamil poet and philosopher traditionally believed to have lived in Mylapore (modern Chennai). His masterwork, the Tirukkural (The Sacred Couplets), is revered as the Tamil Veda (Tamil Marai) and stands as one of the world\'s greatest ethical texts. Consisting of 1,330 couplets organized into 133 chapters across three universal realms—Aram (Virtue/Dharma), Porul (Wealth/Statecraft), and Inbam (Love/Kama)—the Kural is uniquely non-sectarian, free of dogma, and grounded in universal moral realism. Valluvar provides practical wisdom on speech, friendship, gratitude, righteous governance, agricultural labor, and domestic tenderness.',
    keyWorks: [
      { title: "Tirukkural (Book I: Virtue / Aram)", description: "Couplets on domestic virtue, ascetic discipline, truthfulness, compassion, gratitude, and hospitality." },
      { title: "Tirukkural (Book II: Wealth & Statecraft / Porul)", description: "Discourses on good governance, citizenship, justice, diplomacy, friendship, and the nobility of honest work." },
      { title: "Tirukkural (Book III: Love / Inbam)", description: "Subtle lyrical verses exploring courtship, mutual devotion, separation, and romantic intimacy." }
    ],
    pillars: [
      { concept: 'Righteous Living as Supreme Duty (Aram)', description: 'Virtue is not an abstract religious formula; it is living without envy, greed, anger, and harsh words in everyday life.' },
      { concept: 'The Golden Debt of Gratitude', description: 'Never forget the benefit received from another; help rendered in the hour of need, though small as a grain of millet, is larger than the ocean.' },
      { concept: 'Impartial Justice & Kind Speech', description: 'True nobility is speaking sweet words with a smiling face and acting with equal fairness toward friends and strangers alike.' },
      { concept: 'Dignity of Labor', description: 'Even if the gods do not grant success, honest physical effort will yield its own inevitable fruit.' }
    ],
    whyTimeless: 'Thiruvalluvar’s Tirukkural remains a lighthouse of practical, secular morality that applies universally to every culture, government, and individual seeking a life of integrity.'
  },

  'apj-abdul-kalam': {
    slug: 'apj-abdul-kalam',
    name: 'A. P. J. Abdul Kalam',
    longName: 'Dr. Avul Pakir Jainulabdeen Abdul Kalam',
    era: '1931 – 2015',
    tradition: 'Modern Humanism, Science & Civic Vision',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/A._P._J._Abdul_Kalam',
    summary: 'Aerospace scientist, author, and 11th President of India, celebrated as the "People\'s President" for his humility and lifelong dedication to youth empowerment.',
    bio: 'Dr. A. P. J. Abdul Kalam was born into a humble Tamil Muslim boat-owner\'s family in Rameswaram, Tamil Nadu. Overcoming poverty through scholarship and relentless work ethic, he became India\'s leading aerospace scientist, directing India\'s civilian space program (SLV-III) and defense missile development. Serving as the 11th President of India from 2002 to 2007, Kalam transformed the presidency into an accessible beacon of hope, interacting personally with over 15 million young students. A practicing vegetarian who played the Veena and studied both the Quran and the Bhagavad Gita, Kalam championed scientific inquiry, national self-reliance, and ethical leadership with child-like innocence and profound wisdom.',
    keyWorks: [
      { title: "Wings of Fire", description: "His inspirational autobiography tracing his journey from the beaches of Rameswaram to leading India's space and technological milestones." },
      { title: "Ignited Minds: Unleashing the Power Within India", description: "A call to action urging the youth to dream boldly and harness scientific and moral innovation." },
      { title: "Guiding Souls: Dialogues on the Purpose of Life", description: "Philosophical reflections on spirituality, duty, consciousness, and the role of ethics in technology." },
      { title: "India 2020: A Vision for the New Millennium", description: "A strategic roadmap for eliminating poverty and building a knowledge-based, self-sufficient society." }
    ],
    pillars: [
      { concept: 'Dreams are not What You See in Sleep', description: 'Dreams are the thoughts and aspirations that refuse to let you sleep until you bring them into reality.' },
      { concept: 'Learning Gives Creativity', description: 'Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great.' },
      { concept: 'Servant Leadership & Integrity', description: 'When there is righteousness in the heart, there is beauty in the character; when there is beauty in character, there is harmony in the nation.' },
      { concept: 'Courage to Walk the Unexplored Path', description: 'True courage is discovering the impossible, combating problems with confidence, and succeeding with integrity.' }
    ],
    whyTimeless: 'Dr. Kalam proved that unshakeable humility, scientific mastery, and moral innocence can coexist at the pinnacle of power, inspiring generations to live with purposeful passion.'
  },

  'sarvepalli-radhakrishnan': {
    slug: 'sarvepalli-radhakrishnan',
    name: 'Sarvepalli Radhakrishnan',
    longName: 'Dr. Sarvepalli Radhakrishnan',
    era: '1888 – 1975',
    tradition: 'Comparative Philosophy & Neo-Vedanta',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sarvepalli_Radhakrishnan',
    summary: 'Distinguished Oxford philosopher, statesman, and 2nd President of India who built intellectual bridges between Eastern mysticism and Western philosophy.',
    bio: 'Dr. Sarvepalli Radhakrishnan was an Indian philosopher, scholar, and statesman who served as the first Vice President and second President of India. Educated at Madras Christian College, Radhakrishnan was appointed the Spalding Professor of Eastern Religions and Ethics at the University of Oxford in 1936, becoming one of the most prominent cultural ambassadors of Indian thought in the West. He was nominated sixteen times for the Nobel Prize in Literature and eleven times for the Nobel Peace Prize. Radhakrishnan demonstrated that Indian philosophy is not an archaic relic of asceticism, but a living, rational, and deeply experiential tradition capable of solving modern humanity\'s crisis of spiritual fragmentation.',
    keyWorks: [
      { title: "Indian Philosophy (Volumes 1 & 2)", description: "The definitive 2-volume masterwork that systematically mapped the Vedas, Upanishads, Buddhism, Jainism, and the six orthodox Darshanas." },
      { title: "The Principal Upanishads", description: "A celebrated translation and extensive commentary illuminating the metaphysical core of Vedantic wisdom." },
      { title: "Eastern Religions and Western Thought", description: "Lectures exploring the historical interactions and philosophical syntheses between European thought and Indian mysticism." },
      { title: "An Idealist View of Life", description: "His Hibbert Lectures defending the necessity of intuitive spiritual knowledge in an age dominated by empirical skepticism." }
    ],
    pillars: [
      { concept: 'Intuition as Higher Reason', description: 'Spiritual intuition is not the opposite of reason; it is reason in its most elevated, integrated, and direct realization of truth.' },
      { concept: 'Philosophy as a Way of Life', description: 'Philosophy is not an abstract academic chess game; it is an active discipline of character transformation and moral striving.' },
      { concept: 'Universal Fellowship of Faiths', description: 'The world\'s religions are different dialects of the single universal language of the human spirit seeking the infinite.' },
      { concept: 'The Sacred Calling of Teaching', description: 'Teachers should be the best minds in the country; education must cultivate not merely technical intellect, but compassionate wisdom.' }
    ],
    whyTimeless: 'Radhakrishnan stood as a towering intellectual bridge between civilizations, proving that reason and spiritual intuition must unite for humanity to flourish.'
  }
};

/**
 * Helper to retrieve rich author profile with fallback and alias resolution
 */
export function getAuthorProfile(slug: string, fallbackName?: string): AuthorProfile {
  // Common alias normalization
  let normalizedSlug = slug.toLowerCase();
  if (normalizedSlug === 'buddha') normalizedSlug = 'gautama-buddha';
  if (normalizedSlug === 'shankara') normalizedSlug = 'adi-shankara';
  if (normalizedSlug === 'a-p-j-abdul-kalam' || normalizedSlug === 'kalam') normalizedSlug = 'apj-abdul-kalam';
  if (normalizedSlug === 'vivekananda') normalizedSlug = 'swami-vivekananda';
  if (normalizedSlug === 'gandhi') normalizedSlug = 'mahatma-gandhi';
  if (normalizedSlug === 'tagore') normalizedSlug = 'rabindranath-tagore';
  if (normalizedSlug === 'krishnamurti') normalizedSlug = 'jiddu-krishnamurti';
  if (normalizedSlug === 'aurobindo') normalizedSlug = 'sri-aurobindo';
  if (normalizedSlug === 'radhakrishnan') normalizedSlug = 'sarvepalli-radhakrishnan';

  if (authorProfiles[normalizedSlug]) {
    const prof = authorProfiles[normalizedSlug];
    return {
      ...prof,
      name: fallbackName || prof.name,
      longName: prof.longName || prof.name,
    };
  }

  const cleanName = fallbackName || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    slug,
    name: cleanName,
    longName: cleanName,
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

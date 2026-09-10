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
  }
};

/**
 * Helper to retrieve rich author profile with fallback
 */
export function getAuthorProfile(slug: string, fallbackName?: string): AuthorProfile {
  if (authorProfiles[slug]) {
    const prof = authorProfiles[slug];
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

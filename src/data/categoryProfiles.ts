export interface CategoryProfile {
  slug: string;
  name: string;
  summary: string;
  essay: string;
  themes: string[];
}

export const categoryProfiles: Record<string, CategoryProfile> = {
  philosophy: {
    slug: 'philosophy',
    name: 'Philosophy',
    summary: 'The love of wisdom, examining virtue, existence, truth, ethics, and the nature of human consciousness.',
    essay: 'Philosophy—from the Greek philosophia, "the love of wisdom"—is humanity’s ancient quest to examine the fundamental nature of existence, knowledge, and conduct. From the dialectic inquiry of Socrates in the Agora to the Stoic inner fortress of Marcus Aurelius, philosophical reflection anchors the human spirit. It asks not merely how things are, but how we ought to live, urging us to step out of the shadows of unexamined convention into the light of reason and self-mastery.',
    themes: ['Ethics & Moral Duty', 'The Examined Life', 'Stoicism & Virtue', 'Metaphysics & Truth', 'Dialectic & Reason']
  },
  resilience: {
    slug: 'resilience',
    name: 'Resilience',
    summary: 'Inner fortitude, endurance under hardship, overcoming adversity, and transforming obstacles into strength.',
    essay: 'Resilience is the sovereign capacity of the human spirit to endure catastrophe without losing dignity or inner peace. As the ancient Stoics recognized, we cannot control external circumstance, but we retain absolute command over our response. The obstacle is not merely in the way; it becomes the way. True resilience does not mean numbness to pain, but rather the heroic temper that turns grief, exile, and struggle into fuel for moral greatness.',
    themes: ['The Inner Citadel', 'Amor Fati (Love of Fate)', 'Post-Traumatic Growth', 'Endurance & Courage', 'Sovereignty of Will']
  },
  wisdom: {
    slug: 'wisdom',
    name: 'Wisdom',
    summary: 'Discernment, practical judgment, self-knowledge, and understanding the deeper rhythms of reality.',
    essay: 'Wisdom transcends mere intellectual cleverness or accumulated information; it is the lived ability to discern what is genuinely good, enduring, and true. Wisdom begins in humility—the Socratic realization of how little we truly know—and ripens into self-discipline, quiet contentment, and compassionate perspective. It teaches us to value time, need less, listen deeply, and act in harmony with reality.',
    themes: ['Intellectual Humility', 'The Value of Time', 'Simplicity & Contentment', 'Discernment', 'Self-Mastery']
  },
  spirituality: {
    slug: 'spirituality',
    name: 'Spirituality',
    summary: 'The awakening of consciousness, inner stillness, transcendence, and sacred connection to the whole.',
    essay: 'Spirituality is the inward pilgrimage toward the transcendent reality that underlies all fleeting phenomena. Transcending dogmatic ritual and sectarian doctrine, authentic spiritual wisdom points toward the silent witnessing presence within. Across Sufi poetry, Zen contemplation, Taoist yielding, and Christian mysticism, spirituality invites us to dissolve the illusion of the separate ego and experience reality as unified sacred wholeness.',
    themes: ['Silent Witnessing', 'Transcendence', 'Non-Duality & Unity', 'Inner Awakening', 'The Eternal Present']
  },
  love: {
    slug: 'love',
    name: 'Love',
    summary: 'Unconditional compassion, sacred devotion, empathy, and the fundamental bond connecting all beings.',
    essay: 'Love is far greater than romantic sentiment or emotional attachment; it is the supreme generative force of human existence and the language of the soul. In the mystical verses of Rumi and the Platonic ladder of Diotima, love dissolves selfishness and fear, revealing the sacred in the other. It is an act of courageous vulnerability, forgiving weakness, healing wounds, and uniting that which was divided.',
    themes: ['Universal Compassion', 'Mystical Devotion', 'Vulnerability & Forgiveness', 'The Healing Heart', 'Unconditional Care']
  },
  creativity: {
    slug: 'creativity',
    name: 'Creativity',
    summary: 'Artistic expression, originality, giving form to inspiration, and bringing new realities into the world.',
    essay: 'Creativity is the spark of divine play within human consciousness—the daring impulse to transform internal vision, sorrow, and wonder into enduring form. Whether through poetry, sculpture, music, or philosophy, creative striving requires confronting the blank canvas with courage. It teaches us that to give birth to a dancing star, one must first be willing to harbor internal chaos.',
    themes: ['Artistic Inspiration', 'Originality of Vision', 'Craftsmanship', 'Transformation of Sorrow', 'Creative Courage']
  },
  leadership: {
    slug: 'leadership',
    name: 'Leadership',
    summary: 'Servant leadership, moral responsibility, civic courage, and inspiring others through personal virtue.',
    essay: 'Timeless leadership is defined not by dominance, coercive authority, or vanity, but by self-command and devoted service to the common good. History’s greatest leaders lead first by example, holding themselves to a higher standard of integrity, justice, and humility. True leadership uplifts others, remaining steadfast in crisis and calm in the storm.',
    themes: ['Leading by Example', 'Servant Leadership', 'Civic Justice', 'Moral Fortitude', 'Humility in Power']
  },
  courage: {
    slug: 'courage',
    name: 'Courage',
    summary: 'Standing for truth, confronting fear, moral steadfastness, and defending the good against all odds.',
    essay: 'Courage is not the absence of fear, but the conviction that something else is more precious than safety. From Socrates drinking hemlock to modern voices speaking truth to tyranny, moral courage requires the resolve to stand upright when the multitude bends. It is the virtue that makes all other virtues possible in the hour of trial.',
    themes: ['Moral Integrity', 'Confronting Fear', 'Standing Alone', 'Defending the Good', 'Unshakable Resolve']
  },
  mindfulness: {
    slug: 'mindfulness',
    name: 'Mindfulness',
    summary: 'Present-moment awareness, non-judgmental observation, stillness, and liberating clarity.',
    essay: 'Mindfulness is the gentle, unwavering art of resting awareness in the present moment without grasping or aversion. In an age of relentless distraction and anxiety, mindfulness returns us to the body, the breath, and the immediate sensation of living. It reveals that the past is a memory, the future is an anticipation, and life only ever exists here and now.',
    themes: ['The Present Moment', 'Breath & Stillness', 'Non-Judgmental Awareness', 'Release of Anxiety', 'Clarity of Mind']
  },
  nature: {
    slug: 'nature',
    name: 'Nature',
    summary: 'Harmony with the wild, cosmic rhythm, stillness in the elements, and sacred ecological kinship.',
    essay: 'Nature is our primary teacher—a living mirror of balance, patience, and renewal. As Lao Tzu observed, nature does not hurry, yet everything is accomplished. By immersing ourselves in the forests, mountains, and oceans, we strip away artificial pretense and remember that we are not separate observers of the Earth, but woven into its living fabric.',
    themes: ['The Natural Rhythm', 'Solitude in the Wild', 'Ecological Kinship', 'Patience of the Elements', 'Renewal']
  },
  life: {
    slug: 'life',
    name: 'Life',
    summary: 'Living deliberately, finding purpose, celebrating the mortal journey, and embracing each day.',
    essay: 'Life is a fleeting, miraculous gift granted for a brief interval between two eternities. To live well requires deliberate attention—treating each separate day as a complete life, refusing to postpone virtue or joy for an uncertain tomorrow, and savoring the quiet poetry of everyday existence.',
    themes: ['Deliberate Living', 'Daily Renewal', 'Embracing Mortality', 'Gratitude for Being', 'Purpose & Meaning']
  },
  science: {
    slug: 'science',
    name: 'Science & Cosmos',
    summary: 'Wonder, empirical inquiry, understanding the cosmos, and intellectual reverence for universal laws.',
    essay: 'Science is the structured pursuit of truth through wonder, skepticism, and empirical investigation. Looking upward into the starry heavens, humanity recognizes both its microscopic fragility and its extraordinary capacity to comprehend the laws of physics and cosmic evolution. As Carl Sagan observed, we are a way for the cosmos to know itself.',
    themes: ['Cosmic Perspective', 'Empirical Truth', 'Wonder & Awe', 'Intellectual Rigor', 'Humility before the Universe']
  },
  truth: {
    slug: 'truth',
    name: 'Truth',
    summary: 'Honesty, intellectual clarity, unvarnished reality, and alignment between thought and fact.',
    essay: 'Truth is the unyielding bedrock upon which enduring character and civilization rest. While falsehoods may offer temporary flattery or comfort, truth alone endures the passage of time. Seeking truth demands radical honesty with oneself, stripping away vanity, confirmation bias, and comforting illusions.',
    themes: ['Intellectual Honesty', 'Truth vs Appearance', 'Integrity of Speech', 'Unvarnished Reality', 'Clarity']
  },
  happiness: {
    slug: 'happiness',
    name: 'Happiness & Flourishing',
    summary: 'Eudaimonia, tranquility of spirit, inner joy, and living in accordance with virtue.',
    essay: 'True happiness (eudaimonia) is not hedonistic pleasure or temporary euphoria; it is the deep, steady flourishing that arises from living in accordance with reason, virtue, and purpose. Unlike external fortune which can be stolen overnight, genuine inner joy belongs to the sovereign soul that needs little and loves deeply.',
    themes: ['Eudaimonia (Flourishing)', 'Tranquility (Ataraxia)', 'Inner Joy', 'Freedom from Want', 'Gratitude']
  },
  psychology: {
    slug: 'psychology',
    name: 'Psychology & Human Behavior',
    summary: 'The science and philosophy of mind, exploring unconscious drives, cognitive habits, emotional mastery, the shadow, and the will to meaning.',
    essay: 'Psychology—from the Greek psyche, "soul or breath of life"—is humanity\'s relentless effort to understand the inner mechanics of consciousness, motive, and behavior. Long before the advent of clinical laboratories, ancient moralists, Stoic thinkers, and Renaissance essayists engaged in rigorous self-observation, dissecting vanity, fear, rationalization, and the illusions of the ego. In the modern era, depth psychology and existential analysis revealed that human beings are propelled not merely by biological instincts, but by a profound, inescapable hunger for meaning and self-transcendence. To study human behavior is to examine the shadow within, to master the plasticity of habit, and to claim the sovereign freedom of choosing our attitude in any circumstance.',
    themes: [
      'Depth Psychology & The Shadow',
      'The Will to Meaning',
      'Habit Formation & Plasticity',
      'Emotional Mastery & Affects',
      'Self-Deception & Character',
      'Voluntary Attention & Focus'
    ]
  }
};

export function getCategoryProfile(slug: string, fallbackName?: string): CategoryProfile {
  if (categoryProfiles[slug]) {
    return categoryProfiles[slug];
  }

  const cleanName = fallbackName || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    slug,
    name: cleanName,
    summary: `Curated reflections and timeless quotes exploring ${cleanName.toLowerCase()}.`,
    essay: `Explore timeless wisdom, reflections, and philosophical insights on ${cleanName.toLowerCase()}, curated from history's most profound thinkers.`,
    themes: ['Wisdom', 'Reflection', 'Human Flourishing']
  };
}

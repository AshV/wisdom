/**
 * Wisdom Theme — Modern Documentation & Interactive Showcase Script
 * High performance, zero external dependencies.
 */

// Multilingual showcase quote data for the 3 live editions
const SHOWCASE_DATA = {
  en: {
    brand: "Element",
    liveUrl: "https://www.ashishvishwakarma.com/element/",
    accent: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.25)",
    delveText: "Delve into Thinker",
    quotes: [
      {
        content: "The wound is the place where the light enters you.",
        author: "Rumi",
        source: "The Masnavi, Book I",
        category: "Wisdom",
        mood: "Reflective",
        tags: ["healing", "light", "growth"],
        likes: 92
      },
      {
        content: "The happiness of your life depends upon the quality of your thoughts.",
        author: "Marcus Aurelius",
        source: "Meditations, Book III",
        category: "Philosophy",
        mood: "Serene",
        tags: ["mindset", "happiness", "stoicism"],
        likes: 128
      }
    ]
  },
  hi: {
    brand: "तत्व",
    liveUrl: "https://www.ashishvishwakarma.com/tatva/",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
    delveText: "विचारक का परिचय",
    quotes: [
      {
        content: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥",
        author: "कबीर दास",
        source: "कबीर ग्रंथावली",
        category: "प्रेम व ज्ञान",
        mood: "दार्शनिक",
        tags: ["प्रेम", "ज्ञान", "सत्य"],
        likes: 145
      },
      {
        content: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।",
        author: "स्वामी विवेकानंद",
        source: "युगनायक विवेकानंद",
        category: "प्रेरणा",
        mood: "ओजस्वी",
        tags: ["संकल्प", "लक्ष्य", "ऊर्जा"],
        likes: 184
      }
    ]
  },
  es: {
    brand: "Elemento",
    liveUrl: "https://www.ashishvishwakarma.com/elemento/",
    accent: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.25)",
    delveText: "Dossier del Pensador",
    quotes: [
      {
        content: "El que lee mucho y anda mucho, ve mucho y sabe mucho.",
        author: "Miguel de Cervantes",
        source: "Don Quijote de la Mancha",
        category: "Sabiduría",
        mood: "Contemplativo",
        tags: ["sabiduría", "lectura", "vida"],
        likes: 76
      },
      {
        content: "No es pobre el que tiene poco, sino el que mucho desea.",
        author: "Séneca",
        source: "Cartas a Lucilio",
        category: "Filosofía",
        mood: "Estoico",
        tags: ["estoicismo", "deseo", "paz"],
        likes: 95
      }
    ]
  }
};

let currentLang = 'en';
let currentQuoteIdx = 0;
let userLikedQuotes = new Set();

function renderStudio(lang, quoteIndex = 0) {
  currentLang = lang;
  const langConfig = SHOWCASE_DATA[lang];
  if (!langConfig) return;

  const quotesList = langConfig.quotes;
  currentQuoteIdx = (quoteIndex + quotesList.length) % quotesList.length;
  const quote = quotesList[currentQuoteIdx];

  // Update elements
  const screenBrandTitle = document.getElementById('screen-brand-title');
  const screenMoodBadge = document.getElementById('screen-mood-badge');
  const quoteTextEl = document.getElementById('studio-quote-text');
  const authorNameEl = document.getElementById('studio-author-name');
  const sourceWorkEl = document.getElementById('studio-source-work');
  const tagsEl = document.getElementById('studio-tags');
  const liveLinkEl = document.getElementById('studio-live-link');
  const counterEl = document.getElementById('studio-counter');
  const delveBtnLabel = document.getElementById('delve-btn-label');
  const mockupGlow = document.getElementById('mockup-glow');
  const studioScreen = document.getElementById('studio-screen');
  const likeBtn = document.getElementById('studio-like-btn');
  const likeCountEl = document.getElementById('studio-like-count');

  if (screenBrandTitle) screenBrandTitle.textContent = langConfig.brand;
  if (screenMoodBadge) {
    screenMoodBadge.textContent = `✦ ${quote.mood}`;
    screenMoodBadge.style.color = langConfig.accent;
    screenMoodBadge.style.borderColor = `${langConfig.accent}44`;
  }

  if (quoteTextEl) {
    quoteTextEl.style.opacity = '0';
    setTimeout(() => {
      quoteTextEl.textContent = quote.content;
      quoteTextEl.setAttribute('data-lang', lang);
      quoteTextEl.style.opacity = '1';
    }, 150);
  }

  if (authorNameEl) {
    authorNameEl.textContent = `— ${quote.author}`;
    authorNameEl.setAttribute('data-lang', lang);
  }

  if (sourceWorkEl) {
    sourceWorkEl.textContent = quote.source;
  }

  if (tagsEl) {
    tagsEl.innerHTML = quote.tags
      .map(tag => `<span class="screen-tag-pill">#${tag}</span>`)
      .join('');
  }

  if (liveLinkEl) {
    liveLinkEl.href = langConfig.liveUrl;
    liveLinkEl.style.color = langConfig.accent;
  }

  if (counterEl) {
    counterEl.textContent = `${currentQuoteIdx + 1} / ${quotesList.length}`;
  }

  if (delveBtnLabel) {
    delveBtnLabel.textContent = langConfig.delveText;
  }

  if (mockupGlow) {
    mockupGlow.style.background = `radial-gradient(circle at center, ${langConfig.glow} 0%, transparent 70%)`;
  }

  if (studioScreen) {
    studioScreen.style.setProperty('--studio-accent', langConfig.accent);
  }

  // Update tabs
  document.querySelectorAll('.studio-tab-btn').forEach(btn => {
    const isSelected = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  // Update like state
  const quoteKey = `${lang}-${currentQuoteIdx}`;
  const isLiked = userLikedQuotes.has(quoteKey);
  const totalLikes = quote.likes + (isLiked ? 1 : 0);

  if (likeCountEl) likeCountEl.textContent = totalLikes;
  if (likeBtn) likeBtn.classList.toggle('active-like', isLiked);
}

// Like Button & Heart Burst Trigger
function setupLikes() {
  const likeBtn = document.getElementById('studio-like-btn');
  const heartBurst = document.getElementById('heart-burst');
  if (!likeBtn) return;

  likeBtn.addEventListener('click', () => {
    const quoteKey = `${currentLang}-${currentQuoteIdx}`;
    const wasLiked = userLikedQuotes.has(quoteKey);

    if (wasLiked) {
      userLikedQuotes.delete(quoteKey);
    } else {
      userLikedQuotes.add(quoteKey);
      if (heartBurst) {
        heartBurst.classList.remove('animate');
        void heartBurst.offsetWidth; // trigger reflow
        heartBurst.classList.add('animate');
        setTimeout(() => heartBurst.classList.remove('animate'), 750);
      }
    }

    renderStudio(currentLang, currentQuoteIdx);
  });
}

// Copy Buttons Functionality
function setupCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = (targetEl.innerText || targetEl.textContent).trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = button.innerHTML;
        button.innerHTML = `<span>✓</span> <span>Copied!</span>`;
        button.classList.add('copied');
        setTimeout(() => {
          button.innerHTML = originalHtml;
          button.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
}

// Config Reference Table Search / Filter
function setupTableFilter() {
  const filterInput = document.getElementById('config-search');
  if (!filterInput) return;

  filterInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#config-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// Mobile Menu Navigation Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// Interactive Studio Navigation (Arrows & Tabs)
function setupStudioNavigation() {
  // Tabs
  document.querySelectorAll('.studio-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      renderStudio(lang, 0);
    });
  });

  // Showcase card preview eye buttons
  document.querySelectorAll('[data-switch-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-switch-lang');
      renderStudio(lang, 0);

      // Smooth scroll to studio
      const studioSec = document.getElementById('studio');
      if (studioSec) {
        studioSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Previous & Next arrows
  const prevBtn = document.getElementById('studio-prev-btn');
  const nextBtn = document.getElementById('studio-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      renderStudio(currentLang, currentQuoteIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      renderStudio(currentLang, currentQuoteIdx + 1);
    });
  }

  // Delve pill button click
  const delvePill = document.getElementById('studio-delve-pill');
  const delveTrigger = document.getElementById('studio-delve-trigger');
  const handleDelveClick = () => {
    const langConfig = SHOWCASE_DATA[currentLang];
    const quote = langConfig.quotes[currentQuoteIdx];
    alert(`📖 Dossier Preview:\n\nThinker: ${quote.author}\nWork: ${quote.source}\nCategory: ${quote.category}\nMood: ${quote.mood}\n\nTo view the complete editorial dossier, open the live website at ${langConfig.liveUrl}`);
  };

  if (delvePill) delvePill.addEventListener('click', handleDelveClick);
  if (delveTrigger) delveTrigger.addEventListener('click', handleDelveClick);

  // Share button
  const shareBtn = document.getElementById('studio-share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const langConfig = SHOWCASE_DATA[currentLang];
      const quote = langConfig.quotes[currentQuoteIdx];
      const shareText = `“${quote.content}” — ${quote.author}\n${langConfig.liveUrl}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert(`Quote link copied to clipboard!\n\n${shareText}`);
      }).catch(() => {
        alert(shareText);
      });
    });
  }
}

// Initial Setup
window.addEventListener('DOMContentLoaded', () => {
  setupCopyButtons();
  setupTableFilter();
  setupMobileMenu();
  setupLikes();
  setupStudioNavigation();

  // Initial render (English)
  renderStudio('en', 0);
});

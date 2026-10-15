/**
 * Wisdom Theme — Lightweight Documentation & Preview Script
 * Kept intentionally minimal for zero-maintenance and high performance.
 */

// Sample preview quotes demonstrating Wisdom's multilingual styling & moods
const PREVIEW_QUOTES = [
  {
    content: "The wound is the place where the light enters you.",
    author: "Rumi",
    source: "The Masnavi, Book I",
    lang: "en",
    category: "Wisdom",
    mood: "Reflective",
    moodClass: "mood-reflective",
    accent: "#6366f1",
    tags: ["healing", "light", "growth"]
  },
  {
    content: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥",
    author: "कबीर दास",
    source: "कबीर ग्रंथावली",
    lang: "hi",
    category: "प्रेम व ज्ञान",
    mood: "दार्शनिक",
    moodClass: "mood-philosophical",
    accent: "#a78bfa",
    tags: ["प्रेम", "ज्ञान", "सत्य"]
  },
  {
    content: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    source: "Meditations, Book III",
    lang: "en",
    category: "Philosophy",
    mood: "Serene",
    moodClass: "mood-serene",
    accent: "#06b6d4",
    tags: ["mindset", "happiness", "stoicism"]
  }
];

let currentQuoteIndex = 0;

function updatePreviewQuote(index) {
  currentQuoteIndex = (index + PREVIEW_QUOTES.length) % PREVIEW_QUOTES.length;
  const quote = PREVIEW_QUOTES[currentQuoteIndex];

  const cardEl = document.getElementById('preview-card');
  const quoteEl = document.getElementById('preview-quote-text');
  const authorEl = document.getElementById('preview-quote-author');
  const sourceEl = document.getElementById('preview-quote-source');
  const moodBadgeEl = document.getElementById('preview-quote-mood');
  const categoryEl = document.getElementById('preview-quote-category');
  const tagsEl = document.getElementById('preview-quote-tags');

  if (quoteEl) {
    quoteEl.textContent = `“${quote.content}”`;
    quoteEl.setAttribute('data-lang', quote.lang);
  }
  if (authorEl) {
    authorEl.textContent = `— ${quote.author}`;
    authorEl.setAttribute('data-lang', quote.lang);
  }
  if (sourceEl) {
    sourceEl.textContent = quote.source ? `, ${quote.source}` : '';
  }
  if (moodBadgeEl) {
    moodBadgeEl.textContent = `✦ ${quote.mood}`;
    moodBadgeEl.style.color = quote.accent;
    moodBadgeEl.style.borderColor = `${quote.accent}55`;
    moodBadgeEl.style.backgroundColor = `${quote.accent}22`;
  }
  if (categoryEl) {
    categoryEl.textContent = quote.category;
  }
  if (tagsEl) {
    tagsEl.innerHTML = quote.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('');
  }

  // Update active pill button
  document.querySelectorAll('.preview-tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentQuoteIndex);
  });

  // Subtle accent update
  if (cardEl) {
    cardEl.style.setProperty('--card-accent', quote.accent);
  }
}

// Setup Copy Buttons
function setupCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = targetEl.innerText || targetEl.textContent;
      navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = `<span>✓</span> <span>Copied!</span>`;
        button.classList.add('copied');
        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

// Setup Config Reference Table Filter
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

// Setup Mobile Menu Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Close when clicking any nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  setupCopyButtons();
  setupTableFilter();
  setupMobileMenu();

  // Preview quote switcher
  document.querySelectorAll('.preview-tab-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => updatePreviewQuote(idx));
  });

  const nextBtn = document.getElementById('preview-next-btn');
  const prevBtn = document.getElementById('preview-prev-btn');
  if (nextBtn) nextBtn.addEventListener('click', () => updatePreviewQuote(currentQuoteIndex + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => updatePreviewQuote(currentQuoteIndex - 1));

  // Initial preview render
  updatePreviewQuote(0);
});

/**
 * wiz-theme Showcase SPA Application Logic
 */

import { QUOTES, AUTHORS, MOODS, TRANSLATIONS, API_DOCS } from './data.js';
import { ambient } from './ambient.js';
import { cardGenerator } from './cardGenerator.js';

class WizApp {
  constructor() {
    this.currentView = 'home';
    this.currentLang = 'en';
    this.currentQuoteIndex = 0;
    this.isPhoneMode = false;
    this.likedQuotes = new Set();
    this.quotesList = [...QUOTES];

    // Theme Customizer State
    this.customizer = {
      siteName: 'Wisdom',
      subtitle: 'Timeless Quotes, Reimagined',
      brandingText: 'wisdom.reels',
      lang: 'en',
      mood: 'reflective',
      accent: '#6366f1',
      typography: 'playfair',
    };

    // Load liked quotes from localStorage
    try {
      const savedLikes = JSON.parse(localStorage.getItem('wiz_liked_quotes') || '[]');
      this.likedQuotes = new Set(savedLikes);
    } catch (e) {
      this.likedQuotes = new Set();
    }
  }

  init() {
    // 1. Initialize generative ambient canvas & audio engine
    ambient.init('ambient-canvas', 'particles-canvas');

    // 2. Setup navigation and view routing
    this.setupNavigation();

    // 3. Render reel slides and setup interaction handlers
    this.renderReel();
    this.setupReelEvents();

    // 4. Setup modals
    this.setupModals();

    // 5. Setup customizer & playground
    this.setupCustomizer();

    // 6. Setup Quotes Explorer catalog
    this.renderQuotesCatalog();

    // 7. Setup Documentation table
    this.renderDocsTable();

    // 8. Global UI controls (Language, Audio Chimes, Phone frame toggle)
    this.setupGlobalControls();

    // Check hash for direct deep linking (e.g. #demo, #customizer, #features, #quotes, #docs)
    this.handleRouteHash();
    window.addEventListener('hashchange', () => this.handleRouteHash());

    // Update initial mood tokens
    this.updateMoodTokens(this.quotesList[0]?.mood || 'reflective');
  }

  // ── Routing & Navigation ──────────────────────────────────────
  setupNavigation() {
    document.querySelectorAll('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.dataset.viewTarget;
        this.switchView(targetView);
      });
    });
  }

  handleRouteHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (['home', 'demo', 'customizer', 'features', 'quotes', 'docs'].includes(hash)) {
      this.switchView(hash, false);
    }
  }

  switchView(viewName, updateHash = true) {
    this.currentView = viewName;
    if (updateHash) {
      window.location.hash = viewName === 'home' ? '' : viewName;
    }

    // Update nav pill buttons
    document.querySelectorAll('.nav-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewTarget === viewName);
    });

    // Update view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) {
      activeSec.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // If switching to demo, ensure reel sizing and scroll are synced
    if (viewName === 'demo') {
      this.scrollToQuote(this.currentQuoteIndex, false);
    }
  }

  // ── Global Controls (Lang, Audio, Toast) ──────────────────────
  setupGlobalControls() {
    // Language Toggle
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.currentLang = this.currentLang === 'en' ? 'hi' : 'en';
        document.documentElement.setAttribute('data-lang', this.currentLang);
        langBtn.querySelector('.lang-label').textContent = this.currentLang === 'en' ? 'English' : 'हिन्दी';
        
        // Filter or update quotes according to language preference
        this.applyLanguage();
        this.showToast(this.currentLang === 'hi' ? 'भाषा: हिन्दी सक्रिय' : 'Language: English Active', '🌐');
      });
    }

    // Audio Chimes Toggle
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isActive = ambient.toggleAudio();
        audioBtn.classList.toggle('active', isActive);
        const title = isActive ? 'Zen Chimes Active (Click to mute)' : 'Chimes Muted (Click to enable)';
        audioBtn.setAttribute('title', title);
        this.showToast(isActive ? 'Zen Chimes Enabled (Tibetan singing bowls)' : 'Zen Chimes Muted', '🔔');
      });
    }

    // Phone Frame / Desktop Frame Toggle in Demo
    const phoneToggleBtn = document.getElementById('toggle-frame-btn');
    if (phoneToggleBtn) {
      phoneToggleBtn.addEventListener('click', () => {
        this.isPhoneMode = !this.isPhoneMode;
        const viewport = document.getElementById('reel-viewport');
        if (viewport) {
          viewport.classList.toggle('phone-mode', this.isPhoneMode);
        }
        phoneToggleBtn.classList.toggle('active', this.isPhoneMode);
        this.showToast(this.isPhoneMode ? 'Phone 9:16 Mockup Frame' : 'Immersive Desktop Frame', '📱');
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      // Don't intercept if inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (this.currentView === 'demo') {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          this.nextQuote();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          this.prevQuote();
        } else if (e.key.toLowerCase() === 'l') {
          this.toggleLike(this.quotesList[this.currentQuoteIndex]?.id);
        } else if (e.key.toLowerCase() === 'd') {
          this.openDelveModal(this.quotesList[this.currentQuoteIndex]);
        } else if (e.key.toLowerCase() === 's') {
          this.openShareModal(this.quotesList[this.currentQuoteIndex]);
        } else if (e.key.toLowerCase() === 'e') {
          this.openExploreDrawer();
        } else if (e.key.toLowerCase() === 'm') {
          document.getElementById('audio-toggle-btn')?.click();
        }
      }

      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  applyLanguage() {
    const t = TRANSLATIONS[this.currentLang];
    // Update theme title in header
    const brandTitle = document.querySelector('.brand-title');
    if (brandTitle) brandTitle.textContent = t.themeName;

    // Filter quotes list prioritizing selected language
    if (this.currentLang === 'hi') {
      this.quotesList = QUOTES.filter(q => q.lang === 'hi').concat(QUOTES.filter(q => q.lang !== 'hi'));
    } else {
      this.quotesList = QUOTES.filter(q => q.lang === 'en').concat(QUOTES.filter(q => q.lang !== 'en'));
    }

    this.currentQuoteIndex = 0;
    this.renderReel();
    this.renderQuotesCatalog();
  }

  // ── Reel Feed Implementation ──────────────────────────────────
  renderReel() {
    const reelContainer = document.getElementById('reel-feed-container');
    if (!reelContainer) return;

    reelContainer.innerHTML = '';

    this.quotesList.forEach((q, idx) => {
      const mood = MOODS[q.mood] || MOODS.reflective;
      const isLiked = this.likedQuotes.has(q.id);
      const isHindi = q.lang === 'hi';

      // Length-adaptive typography sizing
      const len = q.content.length;
      let fontSizeClamp = 'clamp(1.5rem, 3.8vw, 2.7rem)';
      if (len < 55) fontSizeClamp = 'clamp(2.1rem, 5.2vw, 3.8rem)';
      else if (len < 110) fontSizeClamp = 'clamp(1.7rem, 4.2vw, 3.1rem)';
      else if (len > 180) fontSizeClamp = 'clamp(1.25rem, 2.6vw, 1.95rem)';

      const slide = document.createElement('section');
      slide.className = 'reel-slide';
      slide.id = `slide-${q.id}`;
      slide.dataset.quoteId = q.id;
      slide.dataset.index = idx;
      slide.dataset.mood = q.mood;

      slide.innerHTML = `
        <!-- Top Overlay Header -->
        <div class="reel-header-overlay">
          <div class="reel-header-text">
            <h4 class="reel-header-title">${this.customizer.siteName}</h4>
            <span class="reel-header-subtitle">${this.customizer.subtitle}</span>
          </div>
          <div class="reel-mood-pill" style="color: ${mood.accent}; border-color: ${mood.border}; background: ${mood.glowSoft};">
            <span>✦</span>
            <span>${this.currentLang === 'hi' ? mood.nameHi : mood.name}</span>
          </div>
        </div>

        <!-- Center Quote Display -->
        <div class="quote-center-box" data-doubletap-zone="${q.id}">
          <span class="quote-mark" style="color: ${mood.accent};">“</span>
          <p class="quote-text" data-lang="${q.lang}" style="font-size: ${fontSizeClamp};">
            ${q.content}
          </p>

          <div class="quote-bottom-box">
            <div class="author-row">
              <a class="author-link" data-author-slug="${q.authorSlug}" data-lang="${q.lang}">
                <span class="author-name">${q.author}</span>
                ${q.sourceWork ? `<span class="source-work-citation">, <em>${q.sourceWork}</em></span>` : ''}
              </a>

              ${q.explanation ? `
                <button type="button" class="delve-pill-btn" data-delve-quote="${q.id}">
                  <span class="delve-star">✦</span>
                  <span>${this.currentLang === 'hi' ? 'विस्तार से समझें' : 'Delve'}</span>
                </button>
              ` : ''}
            </div>

            <div class="tags-row">
              ${(q.tags || []).map(t => `<span class="quote-tag">#${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

      reelContainer.appendChild(slide);
    });

    this.updateRailState();
  }

  setupReelEvents() {
    const feed = document.getElementById('reel-feed-container');
    if (!feed) return;

    // IntersectionObserver to detect currently active slide
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = parseInt(entry.target.dataset.index, 10);
          if (!isNaN(idx) && idx !== this.currentQuoteIndex) {
            this.currentQuoteIndex = idx;
            const quote = this.quotesList[idx];
            if (quote) {
              this.updateMoodTokens(quote.mood);
              this.updateRailState();
            }
          }
        }
      });
    }, {
      root: feed,
      threshold: 0.5
    });

    document.querySelectorAll('.reel-slide').forEach(s => observer.observe(s));

    // Next / Prev slide buttons
    document.getElementById('reel-prev-btn')?.addEventListener('click', () => this.prevQuote());
    document.getElementById('reel-next-btn')?.addEventListener('click', () => this.nextQuote());

    // Double-tap on quote zone to trigger like with burst
    let lastTap = 0;
    feed.addEventListener('touchend', (e) => {
      const now = Date.now();
      const zone = e.target.closest('[data-doubletap-zone]');
      if (zone) {
        if (now - lastTap < 300) {
          e.preventDefault();
          const quoteId = zone.dataset.doubletapZone;
          this.triggerDoubleTapLike(quoteId, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
        lastTap = now;
      }
    });

    // Double click for desktop
    feed.addEventListener('dblclick', (e) => {
      const zone = e.target.closest('[data-doubletap-zone]');
      if (zone) {
        const quoteId = zone.dataset.doubletapZone;
        this.triggerDoubleTapLike(quoteId, e.clientX, e.clientY);
      }
    });

    // Right Action Rail clicks
    document.getElementById('rail-like-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      if (quote) this.toggleLike(quote.id);
    });

    document.getElementById('rail-share-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      if (quote) this.openShareModal(quote);
    });

    document.getElementById('rail-delve-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      if (quote) this.openDelveModal(quote);
    });

    document.getElementById('rail-author-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      if (quote) this.openAuthorModal(quote.authorSlug);
    });

    document.getElementById('rail-dislike-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      if (quote) this.openDislikeModal(quote);
    });

    document.getElementById('rail-explore-btn')?.addEventListener('click', () => {
      this.openExploreDrawer();
    });

    // Event delegation for delve pill buttons & author links inside slides
    feed.addEventListener('click', (e) => {
      const delveBtn = e.target.closest('[data-delve-quote]');
      if (delveBtn) {
        const quoteId = delveBtn.dataset.delveQuote;
        const q = this.quotesList.find(x => x.id === quoteId);
        if (q) this.openDelveModal(q);
        return;
      }

      const authorLink = e.target.closest('[data-author-slug]');
      if (authorLink) {
        const slug = authorLink.dataset.authorSlug;
        this.openAuthorModal(slug);
        return;
      }
    });
  }

  scrollToQuote(index, smooth = true) {
    if (index < 0) index = 0;
    if (index >= this.quotesList.length) index = this.quotesList.length - 1;
    this.currentQuoteIndex = index;

    const targetSlide = document.getElementById(`slide-${this.quotesList[index]?.id}`);
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
      this.updateMoodTokens(this.quotesList[index]?.mood);
      this.updateRailState();
    }
  }

  nextQuote() {
    if (this.currentQuoteIndex < this.quotesList.length - 1) {
      this.scrollToQuote(this.currentQuoteIndex + 1);
    } else {
      this.showToast('You have reached the end of the curated reel ✨', '✦');
    }
  }

  prevQuote() {
    if (this.currentQuoteIndex > 0) {
      this.scrollToQuote(this.currentQuoteIndex - 1);
    }
  }

  updateMoodTokens(moodId) {
    const mood = MOODS[moodId] || MOODS.reflective;
    const docEl = document.documentElement;

    docEl.style.setProperty('--quote-mood', mood.id);
    docEl.style.setProperty('--quote-accent', mood.accent);
    docEl.style.setProperty('--quote-glow', mood.glow);
    docEl.style.setProperty('--quote-glow-soft', mood.glowSoft);
    docEl.style.setProperty('--quote-border', mood.border);
    docEl.style.setProperty('--quote-modal-bg', mood.bg);
    docEl.style.setProperty('--quote-modal-header-bg', mood.headerBg);
    docEl.style.setProperty('--quote-badge-bg', mood.glowSoft);

    // Tell ambient canvas to morph colors
    ambient.setMood(moodId);
  }

  updateRailState() {
    const quote = this.quotesList[this.currentQuoteIndex];
    if (!quote) return;

    const likeBtn = document.getElementById('rail-like-btn');
    const isLiked = this.likedQuotes.has(quote.id);
    if (likeBtn) {
      likeBtn.classList.toggle('liked', isLiked);
      const icon = likeBtn.querySelector('svg');
      if (icon) {
        icon.setAttribute('fill', isLiked ? '#ef4444' : 'none');
        icon.setAttribute('stroke', isLiked ? '#ef4444' : 'currentColor');
      }
    }
  }

  toggleLike(quoteId) {
    if (!quoteId) return;
    const isLiked = this.likedQuotes.has(quoteId);
    if (isLiked) {
      this.likedQuotes.delete(quoteId);
      this.showToast('Removed from liked wisdom', '🤍');
    } else {
      this.likedQuotes.add(quoteId);
      this.showToast('Added to liked wisdom', '❤️');
    }

    try {
      localStorage.setItem('wiz_liked_quotes', JSON.stringify([...this.likedQuotes]));
    } catch (e) {}

    this.updateRailState();
  }

  triggerDoubleTapLike(quoteId, clientX, clientY) {
    this.toggleLike(quoteId);

    // Spawn heart burst animation
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;

    const feed = document.getElementById('reel-feed-container');
    if (feed) {
      feed.appendChild(heart);
      setTimeout(() => heart.remove(), 750);
    }
  }

  // ── Modals & Drawers ──────────────────────────────────────────
  setupModals() {
    // Backdrop click to close
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close-btn') || e.target.closest('.modal-close-btn')) {
          this.closeAllModals();
        }
      });
    });

    // Explore drawer click backdrop to close
    const exploreDrawer = document.getElementById('explore-drawer');
    if (exploreDrawer) {
      exploreDrawer.addEventListener('click', (e) => {
        if (e.target === exploreDrawer || e.target.closest('#drawer-close-btn')) {
          exploreDrawer.classList.remove('open');
        }
      });
    }

    // Share modal actions
    document.getElementById('share-download-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      const canvas = document.getElementById('share-preview-canvas');
      if (quote && canvas) {
        cardGenerator.download(canvas, quote);
        this.showToast('Ultra-HD 9:16 PNG Card Downloaded', '📥');
      }
    });

    document.getElementById('share-copy-btn')?.addEventListener('click', async () => {
      const canvas = document.getElementById('share-preview-canvas');
      if (canvas) {
        try {
          await cardGenerator.copyToClipboard(canvas);
          this.showToast('Card image copied to clipboard!', '📋');
        } catch (e) {
          this.showToast('Failed to copy image. Use download instead.', '⚠️');
        }
      }
    });

    document.getElementById('share-link-btn')?.addEventListener('click', () => {
      const quote = this.quotesList[this.currentQuoteIndex];
      if (quote) {
        const url = `${window.location.origin}${window.location.pathname}#demo`;
        navigator.clipboard.writeText(url);
        this.showToast('Link copied to clipboard!', '🔗');
      }
    });

    // Dislike modal feedback buttons
    document.querySelectorAll('.dislike-reason-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dislike-reason-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.getElementById('dislike-submit-btn')?.addEventListener('click', () => {
      this.closeAllModals();
      this.showToast('Thank you for helping curate wisdom', '🙏');
    });
  }

  closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
    document.getElementById('explore-drawer')?.classList.remove('open');
  }

  openDelveModal(quote) {
    if (!quote) return;
    const modal = document.getElementById('delve-modal');
    if (!modal) return;

    modal.querySelector('#delve-author-source').textContent = `${quote.author} ${quote.sourceWork ? `• ${quote.sourceWork}` : ''}`;
    modal.querySelector('#delve-explanation').textContent = quote.explanation || 'Philosophical insights loading...';
    modal.querySelector('#delve-insight').textContent = quote.practicalInsight || 'Reflect quietly upon this wisdom.';
    modal.querySelector('#delve-prompt').textContent = quote.reflectionPrompt || 'How does this truth illuminate your present choices?';

    // Button to explore author directly from delve
    const authorCta = modal.querySelector('#delve-explore-author-btn');
    if (authorCta) {
      authorCta.onclick = () => {
        this.closeAllModals();
        this.openAuthorModal(quote.authorSlug);
      };
    }

    modal.classList.add('open');
  }

  openAuthorModal(authorSlug) {
    const author = AUTHORS[authorSlug] || {
      slug: authorSlug,
      name: authorSlug.replace('-', ' '),
      era: 'Timeless Thinker',
      tradition: 'Wisdom & Philosophy',
      summary: 'Timeless reflections on virtue, truth, and purpose.',
      bio: 'Influential thinker whose insights continue to guide seekers across centuries.',
      whyTimeless: 'Addresses the foundational dilemmas of human life.',
      keyWorks: [],
      pillars: []
    };

    const modal = document.getElementById('author-modal');
    if (!modal) return;

    modal.querySelector('#author-name').textContent = author.name;
    modal.querySelector('#author-era').textContent = author.era;
    modal.querySelector('#author-tradition').textContent = author.tradition;
    modal.querySelector('#author-bio').textContent = author.bio;
    modal.querySelector('#author-why-timeless').textContent = author.whyTimeless;

    // Render pillars
    const pillarsContainer = modal.querySelector('#author-pillars-grid');
    if (pillarsContainer) {
      pillarsContainer.innerHTML = (author.pillars || []).map(p => `
        <div class="pillar-box">
          <h5 class="pillar-title">✦ ${p.concept}</h5>
          <p class="feature-desc">${p.description}</p>
        </div>
      `).join('');
    }

    // Render works
    const worksContainer = modal.querySelector('#author-works-grid');
    if (worksContainer) {
      worksContainer.innerHTML = (author.keyWorks || []).map(w => `
        <div class="work-box">
          <h5 class="work-title">📖 ${w.title}</h5>
          <p class="feature-desc">${w.description}</p>
        </div>
      `).join('');
    }

    modal.classList.add('open');
  }

  openShareModal(quote) {
    if (!quote) return;
    const modal = document.getElementById('share-modal');
    const canvas = document.getElementById('share-preview-canvas');
    if (!modal || !canvas) return;

    // Render 9:16 quote card
    cardGenerator.render(canvas, quote, {
      brandingText: this.customizer.brandingText || this.customizer.siteName
    });

    modal.classList.add('open');
  }

  openDislikeModal(quote) {
    const modal = document.getElementById('dislike-modal');
    if (modal) modal.classList.add('open');
  }

  openExploreDrawer() {
    const drawer = document.getElementById('explore-drawer');
    if (!drawer) return;

    this.renderExploreContent('all');

    // Tab buttons inside drawer
    drawer.querySelectorAll('.drawer-tab-btn').forEach(btn => {
      btn.onclick = () => {
        drawer.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderExploreContent(btn.dataset.tab);
      };
    });

    // Real-time search inside drawer
    const searchInput = drawer.querySelector('#drawer-search-input');
    if (searchInput) {
      searchInput.value = '';
      searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filterExploreContent(query);
      };
    }

    drawer.classList.add('open');
  }

  renderExploreContent(tab) {
    const grid = document.getElementById('explore-results-grid');
    if (!grid) return;

    let items = [];
    if (tab === 'liked') {
      items = this.quotesList.filter(q => this.likedQuotes.has(q.id));
      if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 3rem 0;">No liked quotes yet. Tap the heart icon or double-tap on any quote in the reel! ❤️</div>`;
        return;
      }
    } else if (tab === 'moods') {
      grid.innerHTML = Object.values(MOODS).map(m => `
        <div class="explore-card" style="border-left: 4px solid ${m.accent}; cursor: pointer;" data-filter-mood="${m.id}">
          <div>
            <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.35rem;">${m.name} / ${m.nameHi}</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-muted);">${m.description}</p>
          </div>
          <span style="font-size: 0.75rem; color: ${m.accent}; font-weight: 600;">Explore quotes in ${m.name} →</span>
        </div>
      `).join('');

      grid.querySelectorAll('[data-filter-mood]').forEach(card => {
        card.onclick = () => {
          const mood = card.dataset.filterMood;
          const matchIdx = this.quotesList.findIndex(q => q.mood === mood);
          if (matchIdx !== -1) {
            this.closeAllModals();
            this.switchView('demo');
            this.scrollToQuote(matchIdx);
          }
        };
      });
      return;
    } else if (tab === 'authors') {
      grid.innerHTML = Object.values(AUTHORS).map(a => `
        <div class="explore-card" style="cursor: pointer;" data-open-author="${a.slug}">
          <div>
            <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 0.25rem;">${a.name}</h4>
            <span style="font-size: 0.75rem; color: var(--quote-accent);">${a.era} • ${a.tradition}</span>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 0.4rem;">${a.summary}</p>
          </div>
          <span style="font-size: 0.75rem; color: var(--quote-accent); font-weight: 600;">View Philosopher Dossier →</span>
        </div>
      `).join('');

      grid.querySelectorAll('[data-open-author]').forEach(card => {
        card.onclick = () => {
          this.closeAllModals();
          this.openAuthorModal(card.dataset.openAuthor);
        };
      });
      return;
    } else {
      items = this.quotesList;
    }

    grid.innerHTML = items.map(q => {
      const mood = MOODS[q.mood] || MOODS.reflective;
      return `
        <div class="explore-card" data-jump-quote="${q.id}">
          <div>
            <span style="font-size: 0.72rem; color: ${mood.accent}; font-weight: 600; text-transform: uppercase;">${q.category} • ${mood.name}</span>
            <p style="font-family: var(--font-display); font-style: italic; color: #fff; margin: 0.5rem 0; font-size: 0.98rem; line-height: 1.4;">"${q.content}"</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: var(--color-text-secondary); font-weight: 600;">— ${q.author}</span>
            <span style="font-size: 0.75rem; color: var(--quote-accent);">Launch Reel ↗</span>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('[data-jump-quote]').forEach(card => {
      card.onclick = () => {
        const qid = card.dataset.jumpQuote;
        const idx = this.quotesList.findIndex(q => q.id === qid);
        if (idx !== -1) {
          this.closeAllModals();
          this.switchView('demo');
          this.scrollToQuote(idx);
        }
      };
    });
  }

  filterExploreContent(query) {
    const grid = document.getElementById('explore-results-grid');
    if (!grid) return;

    const matches = this.quotesList.filter(q => {
      return q.content.toLowerCase().includes(query) ||
             q.author.toLowerCase().includes(query) ||
             q.category.toLowerCase().includes(query) ||
             (q.tags || []).some(t => t.toLowerCase().includes(query));
    });

    if (matches.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 3rem 0;">No wisdom found matching "${query}".</div>`;
      return;
    }

    grid.innerHTML = matches.map(q => `
      <div class="explore-card" data-jump-quote="${q.id}">
        <p style="font-family: var(--font-display); font-style: italic; color: #fff; font-size: 0.95rem;">"${q.content}"</p>
        <span style="font-size: 0.85rem; color: var(--quote-accent);">— ${q.author}</span>
      </div>
    `).join('');

    grid.querySelectorAll('[data-jump-quote]').forEach(card => {
      card.onclick = () => {
        const qid = card.dataset.jumpQuote;
        const idx = this.quotesList.findIndex(q => q.id === qid);
        if (idx !== -1) {
          this.closeAllModals();
          this.switchView('demo');
          this.scrollToQuote(idx);
        }
      };
    });
  }

  // ── Theme Customizer & Playground ─────────────────────────────
  setupCustomizer() {
    const siteNameInput = document.getElementById('customizer-sitename');
    const subtitleInput = document.getElementById('customizer-subtitle');
    const brandingInput = document.getElementById('customizer-branding');
    const langSelect = document.getElementById('customizer-lang');

    const updatePreview = () => {
      this.customizer.siteName = siteNameInput?.value || 'Wisdom';
      this.customizer.subtitle = subtitleInput?.value || 'Timeless Quotes, Reimagined';
      this.customizer.brandingText = brandingInput?.value || this.customizer.siteName;
      this.customizer.lang = langSelect?.value || 'en';

      // Update preview phone inside customizer
      const previewTitle = document.getElementById('preview-phone-title');
      const previewSub = document.getElementById('preview-phone-sub');
      const previewWatermark = document.getElementById('preview-phone-watermark');

      if (previewTitle) previewTitle.textContent = this.customizer.siteName;
      if (previewSub) previewSub.textContent = this.customizer.subtitle;
      if (previewWatermark) previewWatermark.textContent = `✦  ${this.customizer.brandingText.toUpperCase()}  ✦`;

      // Update code blocks
      this.updateGeneratedCode();
    };

    siteNameInput?.addEventListener('input', updatePreview);
    subtitleInput?.addEventListener('input', updatePreview);
    brandingInput?.addEventListener('input', updatePreview);
    langSelect?.addEventListener('change', () => {
      updatePreview();
      // Update phone quote language display
      const previewQuote = document.getElementById('preview-phone-quote');
      if (previewQuote) {
        if (this.customizer.lang === 'hi') {
          previewQuote.textContent = "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥";
          previewQuote.setAttribute('data-lang', 'hi');
        } else {
          previewQuote.textContent = "The wound is the place where the light enters you.";
          previewQuote.setAttribute('data-lang', 'en');
        }
      }
    });

    // Mood buttons inside customizer
    document.querySelectorAll('.customizer-mood-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.customizer-mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mood = btn.dataset.mood;
        this.customizer.mood = mood;
        this.updateMoodTokens(mood);
        updatePreview();
      });
    });

    // Code snippet tab switcher
    document.querySelectorAll('.code-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.codeTab;
        document.querySelectorAll('.code-snippet-panel').forEach(p => p.style.display = 'none');
        const activePanel = document.getElementById(`code-panel-${tab}`);
        if (activePanel) activePanel.style.display = 'block';
      });
    });

    // Copy code button
    document.getElementById('copy-code-btn')?.addEventListener('click', () => {
      const activeCode = document.querySelector('.code-snippet-panel:not([style*="display: none"]) code');
      if (activeCode) {
        navigator.clipboard.writeText(activeCode.textContent || '');
        this.showToast('Configuration snippet copied to clipboard!', '📋');
      }
    });

    updatePreview();
  }

  updateGeneratedCode() {
    const configCode = document.getElementById('code-astro-config');
    const pageCode = document.getElementById('code-index-astro');

    if (configCode) {
      configCode.textContent = `// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { wizTheme } from 'wiz-theme';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    wizTheme({
      siteName: '${this.customizer.siteName}',
      subtitle: '${this.customizer.subtitle}',
      brandingText: '${this.customizer.brandingText}',
      language: '${this.customizer.lang}',
    }),
  ],
});`;
    }

    if (pageCode) {
      pageCode.textContent = `---
// src/pages/index.astro
import { BaseLayout, ReelFeed } from 'wiz-theme';

// Your quotes collection
const quotes = [
  ${this.customizer.lang === 'hi' ? `{
    id: "q-01",
    content: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥",
    author: "कबीर दास",
    authorSlug: "kabir",
    category: "प्रेम व ज्ञान",
    categorySlug: "love-wisdom",
    mood: "${this.customizer.mood}",
    tags: ["प्रेम", "ज्ञान", "सत्य"]
  }` : `{
    id: "q-01",
    content: "The wound is the place where the light enters you.",
    author: "Rumi",
    authorSlug: "rumi",
    category: "Wisdom",
    categorySlug: "wisdom",
    mood: "${this.customizer.mood}",
    tags: ["healing", "light", "growth"]
  }`}
];
---

<BaseLayout
  siteName="${this.customizer.siteName}"
  subtitle="${this.customizer.subtitle}"
  lang="${this.customizer.lang}"
>
  <ReelFeed
    quotes={quotes}
    feedTitle="${this.customizer.siteName}"
    feedSubtitle="${this.customizer.subtitle}"
    lang="${this.customizer.lang}"
  />
</BaseLayout>`;
    }
  }

  // ── Quotes Catalog View ───────────────────────────────────────
  renderQuotesCatalog() {
    const grid = document.getElementById('quotes-catalog-grid');
    if (!grid) return;

    grid.innerHTML = this.quotesList.map(q => {
      const mood = MOODS[q.mood] || MOODS.reflective;
      return `
        <div class="quote-catalog-card" data-quote-card="${q.id}">
          <div class="catalog-card-header">
            <span class="reel-mood-pill" style="color: ${mood.accent}; border-color: ${mood.border}; background: ${mood.glowSoft};">
              <span>✦</span> ${q.category}
            </span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); font-family: monospace;">${q.id}</span>
          </div>

          <p class="catalog-quote-text" data-lang="${q.lang}">
            “${q.content}”
          </p>

          <div>
            <span style="font-weight: 700; color: #fff; font-size: 1.05rem;">— ${q.author}</span>
            ${q.sourceWork ? `<div style="font-size: 0.82rem; color: var(--color-text-muted); font-style: italic;">${q.sourceWork}</div>` : ''}
          </div>

          <div class="catalog-actions">
            <button type="button" class="delve-pill-btn" data-catalog-delve="${q.id}">
              <span class="delve-star">✦</span> Delve Breakdown
            </button>
            <button type="button" class="launch-reel-btn" data-catalog-launch="${q.id}">
              ▶ Launch in Reel
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Filter bar inside Quotes view
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.quote-catalog-card').forEach(card => {
          const match = card.textContent.toLowerCase().includes(query);
          card.style.display = match ? 'flex' : 'none';
        });
      };
    }

    grid.querySelectorAll('[data-catalog-delve]').forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.catalogDelve;
        const q = this.quotesList.find(x => x.id === qid);
        if (q) this.openDelveModal(q);
      };
    });

    grid.querySelectorAll('[data-catalog-launch]').forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.catalogLaunch;
        const idx = this.quotesList.findIndex(x => x.id === qid);
        if (idx !== -1) {
          this.switchView('demo');
          this.scrollToQuote(idx);
        }
      };
    });
  }

  // ── Documentation Table ───────────────────────────────────────
  renderDocsTable() {
    const tbody = document.getElementById('api-docs-tbody');
    if (!tbody) return;

    tbody.innerHTML = API_DOCS.map(d => `
      <tr>
        <td><strong style="color: #fff;">${d.prop}</strong></td>
        <td><span class="code-tag">${d.type}</span></td>
        <td><span style="color: var(--color-gold); font-family: monospace;">${d.default}</span></td>
        <td>${d.description}</td>
      </tr>
    `).join('');
  }

  // ── Toast System ──────────────────────────────────────────────
  showToast(message, icon = '✦') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.wizApp = new WizApp();
  window.wizApp.init();
});

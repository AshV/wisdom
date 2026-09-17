/**
 * Global type augmentations for Wisdom app client-side globals.
 * These are attached to `window` by inline scripts across components.
 */

interface ZenChimeEngineInstance {
  enabled: boolean;
  currentMood: string;
  init(): void;
  isEnabled(): boolean;
  toggle(): boolean;
  playOnce(mood?: string, delay?: number): void;
  playZenBell(): void;
  stopAll(): void;
  setMood(mood: string): void;
  updateUI(): void;
}

interface LikedQuotesStore {
  readonly _key: string;
  getAll(): any[];
  has(id: string): boolean;
  toggle(quoteOrId: string | { id: string; [key: string]: any }): boolean;
}

interface RecentQuotesStore {
  readonly _key: string;
  readonly _max: number;
  getAll(): string[];
  has(id: string): boolean;
  add(id: string): void;
  clear(): void;
}

declare global {
  interface Window {
    /** Zen chime audio engine — singleton shared across page navigations. */
    wisdomAudio: ZenChimeEngineInstance;

    /** Liked quotes store backed by localStorage. */
    likedQuotes: LikedQuotesStore;

    /** Recently viewed quote IDs (FIFO queue, max 500). */
    recentQuotes: RecentQuotesStore;

    /** Updates the global background canvas / gradient for the given mood. */
    setBackground(
      videoSrc: string | undefined,
      gradientClass: string,
      mood: string,
      quoteId: string
    ): void;

    /** Shows a transient glass-morphism toast notification. */
    showToast(message: string, duration?: number): void;

    /** Opens the Explore drawer. */
    openExploreDrawer(): void;

    /** Closes the Explore drawer. */
    closeExploreDrawer(immediate?: boolean): void;

    /** Opens the Author Dossier modal for the given author. */
    openAuthorDossierModal(authorSlug: string, authorName: string): void;

    /** Closes the Author Dossier modal. */
    closeAuthorDossierModal(immediate?: boolean): void;

    /** Opens the Quote Delve modal for the given quote ID. */
    openQuoteDelveModal(quoteId: string): void;

    /** Closes the Quote Delve modal. */
    closeQuoteDelveModal(immediate?: boolean): void;

    /** Closes the Share modal. */
    closeShareModal(): void;

    /** Updates the Share modal context for the given slide element. */
    updateShareContext(slide: HTMLElement, isOpen?: boolean): void;

    /** Pre-generates the 9:16 quote card image for the given slide. */
    prepareQuoteCardImage(slide: HTMLElement): void;

    /** Updates the Like button UI state. */
    updateLikeUI(isLiked: boolean): void;

    /** Refreshes the Explore drawer Liked tab. */
    refreshExploreLikes(): void;

    /**
     * Navigates the reel feed to a quote by slug or numeric ID.
     * Registered by ReelFeed.astro once the feed is initialised.
     */
    __wisdomNavigateToQuote(slugOrId: string, quote?: any): Promise<boolean>;

    /** Closes every open modal / drawer immediately. */
    __wisdomCloseAllModals(immediate?: boolean): void;

    /**
     * Pending navigation target queued before the reel feed registered
     * `__wisdomNavigateToQuote` (e.g. notification arriving on a frozen tab).
     */
    __wisdomPendingNotifNav: { target: string; quote?: any } | null;

    /**
     * Full quote catalog map keyed by quote ID, populated from chunk fetches.
     * Used by the reel feed to inject unseen quotes without another network round-trip.
     */
    __wisdomQuoteMap: Record<string, any> | undefined;

    /** Override base URL for API/media fetches (defaults to '/wisdom'). */
    __wisdomBaseUrl: string | undefined;

    /** Handle for the precision ritual timeout (setTimeout). */
    __wisdomRitualTimeout: ReturnType<typeof setTimeout> | null;

    /** Handle for the ritual heartbeat interval (setInterval). */
    __wisdomRitualInterval: ReturnType<typeof setInterval> | null;

    /** Handle for the zen bell interval (setInterval). */
    __wisdomZenTimer: ReturnType<typeof setInterval> | null;

    /** Deferred PWA BeforeInstallPromptEvent. */
    __pwaInstallPrompt: any;

    /** Externally triggers a zen contemplation pill + optional chime. */
    triggerZenContemplation(text?: string): void;
  }
}

export {};

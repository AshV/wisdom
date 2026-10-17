import type { AstroIntegration } from "astro";
import type { WisdomThemeConfig } from "./config/themeConfig";

export type WisdomThemeOptions = WisdomThemeConfig;
export type WizThemeOptions = WisdomThemeConfig;
export type { WisdomThemeConfig, WizThemeConfig } from "./config/themeConfig";

export function wisdomTheme(options: WisdomThemeConfig = {}): AstroIntegration {
  return {
    name: "wisdom",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          vite: {
            define: {
              __WISDOM_THEME_INTEGRATION_OPTIONS__: JSON.stringify(options),
              __WIZ_THEME_INTEGRATION_OPTIONS__: JSON.stringify(options),
            },
          },
        });
      },
    },
  };
}

export const wizTheme = wisdomTheme;
export default wisdomTheme;

// Configuration & Typography
export * from "./config/typography";
export * from "./config/themeConfig";

// Internationalization & Locales
export * from "./i18n/types";
export * from "./i18n/index";
export { enTranslations } from "./i18n/locales/en";
export { hiTranslations } from "./i18n/locales/hi";

// Layouts
export { default as BaseLayout } from "./layouts/BaseLayout.astro";

// Components
export { default as ReelFeed } from "./components/ReelFeed.astro";
export { default as ReelSlide } from "./components/ReelSlide.astro";
export { default as GlobalBackground } from "./components/GlobalBackground.astro";
export { default as QuoteDelveModal } from "./components/QuoteDelveModal.astro";
export { default as AuthorDossierModal } from "./components/AuthorDossierModal.astro";
export { default as ShareModal } from "./components/ShareModal.astro";
export { default as DislikeFeedbackModal } from "./components/DislikeFeedbackModal.astro";
export { default as ExploreDrawer } from "./components/ExploreDrawer.astro";
export { default as RightActionRail } from "./components/RightActionRail.astro";
export { default as ZenLoader } from "./components/ZenLoader.astro";

// Utils & Data
export * from "./utils/url";
export * from "./utils/slug";
export * from "./utils/chunkConfig";
export * from "./utils/dailyQuote";
export * from "./utils/authorUtils";
export * from "./utils/firebaseStats";
export * from "./data/mediaRegistry";
export * from "./data/exploreCatalog";
export type { AuthorProfile, AuthorWork, PhilosophicalPillar } from "./data/authorProfiles";
export { getAuthorPhotoUrl, getAuthorProfile, loadAuthorProfiles } from "./data/authorProfiles";

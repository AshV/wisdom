/**
 * URL & Path resolution helpers for Wisdom theme and consumer applications.
 */

/**
 * Returns the application base URL path (e.g., "/element/" or "/").
 * Always ensures consistent leading and trailing slashes.
 */
export function getBaseUrl(customBase?: string): string {
  if (customBase !== undefined && customBase !== "") {
    const trimmed = customBase.replace(/^\/+|\/+$/g, "");
    return trimmed ? `/${trimmed}/` : "/";
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) {
    const envBase = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "");
    return envBase ? `/${envBase}/` : "/";
  }
  return "/";
}

/**
 * Resolves a route or asset path relative to the application base URL.
 * Example: resolvePath("author/socrates/") -> "/element/author/socrates/"
 */
export function resolvePath(path: string = "", customBase?: string): string {
  const base = getBaseUrl(customBase);
  const cleanPath = path.replace(/^\/+/, "");
  return cleanPath ? `${base}${cleanPath}` : base;
}

/**
 * Resolves an absolute canonical URL combining site origin and base path.
 * Example: resolveCanonicalUrl("author/socrates/", "https://example.com")
 *       -> "https://example.com/element/author/socrates/"
 */
export function resolveCanonicalUrl(
  pathname: string = "",
  siteOrigin?: string,
  customBase?: string
): string {
  const resolvedPath = resolvePath(pathname, customBase);
  const origin =
    siteOrigin ||
    (typeof import.meta !== "undefined" && import.meta.env?.SITE) ||
    "";
  if (!origin) return resolvedPath;
  const cleanOrigin = origin.replace(/\/+$/, "");
  return `${cleanOrigin}${resolvedPath}`;
}

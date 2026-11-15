/**
 * Central site configuration.
 *
 * When a custom domain is connected, change `url` here and replace
 * "monti-xi.vercel.app" in index.html, public/sitemap.xml,
 * public/robots.txt and public/llms.txt.
 */
export const site = {
  name: 'Monti',

  // Live address, no trailing slash
  url: 'https://monti-xi.vercel.app',

  email: 'montibambam@gmail.com',

  instagram: 'https://www.instagram.com/montimoltisanti/',
  instagramHandle: '@montimoltisanti',

  /**
   * Optional form backend endpoint (e.g. Formspree or Web3Forms).
   * Create a free form at https://formspree.io, paste the endpoint here
   * (looks like https://formspree.io/f/abcdwxyz) and the contact form
   * will submit directly. While this is empty, the form falls back to
   * opening the visitor's email app with the brief pre-filled.
   */
  formEndpoint: 'https://formspree.io/f/xrpekjpv',
};

export function pageTitle(title?: string): string {
  return title ? `${title} | ${site.name}` : `${site.name} | Cover Art & Spotify Canvas for Artists`;
}

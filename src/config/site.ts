/**
 * Central site configuration.
 *
 * When you buy your domain and set up email, this is the ONLY file
 * you need to edit (plus index.html, public/sitemap.xml and
 * public/robots.txt — search for "your-domain" across the project).
 */
export const site = {
  name: 'Monti',

  // TODO: replace with your real domain once you buy it (no trailing slash)
  url: 'https://your-domain.com',

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
  return title ? `${title} — ${site.name}` : `${site.name} — Cover Art & Spotify Canvas for Artists`;
}

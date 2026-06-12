/**
 * Auto-loading galleries.
 *
 * HOW TO ADD YOUR WORK (no code changes needed):
 *
 *   Images  → drop files into  src/assets/concept-art/
 *   Videos  → drop files into  src/assets/motion/
 *
 * - The filename becomes the title: "neon-samurai.jpg" → "Neon Samurai".
 * - Files are sorted by name. Prefix with numbers to control the order:
 *   "01-album-cover.jpg", "02-dragon.png", …
 * - For each video you can add a poster (thumbnail) image with the SAME
 *   name: "loop-fire.mp4" + "loop-fire.jpg". Without a poster the video
 *   frame itself is shown.
 * - While the folders are empty, placeholder images keep the site alive.
 */

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  poster?: string;
}

const IMAGE_GLOB_CONCEPT = import.meta.glob('../assets/concept-art/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const VIDEO_GLOB_MOTION = import.meta.glob('../assets/motion/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const POSTER_GLOB_MOTION = import.meta.glob('../assets/motion/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function baseName(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.[^.]+$/, '');
}

/** "01-neon-samurai" → "Neon Samurai" */
function titleFromFile(path: string): string {
  return baseName(path)
    .replace(/^\d+[-_.\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function sortedEntries(glob: Record<string, string>): [string, string][] {
  return Object.entries(glob).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
}

function buildImageItems(glob: Record<string, string>, prefix: string): GalleryItem[] {
  return sortedEntries(glob).map(([path, url], i) => ({
    id: `${prefix}-${i}`,
    url,
    title: titleFromFile(path),
    type: 'image' as const,
  }));
}

function buildVideoItems(
  videos: Record<string, string>,
  posters: Record<string, string>,
  prefix: string
): GalleryItem[] {
  const posterByBase = new Map(
    Object.entries(posters).map(([path, url]) => [baseName(path), url])
  );
  return sortedEntries(videos).map(([path, url], i) => ({
    id: `${prefix}-${i}`,
    url,
    title: titleFromFile(path),
    type: 'video' as const,
    poster: posterByBase.get(baseName(path)),
  }));
}

/* Placeholders shown until real files are dropped into the folders */
const conceptPlaceholders: GalleryItem[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `concept-placeholder-${i}`,
  url: `https://picsum.photos/seed/monti-slika${i}/900/900`,
  title: `Concept ${i + 1}`,
  type: 'image' as const,
}));

const motionPlaceholders: GalleryItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `motion-placeholder-${i}`,
  url: `https://picsum.photos/seed/monti-animacija${i}/900/900`,
  title: `Loop ${i + 1}`,
  type: 'image' as const,
}));

const realConceptArt = buildImageItems(IMAGE_GLOB_CONCEPT, 'concept');
const realMotion = buildVideoItems(VIDEO_GLOB_MOTION, POSTER_GLOB_MOTION, 'motion');

export const conceptArtItems: GalleryItem[] =
  realConceptArt.length > 0 ? realConceptArt : conceptPlaceholders;

export const motionItems: GalleryItem[] =
  realMotion.length > 0 ? realMotion : motionPlaceholders;

/** First few concept pieces, used on the home page strip. */
export const homeStripItems: GalleryItem[] = conceptArtItems.slice(0, 4);

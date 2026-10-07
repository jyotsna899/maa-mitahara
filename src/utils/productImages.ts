// Curated image resolution system for Maa Mitahara
// Strict Rule: No random stock / Unsplash photos.
// When an actual authentic brand asset is pending, return null so UI components render
// rich typographic / SVG / ingredient badges without fabricated photos.

export interface ProductImageSet {
  primary: string | null;
  secondary: string | null;
  gallery: string[];
}

export function getProductImages(slug: string): ProductImageSet {
  // Currently authentic brand photography packs are under verification and ingestion.
  // We explicitly return null / empty gallery so the product cards render elegant,
  // high-craft editorial badges and category iconography instead of deceptive random stock photos.
  return {
    primary: null,
    secondary: null,
    gallery: [],
  };
}

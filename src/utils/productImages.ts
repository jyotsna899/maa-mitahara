// Curated image resolution system for Maa Mitahara
// Strict Rule: No random stock / Unsplash photos.
// When an actual authentic brand asset is pending, return null so UI components render
// rich typographic / SVG / ingredient badges without fabricated photos.

export interface ProductImageSet {
  primary: string | null;
  secondary: string | null;
  gallery: string[];
}

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  'orange-and-cacao-laddu': '/images/products/orange-and-cacao-laddu.png',
  'multigrain-laddu': '/images/products/multigrain-laddu.png',
  'multigrain-laddu-postnatal': '/images/products/multigrain-laddu-postnatal.png',
  'dryfruit-laddu': '/images/products/dryfruit-laddu.png',
  'gond-giri-laddu': '/images/products/gond-giri-laddu.png',
  'dana-methi-laddu': '/images/products/dana-methi-laddu.png',
  'coffee-and-badam-laddu': '/images/products/coffee-and-badam-laddu.png',
  'healthy-delights-ashwagandha-laddu': '/images/products/healthy-delights-ashwagandha-laddu.png',
  'healthy-delights-safed-musli-laddu': '/images/products/healthy-delights-safed-musli-laddu.png',
};

export function getProductImages(slug: string): ProductImageSet {
  const imagePath = PRODUCT_IMAGE_MAP[slug] || '/images/products/sample-pouch.png';
  return {
    primary: imagePath,
    secondary: null,
    gallery: [imagePath],
  };
}

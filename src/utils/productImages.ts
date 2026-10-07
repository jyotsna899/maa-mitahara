// Curated food and traditional Indian nourishment imagery
// Authentic dry fruit, laddu, grain, tea, and roasted spice photography

export interface ProductImageSet {
  primary: string;
  secondary: string;
  gallery: string[];
}

export function getProductImages(slug: string): ProductImageSet {
  if (slug.includes('cacao') || slug.includes('orange')) {
    return {
      primary: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
      secondary: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
      ],
    };
  }

  if (slug.includes('multigrain')) {
    return {
      primary: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      secondary: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=1000&q=80',
      ],
    };
  }

  if (slug.includes('dryfruit') || slug.includes('mewa') || slug.includes('panjiri')) {
    return {
      primary: 'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=800&q=80',
      secondary: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
      ],
    };
  }

  if (slug.includes('tea') || slug.includes('ajwain') || slug.includes('kadha') || slug.includes('infusion')) {
    return {
      primary: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
      secondary: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
      ],
    };
  }

  if (slug.includes('ragi') || slug.includes('seed') || slug.includes('mix')) {
    return {
      primary: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      secondary: 'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
      ],
    };
  }

  // Default: Traditional roasted laddu / Indian confection
  return {
    primary: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    secondary: 'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508061252445-5350f31cf363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
    ],
  };
}

export interface PurchasedProductItem {
  id: string;
  orderNumber: string;
  orderDate: string;
  productName: string;
  productSlug: string;
  image: string;
  packSize: string;
  price: number;
  status: 'Delivered' | 'Active Subscription' | 'Processing';
  stageTag: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  age: number;
  gender: string;
  stageKey: string;
  gestationalWeek: number; // e.g. 20 (out of 40) or Jaapa Day e.g. 14
  expectedDueDate: string; // e.g. "2027-01-15"
  dietaryNotes: string;
  healthConditions: string;
  emergencyDoctorContact: string;
  purchasedProducts: PurchasedProductItem[];
  dailyReminders: {
    time: string;
    label: string;
    productName: string;
    instructions: string;
  }[];
}

const STORAGE_KEY = 'mm_user_profile_data';

export const DEFAULT_USER_PROFILE: UserProfileData = {
  name: 'Ananya Sharma',
  email: 'ananya.sharma@example.com',
  age: 28,
  gender: 'Female',
  stageKey: 'second_trimester',
  gestationalWeek: 20,
  expectedDueDate: '2027-01-15',
  dietaryNotes: 'Prefers zero refined sugar & A2 bilona cow ghee recipes.',
  healthConditions: 'Mild afternoon fatigue & low iron reserves.',
  emergencyDoctorContact: 'Dr. Archana Shukla (Consultant Obstetrician)',
  purchasedProducts: [
    {
      id: 'ord-1001',
      orderNumber: 'MM-ORD-88219',
      orderDate: '2026-09-28',
      productName: 'Multigrain Laddu (Mom-to-Be)',
      productSlug: 'multigrain-laddu',
      image: '/images/products/multigrain-laddu.png',
      packSize: '500g Pack (15 Laddus)',
      price: 1150,
      status: 'Active Subscription',
      stageTag: 'second_trimester',
    },
    {
      id: 'ord-1002',
      orderNumber: 'MM-ORD-84102',
      orderDate: '2026-09-10',
      productName: 'Dryfruit Laddu (Mom-to-Be)',
      productSlug: 'dryfruit-laddu',
      image: '/images/products/dryfruit-laddu.png',
      packSize: '200g Pack (6 Laddus)',
      price: 520,
      status: 'Delivered',
      stageTag: 'second_trimester',
    },
    {
      id: 'ord-1003',
      orderNumber: 'MM-ORD-79301',
      orderDate: '2026-08-14',
      productName: 'Orange and Cacao Laddu',
      productSlug: 'orange-and-cacao-laddu',
      image: '/images/products/orange-and-cacao-laddu.png',
      packSize: '200g Pack (6 Laddus)',
      price: 490,
      status: 'Delivered',
      stageTag: 'first_trimester',
    },
  ],
  dailyReminders: [
    {
      time: '8:00 AM · Morning Ritual',
      label: 'Stomach Ease & Folate',
      productName: 'Orange & Cacao Laddu',
      instructions: '1 Laddu at room temperature with lukewarm water or warm almond milk.',
    },
    {
      time: '4:00 PM · Evening Snack',
      label: 'Sustained Stamina & Calcium',
      productName: 'Multigrain Laddu',
      instructions: '1 Laddu with warm A2 cow milk to prevent 4 PM fatigue.',
    },
  ],
};

class UserProfileStore {
  private listeners: ((profile: UserProfileData) => void)[] = [];

  public getProfile(): UserProfileData {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback to default
        }
      }
    }
    return DEFAULT_USER_PROFILE;
  }

  public updateProfile(updated: Partial<UserProfileData>): UserProfileData {
    const current = this.getProfile();
    const newProfile = { ...current, ...updated };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    }
    this.listeners.forEach((fn) => fn(newProfile));
    return newProfile;
  }

  public subscribe(fn: (profile: UserProfileData) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}

export const userProfileService = new UserProfileStore();

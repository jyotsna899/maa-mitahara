export interface CartLineItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  sizeLabel: string;
  price: number;
  quantity: number;
  isSubscription: boolean;
  subscriptionIntervalWeeks?: 2 | 4;
  stageTag?: string;
}

export interface MockCart {
  items: CartLineItem[];
  subtotal: number;
  shippingThreshold: number; // ₹999
  freeShippingQualified: boolean;
  amountNeededForFreeShipping: number;
  appliedDiscountCode?: string;
  discountRupees: number;
  total: number;
}

class MockShopifyStorefrontService {
  private cart: MockCart = {
    items: [],
    subtotal: 0,
    shippingThreshold: 999,
    freeShippingQualified: false,
    amountNeededForFreeShipping: 999,
    discountRupees: 0,
    total: 0,
  };

  private listeners: ((cart: MockCart) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mm_mock_cart');
      if (saved) {
        try {
          this.cart = JSON.parse(saved);
        } catch {
          // ignore corrupted json
        }
      }
    }
  }

  private notify() {
    this.recalculate();
    if (typeof window !== 'undefined') {
      localStorage.setItem('mm_mock_cart', JSON.stringify(this.cart));
    }
    this.listeners.forEach((fn) => fn(this.cart));
  }

  private recalculate() {
    const subtotal = this.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.cart.subtotal = subtotal;
    this.cart.freeShippingQualified = subtotal >= this.cart.shippingThreshold;
    this.cart.amountNeededForFreeShipping = Math.max(0, this.cart.shippingThreshold - subtotal);
    this.cart.total = Math.max(0, subtotal - this.cart.discountRupees);
  }

  public getCart(): MockCart {
    this.recalculate();
    return { ...this.cart };
  }

  public subscribe(fn: (cart: MockCart) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  public addToCart(item: Omit<CartLineItem, 'id'>) {
    const existing = this.cart.items.find(
      (i) => i.variantId === item.variantId && i.isSubscription === item.isSubscription
    );

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.items.push({
        ...item,
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      });
    }

    this.notify();
  }

  public updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.cart.items = this.cart.items.filter((i) => i.id !== itemId);
    } else {
      const target = this.cart.items.find((i) => i.id !== itemId);
      if (target) target.quantity = quantity;
    }
    this.notify();
  }

  public applyQuizOffer(code: string, discountAmount: number) {
    // PRD PU-4: One offer at a time
    this.cart.appliedDiscountCode = code;
    this.cart.discountRupees = discountAmount;
    this.notify();
  }

  public clearCart() {
    this.cart.items = [];
    this.cart.discountRupees = 0;
    this.cart.appliedDiscountCode = undefined;
    this.notify();
  }
}

export const shopifyService = new MockShopifyStorefrontService();

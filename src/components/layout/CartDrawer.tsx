'use client';

import React from 'react';
import Link from 'next/link';
import { shopifyService, MockCart } from '@/services/mock/shopifyService';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: MockCart;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart }) => {
  if (!isOpen) return null;

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingPercent = Math.min(100, Math.round((cart.subtotal / cart.shippingThreshold) * 100));

  const handleUpdateQty = (itemId: string, newQty: number) => {
    shopifyService.updateQuantity(itemId, newQty);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#211D1A]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E6DFD5] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1E3A2F]" />
              <h2 className="font-serif text-lg font-bold text-[#211D1A]">
                Your Stage Care Cart
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#1E3A2F] text-white">
                {totalItems}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E6DFD5] text-[#776D66] hover:text-[#211D1A] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#F4EFEB] px-5 py-3 border-b border-[#E6DFD5]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#211D1A] mb-1.5">
              <span>
                {cart.freeShippingQualified ? (
                  <span className="text-[#1E3A2F] flex items-center gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#1E3A2F]" />
                    🎉 You've unlocked Free Pan-India Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#C85A32]">₹{cart.amountNeededForFreeShipping}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#776D66]">Threshold: ₹{cart.shippingThreshold}</span>
            </div>
            <div className="w-full h-1.5 bg-[#E6DFD5] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  cart.freeShippingQualified ? 'bg-[#1E3A2F]' : 'bg-[#C85A32]'
                }`}
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-[#776D66]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#211D1A]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#776D66] max-w-xs">
                  Start your gestational nourishment journey by selecting recipes designed for your trimester.
                </p>
                <Link
                  href="/stage/second-trimester"
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#152820] transition-colors"
                >
                  <span>Explore Stage Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-card border border-[#E6DFD5] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors"
                >
                  <div className="w-16 h-20 rounded-[6px] overflow-hidden bg-white shrink-0 border border-[#E6DFD5]">
                    <img
                      src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=200&q=80"
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-xs font-bold text-[#211D1A] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => handleUpdateQty(item.id, 0)}
                          className="text-[#776D66] hover:text-red-700 p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#776D66] mt-0.5">
                        {item.sizeLabel}
                      </div>

                      {item.isSubscription && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-[#1E3A2F] bg-[#EEF3EF] px-2 py-0.5 rounded-full">
                          Fortnightly Delivery · 15% Off
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E6DFD5] rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                          className="text-[#776D66] hover:text-[#211D1A] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#211D1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                          className="text-[#776D66] hover:text-[#211D1A] p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-xs text-[#211D1A]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E6DFD5] bg-[#FAF7F2] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#776D66]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#211D1A]">₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between text-[#776D66]">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#1E3A2F]">
                    {cart.freeShippingQualified ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#211D1A] pt-2 border-t border-[#E6DFD5]">
                  <span>Total</span>
                  <span>₹{cart.freeShippingQualified ? cart.subtotal : cart.subtotal + 99}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E6DFD5] text-[11px] text-[#1E3A2F]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#1E3A2F]" />
                <span>Doctor-formulated · Freshly made in small batches</span>
              </div>

              <button
                onClick={() => {
                  alert('Prototype Mode: Checkout integration ready for Shopify Storefront API.');
                }}
                className="w-full py-3 rounded-full bg-[#1E3A2F] hover:bg-[#152820] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Safe Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#776D66]">
                Secure Pan-India delivery via temperature-managed food packaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

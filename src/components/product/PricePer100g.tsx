import React from 'react';

interface PricePer100gProps {
  price: number;
  weightGrams: number;
  className?: string;
}

export const PricePer100g: React.FC<PricePer100gProps> = ({
  price,
  weightGrams,
  className = '',
}) => {
  if (!weightGrams || weightGrams <= 0) return null;
  const pricePer100 = Math.round((price / weightGrams) * 100);

  return (
    <span className={`text-xs text-charcoal-500 font-medium ${className}`}>
      (₹{pricePer100} / 100g)
    </span>
  );
};

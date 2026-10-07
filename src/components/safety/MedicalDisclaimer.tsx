import React from 'react';
import { Info } from 'lucide-react';

interface MedicalDisclaimerProps {
  variant?: 'banner' | 'card' | 'inline';
  className?: string;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  variant = 'card',
  className = '',
}) => {
  if (variant === 'inline') {
    return (
      <p className={`text-xs text-charcoal-500 italic ${className}`}>
        *Nutrition support, not medical advice. Follow your doctor’s clinical guidance.
      </p>
    );
  }

  return (
    <div
      className={`rounded-xl border border-sand-200 bg-sand-100/60 p-4 text-xs leading-relaxed text-charcoal-600 ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-ochre-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-charcoal-800">Clinical & Medical Notice: </span>
          Traditional food preparations are intended to complement, not replace, clinical antenatal care or prescribed medical diets. Always consult your obstetrician regarding individual conditions such as gestational diabetes, thyroid, or hypertension.
        </div>
      </div>
    </div>
  );
};

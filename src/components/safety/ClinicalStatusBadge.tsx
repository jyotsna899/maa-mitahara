import React from 'react';
import { ClinicalReviewStatus, ClinicalReviewInfo } from '@/types';
import { ShieldCheck, AlertCircle, Clock } from 'lucide-react';

interface ClinicalStatusBadgeProps {
  status: ClinicalReviewStatus;
  reviewInfo?: ClinicalReviewInfo;
  className?: string;
  showDetails?: boolean;
}

export const ClinicalStatusBadge: React.FC<ClinicalStatusBadgeProps> = ({
  status,
  reviewInfo,
  className = '',
  showDetails = false,
}) => {
  if (status === 'approved' && reviewInfo) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sage-50 text-sage-800 border border-sage-200 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-sage-700 shrink-0" />
        <span>Reviewed by {reviewInfo.reviewerName}</span>
      </div>
    );
  }

  if (status === 'not_for_pregnancy') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200 ${className}`}>
        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
        <span>Not for Pregnancy (Herb Review Gate)</span>
      </div>
    );
  }

  // Default: Pending review state (Never fake or hide missing sign-offs)
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sand-100 text-charcoal-600 border border-sand-200 ${className}`}>
      <Clock className="w-3.5 h-3.5 text-ochre-600 shrink-0" />
      <span>Clinical Review Pending</span>
    </div>
  );
};

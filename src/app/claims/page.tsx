import React from 'react';
import { CLAIMS } from '@/data/claims';
import { ShieldCheck, FileCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/safety/MedicalDisclaimer';

export default function ClaimsRegisterPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#211D1A] min-h-screen">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E6DFD5] bg-white py-12 sm:py-16">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2F] hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] px-3.5 py-1 text-xs font-semibold text-[#1E3A2F]">
              <FileCheck className="w-4 h-4 text-[#1E3A2F]" />
              <span>FSSAI & Regulatory Transparency Compliance</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211D1A]">
              Public Claims & <span className="italic font-normal text-[#1E3A2F]">Verification</span> Register.
            </h1>
            <p className="text-sm sm:text-base text-[#66615D] leading-relaxed">
              In strict accordance with PRD governance, this register accounts for every badge, health statement, and ingredient claim made across our store. Vague or unstandardized claims have been permanently retired.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-16">
        {/* Claims Table */}
        <div className="rounded-card border border-[#E6DFD5] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#211D1A] border-b border-[#E6DFD5] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5">Claim / Badge</th>
                  <th className="p-4 sm:p-5">Substantiated Meaning</th>
                  <th className="p-4 sm:p-5">Proof Document</th>
                  <th className="p-4 sm:p-5">Governance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DFD5] text-[#66615D]">
                {CLAIMS.map((claim) => (
                  <tr key={claim.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="p-4 sm:p-5 font-serif font-bold text-[#211D1A] text-sm whitespace-nowrap">
                      {claim.badge}
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed max-w-md">
                      {claim.exactMeaning}
                    </td>
                    <td className="p-4 sm:p-5 text-[#776D66]">
                      {claim.proofSource}
                    </td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      {claim.status === 'active' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF3EF] border border-[#BFD3C4] px-2.5 py-1 text-[11px] font-semibold text-[#1E3A2F]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A2F]" />
                          <span>Approved Standard</span>
                        </span>
                      )}
                      {claim.status === 'retired' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FDF6F3] border border-[#F2D7CB] px-2.5 py-1 text-[11px] font-semibold text-[#8A3B26]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#8A3B26]" />
                          <span>Permanently Retired</span>
                        </span>
                      )}
                      {(claim.status === 'pending_lab' || claim.status === 'rewritten') && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF7F0] border border-[#E6DFD1] px-2.5 py-1 text-[11px] font-semibold text-[#776D66]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#776D66]" />
                          <span>{claim.status === 'rewritten' ? 'Rewritten for Precision' : 'Pending Lab Certificate'}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { StageProvider } from '@/context/StageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { StageSelectorModal } from '@/components/stage/StageSelectorModal';

export const metadata: Metadata = {
  title: 'Maa Mitahara — Stage-Matched Traditional Indian Nutrition',
  description:
    'Doctor-reviewed, stage-matched traditional Indian nutrition for pregnant and postpartum mothers. Clean ingredients, declared nutrition, zero synthetic preservatives.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between selection:bg-terracotta-100 selection:text-terracotta-900">
        <StageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <MobileNav />
          <StageSelectorModal />
        </StageProvider>
      </body>
    </html>
  );
}

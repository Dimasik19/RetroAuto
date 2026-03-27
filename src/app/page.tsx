'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { CarsGrid } from '@/components/home/CarsGrid';
import { AboutSection } from '@/components/home/AboutSection';
import { ValueSection } from '@/components/home/ValueSection';
import { CarModal } from '@/components/car/CarModal';
import { LoginModal } from '@/components/auth/LoginModal';
import { useCarStore } from '@/store/useStore';

export default function Home() {
  const { fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <main className="relative min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Cars Grid */}
      <CarsGrid />

      {/* About Section */}
      <AboutSection />

      {/* Value Section */}
      <ValueSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-black font-bold">R</span>
              </div>
              <span className="text-white font-semibold">RetroAuto Collection</span>
            </div>
            <p className="text-gray-500 text-sm text-center sm:text-right">
              © {new Date().getFullYear()} RetroAuto Collection. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CarModal />
      <LoginModal />
    </main>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Lock, Menu } from 'lucide-react';
import { useAuthStore, useUIStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';

export function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const { openLoginModal } = useUIStore();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" />
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-black font-bold text-lg sm:text-xl">R</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">RetroAuto</span>
              <span className="text-[10px] sm:text-xs text-amber-500/80 tracking-widest uppercase">Collection</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['collection', 'about', 'value'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-sm text-gray-400 hover:text-white transition-colors relative group"
              >
                {id === 'collection' ? 'Коллекция' : id === 'about' ? 'О нас' : 'Ценность'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button onClick={logout} variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Выйти
              </Button>
            ) : (
              <Button onClick={openLoginModal} className="btn-premium text-black font-medium px-4 sm:px-6">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Войти</span>
                </span>
              </Button>
            )}
            <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

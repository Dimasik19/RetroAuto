'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { useCarStore } from '@/store/useStore';

export function HeroSection() {
  const { cars } = useCarStore();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const totalValue = cars.reduce((sum, car) => sum + (car.valuation?.currentValue || 0), 0);
  const formatTotal = (value: number) => {
    if (value >= 1000) return `$${Math.round(value / 1000)}K`;
    return `$${value}`;
  };

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/cars/hero-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Light Rays */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-32 h-[600px] bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-transparent blur-2xl transform -rotate-12 origin-top" />
          <div className="absolute top-1/2 right-1/3 w-24 h-[500px] bg-gradient-to-b from-amber-400/15 via-amber-400/5 to-transparent blur-2xl transform rotate-6 origin-top" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs sm:text-sm text-gray-300">Частная коллекция ретро-автомобилей</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-white">RetroAuto</span>
          <br />
          <span className="text-gradient">Collection</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
        >
          Уникальная коллекция ретро-автомобилей конца XX века.
          <br className="hidden sm:block" />
          Японские спорткары, советская классика и легенды эпохи.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={scrollToCollection} className="btn-premium text-black font-semibold px-8 py-6 text-base sm:text-lg glow-amber">
            <span>Смотреть коллекцию</span>
          </button>
          <button onClick={scrollToAbout} className="px-8 py-6 text-base sm:text-lg border border-white/20 text-white hover:bg-white/5 hover:text-amber-500 rounded-md transition-colors">
            О коллекции
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          <div className="glass-card p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1">{cars.length}</div>
            <div className="text-xs sm:text-sm text-gray-400">Автомобиля</div>
          </div>
          <div className="glass-card p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1">{formatTotal(totalValue)}</div>
            <div className="text-xs sm:text-sm text-gray-400">Оценочная стоимость</div>
          </div>
          <div className="glass-card p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1">50+</div>
            <div className="text-xs sm:text-sm text-gray-400">Лет истории</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button onClick={scrollToCollection} className="flex flex-col items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer">
          <span className="text-xs tracking-widest uppercase">Прокрутите вниз</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}

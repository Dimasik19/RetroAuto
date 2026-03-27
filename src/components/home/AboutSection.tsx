'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Award } from 'lucide-react';

export function AboutSection() {
  const features = [
    { icon: Heart, title: 'Страсть к деталям', desc: 'Каждый автомобиль отбирается с любовью и вниманием к истории и состоянию.' },
    { icon: Shield, title: 'Аутентичность', desc: 'Мы ценим оригинальность и сохраняем дух эпохи каждого экземпляра.' },
    { icon: Clock, title: 'История', desc: 'Документируем историю каждого автомобиля: владельцы, реставрации, события.' },
    { icon: Award, title: 'Качество', desc: 'Профессиональная реставрация и обслуживание в специализированных мастерских.' },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-32 bg-gradient-to-b from-transparent via-black/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-4 border border-amber-500/20">
              О коллекции
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Больше, чем <span className="text-gradient">автомобили</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              RetroAuto Collection — это частная коллекция ретро-автомобилей, собранная энтузиастами с глубокой любовью к автомобильной истории. Мы специализируемся на автомобилях конца XX века, которые стали символами своих эпох.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              В нашей коллекции представлены как редкие японские спорткары с роторными двигателями, так и советская классика — автомобили, которые были мечтой миллионов людей и теперь стали настоящими произведениями искусства.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">10+</div>
                <div className="text-xs sm:text-sm text-gray-500">Лет опыта</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">4</div>
                <div className="text-xs sm:text-sm text-gray-500">Автомобиля</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">100%</div>
                <div className="text-xs sm:text-sm text-gray-500">Оригинальность</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-5 sm:p-6 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

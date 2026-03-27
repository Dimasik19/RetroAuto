'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Star } from 'lucide-react';

export function ValueSection() {
  const stats = [
    { value: '+12%', label: 'Инвестиционная ценность', desc: 'Среднегодовой рост стоимости ретро-автомобилей', icon: TrendingUp },
    { value: '50+', label: 'Историческая ценность', desc: 'Лет истории в каждом автомобиле', icon: Clock },
    { value: '4', label: 'Культурное наследие', desc: 'Уникальных представителя эпохи', icon: Users },
    { value: 'Limited', label: 'Редкость', desc: 'Экземпляры в оригинальном состоянии', icon: Star },
  ];

  return (
    <section id="value" className="relative py-20 sm:py-32">
      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-4 border border-amber-500/20">
            Почему это важно
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            История и <span className="text-gradient">ценность</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Ретро-автомобили — это не просто транспорт, это инвестиция в историю, культуру и эмоции, которые невозможно купить в автосалоне.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                <stat.icon className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <h3 className="text-white font-medium mb-2">{stat.label}</h3>
              <p className="text-gray-500 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-12 text-center max-w-3xl mx-auto glow-amber"
        >
          <blockquote className="text-xl sm:text-2xl text-white font-light italic mb-6 leading-relaxed">
            "Автомобиль — это не просто средство передвижения. Это часть истории, воплощение мечты целого поколения."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-amber-500 font-bold">R</span>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">RetroAuto Collection</p>
              <p className="text-gray-500 text-sm">Основатель коллекции</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          Нажмите на любой автомобиль в коллекции, чтобы узнать его уникальную историю
        </motion.p>
      </div>
    </section>
  );
}

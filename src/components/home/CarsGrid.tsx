'use client';

import { motion } from 'framer-motion';
import { useCarStore } from '@/store/useStore';
import { CarCard } from './CarCard';

export function CarsGrid() {
  const { cars } = useCarStore();

  return (
    <section id="collection" className="relative py-20 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-4 border border-amber-500/20">
            Наша гордость
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Коллекция <span className="text-gradient">автомобилей</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Каждый автомобиль в нашей коллекции — это уникальный экземпляр с богатой историей.
            Нажмите на карточку, чтобы узнать подробности.
          </p>
        </motion.div>

        {/* Cars Grid - 2 in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
          {Array.isArray(cars) && cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Коллекция постоянно пополняется. Следите за обновлениями.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

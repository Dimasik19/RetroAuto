'use client';

import { motion } from 'framer-motion';
import { Gauge, MapPin, Calendar, ChevronRight } from 'lucide-react';
import type { Car } from '@/types/car';
import { getConditionLabel, getConditionColor, getLocationLabel, getLocationColor } from '@/data/cars';
import { useCarStore } from '@/store/useStore';

interface CarCardProps {
  car: Car;
  index: number;
}

export function CarCard({ car, index }: CarCardProps) {
  const { openModal } = useCarStore();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMileage = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => openModal(car)}
      className="relative flex-shrink-0 w-[380px] sm:w-[420px] cursor-pointer group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-amber-500/20 to-blue-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Card */}
      <div className="relative glass-card overflow-hidden rounded-2xl">
        {/* Large Image Area */}
        <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
          <motion.img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span className={`px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-md ${getConditionColor(car.condition)}`}>
              {getConditionLabel(car.condition)}
            </span>
            <span className={`px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-md ${getLocationColor(car.location)}`}>
              {getLocationLabel(car.location)}
            </span>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Car Name */}
            <div className="mb-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                {car.name}
              </h3>
              <p className="text-gray-300 text-sm">{car.subtitle}</p>
            </div>

            {/* Quick Specs Row */}
            <div className="flex items-center gap-5 text-sm text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{car.specs.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{car.specs.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span>{formatMileage(car.specs.mileage)} км</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-end justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-gray-400 mb-1">Оценочная стоимость</p>
                <p className="text-2xl sm:text-3xl font-bold text-gradient">
                  {formatPrice(car.valuation.currentValue)}
                </p>
              </div>
              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-2 text-amber-400 text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30 group-hover:bg-amber-500/20 transition-colors"
              >
                Подробнее
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

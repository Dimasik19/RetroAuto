'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Gauge, MapPin, Calendar } from 'lucide-react';
import type { Car } from '@/types/car';
import { getConditionLabel, getConditionColor, getLocationLabel, getLocationColor } from '@/data/cars';
import { useCarStore } from '@/store/useStore';

interface CarCardProps {
  car: Car;
  index: number;
}

export function CarCard({ car, index }: CarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { openModal } = useCarStore();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const formatPrice = (value: number) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMileage = (value: number) => {
    if (!value) return '0';
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  const year = car.specs?.year || 'N/A';
  const country = car.specs?.country || 'N/A';
  const mileage = car.specs?.mileage || 0;
  const currentValue = car.valuation?.currentValue || 0;
  const image = car.images?.[0] || '/cars/hero-bg.png';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => openModal(car)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group cursor-pointer perspective-1000"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="relative glass-card glass-card-hover overflow-hidden">
        {/* Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <motion.img
            src={image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges Container */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Condition Badge - Left */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${getConditionColor(car.condition)}`}>
              {getConditionLabel(car.condition)}
            </span>

            {/* Location Badge - Right */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${getLocationColor(car.location)}`}>
              {getLocationLabel(car.location)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
              {car.name}
            </h3>
            <p className="text-gray-400 text-sm">{car.subtitle}</p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4 text-amber-500/70" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 text-amber-500/70" />
              <span>{country}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm col-span-2">
              <Gauge className="w-4 h-4 text-amber-500/70" />
              <span>{formatMileage(mileage)} км</span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Оценочная стоимость</p>
                <p className="text-xl sm:text-2xl font-bold text-gradient">
                  {formatPrice(currentValue)}
                </p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-amber-500 text-sm font-medium flex items-center gap-1"
              >
                Подробнее
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

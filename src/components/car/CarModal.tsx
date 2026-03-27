'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Gauge, Fuel, Cog, Car as CarIcon, Vin } from 'lucide-react';
import { useCarStore, useAuthStore } from '@/store/useStore';
import { getConditionLabel, getConditionColor, getLocationLabel, getLocationColor } from '@/data/cars';
import { Button } from '@/components/ui/button';

export function CarModal() {
  const { selectedCar, isModalOpen, closeModal } = useCarStore();
  const { isAuthenticated } = useAuthStore();

  if (!selectedCar) return null;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatMileage = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="min-h-screen px-4 py-8 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl glass-card overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 sm:h-80 md:h-96">
                <img
                  src={selectedCar.images[0]}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${getConditionColor(selectedCar.condition)}`}>
                    {getConditionLabel(selectedCar.condition)}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${getLocationColor(selectedCar.location)}`}>
                    {getLocationLabel(selectedCar.location)}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                    {selectedCar.name}
                  </h2>
                  <p className="text-gray-300 text-lg">{selectedCar.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedCar.description}
                </p>

                {/* Specs Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Specifications */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Характеристики</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Calendar, label: 'Год', value: selectedCar.specs.year },
                        { icon: CarIcon, label: 'Кузов', value: selectedCar.specs.bodyType },
                        { icon: Fuel, label: 'Двигатель', value: `${selectedCar.specs.engineVolume} ${selectedCar.specs.power}` },
                        { icon: Cog, label: 'КПП', value: selectedCar.specs.transmission },
                        { icon: MapPin, label: 'Страна', value: selectedCar.specs.country },
                        { icon: Gauge, label: 'Пробег', value: `${formatMileage(selectedCar.specs.mileage)} км` },
                      ].map((item) => (
                        <div key={item.label} className="glass-card p-4">
                          <div className="flex items-center gap-2 text-amber-500 mb-1">
                            <item.icon className="w-4 h-4" />
                            <span className="text-xs text-gray-400">{item.label}</span>
                          </div>
                          <p className="text-white font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Valuation */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Оценка стоимости</h3>
                    <div className="glass-card p-6">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-400 mb-1">Текущая стоимость</p>
                        <p className="text-4xl font-bold text-gradient">{formatPrice(selectedCar.valuation.currentValue)}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>Мин: {formatPrice(selectedCar.valuation.minValue)}</span>
                        <span>Макс: {formatPrice(selectedCar.valuation.maxValue)}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{selectedCar.valuation.comment}</p>
                    </div>
                  </div>
                </div>

                {/* Owners */}
                {selectedCar.owners.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">История владельцев</h3>
                    <div className="space-y-3">
                      {selectedCar.owners.map((owner, index) => (
                        <motion.div
                          key={owner.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-card p-4 flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{owner.name}</p>
                            <p className="text-sm text-gray-400">{owner.period}</p>
                            <p className="text-xs text-gray-500 mt-1">{owner.note}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {selectedCar.timeline.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">История автомобиля</h3>
                    <div className="relative">
                      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-amber-500/30" />
                      <div className="space-y-4">
                        {selectedCar.timeline.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative pl-12"
                          >
                            <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-black" />
                            <div className="glass-card p-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-amber-500 font-bold">{event.year}</span>
                                <span className="text-white font-medium">{event.title}</span>
                              </div>
                              <p className="text-gray-400 text-sm">{event.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Actions */}
                {isAuthenticated && (
                  <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                    <Button variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
                      Редактировать
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                      Добавить фото
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

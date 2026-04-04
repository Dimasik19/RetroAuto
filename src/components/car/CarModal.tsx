'use client';

import { motion, AnimatePresence, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, MapPin, Gauge, Fuel, Cog, Car as CarIcon, ZoomIn, ChevronLeft, ChevronRight, Pencil, ImagePlus, Check, Plus, Trash2 } from 'lucide-react';
import { useCarStore, useAuthStore } from '@/store/useStore';
import { getConditionLabel, getConditionColor, getLocationLabel, getLocationColor } from '@/data/cars';
import type { CarOwner, CarTimelineEvent } from '@/types/car';

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50 placeholder:text-gray-600';

export function CarModal() {
  const { selectedCar, isModalOpen, closeModal, uploadImage, updateCar } = useCarStore();
  const { isAuthenticated } = useAuthStore();

  const [displayValue, setDisplayValue] = useState(0);
  const [displayMileage, setDisplayMileage] = useState(0);
  const [displayYear, setDisplayYear] = useState(2026);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [descValue, setDescValue] = useState('');
  const [valuationForm, setValuationForm] = useState({ currentValue: 0, minValue: 0, maxValue: 0, assessmentDate: '', comment: '' });
  const [specsForm, setSpecsForm] = useState({ brand: '', model: '', year: 0, color: '', bodyType: '', engine: '', engineVolume: '', power: '', transmission: '', drive: '', vin: '', mileage: 0, country: '', acquisitionDate: '', condition: '' });
  const [ownersForm, setOwnersForm] = useState<CarOwner[]>([]);
  const [timelineForm, setTimelineForm] = useState<CarTimelineEvent[]>([]);

  useEffect(() => {
    setActiveImage(0);
    setLightboxOpen(false);
    setEditingSection(null);
  }, [selectedCar?.id]);

  useEffect(() => {
    if (!isModalOpen || !selectedCar?.valuation?.currentValue) return;
    setDisplayValue(0);
    const controls = animate(0, selectedCar.valuation.currentValue, {
      duration: 2, ease: 'easeOut', onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return controls.stop;
  }, [isModalOpen, selectedCar?.valuation?.currentValue]);

  useEffect(() => {
    if (!isModalOpen || !selectedCar?.specs?.mileage) return;
    setDisplayMileage(0);
    const controls = animate(0, selectedCar.specs.mileage, {
      duration: 2, ease: 'easeOut', onUpdate: (v) => setDisplayMileage(Math.round(v)),
    });
    return controls.stop;
  }, [isModalOpen, selectedCar?.specs?.mileage]);

  useEffect(() => {
    if (!isModalOpen || !selectedCar?.specs?.year) return;
    setDisplayYear(2026);
    const controls = animate(2026, selectedCar.specs.year, {
      duration: 2, ease: 'easeOut', onUpdate: (v) => setDisplayYear(Math.round(v)),
    });
    return controls.stop;
  }, [isModalOpen, selectedCar?.specs?.year]);

  if (!selectedCar) return null;

  const FALLBACK_POOL = ['/cars/hero-bg.png', '/cars/vaz-2101.png', '/cars/vaz-2106.png', '/cars/moskvich-412.png', '/cars/mazda-rx3.png'];
  const rawImages = selectedCar.images?.length > 0 ? selectedCar.images : [];
  const carouselImages = (() => {
    const base = rawImages.length > 0 ? rawImages : [FALLBACK_POOL[0]];
    if (base.length >= 3) return base.slice(0, 3);
    const extras = FALLBACK_POOL.filter((f) => !base.includes(f));
    return [...base, ...extras].slice(0, 3);
  })();

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

  const formatMileage = (value: number) =>
    new Intl.NumberFormat('ru-RU').format(value);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedCar) uploadImage(selectedCar.id, file);
    e.target.value = '';
  };

  const startEdit = (section: string) => {
    if (section === 'description') setDescValue(selectedCar.description);
    if (section === 'valuation') setValuationForm({ ...selectedCar.valuation });
    if (section === 'specs') setSpecsForm({ ...selectedCar.specs } as typeof specsForm);
    if (section === 'owners') setOwnersForm(selectedCar.owners.map(o => ({ ...o })));
    if (section === 'timeline') setTimelineForm(selectedCar.timeline.map(t => ({ ...t })));
    setEditingSection(section);
  };

  const cancelEdit = () => setEditingSection(null);

  const saveEdit = async (section: string) => {
    if (section === 'description') await updateCar(selectedCar.id, { description: descValue });
    if (section === 'valuation') await updateCar(selectedCar.id, { valuation: valuationForm } as never);
    if (section === 'specs') await updateCar(selectedCar.id, { specs: specsForm } as never);
    if (section === 'owners') await updateCar(selectedCar.id, { owners: ownersForm } as never);
    if (section === 'timeline') await updateCar(selectedCar.id, { timeline: timelineForm } as never);
    setEditingSection(null);
  };

  // Section header with edit/save/cancel controls
  const SectionHeader = ({ title, section }: { title: string; section: string }) => (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {isAuthenticated && (
        editingSection === section ? (
          <div className="flex gap-2">
            <button onClick={() => saveEdit(section)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30 text-sm transition-colors">
              <Check className="w-3.5 h-3.5" /> Сохранить
            </button>
            <button onClick={cancelEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 text-gray-400 hover:bg-white/5 text-sm transition-colors">
              <X className="w-3.5 h-3.5" /> Отмена
            </button>
          </div>
        ) : (
          <button onClick={() => startEdit(section)} className="p-1.5 rounded text-gray-500 hover:text-amber-500 hover:bg-amber-500/10 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )
      )}
    </div>
  );

  const lightbox = (
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setActiveImage((i) => (i - 1 + carouselImages.length) % carouselImages.length); }}
          ><ChevronLeft className="w-6 h-6" /></button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setActiveImage((i) => (i + 1) % carouselImages.length); }}
          ><ChevronRight className="w-6 h-6" /></button>

          <div
            className="relative rounded-xl border-2 border-amber-500/70 overflow-hidden"
            style={{ width: 'min(80vw, calc(80vh * 16 / 9))', aspectRatio: '16 / 9' }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={activeImage}
              src={carouselImages[activeImage]}
              alt={selectedCar.name}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="w-full h-full object-contain bg-black"
            />
            <button
              className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            ><X className="w-4 h-4" /></button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, idx) => (
              <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }}
                className={`h-2 rounded-full transition-all ${activeImage === idx ? 'bg-amber-500 w-6' : 'w-2 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                <X className="w-6 h-6" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 sm:h-80 md:h-96">
                <img src={selectedCar.images[0] || carouselImages[0]} alt={selectedCar.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${getConditionColor(selectedCar.condition)}`}>{getConditionLabel(selectedCar.condition)}</span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${getLocationColor(selectedCar.location)}`}>{getLocationLabel(selectedCar.location)}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{selectedCar.name}</h2>
                  <p className="text-gray-300 text-lg">{selectedCar.subtitle}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">

                {/* Description */}
                <div className="mb-8">
                  <SectionHeader title="Описание" section="description" />
                  {editingSection === 'description' ? (
                    <textarea
                      value={descValue}
                      onChange={(e) => setDescValue(e.target.value)}
                      rows={4}
                      className={inputCls}
                    />
                  ) : (
                    <p className="text-gray-300 text-lg leading-relaxed">{selectedCar.description}</p>
                  )}
                </div>

                {/* Valuation */}
                <div className="mb-8">
                  <SectionHeader title="Оценка стоимости" section="valuation" />
                  {editingSection === 'valuation' ? (
                    <div className="glass-card p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {([['currentValue', 'Текущая стоимость ($)'], ['minValue', 'Минимум ($)'], ['maxValue', 'Максимум ($)']] as const).map(([key, label]) => (
                          <div key={key}>
                            <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                            <input type="number" value={valuationForm[key]} onChange={(e) => setValuationForm(f => ({ ...f, [key]: Number(e.target.value) }))} className={inputCls} />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Дата оценки</label>
                        <input type="text" value={valuationForm.assessmentDate} onChange={(e) => setValuationForm(f => ({ ...f, assessmentDate: e.target.value }))} className={inputCls} />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Комментарий</label>
                        <textarea value={valuationForm.comment} onChange={(e) => setValuationForm(f => ({ ...f, comment: e.target.value }))} rows={2} className={inputCls} />
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card p-6">
                      <div className="grid md:grid-cols-3 gap-6 mb-4">
                        <div className="text-center"><p className="text-sm text-gray-400 mb-1">Год выпуска</p><p className="text-4xl font-bold text-gradient">{displayYear}</p></div>
                        <div className="text-center"><p className="text-sm text-gray-400 mb-1">Пробег</p><p className="text-4xl font-bold text-gradient">{formatMileage(displayMileage)} км</p></div>
                        <div className="text-center"><p className="text-sm text-gray-400 mb-1">Текущая стоимость</p><p className="text-4xl font-bold text-gradient">{formatPrice(displayValue)}</p></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mb-4 pt-4 border-t border-white/10">
                        <span>Мин: {formatPrice(selectedCar.valuation.minValue)}</span>
                        <span>Макс: {formatPrice(selectedCar.valuation.maxValue)}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{selectedCar.valuation.comment}</p>
                    </div>
                  )}
                </div>

                {/* Specs */}
                <div className="mb-8">
                  <SectionHeader title="Характеристики" section="specs" />
                  {editingSection === 'specs' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {([
                        ['brand', 'Марка'], ['model', 'Модель'], ['year', 'Год'],
                        ['color', 'Цвет'], ['bodyType', 'Кузов'], ['engine', 'Двигатель'],
                        ['engineVolume', 'Объём'], ['power', 'Мощность'], ['transmission', 'КПП'],
                        ['drive', 'Привод'], ['vin', 'VIN'], ['mileage', 'Пробег'],
                        ['country', 'Страна'], ['acquisitionDate', 'Дата приобретения'], ['condition', 'Состояние'],
                      ] as [keyof typeof specsForm, string][]).map(([key, label]) => (
                        <div key={key}>
                          <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                          <input
                            type={key === 'year' || key === 'mileage' ? 'number' : 'text'}
                            value={specsForm[key]}
                            onChange={(e) => setSpecsForm(f => ({ ...f, [key]: key === 'year' || key === 'mileage' ? Number(e.target.value) : e.target.value }))}
                            className={inputCls}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  )}
                </div>

                {/* Gallery */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Фотогалерея</h3>
                    {isAuthenticated && (
                      <>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors text-sm">
                          <ImagePlus className="w-4 h-4" /> Добавить фото
                        </button>
                      </>
                    )}
                  </div>

                  <div className="relative rounded-xl overflow-hidden mb-3 group" style={{ aspectRatio: '16 / 9' }}>
                    {carouselImages.map((src, idx) => (
                      <motion.img key={idx} src={src} alt={`${selectedCar.name} ${idx + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: idx === 0 ? 1 : 0 }}
                        animate={{ opacity: idx === activeImage ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center cursor-zoom-in z-10" onClick={() => setLightboxOpen(true)}>
                      <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setActiveImage((i) => (i - 1 + carouselImages.length) % carouselImages.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); setActiveImage((i) => (i + 1) % carouselImages.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"><ChevronRight className="w-5 h-5" /></button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {carouselImages.map((_, idx) => (
                        <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }} className={`h-1.5 rounded-full transition-all duration-200 ${idx === activeImage ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white/80 w-1.5'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {carouselImages.map((img, idx) => (
                      <button key={idx} onClick={() => setActiveImage(idx)}
                        className={`relative rounded-lg overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'ring-2 ring-amber-500 opacity-100' : 'opacity-50 hover:opacity-80'}`}
                        style={{ width: '80px', height: '60px' }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Owners */}
                {(selectedCar.owners.length > 0 || isAuthenticated) && (
                  <div className="mb-8">
                    <SectionHeader title="История владельцев" section="owners" />
                    {editingSection === 'owners' ? (
                      <div className="space-y-3">
                        {ownersForm.map((owner, idx) => (
                          <div key={idx} className="glass-card p-4 space-y-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-amber-500 font-bold text-sm">#{idx + 1}</span>
                              <button onClick={() => setOwnersForm(f => f.filter((_, i) => i !== idx))} className="p-1 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-gray-400 mb-1 block">Имя</label>
                                <input value={owner.name} onChange={(e) => setOwnersForm(f => f.map((o, i) => i === idx ? { ...o, name: e.target.value } : o))} className={inputCls} />
                              </div>
                              <div>
                                <label className="text-xs text-gray-400 mb-1 block">Период</label>
                                <input value={owner.period} onChange={(e) => setOwnersForm(f => f.map((o, i) => i === idx ? { ...o, period: e.target.value } : o))} className={inputCls} />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Примечание</label>
                              <input value={owner.note} onChange={(e) => setOwnersForm(f => f.map((o, i) => i === idx ? { ...o, note: e.target.value } : o))} className={inputCls} />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setOwnersForm(f => [...f, { id: '', name: '', period: '', note: '' }])}
                          className="flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-white/20 text-gray-400 hover:border-amber-500/40 hover:text-amber-500 transition-colors text-sm w-full justify-center"
                        >
                          <Plus className="w-4 h-4" /> Добавить владельца
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedCar.owners.map((owner, index) => (
                          <motion.div key={owner.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="glass-card p-4 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold">{index + 1}</div>
                            <div>
                              <p className="text-white font-medium">{owner.name}</p>
                              <p className="text-sm text-gray-400">{owner.period}</p>
                              <p className="text-xs text-gray-500 mt-1">{owner.note}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Timeline */}
                {(selectedCar.timeline.length > 0 || isAuthenticated) && (
                  <div>
                    <SectionHeader title="История автомобиля" section="timeline" />
                    {editingSection === 'timeline' ? (
                      <div className="space-y-3">
                        {timelineForm.map((event, idx) => (
                          <div key={idx} className="glass-card p-4 space-y-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-amber-500 font-bold text-sm">Событие {idx + 1}</span>
                              <button onClick={() => setTimelineForm(f => f.filter((_, i) => i !== idx))} className="p-1 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-gray-400 mb-1 block">Год</label>
                                <input type="number" value={event.year} onChange={(e) => setTimelineForm(f => f.map((t, i) => i === idx ? { ...t, year: Number(e.target.value) } : t))} className={inputCls} />
                              </div>
                              <div>
                                <label className="text-xs text-gray-400 mb-1 block">Заголовок</label>
                                <input value={event.title} onChange={(e) => setTimelineForm(f => f.map((t, i) => i === idx ? { ...t, title: e.target.value } : t))} className={inputCls} />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Описание</label>
                              <textarea value={event.description} onChange={(e) => setTimelineForm(f => f.map((t, i) => i === idx ? { ...t, description: e.target.value } : t))} rows={2} className={inputCls} />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setTimelineForm(f => [...f, { id: '', year: new Date().getFullYear(), title: '', description: '', icon: '' }])}
                          className="flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-white/20 text-gray-400 hover:border-amber-500/40 hover:text-amber-500 transition-colors text-sm w-full justify-center"
                        >
                          <Plus className="w-4 h-4" /> Добавить событие
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-amber-500/30" />
                        <div className="space-y-4">
                          {selectedCar.timeline.map((event, index) => (
                            <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="relative pl-12">
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
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    {typeof window !== 'undefined' && createPortal(lightbox, document.body)}
    </>
  );
}

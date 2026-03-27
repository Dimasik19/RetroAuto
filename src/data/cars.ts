import type { Car } from '@/types/car';

// Condition labels and colors
export const getConditionLabel = (condition: Car['condition']) => {
  switch (condition) {
    case 'excellent': return 'Идеальное';
    case 'good': return 'Хорошее';
    case 'running': return 'На ходу';
    default: return condition;
  }
};

export const getConditionColor = (condition: Car['condition']) => {
  switch (condition) {
    case 'excellent': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'good': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'running': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

// Location labels and colors
export const getLocationLabel = (location: Car['location']) => {
  switch (location) {
    case 'in_collection': return 'В коллекции';
    case 'on_exposition': return 'На экспозиции';
    case 'in_restoration': return 'На реставрации';
    default: return location;
  }
};

export const getLocationColor = (location: Car['location']) => {
  switch (location) {
    case 'in_collection': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'on_exposition': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'in_restoration': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Car } from '@/types/car';

interface AuthState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

interface CarState {
  selectedCar: Car | null;
  isModalOpen: boolean;
  cars: Car[];
  isLoading: boolean;
  setSelectedCar: (car: Car | null) => void;
  openModal: (car: Car) => void;
  closeModal: () => void;
  fetchCars: () => Promise<void>;
  updateCar: (carId: string, updates: Partial<Car>) => Promise<void>;
  uploadImage: (carId: string, file: File) => Promise<void>;
  deleteImage: (carId: string, imageUrl: string) => Promise<void>;
  refreshSelectedCar: () => void;
}

interface UIState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (password: string) => {
        if (password === 'retro2024') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: 'retro-auth-storage',
    }
  )
);

export const useCarStore = create<CarState>()((set, get) => ({
  selectedCar: null,
  isModalOpen: false,
  cars: [],
  isLoading: false,
  setSelectedCar: (car) => set({ selectedCar: car }),
  openModal: (car) => set({ selectedCar: car, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedCar: null }),
  
  fetchCars: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/cars');
      const cars = await response.json();
      set({ cars, isLoading: false });
    } catch (error) {
      console.error('Error fetching cars:', error);
      set({ isLoading: false });
    }
  },
  
  updateCar: async (carId, updates) => {
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const state = get();
        const updatedCars = state.cars.map((car) =>
          car.id === carId ? { ...car, ...updates } : car
        );
        const updatedSelectedCar = state.selectedCar?.id === carId
          ? { ...state.selectedCar, ...updates }
          : state.selectedCar;
        
        set({
          cars: updatedCars,
          selectedCar: updatedSelectedCar,
        });
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
  },
  
  uploadImage: async (carId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('carId', carId);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const { image } = await response.json();
        
        const state = get();
        const updatedCars = state.cars.map((car) =>
          car.id === carId
            ? { ...car, images: [...car.images, image.url] }
            : car
        );
        const updatedSelectedCar = state.selectedCar?.id === carId
          ? { ...state.selectedCar, images: [...state.selectedCar.images, image.url] }
          : state.selectedCar;
        
        set({
          cars: updatedCars,
          selectedCar: updatedSelectedCar,
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  },
  
  deleteImage: async (carId, imageUrl) => {
    try {
      const response = await fetch('/api/images/delete-by-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId, imageUrl }),
      });
      
      if (response.ok) {
        const state = get();
        const updatedCars = state.cars.map((c) =>
          c.id === carId
            ? { ...c, images: c.images.filter(img => img !== imageUrl) }
            : c
        );
        const updatedSelectedCar = state.selectedCar?.id === carId
          ? { ...state.selectedCar, images: state.selectedCar.images.filter(img => img !== imageUrl) }
          : state.selectedCar;
        
        set({
          cars: updatedCars,
          selectedCar: updatedSelectedCar,
        });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  },
  
  refreshSelectedCar: () => {
    const state = get();
    if (state.selectedCar) {
      const updatedCar = state.cars.find(c => c.id === state.selectedCar?.id);
      if (updatedCar) {
        set({ selectedCar: updatedCar });
      }
    }
  },
}));

export const useUIStore = create<UIState>()((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));

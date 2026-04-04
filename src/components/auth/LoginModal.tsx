'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useAuthStore, useUIStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useUIStore();
  const { login } = useAuthStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await login(password)) {
      setPassword('');
      setError(false);
      closeLoginModal();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeLoginModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-card p-8"
          >
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Вход в систему</h2>
              <p className="text-gray-400 text-sm">Введите пароль для доступа к админ-панели</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-400 text-sm">Неверный пароль</p>
              )}
              <Button type="submit" className="w-full btn-premium text-black font-medium py-3">
                Войти
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

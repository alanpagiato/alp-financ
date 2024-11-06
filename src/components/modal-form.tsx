'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalFormProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function ModalForm({ title, isVisible, onClose, children }: ModalFormProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

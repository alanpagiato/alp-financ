'use client';

import { useState, useEffect } from 'react';
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertOkProps {
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function AlertOk({ title, message, isVisible, onClose }: AlertOkProps) {

  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <Alert 
        className="flex flex-col items-center text-center p-6 bg-white rounded-md shadow-lg max-w-sm" 
        onClick={(e) => e.stopPropagation()}
      >
        <RocketIcon className="h-6 w-6 mb-4 text-blue-500" />
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription className="mt-2 text-gray-600">{message}</AlertDescription>
      </Alert>
    </div>
  );
  
}
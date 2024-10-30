'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmAlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function ConfirmAlert({ title, message, onConfirm, onCancel, isOpen }: ConfirmAlertProps) {
  
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirm}>Sim</Button>
          <Button variant="outline" onClick={onCancel}>Não</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

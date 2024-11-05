"use client"

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button";
import { EditSplitModal } from "./edit-split-modal";

interface SplitData {
  id: number;
  entity?: {
    name: string;
  };
  accountSubPlan?: {
    description: string;
  };
  valueSplit: number;
}

interface DataTableSplitProps {
  splitData: SplitData[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedData: Partial<SplitData>) => void;
}

export function DataTableSplit({ splitData, onDelete, onUpdate }: DataTableSplitProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSplit, setSelectedSplit] = useState<SplitData | null>(null);

  const totalValueSplit = splitData.reduce((total, split) => total + split.valueSplit, 0);

  const handleEditClick = (split: SplitData) => {
    setSelectedSplit(split); // Define os dados do item selecionado
    setIsEditModalOpen(true); // Abre o modal de edição
  };

  const handleSave = (updatedData: any) => {
    if (selectedSplit) {
      onUpdate(selectedSplit.id, updatedData); // Atualiza os dados no componente pai
      setIsEditModalOpen(false); // Fecha o modal
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
    <Table>
      <TableCaption>Lista de divisões do movimento (Entidades e Sub Planos).</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Entidade</TableHead>
          <TableHead>Sub Plano de Contas</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {splitData.map((split: any) => (
          <TableRow key={split.id}>
            <TableCell>{split.entity?.name || 'N/A'}</TableCell>
            <TableCell>{split.accountSubPlan?.description || 'N/A'}</TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(split.valueSplit)}
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => handleEditClick(split)}>
                  Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(split.id)} className="ml-2">
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-bold">Total</TableCell>
          <TableCell className="text-right font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValueSplit)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}

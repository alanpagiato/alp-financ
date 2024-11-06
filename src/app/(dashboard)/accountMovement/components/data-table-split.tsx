"use client"

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

interface SplitData {
  id: number;
  accountMovementId?: number;
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
}

export function DataTableSplit({ splitData }: DataTableSplitProps) {
  

  const totalValueSplit = splitData.reduce((total, split) => total + split.valueSplit, 0);

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
              <Button variant="outline" size="sm" >
                  Editar
              </Button>
              <Button variant="destructive" size="sm" className="ml-2">
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

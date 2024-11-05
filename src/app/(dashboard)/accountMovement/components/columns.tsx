'use client'

import { useRouter } from "next/navigation";
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import {
  ColumnDef,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type AccountMovement = {
  id: number
  dateMovement: string
  documentNumber: string
  valueMovement: number
  finished: boolean
  observations: string
  bankAccountId: number
  movementCodeId: number
  entityCode: number
}

import { formatUtcToString } from "@/lib/dateConvert"
import { ArrowUpDown } from "lucide-react"

interface ColumnsProps {
  deleteAccountMovement: (id: number) => void;
  bankAccountMap: Record<number, string>;
  movementCodeMap: Record<number, { description: string; nature: string }>;
}

export const columns = ({ deleteAccountMovement, bankAccountMap, movementCodeMap }: ColumnsProps): ColumnDef<AccountMovement>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "dateMovement",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue() as string);
        return formatUtcToString(dateValue);
      },
    },
    {
      accessorKey: "bankAccountId",
      header: "Conta",
      cell: ({ row }) => {
        const bankAccountId = row.original.bankAccountId;
        const bankAccountName = bankAccountMap[bankAccountId] || "Grupo Desconhecido";
        return <span>{bankAccountName}</span>;
      }
    },
    {
      accessorKey: "movementCodeId",
      header: "Código de Lançamento",
      cell: ({ row }) => {
        const movementCodeId = row.original.movementCodeId;
        const movementCode = movementCodeMap[movementCodeId] || "Grupo Desconhecido";
        return <span>{movementCode.description}</span>;
      }
    },
    {
      accessorKey: "valueMovement",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const value = row.getValue("valueMovement");
        const movementCodeId = row.original.movementCodeId;
        const nature = movementCodeMap[movementCodeId]?.nature;

        const color = nature === "Debito" ? "text-red-500" : "text-blue-500";

        return (
          <span className={color}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(Number(value))}
          </span>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const accountMovement = row.original
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir Menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/accountMovement/${accountMovement.id}`);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteAccountMovement(accountMovement.id)} // Chama handleDeleteRequest com o ID
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]
}

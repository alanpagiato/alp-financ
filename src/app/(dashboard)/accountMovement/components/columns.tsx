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

interface ColumnsProps {
  deleteAccountMovement: (id: number) => void;
}

export const columns = ({ deleteAccountMovement }: ColumnsProps): ColumnDef<AccountMovement>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "dateMovement",
      header: "Data",
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue() as string);
        return formatUtcToString(dateValue);
      },
    },
    {
        accessorKey: "documentNumber",
        header: "N Documento",
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

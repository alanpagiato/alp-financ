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

export type AccountPlan = {
  id: number
  description: string
}

interface ColumnsProps {
  deleteAccountPlan: (id: number) => void;
}

export const columns = ({ deleteAccountPlan }: ColumnsProps): ColumnDef<AccountPlan>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const accountPlan = row.original

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
                  router.push(`/accountPlan/${accountPlan.id}`);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteAccountPlan(accountPlan.id)}
              >
                Excluir
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/accountPlan/${accountPlan.id}/accountSubPlan`);
                }}
              >
                Gerenciar Subplano
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]
}

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

export type MovementCode = {
  id: number
  description: string
  nature: string
}

interface ColumnsProps {
  deleteMovementCode: (id: number) => void;
}

export const columns = ({ deleteMovementCode }: ColumnsProps): ColumnDef<MovementCode>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "nature",
      header: "Natureza",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const movementCode = row.original

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
                  router.push(`/movementCode/${movementCode.id}`);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteMovementCode(movementCode.id)}
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

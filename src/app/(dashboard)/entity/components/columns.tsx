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

export type Entity = {
  id: number
  name: string
}

interface ColumnsProps {
  deleteEntity: (id: number) => void;
}

export const columns = ({ deleteEntity }: ColumnsProps): ColumnDef<Entity>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const entity = row.original

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
                  router.push(`/entity/${entity.id}`);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteEntity(entity.id)}
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

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

export type UserGroup = {
  id: number
  name: string
  isAdmin: boolean
}

interface ColumnsProps {
  deleteUserGroup: (id: number) => void;
}

export const columns = ({ deleteUserGroup }: ColumnsProps): ColumnDef<UserGroup>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "isAdmin",
      header: "É Administrador",
      cell: ({ row }) => (row.original.isAdmin ? "Sim" : "Não"),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const userGroup = row.original
        const isDisabled = userGroup.name.toLowerCase() === "admin"

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
                  router.push(`/userGroup/${userGroup.id}`);
                }}
                disabled={isDisabled}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteUserGroup(userGroup.id)}
                disabled={isDisabled}
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

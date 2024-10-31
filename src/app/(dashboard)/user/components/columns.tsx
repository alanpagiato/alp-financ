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

export type User = {
  id: string
  username: string
  userGroupId: number
}

interface ColumnsProps {
  deleteUser: (id: string) => void;
  groupMap: Record<number, string>;
}

export const columns = ({ deleteUser, groupMap }: ColumnsProps): ColumnDef<User>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "userGroupId",
      header: "Grupo",
      cell: ({ row }) => {
        const userGroupId = row.original.userGroupId;
        const groupName = groupMap[userGroupId] || "Grupo Desconhecido"; // Usa o mapa para obter o nome do grupo
        return <span>{groupName}</span>;
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original
        const isDisabled = user.username.toLowerCase() === "master"

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
                  router.push(`/user/${user.id}`);
                }}
                disabled={isDisabled}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteUser(user.id)}
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

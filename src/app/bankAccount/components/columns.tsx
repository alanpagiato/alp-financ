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

export type BankAccount = {
  id: number
  name: string
  numberBank: number
  agency: string
  agencyDigit: string 
  numberAccount: string
  numberAccountDigit: string
  addressType: string
  address: string
  addressNumber: string
  addressComplement: string
}

interface ColumnsProps {
  deleteBankAccount: (id: number) => void;
}

export const columns = ({ deleteBankAccount }: ColumnsProps): ColumnDef<BankAccount>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "numberBank",
      header: () => <div className="text-right">Número</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("numberBank")}</div>
      },
    },
    {
      accessorKey: "agency",
      header: "Agência",
      cell: ({ row }) => {
        const agency = row.original.agency;
        const agencyDigit = row.original.agencyDigit;
        return <div>{`${agency}-${agencyDigit}`}</div>;
      },
    },
    {
      accessorKey: "numberAccount",
      header: "Número Conta",
      cell: ({ row }) => {
        const numberAccount = row.original.numberAccount;
        const numberAccountDigit = row.original.numberAccountDigit;
        return <div>{`${numberAccount}-${numberAccountDigit}`}</div>;
      },
    },
    {
      accessorKey: "address",
      header: "Endereço",
      cell: ({ row }) => {
        let address = row.original.addressType + ' ' + row.original.address + ', ' + row.original.addressNumber;
        if (row.original.addressComplement) {
          address = address + '-' + row.original.addressComplement
        }
        const numberAccountDigit = row.original.address;
        return <div>{`${address}`}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const bankAccount = row.original
        
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
                  router.push(`/bankAccount/${bankAccount.id}`);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteBankAccount(bankAccount.id)} // Chama handleDeleteRequest com o ID
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

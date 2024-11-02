"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { useState } from "react"
import { useRouter } from "next/navigation"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col md:flex-row items-center py-4 space-y-4 md:space-y-0 md:space-x-4 w-full">
        <Input
          placeholder="Filtrar descrição..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select 
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("nature")?.setFilterValue(undefined);
            } else {
              table.getColumn("nature")?.setFilterValue(value);
            }
          }}
          value={(table.getColumn("nature")?.getFilterValue() as string) ?? "all"}
        >
          <SelectTrigger className="max-w-sm">
            <SelectValue placeholder="Filtrar natureza..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Filtrar natureza...</SelectItem> 
            <SelectItem value="Debito">Debito</SelectItem>
            <SelectItem value="Credito">Credito</SelectItem>
          </SelectContent>
        </Select>

        {/* Contêiner para alinhar o botão */}
        <div className="w-full md:w-auto md:ml-auto"> 
          <Button 
            className="h-8 px-2 lg:px-3 w-full md:w-auto" // Largura total no celular, ajusta no desktop
            onClick={() => router.push("/movementCode/add")}
          >
            Inserir Novo
          </Button>
        </div>
      </div>

      <div className="w-full rounded-md border">
        <Table className="w-full table-fixed"> {/* Aqui aplicamos table-fixed */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="w-1/5"> {/* Ajuste proporcional */}
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-1/5"> {/* Mesma largura para as células */}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </>
  )
}
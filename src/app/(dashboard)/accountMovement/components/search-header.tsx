"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, XIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@tanstack/react-table";

interface DataTableHeaderProps {
  table: Table<any>;
}

export function SearchHeader({ table }: DataTableHeaderProps) {
  const [openPop, setOpenPop] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();

  const applyDateFilter = (start: Date | null, end: Date | null) => {
    table.getColumn("dateMovement")?.setFilterValue({
      start: start ? format(start, "yyyy-MM-dd") : undefined,
      end: end ? format(end, "yyyy-MM-dd") : undefined,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover open={openPop} onOpenChange={setOpenPop}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-52 justify-start text-left font-normal"
            onClick={() => setOpenPop(!openPop)}
          >
            {startDate && endDate
              ? `${format(startDate, "dd/MM/yyyy", { locale: ptBR })} - ${format(
                  endDate,
                  "dd/MM/yyyy",
                  { locale: ptBR }
                )}`
              : startDate
              ? `A partir de ${format(startDate, "dd/MM/yyyy", { locale: ptBR })}`
              : endDate
              ? `Até ${format(endDate, "dd/MM/yyyy", { locale: ptBR })}`
              : "Filtrar intervalo de datas..."}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4">
            <label>Data Inicial:</label>
            <Calendar
              mode="single"
              selected={startDate || undefined}
              onSelect={(date: Date | undefined) => {
                const newStartDate = date ?? null;
                setStartDate(newStartDate);
                applyDateFilter(newStartDate, endDate); // Aplica o filtro imediatamente após selecionar a data inicial
                setOpenPop(false);
              }}
              locale={ptBR}
            />
            <label>Data Final:</label>
            <Calendar
              mode="single"
              selected={endDate || undefined}
              onSelect={(date: Date | undefined) => {
                const newEndDate = date ?? null;
                setEndDate(newEndDate);
                applyDateFilter(startDate, newEndDate); // Aplica o filtro imediatamente após selecionar a data final
                setOpenPop(false);
              }}
              locale={ptBR}
            />
          </div>
        </PopoverContent>
      </Popover>

      {(startDate || endDate) && (
        <Button
          variant="outline"
          className="h-8 px-2"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            table.getColumn("dateMovement")?.setFilterValue("");
          }}
        >
          <XIcon className="h-4 w-4 text-gray-500" />
        </Button>
      )}

      <Button
        className="h-8 px-2 lg:px-3 ml-auto"
        onClick={() => router.push("/accountMovement/add")}
      >
        Inserir Novo
      </Button>
    </div>
  );
}

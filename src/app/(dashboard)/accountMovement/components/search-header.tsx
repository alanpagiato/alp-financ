"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, XIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@tanstack/react-table"; // importe a tipagem da tabela se necessário

interface DataTableHeaderProps {
  table: Table<any>; // Ajuste o tipo conforme o tipo da sua tabela
}

export function SearchHeader({ table }: DataTableHeaderProps) {
  const [openPop, setOpenPop] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  return (
    <div className="flex items-center space-x-2">
      <Popover open={openPop} onOpenChange={setOpenPop}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-52 justify-start text-left font-normal"
            onClick={() => setOpenPop(!openPop)}
          >
            {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: ptBR }) : 'Filtrar data...'}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(date: Date | undefined) => {
              setSelectedDate(date ?? null);
              setOpenPop(false);
              table.getColumn("dateMovement")?.setFilterValue(date ? format(date, 'yyyy-MM-dd') : "");
            }}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      {selectedDate && (
        <Button
          variant="outline"
          className="h-8 px-2"
          onClick={() => {
            setSelectedDate(null);
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

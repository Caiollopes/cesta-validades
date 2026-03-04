"use client";

import { ptBR } from "date-fns/locale";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface DateCalendarProps {
  onDateChange?: (date: Date | undefined) => void;
  value?: Date;
}

export function DateCalendar({ onDateChange, value }: DateCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? (
            format(date, "dd/MM/yyyy", { locale: ptBR })
          ) : (
            <span>Selecione a data</span>
          )}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          defaultMonth={date}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

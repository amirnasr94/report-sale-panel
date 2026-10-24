import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { faIR as faIRDayPicker } from "react-day-picker/locale";
import { dateFormatter } from "@/features/share/utils";

interface Props {
  placeholder: string;
  onChange: (date: Date | undefined) => void;
}

export default function DatePicker({ placeholder, onChange }: Props) {
  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant={"outline"}
            data-empty={!date}
            className="flex-1 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
            dir="rtl"
          >
            {date ? dateFormatter(date) : <span>{placeholder}</span>}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start" dir="rtl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          dir="rtl"
          locale={faIRDayPicker}
          timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
      </PopoverContent>
    </Popover>
  );
}

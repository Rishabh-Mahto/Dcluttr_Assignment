import { addDays, format } from "date-fns";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div
      className={cn("relative", className)}
      tabIndex={0}
      onBlur={(e) => {
        // When focus leaves the container entirely, close the calendar
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowCalendar(false);
        }
      }}
    >
      <Button
        id="date"
        variant={"outline"}
        onClick={() => setShowCalendar((prev) => !prev)}
        className={cn(
          "w-[270px] h-[40px] border border-[#D9D9D9] rounded-[10px] justify-between text-left font-normal flex items-center",
          !date && "text-muted-foreground"
        )}
      >
        <div className="flex items-center">
          <CalendarDays className="mx-2" />
          {date?.from ? (
            date.to ? (
              <div className="text-md leading-5 font-medium">
                {format(date.from, "LLL dd, yy")} -{" "}
                {format(date.to, "LLL dd, y")}
              </div>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </div>
        <ChevronDown className="w-8 h-8 mr-2" />
      </Button>

      {showCalendar && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "absolute left-[-200px] z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-md p-2"
          )}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              setDate(range);
              // Optionally hide calendar after selection:
              // setShowCalendar(false);
            }}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
}

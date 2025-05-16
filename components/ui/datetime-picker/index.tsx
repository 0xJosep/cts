"use client"

import * as React from "react"
import { useState } from "react"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimePickerProps = {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLButtonElement>(null)
  const hourRef = React.useRef<HTMLButtonElement>(null)
  const [selectedHour, setSelectedHour] = useState(date ? date.getHours().toString().padStart(2, "0") : "00")
  const [selectedMinute, setSelectedMinute] = useState(date ? date.getMinutes().toString().padStart(2, "0") : "00")

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour)
    if (date) {
      const newDate = new Date(date)
      newDate.setHours(parseInt(hour))
      setDate(newDate)
    } else {
      const newDate = new Date()
      newDate.setHours(parseInt(hour))
      newDate.setMinutes(parseInt(selectedMinute))
      setDate(newDate)
    }
  }

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute)
    if (date) {
      const newDate = new Date(date)
      newDate.setMinutes(parseInt(minute))
      setDate(newDate)
    } else {
      const newDate = new Date()
      newDate.setHours(parseInt(selectedHour))
      newDate.setMinutes(parseInt(minute))
      setDate(newDate)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-muted-foreground" />
      <div className="flex items-center gap-2">
        <Select
          value={selectedHour}
          onValueChange={handleHourChange}
        >
          <SelectTrigger
            ref={hourRef}
            className="w-[65px] focus:ring-primary"
          >
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent position="popper">
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-base">:</span>

        <Select
          value={selectedMinute}
          onValueChange={handleMinuteChange}
        >
          <SelectTrigger
            ref={minuteRef}
            className="w-[65px] focus:ring-primary"
          >
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent position="popper">
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

interface DateTimePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Preserve time when selecting a new date
      if (selectedDate) {
        date.setHours(selectedDate.getHours(), selectedDate.getMinutes())
      }
      setSelectedDate(date)
      setDate(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal px-4 py-3 h-auto rounded-md border-border bg-background shadow-sm focus:border-primary focus:ring-primary",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
          {date ? format(date, "PPP HH:mm") : <span>Select date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
          className="rounded-t-md border-b border-border"
        />
        <div className="p-4 flex justify-center">
          <TimePicker 
            date={selectedDate} 
            setDate={(newDate) => {
              setSelectedDate(newDate)
              setDate(newDate)
            }} 
          />
        </div>
      </PopoverContent>
    </Popover>
  )
} 
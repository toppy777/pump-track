'use client'

import { Calendar as CalendarFromLibrary } from '@/components/ui/calendar'
import { ja } from 'date-fns/locale'

export default function Calendar({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}) {
  return (
    <div className="flex items-center justify-center">
      <CalendarFromLibrary
        showOutsideDays
        locale={ja}
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date === undefined) {
            setSelectedDate(selectedDate)
          } else {
            setSelectedDate(date as Date)
          }
        }}
      ></CalendarFromLibrary>
    </div>
  )
}

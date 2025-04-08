'use client'

import { Calendar as CalendarFromLibrary } from '@/components/ui/calendar'
import { ja } from 'date-fns/locale'

export default function Calendar({
  selectedDate,
  setSelectedDate,
  className,
}: {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  className?: string
}) {
  return (
    <div className={`${className || ''}`}>
      <div className="flex items-center justify-center">
        <CalendarFromLibrary
          showOutsideDays
          locale={ja}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date !== undefined) {
              setSelectedDate(date as Date)
            }
          }}
        ></CalendarFromLibrary>
      </div>
    </div>
  )
}

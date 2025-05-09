import { Calendar as CalendarFromLibrary } from '@/components/ui/calendar'
import { getWeek } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Row, RowProps } from 'react-day-picker'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

type CustomRowProps = RowProps & {
  selectedWeekNumber: number
}

function CustomRow(props: CustomRowProps) {
  if (props.selectedWeekNumber === props.weekNumber) return <Row {...props} />
  else return <></>
}

type WeekButtonProps = {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date) => void
}

type ControlWeekProps = WeekButtonProps & {
  direction: 'prev' | 'next'
  e: React.MouseEvent
}

function controlWeek({
  direction,
  selectedDate,
  setSelectedDate,
  e,
}: ControlWeekProps) {
  e.stopPropagation()
  const nextWeekDate = new Date(selectedDate || new Date())
  if (direction === 'prev') {
    nextWeekDate.setDate(nextWeekDate.getDate() - 7)
  } else if (direction === 'next') {
    nextWeekDate.setDate(nextWeekDate.getDate() + 7)
  } else {
    console.error('Invalid direction')
    return
  }
  setSelectedDate(nextWeekDate)
}

function PreviousWeekButton({
  selectedDate,
  setSelectedDate,
}: WeekButtonProps) {
  return (
    <button
      onClick={(e) => {
        controlWeek({
          direction: 'prev',
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
          e,
        })
      }}
      className="w-full h-full block"
    >
      <SlArrowLeft />
    </button>
  )
}

function NextWeekButton({ selectedDate, setSelectedDate }: WeekButtonProps) {
  return (
    <button
      onClick={(e) => {
        controlWeek({
          direction: 'next',
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
          e,
        })
      }}
      className="w-full h-full block"
    >
      <SlArrowRight />
    </button>
  )
}

export default function WeekCalendar({
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
      <CalendarFromLibrary
        components={{
          Row: (props) => (
            <CustomRow
              {...props}
              selectedWeekNumber={getWeek(selectedDate as Date)}
            />
          ),
          IconLeft: () => (
            <PreviousWeekButton
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ),

          IconRight: () => (
            <NextWeekButton
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ),
        }}
        locale={ja}
        showOutsideDays
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date !== undefined) {
            setSelectedDate(date as Date)
          }
        }}
        month={selectedDate}
      ></CalendarFromLibrary>
    </div>
  )
}

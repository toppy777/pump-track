'use client'

import { Calendar as CalendarFromLibrary } from '@/components/ui/calendar'
import { getWeek } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useState } from 'react'
import { Row, RowProps } from 'react-day-picker'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

type customRowProps = RowProps & {
  selectedWeekNumber: number
}

function CustomRow(props: customRowProps) {
  if (props.selectedWeekNumber === props.weekNumber) return <Row {...props} />
  else return <></>
}

type weekButtonProps = {
  selected: Date | undefined
  setSelected: (date: Date) => void
  setSelectedWeekNumber: (weekNumber: number) => void
}

type controlWeekProps = weekButtonProps & {
  direction: 'prev' | 'next'
  e: React.MouseEvent
}

function controlWeek({
  direction,
  selected,
  setSelected,
  setSelectedWeekNumber,
  e,
}: controlWeekProps) {
  e.stopPropagation()
  const nextWeek = new Date(selected || new Date())
  if (direction === 'prev') {
    nextWeek.setDate(nextWeek.getDate() - 7)
  } else if (direction === 'next') {
    nextWeek.setDate(nextWeek.getDate() + 7)
  } else {
    console.error('Invalid direction')
    return
  }
  setSelected(nextWeek)
  setSelectedWeekNumber(getWeek(nextWeek))
}

function PreviousWeekButton({
  selected,
  setSelected,
  setSelectedWeekNumber,
}: weekButtonProps) {
  return (
    <button
      onClick={(e) => {
        controlWeek({
          direction: 'prev',
          selected,
          setSelected,
          setSelectedWeekNumber,
          e,
        })
      }}
      className="w-full h-full block"
    >
      <SlArrowLeft />
    </button>
  )
}

function NextWeekButton({
  selected,
  setSelected,
  setSelectedWeekNumber,
}: weekButtonProps) {
  return (
    <button
      onClick={(e) => {
        controlWeek({
          direction: 'next',
          selected,
          setSelected,
          setSelectedWeekNumber,
          e,
        })
      }}
      className="w-full h-full block"
    >
      <SlArrowRight />
    </button>
  )
}

export default function Calendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(
    getWeek(new Date()),
  )

  return (
    <div>
      <CalendarFromLibrary
        components={{
          Row: (props) => (
            <CustomRow {...props} selectedWeekNumber={selectedWeekNumber} />
          ),
          IconLeft: () => (
            <PreviousWeekButton
              selected={selected}
              setSelected={setSelected}
              setSelectedWeekNumber={setSelectedWeekNumber}
            />
          ),

          IconRight: () => (
            <NextWeekButton
              selected={selected}
              setSelected={setSelected}
              setSelectedWeekNumber={setSelectedWeekNumber}
            />
          ),
        }}
        locale={ja}
        showOutsideDays
        mode="single"
        selected={selected}
        onSelect={setSelected}
        month={selected}
      ></CalendarFromLibrary>
      {selected && (
        <div>
          <h2>選択された日付: {selected.toLocaleDateString()}</h2>
          <h2>選択された週番号: {getWeek(selected)}</h2>
        </div>
      )}
    </div>
  )
}

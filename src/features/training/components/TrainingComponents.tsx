'use client'

import Calendar from '@/features/training/components/Calendar'
import CreateTraining from '@/features/training/components/CreateTraining'
import TrainingList from '@/features/training/components/TrainingList'
import { Exercise } from '@prisma/client'
import { useState } from 'react'

export default function TrainingComponents({
  userId,
  initialExercises,
}: {
  userId: string
  initialExercises: Exercise[]
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [shouldRefresh, setShouldRefresh] = useState(false)
  return (
    <div>
      <Calendar
        selectedDate={selectedDate as Date}
        setSelectedDate={setSelectedDate}
      />
      <TrainingList
        userId={userId as string}
        selectedDate={selectedDate as Date}
        shouldReflesh={shouldReflesh}
      />
      <CreateTraining
        initialExercises={initialExercises}
        shouldReflesh={shouldReflesh}
        setShouldReflesh={setShoudRefresh}
      />
    </div>
  )
}

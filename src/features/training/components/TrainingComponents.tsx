'use client'

import Calendar from '@/features/training/components/Calendar'
import CreateTraining from '@/features/training/components/CreateTraining'
import TrainingList from '@/features/training/components/TrainingList'
import { Training } from '@/features/training/get-trainings'
import { Exercise } from '@prisma/client'
import { useState } from 'react'

export default function TrainingComponents({
  userId,
  initialExercises,
  initialTrainings,
}: {
  userId: string
  initialExercises: Exercise[]
  initialTrainings: Training[]
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar
        selectedDate={selectedDate as Date}
        setSelectedDate={setSelectedDate}
      />
      <TrainingList
        userId={userId as string}
        selectedDate={selectedDate as Date}
        initialTrainings={initialTrainings}
      />
      <CreateTraining initialExercises={initialExercises} />
    </div>
  )
}

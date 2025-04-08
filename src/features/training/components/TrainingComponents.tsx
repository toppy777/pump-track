'use client'

import Calendar from '@/features/training/components/Calendar'
import CreateTraining from '@/features/training/components/CreateTraining'
import TrainingList from '@/features/training/components/TrainingList'
import TrainingReport, {
  TrainingReportProps,
} from '@/features/training/components/TrainingReport'
import { Training } from '@/features/training/get-trainings'
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
  const [trainigs, setTrainings] = useState<Training[]>([])
  const [trainingReportProps, setTrainingReportProps] =
    useState<TrainingReportProps>({
      totalVolume: 0,
      trainingCount: 0,
      totalSets: 0,
      totalReps: 0,
    })

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-4">
        <Calendar
          selectedDate={selectedDate as Date}
          setSelectedDate={setSelectedDate}
        />
        <TrainingReport
          trainingReportProps={trainingReportProps}
        ></TrainingReport>
      </div>
      <div className="flex flex-col justify-center items-center">
        <CreateTraining
          initialExercises={initialExercises}
          shouldRefresh={shouldRefresh}
          setShouldRefresh={setShouldRefresh}
        />
        <TrainingList
          userId={userId as string}
          selectedDate={selectedDate as Date}
          shouldRefresh={shouldRefresh}
          trainings={trainigs}
          setTrainings={setTrainings}
          setTrainingReportProps={setTrainingReportProps}
        />
      </div>
    </div>
  )
}

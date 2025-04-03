import { Card, CardContent, CardTitle } from '@/components/ui/card'
import TrainingReport from '@/features/training/components/TrainingReport'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { JSX } from 'react'

export default async function TrainingList({ userId }: { userId: string }) {
  const trainings = await prisma.training.findMany({
    where: { user: { id: userId } },
    include: {
      exercise: {
        include: { muscles: { include: { bodyArea: true } } },
      },
      sets: true,
    },
  })

  const trainingElements: JSX.Element[] = []
  let totalVolume: number = 0
  let totalSets: number = 0
  let totalReps: number = 0
  trainings.forEach((training) => {
    const muscleNames: string[] = []
    let setCount: number = 0
    let trainingVolume: number = 0
    training.exercise?.muscles.forEach((muscle) => {
      muscleNames.push(muscle.name)
    })
    training.sets.forEach((set) => {
      const weight = set.weight
      const reps = set.reps
      if (reps !== null) {
        totalReps += reps
      }
      const volume = weight !== null && reps !== null ? weight * reps : 0
      trainingVolume += volume
      setCount += 1
    })
    trainingElements.push(
      <Training
        key={training.id}
        trainingId={training.id}
        trainingName={training.exercise?.name || ''}
        bodyAreas={muscleNames}
        volume={trainingVolume}
        sets={setCount}
      ></Training>,
    )
    totalVolume += trainingVolume
    totalSets += setCount
  })

  return (
    <div>
      <TrainingReport
        totalVolume={totalVolume}
        trainingCount={trainings.length}
        totalSets={totalSets}
        totalReps={totalReps}
      ></TrainingReport>
      <h1>Training List</h1>
      {trainingElements}
    </div>
  )
}

function Training({
  trainingId,
  trainingName,
  bodyAreas,
  volume,
  sets,
}: {
  trainingId: number
  trainingName: string
  bodyAreas: string[]
  volume: number
  sets: number
}) {
  return (
    <Card className="w-[30svw] h-full">
      <Link href={`/trainings/${trainingId}`}>
        <div className="px-[1svw] py-[1svh]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle className="pr-[3svw]">{trainingName}</CardTitle>
              <div>
                {bodyAreas?.map((bodyArea) => (
                  <span className="text-xs mr-[1svw]" key={bodyArea}>
                    {bodyArea}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <CardContent>{volume}kg</CardContent>
              <span className="text-sm">{sets}セット</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

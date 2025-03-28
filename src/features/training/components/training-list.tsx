import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { JSX } from 'react'

export default async function TrainingList() {
  const trainings = await prisma.training.findMany({
    where: { user: { email: 'alice@prisma.io' } },
    include: {
      exercise: {
        include: { muscles: { include: { bodyArea: true } } },
      },
      sets: true,
    },
  })

  const trainingElements: JSX.Element[] = []
  let totalVolume = 0
  trainings.forEach((training) => {
    const muscleNames: string[] = []
    let setCount: number = 0
    training.exercise?.muscles.forEach((muscle) => {
      muscleNames.push(muscle.name)
    })
    training.sets.forEach((set) => {
      const weight = set.weight
      const reps = set.reps
      const volume = weight !== null && reps !== null ? weight * reps : 0
      totalVolume += volume
      setCount += 1
    })
    trainingElements.push(
      <Training
        key={training.id}
        trainingName={training.exercise?.name || ''}
        bodyAreas={muscleNames}
        volume={totalVolume}
        sets={setCount}
      ></Training>,
    )
  })

  return (
    <div>
      <h1>Training List</h1>
      {trainingElements}
    </div>
  )
}

function Training({
  trainingName,
  bodyAreas,
  volume,
  sets,
}: {
  trainingName: string
  bodyAreas: string[]
  volume: number
  sets: number
}) {
  return (
    <Card className="w-[30svw] h-full">
      <Link href="/trainings/1">
        <div className="px-[1svw] py-[1svh]">
          <div className="flex flex-row">
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

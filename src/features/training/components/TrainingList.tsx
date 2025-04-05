'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import TrainingReport from '@/features/training/components/TrainingReport'
import getTrainings, { Training } from '@/features/training/get-trainings'
import Link from 'next/link'
import { JSX, useEffect, useState } from 'react'

export default function TrainingList({
  userId,
  selectedDate,
  shouldRefresh,
}: {
  userId: string
  selectedDate: Date
  shouldReflesh: boolean
}) {
  const [trainings, setTrainings] = useState<Training[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTrainings = await getTrainings({
        userId,
        selectedDate,
      })
      setTrainings(fetchedTrainings)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTrainings = await getTrainings({
          userId,
          selectedDate,
        })
        setTrainings(fetchedTrainings)
      } catch (error) {
        console.error('Error fetching trainings:', error)
      }
    }
    fetchData()
  }, [userId, selectedDate, shouldReflesh])

  return <TrainingCardsAndReport trainings={trainings}></TrainingCardsAndReport>
}

function TrainingCardsAndReport({ trainings }: { trainings: Training[] }) {
  const trainingElements: JSX.Element[] = []
  let totalVolume: number = 0
  let totalSets: number = 0
  let totalReps: number = 0
  trainings?.forEach((training) => {
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
      <TrainingCard
        key={training.id}
        trainingId={training.id}
        trainingName={training.exercise?.name || ''}
        bodyAreas={muscleNames}
        volume={trainingVolume}
        sets={setCount}
      ></TrainingCard>,
    )
    totalVolume += trainingVolume
    totalSets += setCount
  })
  return (
    <div>
      <TrainingReport
        totalVolume={totalVolume}
        trainingCount={trainings?.length || 0}
        totalSets={totalSets}
        totalReps={totalReps}
      ></TrainingReport>
      <h1>Training List</h1>
      {trainingElements}
    </div>
  )
}

function TrainingCard({
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

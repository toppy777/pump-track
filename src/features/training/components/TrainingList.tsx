'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { TrainingReportProps } from '@/features/training/components/TrainingReport'
import getTrainings, { Training } from '@/features/training/get-trainings'
import Link from 'next/link'
import { JSX, useEffect } from 'react'

type TrainingListProps = {
  userId: string
  selectedDate: Date
  shouldRefresh: boolean
  trainings: Training[]
  setTrainings: (trainings: Training[]) => void
  setTrainingReportProps: (trainingReport: TrainingReportProps) => void
}

type TrainingCardProps = {
  trainingId: number
  trainingName: string
  bodyAreas: string[]
  volume: number
  sets: number
}

export default function TrainingList({
  userId,
  selectedDate,
  shouldRefresh,
  trainings,
  setTrainings,
  setTrainingReportProps,
}: TrainingListProps) {
  // トレーニングデータを取得して更新する
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
  }, [userId, selectedDate, shouldRefresh, setTrainings])

  // トレーニングレポートを更新する
  useEffect(() => {
    const { totalVolume, totalSets, totalReps } =
      calculateTrainingStats(trainings)
    setTrainingReportProps({
      totalVolume,
      trainingCount: trainings.length,
      totalSets,
      totalReps,
    })
  }, [trainings, setTrainingReportProps])

  // トレーニングカード要素を生成する
  const trainingElements: JSX.Element[] = generateTrainingElements(trainings)

  return trainingElements
}

// 複数のトレーニングのボリューム、セット数、レップ数をそれぞれ合計する
function calculateTrainingStats(trainings: Training[]) {
  let totalVolume = 0
  let totalSets = 0
  let totalReps = 0

  trainings.forEach((training) => {
    training.sets.forEach((set) => {
      const weight = set.weight || 0
      const reps = set.reps || 0
      totalReps += reps
      totalSets += 1
      totalVolume += weight * reps
    })
  })

  return { totalVolume, totalSets, totalReps }
}

// トレーニングの情報を元にトレーニングカード要素を生成する
function generateTrainingElements(trainings: Training[]) {
  return trainings.map((training) => {
    const muscleNames =
      training.exercise?.muscles.map((muscle) => muscle.name) || []
    const trainingVolume = training.sets.reduce((volume, set) => {
      const weight = set.weight || 0
      const reps = set.reps || 0
      return volume + weight * reps
    }, 0)

    return (
      <TrainingCard
        key={training.id}
        trainingId={training.id}
        trainingName={training.exercise?.name || ''}
        bodyAreas={muscleNames}
        volume={trainingVolume}
        sets={training.sets.length}
      />
    )
  })
}

function TrainingCard({
  trainingId,
  trainingName,
  bodyAreas,
  volume,
  sets,
}: TrainingCardProps) {
  return (
    <Card className="w-[30svw] h-full">
      <Link href={`/trainings/${trainingId}`}>
        <div className="px-[1svw] py-[1svh]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle className="pr-[3svw]">{trainingName}</CardTitle>
              <BodyAreaTags bodyAreas={bodyAreas} />
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

function BodyAreaTags({ bodyAreas }: { bodyAreas: string[] }) {
  return (
    <div>
      {bodyAreas.map((bodyArea) => (
        <span className="text-xs mr-[1svw]" key={bodyArea}>
          {bodyArea}
        </span>
      ))}
    </div>
  )
}

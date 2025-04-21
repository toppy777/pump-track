import { TrainingWithExerciseWithSet } from '@/features/training/get-trainings'

// トレーニングの対象部位を返す(重複なし)
export function getBodyAreas(training: TrainingWithExerciseWithSet): string[] {
  const bodyAreaList = training.exercise?.muscles
    .filter((muscle) => muscle.bodyArea?.name != null)
    .map(({ bodyArea }) => bodyArea?.name || '')
  const bodyAreaSet = new Set(bodyAreaList)

  return [...bodyAreaSet]
}

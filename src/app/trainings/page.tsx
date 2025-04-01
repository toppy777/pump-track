import Header from '@/components/header'
import getExercises from '@/features/exercise/get-exercises'
import CreateTraining from '@/features/training/components/CreateTraining'
import TrainingList from '@/features/training/components/TrainingList'

export default async function Trainings() {
  const exercises = await getExercises()

  return (
    <div>
      <Header />
      <TrainingList />
      <CreateTraining initialExercises={exercises} />
    </div>
  )
}

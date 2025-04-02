import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import getExercises from '@/features/exercise/get-exercises'
import CreateTraining from '@/features/training/components/CreateTraining'
import TrainingList from '@/features/training/components/TrainingList'
import { Session } from 'next-auth'

export default async function Trainings() {
  const exercises = await getExercises()
  const session = await auth()

  return (
    <div>
      <Header session={session as Session} />
      <TrainingList />
      <CreateTraining initialExercises={exercises} />
    </div>
  )
}

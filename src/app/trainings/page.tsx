import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import getExercises from '@/features/exercise/get-exercises'
import TrainingComponents from '@/features/training/components/TrainingComponents'
import { Session } from 'next-auth'

export default async function Trainings() {
  const exercises = await getExercises()
  const session = await auth()
  const userId = session?.user?.id

  return (
    <div>
      <Header session={session as Session} />
      <TrainingComponents
        userId={userId as string}
        initialExercises={exercises}
      />
    </div>
  )
}

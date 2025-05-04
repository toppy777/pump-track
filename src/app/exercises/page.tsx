import Content from '@/components/content'
import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import CreateExercise from '@/features/exercise/components/CreateExercise'
import { getBodyAreasWithMuslces } from '@/features/muscle/get-muscles'
import { Session } from 'next-auth'

export default async function Exercises() {
  const bodyAreasWithMuscles = await getBodyAreasWithMuslces()
  const session = await auth()

  return (
    <div>
      <Header session={session as Session} />
      <Content>
        <CreateExercise
          initialBodyAreasWithMuscles={bodyAreasWithMuscles}
        ></CreateExercise>
      </Content>
    </div>
  )
}

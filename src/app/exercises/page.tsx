import Content from '@/components/content'
import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import CreateExercise from '@/features/exercise/components/CreateExercise'
import getMuscles from '@/features/muscle/get-muscles'
import { Session } from 'next-auth'

export default async function Exercises() {
  const muscles = await getMuscles()
  const session = await auth()

  return (
    <div>
      <Header session={session as Session} />
      <Content>
        <CreateExercise initialMuscles={muscles}></CreateExercise>
      </Content>
    </div>
  )
}

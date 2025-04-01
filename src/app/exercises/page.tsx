import Header from '@/components/header'
import CreateExercise from '@/features/exercise/components/CreateExercise'
import getMuscles from '@/features/muscle/get-muscles'

export default async function Exercises() {
  const muscles = await getMuscles()

  return (
    <div>
      <Header />
      <CreateExercise initialMuscles={muscles}></CreateExercise>
    </div>
  )
}

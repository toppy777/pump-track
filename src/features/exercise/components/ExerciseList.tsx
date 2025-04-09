import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { ExerciseWithMuscles } from '@/features/exercise/get-exercises'

type ExerciseListProps = {
  exercises: ExerciseWithMuscles[]
}

export default function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div className="mt-3 w-[90svw] md:w-100">
      {exercises.map((exercise) => (
        <Card key={exercise.id} className="mb-2 w-full">
          <CardContent className="mx-4 my-3">
            <CardTitle className="text-[1.2rem] mb-2">
              <p>{exercise.name}</p>
            </CardTitle>
            <CardDescription className="mb-2">
              <p>{exercise.description}</p>
            </CardDescription>
            <div className="flex flex-row justify-start items-start gap-4">
              {exercise.muscles.map((muscle) => (
                <CardFooter key={muscle.id}>
                  <p className="text-sm">{muscle.name}</p>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

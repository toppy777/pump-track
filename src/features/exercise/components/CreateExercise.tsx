'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ExerciseList from '@/features/exercise/components/ExerciseList'
import { createExercise } from '@/features/exercise/create-exercise-action'
import getExercises, {
  ExerciseWithMuscles,
} from '@/features/exercise/get-exercises'
import { zodResolver } from '@hookform/resolvers/zod'
import { Muscle } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(50),
  muscles: z.array(z.number()),
})

export default function CreateExercise({
  initialMuscles,
}: {
  initialMuscles: Muscle[]
}) {
  const [muscles, setMuscles] = useState<Muscle[]>([])
  const [exercises, setExercises] = useState<ExerciseWithMuscles[]>([])
  const [createdExerciseId, setCreatedExerciseId] = useState<number | null>(
    null,
  )

  useEffect(() => {
    setMuscles(initialMuscles)
  }, [initialMuscles])

  useEffect(() => {
    async function fetchExercises() {
      const data = await getExercises()
      setExercises(data)
    }

    fetchExercises()
  }, [createdExerciseId])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      muscles: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createExercise(values)
    setCreatedExerciseId(result.data?.id || null)
    form.reset()
  }

  return (
    <div className="flex ">
      <ExerciseList exercises={exercises} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>種目名</FormLabel>
                <FormControl>
                  <input type="text" placeholder="ベンチプレス" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>種目説明</FormLabel>
                <FormControl>
                  <input type="text" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="flex flex-row gap-4">
            {muscles?.map((muscle) => (
              <FormField
                key={muscle.id}
                control={form.control}
                name="muscles"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(muscle.id)}
                          onCheckedChange={(checked) => {
                            console.log(field.value)
                            return checked
                              ? field.onChange([
                                  ...(field.value as number[]),
                                  muscle.id,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== muscle.id,
                                  ),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel>{muscle.name}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              ></FormField>
            ))}
          </div>
          <Button type="submit">追加</Button>
        </form>
      </Form>
    </div>
  )
}

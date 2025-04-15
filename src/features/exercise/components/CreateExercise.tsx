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
import { IoAddCircleOutline } from 'react-icons/io5'
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

  const inputStyles =
    'border-1 rounded-lg w-full md:w-70 h-10 px-5 py-3 text-[1.1rem] mb-3'

  return (
    <div className="flex justify-center">
      <div className="md:flex flex-row w-[90svw] md:w-200 justify-around">
        <div className="flex flex-col">
          <div className="border-1 rounded-lg px-6 py-5">
            <h2 className="font-bold text-[1.2rem] text-center mb-3">
              種目追加
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className={inputStyles}
                          type="text"
                          placeholder="種目名*"
                          {...field}
                        />
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
                      <FormControl>
                        <input
                          className={inputStyles}
                          type="text"
                          placeholder="種目説明"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <div className="flex flex-row md:flex-col flex-wrap">
                  <FormLabel>
                    <h2 className="text-[1.05rem] mt-3 mb-2">対象筋肉</h2>
                  </FormLabel>
                  {muscles?.map((muscle) => (
                    <FormField
                      key={muscle.id}
                      control={form.control}
                      name="muscles"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex">
                            <FormControl>
                              <Checkbox
                                className="cursor-pointer ml-3 md:ml-0 mt-2.5 md:mt-1 align-bottom"
                                checked={field.value?.includes(muscle.id)}
                                onCheckedChange={(checked) => {
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
                            <FormLabel className="cursor-pointer text-[1.2rem]">
                              {muscle.name}
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    ></FormField>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="[&_svg]:size-5 cursor-pointer mt-5 w-full h-15 text-[1.1rem]"
                  >
                    <IoAddCircleOutline className="size-1" />
                    追加
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <ExerciseList exercises={exercises} />
      </div>
    </div>
  )
}

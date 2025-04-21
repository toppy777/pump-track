'use client'

import { buttonStyles } from '@/components/styles'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createTraining } from '@/features/training/create-training-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Exercise } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from 'react-icons/io5'
import { z } from 'zod'

const formSchema = z.object({
  exercises: z.array(z.number()),
})

export default function CreateTraining({
  initialExercises,
  shouldRefresh,
  setShouldRefresh,
  selectedDate,
  className,
}: {
  initialExercises: Exercise[]
  shouldRefresh: boolean
  setShouldRefresh: (isOpen: boolean) => void
  selectedDate: Date
  className?: string
}) {
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    setExercises(initialExercises)
  }, [initialExercises])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercises: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await Promise.all(
        values.exercises.map((exercise) =>
          createTraining({ exerciseId: exercise, date: selectedDate }),
        ),
      )
    } catch (error) {
      console.error('Failed to create trainings:', error)
    }
    setShouldRefresh(!shouldRefresh)
    form.reset()
  }

  return (
    <div className={`${className || ''}`}>
      <Drawer
        onOpenChange={(open) => {
          if (open === true) {
            setShouldRefresh(false)
          }
        }}
      >
        <DrawerTrigger asChild>
          <Button className={`${buttonStyles}`}>
            <IoAddCircleOutline className="size-1" />
            <span>追加</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-auto px-2 md:px-20">
          <DrawerHeader>
            <DrawerTitle>トレーニング追加</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              id="createTrainingForm"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-row gap-4 flex-wrap">
                {exercises?.map((exercise) => (
                  <FormField
                    key={exercise.id}
                    control={form.control}
                    name="exercises"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row gap-2">
                          <FormControl>
                            <Checkbox
                              className="cursor-pointer"
                              checked={field.value?.includes(exercise.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value as number[]),
                                      exercise.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== exercise.id,
                                      ),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-[1.1rem]">
                            {exercise.name}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  ></FormField>
                ))}
              </div>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                form="createTrainingForm"
                type="submit"
                className={`${buttonStyles}`}
              >
                <IoAddCircleOutline className="size-1" />
                <span>追加</span>
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" className={`${buttonStyles}`}>
                キャンセル
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

'use client'

import { buttonStyles } from '@/components/styles'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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
  className,
}: {
  initialExercises: Exercise[]
  shouldRefresh: boolean
  setShouldRefresh: (isOpen: boolean) => void
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
          createTraining({ exerciseId: exercise }),
        ),
      )
    } catch (error) {
      console.error('Failed to create trainings:', error)
    }
    setShouldRefresh(!shouldRefresh)
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
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>トレーニング追加</DrawerTitle>
            <DrawerDescription>
              新たなトレーニング記録を追加します
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-4">
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
                          <FormLabel>{exercise.name}</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  ></FormField>
                ))}
              </div>
              <DrawerClose asChild>
                <Button type="submit">追加</Button>
              </DrawerClose>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

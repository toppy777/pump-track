'use client'

import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import updateTrainingSet from '@/features/training/update-training-set'
import { zodResolver } from '@hookform/resolvers/zod'
import { Set } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  weight: z.number().min(0).max(1000),
  reps: z.number().min(0).max(1000),
})

export default function EditTraining({ sets: initialSets }: { sets: Set[] }) {
  const [sets, setSets] = useState(initialSets)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      reps: 0,
    },
  })

  // 入力が変更されたときに特定のセットを更新
  function handleInputChange(index: number, field: string, value: string) {
    const updatedSets = [...sets]
    updatedSets[index] = { ...updatedSets[index], [field]: value }
    setSets(updatedSets)
  }

  // 変更があったセットだけを抽出
  function getUpdatedSets() {
    return sets.filter(
      (set, index) =>
        set.weight !== initialSets[index].weight ||
        set.reps !== initialSets[index].reps,
    )
  }

  async function onSubmit() {
    const updatedSets = getUpdatedSets()
    if (updatedSets.length > 0) {
      updatedSets.forEach(async (updatedSet) => {
        await updateTrainingSet({
          id: Number(updatedSet.id),
          weight: Number(updatedSet.weight),
          reps: Number(updatedSet.reps),
        })
      })
      console.log('Updated sets:', updatedSets)
    } else {
      console.log('No changes detected.')
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            {sets.map((set, index) => (
              <div key={set.id}>
                <Input
                  type="number"
                  placeholder="weight"
                  defaultValue={set?.weight || 0}
                  name="weight"
                  onChange={(e) =>
                    handleInputChange(index, 'weight', e.target.value)
                  }
                ></Input>
                kg
                <Input
                  type="number"
                  placeholder="reps"
                  defaultValue={set?.reps || 0}
                  name="reps"
                  onChange={(e) =>
                    handleInputChange(index, 'reps', e.target.value)
                  }
                ></Input>
                reps
              </div>
            ))}
          </div>
          <button type="submit">保存</button>
        </form>
      </Form>
    </div>
  )
}

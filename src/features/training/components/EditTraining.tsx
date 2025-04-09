'use client'

import { buttonStyles } from '@/components/styles'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import createTrainingSet from '@/features/training/create-training-set'
import deleteTrainingSet from '@/features/training/delete-training-set'
import updateTrainingSet from '@/features/training/update-training-set'
import { zodResolver } from '@hookform/resolvers/zod'
import { Set } from '@prisma/client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoKebabHorizontal } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { MdOutlineSaveAlt } from 'react-icons/md'
import { z } from 'zod'

const formSchema = z.object({
  weight: z.number().min(0).max(1000),
  reps: z.number().min(0).max(1000),
})

export default function EditTraining({ sets: initialSets }: { sets: Set[] }) {
  const params = useParams()
  const [sets, setSets] = useState(initialSets)
  const [pendingSet, setPendingSet] = useState<{
    weight?: number
    reps?: number
  }>({
    weight: undefined,
    reps: undefined,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      reps: 0,
    },
  })

  // 入力が変更されたときに特定のセットを更新
  function handleInputChange(
    index: number,
    field: 'weight' | 'reps',
    value: string,
  ) {
    const updatedSets = [...sets]
    updatedSets[index] = { ...updatedSets[index], [field]: Number(value) }
    setSets(updatedSets)
  }

  // 変更があったセットだけを抽出
  function getUpdatedSets() {
    return sets.filter(
      (set, index) =>
        (set.weight ?? null) !== (initialSets[index].weight ?? null) ||
        (set.reps ?? null) !== (initialSets[index].reps ?? null),
    )
  }

  // セットを削除する処理
  async function handleDeleteSet(index: number) {
    const setId = sets[index].id
    const updatedSets = sets.filter((_, i) => i !== index)
    setSets(updatedSets)
    await deleteTrainingSet({ setId })
  }

  // 新しいセットを追加する処理
  function handleNewSetChange(field: 'weight' | 'reps', value: string) {
    setPendingSet({
      ...pendingSet,
      [field]: value === '' ? undefined : Number(value),
    })
  }

  async function onSubmit() {
    // 新規セット追加
    if (pendingSet.weight !== undefined || pendingSet.reps !== undefined) {
      if (Number.isNaN(Number(params.id))) {
        return
      }
      const trainingId = Number(params.id)
      const createdNewSet = await createTrainingSet({
        trainingId,
        ...pendingSet,
      })
      setSets((prevSets) => [...prevSets, createdNewSet])
      setPendingSet({ weight: undefined, reps: undefined })
    }

    const updatedSets = getUpdatedSets()
    if (updatedSets.length > 0) {
      await Promise.all(
        updatedSets.map((updatedSet) =>
          updateTrainingSet({
            id: updatedSet.id,
            weight: updatedSet.weight ?? 0,
            reps: updatedSet.reps ?? 0,
          }),
        ),
      )
    }
  }

  const inputStyle = 'w-[30svw] md:w-50 text-center'

  return (
    <div className="flex flex-col items-center">
      <div className="w-[95svw] md:w-180 mt-1 flex items-start">
        <Link href={`/trainings`} className="w-12 h-full">
          <Button
            variant="ghost"
            className="[&_svg]:size-7 w-full h-full cursor-pointer"
          >
            <IoIosArrowBack className="size-1 hover: opacity-80" />
          </Button>
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-[95svw] md:w-180 leading-15"
        >
          <div>
            {sets.map((set, index) => (
              <div key={set.id} className="flex flex-row">
                <Input
                  type="number"
                  placeholder="重量"
                  value={set?.weight ?? ''}
                  name="weight"
                  className={inputStyle}
                  onChange={(e) =>
                    handleInputChange(index, 'weight', e.target.value)
                  }
                ></Input>
                <span className="ml-2 mr-2 md:mr-8">kg</span>
                <Input
                  type="number"
                  placeholder="レップ"
                  value={set?.reps ?? ''}
                  name="reps"
                  className={inputStyle}
                  onChange={(e) =>
                    handleInputChange(index, 'reps', e.target.value)
                  }
                ></Input>
                <span className="mx-2">reps</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-8">
                    <GoKebabHorizontal size="22" className="ml-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDeleteSet(index)}>
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
            <div className="flex justify-center">
              <Input
                type="number"
                placeholder="重量"
                value={pendingSet.weight ?? ''}
                name="weight"
                className={inputStyle}
                onChange={(e) => handleNewSetChange('weight', e.target.value)}
              ></Input>
              <span className="ml-2 mr-2 md:mr-8">kg</span>
              <Input
                type="number"
                placeholder="レップ"
                value={pendingSet.reps ?? ''}
                name="reps"
                className={inputStyle}
                onChange={(e) => handleNewSetChange('reps', e.target.value)}
              ></Input>
              <span className="mx-2">reps</span>
              <div className="w-8"></div>
            </div>
          </div>
          <Button type="submit" className={`my-3 ${buttonStyles}`}>
            <MdOutlineSaveAlt color="white" className="size-1" />
            保存
          </Button>
        </form>
      </Form>
    </div>
  )
}

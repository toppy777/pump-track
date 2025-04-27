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
import {
  TrainingRep,
  TrainingSet,
  TrainingStats,
  TrainingVolume,
} from '@/features/training/components/TrainingStats'
import createTrainingSet, {
  updateTrainingSet,
} from '@/features/training/create-training-set'
import deleteTrainingSet from '@/features/training/delete-training-set'
import { TrainingWithExerciseWithSet } from '@/features/training/get-trainings'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoKebabHorizontal } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { IoAddCircleOutline } from 'react-icons/io5'
import { MdOutlineSaveAlt } from 'react-icons/md'
import { z } from 'zod'

const formSchema = z.object({
  weight: z.number().min(0).max(1000),
  reps: z.number().min(0).max(1000),
})

type TrainingSet = {
  id: number | undefined
  weight: number
  reps: number
}

type OriginalTrainingSet = {
  id: number
  weight: number
  reps: number
}

type TrainingStats = {
  volume: number
  sets: number
  reps: number
}

type MuscleGroup = {
  bodyArea: string
  muscles: string[]
}

function getTrainingVolume({ sets }: { sets: TrainingSet[] }): number {
  return sets.reduce((acc, set) => acc + (set.weight ?? 0) * (set.reps ?? 0), 0)
}

function getTrainingSets({ sets }: { sets: TrainingSet[] }): number {
  return sets.length
}

function getTrainingReps({ sets }: { sets: TrainingSet[] }): number {
  return sets.reduce((acc, set) => acc + (set.reps ?? 0), 0)
}

function getTrainingStats({ sets }: { sets: TrainingSet[] }): TrainingStats {
  return {
    volume: getTrainingVolume({ sets }),
    sets: getTrainingSets({ sets }),
    reps: getTrainingReps({ sets }),
  }
}

export default function EditTraining({
  training,
}: {
  training: TrainingWithExerciseWithSet
}) {
  const params = useParams()
  const initialSets: OriginalTrainingSet[] = training.sets.map((set) => ({
    id: set.id,
    weight: set?.weight || 0,
    reps: set?.reps || 0,
  }))
  const [sets, setSets] = useState<TrainingSet[]>(
    initialSets ? initialSets.map((set) => ({ ...set })) : [],
  )
  const [originalSets, setOriginalSets] = useState<OriginalTrainingSet[]>(
    initialSets ? initialSets.map((set) => ({ ...set })) : [],
  )
  const [trainingStats, setTrainingStats] = useState<TrainingStats>(
    getTrainingStats({ sets }),
  )

  useEffect(() => {
    setTrainingStats(getTrainingStats({ sets }))
  }, [sets])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      reps: 0,
    },
  })

  const handleAddField = () => {
    setSets((prev) => [...prev, { id: undefined, weight: 0, reps: 0 }])
  }

  const handleWeightChange = (index: number, weight: number) => {
    const updatedSets = [...sets]
    updatedSets[index].weight = weight
    setSets(updatedSets || [])
  }

  const handleRepsChange = (index: number, reps: number) => {
    const updatedSets = [...sets]
    updatedSets[index].reps = reps
    setSets(updatedSets || [])
  }

  // セットを削除する処理
  async function handleDeleteSet(index: number) {
    const setId = sets[index].id
    const updatedSets = sets.filter((_, i) => i !== index)
    setSets(updatedSets)
    if (setId === undefined) {
      return
    }
    await deleteTrainingSet({ setId })
  }

  async function onSubmit() {
    for (const set of sets) {
      // 元のデータには存在しない場合
      if (!originalSets.some((originalSet) => originalSet.id === set.id)) {
        // 新規追加
        const newSet = await createTrainingSet({
          trainingId: Number(params.id),
          weight: set.weight,
          reps: set.reps,
        })
        set.id = newSet.id
      } else {
        if (set.id === undefined) {
          continue
        }
        const originalSet = originalSets.find(
          (originalSet) => originalSet.id === set.id,
        )
        // 元のデータと異なる場合
        if (
          set.weight !== originalSet?.weight ||
          set.reps !== originalSet?.reps
        ) {
          // 更新
          await updateTrainingSet({
            setId: set.id,
            weight: set.weight,
            reps: set.reps,
          })
        }
      }
    }

    const originalSetsFromSets: OriginalTrainingSet[] = sets.map((set) => {
      if (set.id === undefined) {
        throw new Error('id is undefined')
      }
      return {
        id: set.id,
        weight: set.weight,
        reps: set.reps,
      }
    })

    setOriginalSets(originalSetsFromSets)
  }

  const muscleGroups: MuscleGroup[] = []
  training.exercise?.muscles?.forEach((muscle) => {
    const bodyArea: string = muscle.bodyArea?.name || 'others'
    if (!muscleGroups.some((group) => group.bodyArea === bodyArea)) {
      muscleGroups.push({ bodyArea, muscles: [] })
    }
    muscleGroups
      .find((group) => group.bodyArea === bodyArea)
      ?.muscles.push(muscle.name)
  })

  const inputStyle = 'w-[30svw] md:w-50 text-center'

  return (
    <div className="flex flex-col items-center">
      <div className="w-[95svw] md:w-180 mb-4">
        <div className=" flex items-start">
          <Link href={`/trainings`} className="w-12 h-full">
            <Button
              variant="ghost"
              className="[&_svg]:size-7 w-full h-full cursor-pointer"
            >
              <IoIosArrowBack className="size-1 hover:opacity-80" />
            </Button>
          </Link>
          <h1 className="font-bold w-full h-full md:ml-6 leading-12 text-[1.2rem] md:text-[1.4rem]">
            {training?.exercise?.name ?? '種目名取得できず'}
          </h1>
        </div>
        <div className="w-full flex flex-col ml-17">
          {muscleGroups.map((muscleGroup) => (
            <div key={muscleGroup.bodyArea} className="">
              <span className="text-sm text-gray-700 mr-2">
                {muscleGroup.bodyArea}
              </span>
              {muscleGroup.muscles.map((muscle) => (
                <span key={muscle} className="text-xs text-gray-500 ml-2">
                  {muscle}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <TrainingStats className="mt-5 mb-7">
        <TrainingVolume value={trainingStats.volume} />
        <TrainingSet value={trainingStats.sets} />
        <TrainingRep value={trainingStats.reps} />
      </TrainingStats>

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
                    handleWeightChange(index, Number(e.target.value))
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
                    handleRepsChange(index, Number(e.target.value))
                  }
                ></Input>
                <span className="mx-2">reps</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-8 cursor-pointer">
                    <GoKebabHorizontal size="22" className="ml-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleDeleteSet(index)}
                      className="cursor-pointer"
                    >
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
          <button>
            <IoAddCircleOutline className="size-1" />
          </button>
          <Button
            onClick={handleAddField}
            variant="ghost"
            size="icon"
            className="w-15 h-15 [&_svg]:size-15 cursor-pointer rounded-full"
          >
            <IoAddCircleOutline className="size-1" />
          </Button>
          <Button type="submit" className={`my-3 ${buttonStyles}`}>
            <MdOutlineSaveAlt color="white" className="size-1" />
            保存
          </Button>
        </form>
      </Form>
    </div>
  )
}

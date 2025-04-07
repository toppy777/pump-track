'use server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type Training = Prisma.TrainingGetPayload<{
  include: {
    exercise: { include: { muscles: { include: { bodyArea: true } } } }
    sets: true
  }
}>

export default async function getTrainings({
  userId,
  selectedDate,
}: {
  userId: string
  selectedDate: Date
}): Promise<Training[]> {
  // selectedDateはUTCで渡される前提
  const today = new Date(selectedDate)

  // 日本時間の0時を基準にして、ターゲットの日付のUTC15時と翌日のUTC15時を取得
  if (today.getHours() < 15) {
    today.setDate(today.getDate() - 1)
  }
  today.setHours(15, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const trainings = await prisma.training.findMany({
    where: { user: { id: userId }, createdAt: { gte: today, lt: tomorrow } },
    include: {
      exercise: {
        include: { muscles: { include: { bodyArea: true } } },
      },
      sets: true,
    },
  })

  return trainings
}

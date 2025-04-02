'use server'

import getUserId from '@/features/auth/get-user-id'
import { prisma } from '@/lib/prisma'
import { Set } from '@prisma/client'

export default async function getTrainingSets({
  trainingId,
}: {
  trainingId: number
}): Promise<Set[]> {
  const userId = await getUserId()

  if (userId === '') {
    return []
  }

  const training = await prisma.training.findUnique({
    where: {
      id: trainingId,
    },
    include: {
      sets: true,
    },
  })

  return training?.sets || []
}

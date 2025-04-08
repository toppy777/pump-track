'use server'

import { prisma } from '@/lib/prisma'

export default async function deleteTraining({
  trainingId,
}: {
  trainingId: number
}) {
  await prisma.training.delete({
    where: {
      id: trainingId,
    },
  })
}

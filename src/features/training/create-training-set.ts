'use server'

import { prisma } from '@/lib/prisma'
import { Set } from '@prisma/client'

export default async function createTrainingSet({
  trainingId,
  weight,
  reps,
}: {
  trainingId: number
  weight?: number
  reps?: number
}): Promise<Set> {
  return await prisma.set.create({
    data: {
      training: {
        connect: {
          id: trainingId,
        },
      },
      weight: weight ?? null,
      reps: reps ?? null,
    },
  })
}

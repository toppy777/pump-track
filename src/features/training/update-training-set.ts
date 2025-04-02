'use server'

import { prisma } from '@/lib/prisma'

export default async function updateTrainingSet({
  id,
  weight,
  reps,
}: {
  id: number
  weight: number
  reps: number
}) {
  await prisma.set.update({
    where: {
      id: id,
    },
    data: {
      weight: weight,
      reps: reps,
    },
  })
}

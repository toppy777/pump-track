'use server'

import { prisma } from '@/lib/prisma'
import { Muscle } from '@prisma/client'

export default async function getMuscles(): Promise<Muscle[]> {
  const muscles = await prisma.muscle.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return muscles
}

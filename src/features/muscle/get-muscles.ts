'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type BodyAreasWithMuscles = Prisma.BodyAreaGetPayload<{
  include: {
    muscles: true
  }
}>

export async function getBodyAreasWithMuslces(): Promise<
  BodyAreasWithMuscles[]
> {
  const bodyAreas = await prisma.bodyArea.findMany({
    include: {
      muscles: true,
    },
  })

  return bodyAreas
}

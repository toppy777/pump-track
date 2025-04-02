'use server'

import { prisma } from '@/lib/prisma'

export default async function deleteTrainingSet({ setId }: { setId: number }) {
  await prisma.set.delete({
    where: {
      id: setId,
    },
  })
}

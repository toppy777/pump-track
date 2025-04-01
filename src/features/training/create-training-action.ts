'use server'

import getUserId from '@/features/auth/get-user-id'
import { ActionResponse, handleError } from '@/features/common/common'
import { prisma } from '@/lib/prisma'
import { Training } from '@prisma/client'

export async function createTraining({
  exerciseId,
}: {
  exerciseId: number
}): Promise<ActionResponse<Training>> {
  const userId = await getUserId()

  if (userId === '') {
    return {
      success: false,
      error: 'ユーザーIDが取得できませんでした',
      statusCode: 401,
    }
  }

  try {
    const newTraining = await prisma.training.create({
      data: {
        id: 1000,
        exercise: {
          connect: {
            id: exerciseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return { success: true, data: newTraining }
  } catch (error) {
    return handleError(error, '作成')
  }
}

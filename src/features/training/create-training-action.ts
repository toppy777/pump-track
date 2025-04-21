'use server'

import getUserId from '@/features/auth/get-user-id'
import { ActionResponse, handleError } from '@/features/common/common'
import { prisma } from '@/lib/prisma'
import { Training } from '@prisma/client'

export async function createTraining({
  exerciseId,
  date,
}: {
  exerciseId: number
  date: Date
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
        createdAt: date,
      },
    })
    return { success: true, data: newTraining }
  } catch (error) {
    return handleError(error, '作成')
  }
}

'use server'
import getUserId from '@/features/auth/get-user-id'
import { ActionResponse, handleError } from '@/features/common/common'
import { prisma } from '@/lib/prisma'
import { Exercise } from '@prisma/client'

export async function createExercise({
  name,
  description,
  muscles,
}: {
  name: string
  description: string
  muscles: number[]
}): Promise<ActionResponse<Exercise>> {
  const userId = await getUserId()

  if (userId === '') {
    return {
      success: false,
      error: 'ユーザーIDが取得できませんでした',
      statusCode: 401,
    }
  }

  try {
    const newExercise = await prisma.exercise.create({
      data: {
        name: name,
        description: description,
        muscles: {
          connect: muscles.map((muscleId) => ({
            id: muscleId,
          })),
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return { success: true, data: newExercise }
  } catch (error) {
    return handleError(error, '作成')
  }
}

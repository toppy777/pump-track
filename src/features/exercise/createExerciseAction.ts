'use server'
import getUserId from '@/features/auth/getUserId'
import { prisma } from '@/lib/prisma'
import { Exercise } from '@prisma/client'

type ActionResponse<T = void> = {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}

function handleError<T>(error: unknown, action: string): ActionResponse<T> {
  if (error instanceof Error) {
    return {
      success: false,
      error: `${action}処理でエラーが発生しました: ${error.message}`,
      statusCode: 500,
    }
  }
  return {
    success: false,
    error: `予期せぬエラーが発生しました`,
    statusCode: 500,
  }
}

export async function addExercise({
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
        id: 1000,
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

import Header from '@/components/header'
import { auth } from '@/features/auth/config'
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

async function addExercise(data: FormData): Promise<ActionResponse<Exercise>> {
  'use server'

  const rawData = {
    name: data.get('name'),
    description: data.get('description'),
    userId: data.get('userId'),
  }

  const session = await auth()

  if (session === null) {
    console.log('セッションがnullです')
    return handleError(null, '作成')
  }

  if (session.user === undefined) {
    console.log('セッションのユーザーがundefinedです')
    return handleError(null, '作成')
  }

  if (session.user.id === undefined) {
    console.log('セッションのユーザーIDがundefinedです')
    return handleError(null, '作成')
  }

  console.log(session.user.id)

  try {
    const newExercise = await prisma.exercise.create({
      data: {
        id: 1000,
        name: rawData.name as string,
        description: rawData.description as string,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })
    return { success: true, data: newExercise }
  } catch (error) {
    return handleError(error, '作成')
  }
}

export default async function Exercises() {
  return (
    <div>
      <Header />
      <form action={addExercise}>
        <input type="text" name="name" />
        <input type="text" name="description" />
        <button type="submit">追加</button>
      </form>
    </div>
  )
}

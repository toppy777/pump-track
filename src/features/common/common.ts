export type ActionResponse<T = void> = {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}

export function handleError<T>(
  error: unknown,
  action: string,
): ActionResponse<T> {
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

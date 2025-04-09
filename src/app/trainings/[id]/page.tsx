import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import EditTraining from '@/features/training/components/EditTraining'
import { getTraining } from '@/features/training/get-trainings'
import { Session } from 'next-auth'

export default async function TrainingEdit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  const { id }: { id: string } = await params
  if (Number.isNaN(Number(id))) {
    return <div>idが数字ではありません</div>
  }
  const trainingId = Number(id)
  const training = await getTraining({
    userId: session?.user?.id || '',
    trainingId: trainingId,
  })

  return (
    <div>
      <Header session={session as Session} />
      <EditTraining training={training} />
    </div>
  )
}

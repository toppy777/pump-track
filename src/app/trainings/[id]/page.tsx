import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import EditTraining from '@/features/training/components/EditTraining'
import getTrainingSets from '@/features/training/get-training-sets'
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
  const idNum = Number(id)
  const sets = await getTrainingSets({ trainingId: idNum })

  return (
    <div>
      <Header session={session as Session} />
      <EditTraining sets={sets} />
    </div>
  )
}

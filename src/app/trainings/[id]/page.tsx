import Header from '@/components/header'
import { auth } from '@/features/auth/config'
import EditTraining from '@/features/training/components/EditTraining'
import { Session } from 'next-auth'

export default async function TrainingEdit() {
  const session = await auth()

  return (
    <div>
      <Header session={session as Session} />
      <EditTraining />
    </div>
  )
}

'use client'

import { useParams } from 'next/navigation'

export default function EditTraining() {
  const params = useParams()

  return <div>トレーニングを編集します{params.id}</div>
}

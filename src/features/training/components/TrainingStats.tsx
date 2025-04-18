'use client'

import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'

export function TrainingStats({
  className,
  children,
}: {
  className?: string
  children: ReactNode[]
}) {
  const separated = children.flatMap((child, index) =>
    index + 1 < children.length
      ? [
          <div key={`child-${index}`}>{child}</div>,
          <Separator key={`sep-${index}`} orientation="vertical" />,
        ]
      : [<div key={`child-${index}`}>{child}</div>],
  )

  return (
    <div
      className={`flex w-full h-15 md:h-20 items-center justify-center space-x-8 ${className}`}
    >
      {separated}
    </div>
  )
}

export function TrainingStat({
  labelStr,
  value,
  unit,
}: {
  labelStr: string
  value: number
  unit?: string
}) {
  const statsValueStyle = 'text-[1.4rem] md:text-[1.9rem]'
  return (
    <div>
      <h3>{labelStr}</h3>
      <div className="text-center">
        <span className={statsValueStyle}>{value}</span>
        {unit ? (
          <span className="text-[1rem] md:text-[1.2rem]"> {unit}</span>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export function TrainingCount({ value }: { value: number }) {
  return <TrainingStat labelStr="種目" value={value} />
}

export function TrainingVolume({ value }: { value: number }) {
  return <TrainingStat labelStr="ボリューム" value={value} unit="kg" />
}

export function TrainingSet({ value }: { value: number }) {
  return <TrainingStat labelStr="セット" value={value} />
}

export function TrainingRep({ value }: { value: number }) {
  return <TrainingStat labelStr="レップ" value={value} />
}

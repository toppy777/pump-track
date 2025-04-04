import { Separator } from '@/components/ui/separator'

export default function TrainingReport({
  totalVolume,
  trainingCount,
  totalSets,
  totalReps,
}: {
  totalVolume: number
  trainingCount: number
  totalSets: number
  totalReps: number
}) {
  return (
    <div className="w-full h-[15svh] flex flex-col items-center justify-center space-y-[1svh]">
      <div className="h-[4svh]">
        <h2>ボリューム</h2>
        <div className="text-center">
          {totalVolume}
          <span> kg</span>
        </div>
      </div>
      <Separator />
      <div className="flex w-full h-[5svh] items-center justify-center space-x-4">
        <div>
          <h3>種目数</h3>
          <div className="text-center">{trainingCount}</div>
        </div>
        <Separator orientation="vertical" />
        <div>
          <h2>セット数</h2>
          <div className="text-center">{totalSets}</div>
        </div>
        <Separator orientation="vertical" />
        <div>
          <h2>レップ数</h2>
          <div className="text-center">{totalReps}</div>
        </div>
      </div>
    </div>
  )
}

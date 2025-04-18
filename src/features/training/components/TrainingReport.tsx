import { Separator } from '@/components/ui/separator'
import {
  TrainingCount,
  TrainingRep,
  TrainingSet,
  TrainingStats,
} from '@/features/training/components/TrainingStats'

export type TrainingReportProps = {
  totalVolume: number
  trainingCount: number
  totalSets: number
  totalReps: number
}

export default function TrainingReport({
  trainingReportProps,
}: {
  trainingReportProps: TrainingReportProps
}) {
  const { totalVolume, trainingCount, totalSets, totalReps } =
    trainingReportProps

  return (
    <div className="flex justify-center items-center">
      <div className="w-100 flex flex-col items-center justify-center space-y-[1svh]">
        <div className="mt-3 mb:mt-0 flex flex-col justify-center items-center">
          <h2>ボリューム</h2>
          <div className="text-center">
            <span className="text-[1.5rem] md:text-[2rem] ">{totalVolume}</span>
            <span className="text-[1rem] md:text-[1.2rem]"> kg</span>
          </div>
        </div>
        <Separator />
        <TrainingStats>
          <TrainingCount value={trainingCount} />
          <TrainingSet value={totalSets} />
          <TrainingRep value={totalReps} />
        </TrainingStats>
      </div>
    </div>
  )
}

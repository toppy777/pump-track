import { Separator } from '@/components/ui/separator'

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

  const statsValueStyle = 'text-[1.4rem] md:text-[1.9rem]'

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
        <div className="flex w-full h-15 md:h-20 items-center justify-center space-x-8">
          <div>
            <h3>種目</h3>
            <div className="text-center">
              <span className={statsValueStyle}>{trainingCount}</span>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div>
            <h3>セット</h3>
            <div className="text-center">
              <span className={statsValueStyle}>{totalSets}</span>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div>
            <h3>レップ</h3>
            <div className="text-center">
              <span className={statsValueStyle}>{totalReps}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Header from '@/components/header'
import Title from '@/components/title'

export default function About() {
  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto mt-[5svh]">
        <Title />

        <div className="w-[60svh] mx-auto leading-[2.5rem]">
          <p>
            筋トレはただの運動ではなく、人生をより良くするためのライフスタイル。
          </p>
          <p>このアプリは、あなたのトレーニングを支えるパートナーです。</p>
          <p>あなたの筋トレ習慣を全力でサポートします。</p>
          <br />
          <p>
            初心者から上級者まで、自分に合ったトレーニングメニューを作成し、記録し、成長を実感できる機能を提供します。
          </p>
          <br />
          <p>筋トレを継続することは簡単ではありません。</p>
          <p>
            モチベーションの維持や記録の手間を減らし、より続けやすい環境を提供したいという思いから、このアプリは開発されました。
          </p>
          <p>あなたの「No Pump, No Life」を全力でサポートします。</p>
        </div>
      </div>
    </div>
  )
}

import Header from '@/components/header'
import Title from '@/components/title'
import { auth } from '@/features/auth/config'
import { Session } from 'next-auth'

export default async function About() {
  const session = await auth()

  return (
    <div>
      <Header session={session as Session} />
      <div className="flex flex-col mx-auto mt-[5svh]">
        <Title />

        <div className="w-[60svh] mx-auto leading-[2.5rem] tracking-wider">
          <p>
            筋トレはただの運動ではなく、人生をより良くするためのライフスタイル。
          </p>
          <p>このアプリは、あなたのトレーニングを支えるパートナーです。</p>
          <br />
          <p>
            スムーズにトレーニングを記録でき、その記録で自らの成長を視覚的に実感できる機能を提供します。
          </p>
          <br />
          <p>筋トレを継続することは簡単ではありません。</p>
          <p>
            記録の手間を減らし、積み上げたトレーニングをモチベーションに、より続けやすい環境を提供したいという思いから、このアプリは開発されました。
          </p>
          <br />
          <p>あなたの「No Pump, No Life」を全力でサポートします。</p>
        </div>
      </div>
    </div>
  )
}

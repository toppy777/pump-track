import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  console.log({ alice, bob })

  await prisma.bodyArea.upsert({
    where: { id: 1 },
    update: {
      name: '胸',
    },
    create: {
      id: 1,
      name: '胸',
    },
  })

  await prisma.bodyArea.upsert({
    where: { id: 2 },
    update: {
      name: '肩',
    },
    create: {
      id: 2,
      name: '肩',
    },
  })

  await prisma.muscle.upsert({
    where: { id: 1 },
    update: {
      name: '大胸筋 上部',
      bodyArea: { connect: { id: 1 } },
    },
    create: {
      id: 1,
      name: '大胸筋 上部',
      bodyArea: { connect: { id: 1 } },
    },
  })

  await prisma.muscle.upsert({
    where: { id: 2 },
    update: {
      name: '大胸筋 下部',
      bodyArea: { connect: { id: 1 } },
    },
    create: {
      id: 2,
      name: '大胸筋 下部',
      bodyArea: { connect: { id: 1 } },
    },
  })

  await prisma.muscle.upsert({
    where: { id: 3 },
    update: {
      name: '三角筋',
      bodyArea: { connect: { id: 2 } },
    },
    create: {
      id: 3,
      name: '三角筋',
      bodyArea: { connect: { id: 2 } },
    },
  })

  await prisma.exercise.upsert({
    where: { id: 1 },
    update: {
      user: { connect: { id: alice.id } },
      name: 'ベンチプレス',
      description: 'バーベルとベンチを用いて胸筋を鍛える',
      muscles: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
    create: {
      id: 1,
      user: { connect: { id: alice.id } },
      name: 'ベンチプレス',
      description: 'バーベルとベンチを用いて胸筋を鍛える',
      muscles: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  })

  await prisma.exercise.upsert({
    where: { id: 2 },
    update: {
      user: { connect: { id: alice.id } },
      name: 'ダンベルベンチプレス',
      description: 'バーベルとベンチを用いて胸筋を鍛える',
      muscles: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
    create: {
      id: 2,
      user: { connect: { id: alice.id } },
      name: 'ダンベルベンチプレス',
      description: 'バーベルとベンチを用いて胸筋を鍛える',
      muscles: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  })

  await prisma.exerciseGroup.upsert({
    where: { id: 1 },
    update: {
      name: '胸トレ1',
      user: { connect: { id: alice.id } },
      exercises: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
    create: {
      id: 1,
      name: '胸トレ1',
      user: { connect: { id: alice.id } },
      exercises: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  })

  await prisma.training.upsert({
    where: { id: 1 },
    update: {
      user: { connect: { id: alice.id } },
      exercise: { connect: { id: 1 } },
      id: 1,
      comment: '疲れた',
    },
    create: {
      user: { connect: { id: alice.id } },
      exercise: { connect: { id: 1 } },
      id: 1,
      comment: '疲れた',
    },
  })

  await prisma.training.upsert({
    where: { id: 2 },
    update: {
      user: { connect: { id: alice.id } },
      exercise: { connect: { id: 2 } },
      id: 2,
      comment: '完璧なトレーニングだった',
    },
    create: {
      user: { connect: { id: alice.id } },
      exercise: { connect: { id: 2 } },
      id: 2,
      comment: '完璧なトレーニングだった',
    },
  })

  await prisma.set.upsert({
    where: { id: 1 },
    update: {
      training: { connect: { id: 1 } },
      id: 1,
      weight: 60,
      reps: 10,
      comment: '軽く感じた',
    },
    create: {
      training: { connect: { id: 1 } },
      id: 1,
      weight: 60,
      reps: 10,
      comment: '軽く感じた',
    },
  })

  await prisma.set.upsert({
    where: { id: 2 },
    update: {
      training: { connect: { id: 1 } },
      id: 2,
      weight: 60,
      reps: 7,
    },
    create: {
      training: { connect: { id: 1 } },
      id: 2,
      weight: 60,
      reps: 7,
    },
  })

  await prisma.set.upsert({
    where: { id: 3 },
    update: {
      training: { connect: { id: 1 } },
      id: 3,
      weight: 60,
      reps: 5,
    },
    create: {
      training: { connect: { id: 1 } },
      id: 3,
      weight: 60,
      reps: 5,
    },
  })

  await prisma.set.upsert({
    where: { id: 4 },
    update: {
      training: { connect: { id: 2 } },
      id: 4,
      weight: 20,
      reps: 10,
    },
    create: {
      training: { connect: { id: 2 } },
      id: 4,
      weight: 20,
      reps: 10,
    },
  })

  await prisma.set.upsert({
    where: { id: 5 },
    update: {
      training: { connect: { id: 2 } },
      id: 5,
      weight: 20,
      reps: 10,
    },
    create: {
      training: { connect: { id: 2 } },
      id: 5,
      weight: 20,
      reps: 10,
    },
  })

  await prisma.set.upsert({
    where: { id: 6 },
    update: {
      training: { connect: { id: 2 } },
      id: 6,
      weight: 20,
      reps: 8,
    },
    create: {
      training: { connect: { id: 2 } },
      id: 6,
      weight: 20,
      reps: 8,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

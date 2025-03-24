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
    where: { name: '腕' },
    update: {},
    create: {
      name: '腕',
      muscles: {
        create: [
          { name: '上腕二頭筋' },
          { name: '上腕三頭筋' },
          { name: '前腕' },
        ],
      },
    },
  })

  await prisma.bodyArea.upsert({
    where: { name: '背中' },
    update: {},
    create: {
      name: '背中',
      muscles: {
        create: [
          { name: '広背筋' },
          { name: '僧帽筋' },
          { name: '大円筋' },
          { name: '脊柱起立筋' },
        ],
      },
    },
  })

  await prisma.exercise.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user: { connect: { id: alice.id } },
      name: 'ベンチプレス',
      description: 'バーベルとベンチを用いて胸筋を鍛える',
      muscles: {
        create: [{ name: '大胸筋' }, { name: '前鋸筋' }, { name: '三角筋' }],
      },
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

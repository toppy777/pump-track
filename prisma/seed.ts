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

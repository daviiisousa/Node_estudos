import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser() {
    
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: "jgjgjh"
    },
  })
  console.log(user)
}

  createUser()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
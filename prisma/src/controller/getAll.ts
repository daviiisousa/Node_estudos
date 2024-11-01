import prisma from "../../prisma/db"

async function findAll() {
    const user = await prisma.user.findMany()
     
    console.log(user)
  }

  findAll()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

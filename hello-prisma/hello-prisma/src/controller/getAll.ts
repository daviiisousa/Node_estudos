import { prisma } from "../.."

async function getAll() {
    const user = await prisma.user.findMany()
    console.log(user)
  }
  
  getAll()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
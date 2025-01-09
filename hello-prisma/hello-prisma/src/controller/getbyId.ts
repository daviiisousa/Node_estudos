import { prisma } from "../.."

async function getById() {
    const user = await prisma.user.findMany({
        where:{
            id:1
        }
    })
    console.log(user)
  }
  
  getById()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
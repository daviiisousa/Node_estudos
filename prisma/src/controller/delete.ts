import prisma from "../../prisma/db"

async function deleteUser() {
    const user = await prisma.user.delete({
      where:{
        id: 1
      }
    })
    console.log(user)
  }

  deleteUser()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

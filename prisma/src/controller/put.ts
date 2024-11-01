import prisma from "../../prisma/db"


async function PutUsuarios() {
    const user = await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            name: 'davi',
            email: 'davi@prisma.com'
        }
    })
    console.log(user)
  }

  PutUsuarios()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
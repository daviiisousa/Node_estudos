import { prisma } from "../.."

async function upadateUser() {
    const post = await prisma.post.update({
        where: { id: 3},
        data: { published: true },
    })
    console.log(post)
}

upadateUser()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
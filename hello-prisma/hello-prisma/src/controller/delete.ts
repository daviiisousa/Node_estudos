import { prisma } from "../.."

async function deleteUser() {
  try {

    //deleta as tabelas q tem relaçao com o usuario
    await prisma.post.deleteMany({
      where: { authorId: 1 }, 
    });

    await prisma.profile.deleteMany({
      where:{
        userId: 1
      }
    })

    //deleta o usuario
    const deletedUser = await prisma.user.delete({
      where: { id: 1 },
    });

    console.log("Usuário deletado com sucesso:", deletedUser);
    
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser()
  .then(() => console.log("Processo concluído."))
  .catch(() => process.exit(1));

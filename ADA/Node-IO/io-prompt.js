import rl from "readline";

const prompt = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptPromisse = {
  question: (pergunta) =>
    new Promise((resolve, rejects) => {
      try {
        prompt.question(pergunta, (res) => resolve(res));
      } catch (error) {
        rejects(error);
      }
    }),
  close: () => prompt.close()
};

async function askUser() {
  const numero = await promptPromisse.question('qual seu numero favorito? ')
  console.log(`o dobro do seu numero favorito e: ${parseInt(numero) * 2} `);

  const nome = await promptPromisse.question('qual o seu nome? ')
  console.log(`seja bem vindo ${nome} !`)

  promptPromisse.close()
}

askUser();

// prompt.question('qual seu numero favorito? ', (res) => {
//     console.log(`o dobro do seu numero favorito e ${parseInt(res) * 2} `)
//     prompt.close()
// })

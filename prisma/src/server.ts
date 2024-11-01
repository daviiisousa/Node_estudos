import  express  from "express";

const app = express();

app.use(express.json());

app.use("/")

app.listen(3000, () => {
    console.log("Rodando em https://localhost:3000");
    
})


const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt")// biblioteca para criptografar senha
const saltRounds = 10;// Utiliza junto com bcrypt


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Boavista1@",
    database: "banco",
});

app.use(express.json());
app.use(cors());
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://swapi.dev/api/people/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({
    credentials: true,
  }));

// Abre Rotas de captura de dados do cadastro do usuario
app.post("/cadastro", (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => { //Verificação se o email ja existe no banco
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            bcrypt.hash(password, saltRounds, (err, hash) => {// Utilizando a biblioteca para criptografar no banco ao cadastrar
                db.query("INSERT INTO usuarios (nome, email, password, telefone) VALUES (?, ?, ?, ?)", [nome, email, hash, telefone], (err, response) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send({ msg: "Cadastrado com sucesso!" })
                }
                );
            })

        } else {
            res.send({ msg: "Usuário já cadastrado!" })
        }
    });
});// Fecha Rotas de captura de dados do cadastro do usuario


//Inicia validação dos dados de login
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, result) => {// vai comparar a senha encriptada com a senha do banco de dados do email digitado
                if (result) {
                    res.status(200).send({ msg: "Sucess" })
                } else {
                    res.status(400).send({ msg: "Senha está incorreta" })
                }
            })
        } else {
            res.status(401).send({ msg: "Email está incorreto!" })
        }
    }
    );
});//Termina validação dos dados de login



app.listen(3001, () => {
    ;
});
const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

const db = require("./database/db")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true}))

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


server.get("/", (req, res) => {
    res.render("index.html")
})

server.get("/create-point", (req,res) => {
    // console.log(req.query)
    res.render("create-point.html")
})

server.post("/savepoint",(req,res) =>{
    
    // console.log(req.body)

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items        
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com Sucesso")
        console.log(this) 

        res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req,res) => {
    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html", { totalItems: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if(err) {
            return console.log(err)
        } 

        const totalItems = rows.length

        res.render("search-results.html", { places: rows, totalItems})
    })
})

server.listen(3000)

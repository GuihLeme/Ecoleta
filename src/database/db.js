// IMPORTAR A DEPENDENCIA DO SQLITE3
const sqlite3 = require("sqlite3").verbose()

// CRIAR O OBJETO QUE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS
const db = new sqlite3.Database("./src/database/database.db ")

module.exports = db

// UTILILAR O OBJETO DE BANCO DE DADOS PARA NOSSAS OPERAÇÕES

// 1. CRIAR UMA TABELA
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT, 
            items TEXT
        ); 
    `)

//     // 2. INSERIR DADOS NA TABELA
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=861&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Cataria",
//         "Rio do Sul",
//         "Papéis e papelão"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com Sucesso")
//         console.log(this) 
//     }

//     db.run(query, values, afterInsertData)

//     // // 3. CONSULTAR OS DADOS DA TABELA
//     // db.all(`SELECT * FROM places`, function(err,rows){
//     //     if(err) {
//     //         return console.log(err)
//     //     } 
        
//     //     console.log("Aqui estão seus registros:")
//     //     console.log(rows)
//     // })
    
    // 4. DELETAR UM DADO DA TABELA
    // db.run(`DELETE FROM places WHERE id =?`, [3], function(err){
    //     if(err) {
    //         return console.log(err)
    //     } 
    
    //     console.log("Registro deletado com sucesso!")
    // })
})
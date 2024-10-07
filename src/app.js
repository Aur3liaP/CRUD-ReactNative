const express = require("express")
const db = require("./model/dbConfig")
const app = express()

app.get("/", (req,res) => {
    res.status(200).send("on est sur le '/'")
})

app.get("/character", (req, res) => {
    db.query("SELECT * FROM harrybdd.character")
    .then(dataCharacter => {
        res.status(200).json(dataCharacter[0])
    })
    .catch(err => console.error(err));
});

module.exports = app
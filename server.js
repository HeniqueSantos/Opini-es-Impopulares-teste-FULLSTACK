const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

const port = 8000

app.use(express.static("public"));



app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/opiniao', (req,res) => {
    const sql = "SELECT * FROM opinioes ORDER BY RAND() LIMIT 1";

    db.query(sql, (err, result) => {

    if (err) {
        console.log(err);   
        res.status(500).send("erro");
        return;
        }
        res.json(result[0]);
    })
});

app.use(express.json());

app.post("/like", (req, res) => {

    const id = req.body.id;

    
    const sql = "UPDATE opinioes SET joia = joia + 1 WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            console.log(err);
            return;
        }

        res.send("ok");
    });

});


app.post("/dislike", (req,res) => {
    const id = req.body.id;

    const sql = "UPDATE opinioes SET disjoia = disjoia + 1 WHERE id = ?";

    db.query(sql,[id],(err) => {
        if (err){
            console.log(err);
            return;
        }

        res.send("ok");
    })
});


app.listen(port, (error) => {
    if (error){
        console.log(error);
    }

    console.log(`servidor funcinando! http://localhost:${port}`);
});
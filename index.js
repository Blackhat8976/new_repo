import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import pg from 'pg';
import { log } from 'console';


const app = express();

app.use(bodyParser.urlencoded({ extended: false}));


const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    password:"0000",
    database:"imageTest",
    port:5432,

})

db.connect();

const result = await db.query("select * from images")
console.log(result.rows);



app.get("/", (req, res) =>{

    res.render("index.ejs")
    //this change after edit and second commit
})
// bro can u see the M is means modify ok ok



app.post("/image", (req, res) =>{
    const imageURL = req.body.images;
    console.log(imageURL);
    res.send(imageURL)
   let data =  fs.readFileSync(imageURL);
   console.log("data"+data);
   console.log("file edit");

   


})


app.listen(4000, () =>{
    console.log("Server port 4000");
})
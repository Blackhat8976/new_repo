import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import pg from 'pg';
import multer from 'multer';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    password: "shin2005-89",
    database: "imageTest",
    port: 5432,

})

db.connect();
const upload = multer({ dest: "uploads/"})

const result = await db.query("select * from images")
console.log(result.rows);



app.get("/", (req, res) => {

    res.render("index.ejs")
    //this change after edit and second commit
})
// bro can u see the M is means modify ok ok



app.post("/image", upload.single('images'), async (req, res) => {
    const imageURL = req.file.path;
    try{
        const ImageData = fs.readFileSync(imageURL);
        console.log(ImageData)
        db.query("INSERT INTO images (data, name) VALUES ($1, $2)", [ImageData, "NAME"])
        console.log("IMAGE UPLOADED SUCCESSFULLY....");
        


    }catch(err){
        console.log("Error WHILE UPLOADING.........");
    }

   


})


app.listen(4000, () => {
    console.log("Server port 4000");
})
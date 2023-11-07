/*
    In this project i used the open library to get books cover and titles of new entries.
    for more information about the api click here: 
    https://openlibrary.org/dev/docs/api/covers - cover fetched by ISBN
    https://openlibrary.org/dev/docs/api/books - title fetched by ISBN
*/

import bodyParser from "body-parser"
import express from "express"
import pg from "pg"
import axios from "axios"

const app = express();
const port = "3000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))

const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "2209",
    database: "book_notes",
    port: '5432'
});

db.connect();

app.get('/', async(req, res) =>{
    try{
        let data = await db.query("SELECT * FROM note");
        const notes = data.rows;
        res.render('home.ejs', {
            notes: notes
        });
    }
    catch(err){
        console.log(err);
        alert("Something went wrong with the database.");
    }
});


app.get("/cover/:isbn", async(req, res) =>{
    const imageUrl = `https://covers.openlibrary.org/b/isbn/${req.params.isbn}-M.jpg`;
    try {
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });

        const imageBuffer = imageResponse.data;
        const contentType = imageResponse.headers['content-type'];

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': imageBuffer.length
        });
        res.write(imageBuffer);
        res.end();

    } catch (error) {
        console.error(error);
    }
});

app.post("/search", async(req, res) => {
    const searchInput = req.body.userInput;
    try{
        const results = await db.query("SELECT * from note WHERE title LIKE '%' || $1 || '%'", [searchInput]);
        res.render("home.ejs", {
            notes: results.rows
        });    
    }
    catch(err){
        console.log(err);
        alert('Something went wrong with the search process, redirect you to the home page.')
        res.redirect('/');
    }

});

app.post("/newEntry", (req, res) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    res.render("compose.ejs",{
        today: formattedToday
    });
});

app.post("/submitNewEntry", async(req, res) => {
    const isbn = req.body.isbn;
    try{
        const respond = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
        const title = respond.data.title;
        const content = req.body.content;
        const rating = req.body.rate;
        const dateArray = req.body.date.split('-')
        const date = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
        try{
            await db.query("INSERT INTO note (isbn, title, rating, date_read, text) VALUES ($1, $2, $3, $4, $5)", [isbn, title, rating, date, content]);
        }
        
        catch(err){
            console.log(err);
            alert("Something went wrong with the database, redirect you to the home page.")
        }
        
        finally{
            res.redirect("/");
        }

    }
    catch(err){
        console.log(err);
        alert("Something went wrong with fetching info from the api, base on the isbn you entered.");
        alert("Redirect you to the home page.")
        res.redirect("/");
    }
});

app.listen(port, () =>{
    console.log(`server running on port ${port}`);
});
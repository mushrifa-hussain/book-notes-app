import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "your_user",
  host: "localhost",
  database: "book_notes",
  password: "your_password",
  port: 5432,
});

db.connect();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

let book_details = [];
let order = 'rating';

app.get("/", async (req, res) => {
    let query;

    if (order === "rating") {
        query = "SELECT * FROM books ORDER BY rating DESC;";
    } else {
        query = "SELECT * FROM books ORDER BY date DESC;";
    }
    try{
        const result = await db.query(query);
        book_details = result.rows;
        res.render("index.ejs", {
            books: book_details
        });
    }catch(e){
        console.log("No books yet");
        res.render("index.ejs");
    }
});

app.post("/order", (req, res) => {
    order = req.body.order;
    res.redirect("/");
});

app.get("/add", (req, res) => {
    res.render("addBook.ejs");
});

app.post("/add", async (req, res) => {
    const title = req.body.title;
    const rating = req.body.rating;
    const notes = req.body.notes;
    const date = req.body.date;
    if(!title || !notes || !date || isNaN(rating)){
        res.render("addBook.ejs", {
            error: "Please fill all the fields correctly."
        });
    }
    let cover = 0;
    try{
        const result = await axios.get("https://openlibrary.org/search.json", {
        params: {
            title: title
        }
    });
    if (result.data.docs.length > 0) {
        cover = result.data.docs[0].cover_i;
    }
    if(cover == null){
        cover = 0;
    }
    }catch(e){
        console.log("Could not fetch cover image for this book");
    }
    await db.query("INSERT INTO books (cover_i, title, rating, notes, date) VALUES ($1, $2, $3, $4, $5)", [cover, title, rating, notes, date]);
    res.redirect("/");
});

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const bookData = await db.query("SELECT * FROM books WHERE id = $1", [id]);
        res.render("notes.ejs", {
            book: bookData.rows
        });
    }catch(e){
        console.log(`Book with id ${id} does not exist`);
        res.redirect("/");
    }
});

app.get("/edit/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const bookData = await db.query("SELECT * FROM books WHERE id = $1", [id]);
        res.render("addBook.ejs", {
            book: bookData.rows[0]
        });
    }catch(e){
        console.log(`Book with id ${id} does not exist`);
        res.redirect("/");
    }
});

app.post("/edit", async (req, res) => {
    const id = parseInt(req.body.id);
    console.log(id);
    const title = req.body.title;
    const rating = parseInt(req.body.rating);
    const notes = req.body.notes;
    const date = req.body.date;
    const book = {
        id: id,
        title: title,
        rating: rating,
        notes: notes,
        date: date
    }
    if(!title || !notes || !date || isNaN(rating)){
        return res.render("addBook.ejs", {
            book: book,
            error: "Please fill all the fields correctly."
        });
    }
    let cover = 0;
    try{
        const result = await axios.get("https://openlibrary.org/search.json", {
        params: {
            title: title
        }
    });
    if (result.data.docs.length > 0) {
        cover = result.data.docs[0].cover_i;
    }
    if(cover == null){
        cover = 0;
    }
    }catch(e){
        console.log("Could not fetch cover image for this book");
    }
    await db.query("UPDATE books SET cover_i = $1, title = $2, rating = $3, notes = $4, date = $5 WHERE id = $6", [cover, title, rating, notes, date, id]);
    res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try{
        await db.query("DELETE FROM books WHERE id = $1", [id]);
    }catch(e){
        console.log(`Book with id ${id} does not exist`);
    }
    res.redirect("/");
});

app.listen(port, (err, res) => {
    console.log(`Server Running on Port ${port}`);
});


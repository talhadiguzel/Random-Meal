const { json } = require('body-parser');
const express = require('express');
const request = require("request");
const path = require('path');

const app = express();
app.use(express.static("public"));

// JSON verisini saklamak için global bir değişken
let jsonData;
let data = '';


app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

// GET isteği ile ana sayfayı gönderme
app.get('/', (req, res) => {
    // jsonData değişkenini index.ejs şablonuna gönder
    res.render("index.ejs", { recipe: jsonData});
});

// POST isteği ile API'den veri çekme ve ana sayfayı yeniden render etme
app.post('/recipe', (req, res) => {
    const url="https://www.themealdb.com/api/json/v1/1/random.php";
    request(url, (error, response) => {
        jsonData = JSON.parse(response.body);
        jsonData = jsonData.meals[0];
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

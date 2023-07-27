require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));


// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.send('Hello');
});


app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
});

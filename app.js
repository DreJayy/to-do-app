const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

// template engine setup

app.set('view engine', 'ejs');
// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);


// port
app.listen(8000, () => { 
    console.log("Server running on http://localhost:8000/todo");
}) 
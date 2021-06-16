require('./models/db')

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const employeeControler = require('./controllers/employeeController');

const app = express();

mongoose.set("useFindAndModify", false);

app.use(bodyparser.urlencoded({
  extended: true,
}));
app.use(bodyparser.json());
app.set('views',  path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({  extname:  'hbs' , defaultLayout: 'mainLayout', layoutsDir: __dirname + "/views/layouts/" }));
app.set('views engine', 'hbs');

app.listen(3000, () => {
  console.log("Express server started at port: 3000");
});

app.use('/employee', employeeControler)
app.use(express.static('.'))
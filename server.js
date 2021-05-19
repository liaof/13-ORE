const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const path = require('path');// for stylesheet

const exphbs = require('express-handlebars');// for Handlebars.js
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));// for stylesheet

// turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);// for Handlebars.js
app.set('view engine', 'handlebars');

// turn on connection to db and server
// 'sync' means Sequelize is taking the models and conecting them to associated database tables. if there is no table it'll craete one
// if force:true, we will make the tables re-create if ther are any association changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

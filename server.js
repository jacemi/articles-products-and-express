const express = require('express'); 
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const handlebars = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json({}));
app.use(methodOverride('_method'));

const hbs = handlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('index.html content');
});

app.listen(PORT, (err) => {
  console.log(`server running on port ${PORT}`)
})

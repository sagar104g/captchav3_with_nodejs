const express = require('express');
const app = express();
var mongoConnection = require('./services/mongo');
var bodyParser = require('body-parser');
var config = require('./config/config');
var user = require('./routes/userForm');
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/captcha', function(req, res) {
  res.render('reCAPTCHA');
});

app.use('/user', user);

app.get('/status', function (req, res) {
  res.json({ "status": "ok" })
})

Promise.all(mongoConnection.mongoPromise).then(function () {
    app.listen(config.servicePort, function () {
        console.info("Server is running on "+config.servicePort+" port");
      });
}).catch(function (err) {
  console.log(err)
})

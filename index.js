// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  var { date } = req.params;
  if(date == null) {
    var actuDate = new Date();
    var newDateTimestamp = Date.parse(actuDate) // convert date to timpstampe
    //var dateDay = actuDate.toLocaleString('en-us', {weekday:'short'}) // get day
    var dateUtc = actuDate.toUTCString();
    res.json({unix: newDateTimestamp, utc: dateUtc});
  }
  else {
    let dateString = req.params.date;
    if (!isNaN(Date.parse(dateString))) {
      let dateObject = new Date(dateString);
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    } else if (/\d{5,}/.test(dateString)) {
        let dateInt = parseInt(dateString);
        res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

//for null date value
app.get("/api", function(req, res) {
  var actuDate = new Date();
  var newDateTimestamp = Date.parse(actuDate) // convert date to timpstampe
  //var dateDay = actuDate.toLocaleString('en-us', {weekday:'short'}) // get day
  var dateUtc = actuDate.toUTCString();
  res.json({unix: newDateTimestamp, utc: dateUtc});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

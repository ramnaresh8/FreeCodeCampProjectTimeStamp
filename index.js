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

app.get('apiOLD/:date_string?', (req, res) => {

  const { date_string } = req.params; //user's input

  let dateLocal;
  // make valid date
  if (date_string == null)
    dateLocal = new Date();
  else 
    dateLocal = new Date(parseInt(date_string));

    const date = new Date(dateLocal.getTime() + 
    (dateLocal.getTimezoneOffset() * 60000)); //GMT date time

    //console.log('date_string = ' + date_string);

    // if date is not valid
    if (date.toString() == 'Invalid Date') {
      res.json({ "error": "Invalid Date"})
    }

    // if date is valid
    if (typeof (parseInt(date_string === 'Number')) && 
  date.toString().length <= 16) {
    res.json({
      unix: new Date(parseInt(date_string)).getTime(),
      utc: new
  Date(parseInt(date_string)).toUTCString()
    })
  }

  if (date) {
    //user input is yyyy-mm-dd
    res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString()
    })
  }
});

app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date || "";
  let date;

  if(!dateString || dateString == null || dateString ==""){
    // If date parameter is empty or null or probably not needit: || dateString == "
    //date = new Date();
    const now = new Date();
    // date = now.toGMTString();
    date = now;
    console.log('dateString is empty = ' + dateString);
  } else {
    const isNumeric = /^\d+$/.test(dateString)
    if (isNumeric)
      date = new Date(parseInt(dateString));
    else
      date = new Date(dateString);

      //date = new Date(dateString.getTime() + (dateString.getTimeXoneOffset() * 60000));
      // GMT date time
      console.log('dateString = ' + dateString);

      if(isNaN(date.getTime())) {
        // if date is invalid
        res.json({
          error: "Invalid Date"
        });
        return;
      }
  }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
});

app.get('/api/apiOLD/:date?', (req, res) => {
  const { date } = req.params;

  if( date == null)
    return res;

  const parsedDate = isNaN(date) ? new Date(date) : new Date(parseInt(date, 10));
  if(!isNaN(parsedDate.getTime())){
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    })
  } else {
    res.json({ error: 'Invalid Date'});
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

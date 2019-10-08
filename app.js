const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const notesRouter = require("./routes/notesRouter");
const rootRouter = require("./routes/rootRouter");

// INITIALIZE EXPRESS
const app = express();

// setup veiw engine
app.set("view engine", "ejs");

// setup logger
app.use(logger("dev"));

// setup cookie-parser
app.use(cookieParser());

// express.urlencoded is used to parse the form inputs into the "body" property
// in our 'req' object
app.use(express.urlencoded({ extended: true }))

// function setCookies(req, res, next) {
const setCookies = function(req, res, next) {
  // Read cookies from the request object using 'req.cookies'
  const username = req.cookies.username;
  // SET GLOBALLY AVAILABLE LOCAL VARIABLES
  res.locals.username = username || '';
  // The third argument to all middlewares is a callback function next()
  next();
}

// MUST SPECIFY FOR THE APP TO USE THE MIDDLEWARE FUNCTION DEFINED ABOVE
app.use(setCookies);

app.use(methodOverride((req, res) => {
  // check form for a input with name attribute of `_method`
  // if it exists then let methodOverride set the current HTTP verb
  // to whatever the value of `_method` is
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  }
}));

app.use("/notes", notesRouter);
app.use("/", rootRouter);

// tells express to spinup a http server and listen to localhost::3000
const PORT = 3000;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`listening on ${ADDRESS}:${PORT}`);
});




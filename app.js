var cookieSession = require("cookie-session");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var config = require("./config");
var mongoose = require("mongoose");

mongoose.connect(config.dbClient, {
  tls: true,
  // location of a local .pem file that contains both the client's certificate and key
  tlsCertificateKeyFile: config.tlsCertificateKeyFile,
  authMechanism: "MONGODB-X509",
  authSource: "$external",
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connect");
});

var indexRouter = require("./routes/index");
var newsRouter = require("./routes/news");
var adminRouter = require("./routes/admin");
var quizRouter = require("./routes/quiz");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: "session",
    keys: config.keySession,

    // Cookie Options
    maxAge: config.maxAgesession,
  })
);

app.use((req, res, next) => {
  res.locals.path = req.path;
  console.log(res.locals);
  next();
});

app.use("/", indexRouter);
app.use("/news", newsRouter);
app.use("/quiz", quizRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

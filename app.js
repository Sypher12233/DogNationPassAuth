// Import packages
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// App config
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// Import Passport config
require("./config/passport");

// Session Config
app.use(
  session({
    secret: "alsdkfasld",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3000,
      secure: true,
      sameSite: "none",
    },
  })
);

// initializing passport;
app.use(passport.initialize());

// registering session as middleware;
app.use(passport.session());

// Routes
app.use(require("./routes/index.routes"));

app.get("/", (req, res) => {
  const user = req.user || "Guest";
  res.render("home", { user });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

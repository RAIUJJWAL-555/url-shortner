const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const {restrictTo,checkForAuthentication} = require("./middleware/auth")
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static");
const userRoute = require("./routes/user");
const cookie = require("express-session/session/cookie");
const cookieParser = require('cookie-parser');


const app = express(); 
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => {
    console.log("MongoDB connected");});


app.set("view engine","ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);



app.use("/url",restrictTo("NORMAL"), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);



app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });



app.listen(PORT, () => {
    console.log(`Server runs successfully on port ${PORT}`); 
});

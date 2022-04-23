const express = require("express");

const postRouter = require("./const/router.const")
const authRouter = require("./const/auth.const");


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(postRouter)

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
    console.log(`servers is up and running at port ${PORT}`)
});
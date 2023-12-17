import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const blogs = [];

// app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/new_post", (req, res) =>{
    res.render("new_post.ejs");
});
app.post("/new_post", (req, res) =>{
    var postTile = req.body['postTile'];
    var postContent = req.body['postContent'];

    const postObj = {
        "title":postTile,
        "content":postContent
    }
    blogs.push(postObj);
    res.render("view_post.ejs", {todaysBlog: blogs});
})

app.get("/view_post", (req, res) =>{
    res.render("view_post.ejs", {todaysBlog: blogs});
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
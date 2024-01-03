import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [];
let nextBlogId = 1;
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
        id: nextBlogId++,
        title: postTile,
        content: postContent
    }
    blogs.push(postObj);
    res.render("view_post.ejs", {todaysBlog: blogs}); 
});

app.get("/view_post", (req, res) =>{
    res.render("view_post.ejs", {todaysBlog: blogs});
});

app.get("/update_post/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const blogToUpdate = blogs.find(blog => blog.id === id);

    if (blogToUpdate) {
        res.render("update_post.ejs", { blog: blogToUpdate });
    } else {
        res.status(404).send("Blog post not found");
    }
});

app.post("/update_post/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const blogToUpdate = blogs.find(blog => blog.id === id);

    if (blogToUpdate) {
        blogToUpdate.title = req.body['postTitle'];
        blogToUpdate.content = req.body['postContent'];
        res.redirect("/view_post");
    } else {
        res.status(404).send("Blog post not found");
    }
});

app.post("/delete_post/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const index = blogs.findIndex(blog => blog.id === id);

    if (index !== -1) {
        const deletedPost = blogs.splice(index, 1);
        res.json({ success: true, message: "Post deleted successfully" });
    } else {
        res.status(404).json({ success: false, message: "Blog post not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
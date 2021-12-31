const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require('dotenv').config({path:'./.env'});
const app = express();
require('./prod')(app);
const PORT = process.env.PORT || 3000 ;

//connect to mongodb
const dbURI = process.env.MNDB_STRING;

//after the db is connected we want a server to start listening
mongoose
  .connect(dbURI)
  .then((result) => {
      console.log("Listening ...")
      app.listen(PORT);
    })
  .catch((err) => console.log(err));


//register view engine
app.set("view engine", "ejs");
//defult name is views and it look for
//views folder as mine is save as pages so i am resetting it
app.set("views", "pages");

//for static files
app.use(express.static("public"));

//is based on body perser (req.body)
app.use(express.urlencoded({ extended: true }));
// Creating handlers



//for home page
app.get("/", (req, res) => {
  
  res.redirect("/blogs");
});

//for about page
app.get("/about", (req, res) => {
  // res.sendFile('./pages/about.html',{root: __dirname});
  res.render("about", { title: "About" });
});

// for showing all blogs
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// handling post method
app.post("/blogs", (req, res) => {
//   console.log(req.body);
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });

  blog.save()
  .then(result => res.redirect('/blogs'))
  .catch(err => console.log(err));
});

//for redering create
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "blog" });
  });

// for redering blog details
app.get('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details',{title:"Details", blog:result})
    })
    .catch(err =>{
        console.log(err)
    })
});

//for blog delete
app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id ;
    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect : '/blogs'})
    })
    .catch(err=>{
        console.log(err);
    });
});




//error page
//this is going to excucute for every request
//but its position matters
//if any request carry upto this point at doesn't match any above urls
//then this is goting to excute
app.use((req, res) => {
  // res.status(404).sendFile('./pages/error.html',{root: __dirname});
  res.status(404).render("error", { title: "404" });
});

// *******************************************************************************************
//listen for requests
// app.listen(3000);

// app.use((req,res,next)=>{
//     console.log('New Requests comming ... ');
//     console.log(req.url,req.method);
//     next();
// });


//redirect
// app.get('/about-me',(req,res)=>{
//     res.redirect('/about');
// })
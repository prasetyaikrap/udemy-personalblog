
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const homeContent = "Amet ut ea eu dolore ipsum proident nulla dolore excepteur sit pariatur adipisicing ea nostrud. Proident amet duis exercitation culpa aliquip consequat. Esse irure et nostrud velit mollit quis deserunt est aliqua anim veniam minim nulla. Nulla excepteur commodo eiusmod non ex minim consectetur ex in consectetur irure aliquip. Quis in ipsum amet velit in voluptate cupidatat sunt. Dolore culpa qui ea proident aliquip voluptate velit ullamco ea aliqua. Eiusmod pariatur velit magna nisi et mollit ex. Labore ea est id Lorem amet mollit sunt duis exercitation et proident esse quis. Aute duis excepteur irure laboris officia et non eu dolor sunt ex. Officia nostrud occaecat Lorem magna ad cupidatat ad elit laborum ipsum voluptate officia id est.";
const aboutContent = "Minim pariatur reprehenderit excepteur proident amet aliqua Lorem. Est consequat quis veniam amet fugiat. Magna cillum incididunt veniam elit velit proident. Ut do exercitation minim in ex do. Adipisicing sunt ad aliqua nulla Lorem sit. Amet amet occaecat culpa sunt sunt laboris commodo. Incididunt deserunt mollit sunt sunt proident amet ipsum.";
const contactContent = "Duis ullamco ex eu non id excepteur. Et anim anim velit proident incididunt commodo duis. Anim amet qui magna reprehenderit adipisicing duis non ut reprehenderit dolor. Eiusmod minim non elit in sint dolore ea irure magna exercitation elit sit do. Mollit irure ex elit excepteur anim reprehenderit dolor est elit pariatur magna fugiat in officia.";
const app = express();

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

let postdb = [];
app.get("/", function(req, res){
  res.render("home",{
    hc: homeContent,
    post: postdb
  });
});
app.get("/about", function(req, res){
  res.render("about", {
    ac: aboutContent
  });
});
app.get("/contact", function(req, res){
  res.render("contact", {
    cc: contactContent
  });
});
app.get("/compose", function(req, res){
  res.render("compose");
});
app.post("/compose", function(req, res){
  const formObject = {
    title: req.body.title,
    message: req.body.message
  };
  postdb.push(formObject);
  res.redirect("/");
});
app.get("/posts/:title", function(req, res){
  const reqtitle = req.params.title;
  if(postdb.length<=0){
    res.render("posts", {
      postTitle: "Sorry, The post is doesnt exist or has been removed",
      postMessage: ""
    });
  }
  postdb.forEach(function(a){
    const postlist = a.title.replace(" ","-");
    if(postlist.toLowerCase() === reqtitle.toLowerCase()){
      res.render("posts", {
        postTitle: a.title,
        postMessage: a.message
      });
    } 
    else {
      res.render("posts", {
        postTitle: "Sorry, The post is doesnt exist or has been removed",
        postMessage: ""
      });
    }
  });
});

app.listen("3000", function() {
  console.log("Server running at PORT 3000");
});
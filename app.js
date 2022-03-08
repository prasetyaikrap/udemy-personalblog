const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const homeContent =
  "Hello, Nama saya Prasetya. Project Personal Blog ini khusus saya buat untuk melatih kemampuan saya membangun Web Aplikasi menggunakan HTML5, CSS, Javascript, Express, dan EJS. Anda bisa menambahkan satu post baru dengan mengakses link COMPOSE. Data yang diinput bersifat sementara karena saya belum mengimplementasikan database pada aplikasi ini";
const aboutContent =
  "Setiap pergantian halaman akses diatur oleh app.js, yaitu mengatur route alamat akses dan disesuikan oleh halaman yang akan diakses yang kemudian di render tergantung pada template EJS yang di-request";
const contactContent =
  "Thank you for your visit. Untuk menghubungi saya dapat melalui email prasetya.ikrapriyadi@gmail.com dan Whatsapp 6285846084778";
const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

let postdb = [];
app.get("/", function (req, res) {
  res.render("home", {
    hc: homeContent,
    post: postdb,
  });
});
app.get("/about", function (req, res) {
  res.render("about", {
    ac: aboutContent,
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    cc: contactContent,
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const formObject = {
    title: req.body.title,
    message: req.body.message,
  };
  postdb.push(formObject);
  res.redirect("/");
});
app.get("/posts/:title", function (req, res) {
  const reqtitle = req.params.title;
  if (postdb.length <= 0) {
    res.render("posts", {
      postTitle: "Sorry, The post is doesnt exist or has been removed",
      postMessage: "",
    });
  }
  postdb.forEach(function (a) {
    const postlist = a.title.replace(" ", "-");
    if (postlist.toLowerCase() === reqtitle.toLowerCase()) {
      res.render("posts", {
        postTitle: a.title,
        postMessage: a.message,
      });
    } else {
      res.render("posts", {
        postTitle: "Sorry, The post is doesnt exist or has been removed",
        postMessage: "",
      });
    }
  });
});

app.listen("3000", function () {
  console.log("Server running at PORT 3000");
});

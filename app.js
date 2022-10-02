const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

//models
const Blog = require("./models/blogs");

//routes
const blogRoutes = require("./routes/blogRoutes");

const mongoUri =
  "mongodb+srv://admin:admin@blogs.dvnw4ff.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page Not Found" });
});

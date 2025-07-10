const express = require("express");
const News = require("../models/news");
const router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

/* GET home page. */
router.get("/", async (req, res, next) => {
  const data = await News.find({});
  console.log(data);
  res.render("admin/index", { title: "Admin", data });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Dodaj news", errors: {}, body: {} });
});

router.post("/news/add", (req, res) => {
  let body = req.body;
  let errors;
  const newsData = new News(body);
  errors = newsData.validateSync();
  if (!errors) {
    try {
      newsData.save();
      body = {};
    } catch (err) {
      console.log(err);
    }
  }

  if (errors === undefined) {
    errors = "";
  }
  console.log(errors.errors);
  res.render("admin/news-form", { title: "Dodaj news", errors, body });
});

router.get("/news/delete/:id", async (req, res) => {
  console.log("delete");
  await News.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const search = req.query.search || "";

  const findNews = News.find({ title: new RegExp(search.trim(), "i") }).sort({
    created: -1,
  });

  const data = await findNews.exec();

  res.render("news", { title: "News", data, search });
});

module.exports = router;

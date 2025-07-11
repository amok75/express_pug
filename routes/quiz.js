const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const show = !req.session.vote;

  const data = await Quiz.find({});
  let sum = 0;
  data.forEach((item) => (sum += item.vote));
  console.log(sum);
  res.render("quiz", { title: "Quiz", data, show, sum });
});

router.post("/", async (req, res) => {
  const id = req.body.quiz;

  const data = await Quiz.findOne({ _id: id });
  data.vote = data.vote + 1;
  await data.save();
  req.session.vote = 1;
  console.log(data);

  res.redirect("quiz");
});

module.exports = router;

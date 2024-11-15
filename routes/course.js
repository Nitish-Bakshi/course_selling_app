const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db");

courseRouter.get("/purchases", function (req, res) {
  res.json({
    message: "this is purchases router",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "this is preview router",
  });
});

module.exports = {
  courseRouter,
};

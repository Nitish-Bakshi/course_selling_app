const { Router } = require("express");
const userRouter = Router();
const { UserModel } = require("../db");

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "this is signup route",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "this is signin route",
  });
});

userRouter.post("/purchase", function (req, res) {
  res.json({
    message: "this is purchases route",
  });
});

module.exports = {
  userRouter,
};

const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CourseModel } = require("../db.js");
const { adminAuth } = require("../middlewares/admin-auth.js");
require("dotenv").config();
const JWT_SECRET_ADMIN = "hhihisdcsdic";

adminRouter.post("/signup", async function (req, res) {
  const validBody = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(25),
  });
  const validation = validBody.safeParse(req.body);
  if (!validation.success) {
    res
      .json({
        message: "put some valid inputs ",
        error: validation.error.errors,
      })
      .status(500);
  }
  const { email, password, firstName, lastName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await AdminModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    res.json({
      message: "you are signed up",
    });
  } catch (e) {
    res
      .json({
        message: "error in putting data in db ",
      })
      .status(500);
  }
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const foundUser = await AdminModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { id: foundUser._id.toString() },
        JWT_SECRET_ADMIN
      );

      return res.json({
        message: "Signed in successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Sign-in failed, please try again later.",
    });
  }
});

adminRouter.post("/course", adminAuth, async function (req, res) {
  const { title, description, price, image_url } = req.body;
  const creatorId = req.adminId;

  try {
    const course = await CourseModel.create({
      title,
      description,
      image_url,
      price,
      creatorId,
    });
    res.json({
      message: "course created successfully",
      courseId: course._id,
    });
  } catch (error) {
    res.json({
      message: "error in putting course content in db",
    });
  }
});

adminRouter.put("/course", adminAuth, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  // creating a web3 saas in 6 hours
  const course = await CourseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminAuth, async function (req, res) {
  const adminId = req.userId;
  const courses = await CourseModel.find({
    creatorId: adminId,
  });
  res.json({
    courses,
  });
});

module.exports = {
  adminRouter,
};

/*
1 generated token with {_id}



*/

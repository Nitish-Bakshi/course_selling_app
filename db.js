const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
});

const AdminSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
});
const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  image_url: String,
  creatorId: ObjectId,
});

const PurchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", UserSchema);
const AdminModel = mongoose.model("admins", AdminSchema);
const CourseModel = mongoose.model("courses", CourseSchema);
const PurchaseModel = mongoose.model("purchases", PurchaseSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};

const express = require("express");
const UserModel = require("./usersSchema");
const { authenticate } = require("../authTools");
const { jwtauth } = require("../auth");
const bcrypt = require("bcryptjs");

usersRouter = express.Router();
usersRouter.post("/login", async (req, res, next) => {
  try {
    console.log("user", req.body.password);
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);

    const tokens = await authenticate(user);

    res.cookie("accessToken", tokens, { httpOnly: true });
    res.send("ok");
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/register", async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const newUser = await new UserModel(req.body);
    await newUser.save();

    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/", jwtauth, async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});
module.exports = usersRouter;

const express = require("express");
const UserModel = require("./usersSchema");
const { authenticate } = require("../authTools");
const { jwtauth } = require("../auth");

usersRouter = express.Router();
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);
    console.log("user", user);
    const tokens = await authenticate(user);
    console.log("tokens", tokens);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/", jwtauth, async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});
module.exports = usersRouter;

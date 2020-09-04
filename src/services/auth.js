const UserModel = require("./users/usersSchema");
const { verifyJWT } = require("./authTools");
const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("MY TOKEN", token);
    // const decoded = await verifyJWT(token);

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    const user = await UserModel.findOne({ _id: decoded._id });
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { jwtauth: authorize };

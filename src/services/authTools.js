const jwt = require("jsonwebtoken");

const authenticate = async (user) => {
  console.log("here");
  try {
    const newAccessToken = await generateJWT({ _id: user._id });
    console.log("Access Token", newAccessToken);
    return { newAccessToken };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "15 week" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    )
  );
const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
      if (err) rej(err);
      res(verified);
    })
  );

module.exports = { authenticate, verifyJWT };

const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const userExists = await User.exists({ mail });

    if (userExists) {
      return res.status(409).send("E-mail sudah terpakai");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        uesrname: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).send("Error ");
  }
};

module.exports = register;

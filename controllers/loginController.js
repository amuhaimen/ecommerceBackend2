const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
  let { email, password } = req.body;

  let existingUser = await User.find({ email });
  if (existingUser.length == 0) {
    res.send({ error: "Credential is not valid" });
  } else {
    bcrypt.compare(password, existingUser[0].password, function (err, result) {
      if (result) {
        res.send({ success: "successfully login" });
      } else {
        res.send({ error: "Credential is not valid" });
      }
    });
  }
};

module.exports = loginController;

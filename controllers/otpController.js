const User = require("../model/userSchema");

let otpController = async (req, res) => {
  let { email, otp } = req.body;

  let data = await User.find({ email: email });
  if (data[0].otp == otp) {
    await User.findOneAndUpdate({ email: email }, { otp: "", verify: true });
    res.send("otp successfully matched");
  } else {
    res.send("otp did't match,try again.....");
  }
};

module.exports = otpController;

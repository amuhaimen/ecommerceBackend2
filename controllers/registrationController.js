const emailValidation = require("../helpers/emailValidation");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

let registrationController = async (req, res) => {
  let { name, email, password } = req.body;
  let existingUser = await User.find({ email: email });

  if (existingUser.length == 0) {
    if (!name) {
      res.send("name required");
    } else if (!email) {
      res.send("email required");
    } else if (!password) {
      res.send("password required");
    } else {
      if (email) {
        if (!emailValidation(email)) {
          return res.send("Valid email Required");
        } else {
          let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
          });
          bcrypt.hash(password, 10, async function (err, hash) {
            let user = new User({
              name: name,
              email: email,
              password: hash,
              otp: otp,
            });
            user.save();

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "mernmuhaimen2201@gmail.com",
                pass: "fbod vemt kkcd qaqa",
              },
            });

            const info = await transporter.sendMail({
              from: "mernmuhaimen2201@gmail.com", // sender address
              to: email, // list of receivers
              subject: "verify your email", // Subject line
              html: ` <div>verify your email in this link<a href='#'>Click here</a>${otp}</div>`, // html body
            });

            res.send(user);
          });
        }
      }
    }
  } else {
    res.send("Email Already Exists!");
  }
};

module.exports = registrationController;

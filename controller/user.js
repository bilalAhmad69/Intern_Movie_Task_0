const { User } = require("../models/User");
const emailSender = require("../services/mailSender");
const bcrypt = require("bcrypt");

// post User
const postUser = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    // checking if user already registered than return
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send("User already Registerd");
    user = new User({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashPassword,
    });

    await user.save();
    //  function for generating token
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send("User Successfully Registered");
  } catch (e) {
    res.send(e.message);
  }
};
//  update Password

const updatePassowrd = async (req, res) => {
  if (!req.body.password) return res.send("kindly enter the Paswword");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found");
    user.password = hashPassword;
    await user.save();
    const acknowledge = await emailSender(
      req.body.email,
      "Your Account was Updated Account",
      "Password Updated Successfully"
    );
    res.send(acknowledge);
  } catch (e) {
    res.send(e.message);
  }
};

exports.postUser = postUser;
exports.updatePassowrd = updatePassowrd;

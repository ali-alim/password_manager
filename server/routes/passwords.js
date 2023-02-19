const Password = require("../models/Password");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//REGISTER
router.post("/", async (req, res) => {
  try {
    const newPassword = new Password({
      website: req.body.website,
      email: req.body.email,
      password: req.body.password,
      category: req.body.category,
    });

    //save user and respond
    const password = await newPassword.save();
    res.status(200).json(password._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async(req,res) => {
  try{
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch(err) {
    res.status(500).json(err);
  }
})


module.exports = router;

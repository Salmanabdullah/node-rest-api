const router = require("express").Router();
const User = require("../models/User");

router.get("/register", async (req, res) => {
  const user = await new User({
    username: "asif",
    email: "asif@gmail.com",
    password: "1234",
  });

  await user.save();
  res.send("OK");
});

module.exports = router;

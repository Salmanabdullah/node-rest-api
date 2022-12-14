const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        res.status(200).json("password has been updated");
      } catch (error) {
        res.status(400).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    return res
      .status(403)
      .json("You are allowed to update your account only!!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not authorised to delete");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, isAdmin, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });

        res.status(200).json("You are now following " + userToFollow.username);
      } else {
        res.status(400).json("You are already following this user");
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (userToUnfollow.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({ $pull: { following: req.params.id } });

        res.status(200).json("You have unfollowed " + userToUnfollow.username);
      } else {
        res
          .status(404)
          .json("You are not following " + userToUnfollow.username);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json("You can't unfollow yourself");
  }
});

module.exports = router;

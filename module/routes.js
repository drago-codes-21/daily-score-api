import express from "express";
import User from "./user.model.js";
import Score from "./score.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/user/register", async (req, res) => {
  try {
    const { name } = req.body;
    const isAlreadyThere = await User.findOne({ name });
    if (isAlreadyThere) {
      return res.status(400).json({ error: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    const newUser = new User(req.body);

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(400).json({ error: "Invalid credentials.." });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/score/save", async (req, res) => {
  try {
    const score = new Score(req.body);
    const newScore = score.save();
    res.status(200).json(newScore);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/score/get", async (req, res) => {
  try {
    const scores = await Score.find();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

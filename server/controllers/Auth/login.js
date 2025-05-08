const login = (app) => {
  const User = require("../../models/users.js");
  const bcrypt = require("bcrypt");
  const dotenv = require("dotenv");
  dotenv.config();
  const jwt = require("jsonwebtoken");

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      //Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });

      //check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

      //create token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      //Send token

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.log("Login failed", error.message);
      res.status(500).json({ error: "Login failed" });
    }
  });
};

module.exports = login;

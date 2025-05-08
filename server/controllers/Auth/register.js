const register = (app) => {
  const bcrypt = require("bcrypt");
  const User = require("../../models/users");

  app.post("/api/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ exist: "Email already exists" });
      }

      //Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      res.status(201).json({ user: "User registered successfully" });
    } catch (error) {
      console.log("Error registering data: ", error.message);
      res.status(500).json({ error: "Error registering data" });
    }
  });
};
module.exports = register;

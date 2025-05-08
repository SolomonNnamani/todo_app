const resetPassword = (app) => {
  const bcrypt = require("bcrypt");
  const User = require("../../models/users");
  const dotenv = require("dotenv");
  dotenv.config();
  const jwt = require("jsonwebtoken");

  app.post("/api/reset-password", async (req, res) => {
    const { token, password } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired reset token" });
      }
      //Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined
      await user.save()

      res.status(200).json({message: "Password reset successful"})



    } catch (error) {
      console.log("Error resetting Pssword! ", error.message);
      res.status(500).json({ message: "Invalid or expired token." });
    }
  });
};

module.exports = resetPassword;

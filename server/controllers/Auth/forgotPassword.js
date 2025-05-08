const forgotPassword = (app) => {
  const User = require("../../models/users");
  const dotenv = require("dotenv");
  const jwt = require("jsonwebtoken");
  const nodemailer = require("nodemailer");

  dotenv.config();

  app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not registered" });
      }
      //Generate reset token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; //15 minutes

      //link in console for learning purpose
      const resetUrl = `http://localhost:5173/reset-password/${token}`;
      console.log("Reset link:", resetUrl);


      //Setup Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
          user:process.env.EMAIL_USER, //your email
          pass: process.env.EMAIL_PASS, //app password
        }
      })

      const mailOptions = {
        from: `"TaskFlow Support" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Request",
        html:`
        <p>Hello ${user.firstName},</p>
        <p> You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetUrl}">${resetUrl} </a>
        <p>This link will expire in 15 minutes. </p>
        <p>if you didnt request this, please ignore this email. </p>
        `,
      }

      await transporter.sendMail(mailOptions);





      await user.save();

      res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
      console.log("Forgot password error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  });
};

module.exports = forgotPassword;

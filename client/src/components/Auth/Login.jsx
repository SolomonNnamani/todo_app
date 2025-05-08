import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    const errors = {
      email: "",
      password: "",
    };

    let isValid = true;

    if (email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    ) {
      errors.email = "Please a valid email address";
      isValid = false;
    }

    if (password.trim() === "") {
      errors.password = "password is required";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&.,#^+=_-]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters and contain uppercase, number and special character";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const { ...dataToSend } = formData;
    setIsSubmitting(true);
    try {
      const response = await fetch("https://todo-app-nyc1.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        alert('Invalid Username and password!')
      }

      const data = await response.json();
      console.log("Login successful", data);
      if(data.token){
        localStorage.setItem('token', data.token); //store User Token in frontend
        console.log("Logged in!")
        navigate("/");
      }
      setFormData({
        email: "",
        password: "",
      });
      //Homepage
      
    } catch (error) {
      console.log("Login failed", error.message);
      alert('Login failed, please try again')
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" h-screen w-full  ">
      {/* header */}
      <div className="bg-black  text-center h-32 pt-5 border-b-8 border-b-lime-400 ">
        <h1 className="text-white font-bold text-3xl mb-3 ">TaskFlow</h1>
        <p className="text-gray-300 tracking-wider">Login to your account</p>
      </div>

      {/* login form */}
      <div className=" px-4 py-10 md:w-1/2 m-auto">
        <form onSubmit={handleSubmit}>
          {/*Email*/}
          <label htmlFor="loginEmail" className="font-semibold ">
            Email
          </label>
          <br />
          <input
            type="email"
            id="loginEmail"
            placeholder="abc@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && (
            <p className=" text-red-500 px-1 font-bold text-sm">
              {error.email}
            </p>
          )}
          <br />
          {/*password*/}
          <div className="relative">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-52"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-5 top-13 cursor-pointer "
            >
              {" "}
              {showPassword ? "🙈" : "👁️"}
            </span>
            {error.password && (
              <p className=" text-red-500 px-1 font-bold text-sm">
                {error.password}
              </p>
            )}
          </div>

          <br />
          <button
            type="submit"
            className="w-full my-7 text-lime-400 bg-black p-3
          rounded-xl cursor-pointer "
          >
            {isSubmitting ? "Authenticating..." : "Log in"}
          </button>
        </form>
        <button 
        
        className="forgot w-full mb-7 p-2 font-light underline  cursor-pointer  ">
          <a href="/forgotPassword">Forgot Password?</a>
        </button>

        {/*New Account */}
        <div className="flex justify-center ">
          <p>Don't have an account?</p>
          <a href="/register" className="font-semibold px-1">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';


const resetPassword = () => {
  const [pwd, setPwd] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const {token} = useParams()


  const handleChange = (e) => {
    let { name, value } = e.target;
    setPwd((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    const { password, confirmPassword } = pwd;
    let isValid = true;

    // Create a fresh errors object each time
    let errors = {
      password: "",
      confirmPassword: "",
    };

    if (password === "") {
      errors.password = "Password is required";
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

    if (confirmPassword === "") {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Set the error state with the errors object
    setError(errors);

    // Return whether the form is valid
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validatePassword();
    if (!isValid) return;


    const { confirmPassword, password } = pwd;
    

    setError({
      password: "",
      confirmPassword: "",
    });
    
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password:password,token }),//send token here
      });
      const data = await response.json();
      if (!response.ok) {
        alert(
          data.message ||
            "Server busy, cannot reset password at the moment. Please try again later"
        );
        setLoading(false);
        return;
      }
       setSuccess(true);
      setLoading(false);
      navigate("/login");
     
      alert(data.message);
    } catch (error) {
      console.log("Error processing request: ", error.message);
      alert('Error changing password, please try again!')
    }
  };

  return (
    <div className="h-screen w-full ">
      <div className="bg-black  text-center h-32 pt-5 border-b-8 border-b-lime-400 ">
        <h1 className="text-white font-bold text-3xl mb-3 ">TaskFlow</h1>
        <p className="text-gray-300 tracking-wider">Reset Password Here!</p>
      </div>

      <div className="px-5 py-5 md:w-1/2 md:m-auto">
        {success ? (
          <div className="text-center text-green-600 ">
            <p>Password has been changed successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/** New Password*/}
            <div className="relative">
              <label htmlFor="resetPassword">New Password: </label>
              <input
                type={showPassword ? "text" : "password"}
                id="resetPassword"
                placeholder="********"
                name="password"
                value={pwd.password}
                onChange={handleChange}
                className="mt-5 block"
              />
              <span
                className="absolute right-5 top-12 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {" "}
                {showPassword ? "🙈" : "👁️"}
              </span>
              {error.password && 
                <p className="text-red-500 text-sm">{error.password}</p>
              }
            </div>

            {/** Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword">Confirm Password </label>
              <input
                type={confirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="********"
                name="confirmPassword"
                value={pwd.confirmPassword}
                onChange={handleChange}
                className="mt-5 block"
              />
              <span
                className="absolute right-5 top-12 cursor-pointer text-gray-600"
                onClick={() => setConfirmPassword((prev) => !prev)}
              >
                {" "}
                {confirmPassword ? "🙈" : "👁️"}
              </span>
              {error.confirmPassword && (
                <p className="text-red-500 text-sm">{error.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full my-7 text-lime-400 bg-black p-3
           rounded-xl cursor-pointer"
            >
              {loading ? "Reseting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default resetPassword;

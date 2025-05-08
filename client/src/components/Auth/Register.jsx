import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const  [isSubmitting, setIsSubmitting] =  useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  
    let isValid = true;
  
    if (firstName.trim() === "") {
      errors.firstName = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{2,30}$/.test(firstName.trim())) {
      errors.firstName = "First name must be 2-30 letters only";
      isValid = false;
    }
  
    if (lastName.trim() === "") {
      errors.lastName = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{2,30}$/.test(lastName.trim())) {
      errors.lastName = "Last name must be 2-30 letters only";
      isValid = false;
    }
  
    if (email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }
  
    if (password === "") {
      errors.password = "Password is required";
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&.,#^+=_-]{8,}$/.test(password)) {
      errors.password = "Password must be at least 8 characters and contain uppercase, number and special character";
      isValid = false;
    }
  
    if (confirmPassword === "") {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
  
    setError(errors);
    return isValid;
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const isValid = validateForm()

    if(!isValid) return ;

    // Destructure to exclude confirmPassword
    const {confirmPassword, ...dataToSend} = formData
    setIsSubmitting(true)

    try{
      const response = await fetch("https://todo-app-nyc1.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      })
    
      const data = await response.json()
      if (!response.ok) {
        if(data.exist){
          alert(`${data.exist}`)
        }
        throw new Error(data.error || "Registration failed");
      }
      //console.log("Registration sucessful: ", data)
      if(data.user){
        alert('Registration successful')
         setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      navigate("/login");

      }

      
     


    }catch(error){
      console.log("Registration failed:", error.message)
    
    }finally {
      setIsSubmitting(false)
    }

  };

  return (
    <div href="/register">
      {/* header */}
      <div className="bg-black  text-center h-32 pt-5 border-b-8 border-b-lime-400 ">
        <h1 className="text-white font-bold text-3xl mb-3 ">TaskFlow</h1>
        <p className="text-gray-300 tracking-wider">Create your account</p>
      </div>

      {/*register form*/}
      <div className=" px-4 py-10 md:w-1/2 m-auto">
        <form onSubmit={handleSubmit} >
          {/**First Name */}
          <label htmlFor="fname" className="font-semibold">
            First Name
          </label>
          <br />
          <input
            type="text"
            placeholder="e.g Solomon"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
         {error.firstName && <p className=" text-red-500 px-1 font-bold text-sm">{error.firstName} </p>}
          <br />
          {/**Last Name*/}
          <label htmlFor="lname" className="font-semibold">
            Last Name
          </label>
          <br />
          <input
            type="text"
            placeholder="e.g Shelby"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
         {error.lastName && <p className=" text-red-500 px-1 font-bold text-sm">{error.lastName} </p>}
          <br />
          {/**Email */}
          <label htmlFor="regEmail" className="font-semibold">
            Email
          </label>
          <br />
          <input
            type="email"
            placeholder=" abc@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
       {error.email && <p className=" text-red-500 px-1 font-bold text-sm">{error.email} </p>}
          <br />

          {/**Password */}
          <div className="relative">
          <label htmlFor="regPassword" className="font-semibold">
            Password
          </label>
          <br />
          
          <input
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            name="password"
            value={formData.password}
            onChange={handleChange}
           
          />
          <span 
           className="absolute right-5 top-12 cursor-pointer text-gray-600"
          onClick={() => setShowPassword((prev) => !prev)}> {showPassword ? "🙈" : "👁️"}</span>
          {error.password && <p className=" text-red-500 px-1 font-bold text-sm">{error.password} </p>}

          </div>
        
          <br />

          {/**Confirm Password */}
          <div className="relative">
<label htmlFor="confirmPassword" className="font-semibold">
            Confirm Password
          </label>
          <br />
          <input
            type={confirmPassword ? "text" : "password"}
            placeholder="*********"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span 
           className="absolute right-5 top-12 cursor-pointer text-gray-600"
          onClick={() => setConfirmPassword((prev) => !prev)}> {confirmPassword ? "🙈" : "👁️"}</span>
         {error.confirmPassword && <p className=" text-red-500 px-1 font-bold text-sm">{error.confirmPassword} </p>}
          </div>
          

          {/*Submit button */}
          <button
            type="submit"
            className="w-full my-7 text-black bg-lime-400 p-3
          rounded-xl cursor-pointer"
          >
            {isSubmitting ? "Registering...": "Create Account"}
          </button>
        </form>

        <div className="flex justify-center ">
          <p>Already have an account?</p>
          <a href="/login" className="font-semibold px-1">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default register;

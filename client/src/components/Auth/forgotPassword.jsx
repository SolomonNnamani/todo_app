import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://todo-app-nyc1.onrender.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Email is not registered");
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      alert(data.message);
    } catch (error) {
      console.log("Error processing request: ", error.message);
      alert('Cannot retrive information at the moment, please try again later.')
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full ">
      <div className="bg-black  text-center h-32 pt-5 border-b-8 border-b-lime-400 ">
        <h1 className="text-white font-bold text-3xl mb-3 ">TaskFlow</h1>
        <p className="text-gray-300 tracking-wider">
          Restore your password here
        </p>
      </div>

    <div className="px-5 py-5 md:w-1/2 md:m-auto">
    {success ? (
        <div className="text-center text-green-600 ">
          <p>Password reset link sent! Please check your email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="forgotPassword" >Email Address: </label>
          <input
            type="email"
            id="forgotPassword"
            placeholder="abc@gmail.com"
            name="email"
            value={email}
            onChange={handleChange}
            className="mt-5 block"
          />
          <small className="text-xs">
            Enter the email address associated with your account.
          </small>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full my-7 text-lime-400 bg-black p-3
          rounded-xl cursor-pointer"
          >
            {loading ? "Sending...": "Send Reset Link"}
          </button>
        </form>
      )}

      
       </div>
         </div>
  );
};

export default ForgotPassword;

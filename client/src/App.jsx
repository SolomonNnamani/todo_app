import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/forgotPassword"
import ResetPassword from "./components/Auth/resetPassword"
import MainApp from "./components/C_MainApp";
import NotFound from './components/L_NotFound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/dashboard" element={ <MainApp />}/>
        <Route path="/" element={<Login />} />
        <Route path="*" element={ <NotFound />}/> 
         
       
      </Routes>
    </Router>
  );
}

export default App;

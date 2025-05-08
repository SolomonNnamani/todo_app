import React from 'react'
import {useNavigate} from 'react-router-dom'

const LogOut = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        alert("Logging out")
        navigate("/login")
    }
  return (
    <div className=''>
        <button 
        className="border  border-lime-400 rounded p-1  cursor-pointer
        absolute top-6 right-8"
        onClick={handleLogOut}
        >
            Log Out
        </button>

    </div>
  )
}

export default LogOut
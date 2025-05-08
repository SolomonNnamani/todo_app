import React,{useState,useEffect} from "react";
import {fetchWithAuth} from './utils/fetchWithAuth.js'

//Page profile
const I_Profile = () => {
  const [profile, setProfile] = useState({
    initials: "",
    firstName: "",
    lastName:"",
    email:""
  })
   useEffect(() => {
     
      fetchWithAuth("https://todo-app-nyc1.onrender.com/api/profile",{
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) =>setProfile(data))
        .catch((err) => console.log("Error loading tasks", err));
    }, []);
  return (
    <div>
      {" "}
      {/*Profile reference */}
      <div>
        <div className="flex">
          <p className="bg-lime-400 font-bold w-12 p-3 h-12  rounded-full text-center ">
            {profile.initials}
          </p>
          <h2 className="px-4 font-bold ">
           {profile.firstName} {profile.lastName} <br />
            <span className="text-xs font-normal">{profile.email}</span>{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default I_Profile;

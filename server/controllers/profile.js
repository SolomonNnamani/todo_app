const profile = (app) => {
    const User = require("../models/users.js")
    const verifyToken = require("../middleware/verifyToken.js")
    app.get("/api/profile", verifyToken, async(req,res)=> {
        //fetch Profile
        
            const fetchProfile = await User.findById(req.user.id).select("firstName lastName email");
            if(!fetchProfile){
                return res.status(404).json({message:"User not found"})
            }

            //Derive initials
            const initials = `${fetchProfile.firstName[0]}${fetchProfile.lastName[0]}`.toUpperCase();
            res.status(200).json({
                firstName: fetchProfile.firstName,
                lastName:fetchProfile.lastName,
                email:fetchProfile.email,
                initials:initials
            })
        
    })

}
module.exports = profile
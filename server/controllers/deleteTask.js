const Todo = require('../models/mongooseTodo.js')
const verifyToken = require("../middleware/verifyToken.js")

const deleteTask = (app) => {

    app.delete("/api/delete/:id", verifyToken, async(req,res)=> {
        try{
            const {id} = req.params
            const deletedTask = await Todo.findOneAndDelete({
                _id:id,
                userId:req.user.id
            })

            if(!deletedTask){
                return res.status(404).json({message:"Task not found"})
            }
            res.status(200).json({deletedTask})


        }catch(error){
            console.log('Error deleting data', error.message)
            res.status(500).json({error:"Error deleting data"})
        }
    })


}

module.exports = deleteTask

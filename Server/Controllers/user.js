const User = require('../Models/User');




exports.list = async(req,res)=>{
    try{
        console.log('currentUser',req.user)
        const user = await User.find({}).select('-password').exec()
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}

exports.changeRole = async(req,res)=>{
    try{
        console.log(req.body.data)
        const {id,role} =req.body.data

         const user = await User.findOneAndUpdate({_id:id},{role:role},{new:true}).select('-password').exec()
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}

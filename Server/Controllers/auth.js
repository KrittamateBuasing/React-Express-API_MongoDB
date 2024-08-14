const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('../Routes/product');

exports.register = async (req, res) => {
    try {
        // ตรวจสอบผู้ใช้
        const { name, password,email,phone } = req.body;
        

        var user = await User.findOne({ name });

        if (user) {
            return res.status(200).send('User already exists');
        }
        
        // เข้ารหัสรหัสผ่าน
        const salt = await bcrypt.genSalt(10);
       

        const hashedPassword = await bcrypt.hash(password, salt);
     

        user = new User({
            name,
            password: hashedPassword,
            email,
            phone
        });

       

        // บันทึกผู้ใช้ในฐานข้อมูล
        await user.save();

        // ส่งคำตอบ
        res.status(201).send('Register Success');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        // chk user
        const {name,password} = req.body
        var user = await User.findOneAndUpdate({name},{new : true})
        console.log(user);
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).send('Password Invalid')
            }
            // payload
       
            var payload={
                user:{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    userfile: user.userfile,
                    role: user.role,
                }
            }
             // generate token
            jwt.sign(payload,'jtwsecret',{ expiresIn:'1d' },(err,token)=>{
                if(err) throw err;
                res.json({token,payload})
            })
        }else{
            return res.status(400).send('User not found!!')
        }
        
        

        }catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.currentUser = async(req,res)=>{
    try{
        console.log('currentUser',req.user)
        const user = await User.findOne({name:req.user.name}).select('-password').exec()
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const express = require('express')
const {readdirSync} = require('fs')
const productRouters = require('./Routes/product')
const authRouters = require('./Routes/auth')
const bodyParser = require('body-parser')
const connectDB = require('./Config/db')
const morgan = require('morgan')
const cors = require('cors')
//app
const  app =  express();
connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '10mb'}))
app.use('/uploads', express.static('uploads'))
//route 1
// app.get('/product',(req,res)=>{
//     res.send('Hello Enpoint')
// })

//route 2
// app.use('/api',productRouters)
// app.use('/api',authRouters)
//http://localhost:5000/api/auth
//route 3
readdirSync('./Routes').map((r)=> app.use('/api',require('./Routes/'+r)))

app.listen(5000,()=>console.log('Server is Runing on Port 5000'))// start server port......node
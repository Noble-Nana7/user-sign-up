require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT

const mongoose = require('mongoose')
const userRouter = require('./routes/userRoute')


const app = express()

app.use(express.json())
app.use('/api/v1/user', userRouter)


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Internal Server Error'
    })
})


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Database is connected Sucessfully`)
    app.listen(PORT, () => {
    console.log(`App is listening on PORT:${PORT}`)
})
}).catch((error)=>{
    console.log(`Unable to connect: `, error.message)
}) 

const express = require("express")
const mongoose = require("mongoose")
const EmployeeRouter = require("./routes/EmployeeRoutes.js")

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://susuayeaung:Meepont10287@cluster0.0bylp.mongodb.net/101296632_assignment2?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(EmployeeRouter)

app.listen(8089, () => {
    console.log("Server running at http://localhost:8089/")
})

const express = require("express")
const mongoose = require("mongoose")
const EmployeeModel = require("../models/Employee")

const app = express()

app.get("/", (req, res) => {
    res.send("<h1>COMP3123_Assignment2</h1>")
})

//Insert New Employee
app.get("/add", async (req, res) => {
    
    let e = {
        Id: 1005,
        firstname: "Jim",
        lastname: "Reese",
        emailid: "jimreese@email.com"
    }

    //Create employee model object
    let new_employee = new EmployeeModel(e)

    try{
        await new_employee.save(e)
        res.status(200).send("Employee Record Saved")
    }catch(err){
        res.status(500).send(err)
    }
    
})

//Read employee data
app.get("/api/v1/employees", async (req, res) => {
    const e = await EmployeeModel.find({})
    try{
        res.send(e)
    }catch(err){
        res.status(500).send(err)
    }
})

//Create new employee
app.post('/api/v1/employees', async (req, res) => {
    const e = new EmployeeModel(req.body);
    try{
        await e.save();
        res.send(e);
        res.status(200).send("Created successfully!")
    }catch(err){
        res.status(500).send(err);
    }
})

//Read employee data by Id
app.get('/api/v1/employees/:Id', async (req, res) => {
    const eId = req.params.Id

    const e = await EmployeeModel.findById(eId)
    try{
        res.send(e);
    }catch(err){
        res.status(500).send(err);
    }
})

//Updated employee data
app.put('/api/v1/employees/:Id', async (req, res) => {
    try{
        await EmployeeModel.findByIdAndUpdate(req.params.Id, req.body)
        e = await EmployeeModel.save()
        res.send(e)
        res.status(200).send("Updated successfully!")
    }catch(err){
        res.status(500).send(err)
    }
})

//Delete employee
app.delete('/api/v1/employees/:Id', async (req, res) => {
    try{
        const e = await EmployeeModel.findByIdAndDelete(req.params.Id)
        if(!e) {
            return res.status(400).send({
                message: "No employee found!"
            })
        }
        else{
            return res.status(200).send("Deleted successfully!")
        }

    }catch(err){
        res.status(500).send(err)
    }  
})

module.exports = app
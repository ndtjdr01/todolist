const express = require('express');
const { getData, addData, deleteData, updateData, getOneData,updateOneData, addOneData, deleteOneData } = require('../../controller/plan/planController');
const planRoute = new express.Router()

planRoute.get('/',getData);
planRoute.get('/:id',getOneData);
planRoute.post('/add',addData);
planRoute.delete('/delete/:id',deleteData);
planRoute.put('/update/:id',updateData);
planRoute.put('/addOne/:id',addOneData);
planRoute.put('/updateOne/:id',updateOneData);
planRoute.put('/deleteOne/:id',deleteOneData);



module.exports = planRoute;
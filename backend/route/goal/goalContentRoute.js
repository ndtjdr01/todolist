
const express = require('express');
const { getData,addData, deleteData,updateData } = require('../../controller/goal/goalContentController');

const goalContentRoute = express.Router()

goalContentRoute.get('/:id',getData)
goalContentRoute.put('/add/:id',addData)
goalContentRoute.put('/delete/:id',deleteData)
goalContentRoute.put('/update/:id',updateData)

module.exports = goalContentRoute;
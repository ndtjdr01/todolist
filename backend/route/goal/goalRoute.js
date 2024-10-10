const express = require('express');
const { getData, addData, removeData, updateData, getOneData, updateOrderData } = require('../../controller/goal/goalController');

const goalRoute = express.Router();

goalRoute.get('/',getData);
goalRoute.get('/getOne/:id',getOneData);
goalRoute.post('/add',addData);
goalRoute.delete('/remove/:id',removeData);
goalRoute.put('/update/:id',updateData);
goalRoute.get('/update/all',updateOrderData);

module.exports = goalRoute;
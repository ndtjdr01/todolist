const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    text: {type:String,required:true},
    description: {type:String},
    order: {type: Number,required:true},
})

const Goals = mongoose.model.goals|| mongoose.model('goals',goalSchema)

module.exports = Goals;
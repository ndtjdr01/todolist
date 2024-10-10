const mongoose = require('mongoose');

const goalContentSchema = new mongoose.Schema({
    goal: { type: mongoose.Schema.Types.ObjectId,required:true, ref: 'goals' },
    info: [{
        text:{
            type:String,
            required:true
        },
        completed:{
            type: Boolean,
            default:false
        }
    }],
    plan: [{
        text:{
            type:String,
            // required:true
        },
        completed:{
            type: Boolean,
            default:false
        }
    }]
})

const GoalContent = mongoose.models.goalContent||mongoose.model('goalContent',goalContentSchema)

module.exports = GoalContent;
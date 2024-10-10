const mongoose = require('mongoose');
const PlanSchema = new mongoose.Schema({
    // ttd
    name: {
        type: String,
        required: true
    },
    // {title: healthy,content:[pushup,chin up,fuck]}
    description: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: Array,
            default: []
        }
    },
    // [9/9/2024-9/10/2024] 
    time: {
        start: {
            type: String,
            required: true 
        },
        end: {
            type: String,
            required: true
        }
    },
    // get goal days-> [1,2,3,...]
    process: {
        type: Array,
        default: [],
    },
    percent:{
        type:String,
        default: '0%'
    }
})
const PlanModel = mongoose.models.planModel || mongoose.model('planModel', PlanSchema)

module.exports = PlanModel
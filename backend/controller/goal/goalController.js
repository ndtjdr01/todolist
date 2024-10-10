const Goals = require("../../model/goal/goalModel")


const getData = async(req,res) =>{
    try {
        const data = await Goals.find({})
        res.status(200).json(data.sort((a,b)=>a.order-b.order))
    } catch (error) {
        console.log(error)
    }
}

const addData = async(req,res) =>{
    try {
        const maxOrderGoal = await Goals.findOne().sort('-order').exec()
        const maxOrder = maxOrderGoal ? maxOrderGoal.order:0
        const {text,description,order} = req.body
        const result = await new Goals({text,description,order:order||maxOrder +1})
        await result.save()
        const data = await Goals.find({})
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

const removeData = async(req,res) =>{
    try {
        const {id} = req.params
        await Goals.findByIdAndDelete(id)
        res.status(204).json({data:'hehe'})
    } catch (error) {
        console.log(error)
    }
}

const getOneData = async(req,res) =>{
    try { 
        const {id} = req.params
        const data = await Goals.findOne({_id:id})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(404).json({error:'data not found'})
    }
}

const updateData = async(req,res) =>{
    try {
        const {id} = req.params
        const {text,description,order} = req.body
        await Goals.findByIdAndUpdate(id,{text,description,order},{new:true})
        res.status(201).json({keke:'haha'})
    } catch (error) {
        console.log(error)
    } 
}
const updateOrderData = async(req,res)=>{
    try {
        const items = await Goals.find({}).sort({order:1})
        items.forEach((item,index) => {item.order = index+1})
        await Promise.all(items.map(item => item.save()))
        res.status(200).json({success: true,items})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getData, addData,removeData,updateData,getOneData,updateOrderData}
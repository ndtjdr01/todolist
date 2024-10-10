const PlanModel = require("../../model/plan/planModel");
const date = require('date-fns')


// plans
const getData = async (req, res) => {
    try {
        const plan = await PlanModel.find({})
        return res.status(200).send(plan)
    } catch (error) {
        console.log(error)
        return res.status(400).send("error get data")
    }
}
const addData = async (req, res) => {
    try {
        const { name, description, time } = req.body
        const newPlan = new PlanModel({
            name,
            description,
            time,
        })
        await newPlan.save()
        return res.status(201).send(newPlan)
    } catch (error) {
        console.log(error)
        return res.status(400).send("error add data")
    }
}
const deleteData = async (req, res) => {
    try {
        const plan = await PlanModel.findByIdAndDelete(req.params.id)
        if (!plan) return res.status(404).send("Plan not found")
        return res.status(200).send(plan)
    } catch (error) {
        console.log(error)
        return res.status(400).send("error delete data")
    }
}
const updateData = async (req, res) => {
    try {
        const { name, description, time } = req.body
        const plan = await PlanModel.findByIdAndUpdate(req.params.id, {
            name,
            description,
            time,
        }, { new: true })
        if (!plan) return res.status(404).send("Plan not found")
        return res.status(200).send(plan)
    } catch (error) {
        console.log(error)
        return res.status(400).send("error update data")
    }

}

// plan = [[process],[process],...]
// process controller
const getOneData = async (req, res) => {
    try {
        const plan = await PlanModel.findById(req.params.id)
        if (!plan) return res.status(404).send("Plan not found")
        return res.status(200).send(plan)
    } catch (error) {
        console.log(error)
        return res.status(400).send("error get one data")
    }
}
const addOneData = async (req, res) => {
    try {
        const { content } = req.body
        const plan = await PlanModel.findByIdAndUpdate(req.params.id, {
            $push: { 'description.content': content }
        }, { new: true })
        if (!plan) return res.status(404).send("Plan not found")
        return res.status(200).send(plan)
    } catch (error) {
        console.log(error)
        return res.status(400).send("error add one data")
    }
}
const deleteOneData = async (req, res) => {
    try {
        const {index} = req.body
        const plan = await PlanModel.findById(req.params.id)
        if(plan) plan.description.content.splice(index, 1)
        await plan.save()
        return res.status(200).send(plan)
    } catch (error) {
        console.log(error)
    }
}
const updateOneData = async (req, res) => {
    try {
        const { process, content, contentIndex } = req.body
        const plan = await PlanModel.findById(req.params.id)
        if (!plan) {
            return res.status(404).send("Plan not found")
        }
        const processIndex = plan.process.indexOf(process)
        // check da co process chua
        if (processIndex !== -1) {
            plan.process.splice(processIndex, 1)
        } else {
            plan.process.push(process)
        }
        // count percent
        const countTime = date.differenceInDays(plan.time.end, plan.time.start);
        const percent = ((plan.process.length) / countTime) * 100 ;
        // update
        const data = await PlanModel.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    [`description.content.${contentIndex}`]: content,
                    process: plan.process,
                    percent: percent.toFixed(2) + '%',
                },
            }, { new: true }
        )
        return res.status(201).send(data)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getData,
    addData,
    deleteData,
    updateData,
    getOneData,
    updateOneData,
    addOneData,
    deleteOneData,
};
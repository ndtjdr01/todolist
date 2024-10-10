const GoalContent = require("../../model/goal/goalContent");

const getData = async (req, res) => {
    try {
        const id = req.params.id;
        const goalContentDB = await GoalContent.find({ goal: id })
        res.json(goalContentDB)
    } catch (error) {
        console.log(error);
        res.status(400).send('error getdata')
    }
}
const addData = async (req, res) => {
    try {
        const id = req.params.id;
        const { plan, info } = req.body
        const update = {$push:{}}
        if(plan!==undefined){
            update.$push.plan = {text:plan,completed:false}
        }
        if(info!==undefined){
            update.$push.info = {text:info,completed:false}
        }
        await GoalContent.findOneAndUpdate({ goal: id }, update,
            { new: true, upsert: true })
        res.status(201).send('ok')
    } catch (error) {
        console.log(error);
        res.status(400).send('error addData')
    }
}
const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const { infoIndex, planIndex } = req.body
        const data = await GoalContent.findOneAndUpdate({ goal: id },
            { $unset: { [`info.${infoIndex}`]: 1, [`plan.${planIndex}`]: 1 } },
            { new: true })
        await GoalContent.findOneAndUpdate({ goal: id }, { $pull: { info: null,plan:null } }, { new: true })
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send('error getdata')
    }
}
const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const { plan, info, planIndex, infoIndex, planCompleted, infoCompleted } = req.body
        const data = await GoalContent.findOneAndUpdate({ goal: id },
            {
                $set: {
                    [`plan.${planIndex}.text`]: plan,
                    [`plan.${planIndex}.completed`]: planCompleted,
                    [`info.${infoIndex}.text`]: info,
                    [`info.${infoIndex}.completed`]: infoCompleted,
                }
            }
            , { new: true })
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send('error getdata')
    }
}

module.exports = { getData, addData, deleteData, updateData }
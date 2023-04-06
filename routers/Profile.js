const express = require('express')
const ProfileRouter = express.Router();
const auth = require('./auth')
const Usermodel = require("../connection");


//starts 
const GetProfileLogic = async (req, res) => {
    const userid = req.userid;
    try {
        const existing_user = await Usermodel.findOne({ _id: userid })
        if (existing_user == false || existing_user == null) throw new Error();
        return res.status(200).send({
            msg: "success",
            data: {
                email: existing_user.email,
                id: existing_user._id,
                phone: existing_user.phone,
                name: existing_user.name,
                lname: existing_user.lname,
                gender: existing_user.gender,
                age: existing_user.age
            }
        })
    }
    catch {
        return res.status(500).send({
            msg: "server error"
        })
    }
}

//ends


//starts
const PostProfileLogic = async (req, res) => {
    let nameCheck, emailCheck;
    const userid = req.userid;
    const { name, email, lname, gender, age } = req.body

    try {
        emailCheck = String(email).match(/^[\w\.]+@\w+\.\w+$/)
        nameCheck = name && (name.trim().length) > 5 && (name.trim().length < 25)
        if (!(emailCheck && nameCheck)) throw new Error();

        const existing_user = await Usermodel.updateOne({ _id: userid }, {
            email, name, lname, gender, age
        })

        if (!existing_user.matchedCount) throw new Error();
        res.status(200).send({
            msg: "success"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            msg: "please provide correct information"
        })
    }
}
//ends

ProfileRouter.get('/profile', auth, GetProfileLogic)
ProfileRouter.post('/profile', auth, PostProfileLogic)


module.exports = ProfileRouter 
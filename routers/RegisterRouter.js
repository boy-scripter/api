const express = require('express')
const Usermodel = require('../connection')
const registerRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('../config')

async function registerLogic(req, res) {
    let isEmailExist, isPhoneExist, nameCheck, phoneCheck, emailCheck, passwordCheck;
    let { name, email, phone, password, confirmpassword } = req.body

    nameCheck = name && (name.trim().length) > 5 && (name.trim().length < 25)
    phoneCheck = String(phone).match(/^[6-9]{1}\d{9}$/)
    emailCheck = String(email).match(/^[\w\.]+@\w+\.\w+$/)
    passwordCheck = password && (password.length >= 8) && (password.length < 30) && (password === confirmpassword)

    // encrypting passwords using bcrypt 
    confirmpassword = password = bcrypt.hashSync(password, 10)
    //ends

    try {
        isEmailExist = await Usermodel.findOne({ email })
        isPhoneExist = await Usermodel.findOne({ phone })

        if (isEmailExist) {
            return res.status(400).json({
                msg: "Email Already Exist"
            })
        }

        if (isPhoneExist) {
            return res.status(400).json({
                msg: "Phone no. Already Exist"
            })
        }
        console.log(nameCheck, phoneCheck, emailCheck, passwordCheck)

        if (nameCheck && phoneCheck && emailCheck && passwordCheck) {
            const user = await Usermodel.create({ name, phone, email, password, confirmpassword })
            return res.status(200).json({
                msg: "account created",
                data: {
                    token: jwt.sign({ email, id: user._id }, SECRETKEY),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    id: user._id
                }
            })

        } else {
            return res.status(400).json({
                msg: "Please Enter Correct Details"
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: "internal server error"
        })
    }

}

registerRouter.post('/signup', registerLogic)

module.exports = registerRouter
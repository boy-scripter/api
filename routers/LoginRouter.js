const express = require('express')
const bcrypt = require('bcrypt')
const LoginRouter = express.Router();
const Usermodel = require("../connection");
const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('../config.js')


const LoginLogic = async (req, res) => {
    let existing_user;
    let { id, password } = req.body


    try {


        //only for ensuring we accept two parameters
        if (Object.keys(req.body).length != 2) throw new Error();
        /*ends */

        //validate the input user email or phone
        if (String(id).search(/^(?:[6789]\d{9}|[\w\.]+@\w+\.\w+)$/) == -1) return res.status(400).json({ msg: "Please Enter Correct details" });
        // ends 

        existing_user = await Usermodel.findOne({
            $or: [
                { email: id },
                { phone: id }
            ]
        });

        if (existing_user == false || existing_user == null) {
            return res.status(401).json({
                msg: "User not found"
            })
        }

        if (bcrypt.compareSync(password, existing_user.password)) {
            return res.status(200).send({
                msg: "login success",
                data: {
                    token: jwt.sign({ email: existing_user.email, id: existing_user._id }, SECRETKEY),
                    name: existing_user.name,
                    email: existing_user.email,
                    phone: existing_user.phone,
                    id: existing_user._id
                }
            })
        } else {
            return res.status(400).send({
                msg: "invalid credentials"
            })
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: "server error"
        })
    }
}

LoginRouter.post('/login', LoginLogic)
module.exports = LoginRouter
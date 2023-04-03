const mongoose = require('mongoose')
const { DATABASEURL } = require('./config')


mongoose.connect(DATABASEURL).then(() => console.log('connection successful')).catch(() => console.log('Wrong Connection'))

const userSchema = mongoose.Schema({
    accountCreatedAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 30
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 10
    }
    ,
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 30
    }
    ,
    password: {
        type: String,
        required: true,

    },
    confirmpassword: {
        type: String,
        required: true,

    }
})

const Usermodel = mongoose.model('user', userSchema)

module.exports = Usermodel

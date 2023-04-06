const DATABASEURL = 'mongodb://127.0.0.1:27017' //database atlas address
const SECRETKEY = "this_is_a_secret_ket_dont_tell_anyone" // for jwt encyption
const ALLOWEDORIGIN = "*"     //allowwd origins cors headers

module.exports = { SECRETKEY, DATABASEURL, ALLOWEDORIGIN }
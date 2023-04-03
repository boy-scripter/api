const DATABASEURL = 'mongodb+srv://sonugeeks:8010164488@cluster1.5gyincs.mongodb.net/ecommerce?retryWrites=true&w=majority' //database atlas address
const SECRETKEY = "this_is_a_secret_ket_dont_tell_anyone" // for jwt encyption
const ALLOWEDORIGIN = "*"     //allowwd origins cors headers

module.exports = { SECRETKEY, DATABASEURL, ALLOWEDORIGIN }
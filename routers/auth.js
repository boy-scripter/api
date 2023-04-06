const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('../config.js')

function auth(req, res, next) {
    try {
        let token = req.headers['authorization']
        token = token.split(" ")[1];
        const data = jwt.verify(token, SECRETKEY);
        req.userid = data.id;
        next()
        return;
    } catch {
        return res.status(500).send({
            msg: "may be token invalid"
        })
    }
}

module.exports = auth
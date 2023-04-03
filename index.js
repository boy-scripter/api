const express = require("express")
const app = express()
app.get("/", (req,res) => {
    res.send("this is only for testing")
})
app.listen(3000)

const express = require('express')
const RegisterRouter = require('./routers/RegisterRouter')
const LoginRouter = require('./routers/LoginRouter');
const ProfileRouter = require('./routers/Profile');
const cors = require("cors")
const { ALLOWEDORIGIN } = require('./config')
const app = express();
const PORT = 8000;
app.use(express.json());

app.use(cors({
    origin: ALLOWEDORIGIN
}))

app.all('/', (req, res) => {
    res.status(200).send("this server is created by shivaNm")
})


app.use('/api', RegisterRouter);
app.use('/api', LoginRouter);
app.use('/api', ProfileRouter);

app.listen(PORT)


const  express = require("express");
const cors = require("cors");
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')
const proxy = require('express-http-proxy')
const db = require("./config/Database.js")
const PORT = 5000;
const app = express();
const dotenv = require('dotenv')
dotenv.config()

const auth = require("./routes/auth")
const user = require("./routes/user.js")
const task = require("./routes/task.js")

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db 
})

const isProduction = process.env.NODE_ENV === 'production'

let clientUrl = 'http://localhost:3000'
if (isProduction) {
    clientUrl = 'https://binar-fsw-mock-test-client.onrender.com'
}

;(async()=>{
    await db.sync()
})()

app.use(session({
    secret: process.env.SESS_SECRET,
    store: store,
    cookie: {
        secure: isProduction,
        httpOnly: isProduction,
        sameSite: 'none'
    }
}))

app.use(cors({
    credentials: true,
    origin: clientUrl
}))
app.use(proxy(clientUrl))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(user)
app.use(task)
app.use(auth)

store.sync()

app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
});
const  express = require("express");
const cors = require("cors");
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')
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

;(async()=>{
    await db.sync()
})()

app.use(session({
    secret: process.env.SESS_SECRET,
    store: store,
    cookie: {
        secure: isProduction,
        maxAge: 1000 * 60 * 60 * 48,
        httpOnly: isProduction,
        sameSite: 'none'
    },
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
}))

store.sync()

let clientUrl = 'http://localhost:3000'
if (isProduction) {
    clientUrl = 'https://binar-fsw-mock-test-client.onrender.com'
}
app.use(cors({
    credentials: true,
    origin: clientUrl
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(user)
app.use(task)
app.use(auth)

app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
});
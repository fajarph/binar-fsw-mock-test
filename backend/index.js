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

;(async()=>{
    await db.sync({alter: true})
})()

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(user)
app.use(task)
app.use(auth)

// store.sync()

app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
});
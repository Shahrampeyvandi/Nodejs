const express = require('express')
const session = require('express-session')
const app = express()
const Router = require('./router')


let sessionOptions = session({
 secret:"shahram",
 resave:false,
 saveUninitialized:false,
 cookie:{maxAge:1000 * 60 * 60 * 24 , httpOnly:true}
})


app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false})) // for submit data
app.use(express.json()) //for send json data
app.use(sessionOptions)  // express app now suport from sessions
app.use(express.static('public'))
app.use(Router)




module.exports = app
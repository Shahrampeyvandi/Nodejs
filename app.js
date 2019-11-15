const express = require('express')
const app = express()
const Router = require('./router')



app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false})) // for submit data
app.use(express.json()) //for send json data
app.use(express.static('public'))
app.use(Router)




module.exports = app
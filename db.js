const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')


mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser:true,useUnifiedTopology:true},function(err,client){
    module.exports = client.db() // we can use this method in other pages with require db.js
    const app = require('./app')
    app.listen(process.env.PORT)
})

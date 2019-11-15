const bcrypt = require('bcryptjs')
const userCollections = require('../db').collection('users')  //چون ما از طریق مدل اینزرت میکنیم پس به دیتابیس وصل میشویم
const validator =require('validator') //import validator package

let User = function (data) {
    this.data = data
    this.errors = []
}


User.prototype.cleanUp = function(){
    if(typeof(this.data.username) != "string") {this.data.username ==""}
    if(typeof(this.data.email) != "string") {this.data.email ==""}
    if(typeof(this.data.password) != "string") {this.data.password ==""}

    //update the data with new data 
    this.data = {
        username:this.data.username.trim().toLowerCase(),
        email:this.data.email,
        password:this.data.password
    }
}


User.prototype.validate = function () {
    if(this.data.username == "") this.errors.push('empty username')
    if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)) this.errors.push("the username must be letters and numbers") 
    if(!validator.isEmail(this.data.email)) this.errors.push("the email is invalid....") 
    if(this.data.password == "") this.errors.push("the password must fill") 
    if (this.data.password.length > 0 && this.data.password.length < 5) {this.errors.push("Password must be at least 5 characters.")}
    if (this.data.password.length > 50) {this.errors.push("Password cannot exceed 50 characters.")}
    if (this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push("Username must be at least 3 characters.")}
    if (this.data.username.length > 30) {this.errors.push("Username cannot exceed 30 characters.")}


}


User.prototype.register = function () {
    //1-vslidate user data
    this.cleanUp()
    this.validate()
    //2- if not error in validate save user data
    if (!this.errors.length) {

        // ایجاد پسوورد هش شده
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password,salt)

        userCollections.insertOne(this.data)  // insert user in mongodb
    }

}
User.prototype.login = function(){

    return new Promise((resolve,reject) => {
        this.cleanUp()
        userCollections.findOne({username:this.data.username}).then((attemptuser) => {
        if(attemptuser && bcrypt.compareSync(this.data.password,attemptuser.password)){
           resolve('لاگین موفق بود')
        }else{
          reject('کاربری با این اطلاعات وجود ندارد ')
        }
    }).catch(error => {reject('خطا در برقراری ارتباط!')})
    })
}
    







module.exports = User
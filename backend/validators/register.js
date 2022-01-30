const Validator = require("validator");
const isEmpty = require("is-empty");
/*const checkIsValidUser = (req,res,next) => {
    const {name,email,password,phone,age} = req.body
    let regex = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
    let ValidEmail = regex.test(email)
    if(!ValidEmail) {
        return res.status(400).json ({message:`Email is not valid`})
    }
    if(name){
    if(!name) 
        return res.status(400).json ({message:`Name is not valid`})
        if(typeof name!== "string")
        return res.status(400).json ({message:`Invalid name`})
    }
    
    if(password.length < 5){
        return res.status(400).json ({message:`Password must be atleast 5 characters long`})
    }
    if(phone.length < 10 && typeof phone!=="number"){
        return res.status(400).json ({message:`Invalid number`})
    }
    if(age){
        if(age.length > 2)
        return res.status(400).json ({message:`Age must be less than 100`})
        if(typeof age !== "number")
        return res.status(400).json ({message:`Invalid age`})
    }
    next()


}*/

module.exports = function validateUpdateInput(data){
    let error ={};
    data.phone = !isEmpty(data.phone)? data.phone:"";
    data.age = !isEmpty(data.age)? data.age:"";

    if(Validator.isEmpty(data.phone)){
        error.phone = "Contact no is required";
    }
    else if((data.phone.toString().length)!==10){
        error.phone = "Invalid Contact no."
    }

    if(Validator.isEmpty(data.age)){
        error.age = "Age required"
    }
    else if((data.age.toString().length)!==2){
        error.age = "Invalid age";
    }

    return{
        error,
        isValid:isEmpty(error),
    }
};



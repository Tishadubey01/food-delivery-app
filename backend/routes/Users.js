const { ViewAgendaRounded, Error, CompressOutlined } = require("@mui/icons-material");
const { letterSpacing } = require("@mui/system");
var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateUpdateInput = require("../validators/register")

var ValidEmail = require("email-validator");
var Validpassword = require("password-validator");
var PassSchema = new Validpassword();
PassSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



// Load User model
let User = require("../models/Users");
let Vendor = require("../models/Vendors");
let Food = require("../models/fooditem");
var user = ""
/*router.post("/register",(req,res,next)=> {
    checkIsValidUser(req.body);
    if(!checkIsValidUser){
        return res.status(400).json(err);
    }
})*/

// GET request 
// Getting all the users
router.get("/register", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
// Getting all the vendors
router.get("/vendor", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
//Get all food items
router.get("/products", function (req, res) {
    Food.find(function (err, products) {
        if (err) {

            console.log(err);
        }
        else {
            res.json(products);
            console.log(products);
        }
    })
});
//show all orders
router.get("/order", function (req, res) {
    Food.find(function (err, products) {
        if (err) {

            console.log(err);
        }
        else {
            res.json(products);
            console.log(products);
        }
    })
});
//add orders
router.post('/order/add', function (req, res) {
    let Order = new Order(req.body);
    Order
        .save()
        .then(Order => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': err }) });
});
//get orders by customer email id
router.get("/order/user/:buyer_email", function (req, res) {
    let buyer_email = req.body.buyer_email;
    console.log(buyer_email)
    Food.find({ "buyer_email": buyer_email }, function (err, users) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("yes, product found");
            res.json(users)
        }
    })

});

//Get food-item by id
router.get("/products/:id", function (req, res) {
    let ID2 = req.params.id;
    Food.findById(ID2, function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    })
});
//Delete food by id
router.delete("/products/:id", function (req, res) {
    Food.findByIdAndRemove(req.params.id, function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send("Item " + users.name + "was deleted")
        }
    })
})
//get product name by id
router.get("/products/name/:id([0-9a-f]{24})", function (req, res) {
    let ID3 = req.params.id;
    Food.findById(ID3, function (err, item) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(item.name);
            res.json(item.name);
        }
    })

})

//Get all food-items by name
router.get("/products/name/:name", function (req, res) {
    let name = req.body.name;
    console.log(name)
    /* Food.find({ "name": name },function(err,users) {
     if(err){
         console.log(err)
     }
     else {
         res.json(users);
     }
 })});
     if(name != ""){
             if(err){
                 console.log(err)
 
             }else {
                 if(users!=undefined){
                     res.json(users)
                 }
                 else{
                     console.log(err)
                 }
             }
         })
     }*/


    Food.find({ name: `${name}` }, function (err, users) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("yes, product found");
            res.json(users)
        }
    })

});
//get order by id
router.get("/order/:id", function (req, res) {
    ID = req.params.id;
    Order.findById(ID, function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    })
});

//Get user by id
router.get("/:id", function (req, res) {
    ID = req.params.id;
    User.findById(ID, function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    })
});
//Get vendor by id
router.get("/vendor/:id", function (req, res) {
    ID = req.params.id;
    Vendor.findById(ID, function (err, vendors) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(vendors);
        }
    })
});
//get food items name by vendor's name 
router.get("/products/vendor/:vendor", function (req, res) {
    let vendor = req.body.vendor;
    console.log(vendor)
    Food.find({ vendor: `${vendor}` }, function (err, users) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("yes, product found");
            res.json(users)
        }
    })

});

//Get all products by vendor
router.get("/products/vendor/:id", function (err, users) {
    let ID4 = req.params.id
    Food.find({ "vendor": ID4 }, function (err, users) {
        if (err) {
            console.log(err)
        } else {
            res.json(users)
        }
    })
});
//get all products by vendor's email
//get food items name by vendor's name 
/*router.get("/products/vendor/email/:email",function(req,res){
    let email= req.body.email;
   console.log(email)
   Food.findOne({ email: `${email}`},function(err,users){
    if(err){
        console.log(err)
    }
    else {
        console.log("yes, product found by email");
        res.json(users)
    }
})


});*/
router.post("/products/vendor/email", (req, res) => {
    Food.find({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json("Err")
        }
        else {

            return res.status(200).json(user)
        }
    });
});
//get food-details  by item name
router.post("/products/viewfooditem", (req, res) => {
    console.log(req.body)
    Food.findOne({ name: req.body.name }).then(user => {
        if (!user) {
            return res.status(400).json("Err")
        }
        else {

            return res.status(200).json(user)
        }
    });
});
router.get("/products/name/:name", function (req, res) {
    let name = req.body.name;
    console.log(name)
    Food.find({ "name": name }, function (err, users) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("yes, product found");
            res.json(users)
        }
    })

});
// search vendor by email
router.post("/vendor/viewprofile", (req, res) => {
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json("Err")
        }
        else {

            return res.status(200).json(user)
        }
    });
});
//ph
router.route("/vendor/updateprofile").post(function (req, res) {
    Vendor.findOneAndUpdate(
        { email: req.body.email },
        {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                type: req.body.type,
                age: req.body.age,
                password: req.body.password
            }
        },
        (err, updated_data) => {
            if (err) {
                console.log("Not updated");
            }
            else {
                //updated_data.save();
                res.json(updated_data)
            }
        }
    )
})
router.route("/products/updateprofile").post(function (req, res) {
    Food.findOneAndUpdate(
        {
            
            name: req.body.name
        },
        {
            $set: {
                food_type: req.body.food_type,
                price: req.body.price,
                total_quantity: req.body.total_quantity,
                availability: req.body.availability,
                addons1: req.body.addons1,
                addons2: req.body.addons2,
                addons3: req.body.addons3,
                add1price: req.body.add1price,
                add2price: req.body.add2price,
                add3price: req.body.add3price
            }
        },
        (err, updated_data) => {
            if (err) {
                console.log("Not updated");
            }
            else {
                //updated_data.save();
                res.json(updated_data)
            }
        }
    )
})
//update food item by name
/*router.route("/products/item/updateitemprofile").post(function (req, res) {
    Food.findOneAndUpdate(
        { name: req.body.name },
        {
            $set: {

                food_type: req.body.food_type,
                price: req.body.price,
                total_quantity: req.body.total_quantity,
                availability: req.body.availability,
                addons1: req.body.addons1,
                addons2: req.body.addons2,
                addons3: req.body.addons3,
                add1price: req.body.add1price,
                add2price: req.body.add2price,
                add3price: req.body.add3price
            }
        },
        (err, updated_data) => {
            if (err) {
                console.log("Not updated");
            }
            else {
                //updated_data.save();
                res.json(updated_data)
            }
        }
    )
})*/
//search user by email
router.post("/register/viewuserprofile", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(400).json("Err")
        }
        else {

            return res.status(200).json(user)
        }
    });
});
//update user profile
router.route("/register/updateuserprofile").post(function (req, res) {
    User.findOneAndUpdate(
        { email: req.body.email },
        {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                type: req.body.type,
                age: req.body.age,
                password: req.body.password
            }
        },
        (err, updated_data) => {
            if (err) {
                console.log("Not updated");
            }
            else {
                //updated_data.save();
                res.json(updated_data)
            }
        }
    )
})

//iis
/*router.post("/vendor/updateprofile", async function(req,res){
     
        var email =req.body.email;
        var type = req.body.type;
        var phone= req.body.phone;
        var age = req.body.age;
        var name = req.body.name;
        const arr = await Vendor.findOneAndUpdate({
            "email":email
        }, {
            "type": type,
            "phone": phone,
            "age": age,
            "name": name, 
        },{
            new: true
        });
        res.json({message: "Successfully updated"});
    
})*/
/*router.put("/vendor/email/",(req,res)=> {
    Vendor.find({email:req.body.email}).then(user => {
        if(!user) {
            return res.status(400).json("Err")
        }
        else {
            Vendor.updateOne({phone: `${req.body.phone}`}, {name:`${req.body.name}`},{type:`${req.body.type}`},function(err,vendor) {
            return res.status(200).json(vendor)
        })
    };
})})*/
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db

router.post("/register", async (req, res) => {
    let newUser = new User(req.body);
    const nametaken = await User.findOne({ name: req.body.name })
    const emailtaken = await User.findOne({ email: req.body.email })
    if (nametaken || emailtaken) {
        res.json({ message: "Name or email address already exists" })
    }
    User.findOne({ email: req.body.email }).then(user => {
        if
            (!(ValidEmail.validate(req.body.email))) {
            {
                return res.status(400).json({ message: "Invalid email address" });
            }
        } else if (!(PassSchema.validate(req.body.password))) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        else if ((req.body.phone.toString().length) !== 10) {
            return res.json({ message: "Invalid phone number" });
        }
        else if (req.body.age > 100 && req.body.age < 10) {
            return res.json({ message: "Age must be between 10-100" });
        }
        else {



            console.log(newUser)
            /* bcrypt.genSalt(12, (err, salt) => {
                 bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if (err) throw err;
                     newUser.password = hash;*/


            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });



        };
    });
});

//Add vendor to db
router.post("/vendor", async (req, res) => {
    let newVendor = new Vendor(req.body);

    const emailtaken = await Vendor.findOne({ email: req.body.email })
    if (emailtaken) {
        res.json({ message: "Name or email address already exists" })
    }
    Vendor.findOne({ email: req.body.email }).then(user => {
        if
            (!(ValidEmail.validate(req.body.email))) {
            {
                return res.status(400).json({ message: "Invalid email address" });
            }
        } else if (!(PassSchema.validate(req.body.password))) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        else {
            console.log(newVendor)
            /* bcrypt.genSalt(12, (err, salt) => {
                 bcrypt.hash(newVendor.password, salt, (err, hash) => {
                     if (err) throw err;
                     newVendor.password = hash;*/

            newVendor.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });




        };
    });
});
//Add products to db
router.post("/products", function (req, res) {
    let newProduct = new Food({
        vendor: req.body.vendor,
        email: req.body.email,
        name: req.body.name,
        price: req.body.price,
        food_type: req.body.food_type,
        total_quantity: req.body.total_quantity,
        availability: req.body.availability,
        description: req.body.description,
        addons1: req.body.addons1,
        addons2: req.body.addons2,
        addons3: req.body.addons3,
        add1price: req.body.add1price,
        add2price: req.body.add2price,
        add3price: req.body.add3price


    });

    console.log(newProduct)
    newProduct.save()
        .then(newProduct => {
            res.status(200).json({ 'Status': 'Successfully added' })
        })
        .catch(err => {
            res.status(400).json({ 'Status': 'Error' })
            console.log(err)
        })

});

//get all food items by vendor


// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let send = {
        msg: "temp",
        type: ""
    }

    // Login by email and password
    User.find({ "email": email, "password": password }, function (err, user) {
        console.log("User from login", user)
        // Check if user email exists
        if (user != undefined) {
            if (err)
                res.status(400).json(0)
            else {
                let current = user[0]
                if (current != undefined) {
                    res.status(200).json(current.id)
                    send.msg = "Valid Credentials"
                }
                else {
                    res.status(400).json({ message: "Password does not match" })
                }

            }
        }
        else {
            res.status(400).json(0)
        }
        /*bcrypt.compare(password, user.password).then((isMatch) => {
            console.log(isMatch);
            console.log(password);
            console.log(user.password)
            if (isMatch) return res.status(200).json({ message: "Valid Credentials" });
            else {
                
                res.status(400).json(user);
                }        });*/
    })


});

router.post("/loginvendor", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let send1 = {
        msg: "temp",
        type: ""
    }
    // Login by email and password
    Vendor.find({ "email": email, "password": password }, function (err, user) {
        console.log("User from login", user)
        // Check if user email exists
        if (user != undefined) {
            if (err)
                return res.status(400).json({
                    error: "Email not found",
                });
            else {
                let current = user[0]
                if (current != undefined) {
                    res.status(200).json(current.id)
                    send1.msg = "Valid Credentials"
                }
                else {
                    res.status(400).json({ message: "Password does not match" })
                }

            }
        }
        else {
            res.status(400).json(0)
        }
        /*bcrypt.compare(password, user.password).then((isMatch) => {
            console.log(isMatch);
            console.log(password);
            console.log(user.password)
            if (isMatch) return res.status(200).json({ message: "Valid Credentials" });
            else {
                
                res.status(400).json(user);
                }        });*/
    })


});

//Update vendor 
/*router.put("/vendor/updatevendor/:id",function(req,res){
    const vendid = req.body.id;
    let name= req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let type = req.body.type;
    Vendor.updateOne({name: `${name}`, email:`${email}`,password:`${password}`,phone:`${phone}`,type:`${type}`},function(err,user) {
        if(err){
            console.log("Not updated");
        }else {
            console.log("Updated Successfully");
            res.json(user);
        }
    })
});*/
/*router.route("/vendor/update").post(UpdateProfile(req,res))
{
    const user = Vendor.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
           if(req.body.password){
               const updated=  user.save();
               res.json({
                   _id:updated._id,
                   name:updated.name,
                   email:updated.email
               });}
               else {
                   res.status(400)
               }
           
    }
}
*/
module.exports = router;



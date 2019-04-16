const User = require('../models/userModel');
const bcrypt = require('bcrypt');


module.exports.newUser = (req, resp) => {

  const data = {
    email: req.body.email,
    password: req.body.password,
  };


  const newUser = new User(data);


    newUser.save((err, doc) => {
        if (err) resp.json({
        success: false,
        message: error.message,
        });
        resp.json(doc);
    });
    };


    module.exports.login = (req, resp) => {
    
    const email = req.body.email;
    
    User.findOne({email}, (err, user) => {
        
        if (err) {
        resp.status(400).json({
            message: err.message,
        });
        }
        
        if (user.password === req.body.password) resp.json(user)
        // resp.json({
        //     user: {
        //         id: user._id,
        //         token: "sdgfdhfshgs",
        //     },
        //     success: true,
        //     message: "User success login"
        // })
    })
    }


    module.exports.logout = (req, resp) => {
        
    resp.status(200).json({
        success: true,
        message: 'user success logout',
    })
    };


    module.exports.update = (req, resp) => {
        const email = req.body.email;
        const password = req.body.password;

        User.findOneAndUpdate({email}, {$set:{password: password}}, {new:true}, (err, doc)=>{
            if (err) resp.status(400).json({
                message: err.message,
            })
            bcrypt.hash(doc.password, 10, (err, hash) => {
                if(err)console.log('ERROR');
                doc.password = hash;
                resp.status(200).json(doc);
            } 
        )
        })}
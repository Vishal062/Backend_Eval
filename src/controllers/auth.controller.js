const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
}

const register = async (req, res) => {
    let user;
    try {
        //check name
        user = await User.findOne({ name: req.body.name });
        console.log({ user });

        //first we check user with same email
        user = await User.findOne({ email: req.body.email });

        //If yes then we throw a error
        if (user) return res.status(400).send({ message: "Please check your email and password" });

        //else
        user = await User.create(req.body);

        //Aso create a token for validation
        const token = newToken(user);

        //we will send the token to the frontend
        return res.status(200).send({ user, token });
    } catch (err) {
        
        return res.status(500).send({ message: "Sorry for error please try again later" });
    
    }
};

//Now for login validation>>>
const login = async (req, res) => {
    try {
        //First we will check if user with same data exist
        let user = await User.findOne({ email: req.body.email });

        //if not throw an error
        if (!user) return res.status(400).send({ message: "Please check your email ans password" });
        
        //if its exist then we matched with the data
        let match = user.checkPassword(req.body.password);
    
        // if not match then we throw an error
        if(! match) return res.status(400).send({message: "Please check your email and password"});
    
        // we will create a token
        const token = newToken(user)
        
        // we will send the token to the frontend
        return res.status(200).send({user, token});

    } catch (err) {
        return res.status(500).send({message: "Sorry for inconvenience please try again later"});   
    }
}

module.exports = { register, login };
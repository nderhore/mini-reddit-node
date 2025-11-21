const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({id},
      process.env.JWT_SECRET, {expiresIn: '1d'})
};

exports.register = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.create({ email,password });
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch(error){
        res.status(400).json({message: error.message});
    }
};

exports.login = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
            .select('+password');

        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({message: 'Identifiants incorrects'});
        }

    } catch(error){
        res.status(500).json({message: error.message});
    }
};
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
   email: {
       type: String,
       required: [true, "L'email est obligatoire"],
       unique: true,
       match: [/.+\@.+\..+/, 'Email invalide']
   },
    password: {
       type: String,
       required: [true, "Le mot de passe est obligatoire"],
       minLength: 10,
       select: false //Le mot de passe n'est pas renvoyé par défaut
    }
});

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
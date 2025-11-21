const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req,res,next) => {
    let token;

    if(req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')){
        try {
            /**
             * extraire le token après Bearer
             * Bearer jroiufeiufhiuheuihf
             **/
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token,
                process.env.JWT_SECRET);

            //Ajoute l'utilisateur à la requete (sans le mot pas passe)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({message: 'Non autorisé, token invalide'});
        }

    }
    if(!token){
        res.status(401).json({message: 'Non autorisé, pas de token'});
    }
};

module.exports = protect;
const Link = require('../models/Link');

// GET
exports.getAllLinks = async (req,res) => {
    try{
        //.sort() => trie les résultats (ici, les plus récent en premier)
        const links = await Link.find().sort({createdAt: -1});
        res.status(200).json(links);
    } catch(error){
        res.status(500).json({message: 'Erreur serveur : ' + error.message});
    }
}

// GET /:id -> je veux le link avec l'id 1 "un"
exports.getLinkById = async (req, res) => {
    try{
            const link = await Link.findById(req.params.id);
            if (!link){
                return res.status(404).json({ message: 'Link not found' });
            }
            res.status(200).json(link);
        } catch(error){
    res.status(500).json({message: 'Erreur serveur : ' + error.message});
    }
}


// POST = Creation d'un link
exports.createLink = async (req, res) => {
    const { title, url, description } = req.body;

    const newLink = new Link({
        title: title,
        url: url,
        description: description
    });

    try{
        const savedLink = await newLink.save();
        res.status(201).json(newLink);
    } catch(error) {
        res.status(400).json({message: 'Erreur de validation : ' + error.message});
    }
}

// PUT = Modification d'un Link /:id
exports.updateLinkById = async (req, res) => {
    try{
        const updatedLink = await Link.findByIdAndUpdate(
            req.params.id, // ID du document à mettre à jour
            req.body, //Données à mettre à jour
            {
                new: true,
                runValidators: true
            });
        if (!updatedLink){
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json(updatedLink);
    } catch(error){
        res.status(400).json({message: 'Erreur de validation : ' + error.message});
    }
}

// DELETE /:id
exports.deleteLinkById = async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id);
        if (!link) {
            return res.status(404).json({message: 'Link not found'});
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur : ' + error.message});
    }
}


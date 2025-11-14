const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, "Le texte du commentaire est obligatoire"],
    },
    link: {
        type: Schema.Types.ObjectId, // Stocke l'ID d'un objet Link
        ref: 'Link', // Fait réference au modèle 'Link'
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', CommentSchema);
const Comment = require('../models/Comment');
const Link = require('../models/Link');

exports.getCommentsForLink = async (req, res) => {
  try {
      const comments = await Comment.find({link: req.params.id})
          .populate('user', 'email')
          .sort({createdAt: -1});
      res.json(comments);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
};

exports.createComment = async (req, res) => {
    try{
        const link = await Link.findById(req.params.id);
        if(!link){
            return res.status(404).json({message: 'Link not found'});
        }
        const comment = await Comment.create({
            text: req.body.text,
            link: req.params.id,
            createdAt: req.body.createdAt,
            user: req.user._id
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

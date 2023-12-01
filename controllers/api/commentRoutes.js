const router = require('express').Router();
const { Comment } = require('../../models');

// create new comment and error if unable
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
// delete comment by id and error if unable
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
            id: req.params.id,
            user_id: req.session.user_id,
            },
    });
  
    if (!commentData) {
        res.status(404).json({ message: 'This Comment does not exist' });
        return;
    }
  
      res.status(200).json(commentData);
    } 
    
    catch (err) {
        res.status(500).json(err);
    }
  });

module.exports = router;
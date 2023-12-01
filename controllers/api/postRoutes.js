const router = require('express').Router();
const { Post } = require('../../models');

// create new post and error if unable
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});
  
// delete post by id and error if unable
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
            id: req.params.id,
            user_id: req.session.user_id,
            },
    });
  
    if (!postData) {
        res.status(404).json({ message: 'This post does not exist' });
        return;
    }
  
      res.status(200).json(postData);
    } 
    
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
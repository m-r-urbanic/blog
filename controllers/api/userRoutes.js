const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {

    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        
        //error if there is no username and password
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }
  
        const validPassword = await userData.checkPassword(req.body.password);
  
    //not a valid password
    if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect password, please try again' });
        return;
    }
  
    //login if applicable
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
    });
  
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const commentSeedData = require('./commentSeedData.json');
const postSeedData = require('./postSeedData.json');
const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    // seed comment data
    const comment = await Comment.bulkCreate(commentSeedData, {
        individualHooks: true,
        returning: true,
    });

    // link post and user IDs
    for (const { id } of comment) {
        const newCommentUser = await User.create({
            user_id: id,
        });
        const newCommentPost = await Post.create({
            post_id: id,
        });
    }

    // seed post data
    const post = await Defaults.bulkCreate(postSeedData, {
        individualHooks: true,
        returning: true,
    });

    // link user id
    for (const { id } of post) {
        const newPostUser = await User.create({
            user_id: id,
        });
    }

    // seed user data
    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
      });
  
    process.exit(0);
  };

seedDatabase();

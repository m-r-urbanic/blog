const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
{
    // integer, not null, auto increment
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    // post title
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [300],
        },
    },
    // post contents
    contents: {
        type: DataTypes.STRING,
    },
    // date post is created
    post_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
}
);

module.exports = Post;

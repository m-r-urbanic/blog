const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
  }
}

User.init(
  {
    // id, integer, auto increment, not null
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    // must be a string, can't be null
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // must be a string, can't be null
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // username must be 5 characters and a string, can not be null
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5],
        },
    },
    // must be a string, must be at least ten characters
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10],
        },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

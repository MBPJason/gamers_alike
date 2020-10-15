// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
    user_icon: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    current_status: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    ratings: {
      type: DataTypes.DECIMAL,
    },
    user_attr1: {
      type: DataTypes.STRING,
    },
    user_attr2: {
      type: DataTypes.STRING,
    },
    user_attr3: {
      type: DataTypes.STRING,
    },
    user_attr4: {
      type: DataTypes.STRING,
    },
    user_attr5: {
      type: DataTypes.STRING,
    },
    user_attr6: {
      type: DataTypes.STRING,
    },
    steam_account_linked: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    steam_user: {
      type: DataTypes.STRING,
    },
    discord_account_linked: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    discord_user: {
      type: DataTypes.STRING,
    },
    discord_channel_invite: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    looking_for: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    current_game: {
      type: DataTypes.STRING,
    },
    user_game1: {
      type: DataTypes.STRING,
    },
    user_game2: {
      type: DataTypes.STRING,
    },
    user_game3: {
      type: DataTypes.STRING,
    },
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
const Sequelize = require('sequelize');
const { DataTypes: {STRING, UUID, UUIDV4, ENUM } } = Sequelize;
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true

  },

  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  firstName: {
    type: STRING
  },

  lastName: {
    type: STRING
  },

  email: {
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
        isEmail: true
    }
  },

  phoneNumber: {
    type: STRING
  },

  address: {
    type: STRING
  },

  password: {
    type: STRING,
    allowNull: false
  },

  permission: {
    type: ENUM,
      values: ['admin', 'user', 'guest']
  }
})

module.exports = {
  models: {
    User
  }
}

/**
 * instanceMethods
 */
// some comment
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))

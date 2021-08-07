const Sequelize = require('sequelize');
const { DataTypes: {STRING, UUID, UUIDV4, DECIMAL } } = Sequelize;
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
const { NUMBER } = require('sequelize');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  userId: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true

  },

  firstName: {
    type: STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },

  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    }
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
    type: NUMBER,
    allowNull: false
  },

  address: {
    type: STRING,
    allowNull: false
  },

  password: {
    type: STRING,
    allowNull: false
  },

  permission: {
    type: STRING,
    isIn:{
      args:[['admin','user', 'guest']],
      msg:"Must be admin, user or guest"
    }
  }
})

module.exports = User

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

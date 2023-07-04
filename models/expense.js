const Sequelize =require('sequelize');

const sequelize=require('../util/database');

const User = sequelize.define('expense',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  amount:Sequelize.INTEGER,
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  catecgory:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports=User;
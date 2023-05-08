
"use strict";
module.exports = (sequelize,Sequelize) => {

 const  postSchema  = sequelize.define("postSchema ",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
        },
    message: {
     type: Sequelize.STRING
            },
    creator: {
        type: Sequelize.STRING
    },
    tags: {
        type: Sequelize.STRING
    },
    selectedFile:{
        type: Sequelize.STRING,
    },
    likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
    },
    createdAt: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
    },
    
    },{
    timestamps: false,
    freezeTableName: true

  });
  return postSchema;
}
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Author = require('./Author');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
});


Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Book, { foreignKey: 'authorId' });

module.exports = Book;

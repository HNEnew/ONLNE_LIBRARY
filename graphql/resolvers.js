
const { Author, Book, User, Admin } = require('../models')

const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET
let adminToken = null

const resolvers = {
    // Query : ------------------------------------

    // Get all authors
    getAuthors: async () => {
        return await Author.findAll();
    },

    //Get all books
    getBooks: async () => {
        return await Book.findAll();
    },

    // User login
    // login: async (_, { email, password }) => {
    //     const user = await User.findOne({ where: { email } });
    //     if (!user) throw new Error('User not found');
    //     const validPassword = await bcrypt.compare(password, user.password);
    //     if (!validPassword) throw new Error('Invalid password');
    //     return jwt.sign({ userId: user.id }, JWT_SECRET);
    // },

    // Mutation : ------------------------------------


    // Add ,delete ,update  AUTHORS----

    addAuthor: async (_, { name, bio }) => {
        return await Author.create({ name, bio });
    },

    deleteAuthor: async (_, { id }) => {
        try {
            const author = await Author.findByPk(id)
            if (!author) {
                throw new Error(`Author not found`);
            }
            await author.destroy();
            return author
        } catch (error) {
            console.error(`Failed to delete author with ID ${id}:`, error);
            throw new Error("An error occurred while trying to delete the author. Please try again.");
        }
    },

    editAuthor: async (_, { id, name, bio }) => {
        try {
            const author = await Author.findByPk(id);
            if (!author) {
                throw new Error(`Author with ID ${id} not found`);
            }

            author.name = name || author.name;
            author.bio = bio || author.bio;

            await author.save();
            return author;
        } catch (error) {
            console.error(`Failed to update author with ID ${id}:`, error);
            throw new Error("An error occurred while trying to update the author.");
        }
    },

    // Add ,delete ,update  BOOKS----

    addBook: async (_, { title, genre, publicationYear, authorId }) => {
        return await Book.create({ title, genre, publicationYear, authorId });
    },

    deleteBook: async (_, { id }) => {
        try {
            console.log(id)
            const book = await Book.findByPk(id)
            if (!book) {
                throw new Error(`Book not found`);
            }
            await book.destroy();
            return book
        } catch (error) {
            console.error(`Failed to delete book with ID ${id}:`, error);
            throw new Error("An error occurred while trying to delete the book. Please try again.");
        }
    },

    editBook: async (_, { id, title, genre, publicationYear }) => {
        try {
            const book = await Book.findByPk(id);
            if (!book) {
                throw new Error(`Book with ID ${id} not found`);
            }
            book.title = title || book.title;
            book.genre = genre || book.genre;
            book.publicationYear = publicationYear || book.publicationYear
            // book.authorId = book.authorId
            await book.save();
            return book;
        } catch (error) {
            console.error(`Failed to update book with ID ${id}:`, error);
            throw new Error("An error occurred while trying to update the book.");
        }
    },

    // Add a new user

    // registerUser: async (_, { email, password }) => {
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await User.create({ email, password: hashedPassword });
    //     return jwt.sign({ userId: user.id }, JWT_SECRET);
    // },

    //  Admin login

    loginAdmin: async (_, { username, password }) => {
        if (process.env.ADMIN_UN == username && process.env.ADMIN_PW == password) {
            adminToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' })
            return adminToken
        } else {
            return ('Invalid username or password')
        }
    }

};

module.exports = resolvers;

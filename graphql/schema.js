const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, graphql } = require('graphql');
const { UserType, AuthorType, BookType } = require('./types');
const resolvers = require('./resolvers');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: resolvers.getAuthors,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: resolvers.getBooks,
    },
    login: {
      type: GraphQLString,
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: resolvers.login,
    },
    loginAdmin: {
      type: GraphQLString,
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: resolvers.loginAdmin,
    },

  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString }, bio: { type: GraphQLString } },
      resolve: resolvers.addAuthor,
    },
    deleteAuthor: {
      type: AuthorType,
      args: { id: { type: GraphQLInt } },
      resolve: resolvers.deleteAuthor,
    },
    editAuthor: {
      type: AuthorType,
      args: { id: { type: GraphQLInt }, name: { type: GraphQLString }, bio: { type: GraphQLString } },
      resolve: resolvers.editAuthor,
    },
    addBook: {
      type: BookType,
      args: { title: { type: GraphQLString }, genre: { type: GraphQLString }, publicationYear: { type: GraphQLInt }, authorId: { type: GraphQLInt } },
      resolve: resolvers.addBook,
    },
    deleteBook: {
      type: BookType,
      args: { id: { type: GraphQLInt } },
      resolve: resolvers.deleteBook,
    },
    editBook: {
      type: BookType,
      args: { id: { type: GraphQLInt }, title: { type: GraphQLString }, genre: { type: GraphQLString }, publicationYear: { type: GraphQLInt }, },
      resolve: resolvers.editBook,
    },
    registerUser: {
      type: GraphQLString,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: resolvers.registerUser,
    },
    loginAdmin: {
      type: GraphQLString,
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: resolvers.loginAdmin,
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

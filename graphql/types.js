const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        bio: { type: GraphQLString },
    }),
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        publicationYear: { type: GraphQLInt },
        authorId: { type: GraphQLInt },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
    }),
});

module.exports = { AuthorType, BookType, UserType };

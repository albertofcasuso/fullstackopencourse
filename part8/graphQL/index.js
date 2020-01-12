const { ApolloServer, UserInputError, gql } = require("apollo-server")
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")

const MONGODB_URI =
  "mongodb+srv://casuso:3wTk4sIY7t48LVzy@cluster0-mmulw.azure.mongodb.net/library?retryWrites=true&w=majority"

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log(error.message, "this is a message")
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String, password: String!): Token
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => {
      if (args.genre) {
        const books = Book.find({ genres: { $in: [args.genre] } })
        return books
      }
      return Book.find({})
    },

    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const authorExists = await Author.findOne({ name: args.author })
        if (!authorExists) {
          const author = new Author({ name: args.author })
          const newAuthor = await author.save()
          const book = new Book({ ...args, author: newAuthor })
          const newBook = await book.save()
          return newBook
        }
        const book = new Book({ ...args, author: authorExists })
        const newBook = await book.save()
        return newBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.name })
      authorExists.born = args.setBornTo
      return authorExists.save()
    }
  },
  Author: {
    bookCount: root => {
      const countBooks = Book.find({ author: root })
      return countBooks.count()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error)
    return error
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

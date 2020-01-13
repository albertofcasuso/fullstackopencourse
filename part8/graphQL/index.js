const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require("apollo-server")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

const MONGODB_URI =
  "mongodb+srv://casuso:3wTk4sIY7t48LVzy@cluster0-mmulw.azure.mongodb.net/library?retryWrites=true&w=majority"
const JWT_SECRET = "somethingVerySecret"

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
    me: (root, args, context) => {
      return context.currentUser
    },
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
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
    },
    login: async (root, args) => {
      const userExists = await User.findOne({ username: args.username })
      if (!userExists || args.password !== "secret") {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: userExists.username,
        id: userExists._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new AuthenticationError("not logged in")
        }
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
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not logged in")
      }
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  formatError: error => {
    console.log(error)
    return error
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

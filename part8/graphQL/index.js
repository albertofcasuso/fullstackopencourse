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
    console.log("this is a message")
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
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
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
    hello: () => {
      return "world"
    },
    bookCount: () => {
      return books.length
    },
    authorCount: () => {
      return authors.length
    },
    allBooks: (root, args) => {
      if (args.author || args.genre) {
        const byAuthor = books.filter(book => book.author === args.author)
        return args.genre
          ? byAuthor.filter(book =>
              book.genres.find(genre => genre === args.genre)
            )
          : byAuthor
      }
      return books
    },
    allAuthors: () => {
      return authors
    }
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
        console.log(error)
      }
    },
    editAuthor: (root, args) => {
      const authorExists = authors.find(author => args.name === author.name)
      if (authorExists) {
        const updatedAuthor = { ...authorExists, born: args.setBornTo }
        authors = authors.map(author =>
          author.name === args.name ? updatedAuthor : author
        )
        return updatedAuthor
      } else {
        return null
      }
    }
  },
  Author: {
    bookCount: root => {
      const countBooks = books.filter(book => book.author === root.name)

      return countBooks.length
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

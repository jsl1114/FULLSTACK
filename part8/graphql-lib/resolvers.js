const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { GraphQLError, subscribe } = require('graphql')
require('dotenv').config()

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const authorMatch = await Author.find({ name: author })

      if (author && genre) {
        return await Book.find({
          author: authorMatch.id,
          genres: { $in: [genre] },
        }).populate('author')
      } else if (author) {
        return await Book.find({
          author: authorMatch.id,
        }).populate('author')
      } else if (genre) {
        return await Book.find({
          genres: genre,
        }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let authorMatch = await Author.findOne({ name: args.author })
      const user = context.currentUser

      if (!user) {
        throw new GraphQLError('not authorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (!authorMatch) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('failed saving new author', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          })
        }
      }

      authorMatch = await Author.findOne({ name: args.author })

      const book = new Book({ ...args, author: authorMatch })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const found = await Author.findOne({ name: args.name })
      const user = context.currentUser

      if (!user) {
        throw new GraphQLError('not authorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (!found) {
        return null
      }

      found.born = args.setBornTo

      try {
        await found.save()
      } catch (error) {
        throw new GraphQLError('failed saving edited author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return found
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const userForToken = {
        username: args.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
  },
  Author: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name })
      const foundBooks = await Book.find({ author: foundAuthor.id })

      return foundBooks.length
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers

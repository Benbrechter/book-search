const {User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  // Input : {
  //   bookInput: {
  //       authors: [String],
  //       description: String,
  //       title: String,
  //       bookId: String,
  //       image: String,
  //       link: String
  //      },
  // },
  Mutation: {
    addUser: async (parent, {username, email, password}) => {
        const user = await User.crerate({username, email, password})
        const token = signToken(user);

        return {token, user};
    },
    login: async (parent, {email, password}) => {
        const user = await User.findOne({email});

        if(!user){
            throw AuthenticationError;
        }

        const correctPw = await User.isCorrectPassword(password);  

        if (!correctPw) {
            throw AuthenticationError;
          }
    
          const token = signToken(user);
          return { token, user };
    },
    removeBook: async (parent, {book}, context) => {
        if(context.user) {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: {book: book} },
                { new: true}
            );
        }
        throw AuthenticationError;
    },
   
//     saveBook: async (parent, {bookInput}, context) => {
//         if(context.user){
//              const user = await User.findById(context.user._id);

//              const newBook = {
//                authors: bookInput.authors,
//                description: bookInput.description,
//                title: bookInput.title,
//                bookId: bookInput.bookId,
//                image: bookInput.image,
//                link: bookInput.link,
//             };
//           user.books.push(newBook)
          
//           const updatedUser = await user.save();
//            // Return the updated user document
//          return updatedUser;
//         }
//         throw new AuthenticationError
//     }

   }

};

module.exports = resolvers;
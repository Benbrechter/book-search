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

  Mutation: {
    addUser: async (parent, {username, email, password}) => {
        const user = await User.crerate({username, email, password})
        const token = signToken(user);

        return {token, user};
    },
    login: async (parent, {email, username}) => {
        const user = await User.findOne({email});

        if(!user){
            throw AuthenticationError;
        }

        const correctPw = await User.isCorrectPassword(password);  
    }
  }

}

module.exports = resolvers
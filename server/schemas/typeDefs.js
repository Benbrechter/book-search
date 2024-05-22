const typeDefs = `
 type User {
    _id: ID 
    username: String
    email: String 
    password: String
    savedBooks: [Book]
 }
 
 type Book {
    bookId: String
    authors: [String]
    desription: String
    title: String
    image: String
    link: String
 }
 type Auth {
    token: ID!
    user: User
 }

 type Query {
   users: [User]!
   user(userId: ID!): User
   me: User
 }
 
 type Mutation {
 addUser(name: String!, email: String!, password: String!): Auth
 login(email: String!, password: String!): Auth

 removeBook(book: String!): User
 }


`
module.exports = typeDefs
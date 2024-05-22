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
`
module.exports = typeDefs
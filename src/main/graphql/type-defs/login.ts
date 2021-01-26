import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    login(email: String!, password: String!): Authorization!
  }

  extend type Mutation {
    signUp(
      name: String!
      email: String!
      password: String!
      passwordConfirmation: String!
    ): Authorization!
  }

  type Authorization {
    accessToken: String!
    name: String!
  }
`;

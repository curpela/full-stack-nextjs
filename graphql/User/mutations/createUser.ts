import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      token
    }
  }
`;

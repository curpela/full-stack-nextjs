import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LOGIN_USER($data: UserLoginInput!) {
    loginUser(data: $data) {
      token
    }
  }
`;

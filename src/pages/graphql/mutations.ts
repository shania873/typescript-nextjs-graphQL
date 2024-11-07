import { gql } from "@apollo/client";

export const CREATE_ENTITY = gql`
  mutation CreateEntity($input: CreateEntityInput!) {
    createEntity(input: $input) {
      id
      name
      ... on Company {
        industry
        contactEmail
      }
      ... on Contact {
        email
        phone
      }
    }
  }
`;

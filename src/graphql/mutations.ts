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

export const UPDATE_ENTITY = gql`
  mutation UpdateEntity($input: UpdateEntityInput!) {
    updateEntity(input: $input) {
      id
      name
      ... on Contact {
        email
        phone
      }
      ... on Company {
        industry
        contactEmail
      }
    }
  }
`;

// TODO : made a delete item
// export const DELETE_ENTITY = gql`
//   mutation DeleteEntity($id: ID!) {
//     deleteEntity(id: $id) {
//       id
//       name
//       ... on Company {
//         industry
//         contactEmail
//       }
//       ... on Contact {
//         email
//         phone
//       }
//     }
//   }
// `;

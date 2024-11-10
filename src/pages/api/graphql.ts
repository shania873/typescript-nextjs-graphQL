import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateEntityInput, UpdateEntityInput } from "./types";

interface Entity {
  id: string;
  name: string;
  __typename: "Contact" | "Company";
}

interface Contact extends Entity {
  email: string;
  phone?: string;
  __typename: "Contact";
}

interface Company extends Entity {
  industry: string;
  contactEmail?: string;
  __typename: "Company";
}

type AnyEntity = Contact | Company;

let dataStore: AnyEntity[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    phone: "1234567890",
    __typename: "Contact",
  },
  {
    id: "2",
    name: "Google",
    industry: "Tech",
    contactEmail: "contact@google.com",
    __typename: "Company",
  },
];

const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  interface Entity {
    id: ID!
    name: String!
  }

  type Contact implements Entity {
    id: ID!
    name: String!
    email: String!
    phone: String
  }

  type Company implements Entity {
    id: ID!
    name: String!
    industry: String!
    contactEmail: String
  }

  input CreateEntityInput {
    entityType: EntityType!
    name: String!
    email: String
    phone: String
    industry: String
    contactEmail: String
  }

  input UpdateEntityInput {
    id: ID!
    entityType: EntityType!
    name: String
    email: String
    phone: String
    industry: String
    contactEmail: String
  }

  enum EntityType {
    Contact
    Company
  }

  type Mutation {
    createEntity(input: CreateEntityInput): Entity
    updateEntity(input: UpdateEntityInput): Entity
  }

  type Query {
    getEntities: [Entity]
    getEntity(id: ID!): Entity
  }
`;

const resolvers = {
  Query: {
    getEntities: (): AnyEntity[] => dataStore,
    getEntity: (
      parent: undefined,
      args: { id: string }
    ): AnyEntity | undefined =>
      dataStore.find((entity) => entity.id === args.id),
  },
  Mutation: {
    createEntity: (
      parent: undefined,
      args: { input: CreateEntityInput }
    ): AnyEntity => {
      const { entityType, name, email, phone, industry, contactEmail } =
        args.input;

      let newEntity: AnyEntity;

      if (entityType === "Contact") {
        if (!email) throw new Error("Email is required for Contact entity");
        newEntity = {
          id: Date.now().toString(),
          name,
          email,
          phone: phone || "",
          __typename: "Contact",
        };
      } else if (entityType === "Company") {
        if (!industry)
          throw new Error("Industry is required for Company entity");
        newEntity = {
          id: Date.now().toString(),
          name,
          industry,
          contactEmail: contactEmail || "",
          __typename: "Company",
        };
      } else {
        throw new Error("Invalid entity type");
      }

      dataStore.push(newEntity);
      return newEntity;
    },

    updateEntity: (
      parent: undefined,
      args: { input: UpdateEntityInput }
    ): AnyEntity | null => {
      const index = dataStore.findIndex(
        (entity) => entity.id === args.input.id
      );

      if (index === -1) return null;

      const existingEntity = dataStore[index];
      let updatedEntity: AnyEntity;

      if (existingEntity.__typename === "Contact") {
        updatedEntity = {
          ...existingEntity,
          id: args.input.id ?? existingEntity.id,
          name: args.input.name ?? existingEntity.name,
          email: args.input.email ?? existingEntity.email,
          phone: args.input.phone ?? existingEntity.phone,
          __typename: "Contact",
        };
      } else if (existingEntity.__typename === "Company") {
        updatedEntity = {
          ...existingEntity,
          id: args.input.id ?? existingEntity.id,
          name: args.input.name ?? existingEntity.name,
          industry: args.input.industry ?? existingEntity.industry,
          contactEmail: args.input.contactEmail ?? existingEntity.contactEmail,
          __typename: "Company",
        };
      } else {
        throw new Error("Entity type mismatch or invalid entity type");
      }

      dataStore[index] = updatedEntity;
      return updatedEntity;
    },
  },
  Entity: {
    __resolveType: (obj: AnyEntity) => {
      return obj.__typename === "Contact" ? "Contact" : "Company";
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

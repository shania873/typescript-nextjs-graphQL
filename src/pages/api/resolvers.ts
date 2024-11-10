import { AnyEntity } from "./entities";
import { CreateEntityInput, UpdateEntityInput } from "./types";
import { dataStore } from "./dataStore";

export const resolvers = {
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
        if (!email) {
          throw new Error("Email is required for Contact entity");
        }
        newEntity = {
          id: Date.now().toString(),
          name,
          email,
          phone: phone || "",
          __typename: "Contact",
        };
        console.log(newEntity);
      } else if (entityType === "Company") {
        if (!industry) {
          throw new Error("Industry is required for Company entity");
        }
        newEntity = {
          id: Date.now().toString(),
          name,
          industry,
          contactEmail: contactEmail || "",
          __typename: "Company",
        };
      } else {
        throw new Error("Invalid entity tyrezrzepe");
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

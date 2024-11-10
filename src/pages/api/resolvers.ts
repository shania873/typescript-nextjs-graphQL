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

      switch (entityType) {
        case "Contact":
          if (!email) {
            throw new Error("Email is required for Contact entity");
          }
          const contact: AnyEntity = {
            id: Date.now().toString(),
            name,
            email,
            phone: phone || "",
            __typename: "Contact",
          };

          dataStore.push(contact);
          return contact;

        case "Company":
          if (!industry) {
            throw new Error("Industry is required for Company entity");
          }
          const company: AnyEntity = {
            id: Date.now().toString(),
            name,
            industry,
            contactEmail: contactEmail || "",
            __typename: "Company",
          };

          dataStore.push(company);
          return company;

        default:
          throw new Error("Invalid entity type");
      }
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

      switch (existingEntity.__typename) {
        case "Contact":
          const updatedContact: AnyEntity = {
            ...existingEntity,
            id: args.input.id ?? existingEntity.id,
            name: args.input.name ?? existingEntity.name,
            email: args.input.email ?? existingEntity.email,
            phone: args.input.phone ?? existingEntity.phone,
            __typename: "Contact",
          };
          dataStore[index] = updatedContact;
          return updatedContact;

        case "Company":
          const updatedCompany: AnyEntity = {
            ...existingEntity,
            id: args.input.id ?? existingEntity.id,
            name: args.input.name ?? existingEntity.name,
            industry: args.input.industry ?? existingEntity.industry,
            contactEmail:
              args.input.contactEmail ?? existingEntity.contactEmail,
            __typename: "Company",
          };
          dataStore[index] = updatedCompany;
          return updatedCompany;

        default:
          throw new Error("Entity type mismatch or invalid entity type");
      }
    },
  },
  Entity: {
    __resolveType: (obj: AnyEntity) => {
      return obj.__typename === "Contact" ? "Contact" : "Company";
    },
  },
};

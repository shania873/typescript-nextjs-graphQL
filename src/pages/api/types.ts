export type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  __typename: "Contact";
};

export type Company = {
  id: string;
  name: string;
  industry?: string;
  contactEmail?: string;
  __typename: "Company";
};

export type Entity = Contact | Company;

export type CreateEntityInput = {
  entityType: "Contact" | "Company";
  name: string;
  email?: string;
  phone?: string;
  industry?: string;
  contactEmail?: string;
};

export type UpdateEntityInput = CreateEntityInput & {
  id: string;
};

export enum EntityType {
  CONTACT = "Contact",
  COMPANY = "Company",
}

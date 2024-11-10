export interface Entity {
  id: string;
  name: string;
  __typename: "Contact" | "Company";
}

export interface Contact extends Entity {
  email: string;
  phone?: string;
  __typename: "Contact";
}

export interface Company extends Entity {
  industry: string;
  contactEmail?: string;
  __typename: "Company";
}

export type AnyEntity = Contact | Company;

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  __typename: "Contact";
};

export type Company = {
  id: string;
  name: string;
  industry: string;
  contactEmail: string;
  __typename: "Company";
};

export type Entity = Contact | Company;

export const datas: Entity[] = [
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

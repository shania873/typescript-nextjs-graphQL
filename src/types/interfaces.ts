export interface Entity {
  __typename: "Contact" | "Company";
  id: string;
  name: string;
  email?: string;
  contactEmail?: string;
  phone?: string;
  industry?: string;
}

export interface GetEntitiesData {
  getEntities: Entity[];
}

export interface SearchFilterProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterType: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EntityTableProps {
  entities: Entity[];
  handleSave: () => void;
}

export interface IFormInputCompany {
  name: string;
  industry: string;
  contactEmail?: string;
}

export interface AddCompanyFormProps {
  refetchEntities: () => void;
}

export interface IFormInputContact {
  name: string;
  email: string;
  phone: string;
}

export interface AddContactFormProps {
  refetchEntities: () => void;
}

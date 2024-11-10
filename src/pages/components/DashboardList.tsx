import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_ENTITIES } from "../graphql/queries";
import AddContactForm from "./AddContactForm";
import EditContactorCompanyForm from "./EditContactCompanyForm";
import AddCompanyForm from "./AddCompanyForm";
import { FaTable } from "react-icons/fa";

interface Entity {
  __typename: "Contact" | "Company";
  id: string;
  name: string;
  email?: string;
  contactEmail?: string;
  phone?: string;
  industry?: string;
}

interface GetEntitiesData {
  getEntities: Entity[];
}

function DashboardList() {
  const { loading, error, data, refetch } =
    useQuery<GetEntitiesData>(GET_ENTITIES);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSave = () => {
    refetch();
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEntities = data?.getEntities.filter((entity) => {
    return (
      (filterType === "all" || entity.__typename === filterType) &&
      entity.name.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div>
      <div className="overflow-x-auto relative">
        <h1 className="text-3xl flex p-5 items-center">
          <FaTable color="black" className="mr-2" /> Tableau de bord
        </h1>
        <div className="pt-5 pb-5 flex justify-between items-center px-5">
          <div className="flex justify-between w-full">
            <div className="flex">
              <div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="p-2 border rounded"
                />
              </div>
              <div
                onChange={handleFilterChange}
                className="flex items-center ml-4"
              >
                <label className="inline-flex items-center mr-2">
                  <input
                    type="radio"
                    name="entityFilter"
                    value="all"
                    checked={filterType === "all"}
                    className="form-radio"
                  />
                  <span className="ml-2">Tous</span>
                </label>
                <label className="inline-flex items-center mr-2">
                  <input
                    type="radio"
                    name="entityFilter"
                    value="Company"
                    checked={filterType === "Company"}
                    className="form-radio"
                  />
                  <span className="ml-2">Compagnies</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="entityFilter"
                    value="Contact"
                    checked={filterType === "Contact"}
                    className="form-radio"
                  />
                  <span className="ml-2">Contacts</span>
                </label>
              </div>
            </div>

            <div>
              <AddContactForm refetchEntities={refetch} />
              <AddCompanyForm refetchEntities={refetch} />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white bg-regal-blue">
            <tr>
              <th scope="col" className="py-3 px-6">
                Nom
              </th>
              <th scope="col" className="py-3 px-6">
                E-mail
              </th>
              <th scope="col" className="py-3 px-6">
                Contact
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEntities?.map((entity) => (
              <tr
                key={entity.id}
                className="bg-white border-b text-gray-900 dark:border-gray-200"
              >
                <td className="py-4 px-6">{entity.name}</td>
                <td className="py-4 px-6">
                  {entity.email || entity.contactEmail}
                </td>
                <td className="py-4 px-6">
                  {entity.phone
                    ? `Phone: ${entity.phone}`
                    : `Industry: ${entity.industry}`}
                </td>
                <td className="py-4 px-6">
                  <EditContactorCompanyForm
                    entity={entity}
                    onSave={handleSave}
                    isOpen={false}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardList;

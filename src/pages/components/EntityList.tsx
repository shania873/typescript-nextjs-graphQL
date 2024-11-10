import { useQuery, gql } from "@apollo/client";
import { GET_ENTITIES } from "../graphql/queries";
import { Button } from "@headlessui/react";
import AddContactForm from "./AddContactForm";
import EditContactorCompanyForm from "./EditContactCompanyForm";
import AddCompanyForm from "./AddCompanyForm";

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

function EntityList() {
  const { loading, error, data, refetch } =
    useQuery<GetEntitiesData>(GET_ENTITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSave = () => {
    refetch();
  };
  return (
    <div>
      <div className="overflow-x-auto relative">
        <div className="pt-5 pb-5 flex justify-end pr-5">
          <AddContactForm refetchEntities={refetch} />
          <AddCompanyForm refetchEntities={refetch} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            {data?.getEntities.map((entity) => (
              <tr
                key={entity.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
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

export default EntityList;

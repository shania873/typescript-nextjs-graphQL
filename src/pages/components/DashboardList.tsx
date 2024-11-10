import { useQuery, gql } from "@apollo/client";
import { GET_ENTITIES } from "../graphql/queries";
import { Button } from "@headlessui/react";
import AddContactForm from "./AddContactForm";
import EditContactorCompanyForm from "./EditContactCompanyForm";
import AddCompanyForm from "./AddCompanyForm";
import { FaTable } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSave = () => {
    refetch();
  };
  return (
    <div>
      <div className="overflow-x-auto relative">
        <h1 className="text-3xl flex p-5 items-center">
          <FaTableList color="black" className="mr-2" /> Tableau de bord
        </h1>
        <div className="pt-5 pb-5 flex justify-end pr-5">
          <AddContactForm refetchEntities={refetch} />
          <AddCompanyForm refetchEntities={refetch} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-white  bg-regal-blue  
          "
          >
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

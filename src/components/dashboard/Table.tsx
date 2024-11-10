import React from "react";
import EditContactorCompanyForm from "../forms/EditContactCompanyForm";
import { EntityTableProps } from "../../types/interfaces";

function Table({ entities, handleSave }: EntityTableProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-white bg-regal-blue">
        <tr>
          <th className="py-3 px-6">Nom</th>
          <th className="py-3 px-6">E-mail</th>
          <th className="py-3 px-6">Contact</th>
          <th className="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <tr
            key={entity.id}
            className="bg-white border-b text-gray-900 dark:border-gray-200"
          >
            <td className="py-4 px-6">{entity.name}</td>
            <td className="py-4 px-6">{entity.email || entity.contactEmail}</td>
            <td className="py-4 px-6">
              {entity.phone
                ? `Téléphone: ${entity.phone}`
                : `Département: ${entity.industry}`}
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
  );
}

export default Table;

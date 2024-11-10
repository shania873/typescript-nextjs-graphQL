import React, { useState } from "react";
import EditContactorCompanyForm from "../forms/EditContactCompanyForm";
import { EntityTableProps } from "../../types/interfaces";
import { Entity } from "../../types/interfaces";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
function Table({ entities, handleSave }: EntityTableProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortEntities = (entities: Entity[]): Entity[] => {
    return entities.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortDirection === "asc" ? -1 : 1;
      if (nameA > nameB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const toggleSortDirection = (): void => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const isPhoneOrIndustry = (entity: Entity): string => {
    if (entity.phone) {
      return `Téléphone: ${entity.phone}`;
    } else if (entity.industry) {
      return `Industrie: ${entity.industry}`;
    } else {
      return "Non rempli";
    }
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-white bg-regal-blue">
        <tr>
          <th
            className="py-3 px-6 cursor-pointer flex items-center"
            onClick={toggleSortDirection}
          >
            Nom
            {sortDirection === "asc" ? (
              <FaArrowUp className="ml-2" />
            ) : (
              <FaArrowDown className="ml-2" />
            )}
          </th>
          <th className="py-3 px-6">E-mail</th>
          <th className="py-3 px-6">Contact</th>
          <th className="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortEntities([...entities]).map((entity) => (
          <tr
            key={entity.id}
            className="bg-white border-b text-gray-900 dark:border-gray-200 hover:bg-gray-100"
          >
            <td className="py-4 px-6">{entity.name}</td>
            <td className="py-4 px-6">{entity.email || entity.contactEmail}</td>
            <td className="py-4 px-6">{isPhoneOrIndustry(entity)}</td>
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

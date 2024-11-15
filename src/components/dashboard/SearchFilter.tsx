import React from "react";
import { SearchFilterProps } from "../../types/interfaces";
import { Input, Label } from "@headlessui/react";

function SearchFilter({
  searchTerm,
  handleSearchChange,
  filterType,
  handleFilterChange,
}: SearchFilterProps) {
  return (
    <div className="flex justify-between w-full">
      <Input
        type="text"
        placeholder="Rechercher ..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded"
      />
      <div onChange={handleFilterChange} className="flex items-center ml-4">
        {["all", "Company", "Contact"].map((type) => (
          <div key={type} className="inline-flex items-center mr-2">
            <Input
              type="radio"
              name="entityFilter"
              value={type}
              defaultChecked={filterType === type}
              className="form-radio"
            />
            <span className="ml-2">
              {type === "all"
                ? "Tous"
                : type === "Company"
                ? "Compagnies"
                : "Contacts"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;

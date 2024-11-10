import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ENTITIES } from "../../graphql/queries";
import { GetEntitiesData } from "../../types/interfaces";
import AddContactForm from "../forms/AddContactForm";
import AddCompanyForm from "../forms/AddCompanyForm";
import { FaTable } from "react-icons/fa";
import SearchFilter from "../dashboard/SearchFilter";
import Table from "../dashboard/Table";

const DashboardList: React.FC = () => {
  const { loading, error, data, refetch } =
    useQuery<GetEntitiesData>(GET_ENTITIES);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredEntities =
    data?.getEntities.filter((entity) => {
      return (
        (filterType === "all" || entity.__typename === filterType) &&
        entity.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <div>
      <div className="overflow-x-auto relative">
        <h1 className="text-3xl flex p-5 items-center">
          <FaTable color="black" className="mr-2" /> Tableau de bord
        </h1>
        <div className="pt-5 pb-5 flex justify-between items-center px-5">
          <SearchFilter
            searchTerm={searchTerm}
            handleSearchChange={({ target }) => setSearchTerm(target.value)}
            filterType={filterType}
            handleFilterChange={({ target }) => setFilterType(target.value)}
          />
          <div className="flex">
            <AddContactForm refetchEntities={refetch} />
            <AddCompanyForm refetchEntities={refetch} />
          </div>
        </div>
        <Table entities={filteredEntities} handleSave={refetch} />
      </div>
    </div>
  );
};

export default DashboardList;

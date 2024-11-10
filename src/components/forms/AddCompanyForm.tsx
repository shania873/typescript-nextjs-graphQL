import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ENTITY } from "../../graphql/mutations";
import { Input, Button } from "@headlessui/react";
import ModalLayout from "../layout/Modal";
import { IFormInputCompany, AddCompanyFormProps } from "../../types/interfaces";

function AddCompanyForm({ refetchEntities }: AddCompanyFormProps) {
  const { register, handleSubmit, reset } = useForm<IFormInputCompany>();
  const [createEntity, { loading, error }] = useMutation(CREATE_ENTITY);
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInputCompany> = async (data) => {
    const input = { ...data, entityType: "Company" };
    await createEntity({ variables: { input } });
    reset();
    setIsOpen(false);
    refetchEntities();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      error={error}
      title={"Ajout d'une compagnie"}
      isEdit={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <Input
          {...register("name")}
          placeholder="Nom"
          className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50"
          required
        />
        <Input
          {...register("industry")}
          placeholder="Industrie"
          className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50"
          required
        />
        <Input
          {...register("contactEmail")}
          placeholder="E-mail de contact"
          className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50"
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="rounded bg-regal-blue  px-4 py-2 text-sm text-white hover:bg-regal-blue-50"
          >
            Ajouter compagnie
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default AddCompanyForm;

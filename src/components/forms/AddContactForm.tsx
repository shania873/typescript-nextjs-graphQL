import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ENTITY } from "../../graphql/mutations";
import { Button, Input } from "@headlessui/react";
import { IFormInputContact, AddContactFormProps } from "../../types/interfaces";
import ModalLayout from "../layout/Modal";

function AddContactForm({ refetchEntities }: AddContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputContact>();
  const [createEntity, { loading, error }] = useMutation(CREATE_ENTITY);
  const [isOpen, setIsOpen] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const onSubmit: SubmitHandler<IFormInputContact> = async (data) => {
    const input = { ...data, entityType: "Contact" };
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
      title={"Ajout d'un contact"}
      isEdit={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Input
          {...register("name")}
          className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50 mt-4 border-r-0"
          placeholder="Nom"
          type="text"
          required
        />
        <Input
          {...register("email", {
            required: "L'adresse e-mail est requise",
            pattern: {
              value: emailPattern,
              message: "L'adresse e-mail n'est pas valide",
            },
          })}
          className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50 mt-4"
          placeholder="E-mail"
          type="text"
        />
        {errors.email && (
          <p className="text-red-500 space-y-0 text-xs mb-2 mt-0">
            {errors.email.message}
          </p>
        )}
        <Input
          {...register("phone")}
          className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50 mt-4"
          placeholder="Téléphone"
          type="phone"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mb-2">{errors.phone.message}</p>
        )}
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
            Ajout d'un contact
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default AddContactForm;

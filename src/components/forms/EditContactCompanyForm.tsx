import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button, Field, Input, Label } from "@headlessui/react";
import { EntityProps } from "@/types/interfaces";
import { UPDATE_ENTITY } from "../../graphql/mutations";
import ModalLayout from "../layout/Modal";

function EditContactCompanyForm({ entity, onSave }: EntityProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      entityType: "email" in entity ? "Contact" : "Company",
      id: entity.id,
      name: entity.name,
      email: "email" in entity ? entity.email : "",
      phone: "phone" in entity ? entity.phone : "",
      industry: "industry" in entity ? entity.industry : "",
      contactEmail: "contactEmail" in entity ? entity.contactEmail : "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [updateEntity, { loading, error }] = useMutation(UPDATE_ENTITY, {
    onCompleted: () => {
      onSave();
      setIsOpen(false);
    },
  });

  const onSubmit = (formData: any) => {
    const input = {
      ...formData,
      id: entity.id,
      entityType: "email" in entity ? "Contact" : "Company",
    };
    updateEntity({ variables: { input } });
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      error={error}
      title={`${
        "email" in entity ? "Éditer un Contact" : "Éditer une Entreprise"
      }`}
      isEdit={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <Field>
          <Label htmlFor="name" className="text-gray-900">
            Nom
          </Label>
          <Input
            {...register("name", { required: "Ce champ est requis" })}
            placeholder="Nom"
            className="w-full rounded border border-gray-300 p-2 text-gray-900"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </Field>

        {"email" in entity && (
          <>
            <Field>
              <Label htmlFor="email" className="text-gray-900">
                E-mail
              </Label>
              <Input
                {...register("email", { required: "Ce champ est requis" })}
                placeholder="E-mail"
                className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-regal-blue-50"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="phone" className="text-gray-900">
                Téléphone
              </Label>
              <Input
                {...register("phone")}
                placeholder="Téléphone"
                className="w-full rounded border border-gray-300 p-2 text-gray-900"
              />
            </Field>
          </>
        )}

        {"industry" in entity && (
          <>
            <Field>
              <Label htmlFor="industry" className="text-gray-900">
                Industrie
              </Label>
              <Input
                {...register("industry", { required: "Ce champ est requis" })}
                placeholder="Industrie"
                className="w-full rounded border border-gray-300 p-2 text-gray-900"
              />
              {errors.industry && (
                <p className="text-red-500 text-xs italic">
                  {errors.industry.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="contactEmail" className="text-gray-900">
                E-mail de contact
              </Label>
              <Input
                {...register("contactEmail")}
                placeholder="E-mail de contact"
                className="w-full rounded border border-gray-300 p-2 text-gray-900"
              />
            </Field>
          </>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-regal-blue-50"
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-regal-blue text-white rounded hover:bg-regal-blue-50"
          >
            {loading ? "Sauver..." : "Sauvegarder"}
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default EditContactCompanyForm;

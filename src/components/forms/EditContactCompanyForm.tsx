import React, { useState, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  Button,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { Contact, Company } from "../../pages/api/types";
import { UPDATE_ENTITY } from "../../graphql/mutations";
import { FaUserEdit, FaPen } from "react-icons/fa";
import ModalLayout from "../layout/Modal";
interface EntityProps {
  entity: Contact | Company;
  onSave: () => void;
  isOpen: boolean;
}
function EditContactCompanyForm({ entity, onSave }: EntityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    entityType: "email" in entity ? "Contact" : "Company",
    id: entity.id,
    name: entity.name,
    email: "email" in entity ? entity.email : "",
    phone: "phone" in entity ? entity.phone : "",
    industry: "industry" in entity ? entity.industry : "",
    contactEmail: "contactEmail" in entity ? entity.contactEmail : "",
  });

  const [updateEntity, { loading, error }] = useMutation(UPDATE_ENTITY, {
    onCompleted: () => {
      onSave();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEntity({ variables: { input: formData } });
    setIsOpen(false);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      error={error}
      title={`${
        formData.entityType === "Company"
          ? "Editer une Compagnie"
          : "Editer un Contact"
      } `}
      isEdit={true}
    >
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Field>
          <Label htmlFor="name" className={"text-gray-900"}>
            Nom
          </Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full rounded border border-gray-300 p-2 text-gray-900"
          />
        </Field>

        {formData.entityType === "Contact" && (
          <>
            <Field>
              <Label htmlFor="email" className={"text-gray-900"}>
                E-mail
              </Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="text-gray-900 w-full rounded-md border border-gray-300 p-2 focus:border-sky-500"
              />
            </Field>

            <Field>
              <Label htmlFor="name" className={"text-gray-900"}>
                Téléphone
              </Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full rounded border border-gray-300 p-2 text-gray-900"
              />
            </Field>
          </>
        )}

        {formData.entityType === "Company" && (
          <>
            <Field>
              <Label htmlFor="name" className={"text-gray-900"}>
                Industrie
              </Label>
              <Input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry"
                className="w-full rounded border border-gray-300 p-2 text-gray-900"
              />
            </Field>

            <Field>
              <Label htmlFor="name" className={"text-gray-900"}>
                E-mail de contact
              </Label>
              <Input
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Contact Email"
                className="w-full rounded border border-gray-300 p-2 text-gray-900"
              />
            </Field>
          </>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-regal-blue  text-white rounded hover:bg-regal-blue-50"
          >
            {loading ? "Saving..." : "Sauvegarder"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default EditContactCompanyForm;

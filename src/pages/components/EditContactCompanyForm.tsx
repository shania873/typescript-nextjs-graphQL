import React, { useState, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  Button,
  Switch,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { Contact, Company } from "../api/types";
import { UPDATE_ENTITY } from "../graphql/mutations";
import { FaUserEdit, FaPen } from "react-icons/fa";
interface EntityProps {
  entity: Contact | Company;
  onSave: () => void;
  isOpen: boolean;
}

const EditContactCompanyForm: React.FC<EntityProps> = ({ entity, onSave }) => {
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

  console.log(formData);

  return (
    <>
      <Button
        className="rounded 
         py-2 px-4 text-sm text-white hover:text-gray-400 active:text-gray-400"
        onClick={() => setIsOpen(true)}
      >
        <FaPen color="black" />
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
          </Transition>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition
              as={Fragment}
              show={isOpen}
              enter="transition-transform duration-200"
              enterFrom="scale-95"
              enterTo="scale-100"
              leave="transition-transform duration-200"
              leaveFrom="scale-100"
              leaveTo="scale-95"
            >
              <DialogPanel className="max-w-md w-full bg-white rounded-lg p-6 shadow-lg">
                <DialogTitle className="text-lg font-medium text-gray-900 flex items-center">
                  <FaUserEdit
                    className="mr-2 hover:opacity-50"
                    color="#00000"
                  />
                  Editer{" "}
                  {formData.entityType === "Company" ? "Compagnie" : "Contact"}
                </DialogTitle>

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
                        <Label htmlFor="name" className={"text-gray-900"}>
                          E-mail
                        </Label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          className="w-full rounded border border-gray-300 p-2 text-gray-900"
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
                {loading && <p>Mise à jour...</p>}
                {error && (
                  <p className="text-red-500 text-sm">Error: {error.message}</p>
                )}
              </DialogPanel>
            </Transition>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditContactCompanyForm;

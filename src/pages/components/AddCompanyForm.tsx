import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useState, Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ENTITY } from "../graphql/mutations";
import { Button, Input } from "@headlessui/react";

interface IFormInput {
  name: string;
  industry: string;
  contactEmail?: string;
}

interface AddCompanyFormProps {
  refetchEntities: () => void;
}

function AddCompanyForm({ refetchEntities }: AddCompanyFormProps) {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [createEntity, { loading, error }] = useMutation(CREATE_ENTITY);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const input = {
      ...data,
      entityType: "Company",
    };
    await createEntity({ variables: { input } });
    reset();
    setIsOpen(false);
    refetchEntities();
  };

  return (
    <>
      <Button
        className="rounded bg-sky-600 py-2 px-4 text-sm text-white hover:bg-sky-500 active:bg-sky-700 ml-2 mr-2"
        onClick={() => setIsOpen(true)}
      >
        Ajout d'un compagnie
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
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
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
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
              <DialogPanel className="max-w-lg w-full rounded-lg bg-white p-6 shadow-lg">
                <DialogTitle className="text-xl font-semibold text-gray-700">
                  Ajout d'un compagnie
                </DialogTitle>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-4"
                >
                  <Input
                    {...register("name")}
                    className="text-black w-full rounded-md border border-gray-300 p-2 focus:border-sky-500"
                    placeholder="Name"
                    required
                  />
                  <Input
                    {...register("industry")}
                    className="text-black w-full rounded-md border border-gray-300 p-2 focus:border-sky-500"
                    placeholder="Industry"
                    required
                  />
                  <Input
                    {...register("contactEmail")}
                    className="text-black w-full rounded-md border border-gray-300 p-2 focus:border-sky-500"
                    placeholder="Contact Email"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500"
                    >
                      {loading ? "Adding..." : "Add Company"}
                    </Button>
                  </div>
                </form>

                {error && (
                  <p className="mt-4 text-sm text-red-500">
                    Error: {error.message}
                  </p>
                )}
              </DialogPanel>
            </Transition>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddCompanyForm;

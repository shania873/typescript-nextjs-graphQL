import React from "react";
import { ModalLayoutProps } from "@/types/interfaces";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { FaBuilding, FaPen } from "react-icons/fa";
import { Button } from "@headlessui/react";

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  isOpen,
  setIsOpen,
  error,
  title,
  isEdit,
}) => {
  return (
    <>
      <Button
        className={`rounded ${
          isEdit
            ? " bg-white hover:bg-slate-100 active:bg-slate-400"
            : " bg-regal-blue hover:bg-regal-blue-50"
        }  py-2 px-4 text-sm text-white  active:bg-regal-blue-50 ml-2 mr-2`}
        onClick={() => setIsOpen(true)}
      >
        {isEdit ? <FaPen color="black" /> : title}
      </Button>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition
            as={React.Fragment}
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
              as={React.Fragment}
              show={isOpen}
              enter="transition-transform duration-200"
              enterFrom="scale-95"
              enterTo="scale-100"
              leave="transition-transform duration-200"
              leaveFrom="scale-100"
              leaveTo="scale-95"
            >
              <DialogPanel className="max-w-lg w-full rounded-lg bg-white p-6 shadow-lg">
                <DialogTitle className="text-xl font-semibold text-gray-700 flex items-center">
                  <FaBuilding className="mr-2" /> {title}
                </DialogTitle>

                {children}

                {error && (
                  <p className="mt-4 text-sm text-red-500">
                    Erreurs: {error.message}
                  </p>
                )}
              </DialogPanel>
            </Transition>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalLayout;

import { Dialog } from "@headlessui/react";
import { useReducerState } from "~/store";
import { closeModal } from "~/store/actions";

export interface Props {
  title: string;
  description: string;
}
export default function DismissModal({ title, description }: Props) {
  const { dispatch } = useReducerState();

  return (
    <div className="max-w-xs px-4 pt-5 pb-4 text-left transition-all sm:w-full sm:p-6">
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {title}
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="btn"
          onClick={() => dispatch(closeModal)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

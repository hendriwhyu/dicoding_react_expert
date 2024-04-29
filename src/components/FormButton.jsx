import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import FormModal from './FormModal';

function FormButton() {
  const showModal = () => {
    document.getElementById('form_modal').showModal();
  };
  return (
    <div className="fixed bottom-10 right-10">
      <button
        type="button"
        className="btn btn-primary rounded-xl text-xl text-white"
        onClick={() => showModal()}
      >
        <AiOutlinePlus />
      </button>
      <FormModal />
    </div>
  );
}

export default FormButton;

import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import FormModal from './FormModal';
import { asyncAddThread } from '../states/threads/thunk';

function FormButton() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };

  const formSubmitHandler = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    hideModal();
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
      <Modal
        ariaHideApp={false}
        className="text-center items-center h-full place-content-center flex"
        isOpen={modal}
        onRequestClose={hideModal}
      >
        <FormModal hideModal={hideModal} submitHandler={formSubmitHandler} />
      </Modal>
    </div>
  );
}

export default FormButton;

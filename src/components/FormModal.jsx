import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function FormModal({ hideModal, submitHandler }) {
  const [title, onChangeTitle] = useInput('');
  const [category, onChangeCategory] = useInput('');
  const [body, setBody] = useState();

  const bodyChangeHandler = (event) => {
    setBody(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    submitHandler({ title, category, body });
  };

  return (
    <div className="modal-box ">
      <button
        type="button"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => hideModal()}
      >
        <RxCross2 />
      </button>
      <h3 className="font-bold text-lg mb-3">Buat Diskusi Baru</h3>

      <form className="flex flex-col gap-3">
        <div className="title form-control w-full">
          <div className="label">
            <span className="label-text">Judul Diskusi</span>
          </div>
          <input
            type="text"
            value={title}
            placeholder="Judul..."
            onChange={onChangeTitle}
            className="input input-bordered w-full"
          />
        </div>
        <div className="category form-control w-full">
          <div className="label">
            <span className="label-text">Category</span>
            <span className="label-text-alt badge badge-primary text-white">
              Optional
            </span>
          </div>
          <input
            type="text"
            value={category}
            placeholder="Kategori..."
            onChange={onChangeCategory}
            className="input input-bordered w-full"
          />
        </div>
        <div className="description form-control">
          <div className="label">
            <span className="label-text">Deskripsi</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Deskripsi..."
            value={body}
            onChange={bodyChangeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline btn-primary"
          onClick={formSubmitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

FormModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default FormModal;

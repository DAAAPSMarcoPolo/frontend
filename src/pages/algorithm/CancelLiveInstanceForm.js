import React from 'react';
import ModalWrapper from '../components/ModalWrapper';
import 'react-datepicker/dist/react-datepicker.css';

const CancelLiveInstanceForm = ({ submitForm, parent, error, showModal, toggleState, name , id}) => {
    return (
      <ModalWrapper
            title={`Are you sure you want to cancel Live instance ${id}`}
            width={800}
            showOk={true}
            showModal={showModal}
            toggleState={toggleState}
            name={name}
            >
                <div className="errorClass">
                    {' '}
                    {error && error}
                </div>
                <form onSubmit={submitForm}>
                    <button type="submit">Cancel Live Instance</button>
                </form>
        </ModalWrapper>
    );
};

export default CancelLiveInstanceForm;

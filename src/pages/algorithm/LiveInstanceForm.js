import React from 'react';
import ModalWrapper from '../components/ModalWrapper';
import 'react-datepicker/dist/react-datepicker.css';

const LiveInstanceForm = ({ submitForm, parent, error, showModal, toggleState, name }) => {
    return (
      <ModalWrapper
            title="Create a Live Instance"
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
                    <input type="text" placeholder="Initial Funds" name="initial_funds" required/>
                    <button type="submit">Submit</button>
                </form>
        </ModalWrapper>
    );
};

export default LiveInstanceForm;

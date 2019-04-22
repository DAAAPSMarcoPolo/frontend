import React from 'react';
import ModalWrapper from '../components/ModalWrapper';
import 'react-datepicker/dist/react-datepicker.css';

const LiveInstanceForm = ({ submitForm, parent, error, showModal, toggleState, name, funds }) => {
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
                    <label name="initial_funds">Initial Funds</label>
                    <p>You currently have ${funds} to invest.</p>
                    <input type="number" placeholder="Initial Funds" name="initial_funds" min="0" max={funds} required/>
                    <button type="submit">Submit</button>
                </form>
        </ModalWrapper>
    );
};

export default LiveInstanceForm;

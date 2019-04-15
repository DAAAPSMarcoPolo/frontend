import React from 'react';
import DatePicker from 'react-datepicker';
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
                <form onSubmit={submitForm}>
                    <div>
                        <DatePicker
                            selected={parent.state.endDate}
                            onChange={parent.handleEndDateSelect}
                            maxDate={new Date()}
                            placeholderText="End Date"
                            dateFormat="yyyy-MM-dd"
                            name="endDate"
                        />
                        <input type="text" placeholder="Initial Funds" name="initial_funds" required/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
        </ModalWrapper>
    );
};

export default LiveInstanceForm;

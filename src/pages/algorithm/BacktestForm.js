import React from 'react';
import DatePicker from 'react-datepicker';
import ChooseUniverse from '../universe/ChooseUniverse';
import ModalWrapper from '../components/ModalWrapper';
import 'react-datepicker/dist/react-datepicker.css';

const BacktestForm = ({ submitForm, parent, error, handleSelectUniverse, showModal, toggleState, name }) => {
    return (
      <ModalWrapper
            title="Start a new Backtest"
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
                    <div>
                        <DatePicker
                            selected={parent.state.startDate}
                            onChange={parent.handleStartDateSelect}
                            maxDate={new Date()}
                            placeholderText="Start Date"
                            dateFormat="yyyy-MM-dd"
                            name="startDate"
                        />
                        <DatePicker
                            selected={parent.state.endDate}
                            onChange={parent.handleEndDateSelect}
                            maxDate={new Date()}
                            placeholderText="End Date"
                            dateFormat="yyyy-MM-dd"
                            name="endDate"
                        />
                        <ChooseUniverse selectUniverse={parent.handleSelectUniverse}/>
                        <input type="text" placeholder="Initial Funds" name="initial_funds" required/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
        </ModalWrapper>
    );
};

export default BacktestForm;

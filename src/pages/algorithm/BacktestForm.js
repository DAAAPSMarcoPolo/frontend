import React from 'react';
import DatePicker from 'react-datepicker';
import ChooseUniverse from '../universe/ChooseUniverse';
import 'react-datepicker/dist/react-datepicker.css';
import x from '../../assets/images/x-icon.png';

const BacktestForm = ({ submitForm, exitForm, parent, error, handleSelectUniverse }) => {
    return (
        <div className="con rel">
        <img
            className="icon roster"
            src={x}
            alt="x-icon"
            onClick={exitForm}
        />
          <h3>Start a new Backtest</h3>
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
        </div>
    );
};

export default BacktestForm;

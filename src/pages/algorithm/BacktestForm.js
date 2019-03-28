import React from 'react';
import DatePicker from 'react-datepicker';
import ChooseUniverse from '../universe/ChooseUniverse';
import 'react-datepicker/dist/react-datepicker.css';

const BacktestForm = ({ submitForm, exitForm, parent, error }) => {
    return (
        <div className="con">
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
                    <label>Choose your Universe</label>
                    <ChooseUniverse/>
                    <input type="text" placeholder="Universe" name="universe" required/>
                    <input type="text" placeholder="Initial Funds" name="initial_funds" required/>
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={exitForm}>Cancel</button>
        </div>
    );
};

export default BacktestForm;

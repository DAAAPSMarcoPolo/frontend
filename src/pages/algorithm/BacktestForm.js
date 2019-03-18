import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BacktestForm = ({ submitForm, exitForm, parent }) => {
    return (
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <DatePicker
                        selected={parent.state.startDate}
                        onChange={parent.handleStartDateSelect}
                        maxDate={new Date()}
                    />
                    <DatePicker
                        selected={parent.state.endDate}
                        onChange={parent.handleEndDateSelect}
                        maxDate={new Date()}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={exitForm}>Cancel</button>
        </div>
    );
};

export default BacktestForm;

import React, {Component} from 'react';
import "../../assets/algo.css";

const buttonStyling = (filter, filters) => {
    if (filters[filter]){
        return "sort-button selected";
    } else {
        return "sort-button"
    }
};

const BacktestFilters = ({updateFilter, currentFilters}) =>{
    return (
        <div>
            <h3>Filter by:</h3>
            <button className={buttonStyling("vote", currentFilters)} onClick={(e) => updateFilter(e, "vote")}>Needs Vote</button>
            <button className={buttonStyling("user", currentFilters)} onClick={(e) => updateFilter(e, "user")}>Mine</button>
        </div>
    )
};

export default BacktestFilters;
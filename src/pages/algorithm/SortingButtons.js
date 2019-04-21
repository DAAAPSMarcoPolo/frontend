import React, {Component} from 'react';
import "../../assets/algo.css";
const SortingButtons = ({updateMetric}) =>{
    return (
        <div>
            <h3>Sort by:</h3>
            <button className="sort-button" onClick={(e) => updateMetric(e, "sharpe")}>Sharpe Ratio</button>
            <button className="sort-button" onClick={(e) => updateMetric(e, "date")}>Creation Date</button>
            <button className="sort-button" onClick={(e) => updateMetric(e, "gain")}>Percent Gain</button>
        </div>
    )
};

export default SortingButtons;
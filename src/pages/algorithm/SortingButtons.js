import React from 'react';
import "../../assets/algo.css";

const buttonStyling = (metric, currentMetric) => {
    if (metric === currentMetric){
        return "sort-button selected";
    } else {
        return "sort-button"
    }
};

const SortingButtons = ({updateMetric, currentMetric}) =>{
    return (
        <div>
            <h3>Sort by:</h3>
            <button className={buttonStyling("sharpe", currentMetric)} onClick={(e) => updateMetric(e, "sharpe")}>Sharpe Ratio</button>
            <button className={buttonStyling("date", currentMetric)} onClick={(e) => updateMetric(e, "date")}>Creation Date</button>
            <button className={buttonStyling("gain", currentMetric)} onClick={(e) => updateMetric(e, "gain")}>Percent Gain</button>
        </div>
    )
};

export default SortingButtons;

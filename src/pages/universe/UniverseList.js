import React, {Component} from 'react';
import './../../assets/universe.css';

const listItemClass = (universe, item) => {
    if (universe == null || universe.id !== item.id){
          return "universe-list-item";
    } else {
        return "universe-list-item selected"
    }
};

const UniverseList = (props) => {
    if (props.universeList == null){
        return null;
    } else {
        return (
            <ul className="universe-list">
                {props.universeList.map((item, key)=>(
                    <li
                        className={listItemClass(props.selection, item)}
                        onClick={(e) => props.setUniverse(e, item)}
                        key={key}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        )
    }
};

export default UniverseList;
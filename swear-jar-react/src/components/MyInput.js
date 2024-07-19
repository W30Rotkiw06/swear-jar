import React from "react";
import PropTypes from "prop-types";


const  MyInput = props =>{
    var {label, type, name, value, className, onChange, onFocus, additionalInfo} = props;
    if (name === "password"){type=name}
    return(
        <div>
            <p className="Input-label" htmlFor={name}>{label}</p>
            <input type={type} id={name} name={name} value={value} className={className} onChange={onChange}  onFocus={onFocus}/>
            <p className="Add-info-input">{additionalInfo}</p>
        </div>
    );
}
MyInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
}

export default MyInput; 
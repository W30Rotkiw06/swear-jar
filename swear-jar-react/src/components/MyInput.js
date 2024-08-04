import React from "react";
import PropTypes from "prop-types";


const  MyInput = props =>{
    var {label, type, name, value, className, onChange, onFocus, additionalInfo, autoFocus=false , addClassName, addClassNameMsg} = props;
    let label_class = "Input-label";
    let label_info_class = "Add-info-input ";
    return(
        <div style={{height: "70px", position: "relative"}}>
            <p className={label_class} htmlFor={name}>{label}</p>
            <input type={type} id={name} name={name} value={value} className={className} onChange={onChange}  onFocus={onFocus} autoFocus={autoFocus}/>
            <p className={label_info_class}>{additionalInfo}</p>
        </div>
    );
}
MyInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
}

export default MyInput; 
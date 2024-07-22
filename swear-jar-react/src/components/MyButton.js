import PropTypes from "prop-types";

const MyButton= props =>{
    const {name, onClick, className, displayedText, isDisabled=false} = props
    return(
        <button name={name} onClick={onClick} className={className} disabled={isDisabled}>{displayedText}</button>
    )
}
MyButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string.isRequired,
    displayedText: PropTypes.string,
    isDisabled: PropTypes.bool,
}

export default MyButton;
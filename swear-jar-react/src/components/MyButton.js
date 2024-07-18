const MyButton= props =>{
    const {name, onClick, className, displayedText} = props
    return(
        <button name={name} onClick={onClick} className={className}>{displayedText}</button>
    )
}

export default MyButton;
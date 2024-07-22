function JarDetails(props){
    var {onClick} = props;
    let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
    let jar_class_color = "jar details "+ props.jar.color
    return(
        <div onClick={onClick} className={jar_class_color}>
            <p className={jar_name_class}>{props.jar.name}</p>
            <p className="jar-balance">{props.jar.total_money}</p>
            <p className="jar-members">{props.members_formated}</p>
            <p></p>
        </div>     
    )
}

export default JarDetails;
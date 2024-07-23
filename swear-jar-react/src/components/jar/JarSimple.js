function JarSimple(props){
    var {onClick} = props;
    let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
    return(
        <div style={{backgroundColor: props.jar.color}} onClick={onClick} className={"jar simple"}>
            <p className={jar_name_class}>{props.jar.name}</p>
            <p className="jar-balance">{props.jar.total_money}</p>
            <p className="jar-members">{props.members_formated}</p>
            <p></p>
        </div>     
    )
}

export default JarSimple;
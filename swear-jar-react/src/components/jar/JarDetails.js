import Report from "./Report";
import settings_logo from "../../assets/settings.png"
import Chart from "./Chart";

function JarDetails(props){
    var {onClick} = props;
    let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
    return(
        <div style={{backgroundColor: props.jar.color}} className="jar details">
            <div className="jar-close-button" onClick={props.close}>×</div>
            <p className={jar_name_class}>{props.jar.name}</p>
            <img className="jar-settings-logo"  src={settings_logo} alt="s"/>
            <Report {...props}/>
            <Chart {...props}/>
        </div>     
    )
}

export default JarDetails;
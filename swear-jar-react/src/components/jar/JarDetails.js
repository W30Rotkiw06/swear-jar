import Report from "./Report";
import settings_logo from "../../assets/settings.png"
import Chart from "./Chart";
import { Component } from "react";

class JarDetails  extends Component{
    constructor(props){
        super(props);
        let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
        this.state = {
            jar_name_class: jar_name_class,
        };
    }

    componentDidMount = () =>{
        let height = this.props.jar.total_money === 0? 180: 480;
        this.props.changeHeight(height);
    }

    componentDidUpdate = ()=>{
        let height = this.props.jar.total_money === 0? 180: 480;
        if (this.props.jar_height !== height){
        this.props.changeHeight(height);}
    }
    
    
    render(){
        return(
            <div className="details">
                <div className="jar-close-button" onClick={this.props.close}>×</div>
                <p className={this.state.jar_name_class}>{this.props.jar.name}</p>
                <img className="jar-settings-logo"  src={settings_logo} alt="s"/>
                <Report {...this.props}/>
                {
                    this.props.jar.total_money === 0? <></>: <Chart {...this.props}/>
                }
            </div>     
        )
    }
    
}

export default JarDetails;
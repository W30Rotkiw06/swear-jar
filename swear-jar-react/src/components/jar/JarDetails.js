import settings_logo from "../../assets/settings.png"
import Report from "./Report";
import Chart from "./Chart";
import JarSettings from "./JarSettings";
import { Component } from "react";

class JarDetails  extends Component{
    constructor(props){
        super(props);
        let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
        this.state = {
            jar_name_class: jar_name_class,
            show_settings: false,
            head_message: "Who said naughty word?",
            kick_people: false,
        };
    }

    componentDidMount = () =>{
        let height = this.props.jar.total_money === 0? 180: 480;
        this.props.changeHeight(height);
    }

    componentDidUpdate = ()=>{
        let height
        if (this.state.show_settings === true){height = 220}
        else{
        if (this.props.jar.total_money === 0 || this.props.jar.is_anon || this.state.kick_people){
            height = 180;
        }else{height = 480}
        }
        if (this.props.jar_height !== height){
        this.props.changeHeight(height);}
    }

    showHideSettings = () =>{
        if (this.props.admin){this.setState({show_settings: !this.state.show_settings})}
    }

    showHideKickPeople = () =>{
        if (this.props.admin){
            let msg = this.state.kick_people ===false? "Select person to remove" : "Who said naughty word?"
            this.setState({kick_people: !this.state.kick_people, head_message: msg})
        }
    }
    
    
    render(){
        return(
            <div className="details">
                <div className="jar-close-button" onClick={this.props.close}>×</div>
                {
                    this.props.admin?
                    <div>
                        <img onClick={this.showHideSettings} className="jar-settings-logo"  src={settings_logo} alt="s"/>
                        {!this.state.show_settings && this.props.members_list.length >1? <img onClick={this.showHideKickPeople} className="jar-kick-logo"  src={settings_logo} alt="k"/>: <></>}
                        
                    </div>: <></>
                }
                <p className={this.state.jar_name_class}>{this.props.jar.name}</p>
                

                {
                    this.state.show_settings?
                    <JarSettings {...this.props}/>
                    :
                    <div>
                        <Report {...this.props} header={this.state.head_message} kickPeople={this.state.kick_people}/>
                        {
                            this.props.jar.total_money === 0 || this.props.jar.is_anon || this.state.kick_people? <></>: <Chart {...this.props}/>
                        }
                    </div>
                }

                
            </div>     
        )
    }
    
}

export default JarDetails;
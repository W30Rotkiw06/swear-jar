import settings_logo from "../../assets/settings.png"
import Report from "./Report";
import Chart from "./Chart";
import JarSettings from "./JarSettings";
import LeaveJar from "./LeaveJar";
import { Component } from "react";

import close_icon from "../../assets/close button.JPG";

class JarDetails  extends Component{
    constructor(props){
        super(props);
        let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
        this.state = {
            jar_name_class: jar_name_class,
            show_settings: false,
            head_message: "Who said naughty word?",
            deafult_message: "Who said naughty word?",
            manage_members: false,
            suspend_remove: false, // suspend-false, remove-true
        };
    }

    componentDidMount = () =>{
        let height = this.props.jar.total_money === 0? 180: 480;
        this.props.changeHeight(height);
        if (this.props.is_suspended){this.setState({head_message: "You are suspended"})}
        else{this.setState({head_message: this.state.deafult_message})}
    }

    componentDidUpdate = ()=>{
        let height
        if (this.state.show_settings === true){height = 320}
        else{
        if (this.props.jar.total_money === 0 || (this.props.jar.is_anon && !this.props.admin) || this.state.manage_members){
            height = 205;
        }else{height = 460}
        }
        if (this.props.jar_height !== height){
        this.props.changeHeight(height);}

        if (this.props.is_suspended && this.state.head_message !== "You are suspended"){this.setState({head_message: "You are suspended"})}
        if (!this.props.is_suspended && this.state.head_message === "You are suspended"){this.setState({head_message: this.state.deafult_message})}
    }

    showHideSettings = () =>{
        if (this.props.admin){this.setState({show_settings: !this.state.show_settings, manage_members: false, head_message: this.state.deafult_message})}
    }

    showHideKickPeople = () =>{
        if (this.props.admin){
            let add_msg = !this.state.suspend_remove? "suspend": "remove";
            let msg = this.state.manage_members ===false? "Select person to " + add_msg: this.state.deafult_message
            this.setState({manage_members: !this.state.manage_members, head_message: msg})
        }
    }

    changeStateCallack = (state_name, state_value)=>{
        let add_msg = this.state.suspend_remove? "suspend": "remove";

        this.setState({[state_name]: state_value, head_message: "Select person to " + add_msg})

    }

    changePropsCallback =(state_name, state_value)=>{
        this.props.callback_jar(state_name, state_value)
    }
    

    
    render(){
        return(
            <div className="details">
                
                <img src={close_icon} alt="" className="jar-close-button" onClick={this.props.close}/>
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
                        <Report {...this.props} {...this.state} header={this.state.head_message} manage_members={this.state.manage_members} callback={this.changeStateCallack} jar_callback={this.changePropsCallback}/>
                        {
                            this.props.jar.total_money === 0 || (this.props.jar.is_anon && !this.props.admin) || this.state.manage_members? <></>: <Chart {...this.props}/>
                        }
                        {this.state.manage_members || this.props.admin? <></>: <LeaveJar {...this.props}/>}
                    </div>
                }
                

                
            </div>     
        )
    }
    
}

export default JarDetails;
import { Component } from "react";
import MyButton from "../../components/MyButton";
import SettingSegment from "../../components/SettingSegment";

import ChangeProfilePicture from "./ChangeProfilePicture";
import ChangeName from "./ChangeName";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

import { TwitterPicker } from "react-color";

class ProfileSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            was_reported: "?",
            reported_sb: "?",
            settings_page: "home",
            color: "white"
        }
    }

    componentDidMount= async()=>{
        let {data, error} = await this.props.supabase.from("users").select().eq("user_mail", this.props.email);
        let user_was_reported  = data[0].was_reported;
        let user_reported_sb = data[0].reported_someone;
        let color = data[0].deafult_color;
        this.setState({
            was_reported: user_was_reported,
            reported_sb: user_reported_sb,
            color: color,
            color_pallete: false
        })
    }

    logOut = async() =>{
        await this.props.supabase.auth.signOut()
        this.props.changeAppState("session", "");
        this.props.changeAppState("previous", "");
        this.props.changeAppState("page", "start");
    }

    chooseProfilePicture = () =>{
        this.setState({settings_page: "profile-picture-choose"});
    }

    changeName = () =>{
        this.setState({settings_page: "change-name"});
    }

    changeEmail = () =>{
        this.setState({settings_page: "change-email"});
    }

    changePassword = () =>{
        this.setState({settings_page: "change-password"});
    }


    backToSettings = () =>{
        this.setState({
           settings_page: "home",
        })
    }

    showHidePallete = ()=>{
        this.setState({
            color_pallete: !this.state.color_pallete
        })
    }

    handleColorChange = async(color) => {
        var {error} = await this.props.supabase.from("users").update({deafult_color: color.hex}).eq("user_mail", this.props.email)
        this.setState({ color: color.hex });
      };


    render(){
        switch (this.state.settings_page){
            case "home":
                return(
                <div style={{position: "relative", "top": "20px"}}>
    
                    <div className="head">
                    <MyButton key="back" onClick={this.props.back} name="back" displayedText="← BACK" className="back-button back-button-transform"/>
                    </div>
                    
                    <div className="head">
                        <div style={{width: "250px", textAlign: "left"}}>
                            <h1 style={{position: "relative", right: "20px", textAlign: "left"}} className="headline" >Hello, {this.props.name}</h1>
                        </div>
                        
                        <img style={{cursor: "default"}} className="profile-picture" src={this.props.profile_picture} alt='pct'/>
                    </div>
    
                    <div className='jar_container'>
                        <div style={{width: "350px", textAlign: "left", position: "relative", left: "8px", top: "-15px"}}>
                            <p>
                                You reported your friends <span style={{color: "#E91C74"}}>{this.state.reported_sb}&nbsp;times,</span> while you were reported <span style={{color: "#E91C74"}}>{this.state.was_reported}&nbsp;times.</span>
                            </p>
                        </div>
    
                        <div style={{position: "relative", left: "20px"}} className="settings">
                            <SettingSegment image={this.props.profile_picture} name="Change profile picture" onClick={this.chooseProfilePicture}/>
                            <SettingSegment image={this.props.profile_picture} name="Change your color" type="color" color={this.state.color} onClick={this.showHidePallete}/>
                            <SettingSegment image={this.props.profile_picture} name="Change name" onClick={this.changeName}/>
                            <SettingSegment image={this.props.profile_picture} name="Change email" onClick={this.changeEmail}/>
                            <SettingSegment image={this.props.profile_picture} name="Change password" onClick={this.changePassword}/>
                        </div>

                        
                        <MyButton key="log out" name="log_out" className="standard-button-dark add-new-jar-button red-close-button" onClick={this.logOut} displayedText="LOG OUT"/>
                        {this.state.color_pallete? (
                            <div>
                                <TwitterPicker onChange={this.handleColorChange} className="color-pallete-settings" triangle="top-right" width="280px"/>
                            </div>
                            ): <></>
                            }
                    </div>
                </div>
            )
            case "profile-picture-choose":
                return(
                    <ChangeProfilePicture {...this.props} backToSettings={this.backToSettings}/>
                )
            case "change-name":
                return(
                    <ChangeName {...this.props} backToSettings={this.backToSettings}/>
                )
            case "change-email":
                return(
                    <ChangeEmail {...this.props} backToSettings={this.backToSettings}/>
                )
            case "change-password":
                return(
                    <ChangePassword {...this.props} backToSettings={this.backToSettings}/>
                )
        }
        
    }
}

export default ProfileSettings;
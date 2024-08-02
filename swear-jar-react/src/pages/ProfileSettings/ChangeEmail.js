import React, { Component } from "react";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

class ChangeEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            button_isactive: false,
            email_comment: ""
        }
    }

    checkMail = event => {
        let atCount = 0;
        let dotCount = 0;
        let mail_correct = false;
    
        const email = event.target.value;

        if (email.length > 4) {
            for (let i = 0; i < email.length; i++) {
                if (email[i] === '@') {atCount++;}
            }
            for (let i = email.length - 4; i < email.length; i++) {
                if (email[i] === '.') {dotCount++;}
            }

            if (atCount !== 1 || dotCount !== 1) {
                this.setState({ email_comment: "That's not an email"});
            } else {
                if(this.props.other_mails.includes(email)){
                    this.setState({ email_comment: "This email is already used"});
                }else{
                    this.setState({ email_comment: "" });
                    mail_correct = true;
                }
            }
        }
        this.setState({email: email ,button_isactive: mail_correct});
    }

    saveChanges = async() =>{
        await this.props.supabase.from("users").update({user_mail: this.state.email}).eq("user_mail", this.props.email)

        const {error: error} = await this.props.supabase.auth.updateUser({
            email: this.state.email
          })

        if (error){console.error("Change email request failed, ", error)}

        await this.props.supabase.auth.signOut()
        this.props.changeAppState("session", "");
        this.props.changeAppState("previous", "");
        this.props.changeAppState("page", "start");
    }

    render(){
        return(

            <div style={{position: "relative", "top": "20px"}}>
            <div className="head">
            <MyButton key="back" onClick={this.props.backToSettings} name="back" displayedText="← BACK" className="back-button back-button-transform"/>
            </div>
            
            <div className="head">
                <h1 style={{fontSize: "36px"}} className="headline-left">Change email</h1>
            </div>

            <div className="head">
                <p style={{fontSize: "20px", position: "relative", bottom: "20px"}} className="headline-left">You will be logged out after succesful email change.</p>
            </div>

            <div style={{position: "relative", bottom: "40px"}} className='jar_container'>
            <div>
                <MyInput type="text"
                    name="email"
                    className="standard-input"
                    value={this.state.email}
                    onChange={this.checkMail}
                    label="Enter your new email"
                    autoFocus={true}
                    additionalInfo={this.state.email_comment}/>
                </div>

                <div style={{position: "relative", top: "70px"}}>
                    <MyButton className="standard-button" displayedText="SAVE CHANGES" name="name" isDisabled={!this.state.button_isactive} onClick={this.saveChanges}/>
                </div>
            </div></div>
        )
    }
}

export default ChangeEmail
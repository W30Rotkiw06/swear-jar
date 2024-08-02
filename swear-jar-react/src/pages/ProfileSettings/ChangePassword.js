import React, { Component } from "react";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            old_password: "",
            old_password_error: "",
            password: "",
            password_error: "",
            password2: "",
            password2_error: "",
            button_isactive: false,
            button_text: "SAVE CHANGES"
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

    importOldPassword = event =>{
        this.setState({
            old_password: event.target.value
        })
    }

    checkPasswords= event =>{
        let inputName = event.target.name;
        let inputValue = event.target.value;
        let password, password2

        if (inputName === "password"){
            password = inputValue;
            password2 = this.state.password2
        }else{
            password = this.state.password
            password2 = inputValue;
        }

        if (password.length < 8){
            this.setState({password_error: "Your password is too short", button_isactive: false})}
        else{this.setState({password_error: ""})}

        if(password !== password2 && password2 !== ""){
            this.setState({password2_error: "Passwords are diffrent", button_isactive: false})}
        else{this.setState({password_comment2: ""})}

        if (password.length >=8 && password === password2){
            this.setState({password_error: "", password2_error: "", button_isactive: true})
            }
        this.setState({[inputName]: inputValue})
    }

    saveChanges = async() =>{
        this.setState({button_text: "SAVING..."})
        try {
            const { data, error } = await this.props.supabase.auth.signInWithPassword({
                email: this.props.email,
                password: this.state.old_password
            });

            if (error) {
                this.setState({button_text: "SAVE CHANGES"});
                throw new Error(error.message); // handle error egz. wrong password
            }else{
                const {error: error_password} = await this.props.supabase.auth.updateUser({
                    password: this.state.password
                  })
        
                if (error_password){
                    console.error("Change passsword request failed, ", error_password)
                }
        
                await this.props.supabase.auth.signOut()
                this.props.changeAppState("session", "");
                this.props.changeAppState("previous", "");
                this.props.changeAppState("page", "start");
            }

            this.setState({
                password_comment: ""
            });

        } catch (error) {
            if (error.message === "Invalid login credentials"){error.message = "Password is incorrect"}
            this.setState({ 
                old_password_error: error.message,
                old_password: "" 
            });
        }
    }


    render(){
        return(

            <div style={{position: "relative", "top": "20px"}}>
            <div className="head">
            <MyButton key="back" onClick={this.props.backToSettings} name="back" displayedText="← BACK" className="back-button back-button-transform"/>
            </div>
            
            <div className="head">
                <h1 style={{fontSize: "36px"}} className="headline-left">Change password</h1>
            </div>

            <div className="head">
                <p style={{fontSize: "20px", position: "relative", bottom: "20px"}} className="headline-left">You will be logged out after succesful password change.</p>
            </div>

            <div style={{position: "relative", bottom: "40px"}} className='jar_container'>
            <div>
                <MyInput type="password"
                    name="old_password"
                    className="standard-input"
                    value={this.state.old_password}
                    onChange={this.importOldPassword}
                    label="Enter your old password"
                    autoFocus={true}
                    additionalInfo={this.state.old_password_error}/>
            </div>
            <div>
                <MyInput type="password"
                    name="password"
                    className="standard-input"
                    value={this.state.password}
                    onChange={this.checkPasswords}
                    label="Enter your new password"
                    autoFocus={false}
                    additionalInfo={this.state.password_error}/>
            </div>

            <div>
                <MyInput type="password"
                    name="password2"
                    className="standard-input"
                    value={this.state.password2}
                    onChange={this.checkPasswords}
                    label="Reenter your new password"
                    autoFocus={false}
                    additionalInfo={this.state.password2_error}/>
            </div>
            

                <div style={{position: "relative", top: "70px"}}>
                    <MyButton className="standard-button" displayedText={this.state.button_text} name="name" isDisabled={!this.state.button_isactive} onClick={this.saveChanges}/>
                </div>
                </div></div>
        )
    }
}

export default ChangePassword
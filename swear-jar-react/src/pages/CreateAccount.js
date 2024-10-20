import React, {Component} from "react";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import BigLogo from "../components/BigLogo";

// This class is responsible for creating account screen (asking user for email & password)
class CreateAccount extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            email_comment: "",
            password_comment: "",
            password2_comment: "",
            btn_lbl: "CREATE ACCOUNT",
            btn_is_disabled: true,
            mail_correct: false,
        }
    }

    checkName = event =>{
        this.setState({name: event.target.value})
    }

    // Checking if provided "mail" is mail
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
                this.setState({ email_comment: "" });
                mail_correct = true;
                this.props.fun("email", email);
            }
            
        }
        
        if (this.state.password.length >=8 && this.state.password === this.state.password2 && mail_correct === true){
            this.setState({"email": email, password_comment: "", password2_comment: "", btn_is_disabled: false, mail_correct:true})
        }else{this.setState({"email": email, btn_is_disabled: true, mail_correct: mail_correct})}
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
            this.setState({password_comment: "Your password is too short", btn_is_disabled: true})}
        else{this.setState({password_comment: ""})}

        if(password !== password2 && password2 !== ""){
            this.setState({password2_comment: "Passwords are diffrent", btn_is_disabled: true})}
        else{this.setState({password2_comment: ""})}

        if (password.length >=8 && password === password2 && this.state.mail_correct === true){
            this.setState({password_comment: "", password2_comment: "", btn_is_disabled: false})
            }
        this.setState({[inputName]: inputValue})
    }
    
    // Signing up to swear jar using data given earlier
    signUpToSupabase = async () =>{
        try {
            const { data, error } = await this.props.supabase.auth.signUp({
                email: this.state.email,
                password: this.state.password,
                options:{
                    data:{nickname: this.state.name}
                }
                  
            });
            if (error) {
                throw new Error(error.message); // handle error egz. wrong password
            }else{
                this.setState({btn_lbl: "CREATING ACCOUNT..."});
                await this.props.supabase.from("users").insert({user_mail: this.state.email, user_nickname: this.state.name, is_premium: false})
                this.props.fun("session", data); // send session to app.js
                this.props.fun("email", this.state.email)
                setTimeout(() => {this.props.fun("page", "home");}, 500);
            }

            this.setState({
                data: data,
                password_comment: ""
            });
            
        } catch (error) {
            if (error.message === "Invalid login credentials"){error.message = "Password is incorrect"}
            this.setState({ 
                data: null,
                password_comment: error.message,
                password2_comment: error.message 
            });
        }
    }

    // Rendering everythoing on screen
    render(){
        return(
            <div className="create_account">
                <MyButton onClick={this.props.back} name="back" displayedText="← BACK" className="back-button"/>
            <div className="login-signup-inputs">
                <div className="create_account_logo"><BigLogo/></div>
          <p>
          Welcome to swear jar.
          </p>
            <MyInput type="text"
                    name="name"
                    className="standard-input-small right-input"
                    value={this.state.name}
                    onChange={this.checkName} 
                    label="Enter your name"
                    autoFocus={true}/>
                <MyInput type="text"
                    name="email"
                    className="standard-input"
                    value={this.state.email}
                    onChange={this.checkMail}
                    label="Enter your email"
                    autoFocus={false}
                    additionalInfo={this.state.email_comment}/>
                <MyInput type="password"
                    name="password"
                    className="standard-input"
                    value={this.state.password}
                    onChange={this.checkPasswords}
                    label="Enter your password"
                    additionalInfo={this.state.password_comment}/>
                <MyInput type="password"
                    name="password2"
                    className="standard-input"
                    value={this.state.password2}
                    onChange={this.checkPasswords}
                    label="Confirm your password"
                    onFocus={this.checkPasswords}
                    onClick={this.checkPasswords}
                    additionalInfo={this.state.password2_comment}/>
                <br/><br/><br/>
                <MyButton name="continue" className="standard-button" displayedText={this.state.btn_lbl} onClick={this.signUpToSupabase} isDisabled={this.state.btn_is_disabled}/>
            </div></div>
        )
    }
}

export default CreateAccount;
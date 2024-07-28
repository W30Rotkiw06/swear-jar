import React, {Component} from "react";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import BigLogo from "../components/BigLogo";


// This class is responsible for login screen (asking user for email & password)
class Login extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            email_comment: "",
            password_comment: "",
            btn_lbl: "CONTINUE",
            btn_is_disabled: true
        }
    }



    // Save values from input
    changeHandler = event =>{
        let inputName = event.target.name;
        let inputValue = event.target.value;
        this.setState({[inputName]: inputValue})
        
    }

    // check if mail is correct
    checkMail = event => {
        let email = event.target.value;
        this.setState({email: event.target.value})
        this.props.fun("email", this.state.email)

        if(email.length > 4){
            if(this.props.other_mails.includes(email)){
            this.setState({ email_comment: "" , btn_is_disabled: false});
            
            }else{
                this.setState({ email_comment: "There is no account on this mail", btn_is_disabled: true});
            }
        }
    }

    // Logging to swear jar using data given earlier
    logToSupabase = async () =>{
        this.props.internet()
        this.setState({btn_lbl: "LOGGING IN..."});
        try {
            const { data, error } = await this.props.supabase.auth.signInWithPassword({
                email: this.state.email,
                password: this.state.password
            });

            if (error) {
                this.setState({btn_lbl: "CONTINUE"});
                throw new Error(error.message); // handle error egz. wrong password
            }else{
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
                password: "" 
            });
        }
    }

    // Rendering everythoing on screen
    render(){
        return(
            <div>
                <MyButton onClick={this.props.back} name="back" displayedText="← BACK" className="back-button"/>
                <BigLogo/>
            <div className="login-signup-inputs">
            <p>Welcome back. Enter <br/>your email and password. 
            </p>
                <MyInput type="text"
                    name="email"
                    className="standard-input"
                    value={this.state.email}
                    onChange={this.checkMail}
                    onFocus={this.checkMail}
                    label="Enter your mail"
                    autoFocus={true}
                    additionalInfo={this.state.email_comment}/>
                <br/>
                <MyInput type="password"
                    name="password"
                    className="standard-input"
                    value={this.state.password}
                    onChange={this.changeHandler}
                    label="Enter your password"
                    
                    additionalInfo={this.state.password_comment}/>
                <br/><br/><br/>
                <MyButton name="continue" className="standard-button" displayedText={this.state.btn_lbl} onClick={this.logToSupabase} isDisabled={this.state.btn_is_disabled}/>
            </div></div>
        )
    }
}

export default Login;
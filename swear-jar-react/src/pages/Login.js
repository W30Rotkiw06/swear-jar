import React, {Component} from "react";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import BigLogo from "../components/BigLogo";


class Login extends Component{
    
    constructor(props){
        super(props);
        var {fun} = props;
        this.state = {
            email: "",
            password: "",
            email_comment: "",
            password_comment: "",
            email_correct: false
        }
    }
    changeHandler = event =>{
        let inputName = event.target.name;
        let inputValue = event.target.value;
        this.setState({[inputName]: inputValue})
        
    }

    isMail = () => {
        let atCount = 0;
        let dotCount = 0;
    
        const { email } = this.state;

        if (email.length > 5) {
            for (let i = 0; i < email.length; i++) {
                if (email[i] === '@') {atCount++;}
            }
            for (let i = email.length - 4; i < email.length; i++) {
                if (email[i] === '.') {dotCount++;}
            }

            if (atCount !== 1 || dotCount !== 1) {
                this.setState({ email_comment: "Email is incorrect" });
            } else {
                this.setState({ email_comment: "" , email_correct: true});
                this.props.fun("email", this.state.email)
            }
        } else {
            this.setState({ email_comment: "Email is too short" });
        }

        }

    logToSupabase = () =>{
        console.log()
    }


    render(){
        return(
            <div>
                <BigLogo/>
          <p>
            <br/>Welcome back. Enter <br/>your email and password. 
          </p>
            
                <MyInput type="text"
                    name="email"
                    className="standard-input"
                    value={this.state.email}
                    onChange={this.changeHandler}
                    label="Enter your mail"
                    additionalInfo={this.state.email_comment}/>
                <br/><br/>
                <MyInput type="text"
                    name="password"
                    className="standard-input"
                    value={this.state.password}
                    onChange={this.changeHandler}
                    label="Enter your password"
                    onFocus={this.isMail}
                    additionalInfo={this.state.password_comment}/>
                <br/><br/><br/>
                {
                   this.state.email_correct ? (<MyButton name="continue" className="standard-button" displayedText="CONTINUE" onClick={this.logToSupabase} />): (<br/>)
                }
            </div>
        )
    }
}

export default Login;
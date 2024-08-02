import React, { Component } from "react";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

class ChangeName extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            button_isactive: false
        }
    }

    checkName = event =>{
        if (event.target.value.length >0 ){
            this.setState({name: event.target.value, msg: "", button_isactive: true})
        }else{
            this.setState({name: event.target.value, msg: "Enter your name", button_isactive: false})
        }
    }

    saveChanges = async() =>{
        const {error} = await this.props.supabase.from("users").update({user_nickname: this.state.name}).eq("user_mail", this.props.email)
        if (error) {console.error("Error");}

        const {data: user, error: user_error } = await this.props.supabase.auth.updateUser({
            data: {nickname: this.state.name }
        })
        if (user_error) {console.error("Error");}
        this.props.back()
    }

    render(){
        return(
            <div style={{position: "relative", "top": "20px"}}>
                <div className="head">
                <MyButton key="back" onClick={this.props.backToSettings} name="back" displayedText="← BACK" className="back-button back-button-transform"/>
                </div>
                
                <div className="head">
                    <h1 style={{fontSize: "28px"}} className="headline-left">Change displayed name</h1>
                </div>

                <div className='jar_container'>
                <div style={{position: "relative", left: "5px"}}>
                <MyInput
                    type="text"
                    name="name"
                    label="Enter your name"
                    className="standard-input-small right-input3"
                    autoFocus={true}
                    onChange={this.checkName}/>
                </div>
                    
                <div style={{position: "relative", top: "50px"}}>
                <MyButton className="standard-button" displayedText="SAVE CHANGES" name="name" isDisabled={!this.state.button_isactive} onClick={this.saveChanges}/>
                </div>
                </div>
            </div>
        )
    }
}

export default ChangeName
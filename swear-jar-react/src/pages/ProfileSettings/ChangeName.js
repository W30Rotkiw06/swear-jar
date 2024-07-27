import React, { Component } from "react";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

class ChangeName extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            msg: "",
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

    render(){
        return(
            <div style={{position: "relative", "top": "20px"}}>
                <div className="head">
                <MyButton key="back" onClick={this.props.backToSettings} name="back" displayedText="← BACK" className="back-button back-button-transform"/>
                </div>
                
                <div className="head">
                    <h1 style={{fontSize: "28px"}} className="headline">Change displayed name</h1>
                </div>

                <div className='jar_container'>
                <MyInput
                type="text"
                name="name"
                label="Enter your name"
                className="standard-input-small change-profile-data"
                addClassName="change-profile-data-lbl"
                addClassNameMsg="change-profile-data-lbl-error"
                autoFocus={true}
                onChange={this.checkName}
                additionalInfo={this.state.msg}/>
                </div>
            </div>
        )
    }
}

export default ChangeName
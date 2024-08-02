import { Component } from "react"
import MyInput from "../MyInput"
import { TwitterPicker } from 'react-color';
import MyButton from "../MyButton";

class AddNewJar extends Component{
    constructor(props){
        super(props);
        var {closeWin, email} = this.props;
        this.state = {
            jar_name: "",
            jar_msg: "",
            jar_color: "#5cb182",
            jar_members: "",
            show_pallete: false,
            button_isactive: false
        }
    }

    // Save values from input
    checkName = event =>{
        let inputValue = event.target.value;
        if(inputValue.length <=20 && inputValue.length >0){
            this.setState({jar_msg: "", jar_name: inputValue, button_isactive: true})
        }else{
            if (inputValue.length >20){
                this.setState({jar_msg: "Jar name is too long", button_isactive: false})
            }
            else{
                this.setState({jar_msg: "Enter jar name", jar_name: inputValue, button_isactive: false})
            }
        }
    }
    
    showHidePallete =()=>{
        this.setState({show_pallete: !this.state.show_pallete})
    }

    handleColorChange = (color) => {
        this.setState({ jar_color: color.hex, show_pallete: false });
      };


    createJar = async() =>{
        await this.props.supabase.from("jars").insert({
            name: this.state.jar_name,
            members: [[this.props.email, 0]],
            color: this.state.jar_color
        })

        this.props.closeWin()
    }

    render(){
        return(
            <div>
                <div style={{borderColor: this.state.jar_color}} className="add-jar-win">
            <h2 style={{color: "#fff", position: "absolute", top: "-13px", left: "60px"}}>Add new jar</h2>
            <div onClick={this.props.closeWin} className="jar-close-button">×</div>
            <div style={{position: "relative", left: "27px"}}>
                <MyInput
                    type="text"
                    name="jar_name"
                    label="Jar name"
                    className="standard-input-small right-input2"
                    value={this.state.jar_name}
                    onChange={this.checkName} 
                    autoFocus={true}
                    
                    additionalInfo={this.state.jar_msg}/>
            </div>
            
                <br/>
                <div className="color-button">
                <p>Select color:</p>
                <div onClick={this.showHidePallete} style={{width: "30px", height: "30px", backgroundColor: this.state.jar_color, position: "relative", left: "44px", borderRadius: "5px", cursor: "pointer"}}/>
                </div>
                {this.state.show_pallete? (
                    <div>
                    <TwitterPicker onChange={this.handleColorChange} className="color-pallete" triangle="top-right" width="205px"/>
                    </div>
                    ): <button disabled={!this.state.button_isactive} onClick={this.createJar} style={{backgroundColor: this.state.jar_color, borderColor: this.state.jar_color, position: "relative", top: "-3px"}} name="create-jar" className="standard-button button-add-jar">CREATE JAR</button>
                }
                <div style={{width: "30px", height: "30px", color: "blue"}}/>
                </div>
                </div>
        )
    }
}

export default AddNewJar
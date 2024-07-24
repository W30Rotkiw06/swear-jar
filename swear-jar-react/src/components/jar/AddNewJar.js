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
            show_pallete: false
        }
    }

    // Save values from input
    checkName = event =>{
        let inputValue = event.target.value;
        if(inputValue.length >20){
            this.setState({jar_msg: "Name is too long"})
        }else{
            this.setState({jar_msg: ""})
            this.setState({jar_name: inputValue})}
        
    }
    
    showHidePallete =()=>{
        this.setState({show_pallete: !this.state.show_pallete})
    }

    handleColorChange = (color) => {
        this.setState({ jar_color: color.hex });
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
            <h2 style={{color: "#fff", position: "absolute", top: "-15px", left: "60px"}}>Add new jar</h2>
            <div onClick={this.props.closeWin} className="jar-close-button">×</div>
            <MyInput
                type="text"
                name="jar_name"
                label="Jar name"
                className="standard-input-small jar-input"
                addClassName="add-jar-label"
                addClassNameMsg="add-jar-error"
                value={this.state.jar_name}
                onChange={this.checkName} 
                autoFocus={true}
                
                additionalInfo={this.state.jar_msg}/>

                <div className="color-button">
                <p>Select color:</p>
                <div onClick={this.showHidePallete} style={{width: "30px", height: "30px", backgroundColor: this.state.jar_color, position: "relative", left: "44px", borderRadius: "5px", cursor: "pointer"}}/>
                </div>
                {this.state.show_pallete? (
                    <div>
                    <TwitterPicker onChange={this.handleColorChange} className="color-pallete" triangle="top-right" width="205px"/>
                    </div>
                    ): <button onClick={this.createJar} style={{backgroundColor: this.state.jar_color, borderColor: this.state.jar_color}} name="create-jar" className="standard-button button-add-jar">CREATE JAR</button>
                }
                <div style={{width: "30px", height: "30px", color: "blue    "}}/>
                </div>
                </div>
        )
    }
}

export default AddNewJar
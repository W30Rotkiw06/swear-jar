import { Component } from "react";
import SettingSegment from "../SettingSegment";
import anon_jar_ico from "../../assets/lama incognito.jpeg"
import price_icon from "../../assets/lama with money.jpeg"

import { TwitterPicker } from "react-color";


class JarSettings extends Component{
    constructor(props){
        super(props)
        this.state = {
            price_per_word: this.props.jar.price_per_word,
            is_anon: this.props.jar.is_anon,
            color: this.props.jar.color,
            show_pallete: false,
        }
    }

    importDataFromChild = async (state_name, value_name)=>{
        let {error} =  await this.props.supabase.from("jars").update({[state_name]: value_name}).eq("id", this.props.jar.id);
        if (!error || value_name === ""){this.setState({[state_name]: value_name})}
    }

    showHidePallete = ()=>{
        this.setState({
            show_pallete: !this.state.show_pallete
        })
    }

    handleColorChange = async(color) => {
        await this.props.supabase.from("jars").update({color: color.hex}).eq("id", this.props.jar.id)
        this.setState({ color: color.hex, show_pallete: false });
      };

    render(){
        return(
            <div className="jar-settings">
                <p className="jar-highlit">Settings</p>
                <SettingSegment image={anon_jar_ico} name="Anonymous jar" callback={this.importDataFromChild} value={this.state.is_anon} type="switch"/>
                <SettingSegment image={price_icon} callback={this.importDataFromChild} value={this.state.price_per_word} name="Price per word" type="input"/>
                <SettingSegment image={price_icon} callback={this.importDataFromChild} value={this.state.price_per_word} name="Change jar color" type="color" color={this.state.color} onClick={this.showHidePallete}/>
                {this.state.show_pallete? (
                    <div >
                        <TwitterPicker onChange={this.handleColorChange} className="color-pallete-jar" triangle="top-right" width="280px"/>
                    </div>
                    ): <></>
                }
            </div>
        )
    }
}

export default JarSettings
import { Component } from "react";
import SettingSegment from "../SettingSegment";
import anon_jar_ico from "../../assets/lama incognito.jpeg"
import price_icon from "../../assets/lama with money.jpeg"

import { TwitterPicker } from "react-color";
import MyButton from "../MyButton"
import UserSearch from "./UserSearch";


class JarSettings extends Component{
    constructor(props){
        super(props)
        this.state = {
            price_per_word: this.props.jar.price_per_word,
            is_anon: this.props.jar.is_anon,
            color: this.props.jar.color,
            show_pallete: false,
            name: this.props.jar.name,
            save_button: false,
            add_people: false,
        }
    }

    importDataFromChild =  (state_name, value_name)=>{
        this.setState({[state_name]: value_name, save_button: true})
    }

    showHidePallete = ()=>{
        this.setState({
            show_pallete: !this.state.show_pallete
        })
    }

    handleColorChange = async(color) => {
        this.setState({ color: color.hex, save_button: true});
    };
    
    saveChanges = async()=>{
        let {error} = await this.props.supabase.from("jars").update({
            price_per_word: this.state.price_per_word,
            is_anon: this.state.is_anon,
            color: this.state.color,
            name: this.state.mail

        }).eq("id", this.props.jar.id)
        if (!error){
            this.setState({save_button: false, show_pallete: false})
        }
    }

    deleteJar = async()=>{
        if (window.confirm("Do you want to delete "+ this.props.jar.name + "?")){
            await this.props.supabase.from("jars").delete().eq("id", this.props.jar.id)
        }
        
    }

    addPeople = ()=>{
        this.setState({add_people: !this.state.add_people})
    }

    render(){
        if (this.state.add_people){
            return(
                <div className="jar-settings">
                    <p className="jar-highlit">Add new member</p>
                    <UserSearch {...this.props}/>
                </div>
            )
        }
        else{
            return(
                <div className="jar-settings">
                    <p className="jar-highlit">Settings</p>
                    <SettingSegment image={anon_jar_ico} name="Add new member" callback={this.importDataFromChild} onClick={this.addPeople} type="more"/>
                    <SettingSegment image={anon_jar_ico} name="Hide chart" callback={this.importDataFromChild} value={this.state.is_anon} type="switch"/>
                    <SettingSegment image={price_icon} callback={this.importDataFromChild} value={this.state.name} name="Jar name" type="input-long" />
                    <SettingSegment image={price_icon} callback={this.importDataFromChild} value={this.state.price_per_word} name="Price per word" type="input"/>
                    <SettingSegment image={price_icon} callback={this.importDataFromChild}  name="Jar color" type="color" color={this.state.color} onClick={this.showHidePallete}/>
    
                    {
                        this.state.save_button?
                        <MyButton name="save" onClick={this.saveChanges} displayedText="SAVE" className="mini-button green-save-button"/>
                        :
                        <MyButton name="delete" onClick={this.deleteJar} displayedText="DELETE JAR" className="mini-button red-delete-button"/>
                    }
    
                    {this.state.show_pallete? (
                        <div >
                            <TwitterPicker onChangeComplete={this.handleColorChange} className="color-pallete-jar" triangle="top-right" width="280px"/>
                        </div>
                        ): <></>
                    }
                </div>
            )
        }
        
    }
}

export default JarSettings
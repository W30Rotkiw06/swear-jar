import { Component } from "react";
import SettingSegment from "../SettingSegment";
import anon_jar_ico from "../../assets/lama incognito.jpeg"
import price_icon from "../../assets/lama with money.jpeg"


class JarSettings extends Component{
    constructor(props){
        super(props)
        let is_admin = this.props.members_list[0] === this.props.email? true: false
        this.state = {
            admin: is_admin,
            price_per_word: this.props.jar.price_per_word,
            is_anon: this.props.jar.is_anon
        }
    }

    importDataFromChild = async (state_name, value_name)=>{
        this.setState({[state_name]: value_name})
        await this.props.supabase.from("jars").update({[state_name]: value_name}).eq("id", this.props.jar.id)
    }

    render(){
        return(
            <div className="jar-settings">
                <p className="jar-highlit">Settings</p>
                <SettingSegment image={anon_jar_ico} name="Anonymous jar" callback={this.importDataFromChild} value={this.state.is_anon} type="switch"/>
                <SettingSegment image={price_icon} callback={this.importDataFromChild} value={this.state.price_per_word} name="Price per word" type="input"/>

            </div>
        )
    }
}

export default JarSettings
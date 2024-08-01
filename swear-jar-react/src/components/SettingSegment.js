import Switch from 'react-ios-switch';
import MyInput from './MyInput';
import { Component } from 'react';

class SettingSegment extends Component{
    constructor(props){
        super(props)
        this.state = {
            onClick: this.props.isActive === true? this.props.onClick: null,
            switchState: this.props.value
        }
    }

    handleSwitchChange = ()=>{
        this.props.callback("is_anon", !this.state.switchState)
        this.setState({switchState: !this.state.switchState});
    }

    handleInputChange = event=>{
        this.props.callback("price_per_word", event.target.value)
    }

    render(){
        switch(this.props.type){
            case "more":
                return(
                    <div className="settings-segment" onClick={this.props.onClick}>
                        <img src={this.props.image} alt="img" className="settings-segment-img"/>
                        <p className="settings-segment-title">{this.props.name}</p>
                        <p className="settings-segment-arrow">➤</p>
                    </div>
                   )
            case "switch":
                return(
                    <div className="settings-segment" onClick={this.props.onClick}>
                        <img src={this.props.image} alt="img" className="settings-segment-img"/>
                        <p className="settings-segment-title">{this.props.name}</p>
                        <Switch className="settings-segment-switch" onChange={this.handleSwitchChange} checked={this.state.switchState}/>
                    </div>
                )
            case "color":
                return(
                    <div onClick={this.props.onClick} className="settings-segment" >
                        <img src={this.props.image} alt="img" className="settings-segment-img"/>
                        <p className="settings-segment-title">{this.props.name}</p>
                        <div className="select-color-settings" style={{backgroundColor: this.props.color}}/>
    
                    </div>
                )
            case "input":
                return(
                    <div className="settings-segment" onClick={this.props.onClick}>
                        <img src={this.props.image} alt="img" className="settings-segment-img"/>
                        <p className="settings-segment-title">{this.props.name}</p>
                        <MyInput type='text' label='' value={this.props.value} onChange={this.handleInputChange} className='settings-segment-input'  name='price_per_word'/>
                    </div>
                   )
        }
    
    }

    
}


export default SettingSegment
import { Component } from "react";

class JarSimple extends Component{
    constructor(props){
        super(props);
        let jar_name_class = props.jar.name.length >12 ? "jar-name-long": "jar-name"
        this.state = {jar_name_class: jar_name_class}
    }

    componentDidMount = ()=>{
        this.props.changeHeight(80)
    }

    

    render(){
        return(
            <div onClick={this.props.onClick} className="simple">
                <p className={this.state.jar_name_class}>{this.props.jar.name}</p>
                <p className="jar-balance">{this.props.jar.total_money}</p>
                <p className="jar-members">{this.props.members_formated}</p>
                <p></p>
            </div>
        )
    }    
    
}

export default JarSimple;
import { Component } from "react"

class ReportedMember extends Component{ // można przepisać na funckcję
    constructor(props){
        super(props)
        this.state = {
            div_class: "jar-report-member-view" + this.props.size,
            img_class: "jar-report-member-picture" + this.props.size,
        }
    }
    componentDidUpdate = ()=>{
        if (this.props.nickname.length >8){
            this.state ={img_class: "jar-report-member-view-small"}
        }
    }
    

    reportSelf = () =>{
        this.props.report(this.props.id)
    }

    render(){
        return(
            <div className={this.state.div_class} onClick={this.reportSelf}>
                <img style={{border: "2px solid", borderColor: this.props.color}} className={this.state.img_class} src={this.props.profile_picture} alt=""/> 
                <p>{this.props.nickname}</p>
            </div>
        )
    }
    
}
export default ReportedMember
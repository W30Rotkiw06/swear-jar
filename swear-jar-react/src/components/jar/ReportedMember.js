import { Component } from "react"
import premium_logo from "../../assets/premium badge.png"
import suspended from "../../assets/suspended badge.png"

class ReportedMember extends Component{ // można przepisać na funckcję
    constructor(props){super(props)}
    
    componentDidUpdate = ()=>{
        if (this.props.nickname.length >8){
            this.state ={img_class: "jar-report-member-view-small"}
        }
    }
    

    reportSelf = () =>{
        this.props.report(this.props.id)
    }

    render(){
        if (this.props.id ==0 && this.props.manage_members){}
        else{return(
            <div className="jar-report-member-view" onClick={this.reportSelf}>
                <img style={{border: "2px solid", borderColor: this.props.color}} className="jar-report-member-picture" src={this.props.profile_picture} alt=""/> 
                <p>{this.props.nickname}</p>
                {
                    this.props.premium && !this.props.suspended? <img className="jar-report-member-badge" src={premium_logo} alt=""/> : <></>
                }
                {
                    this.props.suspended? <img className="jar-report-member-suspended" src={suspended} alt=""/> : <></>
                }
            </div>
        )
    }}
    
}
export default ReportedMember
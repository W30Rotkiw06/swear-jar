import React, {Component} from "react";
import Jar from "../components/Jar";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            avalaible_jars: [],
        }
    }

    componentDidMount = async()=>{
        let data = (await this.props.supabase.from("users").select().eq("user_mail", this.props.email)).data;
        const name = data.map(item => item.user_nickname);
        this.setState({name: name[0], email:this.props.email})


    }

    componentDidUpdate = async() =>{ // downloading jars
        let jars_with_user = []
        let jar_list = (await this.props.supabase.from("jars").select().order('id', { ascending: true })).data
        for (let jar of jar_list){
            for (let member of jar["members"]){
                if (member[0] === this.state.email){
                    jars_with_user.push(jar)
                }
                
            }
        }
        this.setState({avalaible_jars: jars_with_user})


        
    }
// this.state.books.map((book, i) => (<BookDescription key = {i} book={book} deleteBook={this.deleteBook}/>))
    render() {
        return(
            <div>
                <h1 className="headline">Your swear jars</h1>
                <div className='jar_container'>
                {
                    this.state.avalaible_jars.map(jar =>(<Jar jar={jar} key={jar.name} {...this.state} {...this.props}/>))// jakby coś nie działało tow 
                }
            </div></div>
        )
    }


}


export default Home;
import { PieChart } from 'react-minimal-pie-chart';


const Chart = (props) =>{
    let data= []
    for(let i =0; i <props.members_list.length; i++){
        data.push(
            {id: i,
            title: props.members_names_list[i],
            value: props.jar.members[i][1],
            color: props.members_colors[i],
            profile_pct: props.members_profile_pictures[i]
        })
    }


    return(
        <div className="chart"> 
            <hr className="jar-header-line"/>   
            <p className="jar-highlit">Jar stats</p>
            <div className='pie-center'>
                <p>{props.jar.total_money}</p>
                <p className='pie-center-details'>Each word costs ${props.jar.price_per_word}</p>
            </div>

            <PieChart
            className='pie'
            data={data}
            paddingAngle={2}
            animate={true}
            startAngle={-90}
            style={{ width: "220px"}}
            segmentsStyle={{border: "1px solid", borderColor: "black"}}
            lineWidth={40}
            label={({ dataEntry }) => (dataEntry.value)}
            labelPosition={80}
            reveal={100}
            />




        </div>
    )
}
export default Chart

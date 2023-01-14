import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip
} from "chart.js";
import React from "react";
import {Bar} from "react-chartjs-2";
import myRound from "../Utils/MyRound";

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    ArcElement, 
    Tooltip, 
    Legend
    );


export default class DataPlots extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    renderColors(number,s=100,l=70){
        const HSLA = (h,s,l,a) => {
            return `hsla(${h},${s}%,${l}%,${a})`
        }
        const step = Math.floor(360 / number)
        let backgroundColor = []
        let borderColor = []

        for(let i=0; i<number; i++){
            let h = i*step
            backgroundColor.push(HSLA(h,s,l,0.4))
            borderColor.push(HSLA(h,s,l,0.8))
        }
        return {backgroundColor,borderColor}
    }

    componentDidUpdate(prevProp) {
        if (this.props.data !== prevProp.data) {
            this.setState({
                data: this.props.data,
            })
        }
    }

    createData(values=[7, 2, 6, 4, 2, 4, 10, 5],labels,label){
        const isLabel = (labels)? labels : values
        let {backgroundColor,borderColor} = this.renderColors(values.length)
        return {
            labels: isLabel,
            datasets: [
                {
                    label: label,
                    data: values,
                    backgroundColor,
                    borderColor,
                    borderWidth: 2,
                },
            ],
        }
    }

    averageResultPerTest(){
        let data = [...this.state.data]
        
        let values = {}
        let averages= []
        let testName = []

        // ZEROWANIE
        for(let item of data){
            let {test_name} = item
            values[test_name] = [0,0]
        }

        // SUMOWANIE
        for(let item of data){
            let {test_name,procent} = item
            values[test_name][0] += procent
            values[test_name][1] += 1
        }

        // LICZENIE SUMY
        for(let key of Object.keys(values)){
            testName.push(key)
            const average = myRound(values[key][0]/values[key][1],2)
            averages.push(average)
        }

        return({testName,averages})
    }

    averageResultPerUser(){
        let data = [...this.state.data]
        
        let values = {}
        let averages= []
        let userName = []

        // ZEROWANIE
        for(let item of data){
            let {user_name} = item
            values[user_name] = [0,0]
        }

        // SUMOWANIE
        for(let item of data){
            let {user_name,procent} = item
            values[user_name][0] += procent
            values[user_name][1] += 1
        }

        // LICZENIE SUMY
        for(let key of Object.keys(values)){
            userName.push(key)
            const average = myRound(values[key][0]/values[key][1],2)
            averages.push(average)
        }

        return({userName,averages})
    }

    aboveScoreUser(score){
        let data = [...this.state.data]
        
        let values = {}
        let above= []
        let userName = []

        // ZEROWANIE
        for(let item of data){
            let {user_name} = item
            values[user_name] = 0
        }

        // SUMOWANIE
        for(let item of data){
            let {user_name,procent} = item
            if(procent*100 > score){
                values[user_name] += 1
            }
        }

        // LICZENIE SUMY
        for(let user_name of Object.keys(values)){
            userName.push(user_name)
            above.push(values[user_name])
        }

        return({userName,above})
    }

 
    averagePerTestData(){
        const {testName,averages} = this.averageResultPerTest()
        testName.map((item,index) => {testName[index] = "test: " + item; return 1})
        averages.map((item,index) => {averages[index] = 100*item;         return 1})
        return this.createData(averages,testName,"average tests result [%]")
    }

    averagePerUserData(){
        const {userName,averages} = this.averageResultPerUser()
        userName.map((item,index) => {userName[index] = "User: " + item; return 1})
        averages.map((item,index) => {averages[index] = 100*item;         return 1})
        return this.createData(averages,userName,"average users result [%]")
    }

    
    aboveScoreUserData(score){
        const {userName,above} = this.aboveScoreUser(score)
        userName.map((item,index) => {userName[index] = "User: " + item; return 1})
        above.map((item,index) => {above[index] = item;                   return 1})
        return this.createData(above,userName," users results above " + score + "%")
    }

  
    showBar(type){

        let options = {
            scales: {
                y: {
                  beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    labels: {
                      boxWidth: 0
                    }
                }
            }
        }

        let data;

        switch(type){
            case "tests-average": {data = this.averagePerTestData(); break;}
            case "users-average": {data = this.averagePerUserData(); break;}
            case "users-above":   {data = this.aboveScoreUserData(50); break;}
            default:             {data = this.createData(); break;}
        }

        return(<Bar data={data} options={options}/>)
    }

    render(){
        return (
            <div className="col">
                <div className="row">
                        {this.showBar("users-average")}
                </div>
                <div className="row">
                        {this.showBar("tests-average")}
                </div>
                <div className="row">
                        {this.showBar("users-above")}
                </div>
            </div>
        )
    }
}
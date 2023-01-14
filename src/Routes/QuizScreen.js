import React from "react";
import Server from "../Components/apis/Server";
import Quiz from "../Components/QuizComponents/Quiz.js";
import {createBrowserHistory} from "history";

const history = new createBrowserHistory()


export default class QuizScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            id : this.props.match.params.id,
            data: {},
            isLoaded: false,
            quizStarted: false,
        }
    }

    getData = async (id) => {
        try {
            const data = await Server.getTestById({ id })
            this.setState({
                data: data,
                isLoaded: true,
            })
        } catch (e) {
            history.push("/accessError")
            window.location.reload()
        }
    }

    componentDidMount() {
        this.getData(this.state.id)
    }


    buttonPressed = () => {
        this.setState({ quizStarted: true })
    }


    showPreview = () => {
        const { data } = this.state
        return (
            <div className="col-10 offset-1">
                <h4 className="text-center p-2">{data.test_name}</h4>
                <div className="border rounded-3">
                    <div className="border-bottom">
                        <ul>
                            <li>Rodzaj: {data.form}</li>
                            <li>Czas na rozwiązanie: {data.timer}</li>
                            <li>Liczba pytań: {data.questions.length}</li>
                        </ul>
                    </div>

                    <div className="row p-4">
                        <div className="col text-end">
                            <button className="btn btn-primary" onClick={this.buttonPressed}>Rozpocznij</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

   

    
    showQuiz = () => {
        const { data } = this.state
        return (
            <Quiz id={data.id} time={data.timer} endTime={data.end_time} test={data} history={history}/>
        )
    }

    render() {

        const { isLoaded, quizStarted } = this.state
        let show
        if (isLoaded) {
            if (quizStarted) {
                show = this.showQuiz()
            } else {
                show = this.showPreview()
            }
        } else {
            show = (
                <div className="row align-items-center">
                    <div className="col spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status"/>
                    <span className="col text-center text-primary" style={{fontSize: "3rem"}}>Loading...</span>
                </div>
            )
        }

        return (
            <div className="d-flex position-relative h-auto padding5pc" style={{
                right: "-2%",
                width: "90%",
                minWidth: "920px"
            }}>

                {show}

            </div>
        )
    }
}

import React from "react";
import ResultSingleQuestion from "../Components/ResultComponents/ResultSingleQuestion"
import MyToast from "../Components/Modals/MyToast";
import {toast} from "react-toastify";
import { NavLink, withRouter } from "react-router-dom";

class ResultScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {...this.props.history.location.state.results},
            questions: [...this.props.history.location.state.questions],
            answers: [...this.props.history.location.state.answers]
        }
    }

    componentDidMount() {
        const {results} = this.state
        let toastBody = <MyToast title="Wyniki" text={`Liczba punktów: ${results.points}/${results.max_points}`}/>
        let icon = <i className='bi-clipboard-check-fill' style={{fontSize: "1.4rem", color: "#444"}}/>
        toast(toastBody, {icon: icon})
    }

    render() {
        const {results, questions, answers} = this.state;
        return (
            <div className="d-flex position-relative flex-column h-auto padding5pc w-100" style={{
                minWidth: "900px",
                gap: "25px"
            }}>
                <div className="row">
                    <div className="col-3 text-start">
                        <NavLink to="/SearchTest" className="btn btn-primary">Powrót do Menu</NavLink>
                    </div>
                    <div className="col text-center">
                        <h4 className="text-center">Liczba uzyskanych punktów: {results.points}/{results.max_points}</h4>
                    </div>
                    <div className="col-3 text-end">
                        <NavLink to={{pathname: `/quiz/${results.test_id}`}}
                                 className="btn btn-primary">Spróbuj ponownie</NavLink>
                    </div>
                </div>
                <div>
                    {questions.map((question, i) => <ResultSingleQuestion
                    idx={i + 1} key={i} question={question.question} answer={question.answers}
                    correctAnswers={question.correct_answer_idx} userAnswer={answers[i]}/>)}
                </div>
                <div className="row">
                    <div className="col text-start">
                        <NavLink to="/SearchTest" className="btn btn-primary">Powrót do Menu</NavLink>
                    </div>
                    <div className="col text-end">
                        <NavLink to={{pathname: `/quiz/${results.test_id}`}}
                                 className="btn btn-primary">Spróbuj ponownie</NavLink>
                    </div>
                </div>
            </div>

        )
    }

}

export default withRouter(ResultScreen)
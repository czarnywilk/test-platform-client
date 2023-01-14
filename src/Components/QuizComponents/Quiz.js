import React from "react";
import Server from "../apis/Server";
import { toast } from "react-toastify";
import MyToast from "../Modals/MyToast";
import ShowAnswers from "./ShowAnswers";
import QuizPagination from "./QuizPagination"

import { withRouter } from "react-router-dom";
import ErrorToast from "../Modals/ErrorToast";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIdx: 0,
            isLoaded: false,
            isTimer: false,
            test: this.props.test,
            questions: this.props.test.questions,
            time: {},
            playerAnswers: [],
            timeForAlert: 0,
            showedToast: false
        }
    }

    getData = () => {
        let playerAnswers = []
        for (let i = 0; i < this.state.questions.length; i++) {
            playerAnswers.push([])
        }

        this.setState({
            isLoaded: true,
            playerAnswers: playerAnswers
        })
    }

    componentDidMount() {
        this.getData()
    }

    nextQuestion = () => {
        if (this.state.questionIdx < this.state.questions.length) {
            this.setState({
                questionIdx: this.state.questionIdx + 1,
            })
        }
    }

    prevQuestion = () => {
        if (this.state.questionIdx > 0) {
            this.setState({
                questionIdx: this.state.questionIdx - 1,
            })
        }

    }

    endTest = () => {
        this.sendAnswers()
    }

    selectQuestion = (e,i) => {
        e.preventDefault()
        this.setState({ questionIdx: i })
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    showTimeAlertToast() {
        let toastBody = <MyToast title="Czas" text="Wkrótce koniec czasu!" />
        toast.warn(toastBody)
        this.setState({showedToast: true})
    }

    timeEnd() {
        clearInterval(this.timer);
        this.endTest()
    }

    checkboxPressed = (num) => {
        const questionId = this.state.questionIdx
        let answers = [...this.state.playerAnswers]
        let answer = answers[questionId]

        let include = answer.indexOf(num)

        if (include !== -1) {
            answer.splice(include, 1)
        } else {
            answer.push(num)
        }

        answers[questionId] = answer
        this.setState({ playerAnswers: answers })
    }

    sendAnswers = async () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        let userAnswers = []

        for (let i = 0; i < this.state.playerAnswers.length; i++) {
            let toSend = {
                "question_id": this.state.questions[i].id,
                "given_answer_idx": this.state.playerAnswers[i],
                "user_id": userData.id,
                "test_id": this.state.test.id
            }

            if (!toSend.given_answer_idx || toSend.given_answer_idx.length === 0) {
                toSend.given_answer_idx.push(-1)
            }
            userAnswers.push(toSend)
        }

        await Server.sendAnswers(userAnswers)
            .then(response => {

                const location = {
                    pathname: "/quizResults",
                    state: {
                        results: response[0],
                        questions: [...this.state.questions],
                        answers: [...this.state.playerAnswers]
                    }
                }
                this.props.history.push(location)
            })
            .catch((e) => {
                ErrorToast(e)
            })
    }

    minTwoDigits(n) {
        return (n < 10 ? '0' : '') + n;
    }

    showButtons = () => {
        const { questions, questionIdx } = this.state

        const nextButton = () => {
            if (questionIdx === questions.length - 1) {
                return (
                    <button type="button" className="btn btn-success" onClick={this.endTest}>
                        Zakończ test <i className="bi-chevron-right" />
                    </button>
                )
            } else {
                return (
                    <button type="button" className="btn btn-primary" onClick={this.nextQuestion}>
                        Następne <i className="bi-chevron-right" />
                    </button>
                )
            }
        }

        return (
            <div className="row">

                <div className="col-3 text-start">
                    <button disabled={questionIdx === 0} type="button" className="btn btn-primary" onClick={this.prevQuestion}>
                        <i className="bi-chevron-left" /> Poprzednie
                    </button>
                </div>

                <div className="col-6 text-center">
                    <div className="btn-group">
                        <QuizPagination questions={questions} questionIdx={questionIdx} onClick={this.selectQuestion}/>
                    </div>
                </div>

                <div className="col-3 text-end">
                    {nextButton()}
                </div>

            </div>
        )
    }

    showTimer() {
        const style = (this.state.seconds < this.state.timeForAlert) ? "text-end text-danger" : "text-end"
        return (
            <h4 className={style}>Pozostało: {this.state.time.h}:{this.minTwoDigits(this.state.time.m)}:{this.minTwoDigits(this.state.time.s)}</h4>
        )
    }

    showContainer() {
        const { questions, questionIdx, playerAnswers} = this.state
        return (
            <div>
                <h4 id={"question"}>{questions[questionIdx].name}</h4>
                <ShowAnswers questions={questions} questionIdx={questionIdx} playerAnswers={playerAnswers} onChange={this.checkboxPressed}/>
            </div>
        )
    }

    render() {
        const { isLoaded, isTimer, questions, questionIdx, test } = this.state;
        return (
            <div className="col-10 offset-1">
                <h4 className="text-center p-2">{test.test_name}</h4>
                <div className="border rounded-3">

                    {/* HEADER */}
                    <div className="border-bottom p-4">
                        <div className="row">
                            <div className="col text-start">
                                {isLoaded && <h4>Pytanie: {questionIdx + 1}/{questions.length} {questions[questionIdx].question}</h4>}
                            </div>
                        
                            <div className="col text-end">
                                {isTimer && this.showTimer()}
                            </div>

                        </div>
                    </div>

                    {/* CONTAINER */}
                    <div className="container p-4 pt-3 pb-3 border-bottom">
                        {isLoaded && this.showContainer()}
                    </div>

                    <div className="p-4">
                        {isLoaded && this.showButtons()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Quiz);
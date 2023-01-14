import React, { useState } from "react";
import SendTestToServer from "../Components/apis/SendTestToServer";
import { toast } from "react-toastify";
import MyToast from "../Components/Modals/MyToast";
import DateConverter from "../Components/Utils/DateConverter";
import QuestionList from "../Components/Questions/QuestionList";
import TestTimers from "../Components/TestComponents/TestTimers";
import TestAccess from "../Components/TestComponents/TestAccess";
import TestHeaders from "../Components/TestComponents/TestHeaders";
import QuestionValidator from "../Components/Questions/QuestionsValidator";
import { useHistory } from "react-router-dom";
import ErrorToast from "../Components/Modals/ErrorToast";

const INITIAL_HEADER = {
    test_name: "",
}

const INITIAL_TEST_ACCESS = {
    groups: null
}

const INITIAL_TIMES = {
    from: "",
    to: ""
}

export default function AddTest() {
    const [header, setHeader] = useState(INITIAL_HEADER)
    const [testAccess, setTestAccess] = useState(INITIAL_TEST_ACCESS)
    const [times, setTimes] = useState(INITIAL_TIMES)
    const [questions, setQuestions] = useState([])

    const history = useHistory()

    const sendForm = (e) => {
        e.preventDefault()

        const toSendHeader = { ...header }
        const toSendQuestions = [...questions]

        toSendHeader.groups = testAccess.groups


        if (times.from !== "") {
            toSendHeader.start_time = DateConverter.DateToTimestamp(times.from)
        }
        else{
            toSendHeader.start_time = null;
        }
        if (times.to !== "") {
            toSendHeader.end_time = DateConverter.DateToTimestamp(times.to)
        }
        else{
            toSendHeader.end_time = null;
        }
    

        const response = QuestionValidator(toSendQuestions)
        if (response.status === "Error") {
            const errorToast = <MyToast title="Błąd pytań" text={response.message} />
            toast.error(errorToast)
            return;
        }

        if (toSendHeader.start_time !== "" && toSendHeader.end_time !== "" && toSendHeader.start_time > toSendHeader.end_time) {
            const errorToast = <MyToast title="Błąd Czasów" text="Czas zakończenia testu nie może być mniejszy od rozpoczęcia!" />
            toast.error(errorToast)
            return;
        }
        sendNewQuestion(toSendHeader, toSendQuestions)

    }

    const sendNewQuestion = (header, questions) => {
        toast.promise(SendTestToServer(header, questions), {
            pending: {
                render() { return <MyToast title="Wysyłanie" text="Czekaj..." /> }
            },
            success: {
                render() {
                    history.push("SearchTest")
                    return <MyToast title="Wysłano" text="Test wysłano pomyślnie" />
                },
                delay: 750,
            },
            error: {
                render(e) {
                    return ErrorToast(e, true)
                },
                delay: 750,
            },
        })
    }

    const handleTimersChange = (type, value) => {
        const newTimes = { ...times }
        switch (type) {
            case "timerBox": {
                newTimes.timer = "";
                break;
            }
            case "fromToBox": {
                newTimes.from = "";
                newTimes.to = "";
                break;
            }
            default: { newTimes[type] = value }
        }
        setTimes(newTimes)
    }

    const handleAccessChange = (type, value) => {
        const newTestAccess = { ...testAccess }
        newTestAccess[type] = value
        setTestAccess(newTestAccess)
    }

    const handleHeadersChange = (type, value) => {
        const newHeader = { ...header }
        newHeader[type] = value
        setHeader(newHeader)
    }

    const handleQuestionsChange = (questionsData) => {
        setQuestions(questionsData)
    }

    return (
        <div className="container">
            <div className="content">
                <div className="row">
                    <div className="col text-center">
                        <h2>Dodaj nowy test</h2>
                    </div>
                </div>

                <form onSubmit={sendForm} id="submitForm">
                    <TestHeaders onChange={handleHeadersChange} values={header} />
                    <div className="from-group row mt-2" >
                        <div className="col-10 offset-2 p-3">
                            <div className="col">
                                <TestAccess onChange={handleAccessChange} values={testAccess} />
                            </div>
                            <hr />
                            <TestTimers onChange={handleTimersChange} values={times} />
                        </div>
                    </div>
                    <QuestionList onChange={handleQuestionsChange} values={questions} />
                    <div className="row">
                        <div className="col text-end m-2 p-2">
                            <button type="submit" className="btn btn-primary">Wyślij test</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
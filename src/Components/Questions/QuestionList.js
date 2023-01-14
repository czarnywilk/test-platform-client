import { Fragment } from "react"
import QuestionInput from "./QuestionInput"

export default function QuestionList({onChange,values}) {

    const receiveData = (index, item) => {
        const newQuestions = [...values]
        newQuestions[index] = item
        onChange(newQuestions)
    }

    const handleRemoveQuestion = (index, event) => {
        event.preventDefault()
        const newQuestions = values.filter((item, i) => i !== index)
        onChange(newQuestions)
    }

    const handleAddQuestion = (event) => {
        event.preventDefault()
        const inputState = {
            form: [],
            question: "",
            file: ""
        }
        onChange([...values, inputState])
    }

    return (
        <Fragment>
            {values.map((item, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="col-11">
                            <QuestionInput number={index} data={item} sendData={(data) => receiveData(index, data)} />
                        </div>
                        <div className="col-1">
                            <button className="btn btn-danger mt-3 p-4"
                                onClick={(event) => handleRemoveQuestion(index, event)}
                            ><i className="bi-trash"></i></button>
                        </div>
                    </div>
                )
            })}

            <div className="row m-1">
                <button className="col-11 offset-1 btn btn-primary"
                    onClick={handleAddQuestion}>
                    Dodaj Pytanie
                </button>
            </div>
        </Fragment>
    )
}
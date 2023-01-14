import React from "react";
import ResultAnswers from "./ResultAnswers";

class ResultSingleQuestion extends React.Component {

    arrayEquals(a, b) {
        if(Array.isArray(a)){
            a.sort()
        }else{
            return false
        }
        if(Array.isArray(b)){
            b.sort()
        }else{
            return false
        }
        return (
            a.length === b.length &&
            a.every((val, index) => val === b[index])
            )
            
    }

    isCorrectColor(isCorrect) {
        if (isCorrect) {
            return " border-success"
        } else {
            return " border-danger"
        }
    }


    render() {
        const { correctAnswers, userAnswer, answer, question, idx } = this.props
        const isCorrect = this.arrayEquals(correctAnswers, userAnswer)
        const color = this.isCorrectColor(isCorrect)
        return (
            <div className={"card mb-2 border-4" + color}>
                {/* HEADER */}
                <div className="border-bottom p-2">
                    <h4>Pytanie <span id="question_number">{idx}:</span> {question}</h4>
                </div>

                {/* CONTENT */}
                <div className="border-bottom p-2">
                    <div>
                        {answer.map((answers, i) => (
                            <ResultAnswers key={i}
                                idx={i}
                                answer={answers}
                                correctAnswer={correctAnswers}
                                userAnswer={userAnswer} />
                        ))}
                    </div>
                </div>

                {/* BOTTOM */}
                <div className=" border-bottom p-2">
                    <h5 style={{ display: "flex" }}>
                        <span>
                        Prawidłowa odpowiedź: {correctAnswers.map((correctAnswer, i) => answer[correctAnswer]).join(", ")}
                        </span>
                    </h5>
                </div>
            </div>
        )
    }
}

export default ResultSingleQuestion;

import React from "react";

class ResultAnswers extends React.Component {

    isAnswerSelected = () => {
        for (let i = 0; i < this.props.userAnswer.length; i++) {
            if (this.props.userAnswer[i] === this.props.idx) {
                return true
            }
        }
        return false
    }


    render() {
        return (
            <div>
                <p id="question_text">{this.isAnswerSelected() ?
                    <i className='bi-x-square-fill'></i> : <i className='bi-square'></i>} {this.props.answer}</p>
            </div>
        )
    }
}

export default ResultAnswers;

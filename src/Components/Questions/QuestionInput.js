import React from "react";

export default class QuestionInput extends React.Component{

    state = this.props.data

    sendDataToParent(){
        this.props.sendData(this.state)
    }

    componentDidUpdate(prevProp){
        if(this.props!==prevProp){
            const newQuestion = this.props.data.question
            const newForm = this.props.data.form
            const newFile = this.props.data.file
            this.setState({
                question: newQuestion,
                form: newForm,
                file: newFile
            })
        }
    }

    onQuestionChange = (event) => {
        event.preventDefault();
        this.setState({question: event.target.value}, () => this.sendDataToParent())
    }

    handleAddAnswer = (event) => {
        event.preventDefault();
        const inputState={
            answer:"", 
            isCorrect: false
        }
        let answerArray = this.state.form
        answerArray.push(inputState)
        this.setState({form: answerArray}, () => this.sendDataToParent())
    }

    onAnswerChange=(index,event)=>{
        let prev = this.state.form

        prev = prev.map((item, idx) => {
            if(idx !== index){
                return item
            }

            if(event.target.name === "answer"){
                return{
                    ...item,
                    [event.target.name]: event.target.value
                }
            }

            else if(event.target.name === "isCorrect"){
                return{
                    ...item,
                    [event.target.name]: event.target.checked
                }
            }
            else return{}
        })

        this.setState({form: prev}, () => this.sendDataToParent())
    }

    handleRemoveAnswer = (index, event) => {
        event.preventDefault()
        let answerArray = this.state.form
        answerArray = answerArray.filter((item) => item!==answerArray[index])
        this.setState({form: answerArray}, () => this.sendDataToParent())
    }

    addFile = (files) => {
        const file = (files) ? files : ""
        this.setState({file}, () => this.sendDataToParent())
    }

    render(){
        return (
            <div className="row">
                    <div className="col-11 offset-1">
                            <div className="card p-2 m-1">
                                <div className="card-body">
                                    {/* -- PYTANIE -- */}
                                    <div className="row p-1 mb-2">
                                        <label className="col-3 col-form-label">Pytanie nr {this.props.number+1}:</label>
                                        <div className="col-8">
                                            <input type="text" 
                                                   className="form-control"
                                                   onChange={(event => this.onQuestionChange(event))}
                                                   value={this.state.question}
                                                   placeholder={"Podaj pytanie..."}
                                                   required
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-primary" onClick={this.handleAddAnswer}><i className="bi-plus-lg"/></button>
                                        </div>
                                    </div>

    
                                    {/* -- ODPOWIEDZI -- */}
                                    {this.state.form.map((item, index) => (
                                            <div className="row p-1" key={`item-${index}`}>
                                                <label htmlFor="AnswerInput"  className="col-2 col-form-label" >Odpowiedź nr {index+1}:</label>
                                                <div className="col">
                                                    <div className="form-check">
                                                        <input className="form-check-input" 
                                                                type="checkbox"
                                                                name="isCorrect"
                                                                checked={item.isCorrect}
                                                                onChange={(event) => this.onAnswerChange(index,event)}
                                                            />
                                                    </div>    
                                                </div>
                                                <div className="col-8">
                                                    <input  type="text" 
                                                            name="answer" 
                                                            className="form-control" 
                                                            placeholder="Podaj odpowiedź..."
                                                            value={item.answer}
                                                            onChange={(event) => this.onAnswerChange(index,event)}
                                                            required
                                                    />
                                                </div>
                                                <div className="col-1" >
                                                    <button className="btn btn-danger"
                                                            onClick={(event) => this.handleRemoveAnswer(index,event)}
                                                    ><i className="bi-x-lg"/></button>
                                                </div>
                                            </div>
                                    ))
                                    }
    
                                </div>
                            </div>
                    </div>
                </div>
        )
    }
}


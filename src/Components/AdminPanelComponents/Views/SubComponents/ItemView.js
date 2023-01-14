import React from "react";
import TestDetails from "./TestDetails";

class ItemView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.data.id,
            toConfirm: false,
            remove: this.props.remove
        }
    }

    NoDefError = "Nie zdefiniowano"
    DelWarning = "Usuwanie jest nieodwracalne. Wciśnij ponownie, aby kontynuować."

    handleDeleteButtonClick = () => {
        this.setState({toConfirm: true})
        setTimeout(
            () => {
                this.setState({toConfirm: false})
            }, 5000
        )
    }

    componentDidUpdate(prevProp) {
        if (this.props !== prevProp) {
            const newToConfirm = this.props.toConfirm
            this.setState({
                toConfirm: newToConfirm
            })
        }
    }

    showButton = () => {
        if (this.state.toConfirm) {
            return (
                <button
                    className="btn btn-warning quizComponentRightBtn d-flex justify-content-center align-items-center flex-column panelViewBtn noRoundLeft roundRight"
                    onClick={() => {
                        this.state.remove(this.props.data.id)
                    }}>
                    <p>{this.DelWarning}</p>
                    <i className="bi-folder-x quizControls" style={{color: "black"}}/>
                </button>
            )
        } else {
            return (
                <button
                    className="btn btn-danger quizComponentRightBtn d-flex justify-content-center align-items-center panelViewBtn noRoundLeft roundRight"
                    onClick={() => {
                        this.handleDeleteButtonClick()
                    }}>
                    <i className="bi-folder-x quizControls"/>
                </button>
            )
        }
    }

    showDetails = () => {
        return (
            <>
                <button
                    className="btn btn-primary quizComponentLeftBtn d-flex justify-content-center align-items-center panelViewBtn noRoundRight roundLeft"
                    data-bs-toggle="modal" data-bs-target={`#staticBackdrop${this.props.data.id}`}>
                    <i className="bi-question-circle quizControls"/>
                </button>
                <TestDetails instance={this.props} groupNames = {this.props.groupNames}/>
            </>
        )
    }

    render() {
        return (
            <div className="singleView bg-gray-200 d-flex flex-column roundAll overflow-hidden"
                 id={`quizElement${this.props.data.id}`}
                 style={{width: "95%", height: "0%"}}>

                <div className="d-flex justify-content-between align-items-stretch h-100">
                    <div className="d-flex flex-column padding15 w-50">
                        <h5 className="card-title">{this.props.data.test_name || this.NoDefError}</h5>
                        <p className="card-text">
                        </p>
                        <p className="card-text">
                            {"id: " + (this.props.data.id || this.NoDefError)}
                        </p>
                    </div>
                    <div className="d-flex align-items-stretch justify-content-end w-50">
                        {this.showDetails()}
                        {this.showButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemView;
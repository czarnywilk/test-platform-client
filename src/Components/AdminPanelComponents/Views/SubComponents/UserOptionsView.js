import React from "react";
import {Link} from "react-router-dom";

class UserOptionsView extends React.Component {

    render() {
        return (
            <div className="singleView bg-gray-200 d-flex flex-column justify-content-start roundAll w-100 overflow-hidden" style={{height: "100px", marginBottom: '15px'}}>
                <div className="d-flex align-items-stretch h-100">
                    <div className="d-flex flex-column padding15 w-50 align-content-between" style={{
                        gap: "15px",
                    }}>
                        <h5 className="card-title">{this.props.user.account_name}</h5>

                        <span className="card-text">
                            {"Identyfikator: " + this.props.user.id}
                        </span>
                    </div>
                    <div className="d-flex align-items-stretch justify-content-end w-50">
                        <Link to={{pathname: "/user", search: `?id=${this.props.user.id}`}} className="btn btn-primary quizComponentLeftBtn d-flex justify-content-center align-items-center panelViewBtn roundAll">
                            <i className="bi-question-circle-fill quizControls"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserOptionsView;
import React from "react";
import { Link } from "react-router-dom";
import TextPaginate from "../Utils/TextPaginate";
import DateConverter from "../Utils/DateConverter";

class TestStandardView extends React.Component {

    NoDefError = "Nie zdefiniowano"

    isInteger(value) {
        return parseInt(value, 10).toString() === value;
    }

    checkTestValidityByDate = (data) => {
        if (this.isInteger(data.start_time) && this.isInteger(data.end_time)) {
            return data.start_time < Date.now() && Date.now() < data.end_time;
        } else if (this.isInteger(data.start_time) && !this.isInteger(data.end_time)) {
            return data.start_time < Date.now();
        } else if (!this.isInteger(data.start_time) && this.isInteger(data.end_time)) {
            return data.end_time > Date.now();
        } else {
            return true
        }
    }

    render() {
        const { data } = this.props
        return (

            <div className="singleView bg-gray-200 d-flex flex-column roundAll overflow-hidden"
                style={{ marginBottom: '10px', height: '100px' }}>

                <div className="d-flex h-100 ">
                    <div className="w-100 h-100">
                        <h2 style={{marginTop: '10px',}}>{TextPaginate(data.test_name, 80)}</h2>
                        <div className='d-flex' style={{ justifyContent: 'center', marginTop: '10px', width: '100%', gap: "10px" }}>

                            {
                                this.props.groupNames.length > 0 ?
                                    <p class="bi bi-people-fill w-50">
                                        {" " + this.props.groupNames.join(", ")}
                                    </p>
                                    :
                                    <p className="w-50"> </p>
                            }
                            {
                                data.start_time ?
                                    <p className="bi-hourglass-top w-50">
                                        {DateConverter.TimestampToDate(data.start_time)}
                                    </p>
                                    :
                                    <p className="w-50"> </p>
                            }
                            {
                                data.end_time ?
                                    <p className="bi-hourglass-bottom w-50">
                                        {DateConverter.TimestampToDate(data.end_time)}
                                    </p>
                                    :
                                    <p className="w-50"> </p>
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-end w-20 h-100 align-items-center">
                        <Link to={{ pathname: `/quiz/${this.props.data.id}` }}
                            className="btn btn-primary  roundAll d-flex justify-content-center align-items-center"
                            style={{
                                width: '150px',
                                marginRight: "10px",
                                pointerEvents: this.checkTestValidityByDate(data) ? 'auto' : 'none'
                            }}>

                            Rozwiąż
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default TestStandardView;
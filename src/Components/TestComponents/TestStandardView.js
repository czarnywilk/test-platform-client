import React from "react";
import {Link} from "react-router-dom";
import TextPaginate from "../Utils/TextPaginate";

class TestStandardView extends React.Component {

    NoDefError = "Nie zdefiniowano"

    ifExist(name, data, separator) {
        if (Array.isArray(data)) {
            if (data.toString().length > 50) {
                let formattedData = data.join(', ').slice(0, 50).slice(0, -1) + "..."
                return (
                    data &&
                    <p className="card-text">{`${name}${separator}` + (formattedData || this.NoDefError)}</p>
                )
            }
            return (
                data &&
                <p className="card-text">{`${name}${separator}` + (data.join(", ") || this.NoDefError)}</p>
            )
        } else {
            if (data.length > 50) {
                let formattedData = data.slice(0, 50).slice(0, -1) + "..."
                return (
                    data &&
                    <p className="card-text">{`${name}${separator}` + (formattedData || this.NoDefError)}</p>
                )
            }
            return (
                data &&
                <p className="card-text">{`${name}${separator}` + (data || this.NoDefError)}</p>
            )
        }
    }

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
        const {data} = this.props
        return (
            <div className="singleView bg-gray-200 d-flex flex-column roundAll overflow-hidden"
                 style={{marginBottom: '10px', height: '80px'}}>

                <div className="d-flex h-100">
                    <div className="d-flex flex-column text-start"
                         style={{marginLeft: '30px', marginTop: '20px', width: '35%'}}>
                        <h2 className="card-title">{TextPaginate(data.test_name, 50)}</h2>
                        {
                            data["tags"] &&
                            "Tagi: " + TextPaginate(data["tags"], 50)
                        }
                    </div>
                    <div className='d-flex' style={{marginTop: '40px', width: '12%'}}>

                    </div>
                    <div className="d-flex justify-content-end w-50 h-100 align-items-center">
                        <Link to={{pathname: '/quiz', search: `?id=${this.props.data.id}`}}
                              className="btn btn-primary roundAll d-flex justify-content-center align-items-center"
                              style={{
                                  width: '150px',
                                  marginLeft: "20px",
                                  pointerEvents: this.checkTestValidityByDate(data) ? 'auto' : 'none'
                              }}>
                            {/* <i className="bi-caret-right quizControls" style={{fontSize: '60px'}}/> */}
                            Rozwiąż
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestStandardView;
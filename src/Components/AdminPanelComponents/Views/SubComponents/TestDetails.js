import React from "react";
import DateConverter from "../../../Utils/DateConverter";

class TestDetails extends React.Component {

    noDefError = "Nie dotyczy"

    render() {
        const {data} = this.props.instance
        const groupNames = this.props.groupNames
        return (
            <div className="modal fade" id={`staticBackdrop${data.id}`} data-bs-backdrop="static"
                 data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content position-relative" style={{width: "160%", right: "30%"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{data.test_name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="padding5pc">
                            <table className="table">
                                <tbody id="itemDetails">
                                <tr>
                                    <th scope="row" className="bi-sd-card-fill"></th>
                                    <td>Id:</td>
                                    <td>{data.id}</td>
                                </tr>

                                <tr>
                                    <th scope="row" className="bi-people-fill"></th>
                                    <td>Dla grup:</td>
                                    <td>
                                        {
                                            (groupNames && groupNames.length>0) ? groupNames.join(", ") : this.noDefError
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bi-hourglass-top"></th>
                                    <td>Czas rozpoczęcia:</td>
                                    <td>{(data.start_time && data.start_time !== "null") ? DateConverter.TimestampToDate(data.start_time) : this.noDefError}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bi-hourglass-bottom"></th>
                                    <td>Czas zakończenia:</td>
                                    <td>{(data.end_time && data.end_time !== "null") ? DateConverter.TimestampToDate(data.end_time) : this.noDefError}</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default TestDetails;
import React from "react";
import { useHistory } from "react-router-dom";


export default function NoAccess(){

    const history = useHistory()

    const goBack = (e) => {
        e.preventDefault()
        history.goBack() 
    }

    const goToMenu = (e) => {
        e.preventDefault()
        history.push("/")
    }

    return (
        <div className="row d-flex justify-content-center align-items-center text-center w-100 h-75">
            <div className="bg-gray-200 col-6 card">
                <div className="card-body">
                    <i className="bi-exclamation-circle-fill text-danger" style={{fontSize: "100px"}}/>
                    <h5 className="card-title">
                        Błąd 403
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Nie masz wystarczających uprawnień do wykonania tej czynności.
                    </h6>

                    <div className="row">
                        <div className="col text-start">
                            <button className="btn btn-danger" onClick={goBack}>
                                <span><i className="icon bi-box-arrow-in-left" style={{paddingRight: "5px"}}/>  Powrót</span>
                            </button>
                        </div>
                        <div className="col text-end">
                            <button className="btn btn-danger" onClick={goToMenu}>
                               <span>Menu główne  <i className="icon bi-box-arrow-in-right" style={{paddingRight: "5px"}}/></span> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
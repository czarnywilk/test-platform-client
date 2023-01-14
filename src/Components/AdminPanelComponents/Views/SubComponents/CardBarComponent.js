import React from "react";
import {NavLink} from "react-router-dom";

class CardBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick.bind(this);
    }

    handleClick = (desiredPage) => {
        this.props.setStateOfParent(desiredPage)
    }

    render() {

        return (
            <div className="d-flex w-100" style={{
                height: "50px",
            }}>

                <NavLink to={{pathname: "/admin/Quizy", state: {card: "Quizy"}}} type="button"
                        className="btn btn-primary panelLeftBtn roundLeft d-flex justify-content-center align-items-center fontSize20"
                        onContextMenu={(e) => {e.preventDefault()}}>Quizy
                </NavLink>
                <NavLink to={{pathname: "/admin/Uzytkownicy", state: {card: "Uzytkownicy"}}} type="button"
                        className="btn btn-primary panelRightBtn roundRight d-flex justify-content-center align-items-center fontSize20"
                        onContextMenu={(e) => {e.preventDefault()}}>Użytkownicy
                </NavLink>

            </div>
        );
    }
}

export default CardBarComponent;
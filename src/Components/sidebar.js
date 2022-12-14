import React from "react";
import { Link, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = new createBrowserHistory()

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDownArrow: "bi-caret-left-fill",
            user: "Nie zalogowano"
        }
    }

    componentDidMount() {
        this.handleUsername()
    }

    handleUsername = () => {
        let data = JSON.parse(localStorage.getItem("user"))
        if (data) {
            this.setState({ user: data.account_name })
        } else {
            this.setState({ user: "Nie zalogowano" })
        }
    }

    handleToggle = event => {
        if (event.currentTarget.className.includes("collapsed")) {
            this.setState({ dropDownArrow: "bi-caret-left-fill" })
        } else {
            this.setState({ dropDownArrow: "bi-caret-down-fill" })
        }
    }

    signOut = () => {
        localStorage.clear()
        history.push('/signIn')
        this.setState({ user: "Nie zalogowano" })
        window.location.reload()
    }

    render() {
        const { permissions } = this.props
        return (
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "200px" }}>
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <span className="fs-4">
                        <img src="QuizLogo.png" className="img-fluid" alt="Koala logo" />
                    </span>
                </NavLink>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">

                    {
                        <NavLink to="/SearchTest" className="nav-link link-dark onHover" style={{ textDecoration: 'none' }}>
                            <li className="nav-item">
                                <i className="bi-house-fill" style={{ paddingRight: "5px" }} />
                                Wyszukaj test
                            </li>
                        </NavLink>
                    }
                </ul>
                
                <hr />

                <div className="dropup">
                    <button className="btn btn-white dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {this.state.user}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <li>
                            {localStorage.getItem("user") === null ? <Link to='signin' className="dropdown-item"
                                onClick={this.signOut}>Zaloguj się</Link> :
                                <div className="dropdown-item" onClick={this.signOut}>Wyloguj</div>}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar
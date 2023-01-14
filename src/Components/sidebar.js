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
                        <img src="QuizLogo.png" className="img-fluid" alt="Quiz logo" />
                    </span>
                </NavLink>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">

                    {
                        permissions.can_manage_tests &&
                        <NavLink to="/AddTest" className="nav-link link-dark onHover" style={{ textDecoration: 'none' }}>
                            <li className="nav-item">
                                <i className="bi-clipboard2-check-fill" style={{ paddingRight: "5px" }} />
                                Dodaj Test
                            </li>
                        </NavLink>
                    }

                    {
                        <NavLink to="/SearchTest" className="nav-link link-dark onHover" style={{ textDecoration: 'none' }}>
                            <li className="nav-item">
                                <i className="bi-house-fill" style={{ paddingRight: "5px" }} />
                                Wyszukaj test
                            </li>
                        </NavLink>
                    }

                    {
                        permissions.can_access_admin_panel &&
                        <div className="nav-link link-dark dropdownContainer"
                            style={{ textDecoration: 'none', paddingLeft: "3px", paddingTop: 0, paddingBottom: 0 }}>
                            <li className="btn btn-toggle nav-item" data-bs-toggle="collapse"
                                data-bs-target="#dashboard-collapse" aria-expanded="true"
                                onClick={this.handleToggle}>
                                <div className="position-relative float-start">
                                    <i className={`icon bi-person-workspace`} style={{ paddingRight: "5px" }} />
                                    <span className="">Admin</span>
                                </div>
                                <i className={`icon ${this.state.dropDownArrow} position-relative float-end`}
                                    style={{ float: "left", marginLeft: '20px' }} />
                            </li>
                            <div className="collapse" id="dashboard-collapse">
                                <ul className="btn-toggle-nav list-unstyled small">
                                    <li>
                                        <NavLink to={{
                                            pathname: "/admin/Quizy",
                                            state: { card: 'Quizy' }
                                        }} className="nav-link link-dark rounded dropdownNav pb-1 pt-1 onHover"
                                            onContextMenu={(e) => {
                                                e.preventDefault()
                                            }}>Testy</NavLink></li>
                                    <li>
                                        <NavLink to={{
                                            pathname: "/admin/Uzytkownicy",
                                            state: { card: 'Uzytkownicy' }
                                        }} className="nav-link link-dark rounded dropdownNav pb-1 pt-1 onHover"
                                            onContextMenu={(e) => {
                                                e.preventDefault()
                                            }}>Użytkownicy</NavLink></li>
                                    <li>
                                    <NavLink to={{
                                            pathname: "/manageRoles",
                                            state: { card: 'Roles' }
                                        }} className="nav-link link-dark rounded dropdownNav pb-1 pt-1 onHover"
                                            onContextMenu={(e) => {
                                                e.preventDefault()
                                            }}>Uprawnienia</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }


                    {
                        permissions.can_view_stats &&
                        <NavLink to="/Stats" className="nav-link link-dark onHover" style={{ textDecoration: 'none' }}>
                            <li className="nav-item">
                                <i className="icon bi-bar-chart-line-fill" style={{ paddingRight: "5px" }} />
                                Statystyki
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
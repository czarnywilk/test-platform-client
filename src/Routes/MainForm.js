import React from "react";
import {toast} from "react-toastify";
import MyToast from "../Components/Modals/MyToast";
import Server from "../Components/apis/Server";


class MainForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false
        };
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value.toLowerCase()});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        //NOTE: change to toast.promise
        Server.authenticate({username, password})
            .then((response) => {
                if (!response[0].message) {
                    localStorage.setItem('user', JSON.stringify(response[0]));
                    //history.push('/')
                    window.location.reload();
                }
            }).catch((error) => {
                let toastBody
                if (error.response && error.response.status !== 200 && error.response.status !== 201 ) {
                    toastBody = <MyToast title="Błąd" text="Błędne dane logowania"/>
                }
            toast.error(toastBody)
        })
    }    

    checkIsLoggedIn = () => {
        if (localStorage.getItem("user")) {
            this.setState({isLoggedIn: true})
        }
    }

    componentDidMount() {
        this.checkIsLoggedIn()
    }

    render() {

        const {username, password} = this.state;
        const enabled = username.length > 0 && password.length > 0;

        return (
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="/QuizLogo.png"
                                 className="img-fluid" alt="Koala logo"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form id="signinform" method="POST" onSubmit={this.handleSubmit}>

                                <div className="form-outline mb-4">
                                    <input type="text" id="username" name="username"
                                           className="form-control form-control-lg"
                                           placeholder="Nazwa..." required value={this.state.username}
                                           onChange={this.handleUsernameChange} autoFocus
                                           disabled={this.state.isLoggedIn}/>
                                    <label className="form-label" htmlFor="form3Example3">Nazwa użytkownika</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="password" name="password"
                                           className="form-control form-control-lg"
                                           placeholder="Hasło..." required value={this.state.password}
                                           onChange={this.handlePasswordChange} disabled={this.state.isLoggedIn}/>
                                    <label className="form-label" htmlFor="form3Example4">Hasło użytkownika</label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                            style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}
                                            disabled={!enabled}>Zaloguj
                                    </button>
                                    {
                                        this.state.isLoggedIn &&
                                        <p style={{fontStyle: "italic", color: "#dc3545"}}>Jesteś już zalogowany!</p>
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default MainForm;
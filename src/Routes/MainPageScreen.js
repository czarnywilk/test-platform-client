import React from 'react'
import {Link} from "react-router-dom";

export default class MainPageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount() {
        this.setState({user: JSON.parse(localStorage.getItem('user'))})
    }
    render() {
        return (
            <div style={{overflowX: "hidden"}}>
                <div className='row md-2 justify-content-center'>
                    <img src="/QuizLogo.png" style={{width: "50%"}}
                         className="img-fluid" alt="logo"/></div>
                <div className='row justify-content-center'>
                    <div className='col-md-6 align-self-center'>

                        <div className='d-flex flex-column align-items-center padding15 bg-gray-300 rounded'
                             style={{marginTop: '10px'}}>
                            <h4> Witaj </h4>
                            <p>Jest to strona przeznaczona do rozwiazaywania testów.</p>
                            <p>Chcesz przejść do wyszukiwania testów? Naciśnij poniższy przycisk.</p>
                            <Link className='btn btn-primary' to='/searchTest'>Wyszukaj test</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
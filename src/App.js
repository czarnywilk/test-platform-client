import React from "react";

import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import MainPageScreen from "./Routes/MainPageScreen";
import SearchTest from "./Routes/SearchTest.js";
import MainForm from "./Routes/MainForm";
import {Slide, toast, ToastContainer} from "react-toastify";

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          permissions: [],
          isLoaded: false
      }
  }
  
  render() {
    const {permissions} = this.state
    const isLogged = (localStorage.getItem("user"))
    return(
                  <div className="d-flex flex-nowrap" style={{
                height: '100vh',
                maxHeight: '100vh',
                overflowX: "auto",
                overflowY: "hidden",
            }}>
        <Router>
          <div className="overflow-auto" style={{width: "100%", minWidth: "500px"}}>
            <Switch>
                    <Route exact path="/">
                      {isLogged ? <MainPageScreen/> : <Redirect to='/signin'/>}
                    </Route>

                    <Route path="/signin">
                      {isLogged ? <Redirect to='/'/> : <MainForm/>}
                    </Route>

                    <Route path="/SearchTest">
                      <SearchTest/>
                    </Route>

            </Switch>
            </div>
            <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    limit="10"
                    hideProgressBar={true}
                    closeOnClick={false}
                    transition={Slide}
                    style={{
                        width: '350px'
                    }}
                />
        </Router>
      </div>
    )
    

  }
}

export default App;


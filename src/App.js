import React from "react";

import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Sidebar from "./Components/sidebar";
import MainPageScreen from "./Routes/MainPageScreen";
import SearchTest from "./Routes/SearchTest.js";
import MainForm from "./Routes/MainForm";
import { Slide, toast, ToastContainer } from "react-toastify";
import Server from "./Components/apis/Server";
import AddTest from "./Routes/AddTest"
import NoAccess from "./Routes/NoAccess";
import QuizScreen from "./Routes/QuizScreen";
import ResultScreen from "./Routes/ResultScreen";
import StatisticScreen from "./Routes/StatisticScreen";
import RoleManagementScreen from "./Routes/RoleManagementScreen";
import AdminScreen from "./Routes/AdminScreen";
import UserDetails from "./Components/AdminPanelComponents/Views/SubComponents/UserSubComponents/UserDetails";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permissions: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    const getData = async () => {

      if (localStorage.getItem("user") !== null) {
        const id = (JSON.parse(localStorage.getItem('user'))).id
        const response = await Server.getUserPermissionsById({ id })
        this.setState({ permissions: response })
      }
    }

    getData()
      .then(() => {
        this.setState({ isLoaded: true })
      })
      .catch(error => {
        // NOTE: BETTER ERROR TOAST
        console.log(error)
        toast.error("Błąd pobrania uprawnień użytkownika")
        this.setState({ isLoaded: true })
      })

  }


  render() {
    const { permissions } = this.state
    const isLogged = (localStorage.getItem("user"))
    return (
      <div className="d-flex flex-nowrap" style={{
        height: '100vh',
        maxHeight: '100vh',
        overflowX: "auto",
        overflowY: "hidden",
      }}>
        <Router>
          {localStorage.getItem("user") !== null && <Sidebar permissions={permissions} />}
          <div className="overflow-auto" style={{ width: "100%", minWidth: "500px" }}>
            <Switch>
              <Route exact path="/">
                {isLogged ? <MainPageScreen /> : <Redirect to='/signin' />}
              </Route>

              <Route path="/signin">
                {isLogged ? <Redirect to='/' /> : <MainForm />}
              </Route>

              <Route path="/SearchTest">
                <SearchTest />
              </Route>

              <Route path="/AddTest">
                {permissions.can_manage_tests ? <AddTest /> : <NoAccess />}
              </Route>


              <Route path="/admin">
                {permissions.can_access_admin_panel ? <AdminScreen /> : <NoAccess />}
              </Route>

              <Route path="/quiz/:id" component={QuizScreen}>
              </Route>

              <Route path="/quizResults">
                <ResultScreen />
              </Route>

              <Route path="/Stats">
                {permissions.can_view_stats ? <StatisticScreen /> : <NoAccess />}
              </Route>

              <Route path="/manageRoles">
                {permissions.can_manage_permissions ? <RoleManagementScreen /> : <NoAccess />}
              </Route>

              <Route path={"/user"}>
                {isLogged ? <UserDetails /> : <Redirect to='/signin' />}
              </Route>

              <Route path='*' > {isLogged ? <MainPageScreen /> : <Redirect to='/signin' />}
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

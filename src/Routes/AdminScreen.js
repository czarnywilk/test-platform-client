import React from "react";
import CardBarComponent from "../Components/AdminPanelComponents/Views/SubComponents/CardBarComponent";
import AdminPanelDataView from "../Components/AdminPanelComponents/Views/AdminPanelDataView";
import AdminPanelUsersView from "../Components/AdminPanelComponents/Views/AdminPanelUsersView";
import Server from "../Components/apis/Server";
import { Route } from "react-router-dom";
import ErrorToast from "../Components/Modals/ErrorToast";

export default class AdminScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canView: ""
        }
    }

    getUserPermissions = async () => {
        try {
            const canView = await Server.getUserPermissionsById({id: JSON.parse(localStorage.getItem("user")).id})
            this.setState({
                canView
            })
        } catch (e) {
            ErrorToast(e)
        }
    }

    componentDidMount() {
        this.getUserPermissions()
    }

    render() {
        return (
            <>
                <div
                    className="bg-gray-100 position-relative d-flex flex-wrap flex-column justify-content-start roundAll"
                    style={{
                        top: "5%",
                        right: "-3%",
                        width: "93%",
                        minWidth: "920px",
                        minHeight: "85%",
                        gap: "4%",
                        rowGap: "15px",
                    }}>

                    <CardBarComponent/>

                    <Route path={"/admin/"} exact>
                        <AdminPanelDataView type="Test"/>
                    </Route>

                    <Route path={"/admin/Quizy"}>
                        <AdminPanelDataView type="Test"/>
                    </Route>

                    <Route path={"/admin/Uzytkownicy"}>
                        <AdminPanelUsersView/>
                    </Route>
                </div>
            </>
        )

    }

}
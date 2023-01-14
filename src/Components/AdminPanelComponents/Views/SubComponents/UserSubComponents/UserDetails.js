import React from "react";
import Server from "../../../../apis/Server";
import {toast} from "react-toastify";
import MyToast from "../../../../Modals/MyToast";
import {withRouter} from "react-router-dom";
import ErrorToast from "../../../../Modals/ErrorToast";

class UserDetails extends React.Component {

    constructor(props) {
        super(props);

        this.userId = this.props.location.search ? new URLSearchParams(this.props.location.search).get("id") : JSON.parse(localStorage.getItem('user')).id
        this.state = {
            // NOTE: switch to non location ?
            id: this.userId,
            userInfo: [],
            groupsToUpdate: [],
            userPermissions: [],
            userGroups: [],
        }

        this.addGroupToUserGroupList = this.addGroupToUserGroupList.bind(this)
    }

    async getUserById() {
        try {
            const [data, headers] = await Server.getUsers({id: this.state.id})
            const userGroups = await Server.getUserGroupsById({userId: this.state.id})
            this.setState({
                userInfo: data[0],
                groupsToUpdate: [data[0]],
                userGroups
            })
        } catch (e) {
            ErrorToast(e)
        }
    }

    showUserPermissions = () => {
        let keys = []
        let values = []
        for (const [key, value] of Object.entries(this.state.userPermissions)) {
            keys.push(key)
            values.push(value)
        }

        return keys.map((item, i) => {
            if (item.includes('can')) {
                item = this.formatPermissionName(item)
                return <tr key={i}>
                    <td>
                        {item}
                    </td>
                    <td className={values[i].toString() === "false" ? "text-danger" : ""}>
                        {values[i].toString()}
                    </td>
                </tr>
            }
        })
    }

    showUserGroups = () => {
        return this.state.userGroups.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{item.group_name}</td>
                </tr>
            )
        })
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    formatPermissionName = (name) => {
        let words = name.split('_')
        words = words.map((item) => this.capitalizeFirstLetter(item))
        return words.join(' ')
    }

    async getUserPermissionsById() {
        const id = this.state.id
        try {
            const data = await Server.getUserPermissionsById({id})
            this.setState({userPermissions: data})
        } catch (e) {
            ErrorToast(e)
        }
    }

    async getAllGroups() {
        try {
            const data = await Server.getAllGroups()
            this.setState({groups: data})
        } catch (e) {
            ErrorToast(e)
        }
    }

    addGroupToUserGroupList(e) {
        let groups = [...this.state.groupsToUpdate]
        groups[0].roles.push(e.target.value)
        this.setState({groupsToUpdate: groups}, () => {
            e.target.value = "Wybierz grupę..."
        })
    }

    deleteGroupToUserGroupList(item) {
        let groups = [...this.state.groupsToUpdate]
        let posInArray = groups[0].roles.indexOf(item)
        groups[0].roles.splice(posInArray, 1)
        this.setState({groupsToUpdate: groups})
    }

    sendData = () => {
        toast.promise(Server.editUser(), {
            pending: {
                render() {
                    return <MyToast title="Wynik" text="czekaj..."/>
                }
            },
            success: {
                render() {
                    return <MyToast title="Sukces" text="Zaktualizowano pomyślnie."/>
                }
            },
            error: {
                render(e) {
                    return ErrorToast(e,true)
                }
            },
        })
    }

    componentDidMount() {
        this.getUserById()
        this.getAllGroups()
        this.getUserPermissionsById()
    }

    render() {
        return (
            <div className="d-flex flex-wrap bg-gray-100 flex-column roundAll padding15" style={{
                width: "95%",
                margin: "25px",
            }}>
                <h2>
                    {this.state.userInfo.account_name}
                </h2>
                <hr className="separator"/>

                <p>
                    Identyfikator: {this.state.userInfo.id}
                </p>
                <p>
                    Uprawnienia:
                </p>
                <table className="table table-hover table-bordered">
                    <tbody>
                    {this.state.userPermissions && this.showUserPermissions()}
                    </tbody>
                </table>
                <p>
                    Grupy:
                </p>
                <table className="table table-hover table-bordered">
                    <tbody>
                    {this.state.userGroups && this.showUserGroups()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(UserDetails);
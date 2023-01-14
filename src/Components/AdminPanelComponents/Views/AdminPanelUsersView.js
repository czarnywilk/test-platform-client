import React from "react";
import UserOptionsView from "./SubComponents/UserOptionsView";
import UserSearchBar from "./SubComponents/UserSubComponents/UserSearchBar";
import Server from "../../apis/Server";
import Pagination from "../../UI/Pagination";

export default class AdminPanelUsersView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            jsonData: "",
            filter: "",
            errorMessage: "",
            data: [],
        }
        this.timer = undefined
        this.child = React.createRef()
    }

    setSearchParam = () => {
        this.child.current.handlePageChange({selected: 0})
    }

    receiveDataFromChild = (data) => {
        this.setState({data})
    }


    setNameParam = (username) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if (username !== undefined) {
                this.setState({username}, () => {
                    this.setSearchParam()
                })
            } else {
                this.setState({jsonData: "", errorMessage: "Brak wyników."})
            }
        }, 1000)
    }

    appUserDisplay = (instance, i) => {
        return (
            <UserOptionsView user={instance}
                             key={i}
            />
        )
    }

    activeDirectoryUserDisplay = (instance, i) => {
        return (
            <UserOptionsView name={instance["displayName"]}
                             description={instance["description"]}
                             mail={instance["mail"]}
                             key={i}
            />
        )
    }

    render() {
        return (
            <div className="w-100" id="userView">
                <div className="d-flex position-relative flex-wrap justify-content-center padding15" style={{
                    right: "-3%",
                    width: "93%",
                    minWidth: "920px",
                    minHeight: "20%",
                    rowGap: "15px",
                }}>

                    <UserSearchBar setUsername={this.setNameParam}/>
                    <div className="w-100" style={{gap: "4%"}}>
                        {
                            this.state.data && !this.state.data.message &&
                            this.state.data.map((instance, i) => {
                                return this.appUserDisplay(instance, i)
                            })
                        }
                        {
                            (this.state.errorMessage !== "") &&
                            <div>
                                <p className="text-center" style={{
                                    fontStyle: "italic",
                                }}>
                                    {this.state.errorMessage}<br/>
                                    {this.state.data.message}
                                </p>
                            </div>
                        }
                        <div>
                            {
                                this.state.errorMessage === "" &&
                                <Pagination
                                    ref={this.child}
                                    instance={{
                                        marginPages: 1,
                                        pageRange: 3,
                                        perPage: 5,
                                        searchPhrase: this.state.username,
                                        apiCall: Server.getUsers
                                }} dataTransfer={this.receiveDataFromChild}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
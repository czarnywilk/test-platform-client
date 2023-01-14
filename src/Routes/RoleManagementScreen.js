import React from "react";
import GroupRow from "../Components/RoleComponents/GroupRow"
import {toast} from "react-toastify";
import MyToast from "../Components/Modals/MyToast";
import Server from "../Components/apis/Server";
import {Redirect} from "react-router-dom";
import ErrorMessage from "../Components/Utils/ErrorMessages";
import ErrorToast from "../Components/Modals/ErrorToast";

export default class RoleManagementScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            filtered: [],
            listOfCans: [],
            isLoaded: false,
            canManage: null
        }

        this.toSend = []
        this.filterItems = this.filterItems.bind(this)
    }

    async getAllGroups() {
        try {
            const data = await Server.getAllGroups()
            this.setState({groups: data, filtered: data}, () => {
                this.setState({listOfCans: Object.keys(this.state.groups[0]).filter((item) => item.includes("can"))})
                for (let i = 0; i < this.state.groups.length; i++) {
                    this.toSend.push({})
                }
            })
        } catch (e) {
            ErrorToast(e)
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    formatColumnName = (colName) => {
        let words = colName.split('_')
        words = words.map((item) => this.capitalizeFirstLetter(item))
        return words.join(' ')
    }

    updateGroupDatabase = async () => {
        let data = this.toSend.filter((item) => Object.keys(item).length > 0)
        if (data.length === 0) {
        } else {
            await Server.editPermissions(data)
                .then(() => {
                    this.toSend = []
                    this.getAllGroups()
                })
                .catch((e) => {
                    throw e
                })
        }
        return data.length
    }


    addToSend = (i, obj) => {
        this.toSend[i] = obj
    }

    displayGroups = () => {
        return this.state.filtered.map((instance, i) => {
            return (
                <GroupRow
                    key={i}
                    id={instance.id}
                    index={i + 1}
                    group={instance}
                    send={(i, obj) => this.addToSend(i, obj)}
                />
            )
        })
    }

 
    updateButtonPressed() {
        toast.promise(this.updateGroupDatabase, {
            pending: {
                render() {
                    return <MyToast title="Wynik" text="czekaj..."/>
                }
            },
            success: {
                render({data}) {
                    return <MyToast title="Wynik" text={`Zmieniono rekordów: ${data} `}/>
                },
                delay: 750,
            },
            error: {
                render(e) {
                    return ErrorToast(e, true)
                }
            },
        })
    }

    filterItems = (e) => {
        let filtered = [...this.state.groups]
        filtered = filtered.filter((item) => {
            return item.group_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        this.setState({filtered})
    }

    componentDidMount() {
        this.getAllGroups()
        this.canAccess()
    }

    hasAccess(){
        return (
            <div>
                <div
                    className="bg-gray-100 position-relative d-flex flex-wrap flex-row justify-content-start roundAll padding15"
                    style={{
                        width: "93%",
                        minWidth: "1000px",
                        height: "90%",
                        gap: "4%",
                        rowGap: "15px",
                        margin: "35px",
                    }}>
                    <input type="text" className="d-flex padding15" style={{
                        width: "100%",
                        backgroundColor: "white",
                        alignSelf: "center",
                        height: "40px",
                        position: "sticky",
                        top: 0
                    }}
                           onChange={this.filterItems}
                           placeholder={"Wyszukaj według nazwy..."}
                    />
                    <table className="table table-hover">
                        <thead className="bg-gray-100" style={{position: "sticky", top: "40px", zIndex: 1}}>
                        <tr>
                            <th style={{width: "0%"}} scope="col">#</th>
                            <th style={{width: "0%"}} scope="col">Rola</th>

                            {
                                this.state.listOfCans &&
                                this.state.listOfCans.map((item, i) => {
                                    return (
                                        <th scope="col" key={i}>{this.formatColumnName(item)}</th>
                                    )
                                })
                            }

                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.filtered && this.displayGroups()
                        }
                        </tbody>
                    </table>
                    <button className="btn btn-warning d-flex justify-content-center align-items-center fab"
                            style={{
                                position: "fixed",
                                bottom: "45px",
                                right: "45px",
                                width: "90px",
                                height: "90px"
                            }}
                            onClick={
                                () => this.updateButtonPressed()
                            }>
                        <i className="bi-file-earmark-check fontSize40"/>
                    </button>
                </div>
            </div>
        )
    }

    async canAccess(){
        try {
            const can = await Server.getUserPermissionsById({id: JSON.parse(localStorage.getItem("user")).id})
            this.setState({
                canManage: can.can_manage_permissions,
                isLoaded: true
            })
        } catch (e) {
            ErrorToast(e)
        }
    }

    render() {

        if (this.state.isLoaded) {
            if(this.state.canManage) {
                return (this.hasAccess())
            }else{
                return(<Redirect to={"/accessError"}/>)
            }
        }else{
            return (
                <div>ładowanie</div>
            )
        }
    }

}
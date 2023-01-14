import React from "react";
import ItemView from "./SubComponents/ItemView";
import {toast} from "react-toastify";
import Server from "../../apis/Server"
import MyToast from "../../Modals/MyToast";
import Pagination from "../../UI/Pagination";
import ErrorToast from "../../Modals/ErrorToast";

export default class AdminPanelDataView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchParam: "",
            groups: [],
        }
        this.timer = undefined
        this.child = React.createRef()
    }

    async componentDidMount(){
        const groups = await Server.getAllGroups()
        this.setState({groups})
    }

    removeQuiz = (id) => {
        toast.promise(Server.deleteTest({id}), {
            pending: {
                render() {
                    return <MyToast title="Usuwanie" text="Czekaj..."/>
                }
            },
            success: {
                render() {
                    return <MyToast title="Usunięto" text={`Quiz został usunięty`}/>
                },
                delay: 750, 
            },
            error: {
                render(e) {
                    return ErrorToast(e,true)
                },
            },
        }).then(() => {
            this.child.current.forceRefresh()
        })
    }

    setSearchParam = () => {
        this.child.current.handlePageChange({selected: 0})
    }

    receiveDataFromChild = (data) => {
        this.setState({data})
    }

    setNameParam = (e) => {
        const searchParam = e.target.value
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if (searchParam !== undefined) {
                this.setState({searchParam}, () => {
                    this.setSearchParam()
                })
            }
        }, 1000)
    }

    render() {
        return (
            <div className="w-100" id="quizView">

                <div className="d-flex justify-content-center" style={{
                    position: "sticky",
                    top: "15px",
                    zIndex: 3,
                }}>
                    <input type="text" className="form-check-input d-flex padding15" style={{
                        width: "91.75%",
                        backgroundColor: "white",
                        alignSelf: "center",
                        height: "40px"
                    }}
                        onChange = {this.setNameParam}
                           placeholder={"Wyszukaj według nazwy..."}
                    />
                </div>

                <div className="d-flex position-relative flex-wrap justify-content-center padding15" style={{
                    right: "-3%",
                    width: "93%",
                    minWidth: "920px",
                    gap: "4%",
                    rowGap: "15px",
                    paddingTop: "35px"
                }}>
                    {
                        this.state.data &&
                        this.state.data.map((instance, i) => {
                            return (
                                <ItemView data={instance}
                                          key={i}
                                          i={i}
                                          remove={this.removeQuiz}
                                          groupNames={(instance.groups || []).map(g=>this.state.groups.length>0 ? this.state.groups[g-1].group_name : "")}
                                />
                            )
                        })
                    }
                    <Pagination
                         ref={this.child}
                         instance={{
                             marginPages: 1,
                             pageRange: 3,
                             perPage: 5,
                             searchPhrase: this.state.searchParam,
                             form: this.props.type,
                             apiCall: Server.getAllTests
                         }} dataTransfer={this.receiveDataFromChild}/>
                </div>
            </div>
        )
    }
}
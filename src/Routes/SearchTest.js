import React from "react";
import Server from "../Components/apis/Server";
import TestStandardView from "../Components/TestComponents/TestStandardView.js";
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from "../Components/UI/Pagination";



export default class SearchTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            filters: [],
            search: '',
            data: [],
            groups: [],
        };
        this.child = React.createRef()
        this._filters = []
    }

    handleChange = (e) => {
        this._filters = [...this._filters]
        if (e.target.checked === true) {
            this._filters.push(e.target.name)
        } else {
            this._filters = this._filters.filter(name => name !== e.target.name)
        }
    };

    receiveDataFromChild = (data) => {
        this.setState({data})
    }

    async componentDidMount(){
        const groups = await Server.getAllGroups()
        this.setState({groups})
    }

    updateFilters = (e) => {
        e.preventDefault()
        this.setState({filters: this._filters}, () => {
            this.child.current.forceRefresh()
        })
    }

    render() {
        return (
            <div className="bg-gray-100 overflow-hidden roundAll" style={{
                margin: "10px"
            }}>
                <form>
                    <div className="from-group row padding15">
                    
                        <div className="col-1 col-form-label text-end">
                            
                        </div>
                        <div className="col-8 ">
                            <input style={{border: '2px lightgray solid', marginTop: '20 px'}} type="text" className="form-control"
                                   id="searchInput" placeholder="Szukaj testu"
                                   onChange={event => this.setState({search: event.target.value.toLowerCase()})}/>
                            
                        </div>
                        <div className="col-2 ">
                        
                        <div style={{}}>
                                <button
                                    style={{
                                        width: '100%'
                                    }}
                                    className={"btn btn-primary"}
                                    onClick={this.updateFilters}
                                >
                                    Zatwierdź
                                </button>
                            </div>
                            </div>
                        
                    </div>
                    <div className="from-group row m-0 w-100"
                         style={{height: "80vh"}}>
                        <div className="col-1" style={{paddingTop: 30}}>
                            <div style={{
                                paddingLeft: 50
                            }}>
                            </div>
                            <div style={{paddingTop: 10}}>
                                <div style={{
                                    paddingLeft: 50
                                }}>

                                </div>
                            </div>
                        </div>
                        <div className="col-10 text-center" style={{borderLeft: '10px'}}>
                            <div className="text-center padding15" style={{
                                height: "79vh",
                                overflowY: "scroll",
                                border: 'lightgray solid 2px',
                                borderRadius: '5px'
                            }}>
                                {
                                    
                                    this.state.data.map((item, i) => {
                                        return (

                                            <TestStandardView key={i} data={item} groupNames = {(item.groups || []).map(g=>this.state.groups.length>0 ? this.state.groups[g-1].group_name : "")}/>
                                        )
                                    })
                                }
                                <Pagination
                                    ref={this.child}
                                    instance={{
                                        marginPages: 1,
                                        pageRange: 3,
                                        perPage: 8,
                                        form: this.state.filters.join(),
                                        searchPhrase: this.state.search,
                                        apiCall: Server.getAllTests
                                    }} dataTransfer={this.receiveDataFromChild}/>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
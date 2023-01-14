import React from "react";


export default class ResultTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            filterOrder: "asc",
            filterName: "id"
        }
    }

    componentDidUpdate(prevProp) {
        if (this.props.data !== prevProp.data) {
            this.setState({
                data: this.props.data,
                filterOrder: "asc",
                filterName: "id"
            })
        }
    }

   
    showArrow = (name) => {
        if (name === this.state.filterName) {
            const icon = (this.state.filterOrder === "desc") ? 'icon bi-caret-down-fill' : 'icon bi-caret-up-fill'
            return <i className={icon} />
        } else {
            const icon = (this.state.filterOrder === "desc") ? 'icon bi-caret-down' : 'icon bi-caret-up'
            return <i className={icon} />
        }
    }

 
    sortBy = (name) => {
        let data = [...this.state.data]
        if (data.length !== 0) {
            if (this.state.filterOrder === "asc") { // ---- IF FILER ASCENDING ----
                const sorted = data.sort(
                    function (a, b) {
                        let x = parseFloat(a[name])
                        let y = parseFloat(b[name])
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0))
                    }
                )
                this.setState({
                    data: sorted,
                    filterOrder: "desc"
                })
            } else { // ---- IF FILTER DESCENDING ----
                const sorted = data.sort(
                    function (a, b) {
                        let x = parseFloat(a[name])
                        let y = parseFloat(b[name])
                        return ((x > y) ? 1 : ((x < y) ? -1 : 0))
                    }
                )
                this.setState({
                    data: sorted,
                    filterOrder: "asc"
                })
            }
            this.setState({ filterName: name })
        }
    }

    render() {
        return (
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => { this.sortBy("id") }}>{this.state.data.length} {this.showArrow("id")}</th>
                        <th scope="col" onClick={() => { this.sortBy("test_name") }}>Nazwa testu {this.showArrow("test_name")}</th>
                        <th scope="col" onClick={() => { this.sortBy("user_name") }}>Użytkownik {this.showArrow("user_name")}</th>
                        <th scope="col" onClick={() => { this.sortBy("points") }}>Punkty zdobyte/max {this.showArrow("points")}</th>
                        <th scope="col" onClick={() => { this.sortBy("procent") }}>Procent {this.showArrow("procent")}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id+1}</th>
                                <td>{item.test_name}</td>
                                <td>{item.user_name}</td>
                                <td>{item.points}/{item.max_points}</td>
                                <td>{item.procent*100 + "%"}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    }
}
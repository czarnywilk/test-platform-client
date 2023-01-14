import React from "react";


export default class GroupRow extends React.Component {

    constructor(props) {
        super(props);

        this.permissions = []
        this.listOfCans = Object.keys(this.props.group).filter((item) => item.includes("can"))

        this.state = {
            group: this.props.group,
            toEditGroup: this.props.group,
        }
    }

    toggleButton = (item, i) => {
        const edited = {...this.state.toEditGroup}
        edited[item] = !edited[item]
        this.setState({toEditGroup: edited})
        if (!this.objectsEqual(edited, this.state.group)) {
            this.props.send(this.props.id, edited, i)
        } else {
            this.props.send(this.props.id, {}, i)
        }
    }

    arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    objectsEqual = (a, b) => {
        if (!this.arraysEqual(Object.keys(a), Object.keys(b))) {
            return false
        }
        return this.arraysEqual(Object.values(a), Object.values(b));
    }

    componentDidUpdate(prevProp) {
        if (this.props !== prevProp) {
            const newToEdit = this.props.group
            this.setState({
                group: newToEdit,
                toEditGroup: newToEdit
            })
        }
    }

    render() {

        return (
            <tr style={{height: "60px"}}>
                <th scope="row">{this.props.index}</th>
                <td>{this.state.toEditGroup.group_name}</td>
                {
                    this.listOfCans.map((item, i) => {
                        this.permissions.push({id: i, button: this.state.toEditGroup[item]})
                        return (
                            <td key={i} style={{width: "5%"}}>
                                <button className={this.state.toEditGroup[item] ? "btn btn-primary" : "btn btn-danger"}
                                        onClick={() => this.toggleButton(item, i)}>
                                    <i className={this.state.toEditGroup[item] ? "bi-check-lg switch" : "bi-x-lg switch"}/>
                                </button>
                            </td>
                        )
                    })
                }
            </tr>
        )
    }
}
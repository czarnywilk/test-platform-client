import React from "react";

export default class UserSearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            resultArray: [],
            filter: "account_name",
            filterDirection: true
        }
    }

    searchText = "Wyszukaj według nazwy użytkownika / pozostaw puste, aby wyświetlić wszystkich"

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
        this.props.setUsername(e.target.value);
    }

    sort = (array, filterName, bool) => {
        return array.sort(
            (a, b) => {
                let x, y
                if(typeof a[filterName] !== "number")
                {
                    x = a[filterName].toLowerCase()
                    y = b[filterName].toLowerCase()
                } else {
                    x = a[filterName]
                    y = b[filterName]
                }
                if (bool === false) {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0))
                } else {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
                }
            }
        )
    }

    render() {
        return (
            <>
                <div style={{position: "sticky", top: "5px", padding: 0}} className="w-100"
                     id="userSearchBar">
                    <form className="d-flex w-100">
                        <input className="form-check-input padding15 d-flex searchBar" type="text"
                               name="findUsersByName"
                               value={this.state.username} style={{
                            marginRight: "-2px"
                        }} onChange={this.handleUsernameChange} placeholder={this.searchText}/>
                    </form>
                </div>
            </>
        )
    }
}
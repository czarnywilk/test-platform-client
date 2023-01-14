import React from "react"


export default class AttemptTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            filterOrder: "asc",
            filterName: "id",
        }
    }

    componentDidUpdate(prevProp) {
        if (this.props.data !== prevProp.data) {
            this.setState({
                data: this.props.data,
                filterOrder: "asc",
                filterName: "id"
            }, () => {
                let attempts = this.usersTestAttempts()
                attempts = this.attemptsConverter(attempts)
                this.setState({ data: attempts })
            })
        }
    }


    usersTestAttempts() {
        let data = [...this.state.data]

        let attempts = {}

        data.map((item) => {
            const { user_name,test_name } = item

            if (attempts[user_name] !== undefined) {
                if (attempts[user_name][test_name] !== undefined) {
                    attempts[user_name][test_name] += 1
                } else {
                    attempts[user_name][test_name] = 1
                }
            } else {
                attempts[user_name] = { [test_name]: 1 }
            }

            return 1
        })

        return attempts
    }

    attemptsConverter(attempts) {
        let data = []
        let index = 0
        for (let user_name of Object.keys(attempts)) {
            let userAttempt = attempts[user_name]
            for (let test_name in userAttempt) {
                data.push({id: index++, user_name, test_name, attempt: userAttempt[test_name]})
            }
        }
        return data
    }

    usersTestAttemptsData() {
        let attempts = this.usersTestAttempts()
        attempts = this.attemptsConverter(attempts)
        this.setState({ data: attempts })
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
            if (this.state.filterOrder === "asc") {
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
            } else {
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

    componentDidMount() {
        this.usersTestAttemptsData()
    }

    render() {
        return (
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => { this.sortBy("id") }}>{this.state.data.length} {this.showArrow("id")}</th>
                        <th scope="col" onClick={() => { this.sortBy("user_name") }}>Użytkownik {this.showArrow("user_name")}</th>
                        <th scope="col" onClick={() => { this.sortBy("test_name") }}>Nazwa testu {this.showArrow("test_name")}</th>
                        <th scope="col" onClick={() => { this.sortBy("attempt") }}>Podejścia {this.showArrow("attempt")}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id+1}</th>
                                <td>{item.user_name}</td>
                                <td>{item.test_name}</td>
                                <td>{item.attempt}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    }

}

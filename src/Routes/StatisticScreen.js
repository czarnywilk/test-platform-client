import React from 'react'
import { toast } from 'react-toastify'
import MyToast from '../Components/Modals/MyToast'
import ResultTable from '../Components/StatisticComponents/ResultTable'
import DataPlots from '../Components/StatisticComponents/DataPlots'
import AttemptTable from '../Components/StatisticComponents/AttemptTable'
import Server from '../Components/apis/Server'
import myRound from '../Components/Utils/MyRound'
import TextPaginate from '../Components/Utils/TextPaginate'

export default class StatisticScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            nameInput: "",
            testIdInput: "",
            show: "Tabela"
        }
    }

    handleOnChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }

    showChange(value) {
        this.setState({ show: value })
    }

    showData = () => {
        switch (this.state.show) {
            case "Tabela": { return (<ResultTable data={this.state.data} />) }
            case "Wykres": { return (<DataPlots data={this.state.data} />) }
            case "Attempt": { return (<AttemptTable data={this.state.data} />) }
            default: { return (<p>wybierz format</p>) }
        }
    }

    getData = async () => {
        const userName = this.state.nameInput
        const testName = this.state.testIdInput

        let data = await Server.getFullResults({ userName, testName })
        let index = 0
        data.map((item) => {
            item.procent = myRound(item.points / item.max_points,2)
            item.id = index++ // TODO: SWITCH TO ANSWER ID
            item.test_name = TextPaginate(item.test_name,50)

            return 1
        })
        this.setState({
            data: data,
            filterOrder: "asc",
            filterName: "id"
        })
        return data
    }

    searchButton = (e) => {
        e.preventDefault()

        toast.promise(this.getData, {
            pending: {
                render() { return <MyToast title="Wynik" text="Czekaj..." /> }
            },
            success: {
                render({ data }) {
                    return <MyToast title="Wynik" text={`Znaleziono ${data.length} wyników`} />
                },
                delay: 750, // <------ TYMCZASOWE TO TESTÓW
            },
            error: {
                render() {
                    return <MyToast title="Wynik" text="błąd pobierania" />
                },
            },
        })
    }



    render() {
        return (
            <div className="container">
                <div className="content">
                    {/* TITLE */}
                    <div className="row">
                        <div className="col text-center offset-2">
                            <h2>Statystyki</h2>
                        </div>
                    </div>

                    <form>
                        {/*  NAME INPUT */}
                        <div className="from-group row p-1" >
                            <label htmlFor="NameInput" className="col-2 col-form-label text-end">Login:</label>
                            <div className="col-10">
                                <input type="text"
                                    name='nameInput'
                                    onChange={(e) => { this.handleOnChange(e) }}
                                    value={this.state.nameInput}
                                    className="form-control"
                                    placeholder="Podaj login użytkownika..." />
                            </div>
                        </div>

                        {/* TEST ID INPUT */}
                        <div className="from-group row p-1" >
                            <label htmlFor="NameInput" className="col-2 col-form-label text-end">Test:</label>
                            <div className="col-10">
                                <input type="text"
                                    name='testIdInput'
                                    onChange={(e) => { this.handleOnChange(e) }}
                                    value={this.state.testIdInput}
                                    className="form-control"
                                    placeholder="Podaj nazwę testu..." />
                            </div>
                        </div>

                        {/* SEARCH BUTTON */}
                        <div className="from-group row p-1" >
                            <label htmlFor="NameInput" className="col-2"></label>
                            <div className="col-10">
                                <button className='btn btn-primary form-control'
                                    onClick={(e) => { this.searchButton(e) }}>
                                    Szukaj
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* RESULTS */}
                    <div className='row'>
                        <div className='col-2 p-1'>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" onClick={() => { this.showChange("Tabela") }}>Tabela</button>
                                <button className="btn btn-primary" type="button" onClick={() => { this.showChange("Wykres") }}>Wykres</button>
                                <button className="btn btn-primary" type="button" onClick={() => { this.showChange("Attempt") }}>Podejścia</button>
                            </div>
                        </div>
                        <div className="col-10 mt-4" >
                            {this.showData()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
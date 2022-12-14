import React from "react";
import ReactPaginate from "react-paginate";

import {toast} from "react-toastify";


export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            props: this.props,
            offset: 0,
            data: [],
            currentPage: 1,
            pageCount: 0,
        }
    }

    forceRefresh = () => {
        this.setState({
            currentPage: 0,
            offset: 0,
            data: [],
            pageCount: 0,
            errorMessage: "",
        }, () => {
            this.handlePageChange({selected: 0})
        })
    }

    handlePageChange = async (e) => {
        try {
            const selected = e.selected + 1
            const offset = selected * this.state.props.perPage
            const requestParams = {
                page: selected,
                page_size: this.state.props.instance.perPage,
                name: this.props.instance.searchPhrase,
                form: this.props.instance.form
            }
            const [data, headers] = await this.props.instance.apiCall(requestParams)
            this.setState({
                currentPage: selected,
                offset,
                data,
                pageCount: Math.ceil(headers["page-count"]),
                errorMessage: ""
            }, () => {
                this.props.dataTransfer(this.state.data)
            })
        } catch (e) {
            this.setState({
                currentPage: 0,
                offset: 0,
                data: [],
                pageCount: 0,
                errorMessage: e.message,
            })
            //let toastBody = <MyToast title="Błąd" text={e.message}/>
            let icon = <i className='bi-x-circle-fill' style={{fontSize: "1.3rem", color: "#dc3545"}}/>
            //toast(toastBody, {icon: icon})
        }
    }

    componentDidMount() {
        this.handlePageChange({selected: 0})
    }

    render() {
        return (
            <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                breakLabel={" "}
                previousLinkClassName={"bi-caret-left-fill"}
                nextLinkClassName={"bi-caret-right-fill"}
                breakLinkClassName={"bi-three-dots text-primary"}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={this.state.props.instance.marginPages}
                pageRangeDisplayed={this.state.props.instance.pageRange}
                onPageChange={this.handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        );
    }
}
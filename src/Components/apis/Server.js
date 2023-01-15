import axios from "axios"
import config from "../../Resources/Config/config"

var token = JSON.parse(localStorage.getItem("accessToken"))

const headers = {
    access_token: token
}

const timeout = 7000
const timeoutErrorMessage = "Czas na odpowiedź serwera upłynął"
const HTTP = `${config.url}:${config.port}`


const serverError = function (e) {
    //console.trace(e)
    throw e;
}


const serverSuccess = (response) => {
    //reloadToken()
    let accessToken = response.headers.access_token
    if (accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
    }
    reloadToken()
}
const reloadToken = () => {
    headers.access_token = JSON.parse(localStorage.getItem("accessToken"))
}

export default class Server {
    
    static authenticate(data) {
        return axios.post(`${HTTP}/users/authenticate`, data, { timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getAllGroups() {
        return axios.get(`${HTTP}/users/groups/find-all`, { headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getUserPermissionsById(params) {
        return axios.get(`${HTTP}/users/permissions/find`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data[0]
            }).catch((e) => {
                return serverError(e)
            })
    }

    static editPermissions(data) {
        return axios.put(`${HTTP}/users/groups/edit`, data, { headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getUsers(params) {
        return axios.get(`${HTTP}/users/find`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return [response.data, response.headers]
            }).catch((e) => {
                return serverError(e)
            })
    }

    static editUser(data) {
        return axios.put(`${HTTP}/users/edit`, data, { headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static deleteUser(params) {
        return axios.delete(`${HTTP}/users/delete`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getUserGroupsById(params) {
        return axios.get(`${HTTP}/users/groups/find`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getTestById(data, full = true) {
        let params = {
            id: data.id,
            full: full
        }
        return axios.get(`${HTTP}/tests/find`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data[0]
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getTestToEditById(data) {
        let params = {
            id: data.id,
            full: true
        }
        return axios.get(`${HTTP}/tests/findEdit`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data[0]
            }).catch((e) => {
                return serverError(e)
            })
    }

    static sendTest(data) {
        return axios.post(`${HTTP}/tests/add`, data, { headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static getAllTests(params) {
        return axios.get(`${HTTP}/tests/find-all`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return [response.data, response.headers]
            }).catch((e) => {
                return serverError(e)
            })
    }

    static editTest(id, data) {
        return axios.put(`${HTTP}/tests/edit?id=${id}&full=true`, data, { headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    
    static deleteTest(params) {
        return axios.delete(`${HTTP}/tests/delete`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    //
    // -- QUESTIONS --
    //

    static getQuestions(params) {
        return axios.get(`${HTTP}/questions/find`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    
    static sendQuestions(questions) {
        return axios.post(`${HTTP}/questions/add`, questions, { headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    
    static editQuestions(params, question) {
        return axios.put(`${HTTP}/questions/edit`, question, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    
    static deleteQuestions(params) {
        return axios.delete(`${HTTP}/questions/delete`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    
    static sendAnswers(userAnswers) {
        return axios.post(`${HTTP}/answers/add`, userAnswers, { headers, timeout, timeoutErrorMessage })
            .then(response => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    
    static getAnswers(data) {
        return axios.get(`${HTTP}/answers/find`, { params: data, headers, timeout, timeoutErrorMessage })
            .then(response => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    //
    // -- RESULTS --
    //

    static getResults(params) {
        return axios.get(`${HTTP}/results/find`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }


    static getFullResults(params) {
        return axios.get(`${HTTP}/results/find?full=true`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    //
    // -- FILES --
    //

    static uploadFiles(params, body) {
        return axios.post(`${HTTP}/files/upload`, body, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static downloadFile(params) {
        return axios.get(`${HTTP}/files/download`, { params, headers, timeout, timeoutErrorMessage })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }

    static updateFiles(params, body, to_delete) {
        let header = headers
        header.to_delete = to_delete
        return axios.put(`${HTTP}/files/edit`, body, { params, headers: header })
            .then((response) => {
                serverSuccess(response)
                return response.data
            }).catch((e) => {
                return serverError(e)
            })
    }
}
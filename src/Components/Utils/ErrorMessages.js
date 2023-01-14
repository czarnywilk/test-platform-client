import React from "react";


export default class ErrorMessage extends React.Component{
    static e400 = "Nieprawidłowe zapytanie."
    static e401 = "Brak dostępu do zasobu."
    static e403 = "Zasób niedostępny lub nie istnieje."
    static e404 = "Nie znaleziono zasobu."
    static e406 = "Brak dostępu do zasobu."
    static e5XX = "Coś poszło nie tak po stronie serwera."

 
    static response(status){
        switch (status) {
            case 400:
                return this.e400
            case 401:
                return this.e401
            case 403:
                return this.e403
            case 404:
                return this.e404
            case 406:
                return this.e406
            default:
                if (status >= 500 && status < 600) {
                    return this.e5XX
                }
        }
    }
}

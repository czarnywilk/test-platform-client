import { toast } from "react-toastify"
import ErrorMessage from "../Utils/ErrorMessages"
import MyToast from "./MyToast"

export default function ErrorToast(error,bodyOnly=false){
    let toastBody
    if(error.response && error.response.status){
        toastBody = <MyToast title="Błąd" text={ErrorMessage.response(error.response.status)}/>
    }else if(error.message){
        toastBody = <MyToast title="Błąd" text={error.message}/>
    }else{
        toastBody = <MyToast title="Błąd" text="Nieznany błąd"/>
    }
    let icon = <i className='bi-x-circle-fill' style={{fontSize: "1.3rem", color: "#dc3545"}}/>

    if(bodyOnly){
        return toastBody
    }
    toast(toastBody, {icon: icon})
}
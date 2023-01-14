import { Fragment } from "react";
import Input from "../UI/Input";

export default function TestHeaders({onChange,values}) {

    const handleChange = (event,type) => {
        const {value} = event.target
        onChange(type,value)
    }

    const condition = (type) => {
        if(values && type in values){
            return {value: values[type]}
        }
        else return {}
    }

    return (
        <Fragment>

            <Input title="Nazwa:"
                text-position="end"
                onChange={e => handleChange(e,"test_name")}
                id="NameInput"
                placeholder="Podaj nazwę..."
                {...condition("test_name")}
                required/>

        </Fragment>
    )
}
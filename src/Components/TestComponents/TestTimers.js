import { Fragment, useEffect, useState } from "react";
import Checkbox from "../UI/Checkbox";
import Input from "../UI/Input";

const MIN_TIME = "2018-01-01T00:00"
const MAX_TIME = "2100-12-31T23:59"

export default function TestTimers({onChange,values}) {

    const [boxes, setBoxes] = useState({fromTo: false})

    

    const handleFromToBoxChange = () => {
        const newVal = !boxes.fromTo
        setBoxes(prevState => {
            return {
                ...prevState,
                fromTo: newVal
            }
        })

        onChange("fromToBox",newVal)
    }

    const handleChange = (event,type) => {
        const {value} = event.target
        onChange(type,value)
    }

    useEffect(() => {
        const newBoxes = {}
        if(values.timer !== ""){
            newBoxes.timer = true
        }

        if(values.from !== "" || values.to !== ""){
            newBoxes.fromTo = true
        }

        setBoxes(prevState => {
            return {
                ...prevState,
                ...newBoxes
            }})
    }, [values])


    return (
        <Fragment>

            <Checkbox text="Przedział czasowy"
                      icon="bi-calendar-fill"
                      id="isFromToBox"
                      onChange={handleFromToBoxChange}
                      checked={boxes.fromTo}
                      multiple/>

            <div className="row">
                <div className="col">
                    <Input title="Od:"
                        input-size="6"
                        type="datetime-local"
                        id="FromInput"
                        name="from"
                        value={values.from}
                        onChange={e => handleChange(e,"from")}
                        disabled={!boxes.fromTo}
                        min={MIN_TIME}
                        max={MAX_TIME}/>
                </div>
                <div className="col">
                    <Input title="Do:"
                        input-size="6"
                        type="datetime-local"
                        className="form-control"
                        id="ToInput"
                        name="to"
                        value={values.to}
                        onChange={e => handleChange(e,"to")}
                        disabled={!boxes.fromTo}
                        min={MIN_TIME}
                        max={MAX_TIME}/>
                </div>

            </div>
        </Fragment>
    )
}
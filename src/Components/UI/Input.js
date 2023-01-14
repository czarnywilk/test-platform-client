import { useState } from "react"
import { toast } from "react-toastify"

const MAX_LENGTH = 300

export default function Input(props) {

    const [show, setShow] = useState(false)
    const [passwordIcon, setPwdIcon] = useState("-slash")

    const textPosition = (props["text-position"] ? 'text-' + props["text-position"] : "")
    const inputSize = (props["input-size"] ? `col-${props["input-size"]}` : "col")
    const labelSize = (props["label-size"] ? `col-${props["label-size"]}` : "col-2")
    const type = (props["type"] ? props["type"] : "text")
    const valid = (('valid' in props) ? props["valid"] : true)
    const maxLength = (props["maxLength"] ? props["maxLength"] : MAX_LENGTH)

    const icon = (props["icon"] ? <i className={props.icon + " me-2"} /> : null)

    const inputSetting = {
        ...props,
        title: null,
        className: null,
        "text-position": null,
        "input-size": null,
        type: (show ? "text" : type),
        valid: null,
        maxLength: maxLength,
        icon: null
    }

    const checkPaste = (e) => {
        const pastedData = e.clipboardData.getData('Text')
        if (pastedData.length > MAX_LENGTH){
            toast.error("Limit znaków: " + maxLength)
            e.target.value = inputSetting.value
        }
        
    }

    const removeSpaces = (e) => {
        if(/^\s/.test(e.target.value))
            e.target.value = '';
    }

    const showData = (e) => {
        e.preventDefault()
        setShow(prevState => !prevState)
        setPwdIcon(prevState => (prevState === "" ? "-slash" : ""))
    }

    return (
        <div className="row p-1" >
            <label htmlFor={props.id} className={`${labelSize} col-form-label ${textPosition}`}>
                {icon} {props.title} 
                </label>
            <div className={inputSize + (type === "password" ?" input-group": "")}>
                <input name="test_name"
                    {...inputSetting}
                    onPaste={checkPaste}
                    onInput={removeSpaces}
                    className={`form-control ${valid ? "" : "is-invalid"}`}
                    />
                {type==="password" && <button className="btn btn-secondary" disabled={props['disabled']} onClick={showData}><i className={`bi-eye${passwordIcon}-fill`}/></button>}
            </div>
        </div>
    )
}
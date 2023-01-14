
export default function Checkbox(props) {
    const icon = (props["icon"] ? <i className={props.icon + " me-2"} /> : null)
    const type = (props["multiple"] ? "checkbox" : "radio")
    return (
        <div className="form-check mb-1">
            <input className="form-check-input" onChange={props.onChange} type={type} name={props.name} id={props.id} checked={props.checked} value={props.value} />
            <label className="form-check-label" htmlFor={props.id}>
                {icon} {props.text}
            </label>
        </div>
    )
}

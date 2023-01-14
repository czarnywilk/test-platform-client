import { Fragment,useState } from "react";
import Checkbox from "../UI/Checkbox"
import SelectGroups from "../UI/SelectGroups"


export default function TestAccess({onChange, values}) {
    

    const [checked,setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(!checked)
    }

    const groupsHandler = (data) => {
        onChange("groups", data)
    }

    return (
        <Fragment>

            <Checkbox id="DedicatedRadio" 
                      value="Dedicated"
                      text="Grupy"
                      icon="bi-people-fill"
                      checked={checked}
                      onChange={handleCheckboxChange}
                      multiple/>

            {checked && 
                <SelectGroups onChange={groupsHandler} value={values.groups}/>
            }
            


        </Fragment>
    )
}
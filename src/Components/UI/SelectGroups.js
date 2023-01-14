import React, {useEffect, useRef, useState} from "react";
import Server from "../apis/Server";
import ErrorToast from "../Modals/ErrorToast";

export default function SelectGroups({onChange,value}) {

    const [groups, setGroups] = useState([])
    const [selected, setSelected] = useState([])
    const [allSearched, setAllSearched] = useState([])
    const [selectedSearched, setSelectedSearched] = useState([])

    const searchRef = useRef(null)

    useEffect(() => {
        const loadData = async() => {
            const response = await Server.getAllGroups()
            
            if(value){
                setSelected(value)
                setSelectedSearched(value)
            }
            
            setGroups(response)
            setAllSearched(response)
        }
        loadData().catch(error => {
            console.warn(error)
            ErrorToast(error)
        })
    }, [])

   
    const toggleGroup = (e,item) => {
        let allGroups = [...allSearched]
        let selectedGroups = [...selectedSearched]

        
        if (allGroups.includes(item)) {
            allGroups.splice(allGroups.indexOf(item), 1)
            selectedGroups.push(item)
            selectedGroups.sort(item=>item.group_name)
        } else {
            selectedGroups.splice(selectedGroups.indexOf(item), 1)
            allGroups.push(item)
            allGroups.sort(item=>item.group_name)
        }

        setAllSearched(allGroups)
        setSelectedSearched(selectedGroups)
        setGroups(allGroups)
        setSelected(selectedGroups)
        onChange(selectedGroups.map(s=>s.id))
    }

 
    const searchGroup = () => {
        let phrase = searchRef.current.value
        setAllSearched(groups.filter((item) => {
            return item.group_name.toLowerCase().includes(phrase.toLowerCase())
        }))
        setSelectedSearched(selected.filter((item) => {
            return item.group_name.toLowerCase().includes(phrase.toLowerCase())
        }))
    }


    function List({data}) {
        return (
            <div className="col p-2">
                <ul className="border border-1" style={{height: "240px", overflowY: "scroll", display: "block"}}>
                    {
                        data.length !== 0 &&
                        data.map((item, i) => {
                            return (
                                <li key={i} className="testEditList" style={{cursor: "pointer", listStyleType: "none"}} onClick={(e) =>toggleGroup(e,item)}>{item.group_name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    return (
        <div className={"container border border-1 mt-2 mb-2"}>

        <div className="col">
            <div className={"row justify-content-center p-2 mt-3"}>
                <input className={"col"}
                       type={"text"}
                       style={{borderColor: "#dddddd"}}
                       placeholder={"Wyszukaj grupę..."}
                       onChange={searchGroup}
                       ref={searchRef}
                />
            </div>

            <div className={"row justify-content-center"}>
                <div className={"col mt-2"}>
                    <p>Wszystkie</p>
                </div>
                <div className={"col mt-2"}>
                    <p>Wybrane</p>
                </div>
            </div>

            <div className={"row m"}>
                {(groups.length !== 0 || selected.length !== 0) && <List data={allSearched}/>}
                {(groups.length !== 0 || selected.length !== 0) && <List data={selectedSearched.length !== 0 ? selectedSearched : selected}/>}
            </div>
            </div>

        </div>
    )
}
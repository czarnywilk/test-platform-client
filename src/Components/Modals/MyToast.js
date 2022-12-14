import React from "react";
export default function MyToast({title="Toast",text,showTime=true}) {

    function getTime() {
        let date = new Date()

        let h = date.getHours()
        let m = date.getMinutes()
        m = (m < 10) ? "0" + m : m
        let s = date.getSeconds()
        s = (s < 10) ? "0" + s : s

        let time = [h, m, s].join(":")
        return (time)
    }

    return (
        <div>
            <div className="header row">
                <div className="col">
                    <strong className="mr-auto">{title}</strong>
                </div>
                <div className="col text-end">
                    {(showTime !== false) ?
                        <small className="text">{getTime()}</small> :
                        null
                    }
                </div>
            </div>
            <div className="body">
                {text}
            </div>
        </div>
    )
}
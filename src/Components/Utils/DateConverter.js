export default class DateConverter{

    static DateToTimestamp(date) {
        if (date === ""){
            return ""
        }
        try{
            return new Date(date).getTime()
        }
        catch (e) {
            console.log(e)
        }

    }


    static TimestampToDateTZ(date){
        if (date === ""){
            return ""
        }
        try{
            let offSet = (new Date()).getTimezoneOffset() * 60000
            let x = new Date(parseInt(date - offSet)).toISOString()
            x = (x.split(":"))

            return x[0] + ":" + x[1]
        }
        catch (e){
            console.log(e)
        }

    }


    static TimestampToDate(date){
        if (date === ""){
            return ""
        }
        try{
            return new Date(parseInt(date)).toLocaleString()
        }
        catch (e){
            console.log(e)
        }

    }
}
import convertForm from "../TestComponents/convertForm";
import Server from "./Server";

export default async function SendTestToServer(header, questions) {
    try {

        questions = convertForm(questions)
        header.questions=questions

        return Server.sendTest(header)


    } catch (error) {
        console.log(error)
        throw error
    }
}



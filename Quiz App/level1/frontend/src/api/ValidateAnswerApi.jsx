import axios from "axios";

async function validateAnswerApi(
    questionId,
  answer,
  handleResponse,
  handleError,
  setLoading
) {
    setLoading(true)
    try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL
        const endpoint = "/v1/questions/validate-answers"

        const url = `${baseUrl}${endpoint}`

        const reqestBody = {
            id:questionId,
            answer
        }

        const response = await axios.post(url, reqestBody,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        handleResponse(response.data)
    } catch (error) {
        handleError(error.response?.data?.message || "unkown Error occured")
    }
    finally{
        setLoading(false)
    }
}

export default validateAnswerApi
import axios from "axios";

async function fetchTaskApi(setLoading, handleError, handleResponse, taskId) {
    setLoading(true); 

    try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const endpoint = `/task/${taskId}`; 
        const url = `${baseUrl}${endpoint}`;

        const response = await axios.delete(url);
        handleResponse(response.data);
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An unknown error occurred";
        handleError(new Error(errorMessage));
    } finally {
        setLoading(false); 
    }
}

export default fetchTaskApi;

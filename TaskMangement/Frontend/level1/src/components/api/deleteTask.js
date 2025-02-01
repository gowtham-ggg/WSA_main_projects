import axios from "axios";

async function deleteTaskApi(setLoading, handleError, handleResponse, taskId) {
    setLoading(true);

    try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const url = `${baseUrl}/task/${taskId}`;

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

export default deleteTaskApi;

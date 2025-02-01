import axios from "axios";

async function updateTaskApi(setLoading, handleError, handleResponse, taskId, updatedTaskData) {
    setLoading(true);

    try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const url = `${baseUrl}/task/${taskId}`;

        const response = await axios.put(url, updatedTaskData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response?.data) {
            handleResponse(response.data);
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
        handleError(new Error(errorMessage));
    } finally {
        setLoading(false);
    }
}

export default updateTaskApi;

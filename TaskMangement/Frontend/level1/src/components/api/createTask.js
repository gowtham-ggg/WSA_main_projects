import axios from "axios";

async function createTaskApi(values, handleResponse, handleError, setLoading) {
    setLoading(true); 

    try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const endpoint = "/task";
        const url = `${baseUrl}${endpoint}`;

        const requestBody = {
            title: values.taskTitle,
            description: values.taskDescription,
            due_date: values.taskDueDate?.toISOString(), 
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        handleResponse(response.data);
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An unknown error occurred";
        handleError(new Error(errorMessage));
    } finally {
        setLoading(false); 
    }
}

export default createTaskApi;

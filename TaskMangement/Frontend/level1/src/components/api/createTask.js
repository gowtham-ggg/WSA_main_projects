import axios from 'axios';

async function createTaskApi(values, handleResponse, handleError, setLoading) {
  setLoading(true);  // Set loading state

  try {
    const baseUrl = process.env.REACT_APP_API_URL;
    const endpoint = '/task';
    const url = `${baseUrl}${endpoint}`;

    const requestBody = {
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate ? new Date(values.taskDueDate).toISOString() : null, // Ensure date format is ISO string
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    handleResponse(response.data);  // Call the response handler
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unknown error occurred';
    handleError(errorMessage);  // Call error handler
  } finally {
    setLoading(false);  // Set loading state to false after API call
  }
}

export default createTaskApi;

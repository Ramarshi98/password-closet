import axios from 'axios';
import { BACKEND_URL } from '../Env';
// default
axios.defaults.baseURL = BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.response.use(
    (response) => response.data ? response.data : response,
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;
        switch (error.response?.status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 400:
                message = "Invalid credentials";
                break;
            case 401:
                message = "Invalid credentials";
                break;
            case 404:
                message = "Sorry! the data you are looking for could not be found";
                break;
            default:
                message = error.message || error
        }
        const data = error.response?.data;
        if (data?.non_field_errors) {
            message = data.non_field_errors.join("; ");
        }
        return Promise.reject({
            message,
            data,
        });
    }
);
export const setAuthorization = (token, save = true) => {
    // set or unset authoeization header
    if (token) {
        if (save) {
            localStorage.setItem('accessToken', token)
        }
        axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
// const accessToken = localStorage.getItem('accessToken')
// if (accessToken) {
//     setAuthorization(accessToken, false)
// }
export default axios;
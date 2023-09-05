import axios from "axios";
const baseURL_AWS = `http://myapiserver-env.eba-yp3ppedq.ap-south-1.elasticbeanstalk.com/`;
const baseURL_LOCAL = `http://localhost:8080`;
const baseURL_DOCKER = `https://localhost`;
export default axios.create({
    baseURL: baseURL_AWS,
    headers: {
        "ngrok-skip-browser-warning": "true",

    }
})

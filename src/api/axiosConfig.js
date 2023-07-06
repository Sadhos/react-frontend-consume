import axios from "axios";
const baseURL_AWS = `http://finalshop-api-env.eba-cnpqwnyj.ap-south-1.elasticbeanstalk.com`;
const baseURL_LOCAL = `http://localhost:8080`;
export default axios.create({
    baseURL: baseURL_AWS,
    headers: {
        "ngrok-skip-browser-warning": "true",

    }
})
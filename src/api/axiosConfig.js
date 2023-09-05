import axios from "axios";
const baseURL_AWS = `http://newserver-env.eba-jqigum7k.ap-south-1.elasticbeanstalk.com/api/Product`;
const baseURL_LOCAL = `http://localhost:8080`;
export default axios.create({
    baseURL: baseURL_AWS,
    headers: {
        "ngrok-skip-browser-warning": "true",

    }
})

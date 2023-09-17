import axios from "axios";
const baseURL_railway = `https://shoppingapp1-production.up.railway.app/`;
export default axios.create({
    baseURL: baseURL_railway,
    headers: {
        "ngrok-skip-browser-warning": "true",

    }
})

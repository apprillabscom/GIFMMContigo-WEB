import axios from "axios";

export default axios.create({
  baseURL: "https://dev-mapeo.us.tempcloudsite.com/sites/default/files/appgifmm",
  headers: {
    "Content-type": "application/json"
  },
  mode: 'no-cors'
});
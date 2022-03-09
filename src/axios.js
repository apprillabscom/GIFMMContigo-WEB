import axios from "axios";

export default axios.create({
  baseURL: "https://mapeo-de-servicios.gifmm-colombia.site/sites/default/files/appgifmm/",
  headers: {
    "Content-type": "application/json"
  },
  mode: 'no-cors'
});
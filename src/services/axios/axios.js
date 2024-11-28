import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

Api.interceptors.response.use(
    (response) => {
      return response;
    }
  );

export default Api
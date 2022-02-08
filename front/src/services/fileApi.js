import axios from "axios";

const Api = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 1000,
    headers: { 'accept': 'application/json' }
  });

  return {
    listFiles: () => instance.get('/files/data'),
    getFile: (file) => instance.get(`/secret/file/${file}`),
  }
}

export default Api();

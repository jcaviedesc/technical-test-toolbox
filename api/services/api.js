import axios from "axios";

const Api = () => {
  const instance = axios.create({
    baseURL: 'https://echo-serv.tbxnet.com/v1',
    timeout: 1000,
    headers: { 'authorization': 'Bearer aSuperSecretKey' }
  });

  const getDetailFromMultiplesFiles = files => {
    const requests = files.map(file => {
      return instance.get(`/secret/file/${file}`).then(data => data.data)
        .catch(() => null)
    })
    const filesFromApi = Promise.all(requests)
      .then(values => values.filter(val => val != null))
      .catch(err => console.log(err))
    return filesFromApi;
  }

  return {
    listFiles: () => instance.get('/secret/files'),
    getFile: (file) => instance.get(`/secret/file/${file}`),
    getDetailFromMultiplesFiles: files => getDetailFromMultiplesFiles(files)
  }
}

export default Api;

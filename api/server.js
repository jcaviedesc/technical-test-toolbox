import express from 'express';
import Api from './services/api.js';

const PORT = process.env.PORT || 8080;
const app = express();
const api = Api();

app.get('/files/data', async (req, res) => {
  const { data: { files } } = await api.listFiles();
  const allFiles = await api.getDetailFromMultiplesFiles(files);

  res.contentType('application/json');
  res.status(200);
  res.json(allFiles);
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
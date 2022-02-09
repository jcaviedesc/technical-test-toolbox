import express, { response } from 'express';
import cors from 'cors';
import Api from './services/api.js';
import { csvToJson } from './lib/csvToJson.js'

const PORT = process.env.PORT || 8081;
const app = express();
const api = Api();

app.use(cors());

app.get('/files/data', async (req, res) => {
  const { fileName } = req.query;
  let parseFiles = [];
  let status = 200;

  const tranformResultJson = jsonLines => {
    const finalJsonStruct = {
      file: jsonLines[0].file,
    }
    const lines = jsonLines.map(line => {
      delete line.file;
      return line
    })

    return { ...finalJsonStruct, lines }
  }
  try {
    if (fileName !== undefined) {
      const response = await api.getFile(fileName).catch(err => err.response);
      if (response.status === 200) {
        parseFiles = await csvToJson(response.data, tranformResultJson);
      } else {
        status = response.status
      }
    } else {
      const { data: { files } } = await api.listFiles();
      const allFiles = await api.getDetailFromMultiplesFiles(files)
        .then(response =>
          response.map(file => csvToJson(file, tranformResultJson))
        );

      parseFiles = await Promise.all(allFiles)
        .then(parseToJson => parseToJson.filter(parseJson => parseJson != null));
    }

    res.contentType('application/json');
    res.status(status);
    res.json(parseFiles);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.json({ message: error });
  }
});

app.get('/files/list', async (req, res) => {
  res.contentType('application/json');

  try {
    const { data } = await api.listFiles();

    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// curl -v GET "http://localhost:8081/files/data" -H "accept: application/json"
export default app; // for testing

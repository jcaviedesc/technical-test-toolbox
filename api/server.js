import express from 'express';
import Api from './services/api.js';
import { csvToJson } from './lib/csvToJson.js'

const PORT = process.env.PORT || 8081;
const app = express();
const api = Api();

app.get('/files/data', async (req, res) => {
  res.contentType('application/json');

  try {
    const { data: { files } } = await api.listFiles();
    const allFiles = await api.getDetailFromMultiplesFiles(files);

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

    const parseFiles = await Promise.all(allFiles.map(file => csvToJson(file, tranformResultJson)))
      .then(parseToJson => parseToJson.filter(parseJson => parseJson != null));

    res.status(200);
    res.json(parseFiles);
  } catch (error) {
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

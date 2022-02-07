import csvToJson from 'convert-csv-to-json';

export const parseFiles = files => {
  console.log("parseFiles");
  const parseFiles = files.map(file => {
    const parseCsvFile = csvToJson.generateJsonFileFromCsv(file,`${file}.json`);
    console.log(parseCsvFile)
    return parseCsvFile
  });
}
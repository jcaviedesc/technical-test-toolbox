/**
 * convert from string csv to json
 * @param {string} stringCsv 
 */
export const csvToJson = (stringCsv, transform) => {
  return new Promise((resolve, reject) => {
    const fileLines = stringCsv.split('\n')
    const columnNames = fileLines.length > 0 ? fileLines[0].split(',') : null;

    if (columnNames === null) {
      reject("stringCsv malformed")
    }

    const createFileObj = (columns, values) => {
      if (columns.length != values.length) {
        return null;
      }
      return columns.reduce((prevVal, currVal, index) => {
        return { ...prevVal, [currVal]: values[index] }
      }, {})
    }

    const parseToJson = fileLines.slice(1)
      .map(sp => createFileObj(columnNames, sp.split(',')))
      .filter(jsonObj => jsonObj != null)

    if (parseToJson.length > 0 && transform) {
      const transformJson = transform(parseToJson);
      resolve(transformJson)
    } else {
      resolve(parseToJson.length > 0 ? parseToJson : null)
    }
  })
}
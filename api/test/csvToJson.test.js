import chai from 'chai';
import { csvToJson } from '../lib/csvToJson.js'

const assert = chai.assert;

describe("lib/csvToJson", () => {
  it('check formated csv string to json.', async function () {
    const response = await csvToJson('file,text,number,hex\ntest3.csv,JxyYj,323,12\n');
    const correctFormat = {
      file: 'test3.csv',
      text: 'JxyYj',
      number: '323',
      hex: '12'
    };
    assert.deepEqual(response[0], correctFormat);
  })

  it('check discard empty file.', async function () {
    const response = await csvToJson('file,text,number,hex\n');
    assert.isNull(response);
  })

  it('check discard malformed line.', async function () {
    const response = await csvToJson('file,text,number,hex\ntest3.csv,JxyYj,323,545\ntest3.csv,gsdxYF');
    assert.isArray(response);
    assert.equal(response.length, 1)
  })
})

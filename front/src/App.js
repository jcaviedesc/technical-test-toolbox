
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux';
import {
  loadingFiles,
  loadFiles,
  loadFilesFailed,
  cleanErrorMessage,
  selectFiles,
} from './store/filesSlice'
import Api from './services/fileApi'
import { Input } from './components';

function App() {
  const { files, loading, errorMessage } = useSelector(selectFiles)
  const dispatch = useDispatch()

  useEffect(() => {
    Api.listFiles()
      .then(data => {
        dispatch(loadFiles(data.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [dispatch]);

  const onFinishSearch = (inputVal) => {
    dispatch(loadingFiles())
    Api.getFile(inputVal)
      .then(response => {
        dispatch(loadFiles([response.data]))
      })
      .catch(err => {
        dispatch(loadFilesFailed("file not found"))
      })
  }

  const cleanError = () => {
    dispatch(cleanErrorMessage())
  }

  return (
    <div className="App">
      <header className="Header">
        <div className="Header__container">
          <h1 className="title">React Test App</h1>
          <div className='input-container'>
            <Input onFinishChange={onFinishSearch} size="sm" placeholder="Searh by File Name" />
          </div>
        </div>
      </header>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          {errorMessage !== ""
            ? (<tbody>
              <tr>
                <td>
                  <span>{errorMessage}</span>
                  <Button  variant="link" onClick={cleanError}>back</Button>
                </td>
              </tr>
            </tbody>)
            : (
              <tbody>
                {loading && <tr><td>...loading</td></tr>}
                {!loading && Array.isArray(files) && files.map(file => {
                  const RowFile = file?.lines.map(({ text, number, hex }) => (
                    <tr key={`${file.file}-${hex}`}>
                      <td>{file.file}</td>
                      <td>{text}</td>
                      <td>{number}</td>
                      <td>{hex}</td>
                    </tr>
                  ))
                  return RowFile;
                })}
              </tbody>
            )}
        </Table>
      </Container>
    </div>
  );
}

export default App;

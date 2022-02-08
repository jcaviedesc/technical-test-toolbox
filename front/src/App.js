
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';
import {
  loadFiles,
  selectFiles,
} from './store/filesSlice'
import Api from './services/fileApi'

function App() {
  const files = useSelector(selectFiles)
  console.log(files);
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

  return (
    <div className="App">
      <header className='Header'>
        <div className='Header__container'>
          <h1 className='title'>React Test App</h1>
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
          <tbody>
            {files && files.map(file => {
              const RowFile = file?.lines.map(({ text, number, hex }) => (
                <tr key={`${file.file}-${number}`}>
                  <td>{file.file}</td>
                  <td>{text}</td>
                  <td>{number}</td>
                  <td>{hex}</td>
                </tr>
              ))
              return RowFile;
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;

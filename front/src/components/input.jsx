import { useRef } from 'react'
import Form from 'react-bootstrap/Form'

const Input = ({ onInitChange, onFinishChange, ...props }) => {
  const delay = useRef(null)
  const onChange = (event) => {
    console.log("hola",event.target.value)
    if (delay.current) {
      console.log("delete delay")
      clearTimeout(delay.current);
      setTimeout(() => {
        delay.current = null;
        onFinishChange(event.target.value)
      }, 800)
    } else {
      console.log("set delay")
      delay.current = setTimeout(() => {
        onFinishChange(event.target.value)
      }, 800)
    }
  }

  return (
    <Form.Control
      {...props}
      onChange={onChange}
    />);
}

export default Input;

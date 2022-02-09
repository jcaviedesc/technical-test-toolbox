import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'

const Input = ({ onInitChange, onFinishChange, ...props }) => {
  const delay = useRef(null)
  const onChange = (event) => {
    if (delay.current) {
      clearTimeout(delay.current);
      setTimeout(() => {
        delay.current = null;
        onFinishChange(event.target.value)
      }, 800)
    } else {
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

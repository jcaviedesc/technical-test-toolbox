import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../input';

describe('Components/Input', () => {
  it('should be call onFinishChange after 800ms', async () => {
    const onchange = jest.fn();
    render(<Input onFinishChange={onchange} placeholder="searchinput"/>)

    const placeHolderInput = screen.getByRole("textbox");

    fireEvent.change(placeHolderInput, {
      target: {
        value: 'test',
      },
    });
    await new Promise(res => setTimeout(res,1000))
    expect(onchange).toBeCalled();
  })

  it('test delay', async () => {
    const onchange = jest.fn();
    render(<Input onFinishChange={onchange} placeholder="searchinput"/>)

    const placeHolderInput = screen.getByRole("textbox");

    fireEvent.change(placeHolderInput, {
      target: {
        value: 'test',
      },
    });
    
    await new Promise(res => setTimeout(res,500))

    fireEvent.change(placeHolderInput, {
      target: {
        value: 'test2.csv',
      },
    });

    await new Promise(res => setTimeout(res,900))

    expect(onchange).toBeCalledTimes(1);
  })
})
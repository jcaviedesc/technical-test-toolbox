import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

describe('App component test', () => {
  it('renders React Test App title', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByText(/React Test App/i)).toBeTruthy();
  });
  
  it('render table', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByText(/React Test App/i)).toBeTruthy();
  });
})

import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import App from './App';

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
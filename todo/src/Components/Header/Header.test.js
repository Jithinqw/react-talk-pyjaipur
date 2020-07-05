import React from 'react'
import Header from './Header';
import { Navbar } from 'react-bootstrap';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Unit Test for the Header', ()=> {

    it('Check if Header is rendering', ()=>{
       const HeaderMount = mount(<Header />);
       expect(HeaderMount.find(<Navbar.Brand href="/dashboard">The Todo App</Navbar.Brand>).contains('The Todo App'));
    })
})
import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { login, startLogout } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import { startNewNote } from '../../actions/notes';
import { SideBar } from '../../components/journal/SideBar';


jest.mock('../../actions/auth', ()=>({
    startLogout: jest.fn()
}));

jest.mock('../../actions/notes', ()=>({
    startNewNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Jeisosn'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = {store}>
            <SideBar/>
    </Provider>
    );

describe('Pruebas en <SideBar/>', () => {
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe llamar el startLogout', () => {
        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });
    
    test('Debe llamar el startNewNote', () => {
        wrapper.find('.journal__newEntry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    })
    
})

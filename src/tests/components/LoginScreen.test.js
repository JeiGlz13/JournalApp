import React from 'react';
import { LoginScreen } from '../../components/auth/LoginScreen';
import {mount} from 'enzyme'
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

jest.mock('../../actions/auth', ()=>({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

const email = 'jeiglz@gmail.com';
const password = '123456';

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen/>', () => {
     
    const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>);

    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Debe hacer match con el snapshot', () => {
       expect(wrapper).toMatchSnapshot(); 
    });
    
    test('Debe disparar la accion de startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('should Debe disparar el startLogin', () => {
        wrapper.find('form').prop('onSubmit')(
            {preventDefault(){}}
        );
        expect(startLoginEmailPassword).toHaveBeenCalledWith(email, password );
    })
    
    
});

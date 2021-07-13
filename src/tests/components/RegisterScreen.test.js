import React from 'react';
import { RegisterScreen } from '../../components/auth/RegisterScreen';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { types } from '../../types/types';

/* jest.mock('../../actions/auth', ()=>({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
})); */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);


describe('Pruebas en <RegisterScreen/>', () => {

    const wrapper = mount(<Provider store = {store}>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>)

    

   test('Debe mostrarse correctamente', () => {
       expect(wrapper).toMatchSnapshot();
   });
    
   test('Debe hacer el dispatch de la accion', () => {
       const emailField =wrapper.find('input[name="email"]');
       emailField.simulate('change', {
           target: {
               value: '',
               name: 'email'
           }
       });

       wrapper.find('form').simulate('submit', {
           preventDefault(){}
       });

       const actions = store.getActions();
      expect(actions[0]).toEqual({
           type: types.uiSetError,
           payload: 'Email is not valid'
       })
   });
   
   test('Debe mostrar la caja de alerta', () => {
    const initState = {
        auth: {},
        ui: {
            loading: false,
            msgError: 'Email no es correcto'
        }
    };
    
    const store = mockStore(initState);

    const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>)

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
   })
   
});

import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import {firebase} from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', ()=>({
    fire: jest.fn()
}));

jest.mock('../../actions/auth', ()=>({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        active: {
            id: 'abc'
        },
        notes: []
    }
};

const email = 'jeiglz@gmail.com';
const password = '123456';

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el <AppRouter/>', () => {


    test('Debe hacer login si esta autenticado', async() => {
        let user;
        await act( async () => {

            const userCredential = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCredential.user;


            const wrapper = mount(
                <Provider store = {store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
                );
        });


        expect(login).toHaveBeenCalledWith('EODLwfuBauQ23d84XX0gUFxhqvP2', null);
    })
    
})

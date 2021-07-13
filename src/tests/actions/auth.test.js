import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las accione de auth', () => {
    beforeEach(()=>{
        store = mockStore(initState);
    });

   test('Login y Logout deben crear la accion respectiva', () => {
        const uid = 'abc123';
        const displayName = 'Jeisson';  

        const loginAction = login(uid, displayName)
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
   });

   test('Debe reaizar el logout', async() => {
       await store.dispatch(startLogout());
       const actions = store.getActions();

       expect(actions[0]).toEqual({
           type: types.logout
       });
       expect(actions[1]).toEqual({
        type: types.notesLogoutCleaning
    });
   });
   
   test('Debe iniciar el startLoginEmailPassword', async() => {
       await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
       const actions = store.getActions();
       expect(actions[1]).toEqual({
           type: types.login,
           payload: {
               uid: expect.any(String),
               displayName: null
           }
       })
   })
   
});

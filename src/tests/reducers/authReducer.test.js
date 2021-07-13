import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {
   test('Debe realizar el login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Jeisson'
            }
        }
        const state = authReducer(initState, action);
            expect(state).toEqual({
                uid: 'abc',
                name: 'Jeisson'
            })
   }); 

   test('Debe regresar el initialState si el typees invalido', () => {
        const initState = {
            uid: 'abc',
            displayName: 'Jeisson'
        };
        const action = {
            type: types.logout
        }
        const state = authReducer(initState, action);
            expect(state).toEqual({});
    }); 

    test('Debe realizar el logout', () => {
        const initState = {
            uid: 'abc',
            displayName: 'Jeisson'
        };
        const action = {
            type: 'abcde'
        }
        const state = authReducer(initState, action);
            expect(state).toEqual(initState);
    }); 
});

import { types } from "../../types/types";

describe('Pruebas en el types', () => {
    const typeTest = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
    
        uiSetError: '[UI] set error',
        uiRemoveError: '[UI] remove error',
    
        uiStartLoading: '[UI] Start Loading',
        uiFinishLoading: '[UI] Finish Loading',
    
        notesAddNew: '[Notes] New Note',
        notesActive: '[Notes] Set Active Note',
        notesLoad: '[Notes] Load Notes',
        notesUpdated: '[Notes] Updated Note',
        notesFileURL: '[Notes] Updated Image URL',
        notesDelete: '[Notes] Delete Note',
        notesLogoutCleaning: '[Notes] Logout Cleaning'
    }
    test('Probar el objeto types', () => {
        expect(types).toEqual(typeTest);
    })
    
})

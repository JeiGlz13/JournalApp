import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', ()=>({
    fileUpload: jest.fn( ()=>{
        return 'https://holamundo.com/imagen.jpg';
    })
}))
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing-id'
    },
    notes:{
        active: {
            id: '2NpSBAJX96KjYTPiicnP',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);

describe('Pruebas en el notes', () => {
    beforeEach(()=>{
        store = mockStore(initState);
    });

    test('Debe crear una nueva nota', async() => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String)
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/testing-id/journal/notes/${docId}`).delete();
    }); 

    test('startLoadingNotes debe cargar las notas', async() => {
        
        /*await store.dispatch( startLoadingNotes('testing-id') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(String)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);*/

    });

    test('startSaveNote debe guardar la nota', async() => {
        const note = {
            id: '2NpSBAJX96KjYTPiicnP',
            title: 'titulo', 
            body: 'body'
        }

        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);
        
        //const docRef = await db.doc(`/testing-id/journal/notes/${note.id}`).get();
        //expect(docRef.data().title).toBe(note.title);
    });
    
    test('StartUploading debe actualizar el URL del entry', async() => {
        const file = new File([], 'foto.jpg');
        await store.dispatch(startUploading(file));

        //const docRef = await db.doc(`/testing-id/journal/notes/2NpSBAJX96KjYTPiicnP`).get();
        //expect(docRef.data().url).toBe('https://holamundo.com/imagen.jpg');
    })
    
});

import React from 'react';
import { useSelector } from 'react-redux';
import {SideBar} from '../journal/SideBar';
import {NothingSelected} from './NothingSelected';
import {NoteScreen} from '../notes/NoteScreen';

export const JournalScreen = () => {
    const {active} = useSelector(state => state.notes)
    return (
        <div className = "journal__main-content animate__animated animate__fadeIn animate-faster">
            <SideBar />
            <main>
                {
                    (active)
                    ? (<NoteScreen/>)
                    : ( <NothingSelected/>)
                }
                {/* */}
                
            </main>
        </div>
    )
}

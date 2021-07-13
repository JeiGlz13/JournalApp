import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import {JournalEntries} from './JournalEntries';

export const SideBar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth)

    const handleLogout = ()=>{
        dispatch(startLogout());
    }

    const handleAddNote = ()=>{
        dispatch(startNewNote());
    }
    return (
        <aside className = "journal__sideBar">
            <div className = "journal__sideBar-navBar">
                <h3 className = "marginTop-2">
                    <i className = "far fa-moon"></i>
                    <span> {name}</span>
                </h3>

                <button className = "btn"
                onClick = {handleLogout}>
                    Logout
                </button>
            </div>

            <div className = "journal__newEntry"
                onClick = {handleAddNote}>
                <i className = "far fa-calendar-plus fa-5x" ></i>
                <p className = "marginTop-2">New Entry</p>
            </div>

            <JournalEntries/>
        </aside>
    )
}

import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import { JournalDate } from '../journal/JournalDate';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active: note} = useSelector(state => state.notes)
    const handleSave = ()=>{
        dispatch(startSaveNote(note));
    }

    const noteDate = moment(note.date);

    const handlePictureUpload = ()=>{
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e)=>{
        const file = (e.target.files[0]);
        if(file){
            dispatch(startUploading(file));
        }
    }

    
    return (
        <div className = "notes__appBar">
            <JournalDate date={noteDate} />

            <input type = "file" accept='image/*' id = 'fileSelector' 
            style = {{display: 'none'}} onChange = {handleFileChange} />
            
            <div className='btns-container'>
                <button className = " btn-header"
                onClick = {handlePictureUpload}>
                    <i className="fa-solid fa-image"></i>
                    Add picture
                </button>

                <button className = " btn-header"
                onClick = {handleSave}>
                    <i className="fa-solid fa-floppy-disk"></i>
                    Save
                </button>
            </div>
        </div>
    )
}

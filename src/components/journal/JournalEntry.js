import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = ()=>{
        dispatch(activeNote(id, {
            date, title, body, url
        }));
    }
    return (
        <div className = "journal__entry pointer animate__animated animate__fadeIn animate-faster" 
            onClick = {handleEntryClick}>
            {
                url &&
                <div className="journal__entryPicture"
                    style = {{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}>
                </div>
            }

            <div className = "journal__entryBody">
                <p className = "journal__entryTitle">
                    {title}
                </p>
                <p className = "journal__entryContent">
                    {body}
                </p>
            </div>

            <div className = "journal__entryDateBox">
                <span>{noteDate.format('ddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}

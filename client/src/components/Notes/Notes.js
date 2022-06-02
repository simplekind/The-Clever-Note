import React from 'react';
import './Notes.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArchive} from '@fortawesome/free-solid-svg-icons';
function Notes(){
    return(
        <div className="Notes">
            <div className="note-header">
                <div className="note-header-date">
                    Last Edited on Dec 30, 2022
                </div>
                <div className="note-header-action-btn">
                    <div className="action-btn">
                        <FontAwesomeIcon icon={faArchive}/>
                    </div>
                </div>
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input placeholder="Title" />
                </div>
                <div className="note-body-content">
                    <textarea padding placeholder="Write your words!"/>
                </div>
            </div>
        </div>
    );
}

export default Notes;
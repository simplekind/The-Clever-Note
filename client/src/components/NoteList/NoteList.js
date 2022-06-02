import React from 'react';
import './NoteList.scss';

const NoteList = ()=>{
    return(
        <div className="Note-List">
            <div className="header">
                <div className="title">
                    <h3>All Notes</h3>
                </div>
                <div className="number">
                    2 notes
                </div>
            </div>
            <div className="body">
                <div className="note-card">
                    <div className="note-card-head">
                        <div className="note-card-title">
                            Note 1 :
                        </div>
                        <div className="note-card-desc">
                            Bring the Cake!
                        </div>
                    </div>
                    <div className="note-card-date">
                        30 Dec 2021
                    </div>
                </div>
                <div className="note-card">
                    <div className="note-card-head">
                        <div className="note-card-title">
                            Note 2 :
                        </div>
                        <div className="note-card-desc">
                            Hey Chek this out ! Check this out!
                        </div>
                    </div>
                    <div className="note-card-date">
                        31 Oct 2021
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteList;
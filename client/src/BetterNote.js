import React from 'react';
import './BetterNote.scss';
import Sidenavbar from  './components/Sidenavbar/Sidenavbar';
import NoteList from './components/NoteList/NoteList';
import Notes from './components/Notes/Notes';

function BetterNote() {
  return (
    <div className="BetterNote">
      <Sidenavbar></Sidenavbar>
      <NoteList></NoteList>
      <Notes></Notes>
    </div>
  );
}

export default BetterNote;

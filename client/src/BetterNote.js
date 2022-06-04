import React from 'react';
import './BetterNote.scss';
import Sidenavbar from  './components/Sidenavbar/Sidenavbar';
import NoteList from './components/NoteList/NoteList';
import Notes from './components/Notes/Notes';

import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

function BetterNote() {
  return (
    <Router>
        <div className="BetterNote">
        <Sidenavbar/>
          <Routes>
            <Route path="/all-notes" element={<NoteList title="All Notes"/>} >
                <Route path="/all-notes:id" element={<Notes/>}/>
            </Route>
            <Route path="/trash" element={<NoteList title="Trash"/>} >
              <Route path="/trash/:id" element={<Notes/>}/>
          </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default BetterNote;

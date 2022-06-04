import {React,useReducer} from 'react';
import './BetterNote.scss';
import Sidenavbar from  './components/Sidenavbar/Sidenavbar';
import NoteList from './components/NoteList/NoteList';
import Notes from './components/Notes/Notes';
import {NotesContext} from './context/context';
import NoteReducer from './reducer/NoteReducer';

import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

const initialState = [];

function BetterNote() {
  const [notes,notesDispatch] = useReducer(NoteReducer,initialState);
  return (
    <Router>
      <NotesContext.Provider value = {{notesState:notes,notesDispatch}}>
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
        </NotesContext.Provider>
      </Router>
  );
}

export default BetterNote;

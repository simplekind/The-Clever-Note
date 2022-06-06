import {React,useReducer} from 'react';
import './BetterNote.scss';
import Sidenavbar from  './components/Sidenavbar/Sidenavbar';
import NoteList from './components/NoteList/NoteList';
import Notes from './components/Notes/Notes';
import {NotesContext} from './context/context';
import NoteReducer from './reducer/NoteReducer';

import {postRequest} from './utils/apiRequests'
import {BASE_URL,CREATE_NOTE} from './utils/apiEndpoints'

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
            <Route exact path="/all-notes" element={<NoteList title="All Notes"/>} >
            </Route>
            <Route exact path="/all-notes/:id" element={<> <NoteList title="All Notes"/> <Notes/> </>}/>
            <Route exact path="/trash" element={<NoteList title="Trash"/>} >
            </Route>
            <Route exact path="/trash/:id" element={<> <NoteList title="Trash"/> <Notes/> </>}/>
          </Routes>
        </div>
        </NotesContext.Provider>
      </Router>
  );
}

export default BetterNote;

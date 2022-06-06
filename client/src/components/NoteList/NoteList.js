import {React,useEffect,useState,useContext} from 'react';
import './NoteList.scss';
import {NotesContext} from './../../context/context'

import {getRequest} from './../../utils/apiRequests'
import {BASE_URL,GET_ALL_NOTES,GET_TRASH_NOTES} from './../../utils/apiEndpoints'
import {listFormatDate} from './../../utils/helper'

import brian from './../../img/brian.png';

import {
    useLocation,
    useNavigate,
    NavLink
} from 'react-router-dom'

const NoteList = (props)=>{
    const location = useLocation();
    const [err,setErr] = useState(null);
    const notesContext = useContext(NotesContext);
    const navigate = useNavigate();
    
    const getNotes = async ()=>{
        var endpoint = '';
        if(location.pathname==='/all-notes')
            endpoint = GET_ALL_NOTES;
        else if (location.pathname==='/trash')
            endpoint = GET_TRASH_NOTES;
        else
            return;

        const res = await getRequest(`${BASE_URL}${endpoint}`);
        if(res.error){
            setErr(res.error);
            return false;
        }
        notesContext.notesDispatch({
            type: 'getAllNotesSuccess',
            payload: res
        });
        if(res.length > 0){
            navigate({
                pathname: `${location.pathname}/${res[0]._id}`,
                note:res[0]
            }) // this note will be used as payload in notes js to add the component
        }
    }

    useEffect(()=>{
        getNotes() ;
    },[location.pathname]);

    return(
        <div className="Note-List">
            <div className="header">
                <div className="title">
                    <h3>{props.title}</h3>
                </div>
                <div className="number">
                    {notesContext.notesState.length} note
                </div>
            </div>
            <div className="body">
                {
                    notesContext.notesState.length>0?notesContext.notesState.map((note)=>(
                        <NavLink key = {note._id} className="note-card" to ={
                            {
                                pathname: `${location.hash}/all-notes/${note._id}`,
                                note
                            }
                        }>
                            <div className="note-card-head">
                                <div className="note-card-title">
                                    {note.title}:
                                </div>
                                <div className="note-card-desc">
                                    {note.desc}
                                </div>
                                <div className="note-card-date">
                                    {listFormatDate(note.updatedAt)}
                                </div>
                            </div>
                        </NavLink>
                    )
                    ): <div className="empty-state">
                            No data found
                            <img className="brian" src={brian}/>
                        </div>
                }
            </div>
        </div>
    );
}

export default NoteList;
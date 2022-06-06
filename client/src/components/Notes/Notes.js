import {React,useState,useEffect,useContext} from 'react';
import './Notes.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArchive} from '@fortawesome/free-solid-svg-icons';

import {putRequest} from './../../utils/apiRequests'
import {BASE_URL,UPDATE_NOTE} from './../../utils/apiEndpoints'
import {NotesContext} from './../../context/context'
import { noteFormatDate } from '../../utils/helper';

import {
    useLocation,
    useParams,
    useNavigate
} from "react-router-dom";

function Notes(){

    const location = useLocation();
    const params = useParams();
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [isArchive,setIsArchive] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [err,setErr] = useState(null);
    const notesContext = useContext(NotesContext);
    const navigate = useNavigate();
    

    // using payload note from sidenavbar and re rendering the component whenever we are navigated to a new id
    // useEffect (()=>{
    //         if(location.note){
    //             setTitle(location.note.title);
    //             setDesc(location.note.desc);
    //             setUpdatedAt(location.note.updatedAt)
    //             setIsArchive(location.note.isArchive);
    //     }
    // },[location.note])

    useEffect(()=>{
        if(notesContext.notesState.length > 0){
            const [selectednote] = notesContext.notesState.filter((e)=> e._id ===params.id);
            if(selectednote){
                setTitle(selectednote.title);
                setDesc(selectednote.desc);
                setUpdatedAt(selectednote.updatedAt)
                setIsArchive(selectednote.archive);
            }
        }
    },[notesContext.notesState])

    useEffect (()=>{
        // console.log(location.pathname);
        const urlComponents =  location.pathname.split("/");
        const selectedId = urlComponents[urlComponents.length-1];
        // console.log(selectedId );
        if(notesContext.notesState.length > 0){
            const [selectednote] = notesContext.notesState.filter((e)=> e._id ===selectedId);
            // console.log(selectednote);
            setTitle(selectednote.title);
            setDesc(selectednote.desc);
            setUpdatedAt(selectednote.updatedAt)
            setIsArchive(selectednote.archive);
        }
    },[location.pathname])

    const handleTitleChange = (e) =>{
        setTitle(e.target.value);
    }

    const handleDescChange = (e) =>{
        setDesc(e.target.value);
    }

    const handleUpdateAtChange = (e) =>{
        setUpdatedAt(e.target.value);
    }

    const handleUpdateNote = async (key) =>{
        // var query = {'_id':params.id};
        var res;
        if(key ==='title')
            res = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`,{title : title , updatedAt :Date.now()});
        else
            res = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`,{desc : desc , updatedAt :Date.now()});
        if(res.error){
            setErr(res.error);
            return false;
        }
        notesContext.notesDispatch({
            type: 'updateNoteSuccess',
            payload: res,
            id: params.id
        });
        if(key ==='title')
            setTitle(res.title);
        else
            setDesc(desc) ;
        navigate({
            pathname: `${location.pathname}`
        }) // this note will be used as payload in notes js to add the component
    }

    const handleArchiveNote = async () =>{
        const res = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`,{archive : 1});
        if(res.error){
            setErr(res.error);
            return false;
        }
        notesContext.notesDispatch({
            type: 'updateNoteSuccess',
            payload: res,
            id: params.id
        });
        resetState();
        navigate({
            pathname: `${location.pathname}`
        });
    }

    const resetState = () =>{
        setTitle('');
        setDesc('');
        setUpdatedAt('');
        setIsArchive(0);
        setErr(null);
    }

    return(
        <div className="Notes">
            <div className="note-header">
                <div className="note-header-date" onChange={handleUpdateAtChange} >
                    Last Edited on {updatedAt==="" ? "":noteFormatDate(updatedAt)}
                </div>
                { isArchive ? '' : 
                    (    <div className="note-header-action-btn">
                            <div className="action-btn" onClick={handleArchiveNote}>
                                <FontAwesomeIcon icon={faArchive}/>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input defaultValue ={title} placeholder="Title" onChange={handleTitleChange} onBlur={()=>handleUpdateNote('title')} />
                </div>
                <div className="note-body-content">
                    <textarea defaultValue={desc} padding placeholder="Write your words!" onChange={handleDescChange} onBlur={()=>handleUpdateNote('desc')}/>
                </div>
            </div>
        </div>
    );
}

export default Notes;
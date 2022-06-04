import {React,useState,useContext} from 'react';
import './Sidenavbar.scss';
import {NotesContext} from './../../context/context';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown,faAngleRight,faSearch,faPlus,faStar,faNoteSticky,faBook,faPerson,faTags,faTrash} from '@fortawesome/free-solid-svg-icons';
import {NavLink,useNavigate} from 'react-router-dom';

import {postRequest} from './../../utils/apiRequests'
import {BASE_URL,CREATE_NOTE} from './../../utils/apiEndpoints'

function Sidenavbar(){
    const notesContext = useContext(NotesContext);
    const navigate = useNavigate();
    const [err,setErr] = useState(null);

    const handleCreateNote = async() => {
        const res = await postRequest(`${BASE_URL}${CREATE_NOTE}`);
        if(res.error){
            setErr(res.error);
            console.log(err);
            return false;
        }
        if(res._id){
            notesContext.notesDispatch({
                type:'createNoteSuccess',
                payload:res
            })
            navigate({
                pathname: `/all-notes/${res._id}`,
                note:res
            })
        }
        return true;
    }

    return (
        <div className="Sidenavbar">
            <div className="Sidenavbar-top">
                <div className="sidenavbar-top-profile">
                    <div className="profile-logo">
                        H
                    </div>
                    <div className="name">
                        Harshit Goyal
                        <FontAwesomeIcon className="arrow-down-icon" icon={faAngleDown} />
                    </div>
                </div>
                <div className="sidenavbar-top-search">
                    <div className="search-box">
                        <input placeholder="Search" />
                        <FontAwesomeIcon icon = {faSearch} />
                    </div>
                </div>
                <div className="sidenavbar-top-create-note" onClick={handleCreateNote}>
                    <FontAwesomeIcon className="plus-icon" icon ={faPlus}/>
                    <div className="name">
                        New Note
                    </div>
                </div>
            </div>
            <div className="sidenavbar-mid">
                <div className="sidenavbar-mid-notes-list">
                    <div className="sidenavbar-mid-notes-list-note">
                        <NavLink to="/dummy-1">
                            <FontAwesomeIcon className="arrow-down-icon" icon ={faAngleRight}/>
                            <FontAwesomeIcon className="star-icon" icon ={faStar}/>
                            <div className="name">
                                Shortcuts
                            </div>  
                        </NavLink>
                    </div>
                    <div className="sidenavbar-mid-notes-list-note sidenavbar-mid-notes-list-all-notes">
                        <NavLink to="/all-notes">
                        <FontAwesomeIcon className="note-icon" icon ={faNoteSticky}/>
                        <div className="name">
                            All Notes
                        </div>  
                        </NavLink>
                    </div>
                    <div className="sidenavbar-mid-notes-list-note sidenavbar-mid-notes-list-notebook">
                        <NavLink to="/dummy-1">
                        <FontAwesomeIcon className="arrow-down-icon" icon ={faAngleRight}/>
                        <FontAwesomeIcon className="faBook" icon ={faBook}/>
                        <div className="name">
                            Notebooks
                        </div>  
                        </NavLink>
                    </div>
                    <div className="sidenavbar-mid-notes-list-note sidenavbar-mid-notes-list-all-notes">
                        <NavLink to="/dummy-1">
                        <FontAwesomeIcon className="note-icon" icon ={faPerson}/>
                        <div className="name">
                            Shared with me
                        </div>  
                        </NavLink>
                    </div>
                    <div className="sidenavbar-mid-notes-list-note sidenavbar-mid-notes-list-all-notes">
                        <NavLink to="/dummy-1">
                        <FontAwesomeIcon className="note-icon tag-icon" icon ={faTags}/>
                        <div className="name">
                            Tags
                        </div>  
                        </NavLink>
                    </div>
                    <div className="sidenavbar-mid-notes-list-note sidenavbar-mid-notes-list-all-notes">
                        <NavLink to="/trash">
                        <FontAwesomeIcon className="note-icon tag-icon" icon ={faTrash}/>
                        <div className="name">
                            Trash
                        </div>  
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidenavbar;
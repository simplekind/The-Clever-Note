import React from 'react';
import './Sidenavbar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown,faSearch,faPlus} from '@fortawesome/free-solid-svg-icons';
function Sidenavbar(){
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
                <div className="sidenavbar-top-create-note">
                    <FontAwesomeIcon className="plus-icon" icon ={faPlus}/>
                    <div className="name">
                        New Note
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidenavbar;
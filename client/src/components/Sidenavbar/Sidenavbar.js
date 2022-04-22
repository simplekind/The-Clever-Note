import React from 'react';
import './Sidenavbar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
function Sidenavbar(){
    return (
        <div className="Sidenavbar">
            <div claessName="sidenavbar-top-profile">
                <div className="profile-logo">
                    H
                </div>
                <div className="name">
                    Strikers
                    <FontAwesomeIcon className="icon" icon={faAngleDown} />
                </div>
            </div>
        </div>
    );
}

export default Sidenavbar;
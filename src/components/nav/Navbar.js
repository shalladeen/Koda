// Navbar.js
import React from 'react';
import '../nav/NavStyles.css';
import { Link } from 'react-router-dom';
import koda2 from './images/koda2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faRightToBracket, faGear, faStopwatch, faGripVertical, faNotesMedical } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
        <div>
        <nav>
            <Link to="/">
                <img src={koda2} alt="logo" id="logo" />
            </Link>

            <div>
                <ul id="navbar">
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faGripVertical} style={{ color: "#000000" }} className="navIcon" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/Notes" className="notes">
                        <FontAwesomeIcon icon={faNotesMedical} style={{color: "#000000",}} className="navIcon"/>
                            Notes
                        </Link>
                    </li>
                    <li>
                        <Link to="/TimeTracker" className="timeTracker">
                            <FontAwesomeIcon icon={faStopwatch} style={{ color: "#000000" }} className="navIcon" />
                            Time Tracker
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="signup">
                            <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#000000" }} className="navIcon" />
                            Login/Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link to="/Settings" className="settings">
                            <FontAwesomeIcon icon={faGear} style={{ color: "#000000" }} className="navIcon" />
                            Settings
                        </Link>
                    </li>
                    
                </ul>
            </div>
            </nav>
            <div className="friends">
                <Link to="/Friends" className="friendIcon">
                    <FontAwesomeIcon icon={faUserGroup} style={{ color: "#003899" }} />
                </Link>
            </div>
        </div>
        
    );
}

export default Navbar;

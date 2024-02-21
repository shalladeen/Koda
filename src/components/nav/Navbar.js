// Navbar.js
import React from 'react';
import '../nav/NavbarStyle.css';
import { Link, useLocation } from 'react-router-dom';
import koda2 from './images/koda2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faRightToBracket, faGear, faStopwatch, faGripVertical, faNotesMedical } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const location = useLocation();
    return (
    <div>
        <nav id="main-nav">
            <div id="navbar">
                <Link to="/">
                    <img src={koda2} alt="logo" id="logo" />
                </Link>
                <ul >
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''} exact>
                            <FontAwesomeIcon icon={faGripVertical} className="navIcon" />
                            
                        </Link>
                    </li>
                    <li>
                        <Link to="/Notes" className="notes">
                        <FontAwesomeIcon icon={faNotesMedical}  className="navIcon"/>
                          
                        </Link>
                    </li>
                    <li>
                        <Link to="/TimeTracker" className="timeTracker">
                            <FontAwesomeIcon icon={faStopwatch} className="navIcon" />
                            
                        </Link>
                    </li>
                    <li>
                        <Link to="/Friends" className="friendIcon">
                            <FontAwesomeIcon icon={faUserGroup} />
                          
                        </Link>
                    </li>
                    <li>
                        <Link to="/Settings" className="settings">
                            <FontAwesomeIcon icon={faGear}  className="navIcon" />
                           
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="signup">
                            <FontAwesomeIcon icon={faRightToBracket}  className="navIcon" />  
                            
                        </Link>
                    </li>
                    
                    </ul>
                </div>
            </nav>
        </div>
        
    );
}

export default Navbar;

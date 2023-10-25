import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import koda2 from './images/koda2.svg';
import Signup from '../pages/signup/Signup'
import "./NavbarStyle.css";
import Home from '../pages/Home/Home';
import Friends from '../pages/Friends/Friends.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">
                    <img src={koda2} alt="logo" id="logo" />
                </Link>

                <div>
                    <ul id="navbar">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                       
                        <li>
                            <Link to="/signup" className="signup">Login/Sign Up</Link>
                        </li>
                    </ul>
                </div>
                
            </nav>
                
                <div className="friends">
                    
                    <Link to="/Friends" className="friendIcon">
                         <FontAwesomeIcon icon={faUserGroup} style={{ color: "#003899" }} />
                    </Link>
                </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navbar;

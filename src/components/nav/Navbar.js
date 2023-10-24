import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import koda2 from './images/koda2.svg';
import Signup from '../pages/signup/Signup'
import "./NavbarStyle.css";

function Home() {
    return <h2>Home Page Content</h2>;
}



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
                            <Link to="/signup">Login/Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navbar;

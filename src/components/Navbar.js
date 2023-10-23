import React from 'react';
import koda2 from './assets/images/koda_2.svg';
import "./NavbarStyle.css";
function Navbar(){
    return (
        <>
        <nav>
            <a href="index.html">
                <img src={koda2} alt="logo" id="logo" />
           </a>

           <div>
            <ul id="navbar">
                <li>
                     <a href="index.html">Home</a>
                      </li>
                <li> 
                    <a href="index.html">Shop</a> 
                    </li>
                <li> 
                    <a href="index.html">About</a>
                     </li>
                <li> 
                    <a href="index.html">Contact</a> 
                    </li>
            </ul>
           </div>
        </nav>
        </>
    )
}

export default Navbar;
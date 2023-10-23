import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';



function Signup(){
    return (
        <div class = "contianer" id = "container">
        <div class="form-container sign-up">       
            <form>
                <h1>Create An Account</h1>
                <div class="social-icons">
                    <a href="#" className = "icons">
                         <FontAwesomeIcon icon={faGooglePlusG} style={{ color: "#000000" }} />
                    </a>
                    <a href="#" className = "icons">
                         <FontAwesomeIcon icon={faFacebook} style={{ color: "#000000" }} />
                         </a>
                    <a href="#" className = "icons">
                         <FontAwesomeIcon icon={faGithub} style={{color: "#000000",}} />
                         </a>
                    <a href="#" className = "icons">
                         <FontAwesomeIcon icon={faLinkedin} style={{color: "#000000",}} />
                    </a>
                </div>
                <span>or use your email for registraion</span>
                <input type="text" placeholder='Name'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <button>
                    Sign Up
                </button>
            </form>
        </div>

   </div>
    )
}

export default Signup;
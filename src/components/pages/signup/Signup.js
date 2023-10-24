import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './SignupStyles.css';



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

        <div class="form-container sign-in">       
            <form>
                <h1>Sign In</h1>
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
                <span>or use your email to login</span>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <a href="#">Forget Your Password?</a>
                <button>
                    Sign In
                </button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Login to use all of the site features</p>
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hey There!</h1>
                    <p>Register to use all of the site features</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>

   </div>
    )
}

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
});

loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});

export default Signup;
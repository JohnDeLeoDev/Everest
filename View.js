import React from "react";
import './everest_style.css';
import Create from './Owner/Create.js';
import Login from './Login.js';
import About from './About.js';

import logo from './everest.jpg'


function ManagerView() {
    return (
        <div className="ManagerView">
            <h1>Manager View</h1>
        </div>
    );
}

function OwnerView() {
    return (
        <div className="OwnerView">
            <h1>Welcome, Owner</h1>
        </div>
    );
}

function CustomerView() {
    return (
        <div className="CustomerView">
            <h1>Customer View</h1>
        </div>
    );
}

export function Landing() {
    return (
        <div className="Landing-page">
            <head>
        <title>Everest Home</title>
        <meta charset="UTF-8" />
        <meta name="author" content="Ellen Mackey, John DeLeo" />
        <meta name="keywords" content="computers, used computers, computer consignment" />
        <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Open+Sans" 
        rel="stylesheet"/>
      </head>
      
      <body>
      <header>
	      <p class="logo"><img src={logo} height="150" width="150" align="left"/></p>
	        <nav class="horizontalNAV">
	          <ul type="none">
		          <li><a href="login.html">Sign In</a></li>
		          <li>Create Store</li>
		          <li>About Us</li>
		          <li>Search</li>
		          <li><a href="FAQ.html">?</a></li>
	          </ul>
          </nav>
          <br clear="right" />
          <h1>
	        Everest Computer Consignment
          </h1>
    
          <h2 class="tagline"></h2>
   
      </header>

      <div id="elevator">

      <h3>Search thousands of used computers</h3>
	    <h3>Find rare models and features at low costs</h3>
	    <h3>New deals every day</h3>
     
      </div>
      </body>

      <br />
      <hr color="white" clear="right"/>
      <footer>
        <address>
			    Everest Computer Consignment&nbsp;&nbsp;&nbsp;&#9765;&nbsp;&nbsp;&nbsp;
			    established 2023
	      </address>
	
      </footer>
        </div>
    );
}

export default function View(props) {
    
    return (
        <div>
            {props.user === 'owner' && <OwnerView />}
            {props.user === 'manager' && <ManagerView />}
            {props.user === 'customer' && <CustomerView />}
            {(props.createStore === true && (props.user === 'manager' || props.user === 'owner')) && <Create />}
            {props.user === null && <Landing />}
            {props.login === true && <Login handleUser={props.handleUser}/>}
            {props.about === true && <About />}
            
        </div>
    )
}

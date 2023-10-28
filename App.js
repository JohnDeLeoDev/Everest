import './everest_style.css'
import logo from './everest.jpg'
import bkgd from './laptop.jpg'   //Image by Joshua Woroniecki (Pixabay)

function App() {
  return (
    <div className="App">
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

export default App;

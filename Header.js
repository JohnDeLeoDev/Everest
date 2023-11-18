import React from "react";
import {useState} from "react";
import './everest_style.css'
import logo from './everest.jpg'
import RemoveStore from "./Manager/RemoveStore";

/****************************************************** */
function DropdownNav(props)
/**
 * @brief packs a dropdown nav button
 * @parameters 
 *      submenu: dropdown option values
 *      callback: the props.<function> to select for option
 ********************************************************/
{
    const [display, setDisplay] = useState(false)

    
    return  (
        <div>
            <button
                 className="dropdown"
                onClick={() => setDisplay(!display)}>
                {props.navName}
            </button>
            {
                display && (
                    <div className="dropdown-cont">
                        {props.navSelect}
                    </div>
                )
            }

        </div>
    )
}

function DropdownElement(props)
{
    return (
        <div>
            {props.name}
        </div>
    )
}

//********************************************************* */
function getDefaultNav(props)
/**
 * @brief default navigation panel (non-logged in users)
 *        Login
 *        Create Store
 *        About Us
 *        Search (a drop down with subnav)
 *        ? (this is help)
 ************************************************************/
{
    const searchOpts = {"options":["Stores", "Computers"]}
    let search = (
        <div>
            <button key={"searchButton"} className="Button">Search
            <select>
                {DropdownNav(searchOpts, props.handleSearch)}
            </select>
            </button>
        </div>
        ) 

    return(
        <div>
            <button key={"loginButton"} className="Button" onClick={() => {props.handleLogin(true)}}>Login</button>
            <button key={"createStoreButton"} className="Button" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
            <button key={"aboutButton"} className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
            {search}
            <button key={"questionsButton"} className="Button">?</button>
        </div>
    )
}

//********************************************************* */
function getStoreOwnerNav(props)
/**
 * @brief get the nav panel for the store owner
 *      Options:
 *      Log out
 *      Add Computer
 *      Generate Report - sub-nav with inventory or finance
 *          -this isn't fully implemented
 *      About Us
 *      Search - sub-nav with Stores or Computers
 *      ? (help)
 ************************************************************/
{
    const searchOpts = {"options":["Stores", "Computers"]}
    let search = (
        <div>
            <button className="Button">Search
            <select>
                {DropdownNav(searchOpts, props.handleSearch)}
            </select>
            </button>
        </div>
        )

    return(
    <div>
        <button className="Button" onClick={() => props.handleLogout(true)}> Logout </button>
        <button className="Button" onClick={() => {props.handleAddComputer(true)}}> Add Computer </button>
        <button className="Button" onClick={() => {props.handleInventoryReport(true)}}> Generate Reports</button>
        <button className="Button" onClick={() => {props.handleAbout(true)}}> About Us</button>
        {search}
        <button className="Button"> ? </button>
    </div>
    )
}

//*************************************************************** */
function getSiteManagerNav(props)
/**
 * @brief get the nav panel for the site manager
 *      options:
 *      Logout
 *      Generate Reports - inventory report (money value of inventory)
 *          -for all stores -subnav
 *          -for one store -subnav
 *      Generate Balance - balance in dollars
 *          -for site manager
 *          -for store(s) --double check this
 ******************************************************************/
{

    //dropdown for inventory
    let inventory = 
        <>
            <button    
                onClick={() => {props.handleSetStoreReport("All Stores")}}>
                    Inventory Totals by Store
            </button>
            <button 
                onClick={() => {props.handleSetStoreReport("Site")}}>
                    Site Inventory Total
            </button>    
        </>

    //dropdown for profits
    let profit = 
        <>
            <button className="Button" onClick={() => {props.handleShowBalances("All Stores")}}>
                Sales Reports by Store
            </button>
            <button className="Button" onClick={() => {props.handleShowBalances("Site")}}>
                Site Manager Profit
            </button>
        </>


    return (
        <div>
            <button className="Button" onClick={() => {props.handleLogout(true)}}>Logout</button>
            <DropdownNav navName={"Inventory Reports"} navSelect={inventory}/>
            <DropdownNav navName={"Sales Reports"} navSelect={profit} />
            <button onClick={() => props.handleRemoveStore(true)}>Remove Store</button>  
            <button className="Button">?</button>
        </div>
    )
}

//****************************************************** */
export function Header(props) 
/**
 * @brief function to add nav by view priviledge level
 **********************************************************/
{
    let navList = getDefaultNav(props);
    let viewName = "Everest Home";
    let msg = ""
    var dflt_storename = "Beta"
    let banner = <></>
    
    //check login status
    if (props.user === null || props.user === undefined) {
        navList = getDefaultNav(props);
        viewName = "Everest Home"
        msg = ""
    } else {
        if (props.user[1] === 0) {
            navList = getStoreOwnerNav(props);
            viewName = "Store Dashboard"
            msg = "Logged into " + "*"+dflt_storename+"*" + " Dashboard"
        } else if (props.user[1] === 1) {
           navList = getSiteManagerNav(props);
           viewName = "Site Manager Dashboard"
           msg = "Logged in as Admin"
        } 
    
        if (props.user[1] === 0 || props.user[1] === 1){
            banner = <h3 className="banner">{msg}</h3>
        }
    }




    return (
        <header>
            
            <title>{viewName}</title>
            <meta charSet="UTF-8" />
            <meta name="author" content="Ellen Mackey, John DeLeo" />
            <meta name="keywords" content="computers, used computers, computer consignment" />
            <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Open+Sans" 
            rel="stylesheet"/>
            
            <p className="logo"><img src={logo} height="150" width="150" align="left" alt="Everest"/></p>
	        <nav className="horizontalNAV">
            {navList}
            </nav>
            <br clear="right" />
            <h1>
	            Everest Computer Consignment
            </h1>
    
            <h2 className="tagline">Second Hand Computer Sellers</h2>
            {props.user !== null && props.user !== undefined ? <h2 className="tagline">Welcome {props.user[0]}</h2> : <></>}
            {banner}
        </header>
    )
}



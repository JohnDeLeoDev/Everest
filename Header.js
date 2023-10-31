import React from "react";
import './everest_style.css'
import logo from './everest.jpg'

/****************************************************** */
function DropdownNav(submenu, callback)
/**
 * @brief packs a dropdown nav for show balances
 ********************************************************/
{
    let opts = submenu.options
    return opts.map((opt) => {
        return(
            <option onClick={() => 
                {callback(opt)}}>{opt}</option> 
        )
    });
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
            <button className="Button">Search
            <select>
                {DropdownNav(searchOpts, props.handleSearch)}
            </select>
            </button>
        </div>
        ) 

    return(
        <div>
            <button className="Button" onClick={() => {props.handleLogin(true)}}>Login</button>
            <button className="Button" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
            <button className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
            {search}
            <button className="Button">?</button>
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
 *      About Us
 *      Search
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
        <button className="Button" onClick={() => {props.handleLogout(true); props.handleUser(null)}}> Logout </button>
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
 *      Generate Reports
 *      
 ******************************************************************/
{
    const items = {"options": ["Site Manager", "All Stores"]}
    let balances = 
        <div>
            <button className="Button">Generate Reports
            <select>
                {DropdownNav(items, props.handleShowBalances)}
            </select>
            </button>
        </div>

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

    const reportOpts = {"options":["All Stores", "One Store"]}
    let inventoryReport = (
        <div>
            <button className="Button">Generate Inventory Report
            <select>
                {DropdownNav(reportOpts, props.handleSetStoreReport)}
            </select>
            </button>
        </div>
    )

    
    return (
        <div>
            <button className="Button" onClick={() => {props.handleLogout(true)}}>Logout</button>
            {inventoryReport}
            {balances}
            {search}
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
    let user = props.user;
    let navList = getDefaultNav(props);
    let viewName = "Everest Home";
    let admin_msg = ""

    //check login status
    if (user === 'owner') {
        navList = getStoreOwnerNav(props);
        viewName = "Store Dashboard"
    } else if (user === 'manager') {
       navList = getSiteManagerNav(props);
       viewName = "Site Manager Dashboard"
       admin_msg = "Logged in as Admin"
    } 

    return (
        <header>
            <head>
                <title>{viewName}</title>
                <meta charset="UTF-8" />
                <meta name="author" content="Ellen Mackey, John DeLeo" />
                <meta name="keywords" content="computers, used computers, computer consignment" />
                <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Open+Sans" 
            rel="stylesheet"/>
            </head>
            <p class="logo"><img src={logo} height="150" width="150" align="left" alt="Everest"/></p>
	        <nav class="horizontalNAV">
            {navList}
            </nav>
            <br clear="right" />
            <h1>
	            Everest Computer Consignment
            </h1>
    
            <h2 class="tagline">Second Hand Computer Sellers</h2>
            <h3 className="banner">{admin_msg}</h3>
        </header>
    )
}



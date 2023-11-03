import React from "react";
import './everest_style.css';
import Create from './Owner/Create.js';
import {Login} from './Login.js';
import About from './About.js';
import Inventory from "./Owner/Inventory";

import AddComputer from "./Owner/AddComputer";
import InventoryReport from "./Owner/InventoryReport";
import { GenerateBalance, GenerateSiteManagerBalance, GenerateStoreBalance } from "./Manager/GenerateBalance";
import { SearchComputer, SearchStores } from "./Customer/Search";
import { GenerateAllStoreInventoryReport , GenerateStoreInventoryReport} from "./Manager/GenerateReport";

//*********************************************** */
function Footer()
/**
 * @brief this is a View helper class to standardize
 *      UX commonalities between views
 **************************************************/
{
    return (
        <div>
            <br />
            <hr color="white" clear="right"/>
            <footer>
                <address>
			    Everest Computer Consignment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			    established 2023
	            </address>
	
            </footer>
        </div>
    )
}

//********************************************* */
export function ManagerView(props) 
/** 
 * @brief the manager view
 *      manager must log in to view dashboard
 ************************************************/ 
{
    let callback = ''
    console.log("MANAGER VIEW")
    if (props.showBalances === "Site Manager"){
        callback = <GenerateSiteManagerBalance
               handleSiteManagerBalance={props.handleSiteManagerBalance} />
    } else if (props.showBalances === ''){

    }

    if (props.setStoreReport === "One Store" ){
        //props.searchStores=(true)
        callback = <GenerateStoreInventoryReport
                        stores={props.stores}
                        //searchStores={props.searchStores}
                    />
    }

    if (props.search === "Stores"){
        callback = <SearchStores
            stores={props.stores}/>
    } else if  (props.search === "Computers"){
        callback = <SearchComputer/>
    }

    if (props.setStoreReport  === "All Stores"){
        callback = <GenerateAllStoreInventoryReport 
                        descending={props.descending}
                        stores={props.stores}
                        handleSetStoreReport={props.handleSetStoreReport}/>
    }

   return (
    <div>
        <div className="bodybag">
            {callback}
        </div>      
            <Footer/>
        </div>
    );
}

//****************************************** */
function OwnerView(props) 
/**
 * @brief the StoreOwner view - 
 *      Store Owner must be logged in
 **********************************************/
{
    let callback = <Inventory 
        modifyComp={props.modifyComp} 
        removeComp={props.removeComp} handleRemoveComp={props.handleRemoveComp}  
        handleModifyComp={props.handleModifyComp} 
        handleInventory={props.handleInventory}
        inventory={props.inventory}/>
    
    if (props.addComputer){
        callback = <AddComputer/>
    } 
    
    if (props.inventoryReport){
        callback = <InventoryReport 
            inventory={props.inventory}
            handleInventoryReport={props.handleInventoryReport}/>
    }

    if (props.about === true){
        callback = <About/>
    }

    if (props.search === "Stores"){
        callback = <SearchStores
            stores={props.stores}/>
    } else if  (props.search === "Computers"){
        callback = <SearchComputer/>
    }

    if (props.inventoryReport === true) {
        callback = <InventoryReport 
        inventory={props.inventory}
        handleInventoryReport={props.handleInventoryReport}/>
    }

    return (
        <div>
            <div className="bodybag">
                {callback}
            </div>
            <Footer/>
        </div>
    
    );
}

//*********************************************** */
export function Landing(props) 
/**
 * @brief main landing page for the site, 
 *      from here all functionality may be linked
 ***************************************************/
{
    let callback = <div id='elevator'>
                        <p>Search thousands of used computers</p>
                        <p>Find rare models and features at low costs</p>
                        <p>New deals every day</p>
                    </div>
    if (props.login === true){
        callback = <Login handleUser={props.handleUser}/>
    } 

    if (props.search === "Stores"){
        callback = <SearchStores
            stores={props.stores}/>
    } else if  (props.search === "Computers"){
        callback = <SearchComputer/>
    }

    if (props.createStore=== true){
        callback = <Create /> 
    }

    if (props.about === true){
        callback = <About/>
    }

    return (
        <div>
        <div className="bodybag">
            {callback}
        </div>
            <Footer/>
        </div>
    );
}

export default function View(props) {
    if (props.user === 'owner'){
        return (
            <OwnerView 
                modifyComp={props.modifyComp} 
                removeComp={props.removeComp} handleRemoveComp={props.handleRemoveComp}  
                handleModifyComp={props.handleModifyComp} 
                handleInventory={props.handleInventory}
                inventory={props.inventory}
                addComputer={props.addComputer}
                inventoryReport={props.inventoryReport}
                handleInventoryReport={props.handleInventoryReport}
                search={props.search}
                about={props.about}
                />
        )
    } 
    else if (props.user === 'manager'){
        return (
        <div>
            <ManagerView 
                showBalances={props.showBalances}
                handleSiteManagerBalance={props.handleSiteManagerBalance}
                setStoreReport={props.setStoreReport}
                handleSetStoreReport={props.handleSetStoreReport}
                descending={props.descending}
                stores={props.stores}
                search={props.search}
            />
        </div>
        )
    } else {
        return (
            <div> 
            <Landing 
                search={props.search}
                login={props.login}
                handleUser={props.handleUser}
                createStore={props.createStore}  
                about={props.about}    
                />
            </div>
        )
    }
}

/*
{props.user === 'owner' && <OwnerView 
                modifyComp={props.modifyComp} 
                removeComp={props.removeComp} handleRemoveComp={props.handleRemoveComp}  
                handleModifyComp={props.handleModifyComp} 
                handleInventory={props.handleInventory}
                inventory={props.inventory}/>}
            {props.user === 'manager' && <ManagerView />}
            {props.user === null && <Landing />}
            {props.about === true && <About />}
            {props.logout === true && <Landing /> }
            {props.addComputer === true && <AddComputer/>}
            
            {props.inventoryReport === true && <InventoryReport 
                inventory={props.inventory}
                handleInventoryReport={props.handleInventoryReport}/>}

            {props.showBalances === "Site Manager" && <GenerateSiteManagerBalance
               handleSiteManagerBalance={props.handleSiteManagerBalance} />}

            {props.setStoreReport  === "All Stores" && <GenerateAllStoreInventoryReport 
                descending={props.descending}
                stores={props.stores}
                handleSetStoreReport={props.handleSetStoreReport}/>}

            {props.setStoreReport === "One Store" && <GenerateStoreInventoryReport
                stores={props.stores}
                />}

            {props.search === "Stores" && <SearchStores
                stores={props.stores}/>}
            {props.search === "Computers" && <SearchComputer/>}
*/
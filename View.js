import React from "react";
import './everest_style.css';
import {Login} from './Login.js';
import About from './About.js';
import { SearchComputer, SearchStores } from "./Customer/Search";
import { GenerateStore } from "./Customer/GenerateInventory.js";

//owner use cases
import Create from './Owner/Create.js';
import Inventory from "./Owner/Inventory";
import AddComputer from "./Owner/AddComputer";
import InventoryReport from "./Owner/InventoryReport";

//manager use cases
import { GenerateBalance, GenerateSiteManagerBalance, GenerateStoreBalance } from "./Manager/GenerateBalance";
import { GenerateInventoryReport} from "./Manager/GenerateReport";
import RemoveStore from "./Manager/RemoveStore";
import { ListStores } from "./Customer/ListStores.js";

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

    //profit for site manager
    if (props.showBalances === "Site"){
        callback = <GenerateSiteManagerBalance
               handleSiteManagerBalance={props.handleSiteManagerBalance}
               siteBalance={props.siteBalance} handleSiteBalance={props.handleSiteBalance}
               />
    } else if (props.showBalances === 'All Stores'){
        callback = <GenerateStoreBalance handleStoreBalance={props.handleStoreBalance}/>
    }

    //get total inventory balance for all stores as one value
    if (props.setStoreReport === "All Stores" || props.setStoreReport === "Site" ) {     //get total inventory for each store
        callback = <GenerateInventoryReport
                    stores={props.stores}
                    setStoreReport={props.setStoreReport}
                    handleSetStoreReport={props.handleSetStoreReport}
                    />
    }

    //search for stores
    if (props.search === "Stores"){
        callback = <SearchStores
            stores={props.stores} handleStores={props.handleStores}
            handleListFilteredStores={props.handleListFilteredStores}
            />
    } 
    //search for computers
    else if  (props.search === "Computers"){  
        callback = <SearchComputer searchResults={props.searchResults} handleSearchResults={props.handleSearchResults}/>
    }

    //remove store from site
    if (props.removeStore){
        callback = <RemoveStore 
                        handleRemoveStore={props.handleRemoveStore}/>
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
        user={props.user}
        modifyComp={props.modifyComp} 
        removeComp={props.removeComp} handleRemoveComp={props.handleRemoveComp}  
        handleModifyComp={props.handleModifyComp} 
        handleInventory={props.handleInventory}
        inventory={props.inventory}/>
    
    if (props.addComputer){
        callback = <AddComputer user={props.user} addComputer={props.addComputer} computerAdded={props.computerAdded} handleAddComputer={props.handleAddComputer} handleComputerAdded={props.handleComputerAdded}/>
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
            stores={props.stores} handleStores={props.handleStores}/>
    } else if  (props.search === "Computers"){
        callback = <SearchComputer searchResults={props.searchResults} handleSearchResults={props.handleSearchResults}/>
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
        callback = <Login 
            failedLogin={props.failedLogin} 
            handleFailedLogin={props.handleFailedLogin} 
            handleUser={props.handleUser}
        />
    } 

    if (props.search === "Stores"){
        callback = <SearchStores
            stores={props.stores}
            handleStores={props.handleStores}
            handleListFilteredStores={props.handleListFilteredStores}
            handleCustomerStoreInventory={props.handleCustomerStoreInventory}
        />
    } else if  (props.search === "Computers"){
        callback = <SearchComputer 
            searchResults={props.searchResults} 
            handleSearchResults={props.handleSearchResults}
        />
    }

    if(props.listFilteredStores === true){
        callback = <ListStores
            listFilteredStores={props.listFilteredStores}
            customerStoreInventory={props.customerStoreInventory}
        />
    }

    if (props.createStore=== true){
        callback = <Create handleFailedStore={props.handleFailedStore} failedCreateStore={props.failedCreateStore} storeCreated={props.storeCreated} handleStoreCreated={props.handleStoreCreated} handleCreateStore={props.handleCreateStore}  /> 
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

//********************************************************* */
export default function View(props) 
/**
 * @brief intake funciton to select the correct view based on 
 *        permissions
 ***********************************************************/
{
    if (props.user === null || props.user === undefined) {
        return (
            <div> 
                <Landing 
                    search={props.search}
                    login={props.login}
                    handleUser={props.handleUser}
                    createStore={props.createStore}
                    storeCreated={props.storeCreated}
                    handleStoreCreated={props.handleStoreCreated}
                    handleFailedStore={props.handleFailedStore}
                    failedCreateStore={props.failedCreateStore}  
                    about={props.about}   
                    stores={props.stores} handleStores={props.handleStores}
                    failedLogin={props.failedLogin}
                    handleFailedLogin={props.handleFailedLogin}
                    handleCreateStore={props.handleCreateStore}
                    searchResults={props.searchResults} handleSearchResults={props.handleSearchResults}
                    handleListFilteredStores={props.handleListFilteredStores}
                    listFilteredStores={props.listFilteredStores}
                    customerStoreInventory = {props.customerStoreInventory}
                    handleCustomerStoreInventory = {props.handleCustomerStoreInventory}
                   />
            </div>
        )
    } else if (props.user[1] === 0){            //STORE OWNER
        return (
            <OwnerView                  
                user={props.user}
                modifyComp={props.modifyComp} 
                removeComp={props.removeComp} handleRemoveComp={props.handleRemoveComp}  
                handleModifyComp={props.handleModifyComp} 
                handleInventory={props.handleInventory}
                inventory={props.inventory}
                addComputer={props.addComputer}
                computerAdded={props.computerAdded}
                handleAddComputer={props.handleAddComputer}
                handleComputerAdded={props.handleComputerAdded}
                inventoryReport={props.inventoryReport}
                handleInventoryReport={props.handleInventoryReport}
                search={props.search}
                stores={props.stores} handleStores={props.handleStores}
                about={props.about}
                searchResults={props.searchResults} handleSearchResults={props.handleSearchResults}
                />
        )
    } 
    else if (props.user[1] === 1){          //MANAGER VIEW
        return (
        <div>
            <ManagerView 
                showBalances={props.showBalances}
                handleSiteManagerBalance={props.handleSiteManagerBalance}
                setStoreReport={props.setStoreReport}
                handleSetStoreReport={props.handleSetStoreReport}
                handleStoreBalance={props.handleStoreBalance}
                descending={props.descending}
                stores={props.stores} handleStores={props.handleStores}
                search={props.search}
                user={props.user}
                removeStore={props.removeStore} 
                handleRemoveStore={props.handleRemoveStore}
                inventory={props.inventory}
                searchResults={props.searchResults} handleSearchResults={props.handleSearchResults}
                siteBalance={props.siteBalance} handleSiteBalance={props.handleSiteBalance}
                />
        </div>
        )
    } else {                //DEFAULT VIEW
        return (
            <div> 
            <Landing 
                search={props.search}
                login={props.login}
                failedLogin={props.failedLogin}
                handleFailedLogin={props.handleFailedLogin}
                handleFailedStore={props.handleFailedStore}
                failedCreateStore={props.failedCreateStore}  
                handleUser={props.handleUser}
                createStore={props.createStore} 
                storeCreated={props.storeCreated}
                handleStoreCreated={props.handleStoreCreated} 
                handleCreateStore={props.handleCreateStore}
                about={props.about}   
                stores={props.stores} handleStores={props.handleStores}
                searchResults={props.searchResults} handleSearchResults={props.handleSearchResults}
                listFilteredStores={props.listFilteredStores}
                handleListFilteredStores={props.handleListFilteredStores}
                customerStoreInventory = {props.customerStoreInventory}
                handleCustomerStoreInventory = {props.handleCustomerStoreInventory}   
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
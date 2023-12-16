import React from 'react';
import './everest_style.css'
import { Header } from './Header';
import View from './View';
import { GetSiteInventoryBalancesRequest } from './API.js';
import {testInventory} from './Owner/testInventory.js';
import { test_stores } from './Manager/testStores';
import { wait } from '@testing-library/user-event/dist/utils/index.js';
import { GetStoreInventory } from './API.js';
import { ReqStoreLonLat } from './Customer/Buy.js';
import { GetStoreBalances } from './API.js';


function App() {
  //cookieeees
  let cookie = localStorage.getItem('user');
  cookie = JSON.parse(cookie);

  let storeCoordInit = {
    lat: 0.0,
    lon: 0.0
  }

  let customerCoordInit = {
    lat: 0.0,
    lon: 0.0
  }

  const [user, setUser] = React.useState(cookie);
  const [login, setLogin] = React.useState(null);
  const [failedLogin, setFailedLogin] = React.useState(false);
  const [failedCreateStore, setFailedCreateStore] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [createStore, setCreateStore] = React.useState(null);
  const [storeCreated, setStoreCreated] = React.useState(null);
  const [logout, setLogout] = React.useState(null);
  const [addComputer, setAddComputer] = React.useState(null);
  const [computerAdded, setComputerAdded] = React.useState(null);
  const [inventoryView, setInventoryView] = React.useState(null);
  const [siteInventoryBalances, setSiteInventoryBalances] = React.useState(null);   //set all store inventory balances
  const [inventory, setInventory] = React.useState(null);
  const [inventoryReport, setInventoryReport] = React.useState(null);
  const [modifyComp, setModifyComp] = React.useState(false, null, false);
  const [removeComp, setRemoveComp] = React.useState(false, null, false);
  const [stores, setStores] = React.useState(null);  //init test data for stores
  const [showStores, setShowStores] = React.useState(null); //the filter boxes - all stores
  const [showBalances, setShowBalances] = React.useState(null); 
  const [siteManagerBalance, setSiteManagerBalance] = React.useState(null);
  const [storeBalance, setStoreBalance] = React.useState(null);
  const [storeReport, setStoreReport] = React.useState(null);
  const [removeStore, setRemoveStore] = React.useState(null);
  const [listFilteredStores, setListFilteredStores] = React.useState(null); //view selected stores inventory
  const [customerStoreInventory, setCustomerStoreInventory] = React.useState(null);
  const [siteBalance, setSiteBalance] = React.useState(null);
  const [buyComputer, setBuyComputer] = React.useState(null);
  const [storeLoc, setStoreLoc] = React.useState(null);
  const [computerInfo, setcomputerInfo] = React.useState(null);
  const [coordinatesIntake, setCoordinatesIntake] = React.useState(null, null);
  const [customerCoordinates, setCustomerCoordinates] = React.useState(customerCoordInit); //customer coordinates
  const [storeCoordinates, setStoreCoordinates] = React.useState(storeCoordInit); //store coordinates
  const [confirmBuy, setConfirmBuy] = React.useState(null);
  const [storeBalances, setStoreBalances] = React.useState(null); //all of the store balances for SM view
  const [storeProfit, setStoreProfit] = React.useState(null); //profit for ONE store
  const [buyStatusCount, setBuyStatusCount] = React.useState(0);

  //clear function should be called between view to remove old render
  function clear(){
    setLogin(false)
    setAbout(false)
    setCreateStore(false)
    setInventoryView(false)
    setAddComputer(false)
    setShowStores(false)
    setShowBalances(false)
    setSiteManagerBalance(false)
    setStoreBalance(false)
    setStoreReport(false)
    setSearch(null)
    setRemoveStore(null)
    setListFilteredStores(false)
    setCoordinatesIntake(false)
    setBuyComputer(false)
    setStoreLoc(false)
    setConfirmBuy(false)
  }

  //FROM LANDING PAGE VIEW ------------
  //LOGIN ############################
  //render the login view
  function handleLogin(bool) {
    clear()
    setLogin(bool)
    setLogout(false)
  }

  //when login fails
  function handleFailedLogin(bool) {
    setFailedLogin(bool);
  }

  //CREATE STORE #########################
  //render create store view
  function handleCreateStore(bool){
    clear()
    setCreateStore(bool);
  }

  //handle response from store creation
  function handleStoreCreated(bool){
    setFailedCreateStore(false);
    setStoreCreated(bool);
  }

  //when creating a store fails
  function handleFailedStore(bool) {
    setFailedCreateStore(bool);
  }

  //SEARCH ##########################################
  //render search option
  //"Computers" renders computer feature filter view
  //"Stores" renders store list and filter view
  function handleSearch(option) { //should maybe be int (type of search needs to go)
    clear();
    setSearch(option);
  }

  //set results of the search request
  function handleSearchResults(results) {
    setSearchResults(results);
  }

   //load stores 
  //json array of store objects
  function handleStores(stores){
    // clear()
    setStores(stores)
  }

  //search subfield to search by stores
  function handleShowStores(bool){
    clear()
    setShowStores(bool)
  }

  //function to display the inventory from a store selected from search
  function handleListFilteredStores(bool){
    clear();
    setListFilteredStores(bool)
  }

  //function to populate the inventory for the filtered store display
  function handleCustomerStoreInventory(inventory){
    console.log("inventory in app: ", inventory)
    setCustomerStoreInventory(inventory)
  }

  //function to get to the coordinate entry view after clicking "Buy" button
  function handleCoordinatesIntake(bool, computer){
    if (buyStatusCount === 0) {
      setCoordinatesIntake(true)
      setcomputerInfo(computer)
      console.log("computer id: " + computer.inventoryID + " price: " + computer.price)
    } else {
      setCoordinatesIntake(false)
      setBuyComputer(false)
      setStoreLoc(false)
      setConfirmBuy(false)
      setBuyStatusCount(0)
    }
  }

  //function to "Buy" after getting coordinates
  function handleBuyComputer(bool){
    setBuyComputer(bool);
  }

  function handleStoreLoc(bool){
    setCoordinatesIntake(false);
    setStoreLoc(bool);
  }

  //function to get the customer's coordinates when they're buying a computer
  function handleCustomerCoordinates(tlat, tlon){
    console.log("customer: " + tlat + "," + tlon)
    //setCustomerCoordinates(...customerCoordinates, [lat, lon])
    
    setCustomerCoordinates({
      ...customerCoordinates,
      lat: tlat,
      lon: tlon
    }
      
    )
  }

  function handleStoreCoordinates(tlat, tlon){
    console.log("store: " + tlat + "," + tlon)

    setStoreCoordinates ({
      ...storeCoordinates,
      lat: tlat,
      lon: tlon
    });
    console.log("in lat " + storeCoordinates.lat)
  }

  function handleConfirmBuy(bool){
    setConfirmBuy(bool)
  }

  function handleSetBuyStatusCount(count){
    setBuyStatusCount(count);
  }

  //ABOUT US ##################################
  //render the "about us" page
  function handleAbout(bool){
    clear()
    setAbout(bool);
  }

  //------------------------------------------------------------ END LANDING PAGE VIEW 

  //ELEVATED ACCESS -------------------------------------

  //FROM STORE OWNER OR SITE MANAGER VIEW
  //reset all values to default if ### LOGGED OUT ###
  function handleLogout(bool) {
    if (bool === true) {
      clear()
      setUser(null)
      setInventory(null)
      setStores(null)
      setLogin(false)
    }
    setLogout(bool)
    localStorage.removeItem('user');
  }

  //USER SELECT ##############################
  //set the user value 
  //"owner" : store owner
  //"manager" : site manager
  //null : default (customer or landing page)
  function handleUser(userInfo) {
    handleLogin(false);
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
    if (userInfo[1] === 0) {
      setInventoryView(true); 
    }
  }

  //FROM STORE OWNER VIEW ------------------------
  //ADD COMPUTER ###########################
  //render add computer 
  function handleAddComputer(bool){
    clear();
    setAddComputer(bool);
  }
  
  //handle response when computer is added
  function handleComputerAdded(bool){
    setComputerAdded(bool);
  }

  //STORE INVENTORY ##############################
  //function to set the store inventory 
  //data is an array of json computer objects
  function handleInventory(data) {
    setInventory(data);
  }

  //render store inventory
  function handleInventoryView(bool){
    clear();
    setInventoryView(bool);
  }

  //render inventory report for store
  function handleInventoryReport(bool){
    clear();
    setInventoryReport(bool)
  }

  //MODIFY COMPUTER ###############################
  //modify computer in store inventory
  function handleModifyComp(bool, id) {
    setRemoveComp([false, null, false]);
    if (modifyComp[2] === true) {
      setModifyComp([false, null, false]);
    } else {
      setModifyComp([bool, id, true]);
    }
  }

  //REMOVE COMPUTER ###############################
  //render remove computer from store inventory 
  function handleRemoveComp(bool, id) {
    setModifyComp([false, null, false]);
    if (removeComp[2] === true) {
      setRemoveComp([false, null, false]);
    } else {
      setRemoveComp([bool, id, true]);
    }
  }

  //-------------------------------- END STORE OWNER VIEW

 

  //SITE MANAGER VIEW -----------------------------------
  
  //PROFITS ########################################
  //"Site" to render for site manager
  //"All Stores" to render for all stores 
  function handleShowBalances(selection){
    clear();
    setShowBalances(selection);
  }

  //render site manager balance
  function handleSiteManagerBalance(bool){
    //clear();
    setShowBalances("")
    setStoreBalance(false)
    setSiteManagerBalance(bool)
  }

  //render store balances
  function handleStoreBalance(bool){
    //clear();
    setShowBalances("")
    setSiteManagerBalance(false)
    setStoreBalance(bool);
  }

  //get the values
  function handleStoreBalances(balances){
    console.log("IN APP, BALANCES:",balances)
    setStoreBalances(balances)
  }

  //INVENTORY TOTALS ###############################
  //'All Stores' or 'Site'
  function handleSetStoreReport(option){
    clear();
    setStoreReport(option)
  }

  //show the store inventory balances
  function handleShowStoreInventoryTotal(bool){
    clear();
  }

  //set the balances from the data string
  function handleSiteInventoryBalances(balances){
    console.log("Received inventory balances")
    let resp = JSON.parse(balances.body)

    setSiteInventoryBalances(resp)
}

  //REMOVE STORE ###################################
  function handleRemoveStore(bool){
    clear();
    setRemoveStore(bool);
  }

  function handleSiteBalance(balance) {
    setSiteBalance(balance);
  }

  //------------------------------ END SITE MANAGER VIEW

  //App returns a header and a view
  //the header is used to get nav button selections needed to set different views
  //the view is used to set page main rendering area and may also need to set 
  //  state booleans, so pass both boolean states and set state functions
  return (
    <div className="App">
      <Header user={user} handleUser={handleUser}
              handleLogin={handleLogin} 
              handleAbout={handleAbout} 
              handleCreateStore={handleCreateStore} 
              handleLogout={handleLogout} 
              handleAddComputer={handleAddComputer}
              handleInventoryReport={handleInventoryReport}
              handleShowStores={handleShowStores}
              handleShowBalances={handleShowBalances}
              handleSearch={handleSearch}
              handleSetStoreReport={handleSetStoreReport}
              handleRemoveStore={handleRemoveStore}
              />
      
      <View login={login} 
            failedLogin={failedLogin}
            handleFailedLogin={handleFailedLogin}
            handleFailedStore={handleFailedStore}
            failedCreateStore={failedCreateStore}
            user={user} handleUser={handleUser} 
            handleLogin={handleLogin}
            about={about} 
            createStore={createStore} 
            storeCreated={storeCreated}
            handleStoreCreated={handleStoreCreated}
            addComputer={addComputer}
            handleAddComputer={handleAddComputer}
            computerAdded={computerAdded}
            handleComputerAdded={handleComputerAdded}
            inventory={inventory} handleInventory={handleInventory}
            inventoryView={inventoryView} handleInventoryView={handleInventoryView}
            logout={logout} handleLogout={handleLogout}
            handleModifyComp={handleModifyComp} modifyComp={modifyComp} 
            handleRemoveComp={handleRemoveComp} removeComp={removeComp}
            inventoryReport={inventoryReport} handleInventoryReport={handleInventoryReport} 
            stores={stores} handleStores={handleStores}
            showStores={showStores} handleShowStores={handleShowStores}
            showBalances={showBalances} 
            siteManagerBalance={siteManagerBalance} handleSiteManagerBalance={handleSiteManagerBalance}
            storeBalance={storeBalance} handleStoreBalance={handleStoreBalance}
            storeProfit={storeProfit}
            search={search} handleSearch={handleSearch}
            setStoreReport={storeReport} handleSetStoreReport={handleSetStoreReport}
            removeStore={removeStore} setRemoveStore={setRemoveStore}
            searchResults={searchResults} handleSearchResults={handleSearchResults}
            handleCreateStore={handleCreateStore}
            listFilteredStores={listFilteredStores} handleListFilteredStores={handleListFilteredStores}
            customerStoreInventory={customerStoreInventory} handleCustomerStoreInventory={handleCustomerStoreInventory}
            siteBalance={siteBalance} handleSiteBalance={handleSiteBalance}
            coordinatesIntake={coordinatesIntake} handleCoordinatesIntake={handleCoordinatesIntake} 
            customerCoordinates={customerCoordinates} handleCustomerCoordinates={handleCustomerCoordinates}
            buyComputer={buyComputer} handleBuyComputer={handleBuyComputer}
            computerInfo={computerInfo}
            storeCoordinates={storeCoordinates} handleStoreCoordinates={handleStoreCoordinates}
            siteInventoryBalances={siteInventoryBalances}
            handleStoreLoc={handleStoreLoc} 
            confirmBuy={confirmBuy} handleConfirmBuy={handleConfirmBuy}
            handleStoreBalances={handleStoreBalances}
            storeBalances={storeBalances}
            buyStatusCount={buyStatusCount}
            handleSetBuyStatusCount={handleSetBuyStatusCount}
            />

            {storeReport && <GetSiteInventoryBalancesRequest handleSiteInventoryBalances={handleSiteInventoryBalances}/>}
            {storeLoc && <ReqStoreLonLat handleStoreCoordinates = {handleStoreCoordinates} 
                          computerID={computerInfo.inventoryID} handleStoreLoc={handleStoreLoc}
                          handleConfirmBuy={handleConfirmBuy}/>}
            {(showBalances === 'All Stores') && <GetStoreBalances handleStoreBalances={handleStoreBalances}/>}
    </div>
  );
}

export default App;


//            {(showBalances==='All Stores' )}

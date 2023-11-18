import React from 'react';
import './everest_style.css'
import { Header } from './Header';
import View from './View';
import {testInventory} from './Owner/testInventory.js';
import { test_stores } from './Manager/testStores';
import { wait } from '@testing-library/user-event/dist/utils/index.js';


function App() {
  let cookie = localStorage.getItem('user');
  cookie = JSON.parse(cookie);
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
  const [inventoryView, setInventoryView] = React.useState(null)
  const [inventory, setInventory] = React.useState(null);
  const [inventoryReport, setInventoryReport] = React.useState(null);
  const [modifyComp, setModifyComp] = React.useState(false, null, false);
  const [removeComp, setRemoveComp] = React.useState(false, null, false);
  const [stores, setStores] = React.useState(test_stores);  //init test data for stores
  const [showStores, setShowStores] = React.useState(null);
  const [descending, setDescending] = React.useState(null);
  const [showBalances, setShowBalances] = React.useState(null); 
  const [siteManagerBalance, setSiteManagerBalance] = React.useState(null);
  const [storeBalance, setStoreBalance] = React.useState(null);
  const [storeReport, setStoreReport] = React.useState(null);
  const [removeStore, setRemoveStore] = React.useState(null);

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
    clear()
    setStores(stores)
  }

  //search subfield to search by stores
  function handleShowStores(bool){
    clear()
    setShowStores(bool)
  }

  //ABOUT US ##################################
  //render the "about us" page
  function handleAbout(bool){
    clear()
    setAbout(bool);
  }

  //------------------------------- END LANDING PAGE VIEW 

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

  //sort numeric values in descending order
  function handleDescending(bool){
    clear()
    setDescending(bool)
  }

  //REMOVE STORE ###################################
  function handleRemoveStore(bool){
    clear();
    setRemoveStore(bool);
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
            stores={stores} 
            showStores={showStores} handleShowStores={handleShowStores}
            descending={descending} handleDescending={handleDescending}
            showBalances={showBalances} 
            siteManagerBalance={siteManagerBalance} handleSiteManagerBalance={handleSiteManagerBalance}
            storeBalance={storeBalance} handleStoreBalance={handleStoreBalance}
            search={search} handleSearch={handleSearch}
            setStoreReport={storeReport} handleSetStoreReport={handleSetStoreReport}
            removeStore={removeStore} setRemoveStore={setRemoveStore}
            searchResults={searchResults} handleSearchResults={handleSearchResults}
            handleCreateStore={handleCreateStore}
            />
    </div>
  );
}

export default App;

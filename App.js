import React from 'react';
import './everest_style.css'
import { Header } from './Header';
import View from './View';
import {testInventory} from './Owner/testInventory.js';
import { test_stores } from './Manager/testStores';


function App() {

  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [createStore, setCreateStore] = React.useState(null);
  const [logout, setLogout] = React.useState(null);
  const [addComputer, setAddComputer] = React.useState(null);
  const [inventoryView, setInventoryView] = React.useState(null)
  const [inventory, setInventory] = React.useState(testInventory);
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

  function clear(){
    setLogin(false)
    setAbout(false)
    setCreateStore(false)
    setInventoryView(false)
    setAddComputer(false)
    setInventory(false)
    setShowStores(false)
    setShowBalances(false)
    setSiteManagerBalance(false)
    setStoreBalance(false)
    setStoreReport(false)
  }

  function handleLogin(bool) {
    clear()
    setLogin(bool);
  }

  function handleAbout(bool){
    clear()
    setAbout(bool);
  }

  function handleCreateStore(bool){
    clear()
    setCreateStore(bool);
  }

  function handleUser(user) {
    clear();
    if (user === 'owner'){
      setInventoryView(true);
    }
    setUser(user);
  }

  function handleLogout(bool){
    clear();
    setLogout(bool);
  }

  function handleAddComputer(bool){
    clear();
    setAddComputer(bool);
  }

  function handleInventory(data) {
    setInventory(data);
  }

  function handleInventoryView(bool){
    clear();
    setInventoryView(bool);
  }

  function handleInventoryReport(bool){
    clear();
    setInventoryReport(bool)
  }

  function handleModifyComp(bool, id) {
    setRemoveComp([false, null, false]);
    if (modifyComp[2] === true) {
      console.log("Modify confirmed");
      setModifyComp([false, null, false]);
    } else {
      setModifyComp([bool, id, true]);
    }
  }

  function handleRemoveComp(bool, id) {
    setModifyComp([false, null, false]);
    if (removeComp[2] === true) {
      console.log("Remove confirmed");
      setRemoveComp([false, null, false]);
    } else {
      setRemoveComp([bool, id, true]);
    }
  }

  function handleStores(stores){
    clear()
    setStores(stores)
  }

  function handleShowStores(bool){
    clear()
    setShowStores(bool)
  }

  function handleDescending(bool){
    clear()
    setDescending(bool)
  }

  function handleShowBalances(bool){
    clear();
    setShowBalances(bool);
  }

  function handleSiteManagerBalance(bool){
    //clear();
    setShowBalances(false)
    setStoreBalance(false)
    setSiteManagerBalance(bool)
  }

  function handleStoreBalance(bool){
    //clear();
    setShowBalances(false)
    setSiteManagerBalance(false)
    setStoreBalance(bool);
  }

  function handleSearch(option) { //should maybe be int (type of search needs to go)
    clear();
    setSearch(option);
  }

  function handleSetStoreReport(option){
    clear();
    setStoreReport(option)
  }

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
              />
      
      <View login={login} handleUser={handleUser} 
            about={about} 
            createStore={createStore} 
            addComputer={addComputer}
            inventory={inventory} handleInventory={handleInventory}
            inventoryView={inventoryView} handleInventoryView={handleInventoryView}
            logout={logout}
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
            />
    </div>
  );
}

export default App;

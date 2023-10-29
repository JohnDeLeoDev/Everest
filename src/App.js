import './App.css'
import {Header} from './Header.js'; 
import {Footer} from './Footer.js'; 
import React from 'react';
import View from './View.js';
import {testInventory} from './Owner/testInventory.js';

function App() {
  const [user, setUser] = React.useState(null);
  const [home, setHome] = React.useState(true);
  const [store, setStore] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [help, setHelp] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [createStore, setCreateStore] = React.useState(false);
  const [addComp, setAddComp] = React.useState(false);
  const [inventoryView, setInventoryView] = React.useState(false);
  const [inventory, setInventory] = React.useState(testInventory);
  const [inventoryReport, setInventoryReport] = React.useState(false);

  // modifyComp and removeComp are arrays that hold 3 values. If state is active, the computer id it is acting on, and bool if confirmed by user.
  const [modifyComp, setModifyComp] = React.useState(false, null, false);
  const [removeComp, setRemoveComp] = React.useState(false, null, false);

  // This function turns off all states of the app so that only one view is shown at a time.
  function turnOffAll() {
    setHome(false);
    setAbout(false);
    setLogin(false);
    setCreateStore(false);
    setAddComp(false);
    setInventoryView(false);
    setModifyComp([false, null, false]);
    setRemoveComp([false, null, false]);
    setInventoryReport(false);
  }
  // These functions handle the state of the app within App.js so that external components can change the state of the app.
  function handleHome() {
    turnOffAll();
    setHome(true);
  }

  function handleInventory(data) {
    setInventory(data);
  }

  function handleInventoryReport(bool) {
    setInventoryReport(bool);
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

  function handleModifyComp(bool, id) {
    setRemoveComp([false, null, false]);
    if (modifyComp[2] === true) {
      console.log("Modify confirmed");
      setModifyComp([false, null, false]);
    } else {
      setModifyComp([bool, id, true]);
    }
  }

  function handleInventoryView(bool) {
    turnOffAll();
    setInventoryView(bool);
  }

  function handleAbout(bool) {
    turnOffAll();
    setAbout(bool);
  }

  function handleAddComp(bool) {
    turnOffAll();
    setAddComp(bool);
  }

  function handleLogin(bool) {
    turnOffAll();
    setLogin(bool);
  }

  function handleCreateStore(bool) {
    turnOffAll();
    setCreateStore(bool);
  }

  function handleUser(user) {
    turnOffAll();
    setUser(user);
  }

  function handleLogout() {
    turnOffAll();
    setUser(null);
  }

  // Three core views, a header, view, and footer

  return (
    <>
      <Header 
        user={user} handleUser={handleUser} 
        handleCreateStore={handleCreateStore} 
        handleLogin={handleLogin} 
        handleAbout={handleAbout} 
        home={home} 
        handleLogout={handleLogout}
      />
      <View 
        user={user} handleUser={handleUser} 
        handleCreateStore={handleCreateStore} createStore={createStore} 
        about={about} 
        login={login} 
        handleAddComp={handleAddComp} 
        addComp={addComp} 
        handleInventoryView={handleInventoryView} inventoryView={inventoryView} 
        handleModifyComp={handleModifyComp} modifyComp={modifyComp} 
        handleRemoveComp={handleRemoveComp} removeComp={removeComp} 
        inventoryReport={inventoryReport} handleInventoryReport={handleInventoryReport}
        inventory={inventory} handleInventory={handleInventory}
      />
      <Footer />    
    </>

  );
}

export default App;

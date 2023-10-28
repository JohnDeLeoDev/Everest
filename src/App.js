import './App.css'
import {Header} from './Header.js'; 
import {Footer} from './Footer.js'; 
import React from 'react';
import View from './View.js';

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
  const [inventory, setInventory] = React.useState(false);
  const [modifyComp, setModifyComp] = React.useState(false);
  const [removeComp, setRemoveComp] = React.useState(false);

  // This function turns off all states of the app so that only one view is shown at a time.
  function turnOffAll() {
    setHome(false);
    setAbout(false);
    setLogin(false);
    setCreateStore(false);
    setAddComp(false);
    setInventory(false);
    setModifyComp(false);
    setRemoveComp(false);
  }
  // These functions handle the state of the app within App.js so that external components can change the state of the app.
  function handleHome() {
    turnOffAll();
    setHome(true);
  }

  function handleRemoveComp(bool) {
    turnOffAll();
    setRemoveComp(bool);
  }

  function handleModifyComp(bool) {
    turnOffAll();
    setModifyComp(bool);
  }

  function handleInventory(bool) {
    turnOffAll();
    setInventory(bool);
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
      <Header user={user} handleUser={handleUser} handleCreateStore={handleCreateStore} handleLogin={handleLogin} handleAbout={handleAbout} home={home} handleLogout={handleLogout}/>
      <View user={user} handleUser={handleUser} handleCreateStore={handleCreateStore} createStore={createStore} about={about} login={login} handleAddComp={handleAddComp} addComp={addComp} handleInventory={handleInventory} inventory={inventory} handleModifyComp={handleModifyComp} modifyComp={modifyComp} handleRemoveComp={handleRemoveComp} removeComp={removeComp}/>
      <Footer />    
    </>

  );
}

export default App;

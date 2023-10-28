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

  // These functions handle the state of the app within App.js so that external components can change the state of the app.
  function handleHome() {
    setHome(true);
    setAbout(false);
    setLogin(false);
    setCreateStore(false);
  }

  function handleRemoveComp(bool) {
    setRemoveComp(bool);
  }

  function handleModifyComp(bool) {
    setModifyComp(bool);
  }

  function handleInventory(bool) {
    setInventory(bool);
  }

  function handleAbout(bool) {
    setAbout(bool);
  }

  function handleAddComp(bool) {
    setAddComp(bool);
    }

  function handleLogin(bool) {
    setLogin(bool);
    setAbout(false);
  }

  function handleCreateStore(bool) {
    setCreateStore(bool);
    setAbout(false);
  }

  function handleUser(user) {
    setUser(user);
    setLogin(false);
    setAbout(false);
  }

  function handleLogout() {
    setUser(null);
    setLogin(false);
    setAbout(false);
    setCreateStore(false);
    setHelp(false);
    setSearch(false);
    setStore(null);
    setHome(true);
    setAddComp(false);
    setInventory(false);
    setModifyComp(false);
    setRemoveComp(false);
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

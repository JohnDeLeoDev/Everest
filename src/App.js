import './App.css'
import {Header} from './Header.js'; 
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

  function handleHome() {
    setHome(true);
    setAbout(false);
    setLogin(false);
    setCreateStore(false);
  }

  function handleAbout(bool) {
    setAbout(bool);

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
  }


  return (
    <>
      <Header user={user} handleUser={handleUser} handleCreateStore={handleCreateStore} handleLogin={handleLogin} handleAbout={handleAbout} home={home} handleLogout={handleLogout}/>
      <View user={user} handleUser={handleUser} createStore={createStore} about={about} login={login}/>      
    </>

  );
}

export default App;

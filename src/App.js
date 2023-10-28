import './App.css'
import {Header} from './Header.js'; 
import {Landing} from './Landing.js';
import React from 'react';
import {View} from './View.js';


function App() {
  const [user, setUser] = React.useState(null);
  const [store, setStore] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [help, setHelp] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [createStore, setCreateStore] = React.useState(null);
  const [view, setView] = React.useState(Landing); 


  return (
    <>
      <Header />
      <View 
      user={user}
      store={store}
      />
    </>

  );
}

export default App;

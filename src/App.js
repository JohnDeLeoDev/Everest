import './App.css'
import {Header} from './Header.js'; 
import {View} from './View.js';
import React from 'react';


function App() {
  const [user, setUser] = React.useState(null);
  const [store, setStore] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [help, setHelp] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [createStore, setCreateStore] = React.useState(null);


  return (
    <div className="App">
      <Header />
      <View />

    </div>

  );
}

export default App;

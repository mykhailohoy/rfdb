import React, { useEffect } from 'react';

// components

import Header from "./components/Header"
import Home from './components/Home';

// styles
import { GlobalStyle } from './GlobalStyle';


function App() {

  useEffect(() => {
    document.title = "The RFDB"
  }, [])

  return (
    <div className="App">
      <Header />
      <Home />
      <GlobalStyle />
    </div>
  );
}

export default App;

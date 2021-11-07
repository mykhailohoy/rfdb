import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Header from "./components/Header"
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

// styles
import { GlobalStyle } from './GlobalStyle';


const App = () => {

  useEffect(() => {
    document.title = "The RFDB"
  }, [])

  return (
    <div className="App">
      <Router forceRefresh={true}> {/* doesn't work */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:movieId" element={<Movie />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <GlobalStyle />
      </Router>
    </div>
  );
}

export default App;

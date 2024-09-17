import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Kanbas from './Kanbas';
import Labs from './Labs';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

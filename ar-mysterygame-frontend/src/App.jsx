import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './elements/Home';
import './App.css'

function App() {
  return (
    <div className="NaritaApp">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App

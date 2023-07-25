import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './elements/Home';
import Load from './Load';
import './App.css'

function App() {
  return (
    <div className="NaritaApp" id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/load" element={<Load />} />
      </Routes>
    </div>
  )
}

export default App

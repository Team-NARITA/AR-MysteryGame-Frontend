import React from 'react'
import mainvisual from './assets/main-visual.png'
import './App.css'

function App() {
  return (
    <div className="NaritaApp">
      <img className="Fullsizeimg Littleopacity" src={mainvisual} alt="メイン画像"></img>
      <button className="Startbutton">ゲームをはじめる</button>
    </div>
  )
}

export default App

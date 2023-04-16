import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.scss'
// import Header from './Component/Header'
import Home from './Component/Home'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Header from './Component/Header/Header'
function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
  </Routes>
  </BrowserRouter>
}

export default App

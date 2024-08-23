import React from 'react'
import './App.css'
import Landingpages from './dashboard/pages/Landingpages'
import {Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/dinesh' element={<Landingpages/>}/>
      </Routes>  
    </div>
  )
}

export default App

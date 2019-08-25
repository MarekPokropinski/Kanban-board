import React from 'react'
import './App.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Boards from './boards/Boards'
import Board from './board/Board'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Boards} />
      <Route exact path="/:id" component={Board} />
    </Router>
  )
}

export default App

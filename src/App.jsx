import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import home from './pages/home';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={home} />
      </Switch>
    </Router>
  );
}

export default App;

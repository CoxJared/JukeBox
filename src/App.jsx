import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './pages/home';

function App() {
  return (
    <Router className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Istok+Web&display=swap"
        rel="stylesheet"
      />
      <Switch>
        <Route exact path="/" component={home} />
      </Switch>
    </Router>
  );
}

export default App;

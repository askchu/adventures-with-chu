import React from 'react';
import Blog from './containers/Blog/Blog';
import Home from './containers/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Router>
  );
}

export default App;

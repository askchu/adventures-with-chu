import React from 'react';
import Blog from './containers/Blog/Blog';
import Home from './containers/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import './App.css';
import Edit from './component/Blogging/Edit/Edit';
import Add from './component/Blogging/Add/Add';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile/my-blogs/new" exact component={Add} />
        <Route path="/profile/my-blogs/edit/:id" exact component={Edit} />
        <Route path="/profile/my-blogs" component={Blog} />
      </Switch>
    </Router>
  );
}

export default App;

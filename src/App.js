import React from 'react';
import Blog from './containers/Blog/Blog';
import Home from './containers/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import './App.css';
import Edit from './component/Blogging/Edit/Edit';
import Add from './component/Blogging/Add/Add';
import ShowBlog from './component/Blogging/ShowBlog/ShowBlog';
import SignUp from './component/Authentication/SignUp/SignUp';
import { AuthProvider } from './component/Authentication/AuthContext/AuthContext';
import SignIn from './component/Authentication/SignIn/SignIn';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/profile" exact component={Dashboard} />
          <Route path="/profile/my-blogs/new" exact component={Add} />
          <Route path="/profile/my-blogs/:id/" exact component={ShowBlog} />
          <Route path="/profile/my-blogs/:id/edit" component={Edit} />
          <Route path="/profile/my-blogs" component={Blog} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
